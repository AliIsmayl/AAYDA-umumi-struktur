export const COLORS = {
  meis:    { fill: '#EEEAFF', stroke: '#7C6EF5', text: '#4A3DB8' },
  tech:    { fill: '#E2F8EF', stroke: '#16A97A', text: '#0A5C3F' },
  corp:    { fill: '#FDEDE5', stroke: '#E05A2B', text: '#842010' },
  reg:     { fill: '#F4E6FF', stroke: '#A855C8', text: '#5C2475' },
  ops:     { fill: '#FDF5DC', stroke: '#D4960A', text: '#6B4400' },
  citizen: { fill: '#E4F2FF', stroke: '#2D8FE0', text: '#0A3E72' },
};

export const typeStyle = {
  meis:     { stroke: '#7C6EF5', width: 0.7, dash: '6,3' },
  tech:     { stroke: '#16A97A', width: 0.6, dash: '6,3' },
  corp2ops: { stroke: '#E05A2B', width: 0.6, dash: '4,3' },
  ops2reg:  { stroke: '#D4960A', width: 0.6, dash: '3,3' },
  reg2ops:  { stroke: '#A855C8', width: 0.6, dash: '5,2' },
  reg2corp: { stroke: '#A855C8', width: 0.6, dash: '4,3' },
  citizen:  { stroke: '#2D8FE0', width: 0.6, dash: '3,2' },
};

export const ROLES = [
  { id: 'sia', code: 'SİA', label: 'Sistem İnzibatçısı',  desc: 'Sistemə tam texniki giriş: konfiqurasiya, istifadəçi idarəetməsi, dəstək.',                            color: '#6D28D9', fill: '#EDE9FE', text: '#3B0764' },
  { id: 'rhb', code: 'RHB', label: 'Rəhbərlik',           desc: 'Agentlik/şöbə rəhbərliyi: hesabatlar, strateji monitorinq, yekun təsdiq.',                             color: '#B45309', fill: '#FEF3C7', text: '#78350F' },
  { id: 'shr', code: 'ŞRH', label: 'Şöbə Rəhbəri',       desc: 'Struktur bölmə rəhbəri: öz sahəsini yazar, redaktə edər, daxili təsdiq verər.',                        color: '#B91C1C', fill: '#FEE2E2', text: '#7F1D1D' },
  { id: 'opr', code: 'OPR', label: 'Operator/Əməkdaş',    desc: 'Gündəlik əməliyyatlar: məlumat daxiletmə, izləmə, icra.',                                              color: '#047857', fill: '#D1FAE5', text: '#064E3B' },
  { id: 'sho', code: 'SHO', label: 'Sahə İşçisi',         desc: 'Sahə inspektoru, briqada: mobil cihazla əməliyyat.',                                                   color: '#7C3AED', fill: '#F5F3FF', text: '#4C1D95' },
  { id: 'anl', code: 'ANL', label: 'Analitik',             desc: 'Məlumat analizi, hesabat, BI panelləri, statistika.',                                                  color: '#1D4ED8', fill: '#DBEAFE', text: '#1E3A8A' },
  { id: 'aud', code: 'AUD', label: 'Daxili Auditor',       desc: 'Nəzarət, yoxlama, uyğunluq — yalnız oxuma+qeyd.',                                                     color: '#9A3412', fill: '#FFF7ED', text: '#7C2D12' },
  { id: 'vtn', code: 'VTN', label: 'Vətəndaş',            desc: 'Son istifadəçi: yalnız ictimai xarici interfeyslərdən istifadə.',                                       color: '#065F46', fill: '#ECFDF5', text: '#064E3B' },
  { id: 'pdr', code: 'PDR', label: 'Podratçı/Xarici',     desc: 'Xarici podratçı: müvafiq sistemlərə məhdud giriş.',                                                    color: '#92400E', fill: '#FEF9C3', text: '#78350F' },
];

export const NW = 155;
export const NH = 42;

export const X = {
  meis: 101,
  tech: 101,
  corp: 290,
  reg: 479,
  ops: 796,
  citizen: 1156,
};

// Radial view config
export const RADII_VIEW = { meis: 0, tech: 165, corp: 265, reg: 360, ops: 450, citizen: 535 };
export const CX_RAD = 650;
export const CY_RAD = 600;

export const radialAngles = {
  meis: 0,
  api: 0, bi: 60, dw: 120, notify: 180, storage: 240, mobile: 300,
  esened: 0, halga: 45, task: 90, hr: 135, arxiv: 180, vasite: 225, budce: 270, audit: 315,
  reyestr: 240,
  toll: 0, neqliyyat: 33, tikinti: 66, monitorinq: 99, istisman: 132,
  tehlu: 165, ekologiya: 198, icaze: 231, komm: 264, yolknar: 297, torpaq: 330,
  mygov: 0, odenis: 60, xerite: 120, mehdudat: 180, portal: 240, chatbot: 300,
};

export const radRing = {
  meis: 'meis',
  api: 'tech', bi: 'tech', dw: 'tech', notify: 'tech', storage: 'tech', mobile: 'tech',
  esened: 'corp', halga: 'corp', task: 'corp', hr: 'corp', arxiv: 'corp', vasite: 'corp', budce: 'corp', audit: 'corp',
  reyestr: 'reg',
  toll: 'ops', neqliyyat: 'ops', tikinti: 'ops', monitorinq: 'ops', istisman: 'ops', tehlu: 'ops',
  ekologiya: 'ops', icaze: 'ops', komm: 'ops', yolknar: 'ops', torpaq: 'ops',
  mygov: 'citizen', odenis: 'citizen', xerite: 'citizen', mehdudat: 'citizen', portal: 'citizen', chatbot: 'citizen',
};

export const MATRIX_CATS = [
  { label: 'MEİS',                  color: '#7C6EF5', ids: ['meis'] },
  { label: 'Texnoloji Platforma',   color: '#16A97A', ids: ['api','bi','dw','notify','storage','mobile'] },
  { label: 'Korporativ İdarəetmə',  color: '#E05A2B', ids: ['esened','halga','task','hr','arxiv','vasite','budce','audit'] },
  { label: 'Reyestr',               color: '#A855C8', ids: ['reyestr'] },
  { label: 'Əməliyyat Sistemləri',  color: '#D4960A', ids: ['toll','neqliyyat','tikinti','monitorinq','istisman','tehlu','icaze','komm','yolknar','torpaq','ekologiya'] },
  { label: 'Vətəndaş İnterfeysi',   color: '#2D8FE0', ids: ['mygov','odenis','xerite','mehdudat','portal','chatbot'] },
];

export const CONN_TYPES_LABELS = {
  meis:     { color: '#7C6EF5', label: 'MEİS — Vahid Giriş' },
  tech:     { color: '#16A97A', label: 'Texnoloji Platforma' },
  corp2ops: { color: '#E05A2B', label: 'Əməliyyat Sistemləri' },
  ops2reg:  { color: '#D4960A', label: 'Yol Reyestri' },
  reg2corp: { color: '#A855C8', label: 'Korporativ İdarəetmə' },
  reg2ops:  { color: '#A855C8', label: 'Əməliyyat Sistemləri' },
  citizen:  { color: '#2D8FE0', label: 'Vətəndaş İnterfeysi' },
};
