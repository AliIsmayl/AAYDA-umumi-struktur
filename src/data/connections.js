const OPS = ['toll','neqliyyat','tikinti','monitorinq','istisman','tehlu','icaze','komm','yolknar','torpaq','ekologiya','primavera'];
const TECH = ['api','bi','dw','notify','storage','mobile'];
const CORP = ['esened','halga','task','hr','arxiv','vasite','budce','audit','evisit','sitem'];
const CITIZEN = ['mygov','odenis','xerite','mehdudat','portal','chatbot'];

function links(from, toArr, type) {
  return toArr.map(to => ({ from, to, type }));
}

export const connections = [
  // ─── MEIS → all ───────────────────────────────────────────────────────────
  ...links('meis', [...TECH, ...CORP, 'reyestr', ...OPS, ...CITIZEN], 'meis'),

  // ─── API → Bütün ──────────────────────────────────────────────────────────
  ...links('api', [...CORP, 'reyestr', ...OPS, ...CITIZEN], 'tech'),

  // ─── BI → Bütün ───────────────────────────────────────────────────────────
  ...links('bi', [...CORP, 'reyestr', ...OPS, ...CITIZEN], 'tech'),

  // ─── DW → Bütün ───────────────────────────────────────────────────────────
  ...links('dw', [...CORP, 'reyestr', ...OPS, ...CITIZEN, 'bi'], 'tech'),

  // ─── Notify → Bütün ───────────────────────────────────────────────────────
  ...links('notify', [...CORP, 'reyestr', ...OPS, ...CITIZEN], 'tech'),

  // ─── Storage → Bütün ──────────────────────────────────────────────────────
  ...links('storage', [...CORP, 'reyestr', ...OPS, ...CITIZEN], 'tech'),

  // ─── Mobile → Bütün Əməliyyat + Reyestr + Audit ───────────────────────────
  ...links('mobile', [...OPS, 'reyestr', 'audit'], 'tech'),

  // ─── eSənəd → connections ──────────────────────────────────────────────────
  ...links('esened', OPS, 'corp2ops'),
  ...links('esened', ['halga','task','hr','arxiv'], 'corp2ops'),
  { from: 'esened', to: 'mygov', type: 'citizen' },

  // ─── halga → connections ───────────────────────────────────────────────────
  { from: 'halga', to: 'esened', type: 'corp2ops' },
  { from: 'halga', to: 'task',   type: 'corp2ops' },
  { from: 'halga', to: 'mygov',  type: 'citizen'  },

  // ─── GIS → connections ────────────────────────────────────────────────────
  { from: 'gis', to: 'reyestr', type: 'reg2corp' },

  // ─── Yol Reyestri → connections ───────────────────────────────────────────
  ...links('reyestr', OPS,       'reg2ops'),
  { from: 'reyestr', to: 'esened', type: 'reg2corp' },

  // ─── Tapşırıqlar İdarəetmə → connections ─────────────────────────────────
  { from: 'task', to: 'esened',     type: 'corp2ops' },
  { from: 'task', to: 'halga',      type: 'corp2ops' },
  { from: 'task', to: 'istisman',   type: 'corp2ops' },
  { from: 'task', to: 'monitorinq', type: 'corp2ops' },
  { from: 'task', to: 'tikinti',    type: 'corp2ops' },

  // ─── İnsan Resursları → connections ───────────────────────────────────────
  ...links('hr', OPS, 'corp2ops'),
  { from: 'hr', to: 'esened', type: 'corp2ops' },

  // ─── Ödənişli Yollar → connections ────────────────────────────────────────
  { from: 'toll', to: 'odenis', type: 'citizen' },
  { from: 'toll', to: 'mygov',  type: 'citizen' },

  // ─── Nəqliyyat → connections ──────────────────────────────────────────────
  { from: 'neqliyyat', to: 'vasite',     type: 'reg2corp'  },
  { from: 'neqliyyat', to: 'tikinti',    type: 'corp2ops'  },
  { from: 'neqliyyat', to: 'monitorinq', type: 'corp2ops'  },
  { from: 'neqliyyat', to: 'istisman',   type: 'corp2ops'  },

  // ─── Elektron Arxiv → connections ─────────────────────────────────────────
  ...links('arxiv', OPS, 'corp2ops'),
  { from: 'arxiv', to: 'esened',  type: 'corp2ops' },
  { from: 'arxiv', to: 'halga',   type: 'corp2ops' },
  ...links('arxiv', CITIZEN, 'citizen'),

  // ─── Əsas Vəsaitlər → connections ────────────────────────────────────────
  ...links('vasite', OPS, 'corp2ops'),
  { from: 'vasite', to: 'esened', type: 'corp2ops' },
  { from: 'vasite', to: 'budce',  type: 'corp2ops' },

  // ─── Büdcə İnvestisiya → connections ─────────────────────────────────────
  { from: 'budce', to: 'tikinti',   type: 'corp2ops' },
  { from: 'budce', to: 'istisman',  type: 'corp2ops' },
  { from: 'budce', to: 'tehlu',     type: 'corp2ops' },
  { from: 'budce', to: 'ekologiya', type: 'corp2ops' },
  { from: 'budce', to: 'esened',    type: 'corp2ops' },
  { from: 'budce', to: 'task',      type: 'corp2ops' },

  // ─── Audit → Bütün ────────────────────────────────────────────────────────
  ...links('audit', [...CORP.filter(x => x !== 'audit'), 'reyestr', ...OPS, ...CITIZEN], 'corp2ops'),

  // ─── Yol Layihə Tikinti → connections ────────────────────────────────────
  { from: 'tikinti', to: 'reyestr',   type: 'ops2reg'  },
  { from: 'tikinti', to: 'neqliyyat', type: 'corp2ops' },
  { from: 'tikinti', to: 'budce',     type: 'reg2corp' },
  { from: 'tikinti', to: 'esened',    type: 'corp2ops' },

  // ─── Yol Monitorinq → connections ─────────────────────────────────────────
  { from: 'monitorinq', to: 'reyestr',   type: 'ops2reg'  },
  { from: 'monitorinq', to: 'neqliyyat', type: 'corp2ops' },
  { from: 'monitorinq', to: 'istisman',  type: 'corp2ops' },
  { from: 'monitorinq', to: 'task',      type: 'corp2ops' },
  { from: 'monitorinq', to: 'xerite',    type: 'citizen'  },
  { from: 'monitorinq', to: 'mehdudat',  type: 'citizen'  },

  // ─── Yol İstismar Təmir → connections ─────────────────────────────────────
  { from: 'istisman', to: 'reyestr',   type: 'ops2reg'  },
  { from: 'istisman', to: 'neqliyyat', type: 'corp2ops' },
  { from: 'istisman', to: 'budce',     type: 'reg2corp' },
  { from: 'istisman', to: 'task',      type: 'corp2ops' },
  { from: 'istisman', to: 'xerite',    type: 'citizen'  },
  { from: 'istisman', to: 'mehdudat',  type: 'citizen'  },

  // ─── Yol Təhlükəsizliyi → connections ────────────────────────────────────
  { from: 'tehlu', to: 'reyestr',    type: 'ops2reg'  },
  { from: 'tehlu', to: 'budce',      type: 'reg2corp' },
  { from: 'tehlu', to: 'monitorinq', type: 'corp2ops' },

  // ─── Ağır Nəqliyyat İcazə → connections ───────────────────────────────────
  { from: 'icaze', to: 'reyestr',    type: 'ops2reg'  },
  { from: 'icaze', to: 'monitorinq', type: 'corp2ops' },
  { from: 'icaze', to: 'esened',     type: 'corp2ops' },
  { from: 'icaze', to: 'mygov',      type: 'citizen'  },

  // ─── Kommunikasiya Keçidləri → connections ────────────────────────────────
  { from: 'komm', to: 'reyestr', type: 'ops2reg'  },
  { from: 'komm', to: 'esened',  type: 'corp2ops' },
  { from: 'komm', to: 'mygov',   type: 'citizen'  },

  // ─── Yolkənarı Xidmət → connections ──────────────────────────────────────
  { from: 'yolknar', to: 'reyestr', type: 'ops2reg'  },
  { from: 'yolknar', to: 'esened',  type: 'corp2ops' },
  { from: 'yolknar', to: 'mygov',   type: 'citizen'  },

  // ─── Yol Torpaq → connections ─────────────────────────────────────────────
  { from: 'torpaq', to: 'reyestr',  type: 'ops2reg'  },
  { from: 'torpaq', to: 'esened',   type: 'corp2ops' },
  { from: 'torpaq', to: 'istisman', type: 'corp2ops' },
  { from: 'torpaq', to: 'task',     type: 'corp2ops' },

  // ─── Yaşıllıq Ekoloji → connections ──────────────────────────────────────
  { from: 'ekologiya', to: 'reyestr',  type: 'ops2reg'  },
  { from: 'ekologiya', to: 'istisman', type: 'corp2ops' },
  { from: 'ekologiya', to: 'budce',    type: 'corp2ops' },
  { from: 'ekologiya', to: 'esened',   type: 'corp2ops' },

  // ─── myGOV → connections ──────────────────────────────────────────────────
  { from: 'mygov', to: 'halga',   type: 'citizen' },
  { from: 'mygov', to: 'icaze',   type: 'citizen' },
  { from: 'mygov', to: 'komm',    type: 'citizen' },
  { from: 'mygov', to: 'yolknar', type: 'citizen' },
  { from: 'mygov', to: 'torpaq',  type: 'citizen' },
  { from: 'mygov', to: 'toll',    type: 'citizen' },
  { from: 'mygov', to: 'reyestr', type: 'citizen' },

  // ─── İctimai Xəritə → connections ────────────────────────────────────────
  { from: 'xerite', to: 'reyestr',  type: 'citizen' },
  { from: 'xerite', to: 'istisman', type: 'citizen' },
  { from: 'xerite', to: 'mehdudat', type: 'citizen' },

  // ─── Açıq Məlumat Portalı → connections ──────────────────────────────────
  { from: 'portal', to: 'bi',      type: 'citizen' },
  { from: 'portal', to: 'reyestr', type: 'citizen' },
  { from: 'portal', to: 'tikinti', type: 'citizen' },

  // ─── Yol Məhdudiyyətləri → connections ───────────────────────────────────
  { from: 'mehdudat', to: 'istisman',   type: 'citizen' },
  { from: 'mehdudat', to: 'monitorinq', type: 'citizen' },

  // ─── Vətəndaş Chatbot → connections ──────────────────────────────────────
  { from: 'chatbot', to: 'arxiv',    type: 'citizen' },
  { from: 'chatbot', to: 'mygov',    type: 'citizen' },
  { from: 'chatbot', to: 'reyestr',  type: 'citizen' },
  { from: 'chatbot', to: 'mehdudat', type: 'citizen' },
  { from: 'chatbot', to: 'xerite',   type: 'citizen' },

  // ─── Onlayn Ödəniş → connections ─────────────────────────────────────────
  { from: 'odenis', to: 'toll', type: 'citizen' },
];
