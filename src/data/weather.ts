import { attraction } from './attraction';

/**
 * 天氣模組：即時天氣與多日預報
 *
 * 取數方式：
 * 1. 伺服器端（Astro 元件 frontmatter / 建置期）先取一次，讓頁面首屏就有內容，
 *    並把結果作為快取版本；
 * 2. 瀏覽器載入後再取一次最新資料並更新畫面，避免靜態頁面的預報過期；
 * 3. 兩次都失敗時，改用長期氣候平均（常年氣候態）呈現，畫面不會出現空白。
 *
 * 本檔同時提供伺服器端與瀏覽器端共用的解析與換算函式，
 * 確保兩端算出的建議完全一致。
 */

export type CurrentWeather = {
  temperature: number;
  apparentTemperature: number;
  humidity: number;
  precipitation: number;
  windSpeed: number;
  /** 陣風風速（km/h） */
  windGusts: number;
  /** 即時紫外線指數 */
  uvIndex: number | null;
  weatherCode: number;
  isDay: boolean;
  observedAt: string | null;
};

export type DailyWeather = {
  date: string;
  weatherCode: number;
  max: number | null;
  min: number | null;
  precipitationProbability: number | null;
  precipitationSum: number | null;
  uvIndexMax: number | null;
  /** 當日最大平均風速（km/h） */
  windSpeedMax: number | null;
  /** 當日最大陣風（km/h） */
  windGustsMax: number | null;
};

export type WeatherSnapshot = {
  current: CurrentWeather | null;
  daily: DailyWeather[];
  /** 資料更新時間（ISO 字串） */
  updatedAt: string | null;
  /** true 表示即時預報取不到，畫面顯示的是常年氣候平均 */
  fallback: boolean;
};

/** 景點地理環境類型：不同地形會側重不同的旅遊建議 */
export type EnvironmentProfile =
  | 'urban'
  | 'coast'
  | 'mountain'
  | 'river'
  | 'forest'
  | 'cave'
  | 'desert';

/**
 * 幾米主題廣場位於宜蘭市火車站旁的舊鐵路宿舍區，屬「城市公園」，
 * 沒有海邊、山區或水域的特殊環境風險，因此建議側重體感溫度與防暑。
 */
export const weatherEnvironment: EnvironmentProfile = 'urban';

export const weatherProvider = {
  name: 'Open-Meteo 氣象預報服務',
  url: 'https://open-meteo.com/',
} as const;

/** 官方氣象特報來源（宜蘭地區） */
export const officialAlertSource = {
  name: '中央氣象署',
  url: 'https://www.cwa.gov.tw/V8/C/W/OBS_County.html?ID=10002',
} as const;

const TIMEZONE = 'Asia%2FTaipei';

/** 預報天數：即時 + 未來 7 日 */
export const FORECAST_DAYS = 7;

/** 建立預報資料請求網址（伺服器端與瀏覽器端共用同一組參數） */
export function buildWeatherUrl(forecastDays = FORECAST_DAYS): string {
  const current = [
    'temperature_2m',
    'relative_humidity_2m',
    'apparent_temperature',
    'precipitation',
    'weather_code',
    'wind_speed_10m',
    'wind_gusts_10m',
    'uv_index',
    'is_day',
  ].join(',');
  const daily = [
    'weather_code',
    'temperature_2m_max',
    'temperature_2m_min',
    'precipitation_probability_max',
    'precipitation_sum',
    'uv_index_max',
    'wind_speed_10m_max',
    'wind_gusts_10m_max',
  ].join(',');

  return (
    `https://api.open-meteo.com/v1/forecast?latitude=${attraction.latitude}` +
    `&longitude=${attraction.longitude}` +
    `&current=${current}&daily=${daily}` +
    `&timezone=${TIMEZONE}&forecast_days=${forecastDays}`
  );
}

type OpenMeteoResponse = {
  current?: Record<string, number | string | null>;
  daily?: {
    time?: string[];
    weather_code?: number[];
    temperature_2m_max?: (number | null)[];
    temperature_2m_min?: (number | null)[];
    precipitation_probability_max?: (number | null)[];
    precipitation_sum?: (number | null)[];
    uv_index_max?: (number | null)[];
    wind_speed_10m_max?: (number | null)[];
    wind_gusts_10m_max?: (number | null)[];
  };
  current_units?: Record<string, string>;
};

const num = (value: unknown): number | null =>
  typeof value === 'number' && Number.isFinite(value) ? value : null;

