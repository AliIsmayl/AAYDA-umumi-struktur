import { useState, useCallback } from 'react';

export function useViewState() {
  const [view, setView] = useState('col');       // 'col' | 'rad' | 'mat'
  const [activeId, setActiveId] = useState(null);
  const [hoveredId, setHoveredId] = useState(null);

  const selectSystem = useCallback((id) => {
    setActiveId(id);
  }, []);

  const resetAll = useCallback(() => {
    setActiveId(null);
    setHoveredId(null);
  }, []);

  const changeView = useCallback((v) => {
    setView(v);
    setActiveId(null);
    setHoveredId(null);
  }, []);

  return {
    view, changeView,
    activeId, setActiveId, selectSystem,
    hoveredId, setHoveredId,
    resetAll,
  };
}
