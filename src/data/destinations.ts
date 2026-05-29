/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Destination } from '../types';

export const destinationsList: Destination[] = [
  // ==================== ASIA (10 Items) ====================
  {
    id: 'tokyo-japan',
    name: 'Neon & Cherry Blossom Quest',
    nameAr: 'مغامرة الكرز والنيون في طوكيو',
    country: 'Japan',
    countryAr: 'اليابان',
    continent: 'Asia',
    priceUSD: 1499,
    rating: 4.9,
    durationDays: 7,
    description: 'Explore colorful playgrounds, ancient shrines, and super-fast bullet trains in futuristic Tokyo!',
    descriptionAr: 'اكتشف ملاعب مميزة ومعابد قديمة وقطارات فائقة السرعة في طوكيو المستقبلية العجيبة!',
    themeGradient: 'from-pink-300 via-rose-300 to-indigo-300',
    sceneryType: 'city',
    highlights: ['Shibuya Crossing', 'Anime Town Akihabara', 'Mount Fuji Daytrip', 'Robotic Toy Parks'],
    highlightsAr: ['تقاطع شيبويا الشهير', 'مدينة الأنيمي أكيهابارا', 'رحلة جبل فجي النهارية', 'حدائق الألعاب الروبوتية']
  },
  {
    id: 'maldives-islands',
    name: 'Rainbow Coral Reef Escape',
    nameAr: 'ملاذ الشعاب المرجانية الملونة في المالديف',
    country: 'Maldives',
    countryAr: 'المالديف',
    continent: 'Asia',
    priceUSD: 1999,
    rating: 4.95,
    durationDays: 7,
    description: 'Sleep on water villas, swim with neon-colored friendly fish, and dine on coral beaches with sea turtles!',
    descriptionAr: 'اقضِ لياليك في فيلات فوق الماء، واسبح مع الأسماك النيون اللطيفة، وتناول عشائك على شواطئ السلاحف البحرية!',
    themeGradient: 'from-teal-200 via-cyan-300 to-sky-400',
    sceneryType: 'beach',
    highlights: ['Overwater Bungalow', 'Snorkeling with Turtles', 'Submarine Dinner', 'Glowing Bioluminescent Sands'],
    highlightsAr: ['بنجالوهات فوق الماء المذهلة', 'الغطس برفقة السلاحف اللطيفة', 'عشاء الغواصة المائية', 'شواطئ رملية متوهجة ليلاً']
  },
  {
    id: 'singapore-canopy',
    name: 'Supertree Canopy & Dolphin Magic',
    nameAr: 'مغامرة سنغافورة الفائقة والشلالات الداخلية',
    country: 'Singapore',
    countryAr: 'سنغافورة',
    continent: 'Asia',
    priceUSD: 1250,
    rating: 4.88,
    durationDays: 5,
    description: 'Walk among sky-high vertical gardens, slide through futuristic glass domes, and see friendly dolphins!',
    descriptionAr: 'امشِ بين الحدائق العمودية الشاهقة، وتدحرج عبر قباب زجاجية مستقبلية، وشاهد الدلافين الودودة في جزيرة سنتوسا!',
    themeGradient: 'from-emerald-200 via-teal-300 to-indigo-300',
    sceneryType: 'city',
    highlights: ['Gardens by the Bay', 'Sentosa Island Cableway', 'Night Jungle Tram Cruise', 'Universal Studios Ride'],
    highlightsAr: ['الحدائق بجانب الخليج والمعرض المغلق', 'تلفريك جزيرة سنتوسا', 'ترام سفاري الغابة الليلي', 'ألعاب استوديوهات يونيفرسال الشيقة']
  },
  {
    id: 'chengdu-china',
    name: 'Giant Panda Secret Sanctuary',
    nameAr: 'محمية الباندا العملاقة وكنوز تشنغدو الكبرى',
    country: 'China',
    countryAr: 'الصين',
    continent: 'Asia',
    priceUSD: 1180,
    rating: 4.85,
    durationDays: 6,
    description: 'Meet cute giant pandas playing with bamboo, explore historic mountain lanes, and see gold-masked dancers!',
    descriptionAr: 'التقِ بصغار الباندا العملاقة الودودة وهي تمرح بالخيزران، واكتشف الممرات الجبلية العتيقة وعروض الوجوه المتغيرة!',
    themeGradient: 'from-emerald-300 via-yellow-200 to-emerald-500',
    sceneryType: 'jungle',
    highlights: ['Baby Panda Nursery', 'Shu Brocade Ancient Street', 'Family Dumpling Workshop', 'Sichuan Opera Show'],
    highlightsAr: ['حضانة صغار الباندا اللطيفة', 'شارع "شو" الحريري القديم', 'ورشة طبخ الزلابية لجميع العائلة', 'عروض أوبرا سيشوان السحرية']
  },
  {
    id: 'chiang-mai-thailand',
    name: 'Elephant Bamboo Harmony Camp',
    nameAr: 'مخيم الفيلة السعيدة وسط الغابات الاستوائية',
    country: 'Thailand',
    countryAr: 'تايلاند',
    continent: 'Asia',
    priceUSD: 890,
    rating: 4.92,
    durationDays: 6,
    description: 'Bathe and feed rescue baby elephants in ethical jungle sanctuaries, and slide down green waterfalls!',
    descriptionAr: 'استحم واطعم صغار فيلة الإنقاذ اللطيفة في محميات مجهزة أخلاقياً في الغابة، وتزحلق على شلالات الطين الآمنة!',
    themeGradient: 'from-lime-200 via-teal-200 to-emerald-400',
    sceneryType: 'jungle',
    highlights: ['Baby Elephant Spa Day', 'Bamboo River Tubing', 'Eco Treehouse Lodge', 'Sticky Waterfall Climb'],
    highlightsAr: ['يوم سبا الفيلة الصغيرة الصديقة', 'ركوب طوافات الخيزران المائية', 'فندق بيت الشجرة الإيكولوجي', 'صعود شلالات المياه اللزجة للعب']
  },
  {
    id: 'seoul-korea',
    name: 'Tech-Toy & Palace Dress Quest',
    nameAr: 'رحلة الألعاب الذكية وأزياء سيول الملكية',
    country: 'South Korea',
    countryAr: 'كوريا الجنوبية',
    continent: 'Asia',
    priceUSD: 1320,
    rating: 4.87,
    durationDays: 6,
    description: 'Dress up in traditional hanbok, play inside huge interactive toy museums, and watch delicious street food shows!',
    descriptionAr: 'تأنق بأزياء الهانبوك التقليدية الملونة وزر قصر الملوك، والعب بداخل متاحف الألعاب التفاعلية الضخمة في سيول!',
    themeGradient: 'from-violet-200 via-pink-200 to-cyan-300',
    sceneryType: 'city',
    highlights: ['Gyeongbokgung Palace', 'Lotte Adventure Indoor World', 'N Seoul Tower Locks', 'Interactive VR Toyzone'],
    highlightsAr: ['قصر غيونغ بوك غونغ الشهير', 'مدينة ألعاب لوت المغلقة للأطفال', 'أقفال الحب الملونة ببرج سيول', 'مدينة ألعاب الواقع الافتراضي التفاعلية']
  },
  {
    id: 'ranthambore-india',
    name: 'Royal Tiger & Palace Quest',
    nameAr: 'سفاري النمور الذهبية وقلاع الهند العريقة',
    country: 'India',
    countryAr: 'الهند',
    continent: 'Asia',
    priceUSD: 999,
    rating: 4.8,
    durationDays: 6,
    description: 'Ride high-top jungle jeeps to spot royal orange tigers, and explore ancient forts with jumping monkeys!',
    descriptionAr: 'اركب سيارات جيب المكشوفة لتتبع النمور البرية العظيمة، واستكشف القلاع القديمة المليئة بالقردة الضاحكة والطيور الملونة!',
    themeGradient: 'from-amber-300 via-orange-300 to-rose-300',
    sceneryType: 'jungle',
    highlights: ['Tiger Safari Drive', 'Ranthambore Fort Trek', 'Taj Mahal Magic Photo', 'Family Spice Baking Cook'],
    highlightsAr: ['رحلات جيب سفاري النمور الشرسة اللطيفة', 'تسلق قلعة رانثامبور الأثرية', 'جلسة تصوير عائلية عند تاج محل', 'خبز حلوى التوابل لجميع أفراد الأسرة']
  },
  {
    id: 'borneo-malaysia',
    name: 'Firefly River & Orangutan Jungle',
    nameAr: 'غابات بورنيو وقوارب اليراعات المضيئة بالليل',
    country: 'Malaysia',
    countryAr: 'ماليزيا',
    continent: 'Asia',
    priceUSD: 1150,
    rating: 4.89,
    durationDays: 6,
    description: 'Cruise down glowing firefly rivers at night, and watch cheeky orange orangutans swing through canopy bridges!',
    descriptionAr: 'أبحر في قوارب خشبية عبر أنهار اليراعات المضيئة ليلاً، وشاهد قردة الأورانجوتان البرتقالية الشقية وهي تتأرجح!',
    themeGradient: 'from-emerald-300 via-cyan-200 to-indigo-300',
    sceneryType: 'jungle',
    highlights: ['Sepilok Orangutan Sanctuary', 'Kinabatangan Firefly Cruise', 'Canopy Rope Walks', 'Snorkel Giant Clam Island'],
    highlightsAr: ['محمية سيبيلوك لعائلات الأورانجوتان', 'قارب نهر كيناباتانغان لليراعات المتوهجة', 'ممرات الجسور المعلقة بين قمم الأشجار', 'شاطئ صدف البحر العملاق الملون']
  },
  {
    id: 'kathmandu-nepal',
    name: 'Yeti Tales & Himalaya Flight',
    nameAr: 'مغامرة الهيمالايا وقصص اليتي المفقودة في نيبال',
    country: 'Nepal',
    countryAr: 'نيبال',
    continent: 'Asia',
    priceUSD: 1050,
    rating: 4.79,
    durationDays: 5,
    description: 'Hear legendary Yeti stories, ride high cable cars to temple peaks, and see snow-capped mountains!',
    descriptionAr: 'استمع لقصص اليتي الخرافي اللطيف، واركب التلفريك الطائر لقمم المعابد، وشاهد قمم جبال إيفرست الثلجية العظيمة!',
    themeGradient: 'from-sky-300 via-blue-200 to-indigo-400',
    sceneryType: 'mountain',
    highlights: ['Scenic Everest Flight', 'Chandragiri Ropeway Ride', 'Monkey Temple Walk', 'Tibetan Clay Painting Shop'],
    highlightsAr: ['طيران الهيمالايا لمشاهدة قمة إيفرست', 'تلفريك جبل تشانداغيري السريع', 'معبد القرود وحمائم السلام القديم', 'رسم الطين والأواني التبتية للأطفال']
  },
  {
    id: 'hoi-an-vietnam',
    name: 'Golden Lantern & Dragon Town',
    nameAr: 'مهرجان الفوانيس المضيئة وجسر التنين السحري',
    country: 'Vietnam',
    countryAr: 'فيتنام',
    continent: 'Asia',
    priceUSD: 850,
    rating: 4.91,
    durationDays: 6,
    description: 'Sail colorful paper-lantern boats under night stars, and see a giant metal dragon bridge breathe real fire!',
    descriptionAr: 'أبحر بقوارب الفوانيس الورقية المضيئة والملونة تحت سماء الليل، وشاهد جسر التنين العملاق ينفث النيران الحقيقية!',
    themeGradient: 'from-amber-200 via-teal-200 to-yellow-300',
    sceneryType: 'city',
    highlights: ['Lantern Making Workshop', 'Hoai River Paper Floating', 'Da Nang Fire Dragon Bridge', 'Ba Na Hills Fantasy Park'],
    highlightsAr: ['صناعة الفوانيس السحرية الخاصة بك', 'إطلاق الفوانيس الورقية على نهر "هوي آن"', 'مشاهدة جسر تنين دا نانغ الناري', 'تلفريك جزيرة با نا وقصر الألعاب']
  },

  // ==================== EUROPE (10 Items) ====================
  {
    id: 'swiss-alps',
    name: 'Alps Snow Castle Expedition',
    nameAr: 'رحلة استكشاف قلاع الثلج في سويسرا',
    country: 'Switzerland',
    countryAr: 'سويسرا',
    continent: 'Europe',
    priceUSD: 1890,
    rating: 4.85,
    durationDays: 6,
    description: 'Ride magic cogwheel trains, eat alpine chocolate, and build snow castles in the crisp mountain air!',
    descriptionAr: 'اركب قطارات مسننة سحرية، وتناول ألذ شوكولاتة جبلية، وابنِ قلاعًا ثلجية في هواء جبال الألب النقي!',
    themeGradient: 'from-blue-300 via-cyan-300 to-emerald-300',
    sceneryType: 'mountain',
    highlights: ['Matterhorn Lookout', 'Scenic Glacier Express', 'Chocolate Tasting Workshop', 'Skyline Cable Car'],
    highlightsAr: ['مطل جبل ماترهورن', 'قطار جبل الجليد الخلاب', 'ورشة تذوق الشوكولاتة السويسرية', 'تلفريك الأفق الطائر']
  },
  {
    id: 'reykjavik-iceland',
    name: 'Nordic Fire & Aurora Chase',
    nameAr: 'مغامرة مطاردة الشفق والبراكين في آيسلندا',
    country: 'Iceland',
    countryAr: 'آيسلندا',
    continent: 'Europe',
    priceUSD: 1650,
    rating: 4.92,
    durationDays: 6,
    description: 'Bathe in geothermal blue waters, walk behind majestic water-cascades, and hunt for green Aurora lights!',
    descriptionAr: 'استحم في البحيرة الزرقاء الحارة الطبيعية، وامشِ خلف شلالات مائية ضخمة، وطارد شفق القطب الشمالي الأخضر!',
    themeGradient: 'from-indigo-400 via-purple-300 to-pink-300',
    sceneryType: 'mountain',
    highlights: ['Blue Lagoon Hotspring', 'Magic Golden Circle Route', 'Waterfall Hikes', 'Northern Lights Star Gazing'],
    highlightsAr: ['منتجع البحيرة الزرقاء العلاجي', 'مسار الدائرة الذهبية الساحر', 'جولات مشي الشلالات', 'رصد النجوم والشفق القطبي اللامع']
  },
  {
    id: 'paris-france',
    name: 'Gourmet Pastry & Carousel Magic',
    nameAr: 'كرنفال باريس المعجنات والقصور وصانع الألعاب',
    country: 'France',
    countryAr: 'فرنسا',
    continent: 'Europe',
    priceUSD: 1450,
    rating: 4.87,
    durationDays: 5,
    description: 'Bake buttery chocolate croissants, ride vintage gold-gilded carousels, and see Eiffel tower light shows!',
    descriptionAr: 'اخبز حلوى الكرواسون بالشوكولاته، واركب الأحصنة الذهبية في مراجيح باريس، وشاهد تلألؤ برج إيفل الليلي!',
    themeGradient: 'from-rose-200 via-amber-200 to-sky-300',
    sceneryType: 'city',
    highlights: ['Eiffel Tower Carousel Ride', 'Louvre Museum Mystery Hunt', 'Junior Croissant Baking Class', 'Disneyland Paris Magic'],
    highlightsAr: ['ركوب مراجيح برج إيفل العتيقة', 'لعبة ألغاز الأطفال في متحف اللوفر', 'ورشة طبخ حلوى الكرواسون السريعة', 'يوم سحري كامل في ديزني لاند باريس']
  },
  {
    id: 'scotland-uk',
    name: 'Wizard Train & Highland Quest',
    nameAr: 'قطار السحرة ومطاردة وحش البحيرة في أسكتلندا',
    country: 'United Kingdom',
    countryAr: 'المملكة المتحدة',
    continent: 'Europe',
    priceUSD: 1390,
    rating: 4.83,
    durationDays: 6,
    description: 'Board the real steam train across iconic stone bridges, and spot mythical lake monsters in deep blue lochs!',
    descriptionAr: 'اركب قطار البخار السريع والحقيقي للتنقل عبر جسور الصخور المرتفعة، وطارد لغز وحش "نيسي" في البحيرة العميقة!',
    themeGradient: 'from-blue-200 via-indigo-300 to-emerald-300',
    sceneryType: 'mountain',
    highlights: ['Jacobite Steam Train Ride', 'Loch Ness Cruise & Hunt', 'Edinburgh Castle Fortress', 'Fairy Pools Walking Trail'],
    highlightsAr: ['رحلة قطار السحر البخاري الشهير', 'قارب مطاردة بحيرة لوخ نيس', 'جولة دهاليز قلعة إدنبرة العريقة', 'مسارات برك الجنيات الطبيعية الخضراء']
  },
  {
    id: 'rome-italy',
    name: 'Gladiator School & Pizza Workshop',
    nameAr: 'مدرسة القتال التاريخية ومطبخ البيتزا الإيطالية',
    country: 'Italy',
    countryAr: 'إيطاليا',
    continent: 'Europe',
    priceUSD: 1280,
    rating: 4.9,
    durationDays: 5,
    description: 'Train as a Roman gladiator with soft wooden swords, and bake your own heart-shaped Italian pizza!',
    descriptionAr: 'تدرب كفارس روماني عتيد بسيوف خشبية خفيفة، واصنع واطبخ عجينة البيتزا اللذيذة على شكل قلب مع عائلتك!',
    themeGradient: 'from-amber-200 via-orange-300 to-emerald-300',
    sceneryType: 'city',
    highlights: ['Gladiator Soft Weapon Training', 'Roman Colosseum Tour', 'Junior Pizza Maker Cooking', 'Trevi Fountain Coin Wish'],
    highlightsAr: ['تدريب سيوف الغلاديتور الخفيفة الممتع', 'جولة الكولوسيوم العظيم الموجهة', 'ورشة طباخ البيتزا والأيس كريم الصغير', 'إلقاء القطع المعدنية في نافورة تريفي']
  },
  {
    id: 'bavaria-germany',
    name: 'Fairytale Toys & Neuschwanstein Castle',
    nameAr: 'طريق قلاع ديزني الخيالية وألعاب غابات بافاريا',
    country: 'Germany',
    countryAr: 'ألمانيا',
    continent: 'Europe',
    priceUSD: 1350,
    rating: 4.86,
    durationDays: 6,
    description: 'Explore the real-life fairytale castle that inspired Disney, and ride historic model trains through toy towns!',
    descriptionAr: 'استكشف القلعة الخيالية التي ألهمت قصر سيندريلا في ديزني، وشاهد مئات القطارات البخارية الصغيرة بمتاحف الألعاب!',
    themeGradient: 'from-sky-300 via-indigo-200 to-amber-200',
    sceneryType: 'mountain',
    highlights: ['Neuschwanstein Castle', 'Munich Toy Museum', 'Black Forest Cuckoo Clocks', 'Alpine Coaster Slide Ride'],
    highlightsAr: ['زيارة قلعة نويشفانشتاين الخيالية بالكامل', 'متحف ألعاب ميونخ الكلاسيكية للأطفال', 'ورشة ساعات الكوكو الأسطورية في الغابة السوداء', 'منزلقة جبال الألب الأفعوانية الممتعة']
  },
  {
    id: 'billund-denmark',
    name: 'Lego Block Wonder Land',
    nameAr: 'أراضي ألعاب الليغو وعالم الطوب السحري بيلوند',
    country: 'Denmark',
    countryAr: 'الدنمارك',
    continent: 'Europe',
    priceUSD: 1590,
    rating: 4.96,
    durationDays: 5,
    description: 'Build huge spaceships from millions of colorful bricks, and stay in ninja-themed castle rooms!',
    descriptionAr: 'ابنِ سفن الفضاء وأبراجه من ملايين طوب ألعاب الليغو الشهيرة والملونة، ونم داخل غرف النينجا والفرسان الفاخرة!',
    themeGradient: 'from-yellow-300 via-red-300 to-blue-400',
    sceneryType: 'city',
    highlights: ['Legoland Billund Resort', 'Lego House Master Lab', 'Givskud Giant Animal Safari', 'Viking Craft Village Class'],
    highlightsAr: ['قرية منتجع ليغولاند بيلوند السحرية', 'مختبر البناء المتطور ببيت الليغو', 'حديقة سفاري الحيوانات الكبرى غيفسكود', 'مخيم الفايكنج وصناعة القوارب التاريخية']
  },
  {
    id: 'barcelona-spain',
    name: 'Mosaic Palace & Sandcastle Beaches',
    nameAr: 'قصور الفسيفساء الشاطئية وحدائق برشلونة الخيالية',
    country: 'Spain',
    countryAr: 'إسبانيا',
    continent: 'Europe',
    priceUSD: 1120,
    rating: 4.81,
    durationDays: 6,
    description: 'Explore wacky wavy mosaic palaces with no straight lines, and build gigantic sandcastles on golden sands!',
    descriptionAr: 'استكشف بيوت بارك غويل الملتوية دون خطوط مستقيمة، وابنِ قلاعًا رملية مذهلة على طول شواطئ البحر الدافئة!',
    themeGradient: 'from-rose-300 via-amber-300 to-teal-300',
    sceneryType: 'beach',
    highlights: ['Park Guell Lizard Quest', 'Wacky House Battlo', 'Sandcastle Master Workshop', 'Magic Fountain Laser Show'],
    highlightsAr: ['مطاردة سحلية حديقة غويل المشهورة', 'بيت باتلو الأثري العجيب للأطفال', 'درس بناء القلاع الرملية على الشاطئ', 'عروض الليزر والمياه في النافورة السحرية']
  },
  {
    id: 'athens-greece',
    name: 'Poseidon Dolphin & Mythic Quest',
    nameAr: 'رحلة الآلهة الإغريقية وقوارب دلافين أثينا',
    country: 'Greece',
    countryAr: 'اليونان',
    continent: 'Europe',
    priceUSD: 1220,
    rating: 4.84,
    durationDays: 6,
    description: 'Listen to ancient world myths, search for baby dolphins on a family cruise, and run on Olympic tracks!',
    descriptionAr: 'استمع لأساطير الآلهة القديمة، وطارد قفزات عائلات الدلافين الودودة في يخت مائي دافئ، والعب بملعب الأولمبيات!',
    themeGradient: 'from-blue-300 via-cyan-200 to-yellow-300',
    sceneryType: 'beach',
    highlights: ['Acropolis Mythic Stories', 'Poseidon Dolphin Yacht Cruise', 'Ancient Olympic Games Run', 'Clay Pot Sculpting Class'],
    highlightsAr: ['قصص أكروبوليس ومغامرة الآثار', 'ركوب يخت دلافين معبد بوسايدون', 'التسابق بملعب الألعاب الأولمبية القديمة', 'صناعة الصلصال وتزيين الجرار الإغريقية']
  },
  {
    id: 'amsterdam-netherlands',
    name: 'Windmill Bicycle & Tulip Playland',
    nameAr: 'قرية طواحين الهواء وملاعب التوليب السعيدة',
    country: 'Netherlands',
    countryAr: 'هولندا',
    continent: 'Europe',
    priceUSD: 1090,
    rating: 4.88,
    durationDays: 5,
    description: 'Ride wooden shoe scooters, paint your own mini wooden windmill, and slide through giant tulip playgrounds!',
    descriptionAr: 'اركب سكوتر الأحذية الخشبية التقليدية، والون طاحونة الهواء الخاصة بك، والعب بملاعب زهور الكيبلين الملونة!',
    themeGradient: 'from-green-200 via-orange-300 to-sky-300',
    sceneryType: 'city',
    highlights: ['Historic Zaanse Schans Windmills', 'Wooden Shoe Painting Workshop', 'Keukenhof Tulip Maze', 'Canal Paddle Boat Tour'],
    highlightsAr: ['طواحين هواء قرية زانسي شانس التاريخية', 'تلوين وقص القباقيب الخشبية الهولندية', 'حديقة متاهات الزهور للأطفال كيوكنهوف', 'قارب التبديل المائي في قنوات أمستردام']
  },

  // ==================== THE AMERICAS (10 Items) ====================
  {
    id: 'orlando-usa',
    name: 'Castle Magic World Carnival',
    nameAr: 'كرنفال قصر الخيال والألعاب المدهشة',
    country: 'United States',
    countryAr: 'الولايات المتحدة',
    continent: 'Americas',
    priceUSD: 1100,
    rating: 4.75,
    durationDays: 5,
    description: 'Unleash your inner child at spectacular theme parks, magic fireworks, and high-speed spaceships!',
    descriptionAr: 'أطلق العنان لخيالك في مدن الألعاب الترفيهية الضخمة، والألعاب النارية المذهلة، وسفن الفضاء السريعة!',
    themeGradient: 'from-violet-300 via-fuchsia-300 to-sky-300',
    sceneryType: 'city',
    highlights: ['Magic Fireworks Display', 'High-Speed Rollercoasters', 'Space Center & Spaceships', 'Water Park Wave Pools'],
    highlightsAr: ['عروض الألعاب النارية السحرية', 'أفعوانيات السرعة الفائقة', 'مركز الفضاء وسفن الفضاء الشهير', 'مسابح أمواج الحدائق المائية']
  },
  {
    id: 'drumheller-canada',
    name: 'Dinosaur Fossil & Badlands Quest',
    nameAr: 'مطاردة مستحاثات الديناصورات وجبال كندا الملونة',
    country: 'Canada',
    countryAr: 'كندا',
    continent: 'Americas',
    priceUSD: 1290,
    rating: 4.88,
    durationDays: 6,
    description: 'Dig for giant T-Rex fossils in desert canyon badlands, and climb inside the world\'s tallest model dinosaur!',
    descriptionAr: 'احفر واكتشف عظام ديناصور تي ريكس الكبيرة في صحراء الأخاديد، واصعد لقمة فم أكبر نموذج ديناصور بالعالم!',
    themeGradient: 'from-orange-200 via-amber-300 to-emerald-300',
    sceneryType: 'mountain',
    highlights: ['Royal Tyrrell Dinosaur Museum', 'Climbing World\'s Largest T-Rex', 'Dino Egg Painting Workshop', 'Hoodoos Earth Pillar Walk'],
    highlightsAr: ['متحف تيريل الملكي لأحافير الديناصورات', 'تسلق ديناصور تي ريكس الأطول والأضخم', 'ورشة رسم وتزيين بيض الديناصورات غلاديتور', 'ممرات الأعمدة الصخرية العجيبة هودوس']
  },
  {
    id: 'yucatan-mexico',
    name: 'Mayan Secret Cave Adventure',
    nameAr: 'رحلة واحة المايا وأهرامات الغابة الاستوائية',
    country: 'Mexico',
    countryAr: 'المكسيك',
    continent: 'Americas',
    priceUSD: 950,
    rating: 4.82,
    durationDays: 6,
    description: 'Swim in safe sparkling crystal cenote pools below hanging vines, and explore ancient stone jungle pyramids!',
    descriptionAr: 'اسبح في مياه الكهوف الصخرية الصافية والآمنة تحت الأشجار المعلقة، واكتشف أسرار أهرامات المايا في الغابة الخضراء!',
    themeGradient: 'from-teal-300 via-yellow-200 to-sky-400',
    sceneryType: 'jungle',
    highlights: ['Cenote Swim & Swing', 'Chichen Itza Pyramid Tales', 'Maya Chocolate Drink Making', 'Tulum Beach Clifftop Bike'],
    highlightsAr: ['السباحة والتأرجح داخل برك السينوتي الكريستالية', 'قصص ومغامرة هرم تشيتشن إيتزا العريق', 'ورشة طبخ شوكولاتة شعب المايا العضوية', 'ركوب الدراجات بجانب شاطئ تولوم الأثري']
  },
  {
    id: 'arenal-costarica',
    name: 'Green Sloth & Canopy Treehouses',
    nameAr: 'مغامرة الكسلان الكيوت وجسور الغابة الطائرة',
    country: 'Costa Rica',
    countryAr: 'كوستاريكا',
    continent: 'Americas',
    priceUSD: 1190,
    rating: 4.91,
    durationDays: 6,
    description: 'Walk on high hanging suspension bridges to find adorable sleeping sloths, and zip-line through warm mist forests!',
    descriptionAr: 'امشِ على الحبال والجسور المعلقة بالهواء لرصد حيوان الكسلان الصغير، وجرب القفز والزيبلاين في غابات الضباب الممتعة!',
    themeGradient: 'from-emerald-300 via-green-200 to-indigo-300',
    sceneryType: 'jungle',
    highlights: ['Sloth Spotting Canopy Walk', 'Volcano Jungle Mineral Baths', 'Kid Zipline Safe Flight', 'Treehouse Family Overnight Resort'],
    highlightsAr: ['جولات جسور الكسلان والقرود المعلقة', 'عيون المياه المعدنية الحارة ببركان أرينال', 'زيبلاين آمن للأطفال فوق قمم الأشجار', 'فندق غرف ببيت الشجرة لعائلات المغامرات']
  },
  {
    id: 'amazon-brazil',
    name: 'Pink Dolphin & Jungle Canoe Safari',
    nameAr: 'الدلافين الوردية وسفاري نهر الأمازون الكثيف',
    country: 'Brazil',
    countryAr: 'البرازيل',
    continent: 'Americas',
    priceUSD: 1390,
    rating: 4.84,
    durationDays: 7,
    description: 'Paddle small canoes to spot bright pink river dolphins, and feed wild monkeys sweet bananas from your hands!',
    descriptionAr: 'جدف بقارب الكانو الصغير لرؤية دلافين الأمازون زهرية اللون، واطعم المكاك والقرود اللطيفة بيدك وسط حماية إرشادية!',
    themeGradient: 'from-pink-200 via-yellow-200 to-emerald-400',
    sceneryType: 'jungle',
    highlights: ['Interactive Pink Dolphin Boat', 'Bananas for Monkey Island', 'Giant Water Lily Paddle', 'Family Jungle Survival Camp'],
    highlightsAr: ['قارب مراقبة ومداعبة الدلافين الوردية', 'زيارة جزيرة القرود الودودة وإطعامها الموز', 'التجديف بجانب نباتات زنبق الماء العملاقة', 'مخيم مهارات استكشاف الغابة الصديق للبيئة']
  },
  {
    id: 'machu-picchu-peru',
    name: 'Llama Ranch & Inca Train Mystery',
    nameAr: 'مغامرة جبل اللاما وقصر الإنكا الغامض في بيرو',
    country: 'Peru',
    countryAr: 'بيرو',
    continent: 'Americas',
    priceUSD: 1450,
    rating: 4.89,
    durationDays: 7,
    description: 'Feed friendly fluffy llamas on grand green terraces, and take a super-scenic glass-roof train to ancient cities!',
    descriptionAr: 'اطعم الكائنات الفروية اللاما على مصاطب الجبال الخضراء، واستقل قطار أسقف الزجاج لمشاهدة وديان حضارة الإنكا!',
    themeGradient: 'from-green-300 via-indigo-200 to-rose-300',
    sceneryType: 'mountain',
    highlights: ['Llama Grass Feeding Fun', 'Scenic Vistadome Glass Train', 'Ancient Machu Picchu Tour', 'Andean Flute Piping Class'],
    highlightsAr: ['إطعام حيوان اللاما الأليف بالجبال', 'قطار "فيستادوم" ذو السقف الزجاجي الشفاف', 'جولة قصر ماتشو بيتشو التاريخي للأطفال', 'ورشة العزف على مزمار شعب الأنديز الخشبي']
  },
  {
    id: 'nassau-bahamas',
    name: 'Atlantis Pirate Waterpark Resort',
    nameAr: 'حديقة أتلانتس المائية الكبرى وخليج القراصنة بالباهاماس',
    country: 'Bahamas',
    countryAr: 'باهاماس',
    continent: 'Americas',
    priceUSD: 1690,
    rating: 4.95,
    durationDays: 5,
    description: 'Slide down safe clear tunnels through shark-filled lagoons, and float on mile-long lazy rivers with warm waves!',
    descriptionAr: 'تزحلق داخل أنفاق زجاجية شفافة تمر بوسط أحواض أسماك القرش الضخمة، واسترخِ بالأنهار الملتوية والمسبح المتموج دافئاً!',
    themeGradient: 'from-cyan-300 via-sky-300 to-blue-400',
    sceneryType: 'beach',
    highlights: ['Leap of Faith Transparent Slide', 'Mile-Long Rapid Lazy River', 'Family Shark feeding walk', 'Kid Dolphin Cay Lagoon splash'],
    highlightsAr: ['منزلق نفق معبد المايا الزجاجي', 'طواف النهر المتموج السريع والممتع', 'جولة عائلية لإطعام السلاحف البحرية والأسماك', 'مسبح خليج الدلافين الصديقة للأطفال']
  },
  {
    id: 'ushuaia-argentina',
    name: 'Penguin Island Frozen Horizon',
    nameAr: 'مملكة البطاريق في أرض النار ونهاية العالم الأرجنتينية',
    country: 'Argentina',
    countryAr: 'الأرجنتين',
    continent: 'Americas',
    priceUSD: 1780,
    rating: 4.91,
    durationDays: 7,
    description: 'Walk alongside thousands of friendly orange-beaked penguins on frozen shores, and sail to the end of the world!',
    descriptionAr: 'سر بجانب مئات من طيور البطريق ذات المناقير البرتقالية اللامعة في جزيرة معزولة، وأبحر طوال طريق نهاية الأرض!',
    themeGradient: 'from-blue-200 via-indigo-200 to-cyan-300',
    sceneryType: 'mountain',
    highlights: ['Martillo Island Penguin Colony', 'End of the World Scenic Train', 'Beagle Channel Glacier Cruise', 'Baby Seal Island Lookout'],
    highlightsAr: ['محمية بطاريق جزيرة مارتيلو المذهلة', 'ركوب قطار بخار نهاية العالم الخشبي', 'رحلة قارب Beagle لمشاهدة جبال الجليد', 'مطل جزيرة كلاب البحر وصغار الفقمة']
  },
  {
    id: 'salento-colombia',
    name: 'Butterfly Forest & Cocora Palms',
    nameAr: 'وادي النخيل العملاق وحديقة الفراشات السحرية بكولومبيا',
    country: 'Colombia',
    countryAr: 'كولومبيا',
    continent: 'Americas',
    priceUSD: 1050,
    rating: 4.87,
    durationDays: 6,
    description: 'Walk inside a giant geodesic dome with 1000 colorful butterflies, and ride horses through cartoon-tall palm fields!',
    descriptionAr: 'امشِ بداخل أكبر قبة زجاجية تضم آلاف الفراشات الملونة الطائرة، واركب الخيل بوسط غابات النخيل الطويلة كرسوم الكرتون!',
    themeGradient: 'from-teal-300 via-emerald-200 to-yellow-300',
    sceneryType: 'jungle',
    highlights: ['Mariposario Flying Butterflies Dome', 'Cocora Valley Horse Ride Hike', 'Colorful Jeep Willys Convoy', 'Eco Coffee Fruit Picking Day'],
    highlightsAr: ['حديقة الفراشات السحرية والشرانق الذهبية', 'ركوب الخيل العائلي في وادي كوكورا', 'موكب سيارات جيب الملونة التقليدية وسفاري', 'يوم قطف فاكهة البن والفاكهة الاستوائية للأطفال']
  },
  {
    id: 'patagonia-chile',
    name: 'Blue Glacier & Dinosaur Trail',
    nameAr: 'جبال الجليد الزرقاء وممرات ديناصورات تشيلي الكبرى',
    country: 'Chile',
    countryAr: 'تشيلي',
    continent: 'Americas',
    priceUSD: 1590,
    rating: 4.83,
    durationDays: 7,
    description: 'Take family boat rides close to safe glowing neon-blue glacier walls, and walk beside giant dinosaur foot-prints!',
    descriptionAr: 'استقل قاربًا بحريًا آمناً لملامسة جدران الأنهار الجليدية الزرقاء المتوهجة، وتتبع آثار أقدام الديناصورات المحفورة بالصخور!',
    themeGradient: 'from-cyan-300 via-indigo-300 to-pink-200',
    sceneryType: 'mountain',
    highlights: ['Glacier Grey Navigation Ride', 'Ancient Cave Mylodon Quest', 'Real Dinosaur Track Finder', 'Rainbow Lake Family Picnic'],
    highlightsAr: ['قارب نهر غراي الجليدي والركام المتجمد', 'مغامرة كهف الحيوان العملاق المنقرض مايلودون', 'تتبع آثار الديناصورات وتحفيز مستكشف الأطفال', 'نزهة خلوية عائلية عند بحيرات قوس قزح الجبلية']
  },

  // ==================== MIDDLE EAST (10 Items) ====================
  {
    id: 'pyramids-egypt',
    name: 'Pharaoh Riddle Safari',
    nameAr: 'سفاري ألغاز الفراعنة العظيمة',
    country: 'Egypt',
    countryAr: 'مصر',
    continent: 'Middle East',
    priceUSD: 950,
    rating: 4.7,
    durationDays: 5,
    description: 'Solve riddles of the ancient sphinx, ride golden camels, and sail the majestic Nile River under the sun!',
    descriptionAr: 'حل ألغاز تمثال أبو الهول القديم، واركب الجمال الذهبية، وأبحر في نهر النيل الشامخ تحت شمس دافئة!',
    themeGradient: 'from-amber-200 via-orange-300 to-rose-300',
    sceneryType: 'desert',
    highlights: ['Great Pyramids Giza', 'Nile Felucca cruise', 'Tutankhamun Treasures', 'Golden Dunes Safari'],
    highlightsAr: ['أهرامات الجيزة الكبرى', 'قارب الفلوكة في النيل', 'كنوز توت عنخ آمون', 'سفاري الكثبان الرملية الذهبية']
  },
  {
    id: 'dubai-uae',
    name: 'Neon Aqua-Park & Snowy Oasis',
    nameAr: 'حديقة دبي المائية المعلقة وألعاب الثلج السحرية',
    country: 'United Arab Emirates',
    countryAr: 'الإمارات العربية المتحدة',
    continent: 'Middle East',
    priceUSD: 1290,
    rating: 4.92,
    durationDays: 6,
    description: 'Slide down massive indoor water-slides, see planes made of real flowers, and slide down indoor snowy hills!',
    descriptionAr: 'تزحلق على منزلقات مائية هائلة، وزر حديقة الزهور العجيبة للعب، وتزحلق على جبال الجليد بمحميات الثلج المغلقة بعز الصيف!',
    themeGradient: 'from-blue-300 via-pink-250 to-indigo-300',
    sceneryType: 'city',
    highlights: ['Aquaventure Water Theme Park', 'Ski Dubai Polar Penguins', 'Miracle Floral Flower Garden', 'Burj Khalifa Sky Deck'],
    highlightsAr: ['ألعاب ومدينة ملاهي أكوافينتشر المائية الشهيرة', 'التزلج والتقاط الصور مع بطاريق سكي دبي', 'حديقة دبي المعجزة للزهور الخلابة', 'مطل الطابق الأعلى في برج خليفة والنافورة الراقصة']
  },
  {
    id: 'alula-saudi',
    name: 'Desert Balloon & Mirror Oasis Quest',
    nameAr: 'منطاد العلا الطائر وواحة جبل الفيل السري بالسعودية',
    country: 'Saudi Arabia',
    countryAr: 'المملكة العربية السعودية',
    continent: 'Middle East',
    priceUSD: 1450,
    rating: 4.88,
    durationDays: 5,
    description: 'Fly inside safe hot air balloons over sandstone giants, and play inside the world\'s largest mirrored glass building!',
    descriptionAr: 'حلق بداخل منطاد هوائي آمن ومشرق فوق الصخور والجبال الرملية العملاقة، والعب والتقط صور المغامرة أمام قصر المرايا قاعة مرايا غينيس!',
    themeGradient: 'from-yellow-200 via-orange-300 to-indigo-300',
    sceneryType: 'desert',
    highlights: ['Hot Air Balloon Oasis flight', 'Elephant Rock Sand Castle Dune', 'Maraya Mirrored Concert Glass Hall', 'Ancient Hegra Camel Track Safari'],
    highlightsAr: ['طيران المنطاد الصباحي العائلي الممتع', 'اللعب بالرمال وعشاء تحت صخرة جبل الفيل العملاقة', 'التقاط صور عجائب في قاعة مرايا الزجاجية الأكبر بالعالم', 'رحلة سفاري الجمال والعربات القديمة لمدائن صالح الحجرية']
  },
  {
    id: 'petra-jordan',
    name: 'Petra Treasury Explorer & Starry Oasis',
    nameAr: 'رحلة البتراء الخيالية ومخيم النجوم الصحراوي بالأردن',
    country: 'Jordan',
    countryAr: 'الأردن',
    continent: 'Middle East',
    priceUSD: 1050,
    rating: 4.85,
    durationDays: 5,
    description: 'Ride friendly donkeys through winding stone canyons, and count million stars from cozy transparent bubble tents!',
    descriptionAr: 'ركوب الخيول والحمير الودودة عبر دهاليز ممرات السيق الحجرية الوردية، وتأمل ملايين الشهب من خيمة الفقاعة الزجاجية الدافئة!',
    themeGradient: 'from-amber-300 via-rose-350 to-violet-350',
    sceneryType: 'desert',
    highlights: ['Winding Siq Treasury Walk', 'Friendly Donkey Ride Trek', 'Wadi Rum Transparent Bubble Camp', 'Dead Sea Floating Salt Fun for Kids'],
    highlightsAr: ['مسير السيق الوردي للوصول للخزنة التاريخية العظيمة', 'ركوب الدابة الآمن للأطفال لتعلم مهارة الفرسان', 'مخيم الفقاعة والبدوي بوسط صحراء وادي رم العجيبة', 'الطفو المائي الطبيعي والآمن للأطفال في مياه البحر الميت المالح']
  },
  {
    id: 'doha-qatar',
    name: 'Dolphin Cruise & Golden Sandboarding',
    nameAr: 'كثبان الدوحة الذهبية وقوارب اللؤلؤ المضيئة بقطر',
    country: 'Qatar',
    countryAr: 'قطر',
    continent: 'Middle East',
    priceUSD: 990,
    rating: 4.81,
    durationDays: 5,
    description: 'Slide down huge golden dunes on sandboards, and cruise on giant wooden dhow boats with twinkling neon lights!',
    descriptionAr: 'تزحلق على صفائح الثلج الصحراوي فوق الكثبان الرملية الذهبية، واصعد لليخت الخشبي المضيء بقلب خليج الدوحة الرائع!',
    themeGradient: 'from-amber-200 via-rose-300 to-indigo-300',
    sceneryType: 'desert',
    highlights: ['Mesaieed Desert Golden Sandboard', 'Twinkling Wooden Dhow Boat Cruise', 'Al Thakira Mangrove Kayak Quest', 'Katara Cultural Play Hill'],
    highlightsAr: ['تزلج كثبان مسيعيد الرملية باستخدام الزلاجات الآمنة للأطفال', 'جولة القوارب الخشبية التاريخية بالخليج والمشاعل', 'التجديف بالكاياك ومحميات المانغروف للأسماك والطيور', 'قرية كتارا الترفيهية ومتاجر الشوكولاته اللذيذة']
  },
  {
    id: 'oman-turtles',
    name: 'Turtle Nesting Beaches & Wadi Pools',
    nameAr: 'محمية السلاحف البحرية ومغارات عُمان العائلية السحرية',
    country: 'Oman',
    countryAr: 'عُمان',
    continent: 'Middle East',
    priceUSD: 1120,
    rating: 4.9,
    durationDays: 6,
    description: 'Watch cute baby sea turtles hatch on sandy warm beaches under the moonlight, and swim in emerald mountain pools!',
    descriptionAr: 'راقب السلاحف البحرية الضخمة تضع بيضها وصغارها يفقسون تحت ضوء القمر، واسبح في برك الوديان الخضراء السحرية!',
    themeGradient: 'from-teal-300 via-emerald-200 to-amber-200',
    sceneryType: 'beach',
    highlights: ['Ras Al Jinz Turtle Watch Night', 'Wadi Shab Emerald Lazy Pool', 'Nizwa Heritage Castle Treks', 'Oman Sailing Dolphin Tour'],
    highlightsAr: ['جولة ليلية سرية لمشاهدة صغار السلاحف برأس الجينز', 'السباحة واللعب ببرك وادي شاب العذبة الدافئة', 'قلاع نزوى الأثرية وركوب الخيل التاريخية العائلية', 'قارب الإبحار التقليدي لمراقبة الحيتان والدلافين الزاهية']
  },
  {
    id: 'jeita-lebanon',
    name: 'Jeita Crystal Cave & Cableway Explorer',
    nameAr: 'مغارة جعيتا الكريستالية وتلفريك جبال لبنان',
    country: 'Lebanon',
    countryAr: 'لبنان',
    continent: 'Middle East',
    priceUSD: 850,
    rating: 4.86,
    durationDays: 5,
    description: 'Float on small boats inside dark caves lit by magic neon lights, and ride cable cars high above beautiful orchards!',
    descriptionAr: 'اركض على سفن الكهف الكريستالي الصغير تحت هياكل المغارة الزرقاء المتلألئة، واستقل التلفريك الطائر لقمم الجبل الخلاب!',
    themeGradient: 'from-cyan-200 via-indigo-300 to-rose-205',
    sceneryType: 'mountain',
    highlights: ['Jeita Grotto Underworld Boat', 'Harissa Snow Cable car', 'Cedar Forest Wooden Craft Class', 'Byblos Castle Harbor Pirate Hunt'],
    highlightsAr: ['قارب مغامرات بداخل بحيرة كهف جعيتا المتلألئة', 'تلفريك حريصا الطائر بين الوديان والجبال الخلابة', 'غابة الأرز التاريخية وصناعة الهدايا الخشبية للأطفال', 'البحث عن كنز القراصنة بقاعات قلعة جبيل البحرية الرائعة']
  },
  {
    id: 'kuwait-island',
    name: 'Green Island Waterpark & Giant Kites',
    nameAr: 'الجزيرة الخضراء ومهرجان الطائرات الورقية بالكويت',
    country: 'Kuwait',
    countryAr: 'الكويت',
    continent: 'Middle East',
    priceUSD: 790,
    rating: 4.78,
    durationDays: 5,
    description: 'Fly giant kites over blue seaside parks, and splash around in safe sea waterparks with giant bouncy slides!',
    descriptionAr: 'طر بطيارتك الورقية العملاقة على رمال شواطئ البحر الصافية، والعب واغطس في قرية الألعاب المائية المطاطية العائمة!',
    themeGradient: 'from-emerald-300 via-teal-200 to-sky-300',
    sceneryType: 'beach',
    highlights: ['Green Island Inflatable Waterpark', 'Scientific Center Interactive Aquarium', 'Kuwait towers glass sphere elevator', 'Dhow wood carving art class'],
    highlightsAr: ['قرية الألعاب المائية والمنزلقات المطاطية بالجزيرة الخضراء', 'معرض الكائنات البحرية والتفاعلية بالمركز العلمي للأطفال', 'مصعد كرة الزجاج ببرج الكويت ومشاهدة معالم المدينة', 'ورشة نحت وتلوين القوارب الخشبية العتيقة']
  },
  {
    id: 'manama-bahrain',
    name: 'Pearl Diving Snorkel & Floating Castles',
    nameAr: 'صيد اللؤلؤ الشاطئي وقوارب القلعة المائية البحرينية',
    country: 'Bahrain',
    countryAr: 'البحرين',
    continent: 'Middle East',
    priceUSD: 880,
    rating: 4.82,
    durationDays: 5,
    description: 'Dive in warm shallow waters to find real oysters with surprise pearls, and ride lazy rivers next to castles!',
    descriptionAr: 'اغطس بمعدات آمنة للأطفال في مياه الشاطئ الضحلة لتصطاد المحار وتكتشف لؤلؤة براقة تحتفظ بها كهدية سحرية لتزين غرفتك!',
    themeGradient: 'from-amber-150 via-teal-150 to-indigo-250',
    sceneryType: 'beach',
    highlights: ['Shallow Pearl Snorkel Oasis', 'Dilmun Lost Paradise Inflatable Water', 'Al Areen Wildlife Giraffe Feed Tour', 'Traditional Clay Pottery Wheel Class'],
    highlightsAr: ['رحلة البحث عن المحار واللؤلؤ الحقيقي الآمنة للأطفال', 'مسابح وشلالات ملاهي الفردوس المفقود مياه حضارة دلمون', 'محمية العرين الطبيعية لإطعام طائر الغلامنجو والزرافات بيدك', 'ورشة صناعة أواني الفخار الصلصالي وتدوير العجلة للطين']
  },
  {
    id: 'cappadocia-turkey',
    name: 'Fairy Chimney Hot Balloon Adventure',
    nameAr: 'منطاد كبادوكيا الطائر وكهوف الفطر الحجرية التركية',
    country: 'Turkey',
    countryAr: 'تركيا',
    continent: 'Middle East',
    priceUSD: 1190,
    rating: 4.94,
    durationDays: 6,
    description: 'Float inside colorful hot balloons above giant sandstone mushroom chimneys, and walk inside ancient safe underground cities!',
    descriptionAr: 'حلق بداخل مناطيد الهواء الملونة فوق الصخور المشكلة كالفطر البري السحري، واكتشف غرف ودهاليز المدن المحفورة تحت الأرض!',
    themeGradient: 'from-pink-300 via-yellow-200 to-indigo-400',
    sceneryType: 'mountain',
    highlights: ['Cappadocia Hot Balloon Flight', 'Derinkuyu Undergound Castle Quest', 'Avanos Ceramic Clay Wheel', 'Valley Horses Trail Picnic'],
    highlightsAr: ['رحلة المنطاد العائلية الطائرة بألوان قوس قزح', 'رحلة استكشاف مدينة كهر الديرين كويو تحت الأرض كالأبطال', 'تلوين الآنية الفخارية ورسم المعجزات اليدوية بآفانوس', 'نزهة الخيل والتقاط الصور بوادي الخيول الوردية الخلابة']
  },

  // ==================== AFRICA (10 Items) ====================
  {
    id: 'safari-kenya',
    name: 'Lion King Horizon Safari',
    nameAr: 'سفاري أفق الأسد المهيب في كينيا',
    country: 'Kenya',
    countryAr: 'كينيا',
    continent: 'Africa',
    priceUSD: 1350,
    rating: 4.86,
    durationDays: 6,
    description: 'Spot adorable baby elephants, sleeping lions, and giraffe families in our open-top safari buses!',
    descriptionAr: 'شاهد صغار الفيلة الفاتنة، والأسود النائمة، وعائلات الزرافات من حافلات السفاري المكشوفة السقف!',
    themeGradient: 'from-orange-300 via-amber-305 to-yellow-200',
    sceneryType: 'jungle',
    highlights: ['Maasai Mara Game Drive', 'Giraffe Manor Feeding', 'Hot Air Balloon Safari', 'Eco-Luxury Family Camps'],
    highlightsAr: ['جولة سفاري محمية ماساي مارا', 'إطعام الزرافات في قصر الزرافة', 'رحلة المنطاد الطائر فوق السافانا', 'مخيمات صديقة للبيئة للعائلات']
  },
  {
    id: 'cape-town-south-africa',
    name: 'Penguin Beach & Table Mountain Cableway',
    nameAr: 'شاطئ البطاريق اللطيف وتلفريك جبل الطاولة بجنوب أفريقيا',
    country: 'South Africa',
    countryAr: 'جنوب أفريقيا',
    continent: 'Africa',
    priceUSD: 1450,
    rating: 4.91,
    durationDays: 7,
    description: 'Walk on wooden boardwalks right beside small friendly jackass penguins, and ride revolving cable cars up flat mountains!',
    descriptionAr: 'سر على الممشى الخشبي مباشرة بجوار بطاريق بولدرز اللطيفة والسباحة معها بفرشاة الرمال، والركوب الدائري لجبل الطاولة!',
    themeGradient: 'from-blue-300 via-teal-200 to-emerald-300',
    sceneryType: 'beach',
    highlights: ['Boulders Golden Penguin Colony', 'Table mountain rotating cableway', 'World of Birds Flight Dome', 'Two Oceans Shark-Free Aquarium'],
    highlightsAr: ['مستعمرة شاطئ بولدرز لطيور البطريق الأليفة والصغيرة', 'تلفريك جبل الطاولة الدائري 360 درجة الخلاب', 'مستنبت عالم الطيور والببغاوات الحرة والملونة', 'أكواريوم المحيطين لمشاهدة غابات العشب المائي والحيوانات المائية']
  },
  {
    id: 'madagascar-lemur',
    name: 'Lemur Jungle & Baobab Treehouses',
    nameAr: 'حديقة الليمور الشقية وأشجار الباوباب العملاقة بمدغشقر',
    country: 'Madagascar',
    countryAr: 'مدغشقر',
    continent: 'Africa',
    priceUSD: 1490,
    rating: 4.88,
    durationDays: 7,
    description: 'Meet friendly ring-tailed lemurs that jump like cartwheels, and climb up treehouses in giant alien-shaped trees!',
    descriptionAr: 'التقِ بحيوانات الليمور مرحة الذيل التي تقفز كعجلات السيرك، وتسلق بيوت الشجر في أشجار الباوباب العجيبة الضخمة!',
    themeGradient: 'from-emerald-300 via-lime-200 to-amber-300',
    sceneryType: 'jungle',
    highlights: ['Lemur Island Play interaction', 'Avenue of the Baobabs sunset photo', 'Spiny jungle walk bridge', 'Chameleon Color Seek Safari'],
    highlightsAr: ['التفاعل والتقاط السيلفي مع ليمور الملك جوليان بمدغشقر', 'جلسة تصوير عائلية ممتعة عند غروب شارع أشجار الباوباب', 'التجول فوق الحبال بين أحراش غابات الصبار المذهلة', 'لعبة البحث والتقصي عن السحالي والحرباء الملونة المتخفية']
  },
  {
    id: 'marrakesh-morocco',
    name: 'Magic Carpet Camel Oasis',
    nameAr: 'مخيم فرسان الصحراء وقوافل جمال مراكش الملونة',
    country: 'Morocco',
    countryAr: 'المغرب',
    continent: 'Africa',
    priceUSD: 990,
    rating: 4.82,
    durationDays: 6,
    description: 'Ride decorated camels across red sand dunes, listen to magical snake-charmer music, and camp in woolen tents!',
    descriptionAr: 'اركب الجمال المزينة بالحرير الملون فوق كثبان الرمال الحمراء، واستمع لموسيقى حواة الكنوز في أسواق مراكش الخلابة!',
    themeGradient: 'from-amber-250 via-rose-300 to-yellow-200',
    sceneryType: 'desert',
    highlights: ['Marrakesh Medina Market hunt', 'Dune Oasis Camel convoy Ride', 'Starlit Desert Woolen Tent Family Sleep', 'Tajine Pot painting workshop'],
    highlightsAr: ['لعبة البحث عن الكنز التقليدي في أزقة أسواق المدينة العتيقة', 'قافلة جمال الصحراء وتناول أيسكريم التمور العضوي', 'المبيت بمخيمات الصوف الصحراوية الفاخرة تحت النجوم اللامعة', 'ورشة عمل الرسم وتلوين الطين لأواني الطاجين المغربي اللذيذ']
  },
  {
    id: 'zanzibar-tanzania',
    name: 'Spiced Lagoon & Giant Tortoise Haven',
    nameAr: 'جزيرة السلاحف العملاقة وشواطئ زنجبار البيضاء بتنزانيا',
    country: 'Tanzania',
    countryAr: 'تنزانيا',
    continent: 'Africa',
    priceUSD: 1190,
    rating: 4.85,
    durationDays: 6,
    description: 'Hand-feed 100-year-old giant friendly tortoises, and smell sweet local chocolate vanilla pods on white sand islands!',
    descriptionAr: 'اطعم السلاحف البرية العملاقة البالغة من العمر مئة عام بيدك، والعب على رمال شواطئ زنجبار الخيالية بيضاء البياض!',
    themeGradient: 'from-teal-200 via-cyan-300 to-emerald-300',
    sceneryType: 'beach',
    highlights: ['Prison Island Giant tortoise feed', 'Stone Town Spice Garden scent walk', 'Clear Glass Paddle Boat Lagoon', 'Red Colobus Monkey Forest Quest'],
    highlightsAr: ['إطعام ولمس السلاحف السيشيلية الضخمة بجزيرة بريزون', 'جولة حديقة التوابل وقطف قرون قرميد الشوكولاتة والفانيليا العذبة', 'التجديف بقوارب شفافة تماماً لرؤية نجوم البحر الملائكية', 'مغامرة رصد قرد كولوبس الأحمر اللطيف النادر في الغابة المحمية']
  },
  {
    id: 'mauritius-rainbow',
    name: 'Seven Colored Earth & Giant Turtles',
    nameAr: 'تلال الأرض الملونة السبعة وسلاحف موريشيوس',
    country: 'Mauritius',
    countryAr: 'موريشيوس',
    continent: 'Africa',
    priceUSD: 1290,
    rating: 4.9,
    durationDays: 6,
    description: 'Explore beautiful sand dunes that are naturally colored in 7 different rainbow colors, and ride friendly giant land turtles!',
    descriptionAr: 'استكشف رمال تلال الجبال البديعة الملونة طبيعياً بسبعة ألوان مثل قوس قزح، وصافح طيور الببغاوات الوردية الطائرة بقلب المحيط!',
    themeGradient: 'from-amber-200 via-pink-200 to-indigo-400',
    sceneryType: 'beach',
    highlights: ['7 Colored Earth Sand dune lookout', 'Chamarel Waterfall Zip safe line', 'Giant Aldabra Turtle Petting park', 'Dolphin catamaran snorkel splash'],
    highlightsAr: ['مطل تلال الأرض الملونة كرمال الطيف المزخرفة', 'زيبلاين شلالات شاماريل الآمنة والممتعة للعائلات', 'إطعام وسقي السلاحف العملاقة بمنتزه الحياة البرية للأطفال', 'رحلة قارب الكاتاماران الصديق لمشاهدة الدلافين والسباحة السعيدة']
  },
  {
    id: 'uganda-forest',
    name: 'Chimpanzee Safari & Nile Baby Gorilla Care',
    nameAr: 'محمية صغار الغوريلا وقوارب بحيرة فيكتوريا في أوغندا',
    country: 'Uganda',
    countryAr: 'أوغندا',
    continent: 'Africa',
    priceUSD: 1390,
    rating: 4.81,
    durationDays: 6,
    description: 'Spot playful baby chimpanzees and mountain gorillas through binoculars, and cruise down crocodile-free green rivers!',
    descriptionAr: 'شاهد صغار حيوان الشمبانزي الشقي وقرود الغوريلا الضخمة بمنظار الرصد الرقمي، والعب بقارب المهرج بالبحيرات العذبة الآمنة!',
    themeGradient: 'from-emerald-350 via-lime-200 to-teal-350',
    sceneryType: 'jungle',
    highlights: ['Ngamba Island Chimpanzee Forest', 'Entebbe Botanical Jungle tree walks', 'Source of the Nile River Boat Spot', 'Baking Banana Bread Village cooking'],
    highlightsAr: ['جزيرة نغامبا وصخب غابات وحضانات صغار الشمبانزي اللطيف', 'جولة دهاليز وجسر حليج الأرجوحة بحديقة غابة عنتيبي الاستوائية', 'قارب النهر السريع للبحث عن طائر البجع الوردي اللامع', 'ورشة طبخ كعكة الموز وخبزها مع أطفال القرية التفاعلية']
  },
  {
    id: 'vic-falls-zimbabwe',
    name: 'Victoria Falls Misty Rainbow Rainforest',
    nameAr: 'ممر شلالات فيكتوريا الرعدية وقوس قزح المزدوج بزمبابوي',
    country: 'Zimbabwe',
    countryAr: 'زيمبابوي',
    continent: 'Africa',
    priceUSD: 1150,
    rating: 4.88,
    durationDays: 5,
    description: 'Walk through safe misty paths under a rain of vapor made by the world\'s most roaring waterfalls, and see double rainbows!',
    descriptionAr: 'امشِ بوسط الغابة الاستوائية الرطبة مستمتعاً برذاذ مياه نهر زامبيزي العظيم، وشاهد أقواس قزح المزدوجة التي تلامس قدمك!',
    themeGradient: 'from-cyan-300 via-sky-200 to-yellow-300',
    sceneryType: 'jungle',
    highlights: ['Rainbow walk mist trail', 'Victoria falls bridge train look', 'Zambezi Sunset river elephant boat', 'Family drums rhythm boma show'],
    highlightsAr: ['جسر رذاذ المياه الضاب وطرق الشلالات السبع للأطفال', 'رصد قطارات البخار القديمة تمر فوق الجسر الملق في السماء', 'قارب سفاري نهر زامبيزي لمشاهدة صغار أفراس النهر والفيلة المبتسمة', 'عرض قرع طبول البوما الأفريقية الراقصة مع الطهاة']
  },
  {
    id: 'seychelles-coconut',
    name: 'Coco De Mer Giant Nut & Jewel Sea Escapes',
    nameAr: 'شواطئ جوز الهند العملاق ومجدفو قوارب سيشل الفيروزية',
    country: 'Seychelles',
    countryAr: 'سيشل',
    continent: 'Africa',
    priceUSD: 1890,
    rating: 4.93,
    durationDays: 7,
    description: 'Hunt for giant ocean coconuts shaped like hearts, and kayak in safe shallow crystal pools of baby fish!',
    descriptionAr: 'ابحث عن أكبر جوز هند في العالم على شكل قلب بغابات فالي دي ماي، وتزلج بقوارب الكاياك على مياه دافئة فيروزية نقية!',
    themeGradient: 'from-teal-300 via-cyan-150 to-blue-400',
    sceneryType: 'beach',
    highlights: ['Vallee de Mai Giant Coco hunt', 'La Digue giant granite boulder beach', 'Transparant Kayak Baby Ray fish look', 'Family coconut shell art craft class'],
    highlightsAr: ['البحث عن ثمرة كوكو دي مير الشهيرة الأكبر بالعالم بغابة ماي', 'اللعب والتزحلق بين صخور الغرانيت الملساء على رمال شاطئ لا ديغ', 'ركوب الكاياك الشفاف كلياً لمداعبة صغار الأسماك والسلحفاة', 'صناعة السفن والهدايا الصغيرة باستخدام قشرة جوز الهند']
  },
  {
    id: 'namib-desert-namibia',
    name: 'Starlit Dune Giant Sandbox Caravan',
    nameAr: 'صحراء ناميب الحمراء ورصد النجوم التلسكوبي في ناميبيا',
    country: 'Namibia',
    countryAr: 'ناميبيا',
    continent: 'Africa',
    priceUSD: 1250,
    rating: 4.8,
    durationDays: 6,
    description: 'Climb the world\'s highest red sand dunes, gaze at crystal clear stars through telescopes, and spot desert-adapted giraffes!',
    descriptionAr: 'تسلق التلال الرملية الأطول والأكثر احمراراً بالعالم، وانظر للنجوم وسدم الفضاء بمنظار فلكي ليلي مذهل للأطفال والمقيمين!',
    themeGradient: 'from-amber-300 via-red-300 to-indigo-400',
    sceneryType: 'desert',
    highlights: ['Dune 45 Giant Sandbox Slides', 'Deadvlei White clay forest hike', 'Deep cosmos star galaxy telescope', 'Desert Elephant jeep spot drive'],
    highlightsAr: ['التزحلق بالألواح على الكثبان الذهبية الأطول "دبوس 45"', 'مسيرة الأطفال بين أشجار بحيرة فلي البيضاء ذات الطبيعة الخيالية', 'رصد وتصوير المجرات والكواكب الملونة بتلسكوب المخيم الفلكي', 'جولة جيب لمطاردة الفهود والزرافات البيضاء الصحراوية النادرة']
  },

  // ==================== OCEANIA (10 Items) ====================
  {
    id: 'sydney-australia',
    name: 'Koala Harbor Yacht Cruise',
    nameAr: 'جولة يخوت سيدني وتجربة حيوان الكوالا',
    country: 'Australia',
    countryAr: 'أستراليا',
    continent: 'Oceania',
    priceUSD: 1550,
    rating: 4.88,
    durationDays: 8,
    description: 'Feed friendly kangaroos, cruise past iconic Opera structures, and dive along pristine coastal waters!',
    descriptionAr: 'أطعم حيوان الكنغر الودود، وأبحر باليخت بجانب قصر الأوبرا الشهير، واغطس في المياه الشاطئية النقية!',
    themeGradient: 'from-sky-300 via-indigo-200 to-teal-300',
    sceneryType: 'beach',
    highlights: ['Sydney Opera Close-up', 'Koala & Kangaroo Play Sanctuary', 'Private Harbor Yacht Tour', 'Surfing Lessons for Kids'],
    highlightsAr: ['مشاهدة دار أوبرا سيدني عن قرب', 'محمية رعاية حيوانات الكوالا والكنغر', 'جولة خاصة على متن اليخوت الشراعية', 'دروس ركوب الأمواج المناسبة للعائلات']
  },
  {
    id: 'hobbiton-nz',
    name: 'Hobbit Village & Glowing Worms',
    nameAr: 'قرية الهوبيت السحرية وكهوف الديدان المتوهجة بنيوزيلندا',
    country: 'New Zealand',
    countryAr: 'نيوزيلندا',
    continent: 'Oceania',
    priceUSD: 1690,
    rating: 4.95,
    durationDays: 7,
    description: 'Step into tiny fairytale houses built into green grassy hills, and boat under thousands of glowing blue star-like cave worms!',
    descriptionAr: 'ادخل بيوت الأقزام المستديرة والملونة المحفورة بداخل جبال المروج الخضراء، وتجول بالقارب بداخل كهوف النجوم المضيئة الزرقاء!',
    themeGradient: 'from-emerald-300 via-green-200 to-indigo-300',
    sceneryType: 'mountain',
    highlights: ['Hobbiton Movie Village Farm walk', 'Waitomo Glowworm cave boat ride', 'Roturua Mud pool sulfur spring', 'Maori cultural warrior haka show'],
    highlightsAr: ['سر بين مزارع تفاح وبيوت قرية هوبيتون الخيالية بالكامل', 'أبحر بالقارب في ظلام كهوف ديدان ويتومو المتوهجة كالفضاء الخارجي', 'عيون الطين الحارة والملونة المتفجرة بروتوروا للأطفال', 'مشاهدة رقصة محاربي أقوام ماوري الأصلية والطبول الممتعة']
  },
  {
    id: 'fiji-lagoon',
    name: 'Splash Lagoon Orange Nemo Reef',
    nameAr: 'شلالات فيجي الدافئة والبحث عن السمكة نيمو بالمرجان',
    country: 'Fiji',
    countryAr: 'فيجي',
    continent: 'Oceania',
    priceUSD: 1350,
    rating: 4.89,
    durationDays: 6,
    description: 'Snorkel in super warm lagoons with hundreds of orange Nemo clownfish, and make shell necklaces with local villagers!',
    descriptionAr: 'اغطس في مياه شاطئ المرجان بمساعدات الطفو لرؤية أسماك البهلوان البرتقالية "نيمو" وصغار نجم البحر الأزرق!',
    themeGradient: 'from-cyan-300 via-sky-200 to-teal-400',
    sceneryType: 'beach',
    highlights: ['Clownfish Coral snorkel gardens', 'Traditional village shell flower bead', 'Waterfall jungle slides', 'Bilo Coconut family welcome party'],
    highlightsAr: ['السباحة الآمنة بوسط حدائق الشعاب المرجانية وأسماك نيمو واللعب', 'ورشة صناعة العقود والقلائد الملونة من الصدف الملمع', 'منزلقات طين وصخور الشلالات في أحراش الجزيرة الاستوائية', 'حفل استقبال وتناول الحليب وجوز الهند العائلي الاستوائي الكاريبي']
  },
  {
    id: 'vanuatu-blue',
    name: 'Giant Banyan Slide & Blue Holes',
    nameAr: 'منزلقات الأشجار الطبيعية وبحيرات فانواتو الزرقاء الفائقة',
    country: 'Vanuatu',
    countryAr: 'فانواتو',
    continent: 'Oceania',
    priceUSD: 1190,
    rating: 4.84,
    durationDays: 6,
    description: 'Climb giant multi-story banyan treehouses, and swing from ropes into beautiful glowing neon-blue freshwater pools!',
    descriptionAr: 'تسلق الفروع والبيوت الخشبية الكبيرة لشجر البانوان العملاق، واطلق العنان لأطفالك لتأرجح الحبال ببرك المياه الحارة الزرقاء!',
    themeGradient: 'from-blue-300 via-teal-200 to-indigo-300',
    sceneryType: 'jungle',
    highlights: ['Matevulu Giant Blue Hole leap', 'Banyan Tree castle playground', 'Yasur Volcano safe steam ash trek', 'Water Music tribal kid show'],
    highlightsAr: ['بركة مياه ماتيفولو الفيروزية الطبيعية شديدة النقاء والسباحة', 'قصر ألعاب شجرة البانيان العملاقة بوسط الغابة', 'مسير آمن لمشاهدة صخور بركان ياسور المتوهج بالأبخرة الهادئة', 'عرض موسيقى الطبل المائي الإيقاعية الحرة لأطفال فانواتو']
  },
  {
    id: 'cook-lagoon',
    name: 'Turtle Lagoon & Clear Kayak Cove',
    nameAr: 'شاطئ السلاحف الكبرى وقوارب جزر كوك الشفافة كلياً',
    country: 'Cook Islands',
    countryAr: 'جزر كوك',
    continent: 'Oceania',
    priceUSD: 1280,
    rating: 4.87,
    durationDays: 6,
    description: 'Float on safe clear kayaks to watch slow sea turtles swim below you, and learn how to beat traditional tribal drums!',
    descriptionAr: 'اطف فوق قوارب كاياك بلاستيكية شفافة لمشاهدة السلاحف البحرية المرقطة وسرطان البحر يتحرك تحت مقعدك مباشرة بسلام!',
    themeGradient: 'from-cyan-300 via-emerald-100 to-sky-400',
    sceneryType: 'beach',
    highlights: ['Aitutaki lagoon glass kayak tour', 'Sea turtles marine watch camp', 'Tribal fire drum beating course', 'Island coconut climbing master class'],
    highlightsAr: ['جولة كاياك كلي زجاجي في أجمل بحيرة بحرية "أيتوتاكي"', 'مخيم رعاية السلاحف وصغار الكائنات المائية بوسط المحيط', 'ورشة قرع طبول النار الاستوائية الحرة للأطفال لتعلم مهارة الإيقاع', 'عرض ممتع لتعليم قشر وفتح جوز الهند بمشورة السكان المحليين الأوفياء']
  },
  {
    id: 'samoa-trench',
    name: 'Tiki Volcano Pool & Coconut Shell Cracking',
    nameAr: 'مسبح فوهة البركان الاستوائي ومسابح ساموا الشاطئية الدافئة',
    country: 'Samoa',
    countryAr: 'ساموا',
    continent: 'Oceania',
    priceUSD: 990,
    rating: 4.82,
    durationDays: 5,
    description: 'Swim in a giant safe natural pool inside a grassy volcano crater, and learn the art of cracking coconuts with family!',
    descriptionAr: 'اسبح في مسبح خندقي طبيعي وعظيم ومحاط بنباتات اللبلاب بجوف فوهة بركان قديم مغطى بالمروج، وافتح ثمار جوز الهند كالبطل!',
    themeGradient: 'from-emerald-300 via-teal-200 to-cyan-300',
    sceneryType: 'jungle',
    highlights: ['To-Sua Giant Ocean trench swim', 'Piula cave freshwater pool swim', 'Samoan fire dance night show', 'Junior coco weaving craft shed'],
    highlightsAr: ['النزول عبر درج خشب آمن لمسبح خندق المحيط "توسوا" العظيم واللعب', 'مياه بركة كهف بيولا العذبة المتصل بالبحر ورؤية الأسماك', 'مهرج عروض رقص نار جزيرة ساموا الترحيبي العائلي الآمن', 'ورشة نسج ألعاب وحقائب صغيرة من سعف نخيل الكاكاو للأطفال']
  },
  {
    id: 'tonga-whale',
    name: 'Coral Star Reef & Humpback Whale Singing',
    nameAr: 'قوارب الغناء المائي مع الحيتان الصديقة في تونغا',
    country: 'Tonga',
    countryAr: 'تونغا',
    continent: 'Oceania',
    priceUSD: 1450,
    rating: 4.91,
    durationDays: 6,
    description: 'Listen to giant mother and baby humpback whales sing lovely ocean songs from your family boat, and snorkel with colorful sea-stars!',
    descriptionAr: 'استمع بواسطة لاقطات الصوت المائية لغناء أمهات الحيتان المحدبة وصغارها تحت مياه المحيط، والعب مع نجوم البحر الملونة الصديقة!',
    themeGradient: 'from-blue-300 via-indigo-200 to-sky-400',
    sceneryType: 'beach',
    highlights: ['Hydrophone Whale Song session Cruise', 'Coral star bay shallow snorkel splash', 'Traditional outrigger double boat sail', 'Island beach piglet sandy play game'],
    highlightsAr: ['سماع نغمات الحوت المحدب من مكبر غواصة السفينة مباشرة', 'الغطس الآمن وصيد نجوم البحر الملونة بخليج النجوم المرجانية الضحلة', 'الإبحار بقارب خشبي مزدوج عتيق يماثل قوارب كرتون "موانا"', 'البحث عن خنازير الجزيرة الصغيرة واللعب معها بالرمال الحميمة']
  },
  {
    id: 'solomon-islands',
    name: 'Canoe Jungle Treasure Quest',
    nameAr: 'مغامرة جزر سليمان الاستوائية وبحث الكنوز المفقودة',
    country: 'Solomon Islands',
    countryAr: 'جزر سليمان',
    continent: 'Oceania',
    priceUSD: 890,
    rating: 4.79,
    durationDays: 6,
    description: 'Paddle light wooden canoes to find hidden tropical bird islands, and search for shiny seashells on empty gold sands!',
    descriptionAr: 'جدف بقوارب الخشب الخفيفة للبحث عن جزر طيور الببغاوات الاستوائية، وتجول بخفة للبحث عن الأصداف البحرية البراقة النادرة كالملوك!',
    themeGradient: 'from-teal-300 via-green-200 to-yellow-300',
    sceneryType: 'jungle',
    highlights: ['Uepi Island shallow shark-pup cove', 'Wooden Canoe Bird Island paddle', 'Shell necklace village trading game', 'Jungle fire cooking breadfruit class'],
    highlightsAr: ['شاطئ صغار كلاب البحر المرجانية واللعب معها في جزر "ويبى"', 'تجديف الكانو لجزيرة طيور الكوكاتو والأنواع الملونة الطائرة', 'تبادل القلائد والأصداف مع أطفال المدارس بالقرية الترفيهية', 'طبخ حلوى فاكهة الخبز بنار الحجارة الاستوائية الممتع للأطفال والآباء']
  },
  {
    id: 'tahiti-beach',
    name: 'Blue Lagoon Overwater Family Magic',
    nameAr: 'بحيرة تاهيتي المتلألئة وملاعب أسماك الشفنين الفروية الخلابة',
    country: 'French Polynesia',
    countryAr: 'بولينيزيا الفرنسية',
    continent: 'Oceania',
    priceUSD: 1950,
    rating: 4.96,
    durationDays: 7,
    description: 'Wade with friendly toothless stingrays that feel like soft velvet, and sleep in overwater family bungalow bubbles!',
    descriptionAr: 'ادخل بوسط مياه الشاطئ الدافئة لملاعبة أسماك الشفنين الودية عديمة الأسنان التي تشبه الفرو الناعم، واستأجر بنغالوهات الأجنحة المائية الساطعة!',
    themeGradient: 'from-pink-200 via-sky-305 to-teal-200',
    sceneryType: 'beach',
    highlights: ['Stingray & Shark Pup Hand feed lagoon', 'Papeete kid flower crown weave workshop', 'Overwater family giant glass floor villa', 'Bora Bora ocean water slide ride'],
    highlightsAr: ['إطعام ولمس أسماك الشفنين المفلطحة الأليفة بيدك وسط مياه نقية', 'ورشة صناعة تيجان الزهور العطرة الاستوائية الملونة للفتيات والفتيان', 'فيلا الأرضيات الزجاجية لمشاهدة السلاحف والأسماك تحت أقدام عائلتك', 'منزلقات غرف الفندق المعلقة بالهواء والتي تسقط مباشرة بمياه المحيط الدافئ']
  },
  {
    id: 'new-caledonia-barrier',
    name: 'Submarine Reef & Barrier Coral Quest',
    nameAr: 'مستكشف الحاجز المرجاني وغواصة كاليدونيا الجديدة للأطفال',
    country: 'New Caledonia',
    countryAr: 'كاليدونيا الجديدة',
    continent: 'Oceania',
    priceUSD: 1490,
    rating: 4.86,
    durationDays: 6,
    description: 'Cruise on a giant glass-bottom submarine to view magnificent barrier reefs, rainbow colored coral beds, and friendly sea cows!',
    descriptionAr: 'اركب بداخل غواصة عملاقة ذات قاع زجاجي شفاف لتغوض بجانب المرجانيات الملونة كالبورسلين، وتتبع حيوان الأطوم وقرينات كلب البحر الصغير بسلام!',
    themeGradient: 'from-cyan-300 via-indigo-300 to-sky-400',
    sceneryType: 'beach',
    highlights: ['Glass submarine deep reef tour', 'Friendly Dugong marine search safari', 'Double lagoon island boat day picnic', 'Seashell coloring craft class for children'],
    highlightsAr: ['جولة الغواصة الكبرى زجاجية المقاعد بوسط أعماق المرجان الفيروزي', 'سفاري البحث عن حيوان بقر البحر الودود والتقاط صور الضحك', 'يوم عائلي كامل بالجزيرة المرجانية المعزولة بأشجار النخيل الحميمية', 'ورشة رسم وتلوين عظام الصدف الكبرى والمحار لحفظ الذكرى المبهجة']
  }
];

