/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Gift, Award, Zap, Check, CheckCircle, HelpCircle, Trophy, Sparkles, Plus, Share2, Compass, PlaneTakeoff } from 'lucide-react';

interface FlywPointsProps {
  lang: 'en' | 'ar';
  realBookingsCount: number;
}

interface Voucher {
  id: string;
  name: string;
  nameAr: string;
  type: 'merch' | 'tour' | 'lounge';
  icon: string;
  desc: string;
  descAr: string;
}

export default function FlywPoints({ lang, realBookingsCount }: FlywPointsProps) {
  // Base points on start (e.g. 750 points, representative of 3 trips) 
  // plus 250 points for every actual booking they have completed/stored!
  const [extraPoints, setExtraPoints] = useState(0);
  const [claimedRewards, setClaimedRewards] = useState<Voucher[]>([]);
  const [selectedReward, setSelectedReward] = useState<Voucher | null>(null);

  const isRtl = lang === 'ar';

  const basePoints = 750;
  const bookingsPoints = realBookingsCount * 250;
  const currentPoints = basePoints + bookingsPoints + extraPoints;

  // Rewards list
  const rewardsDb: Voucher[] = [
    {
      id: 'reward-merch',
      name: 'Capt. John Flyers Official Hoodie & Mascot Mug',
      nameAr: 'هودي الكابتن جون فلايرز الرسمي وكوب فلايو الجميل',
      type: 'merch',
      icon: '🧥☕',
      desc: 'Super cozy sky-blue cotton hoodie printed with FLY-WIDE clouds, plus a dynamic changing ceramic coffee-to-cocoa mug.',
      descAr: 'هودي قطني دافئ للغاية بلون السماء المشرقة مطبوع عليه سحب فلاي-وايد، مع كوب سيراميك يتغير لونه بالحرارة.'
    },
    {
      id: 'reward-tour',
      name: 'Private Glass-Bottom Submarine Island Tour',
      nameAr: 'جولة غواصة خاصة زجاجية القاع في جزر المالديف',
      type: 'tour',
      icon: '🤿🐠',
      desc: 'Enjoy a 3-hour private guided submarine ride for the entire family. View reefs and talk to friendly sea turtles!',
      descAr: 'استمتع بجولة خاصة بالكامل لمدة ٣ ساعات في غواصة عائلية لرؤية الأسماك الساطعة واللعب مع سلحفاة مرجانية ودودة!'
    },
    {
      id: 'reward-lounge',
      name: 'VIP Bayside Royal Lounge Access Pass',
      nameAr: 'بطاقة دخول كبار الشخصيات لصالة رويال الكورنيش',
      type: 'lounge',
      icon: '🧁🥂',
      desc: 'Free family lounge voucher valid for food buffet, fresh fruit ice creams, and massage chairs in Ajman Bayside Lounge.',
      descAr: 'بطاقة دخول الصالة الملكية مجاناً لعائلتك، تشمل بوفيه الحلويات، والآيس كريم اللذيذ، وكراسي المساج المريحة!'
    }
  ];

  const handleRecordFlight = () => {
    setExtraPoints(prev => prev + 250);
  };

  const handleRedeem = (reward: Voucher) => {
    if (currentPoints < 1000) return;
    
    // Deduct 1000 points
    setExtraPoints(prev => prev - 1000);
    setClaimedRewards(prev => [...prev, { ...reward, claimId: `claim-${Date.now()}` } as any]);
    setSelectedReward(reward);
  };

  // Progress Bar percentage (caps at 1000 for reward threshold, but continues to show points)
  const progressPercent = Math.min(100, (currentPoints / 1000) * 100);

  return (
    <div className="w-full max-w-[1536px] xl:max-w-[1720px] mx-auto px-4 md:px-6 py-8" id="flyw-points-module">
      
      {/* Title Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 mb-2">
          <Award className="w-4 h-4 text-indigo-500 animate-pulse" />
          <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
            {isRtl ? 'برنامج مكافآت فلايو السعيد' : 'FLY-WIDE Loyalty Club'}
          </span>
        </div>
        <h2 className="text-2xl md:text-4xl font-extrabold text-slate-800 dark:text-white tracking-tight">
          {isRtl ? 'نقاط فلايو المدهشة 🌟' : 'Your Sparkly Flyw Points Balance 🌟'}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 max-w-xl mx-auto font-semibold">
          {isRtl
            ? 'اجمع ٢٥٠ نقطة مبهجة مع كل رحلة تقوم بها، واستبدل باقات الهدايا الرائعة عند وصولك لـ ١٠٠٠ نقطة!'
            : 'Every single happy trip you take gives you 250 points. Hit 1000 points of sky-high fun to claim wonderful gifts!'}
        </p>
      </div>

      {/* Main Points Progress Container */}
      <div className="bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700 text-white rounded-3xl p-6 md:p-10 shadow-xl relative overflow-hidden mb-8 border border-indigo-400/20">
        {/* Abstract background graphics */}
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-8 w-60 h-60 rounded-full bg-cyan-400/20 blur-2xl pointer-events-none" />
        <div className="absolute left-10 bottom-0 translate-y-8 w-44 h-44 rounded-full bg-pink-400/10 blur-xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-3 max-w-lg text-center md:text-left">
            <h3 className="text-lg font-black tracking-tight flex items-center justify-center md:justify-start gap-1">
              <span>✈️</span>
              <span>{isRtl ? 'كيف تعمل نقاط فلايو؟' : 'How Flyw Points Brighten Your Day:'}</span>
            </h3>
            <p className="text-indigo-100 text-xs font-semibold leading-relaxed">
              {isRtl
                ? 'نقاط فلايو هي هدايا سحرية مخصصة لعائلاتنا المسافرة. يمكن استخدام هذه النقاط لاسترداد كوبونات خاصة، هدايا فاخرة ومنتجات ترحيبية، جولات سرية مخصصة، أو دخول مجاني كليا لصالتنا الملكية الفاخرة! يمكنك الاستمتاع والحلول بمجرد جمع ١٠٠٠ نقطة بالبرنامج.'
                : 'This is Flyw points that can be used to redeem special vouchers and holiday gifts! It can include lovely gifts such as cool brand merchandises, special tours, and royal lounge VIP access. You can fully enjoy these if you have 1000 points. Every trip made holds 250 points that fill your progress bar.'}
            </p>

            <div className={`flex flex-wrap gap-2 pt-2 justify-center md:justify-start`}>
              <span className="bg-white/10 px-3 py-1 rounded-full text-[10.5px] font-bold text-cyan-200">
                🚀 {isRtl ? 'كل رحلة = ٢٥٠ نقطة' : '1 Trip = 250 Points'}
              </span>
              <span className="bg-white/10 px-3 py-1 rounded-full text-[10.5px] font-bold text-yellow-300">
                🎟️ {isRtl ? 'الهدف = ١٠٠٠ نقطة' : 'Redeem Target = 1000 Points'}
              </span>
            </div>
          </div>

          {/* Core Balance Indicator */}
          <div className="bg-white/10 backdrop-blur-md rounded-2.5xl p-6 border border-white/15 text-center min-w-[200px] flex flex-col items-center justify-center relative shadow-inner">
            <span className="text-[10px] text-indigo-200 uppercase font-bold tracking-widest">{isRtl ? 'رصيد نقاطك الحالي' : 'Active Balance'}</span>
            <div className="text-4xl md:text-5xl font-black my-1 text-yellow-300 animate-pulse flex items-baseline gap-1">
              <span>{currentPoints}</span>
              <span className="text-xs uppercase font-extrabold text-white">pts</span>
            </div>
            
            {/* Action Simulator Button */}
            <button
              onClick={handleRecordFlight}
              className="mt-3 bg-gradient-to-r from-yellow-300 to-amber-400 hover:from-yellow-400 hover:to-amber-500 text-slate-900 font-extrabold py-2 px-4 rounded-xl text-xs flex items-center justify-center gap-1 cursor-pointer transition shadow-lg transform hover:scale-104"
            >
              <PlaneTakeoff className="w-3.5 h-3.5" />
              <span>{isRtl ? 'سجل رحلة طيران تخيلية (+٢٥٠)' : 'Log Fly-Wide Flight! (+250)'}</span>
            </button>
          </div>
        </div>

        {/* The Progress Bar container */}
        <div className="mt-8 pt-4 border-t border-white/10 relative z-10">
          <div className="flex justify-between items-center text-xs font-bold text-indigo-100 mb-2">
            <span>{isRtl ? 'شريط تجميع النقاط والرحلات' : 'Reward Progress Meter'}</span>
            <span>{currentPoints} / 1000 PTS ({progressPercent.toFixed(0)}%)</span>
          </div>

          <div className="h-4.5 bg-indigo-950/40 rounded-full overflow-hidden p-0.5 border border-white/10 flex items-center">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progressPercent}%` }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className={`h-full rounded-full bg-gradient-to-r ${
                currentPoints >= 1000 
                  ? 'from-yellow-400 to-emerald-400 animate-pulse' 
                  : 'from-cyan-400 via-sky-400 to-yellow-300'
              }`}
            />
          </div>

          <div className="flex justify-between text-[10px] text-indigo-200 mt-2 font-bold uppercase tracking-wider">
            <span>🐣 {isRtl ? 'البداية' : 'Nestling'}</span>
            <span>🦜 {isRtl ? '٥٠٪ نصف الرحلة' : '50% Explorer'}</span>
            <span className={currentPoints >= 1000 ? 'text-yellow-300 font-extrabold scale-103 transition-transform' : ''}>
              🏆 {isRtl ? 'مؤهل للهدايا (١٠٠٠)' : 'Ready for Gifts! (1000+)'}
            </span>
          </div>
        </div>
      </div>

      {/* Rewards Catalog Shelf */}
      <h3 className="text-xl font-extrabold text-slate-800 dark:text-white mt-10 mb-5 text-center md:text-left">
        🎁 {isRtl ? 'الهدايا والجوائز المتاحة للاستبدال' : 'Gifts & Vouchers You Can Redeem:'}
      </h3>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {rewardsDb.map((rew) => {
          const isEligible = currentPoints >= 1000;
          return (
            <div
              key={rew.id}
              className={`bg-white dark:bg-slate-900 border rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 relative overflow-hidden shadow-sm ${
                isEligible 
                  ? 'border-indigo-200 dark:border-indigo-950 hover:shadow-lg hover:border-indigo-400/40' 
                  : 'border-slate-100 dark:border-slate-800 opacity-80'
              }`}
            >
              {/* Overlay Ribbon for eligible goods */}
              {isEligible && (
                <div className="absolute top-0 right-0 bg-yellow-400 text-slate-900 text-[9px] px-3 py-1 rounded-bl-xl font-extrabold flex items-center gap-0.5 shadow">
                  <Sparkles className="w-2.5 h-2.5 animate-spin-slow" />
                  <span>UNLOCKED</span>
                </div>
              )}

              <div>
                {/* Emoji Emblem */}
                <div className="text-4xl w-14 h-14 bg-slate-50 dark:bg-slate-950 rounded-2xl flex items-center justify-center border border-slate-100 dark:border-slate-800 mb-4 shadow-inner">
                  {rew.icon}
                </div>

                <div className="space-y-1.5 text-left mb-5">
                  <span className="text-[9px] bg-slate-100 dark:bg-slate-800 text-indigo-500 font-extrabold px-2 py-0.5 rounded-full uppercase tracking-wider block w-max">
                    {rew.type === 'merch' ? (isRtl ? 'منتجات مميزة' : 'MERCHANDISE') : rew.type === 'tour' ? (isRtl ? 'جولات حصرية' : 'SPECIAL TOUR') : (isRtl ? 'دخول الصالة' : 'VIP LOUNGE PASS')}
                  </span>
                  <h4 className="font-extrabold text-slate-900 dark:text-white text-sm leading-snug">
                    {isRtl ? rew.nameAr : rew.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed font-semibold">
                    {isRtl ? rew.descAr : rew.desc}
                  </p>
                </div>
              </div>

              {/* Redeem Button */}
              <button
                disabled={!isEligible}
                onClick={() => handleRedeem(rew)}
                className={`w-full py-2.5 rounded-full text-xs font-black tracking-wider transition-all cursor-pointer text-center ${
                  isEligible
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md shadow-indigo-500/10'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-600 cursor-not-allowed text-[11px]'
                }`}
              >
                {isEligible ? (isRtl ? 'استبدل هذه الهدية مجاناً! 🎉' : 'Claim Voucher For Free! 🎉') : (isRtl ? 'مغلق (تحتاج ١٠٠٠ نقطة)' : 'Requires 1000 Points')}
              </button>
            </div>
          );
        })}
      </div>

      {/* Claimed vouchers shelf */}
      <AnimatePresence>
        {claimedRewards.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-emerald-50/75 dark:bg-emerald-950/20 rounded-3xl p-6 border border-emerald-100/60 dark:border-emerald-800/30 text-left mb-10 max-w-2xl mx-auto"
            id="claimed-prizes-shelf"
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎟️🏆</span>
              <div>
                <h4 className="font-black text-emerald-800 dark:text-emerald-300 text-sm leading-tight">
                  {isRtl ? 'حقيبة مكافآتي وقسائم الهدايا المفعلة!' : 'Your Redeemed Prizes & Voucher Wallet!'}
                </h4>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-500 font-bold">
                  {isRtl ? 'أبرز الرمز للموظف في فرع عجمان الكورنيش للاستلام فورا.' : 'Present these voucher codes to the desk at Ajman Cornish to enjoy.'}
                </p>
              </div>
            </div>

            <ul className="space-y-2.5">
              {claimedRewards.map((claim: any, idx) => (
                <li
                  key={claim.claimId || idx}
                  className="bg-white dark:bg-slate-900 border border-emerald-200/50 dark:border-emerald-800/30 p-3 rounded-2xl flex items-center justify-between shadow-sm animate-pulse"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{claim.icon}</span>
                    <div>
                      <h5 className="font-bold text-slate-800 dark:text-slate-200 text-xs">
                        {isRtl ? claim.nameAr : claim.name}
                      </h5>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[10px] text-emerald-500 font-mono font-bold uppercase">
                          Code: FW-{Math.floor(Math.random() * 900000 + 100000)}
                        </span>
                        <span className="text-[9px] text-slate-300">•</span>
                        <span className="text-[9px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-900/30 text-emerald-600 font-extrabold uppercase">
                          {isRtl ? 'نشط وقابل للاستحقاق' : 'Active & Verified'}
                        </span>
                      </div>
                    </div>
                  </div>
                  <CheckCircle className="w-5 h-5 text-emerald-500 flex-shrink-0" />
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Claim Success Celebration Popup Modal */}
      <AnimatePresence>
        {selectedReward && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedReward(null)}
              className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
            />
            
            <motion.div
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 md:p-8 max-w-md w-full border border-slate-100 dark:border-slate-800 relative z-10 text-center space-y-4"
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
            >
              <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center mx-auto text-3xl shadow-inner border border-emerald-100">
                🎉
              </div>
              <h4 className="text-lg font-black text-slate-800 dark:text-white">
                {isRtl ? 'تهانينا الحارة! تم استبدال جائزتك' : 'Hooray! Gift Redeemed Successfully'}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-semibold leading-relaxed">
                {isRtl 
                  ? `لقد حصلت بجدارة على: "${selectedReward.nameAr}". تم حفظ قسيمة الهدية في محفظتك المفعلة بالأسفل. زورونا بفرع عجمان على شاطئ الكورنيش للاستلام.`
                  : `You have claimed: "${selectedReward.name}". The active voucher is added to your secure rewards wallet below. Take it to our shop in Ajman Cornish, UAE to claim your premium reward!`
                }
              </p>
              <button
                onClick={() => setSelectedReward(null)}
                className="w-full py-2 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs cursor-pointer transition shadow-md shadow-emerald-400/20"
              >
                {isRtl ? 'رائع جداً! شكراً لك' : 'Excellent! Thank You'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
