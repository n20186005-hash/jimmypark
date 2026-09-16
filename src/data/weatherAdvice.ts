import {
  beaufortFromKmh,
  describeWeather,
  windForceLabel,
  type CurrentWeather,
  type DailyWeather,
  type EnvironmentProfile,
} from './weather';

/**
 * 天氣旅遊建議引擎（伺服器端與瀏覽器端共用）
 *
 * 核心原則：
 * 1. 只輸出「使用者可以執行的動作」，不說氣象術語；
 * 2. 不符合條件的建議完全不出現（不下雨就不提雨傘）；
 * 3. 風險提醒優先度最高，一旦觸發就單獨置頂；
 * 4. 依景點地理環境（urban / coast / mountain…）側重不同建議。
 */

export type AdviceInput = {
  current: CurrentWeather | null;
  today: DailyWeather | null;
  environment?: EnvironmentProfile;
  /** 官方氣象特報（若日後接入來源則帶入），優先度最高 */
  alerts?: string[];
};

export type WeatherAdvice = {
  /** 是否出現風險提醒 */
  hasRisk: boolean;
  /** 官方氣象特報 */
  alerts: string[];
  /** 風險提醒（置頂） */
  risks: string[];
  /** 出行穿搭 */
  outfit: string[];
  /** 遊玩安排 */
  plan: string[];
  /** 隨身物品 */
  items: string[];
  /** 一句話總結 */
  headline: string;
  /** 蒲福風級 */
  windForce: number;
  /** 風級描述 */
  windLabel: string;
};

const uniqPush = (list: string[], text: string) => {
  const value = text.trim();
  if (value && !list.includes(value)) list.push(value);
};

/** 中到大雨、強陣雨等需提高警覺的降雨代碼 */
const HEAVY_RAIN_CODES = [63, 65, 66, 67, 81, 82];
/** 零星降雨 / 毛毛雨 / 小雨 */
const LIGHT_RAIN_CODES = [51, 53, 55, 56, 57, 61, 80];
/** 雷雨 */
const THUNDER_CODES = [95, 96, 99];
/** 霧 */
const FOG_CODES = [45, 48];

export function buildWeatherAdvice(input: AdviceInput): WeatherAdvice {
  const { current, today, environment = 'urban', alerts = [] } = input;

  const risks: string[] = [];
  const outfit: string[] = [];
  const plan: string[] = [];
  const items: string[] = [];

  for (const alert of alerts) {
    uniqPush(risks, `${alert} 已發布，建議調整行程，盡量避免前往山區、海邊等危險區域，並留意最新天氣變化。`);
  }

  const code = current?.weatherCode ?? today?.weatherCode ?? 3;
  const pop = today?.precipitationProbability ?? 0;
  const max = today?.max ?? current?.temperature ?? null;
  const min = today?.min ?? null;
  const uv = today?.uvIndexMax ?? current?.uvIndex ?? null;
  const isThunder = THUNDER_CODES.includes(code);
  const isHeavyRain = HEAVY_RAIN_CODES.includes(code);
  const isLightRain = LIGHT_RAIN_CODES.includes(code);
  const isFog = FOG_CODES.includes(code);
  const isDrizzleOrRain = current !== null && current.precipitation > 0;

  // 風力：取「當日陣風 / 最大風速」與即時風速的最大值，換算蒲福風級
  const windKmh = Math.max(
    today?.windGustsMax ?? 0,
    today?.windSpeedMax ?? 0,
    current?.windGusts ?? 0,
    current?.windSpeed ?? 0,
  );
  const windForce = beaufortFromKmh(windKmh);
  const windLabel = windForceLabel(windForce);

  // ── 風險提醒（優先度最高）────────────────────────────
  if (isThunder) {
    uniqPush(risks, '慎防雷擊：雷雨期間避免停留在空曠處、水邊、山頂或大樹下。');
  }
  if (isHeavyRain) {
    uniqPush(risks, '降雨較強，避開低窪地與溪谷一帶，留意積水與濕滑。');
  }
  if (isFog) {
    uniqPush(risks, '能見度較差，行車與航班可能延誤，外出多留交通時間。');
  }
  if (windForce >= 7) {
    uniqPush(risks, '風勢強勁，遠離看板、招牌、海邊礁石等處，留意掉落物。');
  }

  // ── 遊玩安排 ────────────────────────────────────────
  if (isThunder) {
    uniqPush(plan, '雷雨期間水上與空曠場地活動可能暫停，建議改走舊城室內景點。');
  }
  if (isHeavyRain) {
    uniqPush(plan, '不建議長時間戶外活動；周邊遊船、纜車類設施可能停運，出發前先確認。');
  }
  if (windForce >= 7) {
    uniqPush(plan, '戶外與水上設施多半暫停，行程請預留室內備案。');
  } else if (windForce >= 5) {
    uniqPush(plan, '風力偏大，海邊船班與露天設施可能停航停運，帽子與寬鬆衣物容易被吹走。');
  }
  if (pop >= 60) {
    uniqPush(plan, '降雨機率高，優先安排室內場館，戶外行程建議保留彈性、隨時可調整。');
  } else if (isLightRain || isDrizzleOrRain) {
    uniqPush(plan, '有零星小雨，露天座位與裝置體驗較差，地面濕滑請留意腳步。');
  }
  if (max !== null && max >= 32) {
    uniqPush(plan, '氣溫偏高，盡量避開正午時段外出，並縮短連續戶外停留時間。');
  }
  if (uv !== null && uv >= 5) {
    uniqPush(plan, '紫外線偏強，長時間曝曬記得定時補擦防曬。');
  }

  const weatherText = describeWeather(code).text;
  const isClear = code === 0 || code === 1;
  const isOvercast = code === 3;
  const wetDay = isThunder || isHeavyRain || pop >= 60;
  if (!wetDay) {
    if (isClear && (max === null || max < 32)) {
      uniqPush(plan, '天氣晴朗，很適合戶外散步；順光時段拍建築與裝置會更乾淨。');
    }
    if (isOvercast) {
      uniqPush(plan, '光線柔和，很適合拍照；沒有日照直曬，也適合在戶外慢慢走逛。');
    }
  }
  if (plan.length === 0) {
    uniqPush(plan, '大致適合外出散步，出發前再確認一次即時天氣即可。');
  }

  // ── 出行穿搭 ────────────────────────────────────────
  uniqPush(outfit, '戶外步行為主，建議穿透氣、好走的鞋。');
  if (max !== null && min !== null && max - min > 8) {
    uniqPush(outfit, '日夜溫差大，帶一件薄外套方便隨時增減。');
  }
  if (max !== null && max >= 32) {
    uniqPush(outfit, '氣溫偏高，建議輕薄、透氣的衣物。');
  }
  if (max !== null && max <= 10) {
    uniqPush(outfit, '氣溫偏低，注意保暖，採洋蔥式穿法。');
  }
  if (isHeavyRain || isThunder) {
    uniqPush(outfit, '風雨較大，建議穿防水外套與防滑鞋。');
  } else if (windForce >= 5) {
    uniqPush(outfit, '風力偏大，建議加一件防風外套。');
  }

  // ── 隨身物品 ────────────────────────────────────────
  if (isThunder || isHeavyRain) {
    uniqPush(items, '雨衣（風大時長柄傘不好拿）');
  } else if (pop >= 60) {
    uniqPush(items, '雨傘或輕便雨衣');
  } else if (isLightRain) {
    uniqPush(items, '折疊傘');
  }
  if (max !== null && max >= 32) {
    uniqPush(items, '防曬用品、充足飲水、防暑小物');
  }
  if (uv !== null && uv >= 5) {
    uniqPush(items, '防曬乳、太陽眼鏡、遮陽帽');
  }
  if (max !== null && max <= 10) {
    uniqPush(items, '厚外套、圍巾');
  }
  if (isFog) {
    uniqPush(items, '口罩');
  }
  if (windForce >= 5) {
    uniqPush(items, '帽子改選貼合款式，避免寬鬆長裙被吹起');
  }
  if (items.length === 0) {
    uniqPush(items, '飲水');
  }

  // ── 依地理環境補充 ──────────────────────────────────
  const env = environmentAdvice(environment, {
    max,
    pop,
    windForce,
    uv,
    code,
    isThunder,
    isHeavyRain,
  });
  env.risks.forEach((line) => uniqPush(risks, line));
  env.plan.forEach((line) => uniqPush(plan, line));
  env.items.forEach((line) => uniqPush(items, line));

  const headline = [
    weatherText,
    min !== null && max !== null ? `${Math.round(min)}–${Math.round(max)}°C` : null,
    uv !== null && uv >= 5 ? '紫外線偏強' : null,
    windLabel,
  ]
    .filter(Boolean)
    .join('・');

  return {
    hasRisk: risks.length > 0,
    alerts: [...alerts],
    risks,
    outfit,
    plan,
    items,
    headline,
    windForce,
    windLabel,
  };
}