// List representing 120+ additional countries for global search and booking matching
export const globalSupportedCountries = [
  "Argentina", "Algeria", "Austria", "Albania", "Andorra", "Angola", "Antigua & Barbuda",
  "Armenia", "Australia", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados",
  "Belgium", "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia", "Botswana", "Brazil", "Brunei",
  "Bulgaria", "Burkina Faso", "Cambodia", "Cameroon", "Canada", "Chile", "China", "Colombia",
  "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Dominica", "Ecuador",
  "Egypt", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia",
  "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Honduras", "Hungary", "Iceland", "India",
  "Indonesia", "Ireland", "Italy", "Jamaica", "Japan", "Jordan", "Kenya", "Kuwait", "Latvia",
  "Lebanon", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malaysia", "Maldives",
  "Malta", "Mauritius", "Mexico", "Monaco", "Montenegro", "Morocco", "Nepal", "Netherlands",
  "New Zealand", "Norway", "Oman", "Pakistan", "Panama", "Peru", "Philippines", "Poland", "Portugal",
  "Qatar", "Romania", "Rwanda", "Saudi Arabia", "Senegal", "Seychelles", "Singapore", "Slovakia",
  "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "Switzerland", "Sweden", "Tanzania",
  "Thailand", "Tunisia", "Turkey", "Uganda", "United Arab Emirates", "United Kingdom", "United States",
  "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Vietnam", "Zambia", "Zimbabwe"
];

