/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Language } from '../types';
import { Globe } from 'lucide-react';

interface LanguageToggleProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
}

export default function LanguageToggle({ currentLang, onLanguageChange }: LanguageToggleProps) {
  return (
    <div className="inline-flex bg-slate-100 dark:bg-slate-800 p-1 rounded-full border border-slate-200/60 shadow-sm relative z-50">
      <button
        id="btn-lang-en"
        onClick={() => onLanguageChange('en')}
        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 flex items-center gap-1.5 ${
          currentLang === 'en'
            ? 'bg-gradient-to-r from-sky-400 to-indigo-500 text-white shadow-md scale-102 font-bold'
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/50'
        }`}
      >
        <span>🇺🇸</span>
        <span>EN</span>
      </button>
      <button
        id="btn-lang-ar"
        onClick={() => onLanguageChange('ar')}
        className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 ${
          currentLang === 'ar'
            ? 'bg-gradient-to-r from-sky-400 to-indigo-500 text-white shadow-md scale-102 font-bold'
            : 'text-slate-600 dark:text-slate-300 hover:bg-slate-200/50'
        }`}
      >
        <span>العربية</span>
        <span>🇸🇦</span>
      </button>
    </div>
  );
}
