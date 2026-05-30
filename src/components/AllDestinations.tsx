/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { all120Destinations, ExtraDestination } from '../data/allDestinationsList';
import { 
  Search, 
  Compass, 
  MapPin, 
  Heart, 
  Sparkles, 
  X, 
  ChevronRight, 
  Plus, 
  Minus, 
  Info, 
  Users, 
  PawPrint,
  Percent
} from 'lucide-react';

interface AllDestinationsProps {
  lang: 'en' | 'ar';
  onBook: (countryName: string, priceUSD: number, continent: string, guestsCount: number) => void;
  currencyCode?: string;
  currencyRate?: number;
  currencySymbol?: string;
}

// Global dictionary with high-fidelity realistic package market values (in USD) for all countries
const countryMarketBasePrices: Record<string, number> = {
  // Europe
  "Austria": 1280, "Albania": 820, "Andorra": 890, "Belgium": 1150,
  "Bosnia": 790, "Bulgaria": 720, "Croatia": 980, "Cyprus": 920,
  "Czech Republic": 1050, "Denmark": 1420, "Estonia": 895, "Finland": 1490,
  "France": 1450, "Germany": 1390, "Greece": 1150, "Hungary": 920,
  "Iceland": 1850, "Ireland": 1290, "Italy": 1380, "Latvia": 850,
  "Liechtenstein": 1950, "Lithuania": 840, "Luxembourg": 1780, "Malta": 1050,
  "Monaco": 2450, "Montenegro": 890, "Netherlands": 1320, "Norway": 1650,
  "Poland": 880, "Portugal": 1120, "Romania": 790, "Slovakia": 890,
  "Slovenia": 920, "Spain": 1220, "Switzerland": 2100, "Sweden": 1550,
  "United Kingdom": 1550, "Vatican City": 1980,
  
  // Asia
  "Bangladesh": 750, "Bhutan": 1480, "Brunei": 1350, "Cambodia": 820,
  "China": 1250, "India": 780, "Indonesia": 950, "Japan": 1850,
  "Malaysia": 980, "Maldives": 1950, "Nepal": 850, "Pakistan": 890, "Philippines": 920,
  "Singapore": 1650, "South Korea": 1580, "Sri Lanka": 890, "Thailand": 950,
  "Uzbekistan": 1050, "Vietnam": 880,
  
  // Americas
  "Argentina": 1150, "Bahamas": 1650, "Barbados": 1750, "Belize": 1180,
  "Bolivia": 890, "Brazil": 1250, "Canada": 1480, "Chile": 1220,
  "Colombia": 950, "Costa Rica": 1180, "Cuba": 1050, "Dominica": 1380,
  "Ecuador": 1055, "Grenada": 1450, "Guatemala": 920, "Honduras": 955,
  "Jamaica": 1320, "Mexico": 980, "Panama": 1150,
  "Peru": 1050, "United States": 1550, "Uruguay": 1180,
  
  // Africa
  "Algeria": 780, "Angola": 1250, "Benin": 850, "Botswana": 1650,
  "Burkina Faso": 850, "Cameroon": 980, "Ethiopia": 950, "Gabon": 1180,
  "Gambia": 920, "Ghana": 1050, "Kenya": 1450, "Madagascar": 1580,
  "Mauritius": 1785, "Morocco": 890, "Rwanda": 1480, "Senegal": 980,
  "Seychelles": 1980, "South Africa": 1490, "Tanzania": 1550, "Tunisia": 750,
  "Uganda": 1250, "Zambia": 1380, "Zimbabwe": 1420,
  
  // Oceania
  "Australia": 1790, "Fiji": 1850, "New Zealand": 1950, "Vanuatu": 1650,
  
  // Middle East
  "Bahrain": 1150, "Egypt": 850, "Jordan": 1050, "Kuwait": 1250,
  "Lebanon": 920, "Oman": 1280, "Qatar": 1450, "Saudi Arabia": 1350,
  "United Arab Emirates": 1550, "Azerbaijan": 980, "Georgia": 950,
  "Armenia": 920
};

