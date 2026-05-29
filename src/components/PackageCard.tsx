/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { Star, Clock, Calendar, Compass, ArrowUpRight, ShieldCheck } from 'lucide-react';
import { Destination, CurrencyCode } from '../types';
import { currencies } from '../data/translations';

interface PackageCardProps {
  destination: Destination;
  currencyCode: CurrencyCode;
  onBook: (dest: Destination) => void;
  lang: 'en' | 'ar';
  key?: string;
}

// Sub-component to render interactive vector sceneries
function SceneryArtwork({ type }: { type: string }) {
  switch (type) {
    case 'mountain':
      return (
        <svg viewBox="0 0 200 100" className="w-full h-full text-white/40 opacity-75">
          {/* Mountains */}
          <polygon points="20,105 70,30 120,105" fill="currentColor" opacity="0.6" />
          <polygon points="100,105 150,15 200,105" fill="currentColor" opacity="0.8" />
          {/* Snowy caps */}
          <polygon points="60,46 70,30 80,46" fill="#fff" />
          <polygon points="140,33 150,15 160,33" fill="#fff" />
          {/* Mini pines */}
          <polygon points="30,100 35,90 40,100" fill="#065f46" />
          <polygon points="36,101 41,85 46,101" fill="#065f46" />
          {/* Floating tiny clouds */}
          <circle cx="170" cy="30" r="8" fill="#fff" opacity="0.4" />
          <circle cx="180" cy="30" r="10" fill="#fff" opacity="0.4" />
        </svg>
      );
    case 'beach':
      return (
        <svg viewBox="0 0 200 100" className="w-full h-full text-white/40 opacity-75">
          {/* Sea waves */}
          <path d="M0,80 Q30,70 60,82 Q90,94 120,82 Q150,70 180,82 T200,80 L200,102 L0,102 Z" fill="#0891b2" />
          <path d="M0,90 Q40,84 80,94 T160,88 T200,90 L200,102 L0,102 Z" fill="#0284c7" />
          {/* Smiling Sun */}
          <circle cx="160" cy="25" r="14" fill="#fbbf24" />
          <circle cx="155" cy="22" r="1.5" fill="#1e293b" />
          <circle cx="165" cy="22" r="1.5" fill="#1e293b" />
          <path d="M155,29 Q160,33 165,29" stroke="#1e293b" strokeWidth="1.5" fill="none" />
          {/* Palm Tree */}
          <rect x="25" y="55" width="4" height="35" rx="2" fill="#78350f" />
          <path d="M27,55 Q5,50 10,40" stroke="#15803d" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M27,55 Q45,50 40,40" stroke="#15803d" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M27,55 Q10,65 15,70" stroke="#15803d" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Little sea turtle */}
          <ellipse cx="100" cy="88" rx="5" ry="3" fill="#166534" />
          <circle cx="106" cy="88" r="1.5" fill="#14532d" />
        </svg>
      );
    case 'desert':
      return (
        <svg viewBox="0 0 200 100" className="w-full h-full text-white/40 opacity-75">
          {/* Dunes */}
          <path d="M0,90 Q60,60 120,85 T200,80 L200,102 L0,102 Z" fill="#d97706" />
          <path d="M100,92 Q140,78 180,92 T200,91 L200,102 L100,102 Z" fill="#b45309" />
          {/* Pyramid outlines */}
          <polygon points="20,100 50,50 80,100" fill="#f59e0b" opacity="0.9" />
          <polygon points="12,100 35,65 58,100" fill="#d97706" opacity="0.6" />
          {/* Camel */}
          <circle cx="140" cy="80" r="3" fill="#78350f" /> {/* Hump */}
          <ellipse cx="144" cy="83" rx="6" ry="3.5" fill="#78350f" />
          <rect x="141" y="86" width="1.5" height="6" fill="#78350f" />
          <rect x="146" y="86" width="1.5" height="6" fill="#78350f" />
          <path d="M148,81 Q152,75 151,70" stroke="#78350f" strokeWidth="2" strokeLinecap="round" fill="none" />
        </svg>
      );
    case 'jungle':
      return (
        <svg viewBox="0 0 200 100" className="w-full h-full text-white/40 opacity-75">
          {/* Trees layers */}
          <circle cx="40" cy="65" r="22" fill="#0f766e" />
          <circle cx="75" cy="55" r="28" fill="#115e59" />
          <circle cx="120" cy="65" r="24" fill="#0f766e" />
          {/* Tree trunks */}
          <rect x="38" y="75" width="4" height="25" fill="#78350f" />
          <rect x="73" y="65" width="5" height="35" fill="#78350f" />
          <rect x="118" y="75" width="4" height="25" fill="#78350f" />
          {/* Little flying bird */}
          <path d="M150,30 Q155,24 160,30 Q165,24 170,30" stroke="#14532d" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M175,25 Q178,21 181,25 Q184,21 187,25" stroke="#14532d" strokeWidth="1.5" strokeLinecap="round" fill="none" />
        </svg>
      );
    default: // city
      return (
        <svg viewBox="0 0 200 100" className="w-full h-full text-white/40 opacity-70">
          {/* Highrise block silhouettes */}
          <rect x="15" y="45" width="22" height="55" fill="#312e81" opacity="0.8" />
          <rect x="42" y="25" width="26" height="75" fill="#1e1b4b" opacity="0.9" />
          <rect x="74" y="55" width="20" height="45" fill="#312e81" opacity="0.8" />
          <rect x="100" y="35" width="25" height="65" fill="#1e1b4b" opacity="0.9" />
          <rect x="130" y="50" width="18" height="50" fill="#312e81" opacity="0.7" />
          {/* Little yellow windows */}
          <rect x="48" y="35" width="3" height="3" fill="#facc15" />
          <rect x="56" y="35" width="3" height="3" fill="#facc15" />
          <rect x="48" y="45" width="3" height="3" fill="#facc15" />
          <rect x="106" y="45" width="3" height="3" fill="#facc15" />
          <rect x="114" y="45" width="3" height="3" fill="#facc15" />
          {/* Flying Hot Air Balloon */}
          <circle cx="165" cy="30" r="10" fill="#db2777" />
          <polygon points="161,42 169,42 165,48" fill="#d97706" />
          <line x1="162" y1="38" x2="162" y2="42" stroke="#fff" strokeWidth="0.5" />
          <line x1="168" y1="38" x2="168" y2="42" stroke="#fff" strokeWidth="0.5" />
        </svg>
      );
  }
}

