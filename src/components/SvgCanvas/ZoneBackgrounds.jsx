// Static zone background rectangles and labels for column view
export default function ZoneBackgrounds({ visible }) {
  if (!visible) return null;

  return (
    <g className="zone-backgrounds">
      {/* MEIS zone */}
      <rect x="14" y="12" width="175" height="80" rx="14"
        fill="#EEEAFF" stroke="#7C6EF5" strokeWidth="1.2" strokeDasharray="5,4" />

      {/* Tech platform zone */}
      <rect x="14" y="100" width="175" height="382" rx="14"
        fill="#EEF9F4" stroke="#16A97A" strokeWidth="1" strokeDasharray="5,4" />
      <text x="101" y="112" textAnchor="middle" fontSize="10"
        fontWeight="700" fill="#16A97A" letterSpacing="1">TEXNOLOJI PLATFORMA</text>

      {/* Corporate zone */}
      <rect x="203" y="12" width="175" height="470" rx="14"
        fill="#FEF3EE" stroke="#E05A2B" strokeWidth="1" strokeDasharray="5,4" />
      <text x="290" y="32" textAnchor="middle" fontSize="10"
        fontWeight="700" fill="#E05A2B" letterSpacing="1">KORPORATİV İDARƏETMƏ</text>

      {/* Registry zone */}
      <rect x="392" y="12" width="175" height="470" rx="14"
        fill="#F8F0FF" stroke="#A855C8" strokeWidth="1" strokeDasharray="5,4" />
      <text x="479" y="32" textAnchor="middle" fontSize="10"
        fontWeight="700" fill="#A855C8" letterSpacing="1">REYESTR</text>

      {/* Operations zone */}
      <rect x="581" y="12" width="430" height="470" rx="14"
        fill="#FEFBEE" stroke="#D4960A" strokeWidth="1" strokeDasharray="5,4" />
      <text x="796" y="32" textAnchor="middle" fontSize="10"
        fontWeight="700" fill="#D4960A" letterSpacing="1">ƏMƏLİYYAT SİSTEMLƏRİ</text>

      {/* Citizen zone */}
      <rect x="1025" y="12" width="262" height="470" rx="14"
        fill="#EEF6FF" stroke="#2D8FE0" strokeWidth="1" strokeDasharray="5,4" />
      <text x="1156" y="32" textAnchor="middle" fontSize="10"
        fontWeight="700" fill="#2D8FE0" letterSpacing="1">VƏTƏNDAŞ İNTERFEYSİ</text>
    </g>
  );
}
