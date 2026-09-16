import { attraction } from './attraction';
import { ratingSource } from './reviews';
import { weatherProvider } from './weather';
import { photoCredits } from './site';

/**
 * 資料來源（Sources）
 * 增強內容可信度：每一類資訊都標明出處、性質與更新頻率。
 */

export type SourceItem = {
  category: string;
  label: string;
  detail: string;
  url?: string;
  urlLabel?: string;
  updated?: string;
  note?: string;
};

export const sources: SourceItem[] = [
  {
    category: '官方旅遊',
    label: attraction.govtTourismLabel,
    detail: '宜蘭縣政府發布的景點、活動與旅遊資訊，為本站景點現況與官方活動的主要對照來源。',
    url: attraction.govtTourismUrl,
    urlLabel: 'travel.yilan.gov.tw',
  },
  {
    category: '官方旅遊',
    label: attraction.nationalTourismLabel,
    detail: '交通部觀光署的全國性旅遊與節慶資訊，用於核對跨縣市行程與季節活動。',
    url: attraction.nationalTourismUrl,
    urlLabel: 'taiwan.net.tw',
  },
  {
    category: '作品與空間',
    label: attraction.officialWorkLabel,
    detail:
      '幾米官方網站的宜蘭幾米廣場作品介紹，是本站「繪本場景解碼」與裝置意義說明的依據。',
    url: attraction.officialWorkUrl,
    urlLabel: 'jimmyspa.com',
  },
  {
    category: '作品與空間',
    label: '文化部國家文化記憶庫・幾米廣場',
    detail: '記錄宜興路再生案、田中央工作群與幾米廣場形成的脈絡，為本站歷史時間軸的主要依據。',
    url: 'https://tcmb.culture.tw/zh-tw/detail?indexCode=Culture_Place&id=132503',
    urlLabel: 'tcmb.culture.tw',
  },
  {
    category: '作品與空間',
    label: '文化部國家文化記憶庫・宜蘭市幸福轉運站',
    detail: '記錄舊台汽客運站的沿革與再造過程，為本站幸福轉運站背景說明的依據。',
    url: 'https://tcmb.culture.tw/zh-tw/detail?id=132507&indexCode=Culture_Place',
    urlLabel: 'tcmb.culture.tw',
  },
  {
    category: '天氣',
    label: `即時天氣與 7 日預報・${weatherProvider.name}`,
    detail: '本頁天氣模組的即時觀測與未來 7 日預報來源，資料會定期更新。',
    url: weatherProvider.url,
    urlLabel: 'open-meteo.com',
    updated: '每小時更新',
  },
  {
    category: '天氣',
    label: '交通部中央氣象署',
    detail: '長期氣候平均（約 1991–2020 年）與颱風、豪雨等警特報的官方依據；季度策略表的氣候區間由此整理。',
    url: 'https://www.cwa.gov.tw/',
    urlLabel: 'cwa.gov.tw',
    note: '颱風警報期間請以氣象署與縣府公告為準。',
  },
  {
    category: '交通',
    label: '臺灣鐵路公司',
    detail: '宜蘭車站的列車時刻、車站設施與站區服務資訊，請以臺鐵官方公告為準。',
    url: 'https://www.railway.gov.tw/',
    urlLabel: 'railway.gov.tw',
    updated: '依官方公告',
  },
  {
    category: '評價',
    label: `Google 地圖用戶評價 · 同步時間 ${ratingSource.syncedAt}`,
    detail: ratingSource.blockNote,
    url: ratingSource.reviewUrl,
    urlLabel: '在 Google 地圖查看全部評價',
    updated: ratingSource.syncedAt,
    note: '本站僅呈現評分與評價數量，不轉載逐字評價內容；評價只於頁面展示，未寫入任何結構化資料。',
  },
];

/** 照片授權來源（與頁尾授權摘要共用同一份資料） */
export const photoSource = {
  category: '照片',
  label: '真實照片授權（Wikimedia Commons / Creative Commons）',
  detail: '照片依各自的 CC 條款使用，已進行尺寸調整、裁切與 WebP 轉檔；版權歸原作者所有。',
  items: photoCredits.map((credit) => ({
    label: `${credit.work}｜${credit.author}｜${credit.license}`,
    url: credit.url,
  })),
} as const;

/** 免責與更新聲明 */
export const sourceDisclaimer = [
  'JimmyPark.org 為獨立製作的非營利旅遊科普網站，與幾米品牌、宜蘭縣政府、臺灣鐵路公司及各景點營運單位沒有隸屬、委託或授權關係。',
  '開放時間、設施、費用、交通與活動可能調整；實際安排請以現場公告與相關單位的官方資訊為準。',
  '本頁內容定期檢視更新；若發現錯誤或過期資訊，歡迎透過站內資訊協助修正。',
];
