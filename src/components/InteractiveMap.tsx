/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Compass, Sparkles, MapPin, Plane, CloudSnow, Sun, Ship, Trees } from 'lucide-react';
import { Destination } from '../types';

interface InteractiveMapProps {
  onSelectContinent: (continent: string) => void;
  selectedContinent: string;
  destinations: Destination[];
  onOpenBooking: (dest: Destination) => void;
  lang: 'en' | 'ar';
}

interface MapTarget {
  id: string;
  name: string;
  nameAr: string;
  x: number; // percentage width
  y: number; // percentage height
  color: string;
  icon: string;
  bgGradient: string;
  sceneryType: string;
  popularItem: string;
  popularItemAr: string;
  activities: string[];
  activitiesAr: string[];
}

const configContinents: MapTarget[] = [
  {
    id: 'Americas',
    name: 'The Americas',
    nameAr: 'الأمريكتان',
    x: 20,
    y: 40,
    color: '#8b5cf6', // Violet
    icon: '🏰', // Theme parks & Castles
    bgGradient: 'from-violet-400 to-fuchsia-500',
    sceneryType: 'city',
    popularItem: 'Disney Castle Magic & Grand Coasters',
    popularItemAr: 'سحر قصر ديزني والحافلات السريعة',
    activities: ['🏰 Disney Parks', '🎢 Mega Coasters', '🛍️ Sweet Shopping'],
    activitiesAr: ['🏰 ديزني لاند', '🎢 قطارات سريعة', '🛍️ تسوق الهدايا']
  },
  {
    id: 'Europe',
    name: 'Europe',
    nameAr: 'أوروبا',
    x: 48,
    y: 25,
    color: '#3b82f6', // Blue
    icon: '🏔️', // Swiss Alps
    bgGradient: 'from-blue-400 to-cyan-500',
    sceneryType: 'mountain',
    popularItem: 'Swiss Choco-Castle Alps Flight',
    popularItemAr: 'رحلة جبال سويسرا وشوكولاته الألب',
    activities: ['🏔️ Swiss Alps', '🍫 Choco Labs', '🏰 Fairy Castles'],
    activitiesAr: ['🏔️ جبال الألب', '🍫 معامل الشوكولاته', '🏰 قلاع تراثية']
  },
  {
    id: 'Middle East',
    name: 'Middle East',
    nameAr: 'الشرق الأوسط',
    x: 62,
    y: 42,
    color: '#f59e0b', // Amber/Yellow
    icon: '🐪', // Pyramids & Desserts
    bgGradient: 'from-amber-400 to-orange-500',
    sceneryType: 'desert',
    popularItem: 'Ancient Pharaoh Pyramids Expedition',
    popularItemAr: 'استكشاف الأهرامات وألغاز الفراعنة القدامى',
    activities: ['🐪 Pyramids', '🏜️ Dune Gliding', '✨ Star Spotting'],
    activitiesAr: ['🐪 الأهرامات', '🏜️ رمال ذهبية', '✨ رصد النجوم']
  },
  {
    id: 'Africa',
    name: 'Africa',
    nameAr: 'أفريقيا',
    x: 52,
    y: 65,
    color: '#f97316', // Orange
    icon: '🦁', // Lion Safari
    bgGradient: 'from-orange-400 to-amber-500',
    sceneryType: 'jungle',
    popularItem: 'Savanna Lion King Safari Bus tour',
    popularItemAr: 'سفاري الأسد الذهبي ومحميات كينيا الطبيعية',
    activities: ['🦁 Lion Safari', '🦒 Wildlife feeding', '🌳 Canopy Walk'],
    activitiesAr: ['🦁 سفاري الأسود', '🦒 إطعام الزرافات', '🌳 مسارات معلقة']
  },
  {
    id: 'Asia',
    name: 'Asia',
    nameAr: 'آسيا',
    x: 78,
    y: 35,
    color: '#ec4899', // Pink
    icon: '🌸', // Cherry Blossom & Shrines
    bgGradient: 'from-pink-400 to-rose-500',
    sceneryType: 'city',
    popularItem: 'Tokyo Cherry blossom & Neon Quest',
    popularItemAr: 'مغامرة الكرز والنيون وألعاب أكيهايبارا',
    activities: ['🌸 Cherry Blossoms', '🤖 Robot Museums', '🍜 Sweet Markets'],
    activitiesAr: ['🌸 زهور الكرز', '🤖 متاحف الروبوت', '🍜 أسواق السعادة']
  },
  {
    id: 'Oceania',
    name: 'Oceania',
    nameAr: 'أوقيانوسيا',
    x: 85,
    y: 75,
    color: '#14b8a6', // Teal
    icon: '🐨', // Koala & Harbor
    bgGradient: 'from-teal-400 to-sky-500',
    sceneryType: 'beach',
    popularItem: 'Sydney Harbor Yacht & Koala Playland',
    popularItemAr: 'رحلات اليخوت وملاعب كوالا سيدني',
    activities: ['🐨 Koala Petting', '⛵ Glass Yachts', '🏄 Laguna Snorkel'],
    activitiesAr: ['🐨 ملاعبة الكوالا', '⛵ يخوت زجاجية', '🏄 غطس البحيرات']
  },
  {
    id: 'Antartica',
    name: 'Antartica North and South',
    nameAr: 'شمال وجنوب القارة القطبية الجنوبية',
    x: 50,
    y: 91,
    color: '#38bdf8',
    icon: '🐧',
    bgGradient: 'from-cyan-300 via-sky-200 to-indigo-100',
    sceneryType: 'mountain',
    popularItem: 'Frozen Penguin Colony & Glacier Ice Slide Trek',
    popularItemAr: 'مستعمرة البطاريق المتجمدة والمنزلقات الجليدية العظيمة',
    activities: ['🐧 Penguin Colony', '❄️ Glacier Slides', '🌌 Polar Auroras'],
    activitiesAr: ['🐧 طيور البطاريق', '❄️ زلاجات الجليد', '🌌 الشفق القطبي']
  }
];

