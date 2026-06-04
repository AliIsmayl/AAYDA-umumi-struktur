import './ConnectionsPanel.scss';

const LEGEND = [
  { color: '#7C6EF5', label: 'MEİS — Vahid Giriş' },
  { color: '#16A97A', label: 'Texnoloji Platforma' },
  { color: '#E05A2B', label: 'Əməliyyat Sistemləri' },
  { color: '#D4960A', label: 'Yol Reyestri' },
  { color: '#A855C8', label: 'Reyestr əlaqəsi' },
  { color: '#2D8FE0', label: 'Vətəndaş İnterfeysi' },
];

export default function ConnectionsPanel({ open }) {
  return (
    <div className={`cs-panel${open ? ' open' : ''}`}>
      {LEGEND.map(({ color, label }) => (
        <div key={label} className="cl">
          <div className="cl-line" style={{ background: color }} />
          {label}
        </div>
      ))}
    </div>
  );
}
