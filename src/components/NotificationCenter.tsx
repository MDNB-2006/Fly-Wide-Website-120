/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Bell, X, ShieldAlert, Sparkles, AlertCircle, PlaneTakeoff, Info, CheckCircle } from 'lucide-react';
import { Notification } from '../types';

interface NotificationCenterProps {
  notifications: Notification[];
  onDismiss: (id: string) => void;
  onClearAll: () => void;
  lang: 'en' | 'ar';
}

// Custom friendly Synthesizer to play pleasant audio bells
export function playNotificationChime() {
  try {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContext) return;
    const ctx = new AudioContext();
    
    // First note (G5)
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.frequency.setValueAtTime(783.99, ctx.currentTime); // G5
    gain1.gain.setValueAtTime(0.12, ctx.currentTime);
    gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
    osc1.start();
    osc1.stop(ctx.currentTime + 0.35);

    // Second note (C6) with delay
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.frequency.setValueAtTime(1046.50, ctx.currentTime + 0.12); // C6
    gain2.gain.setValueAtTime(0, ctx.currentTime);
    gain2.gain.setValueAtTime(0.15, ctx.currentTime + 0.12);
    gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);
    osc2.start(ctx.currentTime + 0.12);
    osc2.stop(ctx.currentTime + 0.55);
  } catch (error) {
    console.warn('Audio feedback failed due to user-interaction policy.', error);
  }
}

export default function NotificationCenter({
  notifications,
  onDismiss,
  onClearAll,
  lang
}: NotificationCenterProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [pulseActive, setPulseActive] = useState(false);
  const isRtl = lang === 'ar';

  // Pulse effect when new notification arrives
  useEffect(() => {
    if (notifications.length > 0) {
      setPulseActive(true);
      const timer = setTimeout(() => setPulseActive(false), 1500);
      return () => clearTimeout(timer);
    }
  }, [notifications.length]);

  const activeCount = notifications.length;

  return (
    <div className="relative" id="notifications-widget">
      {/* Trigger Bell Icon with pulsing effects */}
      <button
        id="btn-notifications-drawer"
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2.5 rounded-full bg-white dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/80 shadow-sm hover:shadow hover:bg-slate-50 dark:hover:bg-slate-700 transition-all duration-300 cursor-pointer"
      >
        <Bell className={`w-5 h-5 text-slate-700 dark:text-slate-200 ${pulseActive ? 'animate-bounce text-sky-500' : ''}`} />
        {activeCount > 0 && (
          <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-r from-rose-500 to-pink-500 text-white font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white dark:border-slate-800 animate-pulse">
            {activeCount}
          </span>
        )}
      </button>

      {/* Dropdown panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            className={`absolute mt-3 w-80 md:w-96 bg-white/95 dark:bg-slate-900/98 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-xl border border-slate-100 dark:border-slate-800/80 p-5 ${
              isRtl ? 'left-0 sm:-left-12 origin-top-left' : 'right-0 sm:-right-12 origin-top-right'
            } z-50`}
          >
            {/* Header */}
            <div className={`flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3 mb-3 ${isRtl ? 'flex-row-reverse' : ''}`}>
              <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <div className="p-1.5 bg-sky-100 dark:bg-sky-950 rounded-lg text-sky-600 dark:text-sky-400">
                  <Bell className="w-4 h-4 animate-swing" />
                </div>
                <div>
                  <h4 className="font-extrabold text-sm text-slate-800 dark:text-white">
                    {isRtl ? 'تنبيهات البث الحي' : 'Live Broadcasts'}
                  </h4>
                  <p className="text-[10px] text-slate-400 font-mono tracking-wide">FLY-WIDE PASSENGER ALERT</p>
                </div>
              </div>
              
              {activeCount > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-[10px] font-bold text-slate-400 hover:text-rose-500 transition-colors"
                >
                  {isRtl ? 'مسح الكل' : 'Clear All'}
                </button>
              )}
            </div>

            {/* Notifications List */}
            <div className="max-h-80 overflow-y-auto space-y-2.5 pr-1 text-slate-700 dark:text-slate-300">
              {notifications.map((notif) => {
                let badgeStyle = 'bg-blue-100 text-blue-600 dark:bg-blue-950/50 dark:text-blue-400';
                let icon = <Info className="w-4 h-4" />;
                if (notif.type === 'warning') {
                  badgeStyle = 'bg-amber-100 text-amber-600 dark:bg-amber-950/50 dark:text-amber-400';
                  icon = <AlertCircle className="w-4 h-4" />;
                } else if (notif.type === 'success') {
                  badgeStyle = 'bg-emerald-100 text-emerald-600 dark:bg-emerald-900/40 dark:text-emerald-400';
                  icon = <CheckCircle className="w-4 h-4" />;
                }

                return (
                  <motion.div
                    key={notif.id}
                    initial={{ opacity: 0, x: isRtl ? 15 : -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={`p-3 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-100 dark:border-slate-800 flex gap-3 relative transition-all ${
                      isRtl ? 'flex-row-reverse text-right' : 'text-left'
                    }`}
                  >
                    {/* Icon */}
                    <div className={`p-1.5 rounded-lg h-fit ${badgeStyle}`}>
                      {icon}
                    </div>

                    {/* text content */}
                    <div className="flex-1 min-w-0 pr-4">
                      <p className="font-extrabold text-xs text-slate-800 dark:text-white leading-tight">
                        {isRtl ? notif.titleAr : notif.title}
                      </p>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-normal mt-0.5">
                        {isRtl ? notif.messageAr : notif.message}
                      </p>
                      <span className="text-[9px] text-slate-400 font-mono block mt-1.5">
                        {notif.timestamp}
                      </span>
                    </div>

                    {/* Dismiss Button */}
                    <button
                      onClick={() => onDismiss(notif.id)}
                      className={`absolute text-slate-400 hover:text-rose-500 p-1 rounded-full hover:bg-slate-200/50 dark:hover:bg-slate-700/50 transition-colors ${
                        isRtl ? 'left-1 top-1' : 'right-1 top-1'
                      }`}
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </motion.div>
                );
              })}

              {activeCount === 0 && (
                <div className="py-8 text-center text-slate-400">
                  <div className="w-12 h-12 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-2 text-slate-300">
                    ✈️
                  </div>
                  <p className="text-xs font-semibold">{isRtl ? 'لا توجد إشعارات حالياً' : 'All clear! No alerts today.'}</p>
                  <p className="text-[10px] text-slate-400 mt-1">
                    {isRtl ? 'حظاً موفقاً ورحلات سعيدة!' : 'Check back later for flight departures.'}
                  </p>
                </div>
              )}
            </div>

            {/* Bottom Brand Stamp */}
            <div className="flex items-center justify-center gap-1 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 text-[10px] font-bold text-sky-500">
              <Sparkles className="w-3.5 h-3.5" />
              <span>FLY-WIDE PASSENGER INFO DECK</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
