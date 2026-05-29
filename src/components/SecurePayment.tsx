/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldCheck, Calendar, CreditCard, Lock, ArrowRight, CheckCircle2, Ticket, Download } from 'lucide-react';
import { CurrencyCode, Booking } from '../types';
import { currencies } from '../data/translations';
import { playNotificationChime } from './NotificationCenter';

interface SecurePaymentProps {
  booking: Booking;
  onPaymentSuccess: (bookingId: string) => void;
  lang: 'en' | 'ar';
  currencyCode: CurrencyCode;
}

export default function SecurePayment({
  booking,
  onPaymentSuccess,
  lang,
  currencyCode
}: SecurePaymentProps) {
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvv, setCvv] = useState('');
  const [isFlipped, setIsFlipped] = useState(false);
  const [isPaying, setIsPaying] = useState(false);
  const [payError, setPayError] = useState('');
  const [receiptDownloaded, setReceiptDownloaded] = useState(false);

  const getCurrencySymbol = () => currencies[currencyCode]?.symbol || '$';
  const getExchangeRate = () => currencies[currencyCode]?.rate || 1;
  const currentTotal = Math.round(booking.totalCostUSD * getExchangeRate());

  const handleCardNumberChange = (e: any) => {
    let value = e.target.value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
    let matches = value.match(/\d{4,16}/g);
    let match = (matches && matches[0]) || '';
    let parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length > 0) {
      setCardNumber(parts.join(' '));
    } else {
      setCardNumber(value);
    }
  };

  const handleExpiryChange = (e: any) => {
    let input = e.target.value.replace(/[^0-9]/g, '');
    if (input.length > 2) {
      setExpiry(`${input.slice(0, 2)}/${input.slice(2, 4)}`);
    } else {
      setExpiry(input);
    }
  };

  const executePayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (cardNumber.length < 15) {
      setPayError(lang === 'ar' ? 'يرجى إدخال رقم بطاقة صالح.' : 'Please enter a valid credit card number.');
      return;
    }
    if (cardName.trim().length < 3) {
      setPayError(lang === 'ar' ? 'يرجى كتابة الاسم الكامل لصاحب البطاقة.' : 'Cardholder name is too short.');
      return;
    }
    if (cvv.length < 3) {
      setPayError(lang === 'ar' ? 'رمز الأمان (CVV) غير صالح.' : 'Valid CVV code required.');
      return;
    }

    setPayError('');
    setIsPaying(true);

    // Simulate SSL Encrypted payment gateway load
    setTimeout(() => {
      setIsPaying(false);
      playNotificationChime();
      onPaymentSuccess(booking.id);
    }, 2500);
  };

  // Generate Receipt text file
  const handleDownloadReceipt = () => {
    const text = `
========================================
       FLY-WIDE GLOBAL TOURISM CO.     
        OFFICIAL BOARDING RECEIPT       
========================================
Receipt Reference: REC-${booking.id.toUpperCase()}
Date Issued: ${new Date().toLocaleDateString()}
Status: SECURE COMPLETED (SSL-256)

Passenger Identity:
----------------------------------------
Full Name: ${booking.fullName}
Passport Ref: ${booking.passportNumber}
Contact Email: ${booking.email}

Flight & Tour Arrangement:
----------------------------------------
Destination: ${lang === 'ar' ? booking.destinationNameAr : booking.destinationName}
Departure Scheduled: ${booking.travelDate}
Travelers Count: ${booking.guests} Person(s)

Financial Breakdown:
----------------------------------------
Base Cost: $${booking.totalCostUSD} USD
Charged Amount: ${getCurrencySymbol()} ${currentTotal} ${currencyCode}
Gateway Authorized via Fly-Wide SafePay.

----------------------------------------
Thank you for choosing FLY-WIDE!
Fly High, Explore Wide! 🌍✈️
========================================
    `;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `FLY-WIDE-Receipt-${booking.id}.txt`;
    link.click();
    URL.revokeObjectURL(url);
    setReceiptDownloaded(true);
  };

  const isRtl = lang === 'ar';

  return (
    <div className={`bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-xl max-w-2xl mx-auto`} id="secure-payment-gateway">
      {/* Invoice Banner */}
      <div className={`p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 mb-6 flex items-center justify-between ${
        isRtl ? 'flex-row-reverse text-right' : 'text-left'
      }`}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-400 text-slate-900 rounded-xl">
            <Ticket className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h4 className="font-extrabold text-xs text-amber-800 dark:text-amber-400 uppercase tracking-widest">
              {isRtl ? 'باقة بانتظار الدفع وبطاقات الصعود' : 'Pending Boarding Pass & Reservation'}
            </h4>
            <h3 className="text-sm font-extrabold text-slate-800 dark:text-slate-100">
              {isRtl ? booking.destinationNameAr : booking.destinationName} ({booking.guests} {isRtl ? 'مسافرين' : 'guests'})
            </h3>
            <p className="text-[11px] text-slate-400 font-medium">#{booking.id}</p>
          </div>
        </div>
        <div className={`text-right ${isRtl ? 'text-left' : 'text-right'}`}>
          <span className="text-[10px] text-slate-400 block font-semibold uppercase">{isRtl ? 'إجمالي الفاتورة' : 'Invoice Total'}</span>
          <span className="text-xl md:text-2xl font-black text-slate-950 dark:text-white">
            {getCurrencySymbol()}{currentTotal}
          </span>
        </div>
      </div>

      {booking.status === 'completed' ? (
        /* Success Screen */
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center py-10"
        >
          <div className="w-20 h-20 bg-emerald-100 dark:bg-emerald-950 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-5 border-4 border-white dark:border-slate-800 shadow-lg">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h3 className="text-2xl font-black text-slate-900 dark:text-white">
            {isRtl ? 'تم تأكيد السفر بنجاح! 🎉' : 'Bon Voyage! Payment Secured! 🎉'}
          </h3>
          <p className="text-slate-500 dark:text-slate-400 text-sm mt-2 max-w-md mx-auto">
            {isRtl 
              ? 'لقد تم إرسال تذاكر الطيران، وحجوزات الفنادق، ودليل الأنشطة إلى بريدك الإلكتروني.'
              : "Your flight tickets and holiday itinerary are fully authorized. We can't wait to guide you!"}
          </p>

          <div className="mt-8 flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={handleDownloadReceipt}
              className="bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-950 font-bold px-6 py-3 rounded-full flex items-center justify-center gap-2 transition shadow-lg cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>{isRtl ? 'تحميل بطاقة صعود الطائرة وطباعة الفاتورة' : 'Download Boarding Pass & Receipt'}</span>
            </button>
          </div>
          {receiptDownloaded && (
            <p className="text-[11px] text-emerald-500 font-bold mt-2.5 animate-pulse">✓ Receipt successfully downloaded!</p>
          )}
        </motion.div>
      ) : (
        /* Card input form & Virtual Card flip illustration */
        <div className="space-y-6">
          <div className="flex flex-col items-center">
            {/* Interactive 3D Apple-like Card Mockup */}
            <div className="w-full max-w-[340px] h-[200px] perspective-1000 mb-6 group">
              <motion.div
                animate={{ rotateY: isFlipped ? 180 : 0 }}
                transition={{ duration: 0.6, ease: 'easeOut' }}
                className="relative w-full h-full transform-style-3d shadow-xl rounded-2xl cursor-pointer"
              >
                {/* Card Front Side */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-sky-400 via-indigo-500 to-indigo-600 p-6 rounded-2xl flex flex-col justify-between text-white backface-hidden border border-white/10">
                  <div className="flex justify-between items-start">
                    <div className="space-y-1">
                      <p className="text-[9px] font-bold tracking-widest text-sky-100 uppercase">FLY-WIDE CREDENTIAL</p>
                      <span className="text-xs font-black tracking-wide bg-white/20 px-2 py-0.5 rounded-full">SafePay</span>
                    </div>
                    {/* Chip representation */}
                    <div className="w-9 h-7 bg-amber-300/80 rounded-md shadow-inner" />
                  </div>

                  {/* Card Number */}
                  <div className="text-lg md:text-xl font-mono tracking-[4px] py-1 border-b border-white/10">
                    {cardNumber || '•••• •••• •••• ••••'}
                  </div>

                  {/* Card Bottom: Holder & Expiry */}
                  <div className="flex justify-between items-end">
                    <div className="text-left w-3/4">
                      <p className="text-[8px] uppercase tracking-wider text-sky-100">{isRtl ? 'صاحب البطاقة' : 'Cardholder'}</p>
                      <p className="text-xs font-bold truncate tracking-wide">{cardName.toUpperCase() || 'HAPPY TRAVELER'}</p>
                    </div>
                    <div>
                      <p className="text-[8px] uppercase tracking-wider text-sky-100">{isRtl ? 'انتهاء' : 'Expiry'}</p>
                      <p className="text-xs font-bold font-mono">{expiry || 'MM/YY'}</p>
                    </div>
                  </div>
                </div>

                {/* Card Back Side (flipped when CVV is focused) */}
                <div className="absolute inset-0 w-full h-full bg-gradient-to-tr from-slate-800 to-slate-900 p-6 rounded-2xl flex flex-col justify-between text-white rotate-y-180 backface-hidden border border-slate-700">
                  {/* Magnetic strip */}
                  <div className="w-full h-10 bg-slate-950 -mx-6 mt-1" />

                  <div className="space-y-1.5 mt-2">
                    <p className="text-[8px] uppercase text-right text-slate-300">{isRtl ? 'رمز التحقق (CVV)' : 'CVV Code'}</p>
                    <div className="bg-slate-100/90 py-1 px-2.5 rounded text-slate-950 font-mono font-bold text-sm text-right">
                      {cvv || '•••'}
                    </div>
                  </div>

                  <div className="flex justify-between items-center text-[8px] text-slate-400">
                    <span>Authorized Signature • Ref #{booking.id.slice(0,6)}</span>
                    <span className="font-extrabold text-[#f59e0b]">SSL ENCRYPTED</span>
                  </div>
                </div>
              </motion.div>
            </div>
            <p className="text-[10px] text-slate-400 italic">
              💡 {isRtl ? 'سوف تقلب المغامرة البطاقة تلقائياً لعرض الواجهة الخلفية عند إدخال رمز CVV!' : 'The smart card flips automatically when editing the CVV code!'}
            </p>
          </div>

          {/* Secure details header */}
          <div className="flex justify-center items-center gap-2 text-xs font-bold text-sky-500 mb-4 bg-sky-50/50 dark:bg-sky-950/20 py-1.5 px-4 rounded-full w-fit mx-auto border border-sky-100/60 dark:border-sky-900/35">
            <Lock className="w-3.5 h-3.5" />
            <span className="uppercase tracking-widest text-[9.5px]">SSL SECURED GATEWAY COMPLIANT</span>
          </div>

          {/* Form */}
          <form onSubmit={executePayment} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-300 mb-1">
                  {isRtl ? 'رقم البطاقة الائتمانية' : 'Card Number'}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><CreditCard className="w-4 h-4" /></span>
                  <input
                    type="text"
                    required
                    maxLength={19}
                    placeholder="4123 4567 8910 1112"
                    value={cardNumber}
                    onChange={handleCardNumberChange}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 outline-none focus:border-sky-500 font-mono text-sm tracking-widest text-slate-800 dark:text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-300 mb-1">
                  {isRtl ? 'اسم صاحب البطاقة' : 'Cardholder Name'}
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Happy Family Explorer"
                  value={cardName}
                  onChange={(e) => setCardName(e.target.value.replace(/[^A-Za-z\s]/g, ''))}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 outline-none focus:border-sky-500 font-semibold text-sm text-slate-800 dark:text-slate-200"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-300 mb-1">
                  {isRtl ? 'تاريخ الانتهاء' : 'Expiry Date (MM/YY)'}
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"><Calendar className="w-4 h-4" /></span>
                  <input
                    type="text"
                    required
                    maxLength={5}
                    placeholder="12/28"
                    value={expiry}
                    onChange={handleExpiryChange}
                    className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 outline-none focus:border-sky-500 font-mono text-sm text-slate-800 dark:text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-extrabold text-slate-600 dark:text-slate-300 mb-1">
                  {isRtl ? 'رمز التحقق (CVV)' : 'CVV Code'}
                </label>
                <input
                  type="password"
                  required
                  maxLength={3}
                  placeholder="•••"
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value.replace(/[^0-9]/g, ''))}
                  onFocus={() => setIsFlipped(true)}
                  onBlur={() => setIsFlipped(false)}
                  className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 outline-none focus:border-sky-500 font-mono text-sm text-slate-800 dark:text-slate-200"
                />
              </div>
            </div>

            {/* Error prompt */}
            {payError && (
              <p className="text-xs font-bold text-rose-500 mt-2 text-center animate-shake bg-rose-50 dark:bg-rose-950/20 py-2 rounded-xl">
                ⚠ {payError}
              </p>
            )}

            {/* Submit checkout buttons */}
            <div className="pt-4 flex flex-col items-center">
              <button
                type="submit"
                disabled={isPaying}
                className="w-full max-w-sm py-3.5 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 hover:from-emerald-500 hover:to-teal-600 disabled:from-slate-300 disabled:to-slate-400 text-white font-extrabold text-sm tracking-wide shadow-lg transition-all transform hover:-translate-y-0.5 hover:scale-101 flex items-center justify-center gap-2 cursor-pointer relative"
              >
                {isPaying ? (
                  <>
                    <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                    <span>{isRtl ? 'جارٍ الاتصال بالبنك المشفر...' : 'Encrypting transaction...'}</span>
                  </>
                ) : (
                  <>
                    <ShieldCheck className="w-4 h-4" />
                    <span>
                      {isRtl ? 'تفويض الحجز بآمان وبثقة 🔐' : `Authorize Secure Travel Payment ${getCurrencySymbol()}${currentTotal}`}
                    </span>
                  </>
                )}
              </button>
              
              <span className="text-[10px] text-slate-400 font-mono block mt-2 text-center">
                Securely handled inside sandboxed Node environment • 256-Bit SSL Encryption Verified
              </span>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
