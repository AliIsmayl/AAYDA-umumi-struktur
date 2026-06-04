import { useMemo } from 'react';
import { systems } from '../../data/systems.js';
import { connections } from '../../data/connections.js';
import { typeStyle, RADII_VIEW, CX_RAD, CY_RAD, radialAngles, radRing } from '../../data/constants.js';
import NodeGroup from './NodeGroup.jsx';
import ZoneBackgrounds from './ZoneBackgrounds.jsx';
import './SvgCanvas.scss';

function polarPos(ring, angleDeg) {
  const r = RADII_VIEW[ring];
  const rad = (angleDeg - 90) * Math.PI / 180;
  return { x: CX_RAD + r * Math.cos(rad), y: CY_RAD + r * Math.sin(rad) };
}

function buildColPos() {
  const m = {};
  systems.forEach(s => { m[s.id] = { x: s.x, y: s.y }; });
  return m;
}

function buildRadPos() {
  const m = {};
  systems.forEach(s => {
    m[s.id] = polarPos(radRing[s.id], radialAngles[s.id] || 0);
  });
  return m;
}

function makePath(p1, p2, isRad) {
  if (isRad) {
    const mx = (p1.x + p2.x) / 2, my = (p1.y + p2.y) / 2;
    const cpx = mx + (CX_RAD - mx) * 0.28, cpy = my + (CY_RAD - my) * 0.28;
    return `M${p1.x},${p1.y} Q${cpx},${cpy} ${p2.x},${p2.y}`;
  }
  const dx = p2.x - p1.x;
  if (Math.abs(dx) > 60) {
    const cx1 = p1.x + dx * 0.42, cx2 = p2.x - dx * 0.42;
    return `M${p1.x},${p1.y} C${cx1},${p1.y} ${cx2},${p2.y} ${p2.x},${p2.y}`;
  }
  const off = (dx >= 0 ? 1 : -1) * 36;
  return `M${p1.x},${p1.y} Q${p1.x + off},${(p1.y + p2.y) / 2} ${p2.x},${p2.y}`;
}

const colPos = buildColPos();
const radPos = buildRadPos();

export default function SvgCanvas({ view, activeId, hoveredId, onSelectSystem, onHover, onHoverEnd, onResetAll }) {
  const isRadial = view === 'rad';
  const currentPos = isRadial ? radPos : colPos;

  const highlightId = activeId || hoveredId;

  const connectedSet = useMemo(() => {
    if (!highlightId) return new Set();
    const s = new Set([highlightId]);
    connections.forEach(c => {
      if (c.from === highlightId) s.add(c.to);
      if (c.to === highlightId) s.add(c.from);
    });
    return s;
  }, [highlightId]);

  const svgWidth = 1300;
  const svgHeight = isRadial ? 1260 : 518;
  const viewBox = isRadial ? '0 0 1300 1260' : '0 0 1300 518';

  // Radial rings
  const ringData = [
    { r: RADII_VIEW.tech,    c: '#16A97A' },
    { r: RADII_VIEW.corp,    c: '#E05A2B' },
    { r: RADII_VIEW.reg,     c: '#A855C8' },
    { r: RADII_VIEW.ops,     c: '#D4960A' },
    { r: RADII_VIEW.citizen, c: '#2D8FE0' },
  ];

  return (
    <div className="canvas-wrap" onClick={onResetAll}>
      <svg
        width={svgWidth}
        height={svgHeight}
        viewBox={viewBox}
        style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}
      >
        <defs>
          <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5"
            markerWidth="4" markerHeight="4" orient="auto-start-reverse">
            <path d="M2 2L8 5L2 8" fill="none" stroke="context-stroke"
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </marker>
        </defs>

        {/* Radial rings (visible only in radial view) */}
        {isRadial && ringData.map(({ r, c }) => (
          <circle key={r} cx={CX_RAD} cy={CY_RAD} r={r}
            fill="none" stroke={c} strokeWidth="0.8"
            strokeDasharray="5,5" opacity="0.3" />
        ))}

        {/* Zone backgrounds (column view only) */}
        <ZoneBackgrounds visible={!isRadial} />

        {/* Connection lines */}
        <g>
          {connections.map((conn, idx) => {
            const p1 = currentPos[conn.from], p2 = currentPos[conn.to];
            if (!p1 || !p2) return null;
            const st = typeStyle[conn.type] || typeStyle.tech;
            const isActive = highlightId && (conn.from === highlightId || conn.to === highlightId);
            const lineOpacity = highlightId
              ? (isActive ? 0.88 : 0.03)
              : 0.07;
            const lineWidth = isActive ? st.width * 2.4 : st.width;

            return (
              <path
                key={idx}
                d={makePath(p1, p2, isRadial)}
                fill="none"
                stroke={st.stroke}
                strokeWidth={lineWidth}
                strokeDasharray={st.dash}
                markerEnd="url(#arr)"
                opacity={lineOpacity}
                style={{ transition: 'opacity 0.12s, stroke-width 0.12s' }}
              />
            );
          })}
        </g>

        {/* Nodes */}
        <g>
          {systems.map(sys => {
            const pos = currentPos[sys.id];
            if (!pos) return null;
            return (
              <NodeGroup
                key={sys.id}
                sys={sys}
                pos={pos}
                isActive={activeId === sys.id}
                isConnected={connectedSet.has(sys.id) && sys.id !== highlightId}
                isHovered={hoveredId === sys.id}
                hasAnyActive={!!highlightId}
                isRadial={isRadial}
                onMouseEnter={(e) => { e.stopPropagation(); if (!activeId) onHover(sys.id); }}
                onMouseLeave={(e) => { e.stopPropagation(); if (!activeId) onHoverEnd(); }}
                onClick={(e) => {
                  e.stopPropagation();
                  if (activeId === sys.id) onResetAll();
                  else onSelectSystem(sys.id);
                }}
              />
            );
          })}
        </g>
      </svg>
    </div>
  );
}
