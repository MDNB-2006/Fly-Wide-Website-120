/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { CurrencyCode } from '../types';
import { currencies } from '../data/translations';
import { Coins } from 'lucide-react';

interface CurrencySelectorProps {
  selectedCurrency: CurrencyCode;
  onCurrencyChange: (code: CurrencyCode) => void;
  lang: 'en' | 'ar';
}

export default function CurrencySelector({ selectedCurrency, onCurrencyChange, lang }: CurrencySelectorProps) {
  return (
    <div className="relative inline-block z-40">
      <div className="flex items-center gap-1 bg-slate-100 dark:bg-slate-800 border border-slate-200/60 p-1.5 rounded-full shadow-sm hover:border-slate-300 transition-all duration-300">
        <Coins className="w-4 h-4 text-sky-500 ml-1.5 mr-0.5" />
        <select
          id="select-currency"
          value={selectedCurrency}
          onChange={(e) => onCurrencyChange(e.target.value as CurrencyCode)}
          className="bg-transparent text-xs font-bold text-slate-700 dark:text-slate-200 outline-none pr-6 pl-1 py-0.5 cursor-pointer appearance-none relative"
          style={{ direction: 'ltr' }} // Keep select option dropdown aligned
        >
          {Object.entries(currencies).map(([code, config]) => (
            <option key={code} value={code} className="bg-white text-slate-800 dark:bg-slate-900 dark:text-slate-100">
              {config.symbol} {code} - {lang === 'ar' ? config.nameAr : config.name}
            </option>
          ))}
        </select>
        {/* custom chevron */}
        <span className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400 text-[10px]">▼</span>
      </div>
    </div>
  );
}
