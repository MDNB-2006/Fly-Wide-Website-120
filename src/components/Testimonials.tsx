/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, MessageCircle, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

interface Review {
  id: number;
  name: string;
  nameAr: string;
  role: string;
  roleAr: string;
  rating: number;
  comment: string;
  commentAr: string;
  avatarBg: string;
  avatarFace: string; // Emoji representing facial character
  tag: string;
  tagAr: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: 'The Robertson Family',
    nameAr: 'عائلة ألبرتسون السعيدة',
    role: 'Family of 4, Travel Pack',
    roleAr: 'عائلة من ٤ أفراد، باقة السفر المتكاملة',
    rating: 5,
    comment: 'The Kenya Safari was life-changing for our kids! They got to feed giraffes and stay in a luxury tent. Everything worked smoothly from booking to passport clearances!',
    commentAr: 'سفاري كينيا غيرت حياة أطفالي! تمكنوا من إطعام الزرافات والإقامة في خيمة فاخرة مجهزة تماماً. كل شيء كان سهلاً جداً من التذاكر وصولاً لحمل الأمتعة!',
    avatarBg: 'bg-amber-100 border-amber-300',
    avatarFace: '🦁🦒👨‍👩-👧‍👦',
    tag: 'Kenya Safari',
    tagAr: 'سفاري كينيا'
  },
  {
    id: 2,
    name: 'Yousef Al-Harbi',
    nameAr: 'يوسف الحربي',
    role: 'Adventure Explorer',
    roleAr: 'مستكشف مغامر',
    rating: 5,
    comment: 'FLY-WIDE made my Swiss Alps trip totally stress-free. The mult-currency system let me pay in SAR instantly, and the real-time push flight alerts kept me updated inside trains!',
    commentAr: 'جعلت فلاي-وايد رحلتي لجبال الألب السويسرية رائعة ومريحة للغاية. الدفع بالريال السعودي كان سريعاً، وتنبيهات الطيران الحية كانت تنبهني لحظة بلحظة بالقطارات!',
    avatarBg: 'bg-sky-10 border-sky-300',
    avatarFace: '🏔️🕶️✈️',
    tag: 'Swiss Alps',
    tagAr: 'جبال الألب'
  },
  {
    id: 3,
    name: 'Emily & Kenji',
    nameAr: 'إيميلي وكينجي البطلان',
    role: 'Honeymoon Couple',
    roleAr: 'زوجان مبهجان',
    rating: 5,
    comment: 'Swimming with bioluminescent sea turtles in the Maldives was pure magic! Setting up the interface was so intuitive. We booked it directly off the interactive flight map!',
    commentAr: 'السباحة مع السلاحف المضيئة بالمالديف كان سحراً حقيقياً! حجزنا الرحلة بضغطة زر واحدة مباشرة من خريطة الطيران التفاعلية الرائعة!',
    avatarBg: 'bg-pink-10 border-pink-300',
    avatarFace: '🐢🌴💑',
    tag: 'Maldives Coral',
    tagAr: 'شواطئ المالديف'
  }
];