export default function PackageCard({ destination, currencyCode, onBook, lang }: PackageCardProps) {
  const isRtl = lang === 'ar';
  
  // Calculate converted pricing
  const config = currencies[currencyCode] || currencies.USD;
  const convertedPrice = Math.round(destination.priceUSD * config.rate);

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`bg-white dark:bg-slate-900 rounded-3xl overflow-hidden border border-slate-100 dark:border-slate-800 shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col justify-between`}
      id={`package-card-${destination.id}`}
    >
      {/* Visual Thematic Card Header with SVGs */}
      <div className={`relative h-44 bg-gradient-to-br ${destination.themeGradient} p-5 overflow-hidden flex flex-col justify-between`}>
        {/* Vector Landscape overlay */}
        <div className="absolute inset-0 z-0">
          <SceneryArtwork type={destination.sceneryType} />
        </div>

        {/* Hot-air balloon floating effect */}
        <div className="absolute -right-3 -top-3 w-16 h-16 opacity-30 select-none">🎈</div>

        {/* Header Tags */}
        <div className={`relative z-10 flex justify-between items-start ${isRtl ? 'flex-row-reverse' : ''}`}>
          <span className="bg-white/95 dark:bg-slate-950/90 text-[10px] font-black text-slate-800 dark:text-slate-200 px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
            <span>✨</span>
            <span>{isRtl ? destination.countryAr : destination.country}</span>
          </span>

          <span className="bg-yellow-400 text-slate-900 font-extrabold text-[10px] px-2 py-0.5 rounded-full shadow-sm flex items-center gap-0.5">
            <Star className="w-3 h-3 fill-slate-900 stroke-none" />
            <span>{destination.rating}</span>
          </span>
        </div>

        {/* Landscape Label and badges on bottom of image */}
        <div className={`relative z-10 flex justify-between items-end ${isRtl ? 'flex-row-reverse' : ''}`}>
          <div className={`text-white filter drop-shadow-md ${isRtl ? 'text-right' : 'text-left'}`}>
            <span className="text-[10px] uppercase font-mono font-bold tracking-widest text-sky-100/90">
              {isRtl ? destination.continent : destination.continent}
            </span>
            <h3 className="text-base md:text-lg font-black leading-tight mt-0.5">
              {isRtl ? destination.nameAr : destination.name}
            </h3>
          </div>
          
          <div className="bg-white dark:bg-slate-950 p-1.5 rounded-xl text-center shadow">
            <span className="text-[9px] uppercase font-mono font-bold text-slate-400 block tracking-tighter leading-none">DAYS</span>
            <span className="text-xs font-black text-slate-900 dark:text-white">{destination.durationDays}</span>
          </div>
        </div>
      </div>

      {/* Card Content & Pricing details */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div className={`space-y-3 ${isRtl ? 'text-right' : 'text-left'}`}>
          <p className="text-slate-500 dark:text-slate-400 text-xs font-medium leading-relaxed">
            {isRtl ? destination.descriptionAr : destination.description}
          </p>

          {/* Core program bullets with custom check symbols */}
          <div className="space-y-1.5">
            {(isRtl ? destination.highlightsAr : destination.highlights).slice(0, 3).map((high, idx) => (
              <div key={idx} className={`flex items-center gap-2 text-[11px] font-bold text-slate-600 dark:text-slate-300 ${
                isRtl ? 'flex-row-reverse' : ''
              }`}>
                <span className="text-xs text-sky-500">✓</span>
                <span className="truncate">{high}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Booking call to action */}
        <div className={`border-t border-slate-100 dark:border-slate-800/80 pt-4 mt-5 flex justify-between items-center ${
          isRtl ? 'flex-row-reverse' : ''
        }`}>
          <div className={`${isRtl ? 'text-right' : 'text-left'}`}>
            <span className="text-[9px] font-bold text-slate-400 block uppercase tracking-wider">
              {isRtl ? 'سعر الحزمة كلياً' : 'Package Total Price'}
            </span>
            <div className="flex items-baseline gap-1">
              <span className="text-xs font-bold text-sky-500">{config.symbol}</span>
              <span className="text-xl md:text-2.5xl font-black text-slate-950 dark:text-white leading-none">
                {convertedPrice}
              </span>
              <span className="text-[10px] text-slate-400 font-bold uppercase">{config.code}</span>
            </div>
          </div>

          <button
            id={`btn-book-${destination.id}`}
            onClick={() => onBook(destination)}
            className="px-4 py-2.5 rounded-2xl bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-500 hover:to-indigo-600 text-white text-xs font-extrabold shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-0.5 flex items-center gap-1 cursor-pointer"
          >
            <span>{isRtl ? 'احجز الآن' : 'Book Package'}</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