/** 把原始 API 回應解析成兩端共用的快照結構 */
export function snapshotFromPayload(payload: unknown): WeatherSnapshot {
  const data = (payload ?? {}) as OpenMeteoResponse;
  const raw = data.current ?? {};
  const temperature = num(raw.temperature_2m);
  const current: CurrentWeather | null =
    temperature === null
      ? null
      : {
          temperature,
          apparentTemperature: num(raw.apparent_temperature) ?? temperature,
          humidity: num(raw.relative_humidity_2m) ?? 0,
          precipitation: num(raw.precipitation) ?? 0,
          windSpeed: num(raw.wind_speed_10m) ?? 0,
          windGusts: num(raw.wind_gusts_10m) ?? num(raw.wind_speed_10m) ?? 0,
          uvIndex: num(raw.uv_index),
          weatherCode: num(raw.weather_code) ?? 0,
          isDay: num(raw.is_day) !== 0,
          observedAt: typeof raw.time === 'string' ? raw.time : null,
        };

  const daily: DailyWeather[] = (data.daily?.time ?? []).map((date, index) => ({
    date,
    weatherCode: data.daily?.weather_code?.[index] ?? 0,
    max: num(data.daily?.temperature_2m_max?.[index]),
    min: num(data.daily?.temperature_2m_min?.[index]),
    precipitationProbability: num(data.daily?.precipitation_probability_max?.[index]),
    precipitationSum: num(data.daily?.precipitation_sum?.[index]),
    uvIndexMax: num(data.daily?.uv_index_max?.[index]),
    windSpeedMax: num(data.daily?.wind_speed_10m_max?.[index]),
    windGustsMax: num(data.daily?.wind_gusts_10m_max?.[index]),
  }));

  return {
    current,
    daily,
    updatedAt: current?.observedAt ?? new Date().toISOString(),
    fallback: false,
  };
}

/**
 * 宜蘭市長期氣候平均（約略區間，用於預報服務無法連線時的備援說明）
 * 欄位：月 / 平均高溫 / 平均低溫 / 月平均降雨日數
 */
export const climateNormals = [
  { month: 1, label: '1 月', high: 19, low: 13, rainDays: 17, note: '東北季風，濕冷綿雨' },
  { month: 2, label: '2 月', high: 20, low: 14, rainDays: 16, note: '春雨前緣，仍有鋒面' },
  { month: 3, label: '3 月', high: 22, low: 15, rainDays: 17, note: '春季鋒面通過' },
  { month: 4, label: '4 月', high: 25, low: 18, rainDays: 15, note: '相對穩定的散步月份' },
  { month: 5, label: '5 月', high: 28, low: 21, rainDays: 17, note: '梅雨開始' },
  { month: 6, label: '6 月', high: 30, low: 23, rainDays: 15, note: '梅雨尾聲、轉炎熱' },
  { month: 7, label: '7 月', high: 32, low: 25, rainDays: 11, note: '炎熱、午後雷陣雨' },
  { month: 8, label: '8 月', high: 32, low: 25, rainDays: 12, note: '颱風好發' },
  { month: 9, label: '9 月', high: 30, low: 23, rainDays: 15, note: '秋雨與颱風' },
  { month: 10, label: '10 月', high: 27, low: 21, rainDays: 18, note: '東北季風增強' },
  { month: 11, label: '11 月', high: 24, low: 18, rainDays: 19, note: '全年降雨高峰之一' },
  { month: 12, label: '12 月', high: 21, low: 14, rainDays: 18, note: '濕冷、日照偏少' },
] as const;

export function currentNormals(date = new Date()) {
  return climateNormals[date.getUTCMonth()] ?? climateNormals[0];
}

/** 備援快照：預報服務無法連線時，改為呈現常年氣候平均 */
export function fallbackSnapshot(date = new Date()): WeatherSnapshot {
  const normals = currentNormals(date);
  return {
    current: {
      temperature: Math.round((normals.high + normals.low) / 2),
      apparentTemperature: Math.round((normals.high + normals.low) / 2),
      humidity: 78,
      precipitation: 0,
      windSpeed: 0,
      windGusts: 0,
      uvIndex: null,
      weatherCode: 3,
      isDay: true,
      observedAt: null,
    },
    daily: [],
    updatedAt: null,
    fallback: true,
  };
}

