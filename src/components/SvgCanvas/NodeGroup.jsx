import { COLORS, NW, NH } from '../../data/constants.js';
import { SYS_TICK, TICK_GREEN, TICK_GREY } from '../../data/ticks.js';

export default function NodeGroup({ sys, pos, isActive, isConnected, isHovered, hasAnyActive, isRadial, onMouseEnter, onMouseLeave, onClick }) {
  const { id, lines, color } = sys;
  const cl = COLORS[color];
  const p = pos;
  if (!p) return null;

  const isMeis = id === 'meis';
  const w = isMeis ? (isRadial ? 80 : 120) : NW;
  const h = isMeis ? (isRadial ? 30 : 38) : NH;

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

  const lineH = isRadial ? 12 : 14;
  const totalH = lines.length * lineH;
  const startY = p.y - totalH / 2 + lineH * 0.55;

  // Status icon positioning (top-right corner)
  const tkStr = SYS_TICK[id];
  const hasStatus = tkStr && tkStr !== '0';
  const bgW = tkStr === 'gb' ? 26 : 16;
  const bgH = 14;
  const bgX = p.x + w / 2 - bgW - 2;
  const bgY = p.y - h / 2 + 2;

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
        rx={isMeis ? 18 : 10}
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
          rx={isMeis ? 18 : 10}
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
          fontSize="9"
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
          fontSize={isMeis ? '14' : '12'}
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
          opacity="0.88"
        />
      )}

      {/* gg — single green checkmark */}
      {tkStr === 'gg' && (
        <path
          d={`M${bgX + 3},${bgY + 7} l3,3.5 L${bgX + 13},${bgY + 3}`}
          stroke={TICK_GREEN}
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      )}

      {/* gb — green tick + grey tick */}
      {tkStr === 'gb' && (
        <g>
          <path
            d={`M${bgX + 2},${bgY + 7} l2.5,3 L${bgX + 9},${bgY + 3}`}
            stroke={TICK_GREEN}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
          <path
            d={`M${bgX + 15},${bgY + 7} l2.5,3 L${bgX + 22},${bgY + 3}`}
            stroke={TICK_GREY}
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </g>
      )}

      {/* bb — document icon */}
      {tkStr === 'bb' && (
        <g>
          <rect x={bgX + 3} y={bgY + 1} width={10} height={12} rx="1.5" fill="none" stroke="#9CA3AF" strokeWidth="1" />
          <line x1={bgX + 5.5} y1={bgY + 4.5} x2={bgX + 10.5} y2={bgY + 4.5} stroke="#9CA3AF" strokeWidth="0.8" strokeLinecap="round" />
          <line x1={bgX + 5.5} y1={bgY + 7}   x2={bgX + 10.5} y2={bgY + 7}   stroke="#9CA3AF" strokeWidth="0.8" strokeLinecap="round" />
          <line x1={bgX + 5.5} y1={bgY + 9.5} x2={bgX + 8.5}  y2={bgY + 9.5} stroke="#9CA3AF" strokeWidth="0.8" strokeLinecap="round" />
        </g>
      )}

      {/* b — pause icon */}
      {tkStr === 'b' && (
        <g>
          <rect x={bgX + 3}   y={bgY + 2} width={3.5} height={10} rx="1" fill="#9CA3AF" />
          <rect x={bgX + 9}   y={bgY + 2} width={3.5} height={10} rx="1" fill="#9CA3AF" />
        </g>
      )}
    </g>
  );
}
