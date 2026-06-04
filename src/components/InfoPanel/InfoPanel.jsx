import { useState, useRef } from 'react';
import { systems } from '../../data/systems.js';
import { connections } from '../../data/connections.js';
import { COLORS, ROLES } from '../../data/constants.js';
import { SYSDESC } from '../../data/sysdesc.js';
import { ALABEL } from '../../data/access.js';
import './InfoPanel.scss';

function getSysById(id) { return systems.find(s => s.id === id); }
function getRoleById(id) { return ROLES.find(r => r.id === id); }

function getConnected(id) {
  const out = [...new Map(
    connections.filter(c => c.from === id).map(c => getSysById(c.to)).filter(Boolean).map(x => [x.id, x])
  ).values()];
  const inList = [...new Map(
    connections.filter(c => c.to === id).map(c => getSysById(c.from)).filter(Boolean).map(x => [x.id, x])
  ).values()];
  const all = [...new Map([...out, ...inList].map(x => [x.id, x])).values()];
  return { out, inList, all };
}

export default function InfoPanel({ activeId, onSelectSystem, sysproject, onSave, onScheduleSave }) {
  const [marked, setMarked] = useState(false);
  const [connExpanded, setConnExpanded] = useState(true);
  const [dbMsg, setDbMsg] = useState('');
  const dbMsgTimer = useRef(null);

  if (!activeId) {
    return (
      <div className="info-panel empty-info">
        Sistemin üzərinə toxunun — əlaqəli xətlər və rol cədvəli görünəcək
      </div>
    );
  }

  const s = getSysById(activeId);
  if (!s) return null;

  const cl = COLORS[s.color];
  const sysDesc = SYSDESC[activeId] || s.desc;
  const proj = sysproject[activeId] || {};
  const hasFT = !!proj.ft;
  const hasProto = !!proj.proto;
  const { all: allConns } = getConnected(activeId);

  function showDbMsg(msg, color) {
    setDbMsg({ text: msg, color: color || '#16A97A' });
    clearTimeout(dbMsgTimer.current);
    dbMsgTimer.current = setTimeout(() => setDbMsg(''), 2200);
  }

  async function handleSave() {
    if (onSave) {
      try {
        await onSave(activeId);
        showDbMsg('✓ Saxlanıldı');
      } catch {
        showDbMsg('Xəta', '#E05A2B');
      }
    }
  }

  function handleFtClick() {
    if (hasFT) {
      alert(`Funksional Tələblər\nBaşlanma: ${proj.ft || '—'}\nSon tarix: ${proj.ftDeadline || '—'}`);
    }
  }

  function openAxin() {
    if (activeId === 'reyestr') {
      window.open('/reyestr-axin.html', '_blank');
    } else {
      onSelectSystem(activeId);
    }
  }

  return (
    <div className="info-panel">
      {/* Main */}
      <div className="info-main">
        <div className="info-main-top">
          <strong className="info-title" style={{ color: cl.text }}>{s.label}</strong>
          <div className="info-logo-slot" />
          <button
            className={`iact mark-btn${marked ? ' marked' : ''}`}
            title="İşarələ"
            onClick={() => setMarked(m => !m)}
          >
            {marked ? '✓' : '☐'}
          </button>
        </div>

        <div className="info-desc">{sysDesc}</div>

        <div
          className={`info-expand-hd${connExpanded ? ' open' : ''}`}
          onClick={() => setConnExpanded(e => !e)}
        >
          <span className="xarr">▾</span> Əlaqəli sistemlər
          <span
            className="conn-count-badge"
            style={{ background: cl.fill, color: cl.text, border: `1.5px solid ${cl.stroke}` }}
          >
            {allConns.length}
          </span>
        </div>

        {connExpanded && (
          <div className="info-expand-body">
            {allConns.map(cs => {
              const cc = COLORS[cs.color];
              return (
                <span
                  key={cs.id}
                  className="info-conn-chip"
                  style={{ background: cc.fill, borderColor: cc.stroke, color: cc.text }}
                  onClick={(e) => { e.stopPropagation(); onSelectSystem(cs.id); }}
                >
                  {cs.lines[0]}
                </span>
              );
            })}
          </div>
        )}
      </div>

      {/* Dates panel */}
      <div className="info-dates">
        <div className="is-hd">
          Tarixlər
          {dbMsg && (
            <span className="db-status-badge" style={{ color: dbMsg.color }}>
              {dbMsg.text}
            </span>
          )}
        </div>
        <div className="is-row">
          <span className="is-lbl">Başlanma</span>
          <input
            type="text"
            className="is-date-input"
            placeholder="—"
            readOnly
            defaultValue={proj.start || ''}
          />
        </div>
        <div className="is-row">
          <span className="is-lbl">Bitmə (deadline)</span>
          <input
            type="text"
            className="is-date-input"
            placeholder="—"
            readOnly
            defaultValue={proj.deadline || ''}
          />
        </div>
        <div className="is-row">
          <span className="is-lbl">FT son tarixi</span>
          <input
            type="text"
            className="is-date-input"
            placeholder="—"
            readOnly
            defaultValue={proj.ftDeadline || ''}
          />
        </div>
        <button
          className="is-nav save-btn"
          onClick={handleSave}
        >
          ✓ Saxla
        </button>
      </div>

      {/* Meta panel */}
      <div className="info-meta">
        <div className="is-hd">Layihə məlumatları</div>
        <div className="is-stat">
          <span>Əlaqə</span>
          <b>{allConns.length}</b>
        </div>
        <div className="is-stat">
          <span>FT mərhələsi</span>
          <b style={{ color: hasFT ? '#047857' : '#aaa' }}>{hasFT ? 'Aktiv' : 'Yoxdur'}</b>
        </div>

        <button
          className={`is-ft-btn${hasFT ? ' ft-on' : ' ft-off'}`}
          onClick={hasFT ? handleFtClick : undefined}
          disabled={!hasFT}
        >
          📋 Funksional tələb
        </button>

        <button
          className="is-nav"
          style={{ opacity: hasProto ? 1 : 0.45, cursor: hasProto ? 'pointer' : 'default' }}
          onClick={hasProto ? () => window.open(proj.proto) : undefined}
        >
          ⧉ Prototip
        </button>

        <button
          className="is-nav axin-btn"
          style={activeId === 'reyestr'
            ? { borderColor: '#A855C8', background: '#F8F0FF', color: '#5C2475' }
            : {}}
          onClick={openAxin}
          title={activeId === 'reyestr' ? 'Yol Reyestri axınını yeni tabda aç' : 'Əlaqə xətlərini göstər'}
        >
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none" style={{ display: 'block' }}>
            <circle cx="6.5" cy="6.5" r="1.4" stroke="currentColor" strokeWidth="1.2" />
            <circle cx="1.5" cy="1.5" r="1.2" stroke="currentColor" strokeWidth="1.1" />
            <circle cx="11.5" cy="1.5" r="1.2" stroke="currentColor" strokeWidth="1.1" />
            <circle cx="1.5" cy="11.5" r="1.2" stroke="currentColor" strokeWidth="1.1" />
            <circle cx="11.5" cy="11.5" r="1.2" stroke="currentColor" strokeWidth="1.1" />
            <line x1="2.4" y1="2.4" x2="5.4" y2="5.4" stroke="currentColor" strokeWidth="1.1" />
            <line x1="10.6" y1="2.4" x2="7.6" y2="5.4" stroke="currentColor" strokeWidth="1.1" />
            <line x1="2.4" y1="10.6" x2="5.4" y2="7.6" stroke="currentColor" strokeWidth="1.1" />
            <line x1="10.6" y1="10.6" x2="7.6" y2="7.6" stroke="currentColor" strokeWidth="1.1" />
          </svg>
          Axın
        </button>
      </div>
    </div>
  );
}
