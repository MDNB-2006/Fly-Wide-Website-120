/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { globalSupportedCountries, globalSupportedCountriesAr } from './destinations';

export interface ExtraDestination {
  id: string;
  name: string;
  nameAr: string;
  country: string;
  countryAr: string;
  continent: 'Europe' | 'Asia' | 'Americas' | 'Africa' | 'Oceania' | 'Middle East' | 'Antartica' | 'Antarctica';
  sceneryType: 'mountain' | 'beach' | 'city' | 'desert' | 'jungle';
  imageUrl: string;
  description: string;
  descriptionAr: string;
  thingsToDo: string[];
  thingsToDoAr: string[];
}

// Map each of the 120 countries to their respective continent, scenery type and custom things to do
const continentMap: Record<string, 'Europe' | 'Asia' | 'Americas' | 'Africa' | 'Oceania' | 'Middle East' | 'Antartica' | 'Antarctica'> = {
  // Europe
  "Austria": "Europe", "Albania": "Europe", "Andorra": "Europe", "Belgium": "Europe",
  "Bosnia": "Europe", "Bulgaria": "Europe", "Croatia": "Europe", "Cyprus": "Europe",
  "Czech Republic": "Europe", "Denmark": "Europe", "Estonia": "Europe", "Finland": "Europe",
  "France": "Europe", "Germany": "Europe", "Greece": "Europe", "Hungary": "Europe",
  "Iceland": "Europe", "Ireland": "Europe", "Italy": "Europe", "Latvia": "Europe",
  "Liechtenstein": "Europe", "Lithuania": "Europe", "Luxembourg": "Europe", "Malta": "Europe",
  "Monaco": "Europe", "Montenegro": "Europe", "Netherlands": "Europe", "Norway": "Europe",
  "Poland": "Europe", "Portugal": "Europe", "Romania": "Europe", "Slovakia": "Europe",
  "Slovenia": "Europe", "Spain": "Europe", "Switzerland": "Europe", "Sweden": "Europe",
  "United Kingdom": "Europe", "Vatican City": "Europe",
  // Asia
  "Bangladesh": "Asia", "Bhutan": "Asia", "Brunei": "Asia", "Cambodia": "Asia",
  "China": "Asia", "India": "Asia", "Indonesia": "Asia", "Japan": "Asia",
  "Malaysia": "Asia", "Maldives": "Asia", "Nepal": "Asia", "Pakistan": "Asia", "Philippines": "Asia",
  "Singapore": "Asia", "South Korea": "Asia", "Sri Lanka": "Asia", "Thailand": "Asia",
  "Uzbekistan": "Asia", "Vietnam": "Asia",
  // Americas
  "Argentina": "Americas", "Bahamas": "Americas", "Barbados": "Americas", "Belize": "Americas",
  "Bolivia": "Americas", "Brazil": "Americas", "Canada": "Americas", "Chile": "Americas",
  "Colombia": "Americas", "Costa Rica": "Americas", "Cuba": "Americas", "Dominica": "Americas",
  "Ecuador": "Americas", "Grenada": "Americas", "Guatemala": "Americas", "Honduras": "Americas",
  "Jamaica": "Americas", "Mexico": "Americas", "Panama": "Americas",
  "Peru": "Americas", "United States": "Americas", "Uruguay": "Americas",
  // Africa
  "Algeria": "Africa", "Angola": "Africa", "Benin": "Africa", "Botswana": "Africa",
  "Burkina Faso": "Africa", "Cameroon": "Africa", "Ethiopia": "Africa", "Gabon": "Africa",
  "Gambia": "Africa", "Ghana": "Africa", "Kenya": "Africa", "Madagascar": "Africa",
  "Mauritius": "Africa", "Morocco": "Africa", "Rwanda": "Africa", "Senegal": "Africa",
  "Seychelles": "Africa", "South Africa": "Africa", "Tanzania": "Africa", "Tunisia": "Africa",
  "Uganda": "Africa", "Zambia": "Africa", "Zimbabwe": "Africa",
  // Oceania
  "Australia": "Oceania", "Fiji": "Oceania", "New Zealand": "Oceania", "Vanuatu": "Oceania",
  // Middle East
  "Bahrain": "Middle East", "Egypt": "Middle East", "Jordan": "Middle East", "Kuwait": "Middle East",
  "Lebanon": "Middle East", "Oman": "Middle East", "Qatar": "Middle East", "Saudi Arabia": "Middle East",
  "United Arab Emirates": "Middle East", "Azerbaijan": "Middle East", "Georgia": "Middle East",
  "Armenia": "Middle East"
};

