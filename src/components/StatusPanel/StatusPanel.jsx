import { useState } from 'react';
import { systems } from '../../data/systems.js';
import { SYS_TICK, TICK_LABELS, TICK_GREEN, TICK_GREY } from '../../data/ticks.js';
import { COLORS } from '../../data/constants.js';
import './StatusPanel.scss';

const TICK_ITEMS = [
  {
    tick: 'gg',
    icon: (
      <span className="tick-icon">
        <svg width="16" height="14" viewBox="0 0 16 14" fill="none">
          <path d="M2 7L5.5 11L14 2.5" stroke={TICK_GREEN} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    ),
  },
  {
    tick: 'gb',
    icon: (
      <span className="tick-icon">
        <svg width="28" height="14" viewBox="0 0 28 14" fill="none">
          <path d="M1 7L4.5 11L13 2.5"   stroke={TICK_GREEN} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M14.5 7L18 11L26.5 2.5" stroke={TICK_GREY}  strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    ),
  },
  {
    tick: 'bb',
    icon: (
      <span className="tick-icon">
        <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
          <path d="M1.5 1.5H8.5L12.5 5.5V14.5H1.5V1.5Z" stroke="#6B7280" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M8.5 1.5V5.5H12.5"                    stroke="#6B7280" strokeWidth="1.5" strokeLinejoin="round" />
          <path d="M3.5 8H10.5M3.5 10.5H10.5M3.5 13H7.5" stroke="#6B7280" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </span>
    ),
  },
  {
    tick: 'b',
    icon: (
      <span className="tick-icon">
        <svg width="14" height="16" viewBox="0 0 14 16" fill="none">
          <rect x="1.5" y="2"   width="4" height="12" rx="1.5" fill="#6B7280" />
          <rect x="8.5" y="2"   width="4" height="12" rx="1.5" fill="#6B7280" />
        </svg>
      </span>
    ),
  },
];

export default function StatusPanel({ open, onSelectSystem }) {
  const [activeTick, setActiveTick] = useState(null);

  function showTick(tick) {
    setActiveTick(prev => (prev === tick ? null : tick));
  }

  function reset() {
    setActiveTick(null);
  }

  const matched = activeTick ? systems.filter(s => SYS_TICK[s.id] === activeTick) : [];

  return (
    <div className={`cs-panel status-cs-panel${open ? ' open' : ''}`}>
      {TICK_ITEMS.map(({ tick, icon }) => (
        <div
          key={tick}
          className={`cl tick-filter-item${activeTick === tick ? ' active' : ''}`}
          onClick={() => showTick(tick)}
        >
          {icon}
          {TICK_LABELS[tick]}
        </div>
      ))}
      <button className="reset-btn" onClick={reset}>
        ↺ Sıfırla
      </button>

      {activeTick && matched.length > 0 && (
        <div className="tick-sys-panel">
          <div className="tick-sys-header">
            <span className="tick-sys-label">{TICK_LABELS[activeTick]}</span>
            <button className="close-btn" onClick={reset}>✕ Bağla</button>
          </div>
          <div className="tick-sys-list">
            {matched.map(s => {
              const cl = COLORS[s.color];
              return (
                <span
                  key={s.id}
                  className="tick-sys-chip"
                  style={{
                    background: cl.fill,
                    color: cl.text,
                    border: `1.5px solid ${cl.stroke}`,
                  }}
                  onClick={() => onSelectSystem(s.id)}
                >
                  {s.num && <span style={{ opacity: 0.6, fontSize: 10, marginRight: 2 }}>{s.num}.</span>}
                  {s.lines[0]}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
