import { useState, useEffect, useRef, useCallback } from 'react';
import { systems } from '../data/systems.js';

// IndexedDB helpers to persist FileSystemFileHandle between sessions
function openIdb() {
  return new Promise((res, rej) => {
    const r = indexedDB.open('aayda-fsh', 1);
    r.onupgradeneeded = (e) => e.target.result.createObjectStore('h');
    r.onsuccess = (e) => res(e.target.result);
    r.onerror = (e) => rej(e);
  });
}
async function saveHandle(h) {
  const idb = await openIdb();
  return new Promise((res) => {
    const tx = idb.transaction('h', 'readwrite');
    tx.objectStore('h').put(h, 'dbFile');
    tx.oncomplete = res;
  });
}
async function loadHandle() {
  const idb = await openIdb();
  return new Promise((res, rej) => {
    const tx = idb.transaction('h', 'readonly');
    const r = tx.objectStore('h').get('dbFile');
    r.onsuccess = (e) => res(e.target.result || null);
    r.onerror = rej;
  });
}

export function useDB(sysprojectRef, onDbLoaded) {
  const [dbReady, setDbReady] = useState(false);
  const [showConnectBtn, setShowConnectBtn] = useState(false);
  const [dbStatus, setDbStatus] = useState('');

  const sqlRef = useRef(null);
  const dbRef = useRef(null);
  const fileHandleRef = useRef(null);
  const autoSaveTimerRef = useRef(null);

  const applyDbRows = useCallback((rows) => {
    rows.forEach(([sid, start, deadline, ft, ftDl, proto]) => {
      if (!sysprojectRef.current[sid]) return;
      if (start)    sysprojectRef.current[sid].start = start;
      if (deadline) sysprojectRef.current[sid].deadline = deadline;
      if (ft)       sysprojectRef.current[sid].ft = ft;
      if (ftDl)     sysprojectRef.current[sid].ftDeadline = ftDl;
      if (proto)    sysprojectRef.current[sid].proto = proto;
    });
    if (onDbLoaded) onDbLoaded();
  }, [sysprojectRef, onDbLoaded]);

  const initSchema = useCallback(() => {
    const db = dbRef.current;
    if (!db) return;
    db.run(`CREATE TABLE IF NOT EXISTS sysproject(
      sys_id TEXT PRIMARY KEY,
      start_date TEXT, deadline TEXT,
      ft_date TEXT, ft_deadline TEXT, proto_url TEXT
    )`);
    const res = db.exec('SELECT sys_id,start_date,deadline,ft_date,ft_deadline,proto_url FROM sysproject');
    if (res.length > 0) applyDbRows(res[0].values);
    systems.forEach((s) => {
      const p = sysprojectRef.current[s.id] || {};
      db.run(
        `INSERT OR IGNORE INTO sysproject(sys_id,start_date,deadline,ft_date,ft_deadline,proto_url)VALUES(?,?,?,?,?,?)`,
        [s.id, p.start || null, p.deadline || null, p.ft || null, p.ftDeadline || null, p.proto || null]
      );
    });
  }, [applyDbRows, sysprojectRef]);

  const loadFromHandle = useCallback(async (handle) => {
    try {
      const perm = await handle.queryPermission({ mode: 'readwrite' });
      if (perm === 'prompt') {
        setShowConnectBtn(true);
        return false;
      }
      if (perm !== 'granted') return false;
      const file = await handle.getFile();
      const buf = await file.arrayBuffer();
      dbRef.current = new sqlRef.current.Database(new Uint8Array(buf));
      fileHandleRef.current = handle;
      initSchema();
      setShowConnectBtn(false);
      setDbStatus('connected');
      return true;
    } catch {
      return false;
    }
  }, [initSchema]);

  useEffect(() => {
    let cancelled = false;
    async function init() {
      try {
        const SQL = await import('sql.js').then(mod => {
          return mod.default({
            locateFile: (f) => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${f}`,
          });
        });
        if (cancelled) return;
        sqlRef.current = SQL;

        // 1. Try stored FileSystemHandle
        const stored = await loadHandle().catch(() => null);
        if (stored && await loadFromHandle(stored)) {
          setDbReady(true);
          return;
        }

        // 2. Try fetch (HTTP server)
        try {
          const resp = await fetch('./aayda.db');
          if (resp.ok) {
            dbRef.current = new SQL.Database(new Uint8Array(await resp.arrayBuffer()));
            initSchema();
            setShowConnectBtn(true); // show connect for write access
            setDbReady(true);
            return;
          }
        } catch { /* no file */ }

        // 3. Fallback: empty in-memory DB
        dbRef.current = new SQL.Database();
        initSchema();
        setShowConnectBtn(true);
        setDbReady(true);
      } catch (e) {
        console.warn('DB xətası:', e);
      }
    }
    init();
    return () => { cancelled = true; };
  }, [initSchema, loadFromHandle]);

  const acquireHandle = useCallback(async () => {
    if (!('showOpenFilePicker' in window)) return false;
    try {
      const [h] = await window.showOpenFilePicker({
        types: [{ description: 'SQLite DB', accept: { 'application/octet-stream': ['.db', '.sqlite', '.sqlite3'] } }],
      });
      const perm = await h.requestPermission({ mode: 'readwrite' });
      if (perm !== 'granted') return false;
      const file = await h.getFile();
      const buf = await file.arrayBuffer();
      dbRef.current = new sqlRef.current.Database(new Uint8Array(buf));
      fileHandleRef.current = h;
      await saveHandle(h);
      initSchema();
      setShowConnectBtn(false);
      setDbStatus('connected');
      return true;
    } catch (e) {
      if (e.name !== 'AbortError') console.warn('Handle xətası:', e);
      return false;
    }
  }, [initSchema]);

  const connectManual = useCallback(async () => {
    if (!sqlRef.current) { alert('SQL engine hələ yüklənir...'); return; }
    await acquireHandle();
  }, [acquireHandle]);

  const writeDB = useCallback(async (id) => {
    if (!dbRef.current) return;
    const p = sysprojectRef.current[id] || {};
    dbRef.current.run(
      `INSERT OR REPLACE INTO sysproject(sys_id,start_date,deadline,ft_date,ft_deadline,proto_url)VALUES(?,?,?,?,?,?)`,
      [id, p.start || null, p.deadline || null, p.ft || null, p.ftDeadline || null, p.proto || null]
    );
    if (!fileHandleRef.current) {
      const ok = await acquireHandle();
      if (!ok) return;
    }
    const w = await fileHandleRef.current.createWritable();
    await w.write(new Blob([dbRef.current.export()], { type: 'application/octet-stream' }));
    await w.close();
  }, [sysprojectRef, acquireHandle]);

  const scheduleAutoSave = useCallback((id, onSuccess, onError) => {
    clearTimeout(autoSaveTimerRef.current);
    autoSaveTimerRef.current = setTimeout(async () => {
      try {
        await writeDB(id);
        if (onSuccess) onSuccess();
      } catch (e) {
        if (e.name !== 'AbortError' && onError) onError();
      }
    }, 700);
  }, [writeDB]);

  const saveProjectDates = useCallback(async (id, onSuccess, onError) => {
    clearTimeout(autoSaveTimerRef.current);
    try {
      await writeDB(id);
      if (onSuccess) onSuccess();
    } catch (e) {
      if (e.name !== 'AbortError' && onError) onError();
    }
  }, [writeDB]);

  return {
    dbReady,
    showConnectBtn,
    dbStatus,
    connectManual,
    scheduleAutoSave,
    saveProjectDates,
  };
}
