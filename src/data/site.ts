export const site = {
  name: '宜蘭幾米公園',
  shortName: 'JimmyPark.org',
  url: 'https://jimmypark.org',
  description:
    '宜蘭幾米公園獨立旅遊指南：整理宜蘭火車站步行路線、拍照重點、交通停車、雨天提醒與附近景點。',
  address: '宜蘭縣宜蘭市宜興路一段 240 號一帶',
  latitude: 24.7526264,
  longitude: 121.7570038,
  mapUrl:
    'https://www.google.com/maps/search/?api=1&query=24.7526264%2C121.7570038',
  mapEmbedUrl:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7246.499399378726!2d121.75700379999999!3d24.7526264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3467e4dbc6e93575%3A0x228deaad2ab12961!2z5Yeg57Gz5YWs5Zut!5e0!3m2!1szh-CN!2stw!4v1785316676077!5m2!1szh-CN!2stw',
};

export const quickFacts = [
  { label: '門票', value: '免費參觀', note: '戶外公共藝術空間' },
  { label: '開放', value: '全天開放', note: '實際以現場公告為準' },
  { label: '步行', value: '車站約 3 分鐘', note: '由宜蘭站前站出發' },
  { label: '停留', value: '30–60 分鐘', note: '聯遊可安排半日' },
] as const;

export const routes = [
  {
    id: 'quick',
    label: '30 分鐘',
    title: '快速拍照路線',
    summary: '適合轉車、帶著行李，或只想快速收集經典畫面。',
    stops: ['宜蘭火車站', '幾米主題廣場', '行李箱裝置', '返回車站'],
  },
  {
    id: 'classic',
    label: '60 分鐘',
    title: '站前經典路線',
    summary: '把幾米公園、丟丟噹森林與宜蘭車站一次走完。',
    stops: ['宜蘭火車站', '丟丟噹森林', '星空列車', '幾米主題廣場', '幸福轉運站'],
  },
  {
    id: 'halfday',
    label: '半日',
    title: '宜蘭舊城散步',
    summary: '適合第一次來宜蘭，從站前藝術一路走進舊城。',
    stops: ['幾米公園', '宜蘭文學館', '設治紀念館', '宜蘭酒廠', '東門夜市'],
  },
] as const;

export const highlights = [
  {
    title: '幾米主題廣場',
    eyebrow: '核心景點',
    image: 'plaza-walkway',
    alt: '宜蘭幾米主題廣場的戶外步道與裝置藝術',
    description:
      '舊鐵路宿舍、老樹與繪本場景交錯，是整段散步最有故事感的區域。建議先慢慢走一圈，再回頭補拍喜歡的畫面。',
    tip: '上午較容易拍到乾淨背景；夏季中午遮蔭有限。',
  },
  {
    title: '行李箱與旅行意象',
    eyebrow: '必拍細節',
    image: 'plaza-suitcase',
    alt: '幾米廣場步道旁的彩色行李箱裝置',
    description:
      '散落在步道旁的行李箱，把火車站、旅程與相遇的情緒串在一起。它們是藝術作品，不是椅子或遊具。',
    tip: '使用低角度拍攝，能把行李箱、步道與人物一起放進畫面。',
  },
  {
    title: '丟丟噹森林',
    eyebrow: '站前地標',
    image: 'forest-train',
    alt: '丟丟噹森林鋼構棚架下的星空列車裝置',
    description:
      '綠色鋼構像一片城市森林，列車懸在棚架之間。白天看結構與色彩，傍晚則更有故事氣氛。',
    tip: '廣角鏡頭比較容易收下列車與完整棚架。',
  },
  {
    title: '宜蘭火車站',
    eyebrow: '旅程起點',
    image: 'hero',
    alt: '繪本風格外觀的宜蘭火車站與長頸鹿裝置',
    description:
      '車站本身就是旅程的一部分。森林外牆、拱廊與長頸鹿，讓抵達宜蘭的第一眼就很不一樣。',
    tip: '站前廣場人車往來，拍照時請留意動線。',
  },
  {
    title: '幸福轉運站',
    eyebrow: '親子延伸',
    image: 'happy-station',
    alt: '宜蘭幸福轉運站的藍色圖書巴士裝置',
    description:
      '由舊轉運空間轉化而成，保留巴士與童趣裝置，適合把站前散步延長成一段親子小旅行。',
    tip: '部分設施可能有各自開放規則，請依現場標示使用。',
  },
] as const;

export const faqs = [
  {
    q: '幾米公園需要門票嗎？',
    a: '不用。幾米主題廣場是開放式公共藝術空間，可免費參觀。',
  },
  {
    q: '幾米公園和幾米廣場是同一個地方嗎？',
    a: '一般旅遊資訊多把「幾米公園」、「幾米廣場」與「幾米主題廣場」視為同一核心區域；周邊常再一起包含宜蘭火車站、丟丟噹森林與幸福轉運站。',
  },
  {
    q: '從宜蘭火車站怎麼走？',
    a: '由前站出站後往車站南側步行，約 3 分鐘即可抵達主要裝置區。全程平緩，適合步行。',
  },
  {
    q: '建議安排多久？',
    a: '只看核心裝置約 30 分鐘；連同宜蘭車站與丟丟噹森林約 60 分鐘；再走進宜蘭舊城可安排半日。',
  },
  {
    q: '下雨天適合去嗎？',
    a: '小雨仍可短暫散步，但多數區域位於戶外。大雨時建議縮短停留，並搭配附近室內文化景點。',
  },
  {
    q: '可以推嬰兒車或帶長輩嗎？',
    a: '主要動線平坦、距離不長，但部分路面與過街動線仍需留意；現場無障礙狀況請以當日實際狀況為準。',
  },
  {
    q: '附近容易停車嗎？',
    a: '宜蘭火車站、轉運站與周邊道路有停車選擇，假日熱門時段可能較滿。收費與開放狀況請以現場標示為準。',
  },
  {
    q: '晚上值得去嗎？',
    a: '夜間比較適合看站前與丟丟噹森林的氛圍；核心裝置區照明與維護狀況可能調整，建議以安全與現場環境為優先。',
  },
] as const;

export const photoCredits = [
  {
    work: '宜蘭車站日景',
    author: 'mk_is_here',
    license: 'CC BY 2.0',
    url: 'https://commons.wikimedia.org/wiki/File:Painted_on_the_building_of_TRA_Yilan_Station.jpg',
  },
  {
    work: '幾米廣場步道、行李箱與丟丟噹森林廣景',
    author: 'Padai',
    license: 'CC BY-SA 4.0',
    url: 'https://commons.wikimedia.org/wiki/Category:Jimmy_Plaza',
  },
  {
    work: '丟丟噹森林列車',
    author: 'lienyuan lee',
    license: 'CC BY 3.0',
    url: 'https://commons.wikimedia.org/wiki/File:Diu_Diu_Dang_Forest_%E4%B8%9F%E4%B8%9F%E5%99%B9%E6%A3%AE%E6%9E%97_-_panoramio.jpg',
  },
  {
    work: '宜蘭車站傍晚',
    author: '陳頤誠',
    license: 'CC BY-SA 4.0',
    url: 'https://commons.wikimedia.org/wiki/File:Yilan_Station_2.JPG',
  },
  {
    work: '宜蘭幸福轉運站',
    author: 'Tzuhsun Hsu',
    license: 'CC BY-SA 2.0',
    url: 'https://commons.wikimedia.org/wiki/File:2020-08-05_Yilan_Happy_Station_02.jpg',
  },
] as const;
