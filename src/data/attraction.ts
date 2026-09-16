/**
 * 單景點 SEO 實體綁定配置（Entity Binding Config）
 *
 * 本檔為全站「單一景點實體」的權威資料來源：
 * JSON-LD、TDK / OG、H1–H2 語義、圖片 alt、Canonical、地圖嵌入
 * 全部由這裡的欄位推導，避免不同頁面各自硬編碼造成實體訊號不一致。
 *
 * 對應的模版變數對照：
 *   DOMAIN_NAME          -> domainName
 *   ATTRACTION_FULL_NAME -> fullName
 *   ATTRACTION_SHORT_NAME-> shortName
 *   CITY_NAME            -> cityName
 *   STATE_PROVINCE       -> stateProvince
 *   COUNTRY_NAME         -> countryName
 *   COUNTRY_CODE_2LETTER -> countryCode
 *   POSTAL_CODE          -> postalCode
 *   LATITUDE / LONGITUDE -> latitude / longitude
 *   MAPS_SHARE_URL       -> mapsShareUrl
 *   MAPS_EMBED_SRC       -> mapsEmbedSrc
 *   NEARBY_LANDMARK_1/2  -> nearbyLandmark1 / nearbyLandmark2
 *   GOVT_TOURISM_URL     -> govtTourismUrl
 */

export const attraction = {
  domainName: 'jimmypark.org',
  url: 'https://jimmypark.org',

  fullName: '幾米主題廣場（幾米公園）',
  shortName: '幾米公園',
  englishName: 'Jimmy Plaza / Jimmy Park',

  cityName: '宜蘭市',
  stateProvince: '宜蘭縣',
  countryName: '臺灣',
  countryCode: 'TW',
  postalCode: '260',

  latitude: 24.7526264,
  longitude: 121.7570038,

  /** Google 地圖上的完整地址（含村里） */
  streetAddress: '宜蘭縣宜蘭市大新里宜興路一段 240 號',
  /** 結構化資料使用的門牌地址（不含縣市，符合 PostalAddress 慣例） */
  streetAddressShort: '宜興路一段 240 號',
  /** 搜尋常見別名（實體綁定：讓「幾米公園＝幾米主題廣場＝宜蘭幾米公園」在語義上等同） */
  alternateNames: [
    '幾米公園',
    '宜蘭幾米公園',
    '幾米主題廣場',
    '宜蘭幾米主題廣場',
    '宜蘭幾米廣場',
    'Jimmy Park Yilan',
    'Jimmy Plaza Yilan',
  ],
  /** Plus Code（Google 地圖） */
  plusCode: 'QQ34+3R 宜蘭市大新里',
  /** Google 地圖商家類別 */
  googleCategory: '城市公園',
  /** Google 地圖列出的聯絡電話 */
  telephone: '+886-3-9312152',
  telephoneDisplay: '03-9312152',

  /** Google Maps 分享短連結 */
  mapsShareUrl: 'https://maps.app.goo.gl/VQnxG5cirQC55Qxd6',
  /** Google Maps 導航（座標查詢） */
  mapsQueryUrl:
    'https://www.google.com/maps/search/?api=1&query=24.7526264%2C121.7570038',
  /** Google Maps 嵌入 src */
  mapsEmbedSrc:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7246.499399378726!2d121.75700379999999!3d24.7526264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3467e4dbc6e93575%3A0x228deaad2ab12961!2z5Yeg57Gz5YWs5Zut!5e0!3m2!1szh-CN!2stw!4v1785316676077!5m2!1szh-CN!2stw',

  nearbyLandmark1: '丟丟噹森林',
  nearbyLandmark2: '宜蘭火車站',

  /** 當地政府／官方旅遊局 */
  govtTourismUrl: 'https://travel.yilan.gov.tw/',
  govtTourismLabel: '宜蘭縣政府・宜蘭勁好玩（官方旅遊網）',
  /** 國家級觀光主管機關 */
  nationalTourismUrl: 'https://www.taiwan.net.tw/',
  nationalTourismLabel: '交通部觀光署・臺灣觀光雙年曆',
  /** 景點官方作品介紹（幾米官方網站） */
  officialWorkUrl:
    'https://www.jimmyspa.com/tw/PublicArt/2008-2015/JimmySquare',
  officialWorkLabel: '幾米官方網站・宜蘭幾米廣場作品介紹',

  /** 面包屑層級：全稱 → 城市 → 縣 → 國家 */
  breadcrumb: ['幾米主題廣場（幾米公園）', '宜蘭市', '宜蘭縣', '臺灣'],
} as const;

/** 語義等位聲明：把網域含義（幾米公園）與官方全稱（幾米主題廣場）在語義上等同 */
export const entityStatement =
  `歡迎來到${attraction.fullName}，也就是大家最常搜尋的${attraction.shortName}。` +
  `它位在${attraction.cityName}、${attraction.stateProvince}、${attraction.countryName}的宜蘭火車站南側，` +
  `是認識這座城市最輕鬆的第一站。`;

/** 周邊語義集群描述 */
export const nearbyClusterStatement =
  `走訪${attraction.fullName}時，可以順著站前步行動線，` +
  `一起走進${attraction.nearbyLandmark1}與${attraction.nearbyLandmark2}，` +
  `再延伸到宜蘭舊城的文化館舍與街區。`;

/** TDK / OG（由實體欄位推導，確保標題與內文實體一致） */
export const seo = {
  url: 'https://jimmypark.org',
  title: '幾米公園完整指南｜門票、交通、必拍景點與周邊美食（宜蘭幾米廣場）',
  description:
    '宜蘭幾米公園（幾米主題廣場）最新攻略！提供宜蘭火車站交通、周邊景點（丟丟噹森林、幸福轉運站）、門票與開放時間資訊，以及熱門拍攝點介紹。',
  ogTitle: '幾米公園完整指南｜宜蘭幾米廣場門票、交通與必拍景點',
  ogDescription:
    '宜蘭市免費戶外景點完整指南：位置地圖、即時天氣與 7 日預報、散步路線、親子與無障礙路線、周邊美食與停車類型總覽。',
  image: '/images/og-jimmypark.jpg',
  imageAlt: '宜蘭幾米主題廣場與宜蘭火車站的站前風景',
} as const;

/**
 * 搜尋引擎網站驗證碼
 * 從 Google Search Console / Bing Webmaster Tools 取得後填入，
 * 欄位為空時不會輸出任何 meta，避免出現無效驗證標籤。
 */
export const siteVerification = {
  google: '',
  bing: '',
} as const;