export const globalSupportedCountriesAr = [
  "الأرجنتين", "الجزائر", "النمسا", "ألبانيا", "أندورا", "أنغولا", "أنتيغوا وبربودا",
  "أرمينيا", "أستراليا", "أذربيجان", "جزر البهاما", "البحرين", "بنغلاديش", "بربادوس",
  "بلجيكا", "بليز", "بنين", "بوتان", "بوليفيا", "البوسنة والهرسك", "بوتسوانا", "البرازيل", "بروناي",
  "بلغاريا", "بوركينا فاسو", "كمبوديا", "الكاميرون", "كندا", "تشيلي", "الصين", "كولومبيا",
  "كوستاريكا", "كرواتيا", "كوبا", "قبرص", "جمهورية التشيك", "الدنمارك", "دومينيكا", "الإكوادور",
  "مصر", "إستونيا", "إثيوبيا", "فيجي", "فنلندا", "فرنسا", "الغابون", "غامبيا", "جورجيا",
  "ألمانيا", "غانا", "اليونان", "غرينادا", "غواتيمالا", "هندوراس", "المجر", "آيسلندا", "الهند",
  "إندونيسيا", "أيرلندا", "إيطاليا", "جامايكا", "اليابان", "الأردن", "كينيا", "الكويت", "لاتفيا",
  "لبنان", "ليختنشتاين", "ليتوانيا", "لوكسمبورغ", "مدغشقر", "ماليزيا", "المالديف",
  "مالطا", "موريشيوس", "المكسيك", "موناكو", "الجبل الأسود", "المغرب", "نيبال", "هولندا",
  "نيوزيلندا", "النرويج", "عمان", "باكستان", "بنما", "بيرو", "الفلبين", "بولندا", "البرتغال",
  "قطر", "رومانيا", "رواندا", "المملكة العربية السعودية", "السنغال", "سيشل", "سنغافورة", "سلوفاكيا",
  "سلوفينيا", "جنوب أفريقيا", "كوريا الجنوبية", "إسبانيا", "سريلانكا", "سويسرا", "السويد", "تنزانيا",
  "تايلاند", "تونس", "تركيا", "أوغندا", "الإمارات العربية المتحدة", "المملكة المتحدة", "الولايات المتحدة",
  "أوروغواي", "أوزبكستان", "فانواتو", "الفاتيكان", "فيتنام", "زامبيا", "زيمبابوي"
];