/** 伺服器端取數：失敗時回傳常年氣候平均，不讓區塊開天窗 */
export async function fetchWeather(forecastDays = FORECAST_DAYS): Promise<WeatherSnapshot> {
  try {
    const response = await fetch(buildWeatherUrl(forecastDays), {
      signal: AbortSignal.timeout(6000),
      headers: { accept: 'application/json' },
    });
    if (!response.ok) throw new Error(`weather responded ${response.status}`);
    const payload = await response.json();
    const snapshot = snapshotFromPayload(payload);
    if (!snapshot.current && snapshot.daily.length === 0) return fallbackSnapshot();
    return snapshot;
  } catch {
    return fallbackSnapshot();
  }
}

/** WMO 天氣代碼 → 中文描述 */
const weatherCodeMap: Record<number, { text: string; kind: WeatherKind }> = {
  0: { text: '晴', kind: 'clear' },
  1: { text: '大致晴朗', kind: 'clear' },
  2: { text: '局部多雲', kind: 'partly' },
  3: { text: '陰', kind: 'cloud' },
  45: { text: '有霧', kind: 'fog' },
  48: { text: '霧凇', kind: 'fog' },
  51: { text: '輕微毛毛雨', kind: 'drizzle' },
  53: { text: '毛毛雨', kind: 'drizzle' },
  55: { text: '濃密毛毛雨', kind: 'drizzle' },
  56: { text: '凍毛毛雨', kind: 'drizzle' },
  57: { text: '凍毛毛雨', kind: 'drizzle' },
  61: { text: '小雨', kind: 'rain' },
  63: { text: '雨', kind: 'rain' },
  65: { text: '大雨', kind: 'rain' },
  66: { text: '凍雨', kind: 'rain' },
  67: { text: '凍雨', kind: 'rain' },
  71: { text: '小雪', kind: 'snow' },
  73: { text: '雪', kind: 'snow' },
  75: { text: '大雪', kind: 'snow' },
  77: { text: '雪粒', kind: 'snow' },
  80: { text: '陣雨', kind: 'rain' },
  81: { text: '陣雨', kind: 'rain' },
  82: { text: '強陣雨', kind: 'rain' },
  85: { text: '陣雪', kind: 'snow' },
  86: { text: '強陣雪', kind: 'snow' },
  95: { text: '雷雨', kind: 'storm' },
  96: { text: '雷雨伴冰雹', kind: 'storm' },
  99: { text: '強雷雨伴冰雹', kind: 'storm' },
};

export type WeatherKind =
  | 'clear'
  | 'partly'
  | 'cloud'
  | 'fog'
  | 'drizzle'
  | 'rain'
  | 'snow'
  | 'storm';

export function describeWeather(code: number): { text: string; kind: WeatherKind } {
  return weatherCodeMap[code] ?? { text: '—', kind: 'cloud' };
}

/** 蒲福風級門檻（km/h）：對應 1～12 級的下限 */
const BEAUFORT_LOWER_BOUNDS = [1, 6, 12, 20, 29, 39, 50, 62, 75, 89, 103, 118];

/** 風速（km/h）→ 蒲福風級（0～12） */
export function beaufortFromKmh(kmh: number | null | undefined): number {
  if (kmh === null || kmh === undefined || !Number.isFinite(kmh)) return 0;
  const value = Math.max(0, kmh);
  return BEAUFORT_LOWER_BOUNDS.reduce((force, bound) => (value >= bound ? force + 1 : force), 0);
}

/** 風級 → 口語描述（避免氣象術語） */
export function windForceLabel(force: number): string {
  if (force <= 1) return '微風';
  if (force <= 3) return '輕風';
  if (force === 4) return '和風';
  if (force <= 6) return '風力偏大';
  if (force <= 8) return '強風';
  return '狂風';
}

const WEEKDAYS = ['週日', '週一', '週二', '週三', '週四', '週五', '週六'];

/** '2026-09-16' → { monthDay: '9/16', weekday: '週三', isToday } */
export function formatDay(dateString: string, today = todayString()) {
  const date = new Date(`${dateString}T00:00:00+08:00`);
  if (Number.isNaN(date.getTime())) return { monthDay: dateString, weekday: '', isToday: false, full: dateString };
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return {
    monthDay: `${month}/${day}`,
    weekday: WEEKDAYS[date.getDay()] ?? '',
    isToday: dateString === today,
    full: `${year} 年 ${month} 月 ${day} 日`,
  };
}

export function todayString(date = new Date()): string {
  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Taipei',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(date);
}
