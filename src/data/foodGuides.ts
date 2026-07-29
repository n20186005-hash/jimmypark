export type FoodGuide = {
  id: string;
  name: string;
  category: string;
  featuredDish: string;
  walk: string;
  price: string;
  calories: string;
  calorieBasis: string;
  summary: string;
  orderTip: string;
  timing: string;
  address: string;
  mapUrl: string;
  sourceUrl: string;
  sourceLabel: string;
  image: string;
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
  imageNote: string;
  imageCredit: {
    author: string;
    license: string;
    url: string;
  };
  accent: string;
};

export const foodGuides: FoodGuide[] = [
  {
    id: 'da-mian-zhang',
    name: '大麵章',
    category: '一碗吃飽',
    featuredDish: '麻醬乾麵（小）',
    walk: '由宜蘭站步行約 5 分鐘',
    price: 'NT$45',
    calories: '約 420–560 kcal',
    calorieBasis: '以一碗小份麻醬乾麵估算；醬量與麵量會影響熱量。',
    summary: '幼麵裹上麻醬，是很適合接在車站散步前後的一碗。想吃完整一些，可再搭配餛飩肉丸湯。',
    orderTip: '第一次吃可從小碗麻醬乾麵開始；湯另外點，比較容易掌握份量。',
    timing: '偏午後至晚間；公休日與臨時調整請出發前確認。',
    address: '宜蘭市新民路 24 號',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=%E5%A4%A7%E9%BA%B5%E7%AB%A0%20%E5%AE%9C%E8%98%AD',
    sourceUrl: 'https://marsfood.tw/da-mian-zhang/',
    sourceLabel: '近期實訪與菜單參考',
    image: '/images/food/dry-noodles.jpg',
    imageWidth: 1280,
    imageHeight: 960,
    imageAlt: '乾麵搭配青菜的餐點示意照片',
    imageNote: '乾麵示意，非店家實際出餐',
    imageCredit: {
      author: 'Alpha',
      license: 'CC BY-SA 2.0',
      url: 'https://commons.wikimedia.org/wiki/File:Zhajiangmian_by_Alpha.jpg',
    },
    accent: '#d97860',
  },
  {
    id: 'dongmen-night-market',
    name: '東門夜市嘟好燒',
    category: '邊走邊吃',
    featuredDish: '嘟好燒',
    walk: '由宜蘭站步行約 8–12 分鐘',
    price: 'NT$30／10 顆、NT$50／20 顆',
    calories: '約 300–420 kcal／10 顆',
    calorieBasis: '以甜餡油炸麵點估算；吸油量與餡料比例差異較大。',
    summary: '一口大小的古早味甜炸點，適合逛夜市時兩人分食。想試味道，先買小份就夠。',
    orderTip: '趁熱吃口感較好；不愛甜食或油炸物，可把它當作共享小點。',
    timing: '適合傍晚接續夜市行程；假日尖峰可能需要排隊。',
    address: '宜蘭東門夜市內',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=%E5%AE%9C%E8%98%AD%E6%9D%B1%E9%96%80%E5%A4%9C%E5%B8%82%E5%98%9F%E5%A5%BD%E7%87%92',
    sourceUrl: 'https://taiwanfoodie.org/restaurants/yilan_duhao_pancake/',
    sourceLabel: '份量與價格參考',
    image: '/images/food/night-market-pancake.jpg',
    imageWidth: 1280,
    imageHeight: 722,
    imageAlt: '台灣夜市常見蔥抓餅餐點示意照片',
    imageNote: '台灣夜市麵點示意，非嘟好燒實拍',
    imageCredit: {
      author: 'Levent0521',
      license: 'CC BY-SA 4.0',
      url: 'https://commons.wikimedia.org/wiki/File:%E5%8F%B0%E7%81%A3%E8%94%A5%E6%8A%93%E9%A4%85.jpg',
    },
    accent: '#c59033',
  },
  {
    id: 'zhenghao-xiaolongbao',
    name: '正好鮮肉小籠包',
    category: '午間人氣',
    featuredDish: '鮮肉小籠包（10 顆）',
    walk: '由宜蘭站步行約 20 分鐘',
    price: 'NT$110／籠',
    calories: '約 550–700 kcal／10 顆',
    calorieBasis: '以豬肉餡、薄麵皮的小籠包估算；實際大小與湯汁用油不同。',
    summary: '現包鮮肉與蔥餡，現在以外帶為主。份量接近一餐，排進午間行程會比當作零食更合適。',
    orderTip: '一人一籠約是一餐份量；兩人想多吃幾樣，可先合點一籠分食。',
    timing: '以午間為主，熱門時段可能提早售完。',
    address: '宜蘭市泰山路 25-1 號',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=%E6%AD%A3%E5%A5%BD%E9%AE%AE%E8%82%89%E5%B0%8F%E7%B1%A0%E5%8C%85%20%E5%AE%9C%E8%98%AD%E7%B8%BD%E5%BA%97',
    sourceUrl: 'https://marsfood.tw/xiaolongbao/',
    sourceLabel: '近期實訪與菜單參考',
    image: '/images/food/xiaolongbao.jpg',
    imageWidth: 1280,
    imageHeight: 856,
    imageAlt: '竹籠內的小籠包餐點示意照片',
    imageNote: '小籠包示意，非店家實際出餐',
    imageCredit: {
      author: 'Alpha',
      license: 'CC BY-SA 2.0',
      url: 'https://commons.wikimedia.org/wiki/File:Xiao_Long_Bao_dumplings.jpg',
    },
    accent: '#60856f',
  },
  {
    id: 'mahogahon',
    name: '阿娘給的蒜味肉羹',
    category: '舊城延伸',
    featuredDish: '蒜味肉羹麵／飯',
    walk: '由宜蘭站步行約 25–30 分鐘',
    price: 'NT$70；加量約 NT$80–100',
    calories: '約 420–600 kcal',
    calorieBasis: '以肉羹加一份麵或飯估算；勾芡、肉量與主食份量都會影響熱量。',
    summary: '蒜香明顯的宜蘭代表性羹湯，距離稍遠，適合併入舊城半日散步，不必為了打卡匆忙往返。',
    orderTip: '想控制份量可點基本款；不吃蒜或偏好清淡口味者，建議先評估。',
    timing: '偏早午餐至傍晚；店休日請以店家公告為準。',
    address: '宜蘭市泰山路 239-1 號',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=%E9%98%BF%E5%A8%98%E7%B5%A6%E7%9A%84%E8%92%9C%E5%91%B3%E8%82%89%E7%BE%B9',
    sourceUrl: 'https://mahogahon.com.tw/',
    sourceLabel: '店家官網菜單',
    image: '/images/food/thick-soup.jpg',
    imageWidth: 1280,
    imageHeight: 960,
    imageAlt: '勾芡羹湯的餐點示意照片',
    imageNote: '羹湯示意，非店家實際出餐',
    imageCredit: {
      author: 'SoHome Jacaranda Lilau',
      license: 'CC BY-SA 3.0',
      url: 'https://commons.wikimedia.org/wiki/File:Beef_thick_soup.jpg',
    },
    accent: '#8d6b50',
  },
  {
    id: 'beimen-mung-bean',
    name: '北門綠豆沙牛乳大王',
    category: '散步降溫',
    featuredDish: '綠豆沙牛奶',
    walk: '由宜蘭站步行約 12–15 分鐘',
    price: 'NT$60',
    calories: '約 320–450 kcal／杯',
    calorieBasis: '以約 500 ml 綠豆沙牛奶估算；糖量、牛奶與冰沙比例影響最大。',
    summary: '綿密綠豆沙加牛奶，適合天氣偏熱時安排在回程。它更接近甜點飲品，不建議把它當作無負擔飲料。',
    orderTip: '若同時還要吃甜點，可兩人分一杯；乳製品或豆類飲食限制者先詢問店家。',
    timing: '適合白天散步途中；營業日可能調整，請先確認。',
    address: '宜蘭市中山路三段 208 號',
    mapUrl: 'https://www.google.com/maps/search/?api=1&query=%E5%8C%97%E9%96%80%E7%B6%A0%E8%B1%86%E6%B2%99%E7%89%9B%E4%B9%B3%E5%A4%A7%E7%8E%8B%20%E5%AE%9C%E8%98%AD',
    sourceUrl: 'https://www.fonfood.com/store/365455',
    sourceLabel: '店家資訊與價格彙整',
    image: '/images/food/mung-bean-ice.jpg',
    imageWidth: 960,
    imageHeight: 1282,
    imageAlt: '綠豆冰品餐點示意照片',
    imageNote: '綠豆冰品示意，非店家綠豆沙牛奶實拍',
    imageCredit: {
      author: 'Leeinm',
      license: 'CC BY-SA 4.0',
      url: 'https://commons.wikimedia.org/wiki/File:Green_bean_garlic_ice.jpg',
    },
    accent: '#628469',
  },
];