// Beautiful curations of Unsplash images grouped by categories for stunning visual cards
const unsplashImages: Record<string, string> = {
  mountain: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80",
  beach: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80",
  city: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?auto=format&fit=crop&w=800&q=80",
  desert: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=800&q=80",
  jungle: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80",
  castle: "https://images.unsplash.com/photo-1508849789987-4e5333c12b78?auto=format&fit=crop&w=800&q=80",
  ocean: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?auto=format&fit=crop&w=800&q=80",
  safari: "https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&w=800&q=80"
};

// Country-specific images map to overrides
const countryImageOverrides: Record<string, string> = {
  // Local high-fidelity regenerated images
  "Argentina": "/src/assets/images/regenerated_image_1780058110472.jpg",
  "Algeria": "/src/assets/images/regenerated_image_1780058111070.jpg",
  "Austria": "/src/assets/images/regenerated_image_1780056669161.png",
  "Albania": "/src/assets/images/regenerated_image_1780058111559.jpg",
  "Andorra": "/src/assets/images/regenerated_image_1780058110003.jpg",
  "Angola": "/src/assets/images/regenerated_image_1780058112236.jpg",
  "Antigua & Barbuda": "/src/assets/images/regenerated_image_1780056674534.png",
  "Armenia": "/src/assets/images/regenerated_image_1780058109178.jpg",
  "Australia": "/src/assets/images/regenerated_image_1780058108550.jpg",
  "Azerbaijan": "/src/assets/images/regenerated_image_1780058112627.jpg",
  "Bahamas": "/src/assets/images/regenerated_image_1780056679243.png",
  "Bahrain": "/src/assets/images/regenerated_image_1780059516221.jpg",
  "Bangladesh": "/src/assets/images/regenerated_image_1780059517037.jpg",
  "Barbados": "/src/assets/images/regenerated_image_1780059517498.jpg",
  "Belgium": "/src/assets/images/regenerated_image_1780059518371.jpg",
  "Belize": "/src/assets/images/regenerated_image_1780059519077.jpg",
  "Benin": "/src/assets/images/regenerated_image_1780059519510.jpg",
  "Bhutan": "/src/assets/images/regenerated_image_1780059519835.jpg",
  "Bolivia": "/src/assets/images/regenerated_image_1780060418358.jpg",
  "Bosnia": "/src/assets/images/regenerated_image_1780060419184.jpg",
  "Botswana": "/src/assets/images/regenerated_image_1780060420016.jpg",
  "Brazil": "/src/assets/images/regenerated_image_1780060420809.jpg",
  "Brunei": "/src/assets/images/regenerated_image_1780060421633.jpg",
  "Bulgaria": "/src/assets/images/regenerated_image_1780060422524.jpg",
  "Burkina Faso": "/src/assets/images/regenerated_image_1780060423013.jpg",
  "Cambodia": "/src/assets/images/regenerated_image_1780060423554.jpg",
  "Cameroon": "/src/assets/images/regenerated_image_1780060424084.jpg",
  "Canada": "/src/assets/images/regenerated_image_1780060424579.jpg",
  "Chile": "/src/assets/images/regenerated_image_1780060425197.jpg",
  "China": "/src/assets/images/regenerated_image_1780058104906.jpg",
  "Colombia": "/src/assets/images/regenerated_image_1780060426054.jpg",
  "Costa Rica": "/src/assets/images/regenerated_image_1780060426465.jpg",
  "Croatia": "/src/assets/images/regenerated_image_1780060426961.jpg",
  "Cuba": "/src/assets/images/regenerated_image_1780060427490.jpg",
  "Cyprus": "/src/assets/images/regenerated_image_1780060427990.jpg",
  "Czech Republic": "/src/assets/images/regenerated_image_1780060428674.jpg",
  "India": "/src/assets/images/regenerated_image_1780058105596.jpg",
  "Indonesia": "/src/assets/images/regenerated_image_1780058106256.jpg",
  "Japan": "/src/assets/images/regenerated_image_1780065119533.jpg",

  "Denmark": "/src/assets/images/regenerated_image_1780061578315.avif",
  "Dominica": "/src/assets/images/regenerated_image_1780061579620.jpg",
  "Ecuador": "/src/assets/images/regenerated_image_1780061580640.jpg",
  "Ethiopia": "/src/assets/images/regenerated_image_1780061582158.jpg",
  "Fiji": "/src/assets/images/regenerated_image_1780061587087.jpg",
  "Finland": "/src/assets/images/regenerated_image_1780061586686.jpg",
  "France": "/src/assets/images/regenerated_image_1780061586159.jpg",
  "Gabon": "/src/assets/images/regenerated_image_1780061585262.jpg",
  "Gambia": "/src/assets/images/regenerated_image_1780061584824.jpg",
  "Georgia": "/src/assets/images/regenerated_image_1780061584480.jpg",
  "Germany": "/src/assets/images/regenerated_image_1780061590959.jpg",
  "Ghana": "/src/assets/images/regenerated_image_1780061590406.jpg",
  "Greece": "/src/assets/images/regenerated_image_1780061590020.jpg",
  "Grenada": "/src/assets/images/regenerated_image_1780061589121.webp",
  "Guatemala": "/src/assets/images/regenerated_image_1780061588718.jpg",
  "Honduras": "/src/assets/images/regenerated_image_1780061587573.jpg",

  // Local high-fidelity regenerated images
  "Jordan": "/src/assets/images/regenerated_image_1780065118664.webp",
  "Kenya": "/src/assets/images/regenerated_image_1780065120530.jpg",
  "Kuwait": "/src/assets/images/regenerated_image_1780065121965.jpg",
  "Latvia": "/src/assets/images/regenerated_image_1780065123184.webp",
  "Lebanon": "/src/assets/images/regenerated_image_1780065124234.webp",
  "Liechtenstein": "/src/assets/images/regenerated_image_1780065124907.jpg",
  "Lithuania": "/src/assets/images/regenerated_image_1780065125478.webp",
  "Luxembourg": "/src/assets/images/regenerated_image_1780066812526.jpg",
  "Madagascar": "/src/assets/images/regenerated_image_1780066812011.jpg",
  "Malaysia": "/src/assets/images/regenerated_image_1780066811206.webp",
  "Maldives": "/src/assets/images/regenerated_image_1780066810635.jpg",
  "Malta": "/src/assets/images/regenerated_image_1780066810084.jpg",
  "Mauritius": "/src/assets/images/regenerated_image_1780066809559.jpg",
  "Mexico": "/src/assets/images/regenerated_image_1780066808974.webp",
  "Monaco": "/src/assets/images/regenerated_image_1780066808462.jpg",
  "Montenegro": "/src/assets/images/regenerated_image_1780066807778.jpg",
  "Morocco": "/src/assets/images/regenerated_image_1780066806840.jpg",
  "Nepal": "/src/assets/images/regenerated_image_1780066805787.avif",
  "Netherlands": "/src/assets/images/regenerated_image_1780066805101.jpg",
  "New Zealand": "/src/assets/images/regenerated_image_1780066804038.webp",
  "Norway": "/src/assets/images/regenerated_image_1780066803327.avif",
  "Oman": "/src/assets/images/regenerated_image_1780066802635.jpg",
  "Pakistan": "/src/assets/images/pakistan_landmark_1780067196338.png",
  "Panama": "/src/assets/images/regenerated_image_1780066801964.jpg",
  "Peru": "/src/assets/images/regenerated_image_1780066801005.jpg",
  "Philippines": "/src/assets/images/regenerated_image_1780066800395.webp",
  "Poland": "/src/assets/images/regenerated_image_1780066799944.jpg",
  "Portugal": "/src/assets/images/regenerated_image_1780066799294.jpg",
  "Qatar": "/src/assets/images/regenerated_image_1780066798423.webp",
  "Romania": "/src/assets/images/regenerated_image_1780066797530.webp",
  "Rwanda": "/src/assets/images/regenerated_image_1780066796761.webp",
  "Saudi Arabia": "/src/assets/images/regenerated_image_1780066796190.jpg",
  "Senegal": "/src/assets/images/regenerated_image_1780066794778.jpg",
  "Seychelles": "/src/assets/images/regenerated_image_1780066793983.jpg",
  "Singapore": "/src/assets/images/regenerated_image_1780066792899.webp",
  "Slovakia": "/src/assets/images/regenerated_image_1780066791866.jpg",
  "Slovenia": "/src/assets/images/regenerated_image_1780066790744.jpg",

  "United Kingdom": "/src/assets/images/regenerated_image_1780070113180.jpg",
  "Egypt": "https://images.unsplash.com/photo-1539650116574-8efeb43e2750?auto=format&fit=crop&w=800&q=80", // Pyramids
  "United Arab Emirates": "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?auto=format&fit=crop&w=800&q=80", // Dubai
  "United States": "/src/assets/images/regenerated_image_1780070112410.jpg",
  "Italy": "https://images.unsplash.com/photo-1529260839196-3d51211b029a?auto=format&fit=crop&w=800&q=80", // Colosseum
  "Spain": "https://images.unsplash.com/photo-1543783207-ec64e4d95325?auto=format&fit=crop&w=800&q=80", // Barcelona
  "Switzerland": "https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=800&q=80", // Alps
  "Vatican City": "/src/assets/images/regenerated_image_1780069619575.jpg",
  "Vietnam": "/src/assets/images/regenerated_image_1780069618704.webp",
  "Zambia": "/src/assets/images/regenerated_image_1780069617902.jpg",
  "Zimbabwe": "/src/assets/images/regenerated_image_1780069615975.jpg",
  "Uzbekistan": "/src/assets/images/regenerated_image_1780070111571.jpg",
  "Vanuatu": "/src/assets/images/regenerated_image_1780070110716.jpg",
  "Turkey": "/src/assets/images/regenerated_image_1780070113729.jpg"
};

