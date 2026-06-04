import { useRef, useState, useCallback } from 'react';
import { useViewState } from './hooks/useViewState.js';
import { useDB } from './hooks/useDB.js';
import TopBar from './components/TopBar/TopBar.jsx';
import InfoPanel from './components/InfoPanel/InfoPanel.jsx';
import SvgCanvas from './components/SvgCanvas/SvgCanvas.jsx';
import MatrixView from './components/MatrixView/MatrixView.jsx';
import { SYSPROJECT as SYSPROJECT_DEFAULT } from './data/sysproject.js';
import './App.scss';

const projectData = Object.fromEntries(
  Object.entries(SYSPROJECT_DEFAULT).map(([k, v]) => [k, { ...v }])
);

export default function App() {
  const sysprojectRef = useRef(projectData);
  const [, forceUpdate] = useState(0);

  const onDbLoaded = useCallback(() => {
    forceUpdate(n => n + 1);
  }, []);

  const {
    view, changeView,
    activeId, selectSystem,
    hoveredId, setHoveredId,
    resetAll,
  } = useViewState();

  const {
    showConnectBtn,
    connectManual,
    saveProjectDates,
    scheduleAutoSave,
  } = useDB(sysprojectRef, onDbLoaded);

  function handleSelectSystem(id) {
    selectSystem(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  async function handleSave(id) {
    await saveProjectDates(id);
    forceUpdate(n => n + 1);
  }

  return (
    <>
      <div className="app-wrap">
        <h1 className="app-title">
          Azərbaycan Avtomobil Yolları Dövlət Agentliyinin rəqəmsal ekosistemi
        </h1>

        <TopBar
          view={view}
          onChangeView={changeView}
          onSelectSystem={handleSelectSystem}
          showConnectBtn={showConnectBtn}
          onConnectDB={connectManual}
        />

        <InfoPanel
          activeId={activeId}
          onSelectSystem={handleSelectSystem}
          sysproject={sysprojectRef.current}
          onSave={handleSave}
          onScheduleSave={(id) => scheduleAutoSave(id,
            () => forceUpdate(n => n + 1),
            () => {}
          )}
        />
      </div>

      {view !== 'mat' && (
        <SvgCanvas
          view={view}
          activeId={activeId}
          hoveredId={hoveredId}
          onSelectSystem={handleSelectSystem}
          onHover={(id) => setHoveredId(id)}
          onHoverEnd={() => setHoveredId(null)}
          onResetAll={resetAll}
        />
      )}

      {view === 'mat' && (
        <MatrixView
          onSelectSystem={handleSelectSystem}
          activeId={activeId}
        />
      )}

      <footer>hazırlanmışdır AISTGroup</footer>
    </>
  );
}
