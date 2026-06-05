// gg = 2 green ticks (Quraşdırılıb)
// gb = 1 green tick  (Quraşdırılma ərəfəsindədir)
// bb = ft hazırlanır (Funksional tələb hazırlanır)
// b  = gözləmədə    (Gözləmədə)
export const SYS_TICK = {
  meis: 'gg',
  api: 'gg', bi: 'gb', dw: 'gb', notify: 'gb', storage: 'gg',
  esened: 'gg', halga: 'gg', task: 'gg', hr: 'gb', arxiv: 'gb', evisit: 'gb',
  reyestr: 'bb', toll: 'bb', neqliyyat: 'bb',
};

export const TICK_GREEN = '#16A97A';
export const TICK_GREY  = '#9CA3AF';

export const TICK_LABELS = {
  gg: 'Quraşdırılıb',
  gb: 'Quraşdırılma ərəfəsindədir',
  bb: 'Funksional tələb hazırlanır',
  b:  'Gözləmədə',
  '0': 'Status yoxdur',
};