const resolveLocalImageUrl = (imagePath: string): string => {
  if (!imagePath) return imagePath;
  const basePath = ((import.meta as any).env.BASE_URL || '/').replace(/\/$/, '');

  if (imagePath.startsWith('/src/assets/')) {
    return `${basePath}/assets/${imagePath.slice('/src/assets/'.length)}`;
  }

  if (imagePath.startsWith('src/assets/')) {
    return `${basePath}/assets/${imagePath.slice('src/assets/'.length)}`;
  }

  if (imagePath.startsWith('/assets/')) {
    return `${basePath}${imagePath}`;
  }

  if (imagePath.startsWith('assets/')) {
    return `${basePath}/${imagePath}`;
  }

  return imagePath;
};

// Curated landmarks mapping for regional generators
const landmarkAssets: Record<string, { desc: string, descAr: string, tasksEn: string[], tasksAr: string[], type: 'mountain' | 'beach' | 'city' | 'desert' | 'jungle' }> = {
  Europe: {
    type: 'city',
    desc: "A land of enchanted castles, chocolate hills, magical museums, and cozy winter villages!",
    descAr: "أرض القلاع الفاتنة وتلال الشوكولاتة والمتاحف السحرية والقرى الشتوية الدافئة العجيبة!",
    tasksEn: [
      "Climb a magical historic bell tower or hill view to see the stunning city below",
      "Taste yummy local treats such as warm buttery pastries, traditional street waffles, or alpine chocolates",
      "Take a scenic fairytale boat or canal ride through historical waters and stone bridges",
      "Visit an ancient wonder palace or museum filled with glowing gems and famous paintings",
      "Explore hidden cobblestone streets on a playful scavenger hunt or treasure game"
    ],
    tasksAr: [
      "تسلّق برج جرس تاريخي سحري أو إطلالة جبلية لمشاهدة المدينة الرائعة بالأسفل",
      "تذوق الحلويات المحلية اللذيذة مثل المخبوزات الدافئة، أو الوافل التقليدي، أو الشوكولاتة السويسرية",
      "خذ جولة خيالية بالقارب أو القنوات المائية عبر المياه التاريخية والجسور الحجرية",
      "قم بزيارة قصر أو متحف قديم مليء بالجواهر اللامعة واللوحات الشهيرة تاريخياً",
      "استكشف الشوارع المرصوفة بالحصى المخفية في لعبة البحث عن الكنوز المرحة للأطفال"
    ]
  },
  Asia: {
    type: 'jungle',
    desc: "Explore futuristic neon playgrounds, colorful ancient temples, panda sanctuaries, and serene forests!",
    descAr: "استكشف ساحات اللعب المستقبلية المضيئة بالنيون، المعابد القديمة الملونة، محميات الباندا، والغابات الهادئة!",
    tasksEn: [
      "Visit a rainbow-painted ornate temple to learn ancient local legends and folk tales",
      "Stroll through futuristic night playgrounds lit up with giant neon lights and holographic decorations",
      "Hop on a super-fast bullet train or private rickshaw for an exciting, speedy wind tour",
      "Walk the magical nature trails surrounded by friendly monkeys, giant bamboos, or sleepy pandas",
      "Learn to roll delicious local delights or make sweet bubble teas in a hands-on kids masterclass"
    ],
    tasksAr: [
      "عش مغامرة زيارة معبد ملون ومزين للاستماع إلى الأساطير الشعبية والقصص القديمة",
      "تجول في ملاعب ليلية مستقبلية مضيئة بمصابيح النيون العملاقة والديكورات المدهشة",
      "اركب قطاراً فائق السرعة أو عربة ريكشا تقليدية للقيام بجولة سريعة وممتعة للغاية",
      "امشِ في مسارات الطبيعة الساحرة المحاطة بالقرود اللطيفة، أو خيزران الخيزران ومحميات الباندا",
      "تعلم كيفية لف الأطعمة المحلية الشهيرة أو صنع شاي الفقاعات الحلو والملون بأنفسكم"
    ]
  },
  Americas: {
    type: 'mountain',
    desc: "Home of majestic waterfalls, magical high-tech theme parks, deep canyons, and lively beach towns!",
    descAr: "موطن الشلالات المهيبة، ومدن الألعاب الترفيهية السحرية، والأخاديد العميقة، والبلدات الشاطئية الحيوية!",
    tasksEn: [
      "Ride thrilling, family-safe roller coasters in world-famous playground estates",
      "Journey deep into scenic canyons or national parks to see fossils and ancient footprints",
      "Stand under colossal misting waterfalls and take a giant yellow boat tour underneath the spray",
      "Wander through science discovery centers and try simulating flying in space rocket designs",
      "Enjoy a golden sunset beach campfire with sweet toasted marshmallows and guitar stories"
    ],
    tasksAr: [
      "اركب الأفعوانيات المثيرة والآمنة للعائلات في مدن الألعاب الترفيهية الأكثر شهرة في العالم",
      "انطلق في رحلة عميقة إلى الأخاديد الساحرة أو المتنزهات الوطنية لرؤية آثار الديناصورات القديمة",
      "اقف تحت رذاذ الشلالات الهائلة وخذ جولة على متن قارب أصفر عملاق لاستكشاف رذاذ المياه",
      "تجول في أهم مراكز الاكتشاف العلمي وجرب محاكاة الطيران في كبسولة فضاء مجهزة",
      "استمتع بنيران الشاطئ تحت أشعة الشمس الذهبية مع حلوى المارشميلو المشوية وقصص الجيتار"
    ]
  },
  Africa: {
    type: 'jungle',
    desc: "Embark on spectacular safaris, view baby lion cubs, climb golden dunes, and dive blue coral seas!",
    descAr: "انطلق في رحلات سفاري مذهلة، وشاهد صغار الأسد اللطيفة، وتسلق المعالم الذهبية والبحار المرجانية الزرقاء!",
    tasksEn: [
      "Go on an open-roof safari drive to see spots of giant matching elephants and lion families",
      "Run up spectacular giant dunes and glide down on friendly desert sandboards",
      "Sail a traditional wooden boat across turquoise rivers to look for wild hippos and cranes",
      "Taste colorful sweet tropical fruits and learn local African jungle songs and drum circles",
      "Snorkel along the shallow coral reefs and swim alongside friendly sea turtles and starfish"
    ],
    tasksAr: [
      "اذهب في جولة سفاري بسيارة ذات سقف مكشوف لمشاهدة عائلات الفيلة الضخمة والأسود الشجاعة",
      "تسلّق الكثبان الرملية الذهبية العملاقة وتزلج عليها بألواح التزلج الرملية الآمنة لجميع الأعمار",
      "أبحر على متن قارب خشبي تقليدي عبر الأنهار الفيروزية للبحث عن أفراس النهر البرية والطيور",
      "تناول الفواكه الاستوائية الحلوة الملونة وتعلّم قرع الطبول الإفريقية وصناعة الموسيقى الشعبية",
      "قم بالغطس (سنوركل) في البحر الضحل واللعب بجانب السلاحف والأسماك الصغيرة الملونة"
    ]
  },
  Oceania: {
    type: 'beach',
    desc: "A sunny paradise of friendly koalas, private islands, giant coral reefs, and cool harbor cruises!",
    descAr: "جنة شمسية دافئة تضم دببة الكوالا اللطيفة، الجزر الخاصة الخلابة، والشعاب المرجانية العملاقة الملونة!",
    tasksEn: [
      "Meet and feed friendly kangaroos and sleep-loving fluffy koalas in an outdoor playground",
      "Ride a kids-friendly surf catamaran and glide through the clear azure harbor waves",
      "Snorkel inside a marine sanctuary and find bright orange clownfish hiding inside sea anemones",
      "Enjoy high-rope jungle walks and slide down high mountain forest tree zip-lines",
      "Have a traditional marine barbecue cooked right on the white sand beaches with fresh fruit juices"
    ],
    tasksAr: [
      "قابل حيوانات الكنغر الودودة ودببة الكوالا الناعمة وأطعمها في حديقة رعاية طبيعية مكشوفة",
      "اركب قارب كتماران شراعي آمن للأطفال وحلق مع موجات سيدني الزرقاء الساطعة",
      "استكشف أعماق المحمية البحرية واعثر على نيمو (سمكة المهرج) وهي تلعب داخل الشعاب المرجانية",
      "امشِ فوق الجسور المعلقة في الغابات الاستوائية والعب بالانزلاق الحر الآمن (الزيبلاين) وسط الأشجار",
      "استمتع بحفل شواء بحري على الطريقة الاسترالية على رمال الشاطئ البيضاء مع عصائر الفاكهة الطازجة"
    ]
  },
  "Middle East": {
    type: 'desert',
    desc: "Dazzling golden deserts, shining modern towers, camel train journeys, and historical spice lagoons!",
    descAr: "صحارٍ ذهبية ساحرة، أبراج براقة فائقة الحداثة، قوافل الجمال الذهبية، وأسواق معطرة بأجمل البهارات!",
    tasksEn: [
      "Climb to the high observation deck of a modern skyscraper to see the skyscrapers from the clouds",
      "Ride a golden camel train across the deep glowing desert sands during an amber sunset",
      "Explore historical treasure bazaars smelling of spices, sweet incense, and handcrafted toys",
      "Visit spectacular indoor glass snow-domes or water parks featuring massive lazy rivers",
      "Take an evening cruise on a traditional wooden boat to view the illuminated skyline under the moon"
    ],
    tasksAr: [
      "اصعد إلى أعلى منصة مراقبة في ناطحات السحاب الحديثة لمشاهدة المدينة من فوق السحاب",
      "اركب قافلة جمال ذهبية عبر رمال الصحراء المتوهجة خلال لحظة غروب الشمس الساحرة",
      "تجول في الأسواق الشعبية التاريخية المعطرة بالتوابل واللبان اللطيف والألعاب اليدوية الجميلة",
      "العب داخل مدن الثلج المغلقة أو الحدائق المائية العملاقة التي تحتوي على أطول نهر مريح للأطفال",
      "خذ جولة بحرية مسائية على متن قارب داو خشبي تقليدي لرؤية أضواء المدينة اللامعة تحت رداء القمر"
    ]
  }
};

