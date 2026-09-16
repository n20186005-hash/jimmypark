/**
 * 季度遊覽策略表
 *
 * 內容為「氣象 × 環境 × 生態觀察」的綜合分析，
 * 依交通部中央氣象署長期氣候平均（約 1991–2020 年）整理的概略區間撰寫，
 * 僅供行程規劃參考；實際天氣請以氣象署最新預報與本頁即時天氣為準。
 */

export type SeasonStrategy = {
  id: string;
  season: string;
  months: string;
  /** 氣象：氣溫、降雨、日照、颱風 */
  climate: string;
  temp: string;
  rainDays: string;
  /** 環境與現場條件 */
  environment: string;
  /** 生態與觀察重點 */
  nature: string;
  gear: string;
  strategy: string;
  score: string;
  accent: string;
  caution?: string;
};

export const seasonStrategies: SeasonStrategy[] = [
  {
    id: 'spring',
    season: '春季',
    months: '3–5 月',
    climate: '鋒面通過頻繁，氣溫回升快；5 月中起進入梅雨季，雨勢轉為連續性。',
    temp: '約 16–28°C',
    rainDays: '每月約 15–17 天',
    environment: '相對宜人但天氣變化快，午後常有短暫陣雨；地面乾濕交替，木質與石材步道容易濕滑。',
    nature: '舊宿舍區老樹抽新芽，是最容易觀察植物季節變化的時期；春雨後蝸牛與兩棲類活動增加。',
    gear: '薄外套、摺疊傘、防滑好走的鞋。',
    strategy: '把站前散步排在上午，午後保留舊城室內館舍作為雨天備案。',
    score: '不錯',
    accent: '#7fa07c',
  },
  {
    id: 'summer',
    season: '夏季',
    months: '6–8 月',
    climate: '高溫炎熱、紫外線強；午後雷陣雨與颱風好發，雨勢來得急也去得快。',
    temp: '約 25–33°C',
    rainDays: '每月約 11–15 天',
    environment: '遮蔭有限，正午體感悶熱；雷雨過後積水與濕滑風險高，金屬與石材表面溫度也偏高。',
    nature: '樹冠層最茂密，遮蔭效果最好；夜間照明會吸引趨光昆蟲，站前草地與樹蔭周邊昆蟲活動明顯。',
    gear: '遮陽帽、防曬、水壺、輕便雨衣（比雨傘更適合雷雨強風）。',
    strategy: '只安排清晨或傍晚兩段戶外時間，中午改走室內；出發前確認是否有颱風警報。',
    score: '需挑時段',
    accent: '#d98b44',
    caution: '颱風警報期間請勿前往，並留意縣府公告的警戒與封閉資訊。',
  },
  {
    id: 'autumn',
    season: '秋季',
    months: '9–11 月',
    climate: '9 月仍有秋雨與颱風；10 月起東北季風增強，11 月進入全年降雨高峰之一，日照偏少。',
    temp: '約 18–29°C',
    rainDays: '每月約 15–19 天',
    environment: '綿密細雨時間長，照片容易偏灰；但雨後的站前空間濕潤反光，反而適合拍攝倒影與夜間光影。',
    nature: '候鳥過境季節開始，宜蘭的濕地與河濱是觀察重點；老樹葉色轉變，光線角度較低。',
    gear: '防風薄外套、耐水鞋、相機鏡頭清潔布。',
    strategy: '以「短次數、多備案」安排：一次戶外散步搭配一個室內景點，雨勢不大時反而遊客較少。',
    score: '普通',
    accent: '#c08a4a',
    caution: '11 月降雨日數高，連續行程請務必保留室內替代方案。',
  },
  {
    id: 'winter',
    season: '冬季',
    months: '12–2 月',
    climate: '東北季風帶來的濕冷綿雨，日照時數少，偶有強烈冷氣團使氣溫明顯下降。',
    temp: '約 13–21°C',
    rainDays: '每月約 16–18 天',
    environment: '體感溫度常低於實際氣溫；地面長時間潮濕，風勢穿越站前空間時會更冷。',
    nature: '平地不易見雪，但低溫期的高山稜線可能出現結霜或降雪；舊宿舍區落葉樹枝條清晰，適合觀察植物結構。',
    gear: '防風防水外套、保暖層、手套與防水鞋。',
    strategy: '挑選鋒面間的空檔出發；把行程縮短為 30–40 分鐘的精華散步，並安排熱食與室內休息。',
    score: '需看天氣',
    accent: '#6f8ba3',
    caution: '濕冷環境對長輩與幼兒負擔較大，請縮短停留並注意保暖。',
  },
];

/** 相對適合度總覽（依長期氣候平均，非即時預報） */
export const seasonSummary = [
  { label: '最穩定的散步月份', value: '4 月、7 月' },
  { label: '需特別留意的月份', value: '11 月、5–6 月梅雨、8–9 月颱風' },
  { label: '全年降雨特性', value: '降雨日數偏多，全年皆建議攜帶雨具' },
  { label: '單次建議停留', value: '晴天 60–90 分鐘；雨天 30 分鐘內' },
] as const;
