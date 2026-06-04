import { COLORS, NW, NH } from '../../data/constants.js';
import { SYS_TICK, TICK_GREEN, TICK_GREY } from '../../data/ticks.js';

export default function NodeGroup({ sys, pos, isActive, isConnected, isHovered, hasAnyActive, isRadial, onMouseEnter, onMouseLeave, onClick }) {
  const { id, lines, color } = sys;
  const cl = COLORS[color];
  const p = pos;
  if (!p) return null;

  const isMeis = id === 'meis';
  const w = isMeis ? (isRadial ? 80 : NW) : NW;
  const h = isMeis ? (isRadial ? 30 : NH) : NH;

  let opacity = 1;
  let strokeWidth = '0.8';
  let fillColor = cl.fill;
  let strokeColor = cl.stroke;
  let textColor = cl.text;

  if (hasAnyActive) {
    if (isActive) {
      opacity = 1;
      strokeWidth = '2.8';
      fillColor = cl.stroke;
      strokeColor = '#fff';
      textColor = '#fff';
    } else if (isHovered) {
      opacity = 1;
      strokeWidth = '1.8';
    } else if (isConnected) {
      opacity = 1;
      strokeWidth = '1.5';
    } else {
      opacity = 0.42;
      strokeWidth = '0.8';
    }
  }

  // Status icon positioning (top-right corner) — declared before startY to use hasStatus offset
  const tkStr = SYS_TICK[id];
  const hasStatus = tkStr && tkStr !== '0';
  const bgW = (tkStr === 'gb' || tkStr === 'gg' || tkStr === 'bb') ? 30 : 20;
  const bgH = 11;
  const bgX = p.x + w / 2 - bgW - 4;
  const bgY = p.y - h / 2 + 2;

  const lineH = isRadial ? 12 : 14;
  const totalH = lines.length * lineH;
  const badgeOffset = (hasStatus && !isRadial) ? 6 : 0;
  const startY = p.y - totalH / 2 + lineH * 0.55 + badgeOffset;

  return (
    <g
      className="node-g"
      data-id={id}
      style={{ opacity, cursor: 'pointer' }}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      {/* Node background */}
      <rect
        x={p.x - w / 2}
        y={p.y - h / 2}
        width={w}
        height={h}
        rx={10}
        fill={fillColor}
        stroke={strokeColor}
        strokeWidth={strokeWidth}
      />

      {/* Hover darkening overlay */}
      {isHovered && !isActive && (
        <rect
          x={p.x - w / 2}
          y={p.y - h / 2}
          width={w}
          height={h}
          rx={10}
          fill={cl.stroke}
          opacity="0.22"
          style={{ pointerEvents: 'none' }}
        />
      )}

      {/* System number — top-left */}
      {sys.num && (
        <text
          x={p.x - w / 2 + 6}
          y={p.y - h / 2 + 9}
          fill={textColor}
          fontSize="10"
          fontWeight="700"
          opacity="0.65"
          dominantBaseline="central"
        >
          {sys.num}
        </text>
      )}

      {/* Node label text */}
      {lines.map((ln, i) => (
        <text
          key={i}
          x={p.x}
          y={startY + i * lineH}
          textAnchor="middle"
          dominantBaseline="central"
          fill={textColor}
          fontSize="13"
          fontWeight="600"
        >
          {ln}
        </text>
      ))}

      {/* Status icon background */}
      {hasStatus && (
        <rect
          x={bgX}
          y={bgY}
          width={bgW}
          height={bgH}
          rx="3"
          fill="#fff"
          opacity="0.92"
        />
      )}

      {/* gg — two green checkmarks */}
      {tkStr === 'gg' && (
        <g>
          <path
            d={`M${bgX + 4},${bgY + 7.5} l2.5,2.5 L${bgX + 11},${bgY + 3}`}
            stroke={TICK_GREEN}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d={`M${bgX + 18},${bgY + 7.5} l2.5,2.5 L${bgX + 25},${bgY + 3}`}
            stroke={TICK_GREEN}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      )}

      {/* gb — two green checkmarks */}
      {tkStr === 'gb' && (
        <g>
          <path
            d={`M${bgX + 4},${bgY + 7.5} l2.5,2.5 L${bgX + 11},${bgY + 3}`}
            stroke={TICK_GREEN}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d={`M${bgX + 18},${bgY + 7.5} l2.5,2.5 L${bgX + 25},${bgY + 3}`}
            stroke={TICK_GREEN}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      )}

      {/* bb — two grey checkmarks */}
      {tkStr === 'bb' && (
        <g>
          <path
            d={`M${bgX + 4},${bgY + 7.5} l2.5,2.5 L${bgX + 11},${bgY + 3}`}
            stroke={TICK_GREY}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d={`M${bgX + 18},${bgY + 7.5} l2.5,2.5 L${bgX + 25},${bgY + 3}`}
            stroke={TICK_GREY}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      )}

      {/* b — single grey checkmark */}
      {tkStr === 'b' && (
        <path
          d={`M${bgX + 5},${bgY + 7.5} l3,2.5 L${bgX + 15},${bgY + 3}`}
          stroke={TICK_GREY}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      )}
    </g>
  );
}