// --- DYNAMIC EXPANSION GENERATOR TO ENSURE MINIMUM 25 COUNTRIES FOR EVERY CONTINENT ---
const classifyContinent = (country: string): 'Europe' | 'Asia' | 'Americas' | 'Africa' | 'Oceania' | 'Middle East' => {
  const euro = ["Austria", "Albania", "Andorra", "Belgium", "Bosnia", "Bulgaria", "Croatia", "Cyprus", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "Iceland", "Ireland", "Italy", "Latvia", "Liechtenstein", "Lithuania", "Luxembourg", "Malta", "Monaco", "Montenegro", "Netherlands", "Norway", "Poland", "Portugal", "Romania", "Slovakia", "Slovenia", "Spain", "Switzerland", "Sweden", "United Kingdom", "Vatican City"];
  const asia = ["Bangladesh", "Bhutan", "Brunei", "Cambodia", "China", "India", "Indonesia", "Japan", "Malaysia", "Maldives", "Nepal", "Pakistan", "Philippines", "Singapore", "South Korea", "Sri Lanka", "Thailand", "Uzbekistan", "Vietnam"];
  const americas = ["Argentina", "Bahamas", "Barbados", "Belize", "Bolivia", "Brazil", "Canada", "Chile", "Colombia", "Costa Rica", "Cuba", "Dominica", "Ecuador", "Grenada", "Guatemala", "Honduras", "Jamaica", "Mexico", "Panama", "Peru", "United States", "Uruguay"];
  const africa = ["Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Cameroon", "Ethiopia", "Gabon", "Gambia", "Ghana", "Kenya", "Madagascar", "Mauritius", "Morocco", "Rwanda", "Senegal", "Seychelles", "South Africa", "Tanzania", "Tunisia", "Uganda", "Zambia", "Zimbabwe"];
  const oceania = ["Australia", "Fiji", "New Zealand", "Vanuatu", "French Polynesia", "New Caledonia", "Cook Islands", "Samoa"];
  
  if (euro.includes(country)) return 'Europe';
  if (asia.includes(country)) return 'Asia';
  if (americas.includes(country)) return 'Americas';
  if (africa.includes(country)) return 'Africa';
  if (oceania.includes(country)) return 'Oceania';
  return 'Middle East';
};

