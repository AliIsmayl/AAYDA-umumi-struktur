import { useState, useEffect } from 'react';
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
  const [connExpanded, setConnExpanded] = useState(true);

  useEffect(() => {
    setConnExpanded(true);
  }, [activeId]);

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
  const TECH_IDS = ['api', 'bi', 'dw', 'notify', 'storage', 'mobile'];
  const isTech = TECH_IDS.includes(activeId);
  const LOGOS = { evisit: '/logos/evisit-logo.svg', halga: '/logos/halga-logo.svg' };
  const logoSrc = LOGOS[activeId] || '/logos/default-logo.svg';
  const sysDesc = SYSDESC[activeId] || s.desc;
  const proj = sysproject[activeId] || {};
  const hasFT = !!proj.ft;
  const hasProto = !!proj.proto;
  const { all: allConns } = getConnected(activeId);

  const FT_LINKS = {
    reyestr:   'https://docs.google.com/document/d/13hZEykvjYoA3f8qcRnnfF71E5od8UQitxWb20ldBgVk/edit?tab=t.w6zj5iuomssj',
    toll:      'https://docs.google.com/document/d/1MbzRXHVd3EdCDcRXCQYJWo4ei63Y2r_2X1pA8jWLdbk/edit?pli=1&tab=t.w6zj5iuomssj',
    neqliyyat: 'https://docs.google.com/document/d/1kQr3MAU3JDKM-ycgkDQqHbkYDOvWLKVG7-7WbdMpV-k/edit?tab=t.w6zj5iuomssj',
  };

  function handleFtClick() {
    if (!hasFT) return;
    if (FT_LINKS[activeId]) {
      window.open(FT_LINKS[activeId], '_blank');
    } else {
      alert(`Funksional Tələblər\nBaşlanma: ${proj.ft || '—'}\nSon tarix: ${proj.ftDeadline || '—'}`);
    }
  }

  function openAxin() {
    if (activeId === 'reyestr') {
      window.open('/reyestr-axin.html', '_blank');
    } else if (activeId === 'toll') {
      window.open('/toll-axin.html', '_blank');
    } else {
      onSelectSystem(activeId);
    }
  }

  return (
    <div className="info-panel">
      {/* Main */}
      <div className="info-main">
        <div className="info-main-top">
          <strong className="info-title" style={{ color: cl.text }}>
            <span style={{ color: '#999', fontWeight: 700, fontSize: 13, marginRight: 6 }}>#{s.num}</span>
            {s.label}
          </strong>
          <div className="info-logo-slot">
            <img src={logoSrc} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain', padding: 4 }} />
          </div>
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
                  onClick={(e) => { e.stopPropagation(); setConnExpanded(true); onSelectSystem(cs.id); }}
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
        <div className="is-hd">Tarixlər</div>
        <div className="is-row">
          <span className="is-lbl">Başlanma</span>
          <input
            type="text"
            className="is-date-input"
            placeholder="—"
            readOnly
            defaultValue={proj.start || '-'}
          />
        </div>
        <div className="is-row">
          <span className="is-lbl">Bitmə (deadline)</span>
          <input
            type="text"
            className="is-date-input"
            placeholder="—"
            readOnly
            defaultValue={proj.deadline || '-'}
          />
        </div>
        <div className="is-row">
          <span className="is-lbl">FT son tarixi</span>
          <input
            type="text"
            className="is-date-input"
            placeholder="—"
            readOnly
            defaultValue={proj.ftDeadline || '-'}
          />
        </div>
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

        {!isTech && (
          <button
            className={`is-ft-btn${hasFT ? ' ft-on' : ' ft-off'}`}
            onClick={hasFT ? handleFtClick : undefined}
            disabled={!hasFT}
          >
            📋 Funksional tələb
          </button>
        )}

        {!isTech && (
          <button
            className="is-nav"
            style={{ opacity: hasProto ? 1 : 0.45, cursor: hasProto ? 'pointer' : 'default' }}
            onClick={hasProto ? () => window.open(proj.proto) : undefined}
          >
            ⧉ Prototip
          </button>
        )}

        {!isTech && <button
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
        </button>}
      </div>
    </div>
  );
}
