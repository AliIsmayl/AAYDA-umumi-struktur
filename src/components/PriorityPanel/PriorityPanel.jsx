import { systems } from '../../data/systems.js';
import './PriorityPanel.scss';

const ORDERED_NUMS = [16, 37, 17, 18, 15, 11, 34];

function handleClick(id, onSelectSystem) {
  if (id === 'reyestr') { window.open('/reyestr-axin.html', '_blank'); return; }
  if (id === 'toll')    { window.open('/toll-axin.html',    '_blank'); return; }
  onSelectSystem(id);
}

export default function PriorityPanel({ open, onSelectSystem }) {
  const ordered = ORDERED_NUMS
    .map(num => systems.find(s => s.num === num))
    .filter(Boolean);

  return (
    <div className={`cs-panel priority-cs-panel${open ? ' open' : ''}`}>
      <div className="pr-group">
        <span className="pr-badge">1</span>
        {ordered.map(s => (
          <button
            key={s.id}
            className="pr-item"
            onClick={() => handleClick(s.id, onSelectSystem)}
          >
            {s.lines.join(' ')}
          </button>
        ))}
      </div>
    </div>
  );
}
