export type RouteSegment = {
  from: string;
  to: string;
  walk: string;
  instruction: string;
  landmark: string;
  photoSpot?: 'station' | 'forest' | 'train' | 'plaza' | 'happy';
  note?: string;
};

export type RouteGuide = {
  id: 'quick' | 'classic' | 'halfday';
  label: string;
  title: string;
  summary: string;
  suitable: string;
  rhythm: string;
  accent: string;
  stops: string[];
  segments: RouteSegment[];
};

export const routeGuides: RouteGuide[] = [
  {
    id: 'quick',
    label: '約 30 分鐘',
    title: '車站與廣場快拍路線',
    summary: '適合轉車空檔、帶著行李，或只想收下幾個最具旅行感的畫面。',
    suitable: '轉車旅客・第一次到訪・輕量散步',
    rhythm: '步行約 10 分鐘，其餘時間留給拍照',
    accent: '#d97860',
    stops: ['宜蘭火車站', '幾米主題廣場', '行李箱裝置', '返回車站'],
    segments: [
      {
        from: '宜蘭火車站',
        to: '站前外觀',
        walk: '出站即達',
        instruction: '由前站出站後先停在行人空間，回頭看車站外牆與長頸鹿裝置，再決定拍攝角度。',
        landmark: '森林感外牆、拱廊與長頸鹿',
        photoSpot: 'station',
        note: '站前有人車往來，不要站進車道或阻擋旅客動線。',
      },
      {
        from: '宜蘭火車站',
        to: '幾米主題廣場',
        walk: '約 3–5 分鐘',
        instruction: '沿車站南側的主要步行方向前進，看到舊宿舍、老樹與彩色裝置後進入廣場範圍。',
        landmark: '低矮舊屋、老樹與彩色公共藝術',
        photoSpot: 'plaza',
      },
      {
        from: '主題廣場',
        to: '行李箱裝置',
        walk: '同一區域',
        instruction: '先繞外圍看整體，再回到行李箱與人物裝置附近補拍細節，避免在人多的位置久站。',
        landmark: '步道旁的彩色行李箱',
        photoSpot: 'plaza',
        note: '裝置是藝術作品，請勿坐、踩或攀爬。',
      },
      {
        from: '行李箱裝置',
        to: '宜蘭火車站',
        walk: '約 3–5 分鐘',
        instruction: '依原路返回車站；若仍有時間，可在站前廣場補拍一張完整旅程照。',
        landmark: '車站拱廊與站前廣場',
      },
    ],
  },
  {
    id: 'classic',
    label: '約 60 分鐘',
    title: '站前經典完整路線',
    summary: '把宜蘭車站、丟丟噹森林、星空列車、主題廣場與幸福轉運站依序走完。',
    suitable: '親子・情侶・攝影散步・首次到訪',
    rhythm: '步行約 20 分鐘，景點停留約 40 分鐘',
    accent: '#3c7163',
    stops: ['宜蘭火車站', '丟丟噹森林', '星空列車', '幾米主題廣場', '幸福轉運站'],
    segments: [
      {
        from: '宜蘭火車站',
        to: '丟丟噹森林',
        walk: '約 1–3 分鐘',
        instruction: '由前站出站後往綠色鋼構棚架方向移動；不用急著拍近景，先站遠一點看完整輪廓。',
        landmark: '大片綠色鋼構與樹狀棚架',
        photoSpot: 'forest',
      },
      {
        from: '丟丟噹森林',
        to: '星空列車',
        walk: '同一區域',
        instruction: '走到棚架中央後抬頭尋找懸掛列車。使用手機廣角時，將列車與鋼構一起放入畫面。',
        landmark: '棚架上方的懸掛列車',
        photoSpot: 'train',
        note: '拍照時仍要保留通行空間，並注意腳下與來往行人。',
      },
      {
        from: '星空列車',
        to: '幾米主題廣場',
        walk: '約 3–5 分鐘',
        instruction: '沿站前主要步行空間前往舊鐵路宿舍區；看到老樹、舊屋與彩色裝置後即可開始繞行。',
        landmark: '舊宿舍群與戶外公共藝術',
        photoSpot: 'plaza',
      },
      {
        from: '主題廣場入口',
        to: '行李箱與人物裝置',
        walk: '區內慢走',
        instruction: '順著步道走一圈，先拍大場景，再回頭補拍行李箱、牆面與屋舍細節。',
        landmark: '行李箱、舊牆面與步道',
        photoSpot: 'plaza',
        note: '中午遮蔭較少；小雨時注意木質或石材路面的濕滑。',
      },
      {
        from: '幾米主題廣場',
        to: '幸福轉運站',
        walk: '約 5–8 分鐘',
        instruction: '離開廣場後沿一般行人動線前往轉運站方向；遇到道路時使用號誌與標示清楚的穿越處。',
        landmark: '巴士與親子風格裝置',
        photoSpot: 'happy',
      },
      {
        from: '幸福轉運站',
        to: '宜蘭火車站',
        walk: '約 8–12 分鐘',
        instruction: '依車站方向步行返回；若不需要回站，也可以從這裡銜接宜蘭舊城行程。',
        landmark: '宜蘭車站建築',
      },
    ],
  },
  {
    id: 'halfday',
    label: '約半日',
    title: '站前藝術與宜蘭舊城',
    summary: '從站前公共藝術走進舊城文化空間，最後接到宜蘭酒廠或東門夜市。',
    suitable: '文化旅行・慢步調・不想開車的一日遊',
    rhythm: '路線約 3–4 小時，依場館停留時間調整',
    accent: '#796990',
    stops: ['幾米公園', '宜蘭文學館', '設治紀念館', '宜蘭酒廠', '東門夜市'],
    segments: [
      {
        from: '宜蘭火車站',
        to: '幾米公園',
        walk: '約 3–5 分鐘',
        instruction: '先完成站前公共藝術散步，將車站、森林棚架與主題廣場作為半日行程的開場。',
        landmark: '宜蘭車站與舊鐵路宿舍',
        photoSpot: 'plaza',
      },
      {
        from: '幾米公園',
        to: '宜蘭文學館',
        walk: '約 12–18 分鐘',
        instruction: '離開站前區後往宜蘭舊城方向步行。沿途以人行空間和有號誌的路口為主，不必追求最短捷徑。',
        landmark: '日式木造建築與庭園',
        note: '文化場館可能有休館日或入館規則，出發前請查看官方公告。',
      },
      {
        from: '宜蘭文學館',
        to: '設治紀念館',
        walk: '約 1–3 分鐘',
        instruction: '兩處距離很近，可把庭園、老樹與歷史建築安排在同一段慢慢參觀。',
        landmark: '歷史建築群與庭園空間',
      },
      {
        from: '設治紀念館',
        to: '宜蘭酒廠',
        walk: '約 8–12 分鐘',
        instruction: '沿舊城街區繼續步行，抵達酒廠後依現場開放區域參觀；不飲酒也能看建築與地方產業展示。',
        landmark: '酒廠建築與舊城街廓',
      },
      {
        from: '宜蘭酒廠',
        to: '東門夜市',
        walk: '約 12–15 分鐘',
        instruction: '若接近傍晚，可把東門夜市放在最後；白天到訪則可改走附近街區或直接返回車站。',
        landmark: '高架橋下與市場街區',
        note: '夜市攤位與營業情況會變動，以現場為準。',
      },
      {
        from: '東門夜市',
        to: '宜蘭火車站',
        walk: '約 5–8 分鐘',
        instruction: '用餐後步行回到宜蘭站，結束不需要開車的舊城半日行程。',
        landmark: '宜蘭火車站',
      },
    ],
  },
];
