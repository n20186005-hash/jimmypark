import { attraction, seo } from './attraction';

export const site = {
  name: '宜蘭幾米公園',
  shortName: 'JimmyPark.org',
  url: attraction.url,
  description: seo.description,
  address: attraction.streetAddress,
  latitude: attraction.latitude,
  longitude: attraction.longitude,
  mapUrl: attraction.mapsQueryUrl,
  mapEmbedUrl: attraction.mapsEmbedSrc,
};

export const quickFacts = [
  { label: '門票', value: '免費參觀', note: '戶外公共藝術空間' },
  { label: '開放', value: '全天開放', note: '實際以現場公告為準' },
  { label: '步行', value: '車站 1–3 分鐘', note: '由宜蘭站前站出發' },
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
    q: '幾米公園門票多少錢？',
    a: '免門票。幾米主題廣場是開放式公共藝術空間，可自由免費參觀。',
  },
  {
    q: '幾米公園開放時間是幾點？',
    a: '幾米主題廣場為開放式戶外空間，24 小時全天開放、免門票；夜間照明與現場維護可能調整，實際以現場公告為準。',
  },
  {
    q: '幾米公園的地址在哪裡？',
    a: `地址為${attraction.streetAddress}（Plus Code：${attraction.plusCode}）。在 Google 地圖搜尋「幾米公園」即可直接導航。`,
  },
  {
    q: '從宜蘭火車站走到幾米公園要多久？',
    a: '由宜蘭火車站前站出站後往車站南側步行，站前廣場步行不到 1 分鐘，主要裝置區約 1–3 分鐘即可抵達。全程平緩，適合步行。',
  },
  {
    q: '幾米公園和幾米廣場是同一個地方嗎？',
    a: '一般旅遊資訊多把「幾米公園」、「幾米廣場」與「幾米主題廣場」視為同一核心區域；周邊常再一起包含宜蘭火車站、丟丟噹森林與幸福轉運站。',
  },
  {
    q: '幾米公園周邊還能順遊哪些景點？',
    a: '步行可串起丟丟噹森林（星空列車鋼構棚架）、宜蘭火車站與幸福轉運站（幾米大象裝置與親子溜滑梯）；時間夠可再往舊城延伸到宜蘭文學館、設治紀念館與東門夜市。',
  },
  {
    q: '幾米公園有哪些必拍景點？',
    a: '建議四個畫面：宜蘭火車站的彩繪外觀與長頸鹿、幾米主題廣場步道旁的行李箱裝置、丟丟噹森林的星空列車，以及幸福轉運站的藍色圖書巴士。手機機位與構圖請見本站「拍照指南」。',
  },
  {
    q: '幾米公園附近有什麼美食？',
    a: '站前與舊城步行範圍內有宜蘭小吃、麵食、冰品與咖啡等類型可選。本站「附近美食」頁只整理類型與選店方向，不推薦特定商家，實際營業與價格請以店家公告為準。',
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
  {
    q: '幾米公園的官方全名是什麼？',
    a: '官方名稱為「幾米主題廣場」。一般旅遊資訊所說的幾米公園、幾米廣場，多指宜蘭火車站南側的同一核心區域。',
  },
  {
    q: '幾月最適合來宜蘭？',
    a: '依長期氣候平均，4 月與 7 月降雨日數相對較少；11 月、5–6 月的梅雨與 8–9 月的颱風季要特別留意。建議出發前先看本頁的即時天氣與多日預報。',
  },
  {
    q: '可以帶寵物嗎？',
    a: '戶外空間一般可攜帶寵物，請全程繫繩、自行清理，並避免讓寵物接近裝置、花圃與其他旅客。實際規範以現場公告為準。',
  },
  {
    q: '幾米公園是官方經營的嗎？',
    a: '公共藝術由宜蘭縣政府規劃設置，現場維護與周邊設施由各權責單位負責。JimmyPark.org 是獨立製作非營利旅遊科普網站，不是官方網站。',
  },
  {
    q: '附近哪裡可以休息或上洗手間？',
    a: '幾米主題廣場本身是開放空間，沒有獨立廁所。步行 3–5 分鐘內可使用宜蘭火車站、轉運站一帶的公共洗手間與休憩空間；廣場外緣與棚架下也有少量座位。',
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
