/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, MapPin, Award, Plane, Smile, ShieldCheck, Mail, Phone, Clock, Key } from 'lucide-react';

interface AboutUsProps {
  lang: 'en' | 'ar';
}

export default function AboutUs({ lang }: AboutUsProps) {
  const isRtl = lang === 'ar';

  return (
    <div className="w-full max-w-[1536px] xl:max-w-[1720px] mx-auto px-4 md:px-6 py-8" id="about-us-module">
      
      {/* Title Header */}
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-50 dark:bg-amber-950/40 border border-amber-100 dark:border-amber-900/60 mb-2">
          <BookOpen className="w-4 h-4 text-amber-500" />
          <span className="text-xs font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
            {isRtl ? 'قصة عائلتنا وسفرنا السعيد' : 'Our Story & Brand Vision'}
          </span>
        </div>
        <h2 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-white tracking-tight leading-tight">
          {isRtl ? 'تعرف على شركة فلاي-وايد للسياحة ✈️' : 'Welcome to Fly - Wide Tourism Company! ✈️'}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 max-w-xl mx-auto font-semibold">
          {isRtl
            ? 'رحلات من القلب إلى قلوب العائلات الكريمة في كل بلاد كوكبنا الحبيب.'
            : 'Connecting friendly families with magical, worry-free holidays in 120 countries!'}
        </p>
      </div>

      {/* Main Grid Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
        
        {/* Playful & Simple Brand Description Cards */}
        <div className="lg:col-span-7 space-y-6 text-left">
          <div className="bg-white/80 dark:bg-slate-900/80 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-4">
            <h3 className="text-lg font-black text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5 matches-rtl">
              <span>🌟</span>
              <span>{isRtl ? 'من نحن ببساطة شديدة؟' : 'Who We Are (Simply Stated):'}</span>
            </h3>
            
            <div className="text-slate-600 dark:text-slate-300 space-y-4 text-xs md:text-sm font-semibold leading-relaxed">
              <p>
                {isRtl
                  ? 'فلاي-وايد توريسم هي مثل مغلف بريدي سحري يطير بالأجنحة! نحن نساعد الأمهات، الآباء، الإخوان الصغار، والأخوات على الطيران وزيارة البلدان الخلابة والجميلة بكل سلام وأمان.'
                  : 'Fly - Wide Tourism Company is like a giant, magical passport with golden flying wings! We help mothers, fathers, little brothers, and sisters travel to beautiful countries completely safely, with zero stress or complexities.'}
              </p>
              <p>
                {isRtl
                  ? 'نحن نؤمن بأن السفر يجب أن يكون سهلاً مثل ركوب أرجوحة الألعاب في الحديقة المجاورة لبيتك، وبأنه لا مكان للخوف أو التعقيد معنا! نحن نهتم بتجهيز تذاكر الطيران، الفنادق المبهجة المطلة على الشواطئ والمزارع، والوجبات اللذيذة المناسبة للأطفال، وحراسة رحلتكم بحماية وأمان دائم.'
                  : 'We believe traveling the world should be as simple and exciting as sliding down a colorful playground slide! There are no scary booking forms or complicated terms here. We pre-arrange everything: super safe airlines, cute beachside hotels, family meals, child-safe coaches, and secure payment gates. You just packs bags and smile!'}
              </p>
            </div>

            {/* Micro Pillars metrics */}
            <div className="grid grid-cols-3 gap-3 pt-4 border-t border-slate-50 dark:border-slate-800/40 text-center">
              <div className="p-2.5 rounded-2xl bg-sky-50 dark:bg-sky-950/20 text-sky-600 dark:text-sky-400">
                <span className="block text-xl font-black">120</span>
                <span className="text-[9.5px] uppercase font-bold tracking-tight block">{isRtl ? 'دولة نشطة' : 'Gateways'}</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 text-amber-500 dark:text-amber-400">
                <span className="block text-xl font-black">100%</span>
                <span className="text-[9.5px] uppercase font-bold tracking-tight block">{isRtl ? 'أمان تام' : 'Safe Locks'}</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-pink-50 dark:bg-pink-950/20 text-pink-500 dark:text-pink-400">
                <span className="block text-xl font-black">25k+</span>
                <span className="text-[9.5px] uppercase font-bold tracking-tight block">{isRtl ? 'عائلة سعيدة' : 'Kids Smiles'}</span>
              </div>
            </div>
          </div>

          {/* CEO Note (John Flyers) */}
          <div className="bg-gradient-to-r from-sky-50 to-indigo-50 dark:from-slate-900/60 dark:to-slate-900/40 p-6 md:p-8 rounded-3xl border border-slate-100 dark:border-slate-800/80 shadow-sm space-y-4 flex flex-col md:flex-row gap-6 items-center">
            {/* CEO Cartoon portrait placeholder card */}
            <div className="relative flex-shrink-0 text-center">
              <div className="w-20 h-20 rounded-full bg-white dark:bg-slate-800 border-3 border-indigo-400 flex items-center justify-center text-4xl shadow-md">
                👨‍✈️
              </div>
              <span className="block text-[11px] font-black text-indigo-500 mt-2">Mr. John Flyers</span>
              <span className="block text-[9px] text-slate-400 uppercase font-bold">{isRtl ? 'المؤسس للشركة' : 'CEO & Caption'}</span>
            </div>

            <div className="flex-1 space-y-2 text-left">
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-white flex items-center gap-1">
                <span>📝</span>
                <span>{isRtl ? 'رسالة دافئة من الرئيس التنفيذي:' : 'A Warm Note from Captain John Flyers:'}</span>
              </h4>
              <p className="text-slate-600 dark:text-slate-300 text-xs font-semibold leading-relaxed italic">
                {isRtl
                  ? '"مرحباً بأبطالنا المستكشفين الصغار وعائلاتهم الرائعة! عندما قمت بتأسيس شركة فلاي-وايد، كان قلبي مليئاً بحلم واحد بسيط: أن أجعل الطيران وزيارة جبال الألب وتذوق الكاكاو السويسري وحساب الكوالا في أستراليا تجربة سعيدة ومحميّة ومتاحة لكل أسرة وطفل بدون أي خوف. نحن نعدكم بالأمان والصدق، وبأن نكون مرشدكم اللطيف وصديقكم الوفي في كل بلد تقصدونه. أتمنى لكم رحلات سعيدة مليئة بالضحك والألعاب!"'
                  : '"Hello, my fellow brave explorers and wonderful parents! When I founded Fly - Wide Tourism, I held a single childlike dream: to make boarding an airplane, eating Swiss chocolate in the snowy Alps, or petting fluffy koalas in Sydney a safe, incredibly funny, and happy adventure that any family can afford without fear. We promise to guard your travel funds and match your trust with total honesty, serving as your friendly helpers in every city. Fly far, and laugh wide!"'
                }
              </p>
              <div className="pt-2 text-right">
                <span className="font-serif font-bold text-xs text-indigo-500">John Flyers</span>
              </div>
            </div>
          </div>
        </div>

        {/* Brick and mortar physical shop address section */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800/80 p-6 md:p-8 rounded-3xl shadow-sm text-left space-y-5 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 rounded-full blur-xl pointer-events-none" />
            
            <h3 className="text-sm font-black text-amber-500 uppercase tracking-widest flex items-center gap-1.5 matches-rtl">
              <span>🏬📍</span>
              <span>{isRtl ? 'عنوان مكتبنا وصالتنا الرئيسي' : 'Visit Our Physical Shop'}</span>
            </h3>

            <div className="space-y-4">
              <p className="text-slate-600 dark:text-slate-300 text-xs font-semibold leading-relaxed">
                {isRtl
                  ? 'يرحب بكم كابتن جون فلايرز وفريقنا بالكامل لزيارة صالتنا الشاطئية الفاخرة المريحة للأطفال في دولة الإمارات العربية المتحدة لشرب بعض العصير البارد معنا، ورسم خطة رحلتكم السعيدة القادمة وجهاً لوجه:'
                  : 'Captain John Flyers and our friendly trip advisors invite you to drop by our lovely child-friendly beachside shop in the UAE! Come sit with us, drink some cool fresh juices, and plan your next happy family flight together:'}
              </p>

              {/* Precise Shop Address Box */}
              <div className="bg-amber-500/5 border border-amber-500/20 rounded-2.5xl p-5 space-y-2.5 shadow-inner">
                <span className="text-[9px] bg-amber-400 text-slate-900 font-extrabold px-2.5 py-0.5 rounded-full uppercase tracking-wider block w-max">
                  🏢 {isRtl ? 'الموقع الرسمي الموثق للاستلام' : 'OFFICIAL OFFICE ADRESS'}
                </span>

                <div className="space-y-1.5 text-slate-800 dark:text-slate-100">
                  {/* English Address Card */}
                  <div className={`p-2 bg-white dark:bg-slate-950/80 border border-slate-100 dark:border-slate-800/80 rounded-xl`}>
                    <p className="text-xs font-black tracking-tight text-slate-500 dark:text-slate-400 uppercase">{isRtl ? 'العنوان بالإنجليزية' : 'Postal Address'}</p>
                    <p className="text-sm font-extrabold text-indigo-500 mt-0.5 leading-tight">
                      U.A.E, Ajman, Ajman Cornish, Bay - Side, Shop - 14
                    </p>
                  </div>

                  {/* Arabic Address Card */}
                  <div className={`p-2 bg-white dark:bg-slate-950/80 border border-slate-100 dark:border-slate-800/80 rounded-xl text-right`}>
                    <p className="text-xs font-black tracking-tight text-slate-500 dark:text-slate-400 uppercase">{isRtl ? 'العنوان بالعربية الرسمية' : 'Arabic Address Translation'}</p>
                    <p className="text-sm font-extrabold text-indigo-500 mt-0.5 leading-tight dir-rtl">
                      الشارع العام، عجمان، كورنيش عجمان، باي - سايد (منطقة جانب الخليج)، محل رقم - ١٤
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Office operating hours */}
            <div className="pt-3 border-t border-slate-50 dark:border-slate-800/40 space-y-2 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>{isRtl ? 'مفتوح يومياً: من ٩ صباحاً حتى ١٠ مساءً' : 'Open Daily: 9:00 AM to 10:00 PM'}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-slate-400 flex-shrink-0" />
                <span>{isRtl ? 'دعم مستمر: 800-FLY-WIDE (مجاناً)' : 'Direct Helpline: 800-FLY-WIDE (Toll-Free)'}</span>
              </div>
            </div>
          </div>

          {/* Child-friendly trust badge guarantees */}
          <div className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white p-5 rounded-3xl shadow-sm space-y-2 text-left relative overflow-hidden">
            <div className="absolute top-0 right-0 translate-x-3 -translate-y-3 opacity-15">
              <ShieldCheck className="w-24 h-24" />
            </div>
            
            <h4 className="font-extrabold text-xs tracking-wider uppercase text-emerald-100 flex items-center gap-1 text-yellow-300">
              <ShieldCheck className="w-4 h-4" />
              <span>{isRtl ? 'باقة الأمان الفلايو الذهبية ١٠٠٪' : 'The Fly-Wide Golden Security Shield'}</span>
            </h4>
            <p className="text-[11.5px] leading-relaxed font-bold">
              {isRtl
                ? 'رحلتكم محمية بموجب ترخيص ضمان الطيران والسياحة وحجر عائلات الإمارات. كود الدفع مشفر بنسبة ٢٥٦ بت لحمايتكم بالكامل في من صالاتنا أو موقعنا.'
                : 'All reservations are backed by our official UAE tourist agency license. Safe payments are verified through SSL layers, guaranteeing complete security for you and your family!'}
            </p>
          </div>
        </div>

      </div>

    </div>
  );
}