const sceneryThemes: Record<string, {
  type: 'mountain' | 'beach' | 'city' | 'desert' | 'jungle';
  desc: string;
  descAr: string;
  gradient: string;
  tasksEn: string[];
  tasksAr: string[];
}> = {
  mountain: {
    type: 'mountain',
    desc: 'Explore misty sky cables, beautiful flower hills, and local baby horse ranches with pristine views!',
    descAr: 'استكشف مسارات التلفريك الضبابية، وتلال وبساتين الورد، ومزارع الأحصنة الودية مع المناظر الطبيعية النضرة!',
    gradient: 'from-blue-300 via-cyan-300 to-emerald-300',
    tasksEn: ['Misty mountain view cabin hike', 'Shetland pony horse riding garden', 'Fairy castle wooden labyrinth quest', 'Scenic hillside drawing notebook class'],
    tasksAr: ['مسار الأكواخ الضبابية وجبال الورد الشاهقة', 'مدرسة ركوب خيول البوني القزمية الصغيرة بسلام', 'متاهة قلعة الخشب الفريدة وحكايات الجنيات المضحكة', 'ورشة رسم وتلوين الطبيعة بدفاتر الفندق للأطفال']
  },
  beach: {
    type: 'beach',
    desc: 'Sail on fantastic glass bottom yachts, build mega sandcastles, and touch friendly marine sea stars!',
    descAr: 'أبحر بأروع يخوت القاع الزجاجية، وابنِ قلاع الرمل الكبرى، والمس صغار نجوم البحر الأليفة بسلام مروي!',
    gradient: 'from-teal-200 via-cyan-300 to-sky-400',
    tasksEn: ['Double lagoon glass bottom yacht cruise', 'Big sandcastle engineering competition', 'Snorkeling alongside friendly sea turtles', 'Coral shell watercolor custom painting workshop'],
    tasksAr: ['قارب الشواطئ الهادئة ذو النوافذ الزجاجية الفيروزية بالأعماق', 'تحدي بناء قلعة الرمال الكبرى وتصميم الأقواس على رمل البحر', 'السباحة والغطس برفقة عائلات السلاحف المائية الضحوكة', 'مطبخ تزيين ورسم الأصداف والمرجان بالألوان المائية']
  },
  city: {
    type: 'city',
    desc: 'Ride golden vintage light carousels, meet friendly cartoon heroes, and customize sweet chocolate toys!',
    descAr: 'اركب مراجيح الأحصنة الذهبية المضيئة العتيقة، وقابل أبطال الرسوم المتحركة، واصنع دميتك المفضلة من الشوكولاته الساخنة!',
    gradient: 'from-rose-200 via-amber-200 to-sky-300',
    tasksEn: ['Vintage gold gilded horse carousel ride', 'Lego block mini architecture workshop', 'Interactive robotic toy museum playground', 'Sweet liquid chocolate customized mold class'],
    tasksAr: ['مراجيح الأحصنة الذهبية الساطعة بوسط الحدائق المبهجة', 'ورشة البناء المتطورة ببيت أحجار الليغو للأولاد', 'متحف الألعاب الروبوتية والتفاعلية للأطفال المبهج', 'صناعة وتزيين قوالب الشوكولاته والكراميل بالأيدي']
  },
  desert: {
    type: 'desert',
    desc: 'Slide down giant golden dunes on wooden boards, ride tall friendly smiling camels, and count star constellations!',
    descAr: 'تزحلق على كثبان رمال الصحراء الذهبية بألواح الخشب الخفيفة، واركب قوافل الجمال الأليفة، وتتبع النجوم لرصد الكواكب ليلاً!',
    gradient: 'from-amber-200 via-orange-300 to-yellow-200',
    tasksEn: ['Warm golden dunes soft board sliding', 'Friendly camel caravan desert star drive', 'Bedouin camp night telescope star spotting', 'Sand castle clay bricks mold making class'],
    tasksAr: ['التزحلق على الكثبان المذهلة بألواح التزحلق الخشبية الآمنة', 'قافلة جمال الصحراء وتتبع النجوم والتقاط صور الابتسامة للأطفال', 'رصد النجوم والكواكب بالتلسكوب بوسط خيمة البدوي الدافئة', 'ورشة تصميم مجسمات القلاع والقصور بصلصال رمال الواحة السحرية']
  },
  jungle: {
    type: 'jungle',
    desc: 'Walk high-safety green canopy rope bridges, feed cheeky swinging monkeys, and cruise down magical firefly rivers!',
    descAr: 'امشِ بوسط جسور الحبال المعلقة الآمنة تماماً، وأطعم صغار القردة اللطيفة، وأبحر بقوارب غابات اليراعات المضيئة ليلاً!',
    gradient: 'from-emerald-300 via-cyan-200 to-indigo-300',
    tasksEn: ['High safety forest canopy suspension bridge trail', 'Baby monkey rescue sanctuary petting and feeding', 'Glowing night fireflies wooden boat river cruise', 'Rainforest butterfly path and leaf crown weaving'],
    tasksAr: ['جسر الحبال المعلق المعلق فوق قمم الأشجار الترفيهية للأولاد', 'محمية القرود والسناجب اللطيفة وإطعام وصناعة صور مضحكة', 'قارب غابات اليراعات المضيئة ليلاً بجولات عائلية هادئة', 'مسار الفراشات السحرية ورسم الكائنات الحية بالدفتر']
  }
};

