import { attraction } from './attraction';

/**
 * Google 地圖評分與評價
 *
 * 合規原則（重要）：
 * 1. 評分與評價數屬於 Google 地圖上的用戶生成內容，本站只做「同步呈現」，
 *    並同步標示來源與同步時間。
 * 2. 評價內容只保留在頁面上展示，不寫入任何 JSON-LD 結構化資料
 *    （不產生 aggregateRating / review 節點），避免被判為自製評價。
 * 3. 逐字評價文字的著作權歸原作者與 Google 地圖所有，本站不轉載全文，
 *    一律以「在 Google 地圖查看全部評價」外部連結導回原始來源。
 */

export const ratingSource = {
  /** Google 地圖星等評分 */
  rating: 4.1,
  /** 滿分 */
  ratingScale: 5,
  /** Google 地圖累積評價數 */
  ratingCount: 16920,
  /** Google 地圖商家類別 */
  category: attraction.googleCategory,
  /** 同步時間（人工核對 Google 地圖資料的時間） */
  syncedAt: '2026 年 9 月',
  /** 全部評價的外部連結（Google 地圖） */
  reviewUrl: attraction.mapsShareUrl,
  /** 地圖導航連結（Google 地圖） */
  mapUrl: attraction.mapsQueryUrl,

  /** 評分旁的小字來源說明 */
  inlineNote:
    '評分與評價數同步自 Google 地圖（Google Maps）用戶評價 · 2026 年 9 月 · 點擊查看 Google 地圖全部評價↗',
  /** 評價區塊的完整來源說明 */
  blockNote:
    '同步自 Google 地圖用戶評價，同步時間 2026 年 9 月；版權歸原作者與 Google 地圖所有。',
  /** 補充：本站不轉載逐字評價 */
  excerptNote:
    '本站僅呈現 Google 地圖公開的評分與評價數量，不轉載逐字評價內容；完整評價請至 Google 地圖查看。',
  /** 按鈕文字 */
  ctaLabel: '在 Google 地圖查看全部評價',
} as const;

/** 本站自行整理的造訪提醒（非引用任何個別旅客評價） */
export const visitNotes = [
  {
    label: '停留時間',
    text: '核心裝置區範圍不大，多數人 30–60 分鐘即可走完；想拍照或帶孩子放電，抓 90 分鐘比較從容。',
  },
  {
    label: '人潮節奏',
    text: '平日上午最舒服；週末午後與連續假期容易出現排隊拍照的人龍，建議先繞外圈再回頭補拍。',
  },
  {
    label: '天氣影響',
    text: '幾乎全程在戶外。宜蘭降雨日數偏多，雨具與防滑鞋會直接影響體驗。',
  },
  {
    label: '期待管理',
    text: '這裡是公共藝術與城市散步空間，不是主題樂園；把它接進宜蘭舊城行程會比單點停留更值得。',
  },
] as const;

/** Google 地圖上的景點基本資料（與 Google 地圖商家資訊同步） */
export const mapListing = [
  { label: '類別', value: attraction.googleCategory },
  { label: '地址', value: attraction.streetAddress },
  { label: '電話', value: attraction.telephoneDisplay },
  { label: 'Plus Code', value: attraction.plusCode },
] as const;