// Continent backup fallbacks
const continentRatesFallback: Record<string, number> = {
  'Europe': 1350,
  'Asia': 1100,
  'Americas': 1250,
  'Africa': 950,
  'Oceania': 1450,
  'Middle East': 1050,
  'Antartica': 2200,
  'Antarctica': 2200,
  'All': 1200
};

const continentIcons: Record<string, string> = {
  'All': '🌎',
  'Europe': '🏰',
  'Asia': '⛩️',
  'Americas': '🗽',
  'Africa': '🦁',
  'Oceania': '🐨',
  'Middle East': '🕌',
  'Antartica': '🐧'
};

/**
 * Deterministic selection for sales so prices don't cycle
 * randomly when toggle buttons are clicked causing state refresh.
 */
const isCountryOnSale = (countryName: string): boolean => {
  let hash = 0;
  for (let i = 0; i < countryName.length; i++) {
    hash = (hash << 5) - hash + countryName.charCodeAt(i);
    hash |= 0;
  }
  // Roughly 35%-40% of countries get a 25% drop
  return Math.abs(hash) % 3 === 0;
};

const getCountryBasePrice = (countryName: string, continent: string): number => {
  return countryMarketBasePrices[countryName] || continentRatesFallback[continent] || 1200;
};

export default function AllDestinations({ 
  lang, 
  onBook,
  currencyCode = 'USD',
  currencyRate = 1,
  currencySymbol = '$'
}: AllDestinationsProps) {
  const [search, setSearch] = useState('');
  const [selectedContinent, setSelectedContinent] = useState<string>('All');
  const [expandedDest, setExpandedDest] = useState<ExtraDestination | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Guest calculations and variables
  const [adults, setAdults] = useState<number>(1);
  const [childrenCount, setChildrenCount] = useState<number>(0);
  const [hasPets, setHasPets] = useState<boolean>(false);

  const isRtl = lang === 'ar';

  const continents = ['All', 'Europe', 'Asia', 'Americas', 'Africa', 'Oceania', 'Middle East', 'Antartica'];
  const continentsAr: Record<string, string> = {
    'All': 'كل القارات',
    'Europe': 'أوروبا',
    'Asia': 'آسيا',
    'Americas': 'الأمريكيتان',
    'Africa': 'أفريقيا',
    'Oceania': 'أوقيانوسيا',
    'Middle East': 'الشرق الأوسط',
    'Antartica': 'القارة القطبية الجنوبية'
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Live currency formatting helper
  const formatLocalPrice = (usd: number) => {
    const rawVal = usd * currencyRate;
    return `${currencySymbol}${Math.round(rawVal).toLocaleString()} ${currencyCode}`;
  };

  // Helper function to calculate dynamically adjusted price (with or without sale discount applied)
  const calculatePriceForCountry = (countryName: string, continent: string, applySale: boolean) => {
    const baseOriginal = getCountryBasePrice(countryName, continent);
    const usedBase = (applySale && isCountryOnSale(countryName)) 
      ? Math.round(baseOriginal * 0.75) // 25% discount on market base price
      : baseOriginal;

    const adultsCost = adults * usedBase;
    const kidsCost = childrenCount * (usedBase * 0.6); // 40% off child tickets
    const petCost = hasPets ? 150 : 0;
    return Math.round(adultsCost + kidsCost + petCost);
  };

  // Filter 120 countries list
  const filteredList = useMemo(() => {
    return all120Destinations.filter(dest => {
      const matchSearch = 
        dest.country.toLowerCase().includes(search.toLowerCase()) ||
        dest.countryAr.includes(search) ||
        dest.name.toLowerCase().includes(search.toLowerCase()) ||
        dest.nameAr.includes(search);
      
      const matchContinent = selectedContinent === 'All' || dest.continent === selectedContinent;
      return matchSearch && matchContinent;
    });
  }, [search, selectedContinent]);

  return (
    <div className="w-full max-w-[1536px] xl:max-w-[1720px] mx-auto px-4 md:px-6 py-6" id="all-destinations-module">
      
      {/* Module Title Section */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/60 mb-2">
          <Compass className="w-4 h-4 text-sky-500 animate-spin-slow" />
          <span className="text-xs font-bold text-sky-600 dark:text-sky-400 uppercase tracking-widest">
            {isRtl ? '١٢٠ بوابة عائلية وسياحية مدهشة أسعار حقيقية' : 'Family Vacation Planner: 120 Gateways (Real Market Rates)'}
          </span>
        </div>
        <h2 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-white tracking-tight">
          {isRtl ? 'استكشف واجعل السفر مناسباً لميزانيتك ✈️' : 'Customize & Price Your Journey Live!'}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mt-2 max-w-xl mx-auto font-medium">
          {isRtl 
            ? 'حدد القارات، واحسب عدد المسافرين وأي حيوان أليف مالي للحصول على أفضل تقدير فوري للسفر العائلي مدمجاً بخصومات ٢٥٪ عشوائية.' 
            : 'Select your preferred continents, tell us your family guest metrics, and watch realistic packages automatically compute with live 25% off markdown sales.'}
        </p>
      </div>

      {/* Main Multi-Column system: Filter on Left, Results Grid on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* ========================================================
            LEFT COLUMN: THE VERTICAL RECTANGLE SIDEBAR FILTER
            ======================================================== */}
        <div className="lg:col-span-3 bg-white dark:bg-slate-900 border-2 border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-6 lg:sticky lg:top-6" id="left-filter-sidebar">
          
          <div>
            <h3 className="font-extrabold text-sm uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
              <span>🌎</span>
              <span>{isRtl ? 'تصنيف القارات:' : 'Continents filter'}</span>
            </h3>
            
            {/* Vertical list of selectable Continents */}
            <div className="flex flex-col gap-1.5">
              {continents.map((cont) => {
                const active = selectedContinent === cont;
                const icon = continentIcons[cont] || '🌎';
                
                return (
                  <button
                    key={cont}
                    onClick={() => setSelectedContinent(cont)}
                    className={`w-full px-3 py-2.5 rounded-xl text-xs font-bold transition-all duration-300 flex items-center justify-between cursor-pointer border ${
                      active
                        ? 'bg-gradient-to-r from-sky-450 to-indigo-500 bg-sky-500 text-white border-sky-400 shadow-sm font-extrabold translate-x-1'
                        : 'bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 border-slate-100/40 dark:border-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <span className="text-sm">{icon}</span>
                      <span>{isRtl ? continentsAr[cont] || cont : cont}</span>
                    </span>
                    {active && <span className="w-1.5 h-1.5 bg-white rounded-full" />}
                  </button>
                );
              })}
            </div>
          </div>

          <hr className="border-slate-50 dark:border-slate-850" />

          {/* Guest Counters and Pets Box */}
          <div className="space-y-4">
            <h3 className="font-extrabold text-xs uppercase tracking-wider text-slate-400 flex items-center gap-1.5 mb-1.5">
              <Users className="w-4 h-4 text-sky-500" />
              <span>{isRtl ? 'عدد المسافرين:' : 'Guests Metric'}</span>
            </h3>

            {/* Adults Counter Component */}
            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-100/40 dark:border-slate-850">
              <div className="text-left">
                <span className="text-[11px] font-black block text-slate-700 dark:text-slate-300">
                  {isRtl ? 'البالغين' : 'Adults'}
                </span>
                <span className="text-[9px] text-slate-400 block">
                  {isRtl ? 'عمر ١٢ سنة فما فوق' : 'Ages 12+'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={adults <= 1}
                  onClick={() => setAdults(prev => Math.max(1, prev - 1))}
                  className="w-7 h-7 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:border-sky-500 hover:text-sky-500 transition disabled:opacity-40 cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="number"
                  min={1}
                  max={500}
                  value={adults}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setAdults(isNaN(val) ? 1 : Math.min(500, Math.max(1, val)));
                  }}
                  className="w-12 text-center py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-black text-slate-900 dark:text-white outline-none focus:border-sky-500 select-all"
                />
                <button
                  type="button"
                  disabled={adults >= 500}
                  onClick={() => setAdults(prev => Math.min(500, prev + 1))}
                  className="w-7 h-7 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:border-sky-500 hover:text-sky-500 transition disabled:opacity-40 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Children Counter Component */}
            <div className="flex justify-between items-center bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-100/40 dark:border-slate-850">
              <div className="text-left">
                <span className="text-[11px] font-black block text-slate-700 dark:text-slate-300">
                  {isRtl ? 'الأطفال' : 'Children'}
                </span>
                <span className="text-[9px] text-slate-400 block text-emerald-500 font-bold">
                  {isRtl ? 'خصم ٤٠٪ لكل طفل' : 'Save 40% Each!'}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  disabled={childrenCount <= 0}
                  onClick={() => setChildrenCount(prev => Math.max(0, prev - 1))}
                  className="w-7 h-7 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:border-sky-500 hover:text-sky-500 transition disabled:opacity-40 cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <input
                  type="number"
                  min={0}
                  max={500}
                  value={childrenCount}
                  onChange={(e) => {
                    const val = parseInt(e.target.value);
                    setChildrenCount(isNaN(val) ? 0 : Math.min(500, Math.max(0, val)));
                  }}
                  className="w-12 text-center py-0.5 rounded border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-xs font-black text-slate-900 dark:text-white outline-none focus:border-sky-500 select-all"
                />
                <button
                  type="button"
                  disabled={childrenCount >= 500}
                  onClick={() => setChildrenCount(prev => Math.min(500, prev + 1))}
                  className="w-7 h-7 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 rounded-lg flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:border-sky-500 hover:text-sky-500 transition disabled:opacity-40 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Pets Checklist */}
            <div className="bg-slate-50 dark:bg-slate-950 p-3.5 rounded-2xl border border-slate-100/40 dark:border-slate-850 space-y-1.5">
              <label className="flex items-center gap-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={hasPets}
                  onChange={(e) => setHasPets(e.target.checked)}
                  className="w-4 h-4 rounded text-sky-500 bg-white dark:bg-slate-800 border-slate-350 accent-sky-500 focus:ring-0 cursor-pointer"
                />
                <span className="text-[11px] font-black text-slate-700 dark:text-slate-300 flex items-center gap-1">
                  <PawPrint className="w-3.5 h-3.5 text-indigo-500" />
                  <span>{isRtl ? 'هل ستصطحب حيوانات أليفة؟' : 'Accompanying Any Pets?'}</span>
                </span>
              </label>
              <p className="text-[9px] text-slate-400 pl-6">
                {isRtl 
                  ? 'يضيف تأمين ومرافق الحيوان الأليف للطائرة (+١٥٠ $ فلات)' 
                  : 'Adds required safety certification & comfort (+ $150 flat)'}
              </p>
            </div>
          </div>

          <hr className="border-slate-50 dark:border-slate-850" />

          {/* Live billing info reminder */}
          <div className="bg-gradient-to-r from-emerald-500/10 to-teal-500/10 p-3.5 rounded-2xl border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 space-y-1">
            <span className="text-[10px] uppercase font-mono font-bold block">💡 {isRtl ? 'ملاحظة الفروق والتسعير الحقيقي:' : 'Real Market Values:'}</span>
            <p className="text-[9.5px] leading-relaxed font-semibold">
              {isRtl 
                ? 'الأسعار محاكاة لأسعار السوق الحقيقية لقضاء العطلات (طيران + فندق). يتم خصم ٢٥٪ تلقائياً للبلدان التي تظهر عليها علامة العرض.'
                : 'Rates represent real-world holiday markets (flight + hotel). Countries selected randomly for sale get 25% off struck automatically!'}
            </p>
          </div>
        </div>

        {/* ========================================================
            RIGHT COLUMN: SEARCH AND DYNAMIC GRID
            ======================================================== */}
        <div className="lg:col-span-9 space-y-6">
          
          {/* Search box overlay at the top */}
          <div className="relative max-w-md mx-auto sm:mx-0">
            <span className="absolute left-3.5 top-3 text-slate-450"><Search className="w-4 h-4 text-slate-400" /></span>
            <input
              type="text"
              placeholder={isRtl ? 'ابحث عن بلدك المفضل... (مثل: اليابان، فرنسا)' : 'Search gateway... (e.g. Japan, France)'}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-bold outline-none focus:border-sky-400 dark:focus:border-sky-600 dark:text-white transition-all"
            />
            {search && (
              <button 
                onClick={() => setSearch('')} 
                className="absolute right-3 top-2.5 font-bold text-[9px] text-slate-400 hover:text-slate-600 bg-slate-100 dark:bg-slate-800 p-1 px-2.5 rounded-lg"
              >
                {isRtl ? 'مسح' : 'CLEAR'}
              </button>
            )}
          </div>

          {/* Grid Count label banner with Favorite indicator */}
          <div className="flex justify-between items-center text-xs px-2">
            <span className="font-extrabold text-slate-400 dark:text-slate-550 header-tag">
              {isRtl 
                ? `العثور على ${filteredList.length} وجهة حيوية`
                : `Found ${filteredList.length} holiday destinations at real market value`}
            </span>
            {favorites.length > 0 && (
              <span className="text-[10px] font-bold text-rose-500 animate-pulse bg-rose-50 dark:bg-rose-950/20 px-2.5 py-1 rounded-full border border-rose-100/30">
                ❤️ {isRtl ? `${favorites.length} المفضلة` : `${favorites.length} Saved`}
              </span>
            )}
          </div>

          {/* Main List Grid */}
          {filteredList.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl space-y-2">
              <span className="text-4xl block">🔍🐪</span>
              <h4 className="text-sm font-bold text-slate-700 dark:text-slate-300">
                {isRtl ? 'عذراً، لم نعثر على قارة أو دولة مطابقة' : 'No destinations match your search'}
              </h4>
              <p className="text-xs text-slate-400 max-w-xs mx-auto">
                {isRtl ? 'يرجى تغيير القارة في لوحة الفلاتر الجانبية أو كتابة كلمة بحث أخرى.' : 'Try specifying a different keyword or resetting filters in the sidebar.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 font-sans">
              {filteredList.map((dest) => {
                const isFav = favorites.includes(dest.id);
                const hasSale = isCountryOnSale(dest.country);
                
                // Calculate dynamic final cost and original cost for strike-out
                const calculatedOriginalUSD = calculatePriceForCountry(dest.country, dest.continent, false);
                const calculatedFinalUSD = calculatePriceForCountry(dest.country, dest.continent, true);

                return (
                  <motion.div
                    key={dest.id}
                    layoutId={`card-container-${dest.id}`}
                    onClick={() => setExpandedDest(dest)}
                    className="group bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800/60 hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between relative"
                    whileHover={{ y: -4 }}
                  >
                    <div>
                      {/* Photo Section */}
                      <div className="h-40 w-full overflow-hidden relative bg-slate-100 dark:bg-slate-950">
                        <img
                          src={dest.imageUrl}
                          alt={dest.country}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-108"
                        />
                        {/* Continent Badge */}
                        <span className="absolute top-3 left-3 bg-white/90 dark:bg-slate-900/95 font-black text-[9px] px-2.5 py-1 rounded-full text-indigo-500 uppercase tracking-wider shadow">
                          {isRtl ? continentsAr[dest.continent] || dest.continent : dest.continent}
                        </span>
                        
                        {/* Random Sale badge overlay */}
                        {hasSale && (
                          <span className="absolute top-3 right-12 bg-rose-500 text-white font-black text-[9.5px] px-2 py-1 rounded-lg uppercase tracking-wider shadow flex items-center gap-0.5 animate-pulse">
                            <Percent className="w-3 h-3" />
                            <span>{isRtl ? 'خصم ٢٥٪' : '25% OFF SALE'}</span>
                          </span>
                        )}

                        {/* Favorite Heart Button */}
                        <button
                          onClick={(e) => toggleFavorite(dest.id, e)}
                          className="absolute top-3 right-3 p-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 shadow text-slate-400 hover:text-rose-500 transition-colors cursor-pointer"
                        >
                          <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500 text-rose-500' : ''}`} />
                        </button>
                        {/* Interactive scenery icon tag */}
                        <div className="absolute bottom-3 left-3 bg-black/40 backdrop-blur-sm p-1 rounded-lg text-white font-bold text-[9px] flex items-center gap-1 px-1.5">
                          <span>{dest.sceneryType === 'beach' ? '🌴' : dest.sceneryType === 'mountain' ? '🏔️' : dest.sceneryType === 'desert' ? '🐪' : dest.sceneryType === 'jungle' ? '🐒' : '🏙️'}</span>
                          <span className="capitalize">{dest.sceneryType}</span>
                        </div>
                      </div>

                      {/* Core Card Info */}
                      <div className="p-4 space-y-2 text-left">
                        <div className="flex justify-between items-start gap-1">
                          <h3 className="font-extrabold text-sm md:text-base text-slate-900 dark:text-white group-hover:text-sky-500 transition-colors line-clamp-1">
                            {isRtl ? dest.nameAr : dest.name}
                          </h3>
                        </div>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 font-bold flex items-center gap-1">
                          <MapPin className="w-3.5 h-3.5 text-sky-500" />
                          <span>{isRtl ? dest.countryAr : dest.country}</span>
                        </p>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed font-semibold line-clamp-2">
                          {isRtl ? dest.descriptionAr : dest.description}
                        </p>
                      </div>
                    </div>

                    {/* Automatic custom price visual block on each card */}
                    <div className="px-4 pb-4">
                      <div className="bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-100/40 dark:border-slate-850 flex items-center justify-between">
                        <div>
                          <span className="text-[8.5px] uppercase font-mono text-slate-400 font-bold block">
                            {isRtl ? 'سعر الباقة المخصص:' : 'DYNAMIC HOLIDAY VALUE:'}
                          </span>
                          <span className="text-[9px] text-slate-400 block font-semibold">
                            {adults} {isRtl ? 'بالغ' : 'Adult'}{adults > 1 ? 's' : ''} {childrenCount > 0 && `+ ${childrenCount} ${isRtl ? 'طفل' : 'Child'}${childrenCount > 1 ? 'ren' : ''}`} {hasPets && `+ 🐾`}
                          </span>
                        </div>
                        <div className="text-right flex flex-col justify-center items-end">
                          {hasSale ? (
                            <>
                              <span className="text-[10px] text-slate-450 line-through font-mono">
                                {formatLocalPrice(calculatedOriginalUSD)}
                              </span>
                              <span className="text-xs md:text-sm font-black text-rose-500">
                                {formatLocalPrice(calculatedFinalUSD)}
                              </span>
                            </>
                          ) : (
                            <span className="text-xs md:text-sm font-black text-emerald-500">
                              {formatLocalPrice(calculatedFinalUSD)}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Landmark things to do indicator */}
                    <div className="p-4 pt-0 mt-auto border-t border-slate-50 dark:border-slate-800/40 flex items-center justify-between text-xs">
                      <span className="text-[9.5px] text-sky-500 dark:text-sky-400 font-black tracking-wider uppercase group-hover:underline">
                        {isRtl ? 'التفاصيل و ٥ أنشطة ممتعة 🌟' : 'Details & 5 landmarks ✨'}
                      </span>
                      <div className="bg-slate-50 dark:bg-slate-800 p-1 rounded-full text-slate-400 group-hover:bg-sky-50 group-hover:text-sky-500 transition-colors">
                        <ChevronRight className={`w-3.5 h-3.5 transform transition-transform ${isRtl ? 'rotate-180 group-hover:-translate-x-1' : 'group-hover:translate-x-1'}`} />
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>

      </div>

      {/* Expanded Details Overlay Dialog Modal */}
      <AnimatePresence>
        {expandedDest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Dark glass backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedDest(null)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              layoutId={`card-container-${expandedDest.id}`}
              className="bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-100 dark:border-slate-800 max-w-xl w-full overflow-hidden relative z-10 flex flex-col font-sans"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Close Button */}
              <button
                onClick={() => setExpandedDest(null)}
                className="absolute top-4 right-4 z-20 p-1.5 rounded-full bg-black/45 backdrop-blur-md text-white hover:bg-black/60 transition cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Photo Banner */}
              <div className="h-52 relative overflow-hidden bg-slate-100 dark:bg-slate-950">
                <img
                  src={expandedDest.imageUrl}
                  alt={expandedDest.country}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[9px] bg-sky-500 font-black px-2.5 py-0.5 rounded-full uppercase tracking-wider block w-max mb-1">
                    {expandedDest.continent}
                  </span>
                  <h3 className="text-lg md:text-xl font-black">
                    {isRtl ? expandedDest.nameAr : expandedDest.name}
                  </h3>
                  <p className="text-xs text-slate-200 font-bold">🗺️ {isRtl ? expandedDest.countryAr : expandedDest.country}</p>
                </div>
              </div>

              {/* Scrollable Content */}
              <div className="p-5 md:p-6 space-y-5 overflow-y-auto max-h-[50vh] text-left">
                
                {/* Description */}
                <div className="space-y-1 text-left">
                  <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                    {isRtl ? 'حول الوجهة السياحية' : 'About This Destination'}
                  </h4>
                  <p className="text-slate-600 dark:text-slate-300 text-xs font-semibold leading-relaxed">
                    {isRtl ? expandedDest.descriptionAr : expandedDest.description}
                  </p>
                </div>

                {/* Live Transparent Billing Receipt Section */}
                <div className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800/80 space-y-2.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[9.5px] uppercase font-mono font-bold text-sky-500 block">
                      🧾 {isRtl ? 'تفاصيل الفاتورة للسوق الحقيقي لمجموعة العائلات:' : 'ESTIMATED WORLD MARKET FARE BREAKDOWN:'}
                    </span>
                    {isCountryOnSale(expandedDest.country) && (
                      <span className="text-[9px] font-black bg-rose-500 text-white px-2 py-0.5 rounded-md uppercase tracking-wider animate-pulse">
                        🔥 {isRtl ? 'وفر ٢٥٪ حالاً!' : 'FLASHSALE 25% OFF'}
                      </span>
                    )}
                  </div>
                  
                  <div className="text-xs space-y-1.5 font-semibold text-slate-600 dark:text-slate-300">
                    {/* Calculate details with base and sale rate */}
                    {(() => {
                      const basePriceOriginal = getCountryBasePrice(expandedDest.country, expandedDest.continent);
                      const isSale = isCountryOnSale(expandedDest.country);
                      const basePriceUsed = isSale ? Math.round(basePriceOriginal * 0.75) : basePriceOriginal;
                      
                      const kidsOriginalRate = basePriceOriginal * 0.6;
                      const kidsUsedRate = basePriceUsed * 0.6;

                      // Summarized calculations
                      const adultsOriginalCost = adults * basePriceOriginal;
                      const kidsOriginalCost = childrenCount * kidsOriginalRate;
                      const originalTotal = adultsOriginalCost + kidsOriginalCost + (hasPets ? 150 : 0);

                      const adultsFinalCost = adults * basePriceUsed;
                      const kidsFinalCost = childrenCount * kidsUsedRate;
                      const finalTotal = adultsFinalCost + kidsFinalCost + (hasPets ? 150 : 0);

                      return (
                        <>
                          {/* Row: Adults count */}
                          <div className="flex justify-between">
                            <span>
                              {isRtl ? 'حساب المسافرين البالغين:' : 'Adult Passengers:'} {adults} × {formatLocalPrice(basePriceUsed)}
                            </span>
                            <span className="font-mono text-slate-900 dark:text-white">
                              {formatLocalPrice(adultsFinalCost)}
                            </span>
                          </div>

                          {/* Row: Children count */}
                          {childrenCount > 0 && (
                            <div className="flex justify-between text-emerald-500">
                              <span>
                                {isRtl ? 'الأطفال المرفقين (مشمول بخصم ٤٠٪):' : 'Kids (Save 40%):'} {childrenCount} × {formatLocalPrice(kidsUsedRate)}
                              </span>
                              <span className="font-mono">
                                {formatLocalPrice(kidsFinalCost)}
                              </span>
                            </div>
                          )}

                          {/* Row: Pets count */}
                          {hasPets && (
                            <div className="flex justify-between text-indigo-500">
                              <span className="flex items-center gap-1">🐾 {isRtl ? 'تأمين الطيران وسكن الحيوانات الأليفة مالي:' : 'Pet Flight and Stay Security:'}</span>
                              <span className="font-mono">{formatLocalPrice(150)}</span>
                            </div>
                          )}

                          {/* Total final bill */}
                          <div className="flex flex-col border-t border-dashed border-slate-250 dark:border-slate-800 pt-2.5 mt-2 space-y-1">
                            {isSale && (
                              <div className="flex justify-between text-xs text-slate-400 line-through">
                                <span>{isRtl ? 'السعر الإجمالي بأسعار السوق قبل التخفيض:' : 'Total Market Standard Price:'}</span>
                                <span className="font-mono">{formatLocalPrice(originalTotal)}</span>
                              </div>
                            )}
                            <div className="flex justify-between text-xs font-black text-slate-900 dark:text-white pt-1 text-sm">
                              <span>{isRtl ? 'السعر الإجمالي النهائي للباقة:' : 'Final Family Bundle Total:'}</span>
                              <span className="text-xl text-rose-500 font-mono tracking-tight">{formatLocalPrice(finalTotal)}</span>
                            </div>
                          </div>
                        </>
                      );
                    })()}
                  </div>
                </div>

                {/* 5 Important Things to Do */}
                <div className="space-y-2.5 text-left">
                  <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-sky-500 flex items-center gap-1">
                    <Sparkles className="w-4 h-4 text-amber-500 animate-spin-slow" />
                    <span>{isRtl ? '٥ أشياء ملهمة وممتعة لتجربتها هناك ✨:' : '5 Golden Landmark Activities There ✨:'}</span>
                  </h4>
                  
                  <ul className="space-y-2">
                    {(isRtl ? expandedDest.thingsToDoAr : expandedDest.thingsToDo).map((task, idx) => (
                      <li 
                        key={idx} 
                        className="flex items-start gap-2 bg-slate-50 dark:bg-slate-950 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800/60"
                      >
                        <span className="flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-300 font-extrabold text-[11px]">
                          {idx + 1}
                        </span>
                        <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-300 leading-snug">
                          {task}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Footer Actions */}
              <div className="p-4 border-t border-slate-50 dark:border-slate-800/80 bg-slate-50/50 dark:bg-slate-950/50 flex flex-col sm:flex-row gap-2.5 pt-3">
                <button
                  onClick={() => setExpandedDest(null)}
                  className="flex-1 py-2 rounded-full border border-slate-200 dark:border-slate-800 text-xs font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 text-center cursor-pointer"
                >
                  {isRtl ? 'إغلاق التفاصيل' : 'Close Details'}
                </button>
                <button
                  onClick={() => {
                    setExpandedDest(null);
                    
                    const totalPriceUSD = calculatePriceForCountry(expandedDest.country, expandedDest.continent, true);
                    const totalGuests = adults + childrenCount;
                    // Divide total by passenger count so it maps perfectly inside checkout formula: pricePerPerson * guests
                    const priceUSDPerPerson = totalPriceUSD / totalGuests;
                    
                    onBook(expandedDest.country, priceUSDPerPerson, expandedDest.continent, totalGuests);
                  }}
                  className="flex-1 py-1 px-4.5 rounded-full bg-gradient-to-r from-rose-500 to-indigo-600 bg-sky-500 text-white font-extrabold text-xs shadow-md shadow-sky-400/20 text-center flex items-center justify-center gap-1 cursor-pointer"
                >
                  <span>{isRtl ? 'احجز الباقة العائلية المخصصة 🧳' : 'Book Custom Bundle 🧳'}</span>
                </button>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