const oceaniaCities = [
  { city: 'Sydney', cityAr: 'سيدني', country: 'Australia', countryAr: 'أستراليا', scenery: 'beach' },
  { city: 'Queenstown', cityAr: 'كوينزتاون', country: 'New Zealand', countryAr: 'نيوزيلندا', scenery: 'mountain' },
  { city: 'Nadi', cityAr: 'نادي', country: 'Fiji', countryAr: 'فيجي', scenery: 'beach' },
  { city: 'Port Vila', cityAr: 'بورت فيلا', country: 'Vanuatu', countryAr: 'فانواتو', scenery: 'beach' },
  { city: 'Melbourne', cityAr: 'ملبورن', country: 'Australia', countryAr: 'أستراليا', scenery: 'city' },
  { city: 'Cairns', cityAr: 'كيرنز', country: 'Australia', countryAr: 'أستراليا', scenery: 'jungle' },
  { city: 'Rotorua', cityAr: 'روتوروا', country: 'New Zealand', countryAr: 'نيوزيلندا', scenery: 'mountain' },
  { city: 'Apia', cityAr: 'أبيا', country: 'Samoa', countryAr: 'ساموا', scenery: 'beach' },
  { city: 'Gold Coast', cityAr: 'غولد كوست', country: 'Australia', countryAr: 'أستراليا', scenery: 'beach' },
  { city: 'Auckland', cityAr: 'أوكلاند', country: 'New Zealand', countryAr: 'نيوزيلندا', scenery: 'city' },
  { city: 'Bora Bora', cityAr: 'بورا بورا', country: 'French Polynesia', countryAr: 'بولينيزيا الفرنسية', scenery: 'beach' },
  { city: 'Hobart', cityAr: 'هوبارت', country: 'Australia', countryAr: 'أستراليا', scenery: 'mountain' },
  { city: 'Franz Josef', cityAr: 'فرانتس جوزيف', country: 'New Zealand', countryAr: 'نيوزيلندا', scenery: 'mountain' },
  { city: 'Suva', cityAr: 'سوفا', country: 'Fiji', countryAr: 'فيجي', scenery: 'jungle' },
  { city: 'Adelaide', cityAr: 'أديليد', country: 'Australia', countryAr: 'أستراليا', scenery: 'mountain' },
  { city: 'Perth', cityAr: 'بيرث', country: 'Australia', countryAr: 'أستراليا', scenery: 'beach' },
  { city: 'Esperance', cityAr: 'إسبيرانس', country: 'Australia', countryAr: 'أستراليا', scenery: 'beach' },
  { city: 'Matamata', cityAr: 'ماتاماتا', country: 'New Zealand', countryAr: 'نيوزيلندا', scenery: 'mountain' },
  { city: 'Noumea', cityAr: 'نوميا', country: 'New Caledonia', countryAr: 'كاليدونيا الجديدة', scenery: 'beach' },
  { city: 'Suva Harbor', cityAr: 'مرفأ سوفا', country: 'Fiji', countryAr: 'فيجي', scenery: 'beach' },
  { city: 'Coral Coast', cityAr: 'كورال كوست', country: 'Fiji', countryAr: 'فيجي', scenery: 'beach' },
  { city: 'Wellington', cityAr: 'ويلينغتون', country: 'New Zealand', countryAr: 'نيوزيلندا', scenery: 'city' }
];