export default function Testimonials({ lang }: { lang: 'en' | 'ar' }) {
  const [activeIdx, setActiveIdx] = useState(0);
  const isRtl = lang === 'ar';

  const handleNext = () => {
    setActiveIdx((prev) => (prev + 1) % reviews.length);
  };

  const handlePrev = () => {
    setActiveIdx((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const activeReview = reviews[activeIdx];

  return (
    <div className="w-full max-w-[1536px] xl:max-w-[1720px] mx-auto px-4 md:px-6 py-12" id="customer-testimonials">
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 dark:bg-pink-950/40 border border-pink-100 dark:border-pink-900/60 mb-2">
          <MessageCircle className="w-4 h-4 text-pink-500" />
          <span className="text-xs font-bold text-pink-600 dark:text-pink-400 uppercase tracking-widest">
            {isRtl ? 'شهادات المغامرين' : 'Family Reviews'}
          </span>
        </div>
        <h2 className="text-2xl md:text-3xl font-extrabold text-slate-800 dark:text-white tracking-tight">
          {isRtl ? 'قصص مسافري فلاي-وايد السعداء 🥰' : 'Wholesome Stories from Fly-Wide Explorers 🥰'}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-1.5 max-w-xl mx-auto">
          {isRtl 
            ? 'رحلات عائلية، خدمات مريحة للأطفال، وضمان سلامة الدفع في كل قارة!' 
            : 'Find out why families and smart travelers love flying with our playful and professional packages.'}
        </p>
      </div>

      {/* Main Review Card (Apple Glassmorphic Style) */}
      <div className="relative bg-white/80 dark:bg-slate-900/80 backdrop-blur-md rounded-3xl p-6 md:p-10 border border-slate-100 dark:border-slate-800 shadow-xl overflow-hidden max-w-3xl mx-auto">
        {/* Floating background graphic */}
        <div className="absolute right-4 top-4 text-8xl text-slate-100/30 dark:text-slate-800/20 font-serif select-none pointer-events-none">
          <Quote className="w-16 h-16 animate-bounce-slow" />
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeReview.id}
            initial={{ opacity: 0, x: isRtl ? -30 : 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: isRtl ? 30 : -30 }}
            transition={{ duration: 0.4 }}
            className={`flex flex-col md:flex-row gap-6 items-center ${isRtl ? 'md:flex-row-reverse text-right' : 'text-left'}`}
          >
            {/* Custom Emoji Character Face */}
            <div className="relative flex-shrink-0">
              <div className={`w-24 h-24 rounded-full ${activeReview.avatarBg} border-3 flex flex-col items-center justify-center text-4xl shadow-md transform hover:rotate-12 transition-transform duration-300 cursor-pointer relative`}>
                <span>{activeReview.avatarFace.split('👨‍👩-2')[0]}</span>
                {/* Miniature badge */}
                <div className="absolute -bottom-1 -right-1 bg-gradient-to-r from-yellow-400 to-amber-400 text-[10px] px-2 py-0.5 rounded-full font-black text-slate-900 shadow">
                  Verified
                </div>
              </div>
            </div>

            {/* Testimonial Core */}
            <div className="flex-1 space-y-3.5">
              {/* Star group */}
              <div className={`flex items-center gap-1 ${isRtl ? 'justify-end' : 'justify-start'}`}>
                {[...Array(activeReview.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-slate-700 dark:text-slate-200 text-sm md:text-base font-medium leading-relaxed italic">
                "{isRtl ? activeReview.commentAr : activeReview.comment}"
              </p>

              {/* Author Info */}
              <div>
                <h4 className="font-extrabold text-slate-900 dark:text-white text-base">
                  {isRtl ? activeReview.nameAr : activeReview.name}
                </h4>
                <div className={`flex flex-wrap items-center gap-2 mt-0.5 text-xs text-slate-400 ${isRtl ? 'justify-end' : 'justify-start'}`}>
                  <span>{isRtl ? activeReview.roleAr : activeReview.role}</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-300" />
                  <span className="bg-sky-50 dark:bg-sky-950 text-sky-600 dark:text-sky-300 font-bold px-2 py-0.5 rounded-md text-[10px]">
                    📍 {isRtl ? activeReview.tagAr : activeReview.tag}
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Carousel Buttons */}
        <div className={`flex justify-end items-center gap-2.5 mt-8 border-t border-slate-100 dark:border-slate-800 pt-6 ${
          isRtl ? 'flex-row-reverse' : ''
        }`}>
          <div className="flex gap-1">
            {reviews.map((_, idx) => (
              <span
                key={idx}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  idx === activeIdx ? 'w-6 bg-gradient-to-r from-sky-400 to-indigo-500' : 'bg-slate-200 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>

          <div className={`flex gap-1.5 ${isRtl ? 'mr-auto' : 'ml-auto'}`}>
            <button
              onClick={handlePrev}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-600 dark:text-slate-300 cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-2 rounded-full border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 transition text-slate-600 dark:text-slate-300 cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