// Compile our full 120 destinations array
export const all120Destinations: ExtraDestination[] = globalSupportedCountries.map((countryEn, idx) => {
  const countryAr = globalSupportedCountriesAr[idx] || countryEn;
  const continent = continentMap[countryEn] || "Europe";
  const assets = landmarkAssets[continent];
  
  const id = countryEn.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  
  // Custom interactive name generators to captivate the reader (English & Arabic)
  let name = `${countryEn} Magic Horizon`;
  let nameAr = `رحلة السحر والجمال في ${countryAr}`;
  
  if (continent === 'Europe') {
    name = `${countryEn} Alpine & Castle Wonders`;
    nameAr = `عجائب القلاع وجبال الألب في ${countryAr}`;
  } else if (continent === 'Asia') {
    name = `${countryEn} Temple & Neon Odyssey`;
    nameAr = `رحلة المعابد ونور النيون في ${countryAr}`;
  } else if (continent === 'Americas') {
    name = `${countryEn} Sun-Kissed Adventure Loop`;
    nameAr = `مغامرة الطبيعة وأجمل الشواطئ في ${countryAr}`;
  } else if (continent === 'Africa') {
    name = `${countryEn} Wilderness Safari Quest`;
    nameAr = `مكافآت السافانا والبرية في ${countryAr}`;
  } else if (continent === 'Oceania') {
    name = `${countryEn} Coral Reef & Harbor Cruise`;
    nameAr = `رحلة الشعاب المرجانية والبحار في ${countryAr}`;
  } else if (continent === 'Middle East') {
    name = `${countryEn} Golden Dune & Palace Oasis`;
    nameAr = `أسرار الكثبان الذهبية والقصور في ${countryAr}`;
  }

  // Check custom Overwrite and resolve assets to the build base path
  const rawImageUrl = countryImageOverrides[countryEn] || unsplashImages[assets.type];
  const imageUrl = resolveLocalImageUrl(rawImageUrl);

  return {
    id,
    name,
    nameAr,
    country: countryEn,
    countryAr,
    continent,
    sceneryType: assets.type,
    imageUrl,
    description: `Pack your vacation bags! Let us tour magical places in ${countryEn}. ${assets.desc}`,
    descriptionAr: `احزم حقائب السفر السعيدة! دعنا نذهب في جولة استكشافية ملهمة في ${countryAr}. ${assets.descAr}`,
    thingsToDo: assets.tasksEn,
    thingsToDoAr: assets.tasksAr
  };
});