const continentPaths = [
  {
    name: 'Antarctica',
    d: 'M 50,470 Q 150,455 250,465 T 450,460 T 650,465 T 850,460 T 950,470 L 950,490 L 50,490 Z'
  },
  {
    name: 'North America',
    d: 'M 80,110 C 110,90 140,80 180,80 C 210,80 250,60 270,75 C 290,95 320,80 340,90 C 345,110 320,135 290,140 C 295,165 310,185 270,220 C 255,235 230,245 220,270 C 210,295 190,300 185,285 C 195,270 180,260 170,245 C 150,225 130,230 110,210 C 100,190 90,170 80,150 C 75,135 70,120 80,110 Z'
  },
  {
    name: 'Greenland',
    d: 'M 290,50 Q 320,40 340,55 Q 330,75 310,75 Q 285,65 290,50 Z'
  },
  {
    name: 'South America',
    d: 'M 220,295 C 240,295 270,310 290,330 C 310,350 330,380 310,410 C 295,430 270,450 250,480 C 240,490 235,490 230,475 C 230,450 215,420 205,395 C 195,370 200,340 210,320 C 215,310 210,300 220,295 Z'
  },
  {
    name: 'Africa',
    d: 'M 440,220 C 470,210 515,225 530,235 C 540,245 535,260 550,270 C 560,285 580,300 585,315 C 590,330 570,350 565,370 C 550,400 540,430 520,445 C 510,450 500,430 495,410 C 490,380 460,360 445,340 C 430,320 425,290 430,270 C 435,250 425,230 440,220 Z'
  },
  {
    name: 'Madagascar',
    d: 'M 575,370 Q 590,390 580,415 Q 565,410 570,380 Z'
  },
  {
    name: 'Europe & Asia',
    d: 'M 445,130 C 455,100 440,80 470,60 C 510,70 540,55 580,60 C 620,50 670,55 725,60 C 785,55 845,60 885,75 C 915,85 930,120 900,140 C 895,150 910,160 875,185 C 850,200 870,220 840,250 C 820,270 790,260 765,245 C 750,235 745,250 720,250 C 700,250 685,270 665,270 C 650,270 645,250 625,245 C 595,240 590,255 570,255 C 560,255 558,235 540,230 C 525,225 520,205 500,200 C 490,195 480,210 470,200 C 460,190 475,170 470,155 C 465,140 435,140 445,130 Z'
  },
  {
    name: 'United Kingdom',
    d: 'M 410,105 Q 425,95 420,115 T 405,115 Z'
  },
  {
    name: 'Japan',
    d: 'M 890,115 Q 910,135 885,160 Q 875,145 890,115 Z'
  },
  {
    name: 'India',
    d: 'M 665,210 Q 695,255 675,275 Q 655,245 665,210 Z'
  },
  {
    name: 'Indochina & Maritime Southeast Asia',
    d: 'M 765,245 Q 795,285 770,310 T 730,270 Z'
  },
  {
    name: 'Indonesia Islands',
    d: 'M 740,320 Q 770,325 800,315 M 810,325 Q 840,320 860,335'
  },
  {
    name: 'Australia & Oceania',
    d: 'M 770,370 C 795,350 820,345 850,345 C 880,345 910,360 900,390 C 890,420 870,440 840,440 C 810,440 780,420 765,400 C 755,385 750,380 770,370 Z'
  },
  {
    name: 'New Zealand North',
    d: 'M 915,440 Q 930,455 920,465 Z'
  },
  {
    name: 'New Zealand South',
    d: 'M 905,460 Q 915,475 900,485 Z'
  }
];

