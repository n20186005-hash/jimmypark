export const STAMP_STORAGE_KEY = 'jimmypark:walk-stamps:v1';

export const stampSpots = [
  {
    id: 'station',
    name: '宜蘭火車站',
    mark: '站',
    note: '從站前外觀開始',
  },
  {
    id: 'forest',
    name: '丟丟噹森林',
    mark: '森',
    note: '找到綠色鋼構',
  },
  {
    id: 'train',
    name: '星空列車',
    mark: '星',
    note: '抬頭看見列車',
  },
  {
    id: 'plaza',
    name: '幾米主題廣場',
    mark: '旅',
    note: '走進舊宿舍步道',
  },
  {
    id: 'happy',
    name: '幸福轉運站',
    mark: '福',
    note: '完成親子延伸站',
  },
] as const;

export type StampId = (typeof stampSpots)[number]['id'];

