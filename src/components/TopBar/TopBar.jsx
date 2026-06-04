import { useState } from 'react';
import ConnectionsPanel from '../ConnectionsPanel/ConnectionsPanel.jsx';
import StatusPanel from '../StatusPanel/StatusPanel.jsx';
import './TopBar.scss';

export default function TopBar({ view, onChangeView, onSelectSystem, showConnectBtn, onConnectDB }) {
  const [openPanel, setOpenPanel] = useState(null); // 'conns' | 'ticks' | null

  function togglePanel(id) {
    setOpenPanel(prev => (prev === id ? null : id));
  }

  return (
    <div className="topbar-wrap">
      <div className="top-bar">
        <button
          className={`vbtn${view === 'col' ? ' active' : ''}`}
          onClick={() => onChangeView('col')}
        >
          ⊞ Sütun
        </button>
        <button
          className={`vbtn${view === 'rad' ? ' active' : ''}`}
          onClick={() => onChangeView('rad')}
        >
          ◎ Çevrə
        </button>
        <button
          className={`vbtn${view === 'mat' ? ' active' : ''}`}
          onClick={() => onChangeView('mat')}
        >
          ⊟ Cədvəl
        </button>

        <span className="top-bar-sep" />

        <button
          className={`cs-toggle${openPanel === 'conns' ? ' open' : ''}`}
          onClick={() => togglePanel('conns')}
        >
          Əlaqə növləri <span className="cs-arr">▾</span>
        </button>
        <button
          className={`cs-toggle${openPanel === 'ticks' ? ' open' : ''}`}
          onClick={() => togglePanel('ticks')}
        >
          Status <span className="cs-arr">▾</span>
        </button>

        {showConnectBtn && (
          <button className="vbtn db-btn" onClick={onConnectDB}>
            🗄 aayda.db bağla
          </button>
        )}
      </div>

      <ConnectionsPanel open={openPanel === 'conns'} />
      <StatusPanel
        open={openPanel === 'ticks'}
        onSelectSystem={onSelectSystem}
      />
    </div>
  );
}