type EnvContext = {
  max: number | null;
  pop: number;
  windForce: number;
  uv: number | null;
  code: number;
  isThunder: boolean;
  isHeavyRain: boolean;
};

/**
 * 不同地形／景點類型的建議側重。
 * 幾米公園為 urban（城市公園），無特殊環境風險，側重體感與防暑；
 * 其餘類型保留模板，未來套用到海邊、山區等單景點頁面時可直接切換。
 */
function environmentAdvice(
  profile: EnvironmentProfile,
  ctx: EnvContext,
): { risks: string[]; plan: string[]; items: string[] } {
  const risks: string[] = [];
  const plan: string[] = [];
  const items: string[] = [];

  switch (profile) {
    case 'coast':
      if (ctx.windForce >= 5) risks.push('海邊風浪偏大，遠離礁石與消波塊。');
      if (ctx.windForce >= 6 || ctx.isThunder) plan.push('船班與水上活動可能停航，出發前先確認。');
      plan.push('留意潮汐時間，退潮前後才適合走近水邊。');
      items.push('防風外套、防滑鞋');
      break;
    case 'mountain':
      if (ctx.isThunder || ctx.pop >= 60) risks.push('山區留意落石與溪水暴漲，避免進入溪谷。');
      plan.push('山區氣溫比市區低、雲霧變化快，留意能見度與保暖。');
      items.push('保暖中層、雨衣、登山鞋');
      break;
    case 'river':
      if (ctx.isThunder) risks.push('雷雨時遠離水域，避免戲水。');
      plan.push('下水前先確認水溫與水流，午後雷陣雨常見。');
      items.push('換洗衣物、防滑鞋');
      break;
    case 'forest':
      plan.push('林間蚊蟲較多，建議穿著長袖長褲並留意步伐。');
      items.push('防蚊液、個人常備藥');
      break;
    case 'cave':
      plan.push('洞內溫度較低、地面濕滑，留意腳步與保暖。');
      items.push('薄外套、止滑鞋');
      break;
    case 'desert':
      if (ctx.max !== null && ctx.max >= 32) risks.push('地表高溫，避開正午時段活動。');
      plan.push('日夜溫差大，注意防曬與持續補水。');
      items.push('防風沙用品、充足飲水');
      break;
    case 'urban':
    default:
      if (ctx.max !== null && ctx.max >= 30) {
        plan.push('市區建築密集，午後體感偏悶熱，可安排騎樓或有冷氣的室內空間休息。');
      }
      break;
  }

  return { risks, plan, items };
}