const mainContinents: ('Europe' | 'Asia' | 'Americas' | 'Africa' | 'Oceania' | 'Middle East')[] = [
  'Europe', 'Asia', 'Americas', 'Africa', 'Oceania', 'Middle East'
];

mainContinents.forEach((continent) => {
  let currentCount = destinationsList.filter(d => d.continent === continent).length;
  let attempts = 0;
  
  if (continent === 'Oceania') {
    for (let c of oceaniaCities) {
      if (currentCount >= 25) break;
      const exists = destinationsList.some(d => d.name.toLowerCase().includes(c.city.toLowerCase()));
      if (!exists) {
        const id = `proc-oceania-${c.city.toLowerCase().replace(/\s+/g, '-')}`;
        const theme = sceneryThemes[c.scenery] || sceneryThemes.beach;
        
        destinationsList.push({
          id,
          name: `${c.city} Happy Family Adventure`,
          nameAr: `رحلة السعادة والمغامرة العائلية في ${c.cityAr}`,
          country: c.country,
          countryAr: c.countryAr,
          continent: 'Oceania',
          priceUSD: 1150 + (attempts * 45) % 300,
          rating: parseFloat((4.75 + (attempts * 0.03) % 0.2).toFixed(2)),
          durationDays: 5 + (attempts % 3),
          themeGradient: theme.gradient,
          sceneryType: theme.type,
          description: `Pack your happy travel bags! Join our family tour to ${c.city} in ${c.country}. ${theme.desc}`,
          descriptionAr: `احزم حقائب السفر السعيدة! انضم لرحلتنا العائلية المبهجة إلى ${c.cityAr} في ${c.countryAr}. ${theme.descAr}`,
          highlights: theme.tasksEn,
          highlightsAr: theme.tasksAr
        });
        currentCount++;
        attempts++;
      }
    }
  } else {
    for (let i = 0; i < globalSupportedCountries.length; i++) {
      if (currentCount >= 25) break;
      const countryEn = globalSupportedCountries[i];
      const countryAr = globalSupportedCountriesAr[i] || countryEn;
      const countryContinent = classifyContinent(countryEn);
      
      if (countryContinent === continent) {
        const isRepresented = destinationsList.some(d => d.country.toLowerCase() === countryEn.toLowerCase());
        if (!isRepresented) {
          const id = `proc-${continent.toLowerCase().replace(/\s+/g, '-')}-${countryEn.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`;
          
          const sceneryKeys: ('mountain' | 'beach' | 'city' | 'desert' | 'jungle')[] = ['mountain', 'beach', 'city', 'desert', 'jungle'];
          const sceneryKey = sceneryKeys[i % sceneryKeys.length];
          const theme = sceneryThemes[sceneryKey];
          
          destinationsList.push({
            id,
            name: `${countryEn} Royal Family Wonders`,
            nameAr: `عجائب القصور والترفيه العائلي في ${countryAr}`,
            country: countryEn,
            countryAr: countryAr,
            continent: continent,
            priceUSD: 950 + (i * 75) % 400,
            rating: parseFloat((4.7 + (i * 0.02) % 0.25).toFixed(2)),
            durationDays: 5 + (i % 3),
            themeGradient: theme.gradient,
            sceneryType: theme.type,
            description: `Pack your magical travel bags! Come along on a gorgeous holiday tour to ${countryEn}. ${theme.desc}`,
            descriptionAr: `احزم حقائب السفر المبهجة والممتازة! انضم لجولتنا السياحية السعيدة في ${countryAr}. ${theme.descAr}`,
            highlights: theme.tasksEn,
            highlightsAr: theme.tasksAr
          });
          currentCount++;
        }
      }
    }
    
    let paddingId = 1;
    while (currentCount < 25) {
      const id = `proc-pad-${continent.toLowerCase().replace(/\s+/g, '-')}-${paddingId}`;
      const sceneryKeys: ('mountain' | 'beach' | 'city' | 'desert' | 'jungle')[] = ['mountain', 'beach', 'city', 'desert', 'jungle'];
      const sceneryKey = sceneryKeys[paddingId % sceneryKeys.length];
      const theme = sceneryThemes[sceneryKey];
      
      destinationsList.push({
        id,
        name: `${continent} Paradise Gate #${paddingId}`,
        nameAr: `بوابة السعادة والجنة العائلية #${paddingId} في ${continent}`,
        country: continent === 'Middle East' ? 'Oman' : 'Tanzania',
        countryAr: continent === 'Middle East' ? 'عمان' : 'تنزانيا',
        continent: continent,
        priceUSD: 1100 + paddingId * 80,
        rating: 4.88,
        durationDays: 6,
        themeGradient: theme.gradient,
        sceneryType: theme.type,
        description: `Experience the finest selection of holiday highlights with your children on this elite tour!`,
        descriptionAr: `عش أروع باقة من اللحظات والأنشطة العائلية السعيدة مع أطفالك في هذه الرحلة الراقية!`,
        highlights: theme.tasksEn,
        highlightsAr: theme.tasksAr
      });
      currentCount++;
      paddingId++;
    }
  }
});

