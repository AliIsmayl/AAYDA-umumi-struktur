import { useState } from 'react';
import { systems } from '../../data/systems.js';
import { connections } from '../../data/connections.js';
import { COLORS, MATRIX_CATS, CONN_TYPES_LABELS } from '../../data/constants.js';
import { SYS_TICK, TICK_LABELS, TICK_GREEN, TICK_GREY } from '../../data/ticks.js';
import { SYSDESC } from '../../data/sysdesc.js';
import './MatrixView.scss';

function getSysById(id) { return systems.find(s => s.id === id); }

function getConnData(sid) {
  const sysConns = connections.filter(c => c.from === sid || c.to === sid);
  const connTypes = [...new Set(sysConns.map(c => c.type))];
  const allConn = [...new Map([
    ...connections.filter(c => c.from === sid).map(c => getSysById(c.to)),
    ...connections.filter(c => c.to === sid).map(c => getSysById(c.from)),
  ].filter(Boolean).map(x => [x.id, x])).values()];
  return { connTypes, allConn };
}

function TickIcon({ tkStr }) {
  if (tkStr === 'gg') return (
    <svg width="24" height="12" viewBox="0 0 24 12" fill="none">
      <path d="M1 6L4 9.5L11 1.5"  stroke={TICK_GREEN} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M13 6L16 9.5L23 1.5" stroke={TICK_GREEN} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (tkStr === 'gb') return (
    <svg width="13" height="12" viewBox="0 0 13 12" fill="none">
      <path d="M1.5 6L4.5 9.5L11.5 1.5" stroke={TICK_GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
  if (tkStr === 'bb') return (
    <svg width="12" height="13" viewBox="0 0 14 16" fill="none">
      <path d="M1.5 1.5H8.5L12.5 5.5V14.5H1.5V1.5Z" stroke="#9CA3AF" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M8.5 1.5V5.5H12.5"                    stroke="#9CA3AF" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M3.5 8H10.5M3.5 10.5H10.5M3.5 13H7.5" stroke="#9CA3AF" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  );
  if (tkStr === 'b') return (
    <svg width="12" height="13" viewBox="0 0 14 16" fill="none">
      <rect x="1.5" y="2" width="4" height="12" rx="1.5" fill="#9CA3AF" />
      <rect x="8.5" y="2" width="4" height="12" rx="1.5" fill="#9CA3AF" />
    </svg>
  );
  return null;
}

function TicksDisplay({ sysId }) {
  const tkStr = SYS_TICK[sysId];
  if (!tkStr || tkStr === '0') return null;
  return (
    <span className="ticks-wrap" title={TICK_LABELS[tkStr]}>
      <TickIcon tkStr={tkStr} />
    </span>
  );
}

export default function MatrixView({ onSelectSystem, activeId }) {
  const [openRow, setOpenRow] = useState(null);

  function toggleRow(sid) {
    setOpenRow(prev => (prev === sid ? null : sid));
  }

  return (
    <div className="matrix-wrap">
      <table className="mtbl">
        <thead>
          <tr>
            <th style={{ textAlign: 'left', minWidth: 200, position: 'sticky', top: 0, left: 0, zIndex: 3, background: '#F3F5FA' }}>Sistem</th>
            <th style={{ minWidth: 140, position: 'sticky', top: 0, zIndex: 2, background: '#F3F5FA' }}>Kateqoriya</th>
            <th style={{ minWidth: 200, position: 'sticky', top: 0, zIndex: 2, background: '#F3F5FA', textAlign: 'left' }}>Əlaqə növü</th>
            <th style={{ minWidth: 75, position: 'sticky', top: 0, zIndex: 2, background: '#F3F5FA' }}>Əlaqələr</th>
          </tr>
        </thead>
        <tbody>
          {MATRIX_CATS.map(cat => (
            <>
              {/* Category header row */}
              <tr key={`cat-${cat.label}`}>
                <td
                  colSpan={4}
                  className="cat-header"
                  style={{ background: `${cat.color}18`, color: cat.color }}
                >
                  {cat.label.toUpperCase()}
                </td>
              </tr>

              {/* System rows */}
              {cat.ids.map(sid => {
                const s = getSysById(sid);
                if (!s) return null;
                const cl = COLORS[s.color];
                const { connTypes, allConn } = getConnData(sid);
                const isOpen = openRow === sid;
                const isActive = activeId === sid;

                return (
                  <>
                    <tr
                      key={sid}
                      className={`sys-row${isActive ? ' mat-active' : ''}`}
                      onClick={() => { toggleRow(sid); onSelectSystem(sid); }}
                    >
                      {/* Name cell */}
                      <td className="rh" style={{ borderLeft: `4px solid ${cl.stroke}` }} title={SYSDESC[sid] || s.label}>
                        <TicksDisplay sysId={sid} />
                        <span style={{ fontWeight: 700, color: cl.text }}>{s.lines.join(' ')}</span>
                        <span className="arr-icon">{isOpen ? '▴' : '▾'}</span>
                      </td>

                      {/* Category */}
                      <td className="cat-cell">
                        <span className="cat-badge" style={{ color: cat.color, background: `${cat.color}18` }}>
                          {cat.label}
                        </span>
                      </td>

                      {/* Connection types */}
                      <td className="type-cell">
                        {connTypes.length > 0
                          ? connTypes.map(t => {
                              const ct = CONN_TYPES_LABELS[t] || { color: '#999', label: t };
                              return (
                                <span key={t} className="type-badge" style={{ color: ct.color, background: `${ct.color}15`, borderColor: `${ct.color}55` }}>
                                  {ct.label}
                                </span>
                              );
                            })
                          : <span style={{ color: '#ddd' }}>—</span>
                        }
                      </td>

                      {/* Count */}
                      <td className="count-cell">{allConn.length}</td>
                    </tr>

                    {/* Expandable row */}
                    {isOpen && (
                      <tr key={`det-${sid}`}>
                        <td colSpan={4} style={{ padding: 0, border: 'none' }}>
                          <div
                            className="sub-grid-wrap"
                            style={{ borderLeft: `4px solid ${cl.stroke}`, borderBottom: `2px solid ${cl.stroke}50` }}
                          >
                            <div className="sub-grid">
                              {allConn.map(cs => {
                                const cc = COLORS[cs.color];
                                return (
                                  <div key={cs.id} className="sub-item">
                                    <span
                                      className="sub-name"
                                      style={{ color: cc.text }}
                                      title={SYSDESC[cs.id] || cs.label}
                                      onClick={(e) => {
                                        e.stopPropagation();
                                        onSelectSystem(cs.id);
                                      }}
                                    >
                                      {cs.lines[0]}
                                    </span>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </td>
                      </tr>
                    )}
                  </>
                );
              })}
            </>
          ))}
        </tbody>
      </table>
    </div>
  );
}
