export type PhotoGuide = {
  id: 'station' | 'forest' | 'train' | 'plaza' | 'happy';
  title: string;
  eyebrow: string;
  image: string;
  alt: string;
  template: 'ticket' | 'forest' | 'starlight' | 'notebook' | 'sunset';
  bestFor: string;
  lens: string;
  light: string;
  crowd: string;
  position: string;
  subject: string;
  background: string;
  sunny: string;
  rainy: string;
  safety: string;
};

export const photoGuides: PhotoGuide[] = [
  {
    id: 'station',
    title: '宜蘭火車站',
    eyebrow: '旅程起點',
    image: 'hero',
    alt: '宜蘭火車站繪本風格外觀與長頸鹿裝置',
    template: 'ticket',
    bestFor: '站體、長頸鹿與人物一起入鏡',
    lens: '手機 1×；想收完整站體可退後再拍',
    light: '上午或日落前，站體色彩較柔和',
    crowd: '等出站人潮出現空檔再按快門',
    position: '站在站前廣場的行人區，與站體保持一段距離，不必走進車道。',
    subject: '人物放在畫面左下或右下，身體稍微轉向車站，避免完全擋住入口。',
    background: '保留站名、森林感外牆與長頸鹿，讓照片一眼能辨認抵達宜蘭。',
    sunny: '使用站體遮蔭的一側拍人像，避免臉部過亮或瞇眼。',
    rainy: '站在有遮蔭的位置拍向外側，把透明傘和濕地反光一起放進畫面。',
    safety: '站前有人車往來；不要站進道路，也不要長時間擋住車站出入口。',
  },
  {
    id: 'forest',
    title: '丟丟噹森林',
    eyebrow: '廣角大場景',
    image: 'forest-train',
    alt: '丟丟噹森林綠色鋼構棚架與星空列車',
    template: 'forest',
    bestFor: '完整鋼構、綠色棚架與城市森林感',
    lens: '手機 0.5×；邊緣變形太強時改用 1×',
    light: '白天看結構，傍晚看剪影與氣氛',
    crowd: '鏡頭略微向上，能減少地面遊客比例',
    position: '站在棚架外圍，先退到能看見完整輪廓的位置，再慢慢調整水平線。',
    subject: '人物放在下方三分之一，保持小比例，讓鋼構成為畫面主角。',
    background: '保留棚架的重複線條，避免裁掉頂部，讓視線自然往列車方向延伸。',
    sunny: '先對天空較亮處測光，再稍微提高人物亮度，避免棚架下方全黑。',
    rainy: '利用濕地反射綠色鋼構；鏡頭朝上時留意雨滴，不要邊走邊拍。',
    safety: '廣角拍攝容易不自覺後退；移動前先回頭確認行人與障礙物。',
  },
  {
    id: 'train',
    title: '星空列車',
    eyebrow: '抬頭找故事',
    image: 'forest-train',
    alt: '丟丟噹森林棚架上方的星空列車裝置',
    template: 'starlight',
    bestFor: '人物與懸掛列車形成上下呼應',
    lens: '手機 0.5× 收環境；1× 突出列車',
    light: '上午輪廓清楚，傍晚更有星空感',
    crowd: '採用仰角構圖，讓人群離開主要視線',
    position: '站在棚架中央偏外側的位置，確認頭頂列車完整可見，再把手機略微向上。',
    subject: '人物站在列車斜下方，不要正好與列車重疊；可以抬頭或向前走。',
    background: '用鋼構線條框住列車，畫面上方保留少量天空，避免構圖太擁擠。',
    sunny: '列車背光時降低天空亮度，再讓人物靠近較明亮的棚架邊緣。',
    rainy: '站在棚架可避雨的位置完成構圖；不要為了角度走到濕滑或禁止進入處。',
    safety: '拍攝時仍需保留通行空間，仰拍前先確認腳下與周圍行人。',
  },
  {
    id: 'plaza',
    title: '幾米主題廣場',
    eyebrow: '細節與步道',
    image: 'plaza-suitcase',
    alt: '幾米主題廣場步道旁的彩色行李箱裝置',
    template: 'notebook',
    bestFor: '行李箱、舊屋、步道與旅行感細節',
    lens: '手機 1× 最自然；低角度可增加前景',
    light: '平日上午背景較乾淨，正午反差較強',
    crowd: '先拍一圈大景，再回頭等喜歡的細節空下來',
    position: '站在步道邊緣，將一只行李箱放在前景，手機降到腰部或更低的位置。',
    subject: '人物站在中景、稍微離開裝置，保留腳下步道，避免像坐在作品上。',
    background: '讓行李箱、老樹與舊宿舍形成前中後三層，照片會比正面合照更有深度。',
    sunny: '讓人物站在樹影或建築陰影邊緣，避免臉部出現過硬的明暗分界。',
    rainy: '用傘作為畫面色塊，選擇屋簷或樹蔭附近拍攝，並縮短戶外停留。',
    safety: '行李箱與人物裝置是藝術作品，請勿坐、踩、拉扯或攀爬。',
  },
  {
    id: 'happy',
    title: '幸福轉運站',
    eyebrow: '親子延伸',
    image: 'happy-station',
    alt: '宜蘭幸福轉運站的藍色圖書巴士裝置',
    template: 'sunset',
    bestFor: '親子互動、巴士裝置與活潑色彩',
    lens: '手機 1×；空間較窄時使用 0.5×',
    light: '下午或日落前色彩較溫暖',
    crowd: '連拍幾張互動畫面，比排排站更自然',
    position: '先確認現場可使用範圍，再站到巴士或主要裝置的斜前方，不必貼得太近。',
    subject: '親子可以牽手、向前走或互相看，將動作放在畫面中央偏下的位置。',
    background: '保留巴士輪廓與場域標誌，避免只拍到局部而看不出地點。',
    sunny: '使用建築或巴士形成的陰影柔化人物光線，背景仍保留一點暖色天空。',
    rainy: '優先選有遮蔭的構圖；兒童活動前先確認地面與設施是否適合使用。',
    safety: '部分設施可能有各自的使用與開放規則，請依現場標示並照顧兒童安全。',
  },
];
