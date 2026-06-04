// gg = 2 green ticks, gb = 1 green + 1 grey, bb = 2 grey, b = 1 grey tick only
export const SYS_TICK = {
  meis: 'gg', esened: 'gg',
  reyestr: 'gb', toll: 'gb', hr: 'gb', mygov: 'gb', odenis: 'gb', portal: 'gb', audit: 'gb', tehlu: 'gb',
  api: 'bb', bi: 'bb', dw: 'bb', notify: 'bb', storage: 'bb', mobile: 'bb', halga: 'bb', task: 'bb',
  arxiv: 'bb', vasite: 'bb', budce: 'bb', neqliyyat: 'bb', tikinti: 'bb', monitorinq: 'bb',
  istisman: 'bb', icaze: 'bb', komm: 'bb', yolknar: 'bb', xerite: 'bb', mehdudat: 'bb', chatbot: 'bb',
  torpaq: 'b', ekologiya: 'b',
};

export const TICK_GREEN = '#16A97A';
export const TICK_GREY  = '#B8BFC9';

export const TICK_LABELS = {
  gg: 'Quraşdırılıb',
  gb: 'Quraşdırılma ərəfəsidir',
  bb: 'Funksional tələb hazırlanır',
  b:  'Sistemin qurulması təsdiqlənib',
  '0': 'Status yoxdur',
};