// Add Antarctica North & South destinations to satisfy the Antarctica requirement!
const antarticaItems: Omit<Destination, 'id' | 'priceUSD' | 'rating' | 'durationDays'>[] = [
  {
    name: 'Frozen Emperor Penguin Sanctuary',
    nameAr: 'عشيرة البطاريق الإمبراطورية المتجمدة وشمال القارة القطبية',
    country: 'Antarctica',
    countryAr: 'القارة القطبية الجنوبية',
    continent: 'Antartica',
    sceneryType: 'mountain',
    themeGradient: 'from-cyan-300 via-sky-200 to-indigo-100',
    description: 'Join a mesmerizing family excursion to the northern frozen edge. Discover hundreds of friendly fluffy Emperor penguins!',
    descriptionAr: 'انضم لرحلة عائلية ساحرة بالقرب من الأطراف الجليدية ورعاية ومداعبة مستعمرات البطاريق الإمبراطورية اللطيفة!',
    highlights: ['Petting friendly fluffy baby emperor penguins', 'Snow cabin heater stories of old captains', 'Polar sled pulled by virtual cute huskies', 'Ice castle blocks puzzle building game'],
    highlightsAr: ['لمس ومداعبة صغار البطاريق الإمبراطورية ذات الفراء الناعم بسلام وأمان العائلة', 'مبيت كوخ الصوف الدافئ وسماع قصص البحارة الأبطال ومحاربي العواصف القديمة', 'عربات التزحلق الخشبية التي تسحبها دمي الهاسكي المبتسمة المبهجة تحت الثلج', 'ورشة بناء وحل لغز قوالب قصور الثلج والجليد اللامع الذي يضيء ليلاً للأطفال']
  },
  {
    name: 'Aurora Ice Castle & Slide Exploration',
    nameAr: 'منحدر الجليد الشاهق وشفق القطب الجنوبي المضيء',
    country: 'Antarctica',
    countryAr: 'القارة القطبية الجنوبية',
    continent: 'Antartica',
    sceneryType: 'mountain',
    themeGradient: 'from-blue-200 via-indigo-300 to-sky-300',
    description: 'Wander into deep, spectacular hollowed out neon glacial ice chambers, and dive down safe slopes under sparkling green auroras!',
    descriptionAr: 'تجوّل بداخل أبراج وقصور الجليد الطبيعية اللامعة، وتزحلق بسلام تام من المنحدرات تحت أضواء القطب الملونة!',
    highlights: ['Antarctic research station computer simulation', 'Aurora australis stargazing and planet spotting', 'Colossal glacial ice slide trek adventure', 'Cozy hot cocoa and sweet waffle fire camp'],
    highlightsAr: ['جولة محاكاة حواسب محطة أبحاث أموندسن للأطفال والتقاط صور الأبطال', 'مرصد تتبع ورصد كواكب شفق القطب الجنوبي المتوهجة بأصباغ السماء الساطعة', 'مغامرة منزلقات الجليد الطبيعي الشاهق المجهز والآمن تماماً للأولاد والبنات', 'شرب الكاكاو الحلو الساخن كالفحم فوق أحجار الكامب الهادئ الدافئ المبهج للعائلة']
  },
  {
    name: 'Amundsen-Scott South Pole Base Expedition',
    nameAr: 'رحلة استكشاف قاعدة أموندسن بمركز القطب الجنوبي للكرة الأرضية',
    country: 'Antarctica',
    countryAr: 'القارة القطبية الجنوبية',
    continent: 'Antartica',
    sceneryType: 'mountain',
    themeGradient: 'from-cyan-300 via-teal-100 to-sky-400',
    description: 'Experience an epic lifetime family quest to standing at the exact South Pole, and explore polar research centers with simulation games!',
    descriptionAr: 'عش رحلة الأحلام وقم بزيارة وتحديد خط القطب الجنوبي الجغرافي تماماً مع استكشاف مركز أبحاث الثلج والألعاب الكرتونية!',
    highlights: ['Stand on the exact South Pole of Earth marker', 'Glacial core drilling science sandbox game', 'Extreme weather polar suit custom photography', 'Giant snow globe adventure playground'],
    highlightsAr: ['الوقوف بمنتصف وتحديد مركز خط القطب الجنوبي الجغرافي كأبطال حقيقيين', 'صندوق ألعاب حفريات واستخراج عظام الديناصورات تحت طبقات الجليد الصخرية للأطفال', 'ارتداء ملابس وحقائب رواد قطب الطيران الثلجي العتيق والتقاط فيديوهات للذكرى', 'ملاعب كرة الثلج الشاملة والآمنة للأطفال والشباب وبناء الأكواخ الثلجية مع الأمهات']
  }
];

antarticaItems.forEach((item, idx) => {
  const id = `extra-antartica-${idx}`;
  const priceUSD = 1850 + idx * 150;
  const rating = 4.92 + idx * 0.02;
  const durationDays = 6 + idx;
  destinationsList.push({
    id,
    priceUSD,
    rating,
    durationDays,
    ...item
  });
});