export default function InteractiveMap({
  onSelectContinent,
  selectedContinent,
  destinations,
  onOpenBooking,
  lang
}: InteractiveMapProps) {
  const [hoveredIsland, setHoveredIsland] = useState<MapTarget | null>(null);
  const [activeIsland, setActiveIsland] = useState<MapTarget | null>(null);
  const [airplanePos, setAirplanePos] = useState({ x: 10, y: 15 });

  const handleIslandClick = (island: MapTarget) => {
    setActiveIsland(island);
    onSelectContinent(island.id);
    // Smoothly fly airplane to this island
    setAirplanePos({ x: island.x - 5, y: island.y - 10 });
  };

  const getMatchedPackages = (continent: string) => {
    return destinations.filter((d) => d.continent === continent);
  };

  const isRtl = lang === 'ar';

  return (
    <div className="w-full max-w-[1536px] xl:max-w-[1720px] mx-auto px-4 md:px-6 py-6" id="fly-wide-map-section">
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/60 mb-2">
          <Compass className="w-4 h-4 text-sky-500 animate-spin-slow" />
          <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest">
            {lang === 'ar' ? 'رحلات جوية تفاعلية' : 'Interactive Flight Map'}
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
          {lang === 'ar' ? 'خريطة فلاي-وايد للعالم السعيد 🗺️' : 'Fly-Wide Happy World Map 🗺️'}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 max-w-2xl mx-auto">
          {lang === 'ar' 
            ? 'اضغط على جزر القارات العائمة وسافر طائراً مع الكوالا والأسود والفرسان في رحلة ساحرة!' 
            : 'Tap the magical floating continent islands and instantly pilot our virtual flight to discover beautiful tour packs!'}
        </p>
      </div>

      {/* Main Map Box */}
      <div className="relative bg-gradient-to-b from-sky-300 via-sky-200 to-indigo-100 dark:from-slate-900 dark:via-indigo-950/70 dark:to-slate-950 rounded-3xl p-4 md:p-8 shadow-2xl border-4 border-white/90 dark:border-slate-800/80 overflow-hidden aspect-[16/9] min-h-[350px] md:min-h-[550px] flex flex-col justify-between">
        
        {/* World Map Outline SVG as Background */}
        <div className="absolute inset-0 pointer-events-none z-0 opacity-40 dark:opacity-25 select-none transition-opacity duration-300">
          <svg
            viewBox="0 0 1000 500"
            className="w-full h-full"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Soft Ocean Grids */}
            <line x1="100" y1="0" x2="100" y2="500" className="stroke-slate-700/[0.03] dark:stroke-sky-300/[0.04]" strokeDasharray="3 3" />
            <line x1="200" y1="0" x2="200" y2="500" className="stroke-slate-700/[0.03] dark:stroke-sky-300/[0.04]" strokeDasharray="3 3" />
            <line x1="300" y1="0" x2="300" y2="500" className="stroke-slate-700/[0.03] dark:stroke-sky-300/[0.04]" strokeDasharray="3 3" />
            <line x1="400" y1="0" x2="400" y2="500" className="stroke-slate-700/[0.03] dark:stroke-sky-300/[0.04]" strokeDasharray="3 3" />
            <line x1="500" y1="0" x2="500" y2="500" className="stroke-slate-700/[0.03] dark:stroke-sky-300/[0.04]" strokeDasharray="3 3" />
            <line x1="600" y1="0" x2="600" y2="500" className="stroke-slate-700/[0.03] dark:stroke-sky-300/[0.04]" strokeDasharray="3 3" />
            <line x1="700" y1="0" x2="700" y2="500" className="stroke-slate-700/[0.03] dark:stroke-sky-300/[0.04]" strokeDasharray="3 3" />
            <line x1="800" y1="0" x2="800" y2="500" className="stroke-slate-700/[0.03] dark:stroke-sky-300/[0.04]" strokeDasharray="3 3" />
            <line x1="900" y1="0" x2="900" y2="500" className="stroke-slate-700/[0.03] dark:stroke-sky-300/[0.04]" strokeDasharray="3 3" />

            <line x1="0" y1="100" x2="1000" y2="100" className="stroke-slate-700/[0.03] dark:stroke-sky-300/[0.04]" strokeDasharray="3 3" />
            <line x1="0" y1="200" x2="1000" y2="200" className="stroke-slate-700/[0.03] dark:stroke-sky-300/[0.04]" strokeDasharray="3 3" />
            <line x1="0" y1="300" x2="1000" y2="300" className="stroke-slate-700/[0.03] dark:stroke-sky-300/[0.04]" strokeDasharray="3 3" />
            <line x1="0" y1="400" x2="1000" y2="400" className="stroke-slate-700/[0.03] dark:stroke-sky-300/[0.04]" strokeDasharray="3 3" />

            {/* Continent Outlines */}
            {continentPaths.map((path, idx) => (
              <path
                key={idx}
                d={path.d}
                className="stroke-slate-700/20 dark:stroke-sky-450/25 fill-slate-705/[0.03] dark:fill-sky-400/[0.04]"
                strokeWidth="1.75"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            ))}
          </svg>
        </div>

        {/* Dynamic Sky Decorations - Kid-friendly floating clouds */}
        <div className="absolute inset-0 pointer-events-none opacity-40">
          <motion.div
            animate={{ x: [0, 80, 0] }}
            transition={{ repeat: Infinity, duration: 25, ease: 'easeInOut' }}
            className="absolute top-10 left-10 text-white text-3xl"
          >
            ☁️
          </motion.div>
          <motion.div
            animate={{ x: [0, -60, 0] }}
            transition={{ repeat: Infinity, duration: 18, ease: 'easeInOut' }}
            className="absolute top-24 right-1/4 text-white text-4xl"
          >
            ☁️
          </motion.div>
          <motion.div
            animate={{ x: [-20, 50, -20] }}
            transition={{ repeat: Infinity, duration: 22, ease: 'easeInOut' }}
            className="absolute bottom-20 left-1/3 text-white text-3xl"
          >
            🎈
          </motion.div>
          <div className="absolute top-8 left-1/2 transform -translate-x-1/2 flex items-center gap-1.5 opacity-30 text-sky-800 dark:text-sky-300 font-mono text-[10px] tracking-wide">
            <span>🌍 FLY-WIDE AUTOPILOT SENSOR ACTIVE</span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          </div>
        </div>

        {/* Floating continent islands */}
        <div className="absolute inset-0 z-10">
          {configContinents.map((island) => {
            const isSelected = selectedContinent === island.id || (selectedContinent === '' && activeIsland?.id === island.id);
            const isHovered = hoveredIsland?.id === island.id;

            return (
              <div
                key={island.id}
                style={{
                  position: 'absolute',
                  left: `${island.x}%`,
                  top: `${island.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className="z-20 cursor-pointer"
              >
                {/* Visual Island Container */}
                <div className="relative group flex flex-col items-center">
                  
                  {/* Island Shadow Blob */}
                  <div className="absolute -bottom-2 w-16 h-4 bg-black/10 dark:bg-black/30 rounded-full filter blur-[4px] group-hover:scale-125 transition-transform duration-300" />
                  
                  {/* Floating Island Circle with Gradient */}
                  <motion.div
                    whileHover={{ scale: 1.15, y: -8 }}
                    animate={{ 
                      y: isSelected ? [-4, 4, -4] : [0, -3, 0],
                    }}
                    transition={{
                      y: { repeat: Infinity, duration: isSelected ? 3 : 5, ease: 'easeInOut' }
                    }}
                    onClick={() => handleIslandClick(island)}
                    onMouseEnter={() => setHoveredIsland(island)}
                    onMouseLeave={() => setHoveredIsland(null)}
                    className={`relative w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br ${island.bgGradient} p-1 shadow-lg flex flex-col items-center justify-center border-4 ${
                      isSelected 
                        ? 'border-yellow-300 ring-4 ring-sky-400/50 shadow-yellow-200/50 scale-110' 
                        : 'border-white dark:border-slate-700/80 hover:border-sky-300'
                    } transition-colors duration-300`}
                  >
                    {/* Glowing ping ripple for selections */}
                    {isSelected && (
                      <span className="absolute inset-0 rounded-full border-2 border-yellow-300 animate-ping opacity-60" />
                    )}

                    <span className="text-2xl md:text-4xl filter drop-shadow-md">{island.icon}</span>
                    <span className="absolute bottom-1 md:bottom-2 bg-slate-900/80 dark:bg-white/95 px-1.5 py-0.5 rounded-full text-[8.5px] md:text-[10px] font-bold text-white dark:text-slate-950 whitespace-nowrap shadow tracking-tight">
                      {isRtl ? island.nameAr : island.name}
                    </span>
                  </motion.div>

                  {/* Hot Air Balloon/Pulse above island indicating available package counts */}
                  <div className="absolute -top-7 md:-top-9 flex flex-col items-center">
                    <motion.div 
                      key={island.id}
                      animate={{ y: [-2, 4, -2] }}
                      transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                      className="bg-yellow-400 text-slate-900 text-[8px] md:text-[9.5px] font-extrabold px-1.5 py-0.5 rounded-full shadow border border-white flex items-center gap-0.5"
                    >
                      <span>🎈</span>
                      <span>{getMatchedPackages(island.id).length || 1}</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Simulated Pilot Airplane Flying Icon */}
          <motion.div
            animate={{
              left: `${airplanePos.x}%`,
              top: `${airplanePos.y}%`,
            }}
            transition={{ type: 'spring', damping: 15, stiffness: 60 }}
            style={{ position: 'absolute' }}
            className="z-30 pointer-events-none"
          >
            <div className="relative flex flex-col items-center">
              {/* Cute Plane Vector Icon */}
              <div className="bg-white/95 dark:bg-slate-800 border-2 border-sky-400 p-2 rounded-full shadow-lg flex items-center justify-center animate-bounce-slow">
                <Plane className="w-6 h-6 text-sky-500 transform rotate-45" />
              </div>
              
              {/* Airplane exhaust clouds */}
              <div className="w-1.5 h-1.5 rounded-full bg-white/70 absolute -left-1 bottom-1 animate-ping" />
              <div className="w-1 h-1 rounded-full bg-white/50 absolute -left-2 bottom-3 animate-ping delay-75" />
            </div>
          </motion.div>
        </div>

        {/* Map Top Widget Panel (Apple style Glassmorphism) */}
        <div className="relative z-20 flex justify-between items-start gap-4 pointer-events-none">
          <div className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-white/20 shadow-md pointer-events-auto flex items-center gap-2 max-w-[200px] md:max-w-xs">
            <div className="p-1.5 bg-sky-200/50 dark:bg-sky-950 rounded-lg">
              <Compass className="w-4 h-4 text-sky-600 dark:text-sky-400 animate-spin-slow" />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">{isRtl ? 'الملاحة النشطة' : 'Active Navigation'}</p>
              <h4 className="text-xs md:text-sm font-bold text-slate-800 dark:text-white">
                {selectedContinent 
                  ? (isRtl ? configContinents.find(c => c.id === selectedContinent)?.nameAr : selectedContinent)
                  : (isRtl ? 'اختر جزيرة لاستكشافها' : 'Select an Island')}
              </h4>
            </div>
          </div>

          <button
            onClick={() => {
              onSelectContinent('');
              setActiveIsland(null);
            }}
            className="bg-white/80 dark:bg-slate-950/80 hover:bg-white dark:hover:bg-slate-950 px-3 py-1.5 rounded-2xl border border-white/20 text-xs font-bold text-slate-700 dark:text-slate-200 shadow-md transition-all duration-300 flex items-center gap-1 cursor-pointer pointer-events-auto"
          >
            <span>✨</span>
            <span>{isRtl ? 'إعادة تعيين' : 'Show All'}</span>
          </button>
        </div>

        {/* Interactive Island Hover Details Dashboard Overlay (Kid Friendly) */}
        <div className="relative z-20 self-center w-full max-w-sm md:max-w-md mt-auto pointer-events-none">
          <AnimatePresence mode="wait">
            {(hoveredIsland || activeIsland) ? (
              <motion.div
                key={(hoveredIsland || activeIsland)?.id}
                initial={{ opacity: 0, y: 15, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 15, scale: 0.95 }}
                className="bg-slate-900/90 dark:bg-slate-950/95 text-white p-3 md:p-4 rounded-2xl border border-slate-700 shadow-xl pointer-events-auto flex flex-col gap-2 w-full backdrop-blur-sm"
              >
                {/* Card Title */}
                <div className="flex justify-between items-center border-b border-white/10 pb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xl md:text-2xl">{(hoveredIsland || activeIsland)?.icon}</span>
                    <h3 className="font-extrabold text-xs md:text-sm tracking-tight text-yellow-300">
                      {isRtl ? (hoveredIsland || activeIsland)?.nameAr : (hoveredIsland || activeIsland)?.name}
                    </h3>
                  </div>
                  <span className="text-[8.5px] uppercase font-mono bg-sky-500/30 px-2 py-0.5 rounded-full text-sky-300 font-extrabold">
                    {isRtl ? 'جاهز للطيران' : 'FLY-ZONE LIVE'}
                  </span>
                </div>

                <p className="text-[10px] md:text-[11px] text-slate-300 leading-relaxed font-medium">
                  <strong>🚀 {isRtl ? 'الباقة المميزة:' : 'Featured Tour:'}</strong>{' '}
                  {isRtl ? (hoveredIsland || activeIsland)?.popularItemAr : (hoveredIsland || activeIsland)?.popularItem}
                </p>

                {/* Things to do given there are short and side by side */}
                <div className="flex flex-col gap-1 my-1">
                  <span className="text-[9px] uppercase font-bold text-sky-400 tracking-wider">
                    {isRtl ? 'أبرز الأنشطة والترفيه:' : 'Things to do:'}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {(isRtl ? (hoveredIsland || activeIsland)?.activitiesAr : (hoveredIsland || activeIsland)?.activities)?.map((act, index) => (
                      <span
                        key={index}
                        className="bg-slate-800/90 border border-slate-700/80 text-slate-200 text-[9px] md:text-[10px] font-semibold px-2 py-0.5 rounded-lg flex items-center gap-1 shadow-sm"
                      >
                        {act}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Match available programs */}
                <div className="flex flex-col gap-1 border-t border-white/5 pt-1.5">
                  <div className="text-[9px] uppercase font-mono tracking-wider text-slate-400">
                    {isRtl ? 'احجز الباقة العائلية:' : 'Book Family Package:'}
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {getMatchedPackages((hoveredIsland || activeIsland)?.id || '').slice(0, 3).map((pack) => (
                      <button
                        key={pack.id}
                        onClick={() => onOpenBooking(pack)}
                        className="bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-500 hover:to-indigo-600 px-2 py-0.5 rounded-lg text-[9px] font-bold text-white shadow-sm transition-all duration-300 flex items-center gap-1 cursor-pointer"
                      >
                        <MapPin className="w-2.5 h-2.5" />
                        <span className="truncate max-w-[124px]">{isRtl ? pack.nameAr : pack.name}</span>
                        <span className="bg-white/20 px-1 py-0.2 rounded text-[7.5px] font-bold">
                          {isRtl ? 'حجز' : 'Book'}
                        </span>
                      </button>
                    ))}
                    {getMatchedPackages((hoveredIsland || activeIsland)?.id || '').length === 0 && (
                      <div className="text-[9px] text-yellow-200/90 italic flex items-center gap-1">
                        <span>🌏</span>
                        <span>
                          {isRtl 
                            ? 'رحلات مخصصة متوفرة عند الطلب!' 
                            : 'Custom packages available on request!'}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-white/70 dark:bg-slate-900/70 text-slate-700 dark:text-slate-300 py-2 px-3.5 rounded-full text-center text-[10px] font-bold border border-white/20 tracking-wider shadow backdrop-blur-sm mx-auto w-fit"
              >
                🌟 {isRtl ? 'مرر الماوس فوق القارات لرؤية باقات السفر السريعة' : 'Hover over islands or tap pins to check active flight deals!'}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
