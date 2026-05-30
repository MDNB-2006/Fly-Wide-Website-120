/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingCart,
  User,
  Mail,
  FileText,
  Calendar,
  CreditCard,
  MapPin,
  Store,
  Wallet,
  ArrowRight,
  CheckCircle,
  X,
  Plus,
  Minus,
  AlertCircle,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { Destination, Booking, CurrencyCode } from '../types';
import { currencies } from '../data/translations';
import { destinationsList } from '../data/destinations';
import { playNotificationChime } from './NotificationCenter';

interface CheckoutProps {
  bookingDestination: Destination | null;
  setBookingDestination: (dest: Destination | null) => void;
  lang: 'en' | 'ar';
  currencyCode: CurrencyCode;
  onBookingComplete: (newBooking: Booking) => void;
  onSwitchTab: (tab: any) => void;
  userProfile: any;
  initialFullName?: string;
  initialEmail?: string;
  initialPassportNumber?: string;
  initialTravelDate?: string;
  initialGuests?: number;
}

export default function Checkout({
  bookingDestination,
  setBookingDestination,
  lang,
  currencyCode,
  onBookingComplete,
  onSwitchTab,
  userProfile,
  initialFullName = '',
  initialEmail = '',
  initialPassportNumber = '',
  initialTravelDate = '',
  initialGuests = 1
}: CheckoutProps) {
  const isRtl = lang === 'ar';

  // Local form states
  const [fullName, setFullName] = useState(initialFullName);
  const [email, setEmail] = useState(initialEmail);
  const [passportNumber, setPassportNumber] = useState(initialPassportNumber);
  const [travelDate, setTravelDate] = useState(initialTravelDate);
  const [guestsCount, setGuestsCount] = useState(initialGuests);
  const [selectedPayment, setSelectedPayment] = useState<'cash' | 'card' | 'tabby' | 'tamara' | null>(null);

  // Modal alert dialog states
  const [devNoticeOpen, setDevNoticeOpen] = useState(false);
  const [successNoticeOpen, setSuccessNoticeOpen] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // Rate Conversion
  const rate = currencies[currencyCode]?.rate || 1;
  const symbol = currencies[currencyCode]?.symbol || '$';

  // Seed default items if logged in or initial fields provided
  useEffect(() => {
    if (initialFullName) {
      setFullName(initialFullName);
    } else if (userProfile) {
      setFullName(userProfile.fullName || '');
    }

    if (initialEmail) {
      setEmail(initialEmail);
    } else if (userProfile) {
      setEmail(userProfile.email || '');
    }

    if (initialPassportNumber) {
      setPassportNumber(initialPassportNumber);
    } else if (userProfile) {
      setPassportNumber(userProfile.passportNumber || '');
    }

    if (initialTravelDate) {
      setTravelDate(initialTravelDate);
    }

    if (initialGuests) {
      setGuestsCount(initialGuests);
    }
  }, [userProfile, bookingDestination, initialFullName, initialEmail, initialPassportNumber, initialTravelDate, initialGuests]);

  // Handle selected payment option warnings / confirmations
  const handlePaymentSelect = (method: 'cash' | 'card' | 'tabby' | 'tamara') => {
    setSelectedPayment(method);
    if (method === 'card' || method === 'tabby' || method === 'tamara') {
      // Trigger under development pop-up
      setDevNoticeOpen(true);
    }
  };

  const handleQuickSelectDestination = (destId: string) => {
    const found = destinationsList.find(d => d.id === destId);
    if (found) {
      setBookingDestination(found);
    }
  };

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDestination) {
      setErrorMsg(isRtl ? 'يرجى اختيار وجهة سفر أولاً!' : 'Please pick a travel destination first!');
      return;
    }
    if (!fullName.trim()) {
      setErrorMsg(isRtl ? 'يرجى كتابة الاسم الكامل للمسافر.' : 'Passenger name is required.');
      return;
    }
    if (!passportNumber.trim()) {
      setErrorMsg(isRtl ? 'يرجى إدخال رقم جواز السفر.' : 'Passport number is required.');
      return;
    }
    if (!travelDate) {
      setErrorMsg(isRtl ? 'يرجى تحديد تاريخ السفر.' : 'Please choose your preferred departure date.');
      return;
    }
    if (!selectedPayment) {
      setErrorMsg(isRtl ? 'يرجى تحديد طريقة الدفع المفضلة.' : 'Please select your preferred payment method.');
      return;
    }

    if (selectedPayment === 'card' || selectedPayment === 'tabby' || selectedPayment === 'tamara') {
      setDevNoticeOpen(true);
      return;
    }

    // Cash on site Ajman office process path
    setErrorMsg('');
    
    // Create new booking
    const finalCostUSD = bookingDestination.priceUSD * guestsCount;
    const newBooking: Booking = {
      id: `FW-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      destinationId: bookingDestination.id,
      destinationName: bookingDestination.name,
      destinationNameAr: bookingDestination.nameAr,
      fullName: fullName,
      email: email,
      passportNumber: passportNumber,
      travelDate: travelDate,
      guests: guestsCount,
      totalCostUSD: finalCostUSD,
      currencyPaid: currencyCode,
      status: 'completed', // Fully approved on site
      timestamp: new Date().toLocaleString()
    };

    try {
      playNotificationChime();
    } catch {
      // Ignore audio sandbox block
    }

    onBookingComplete(newBooking);
    setSuccessNoticeOpen(true);
  };

  const singleDestinationPrice = bookingDestination ? bookingDestination.priceUSD : 0;
  const currentTotal = Math.round(singleDestinationPrice * guestsCount * rate);

  return (
    <div className="w-full max-w-[1536px] xl:max-w-[1720px] mx-auto px-4 md:px-6 py-8" id="checkout-module-tab">
      
      {/* Backtrack Header */}
      <div className={`mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 ${isRtl ? 'md:flex-row-reverse text-right' : 'text-left'}`}>
        <div>
          <span className="text-[10px] bg-sky-50 dark:bg-sky-950 font-black text-sky-600 dark:text-sky-400 px-3 py-1 rounded-full border border-sky-100/50 dark:border-sky-900/40 uppercase tracking-widest">
            {isRtl ? 'إجراءات السداد الفورية والتأمين' : 'Fly-Wide Real-time Gateway'}
          </span>
          <h2 className="text-2xl md:text-3xl font-black text-slate-900 dark:text-white mt-1 tracking-tight">
            {isRtl ? 'بوابة المغادرة وحجز التذاكر' : 'Passenger Checkout Hub 🧭'}
          </h2>
          <p className="text-xs text-slate-500 mt-1">
            {isRtl 
              ? 'أدخل تفاصيل التذاكر، واختر وسيلة الدفع لتأكيد حجزك وإصدار بطاقات صعود الطائرات للرحلة العائلية.'
              : 'Provide guest details, select your premium payment option, and complete checkout to download instant boarding files.'}
          </p>
        </div>

        <button
          onClick={() => onSwitchTab('packages')}
          className="text-xs font-bold text-slate-500 hover:text-sky-500 bg-white dark:bg-slate-900 px-3.5 py-2 rounded-xl shadow-sm border border-slate-100 dark:border-slate-800 flex items-center gap-1.5 transition cursor-pointer"
        >
          {isRtl ? '← العودة للباقات' : '← Back to Packages'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Details of passengers */}
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 md:p-8 shadow-sm">
            <h3 className={`text-lg font-black text-slate-900 dark:text-white mb-5 flex items-center gap-2 border-b border-slate-100 dark:border-slate-800 pb-3 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
              <User className="w-5 h-5 text-indigo-500" />
              <span>{isRtl ? 'تفاصيل ومعلومات المسافرين' : '1. Passenger Registry Details'}</span>
            </h3>

            {!bookingDestination ? (
              /* Empty state: prompt selecting a package */
              <div className="py-8 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-indigo-50 dark:bg-indigo-950/40 flex items-center justify-center mx-auto text-indigo-500 text-2xl animate-bounce">
                  🛒
                </div>
                <h4 className="font-extrabold text-base text-slate-800 dark:text-white">
                  {isRtl ? 'عربة التسوق فارغة حالياً!' : 'Your Shopping Cart is Empty!'}
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                  {isRtl 
                    ? 'اختر من القائمة الموصى بها بالأسفل للمتابعة الفورية، أو تصفح الخريطة لاختيار معالم جديدة!'
                    : 'Select from our luxury family gateway recommendations below to activate checkout immediately!'}
                </p>

                {/* Quick select dropdown */}
                <div className="max-w-xs mx-auto">
                  <label className="block text-left text-[11px] font-bold text-slate-400 mb-1 uppercase tracking-wide text-center">
                    {isRtl ? 'اختر وجهة سريعة للمتابعة' : 'Quick Select Destination'}
                  </label>
                  <select
                    onChange={(e) => handleQuickSelectDestination(e.target.value)}
                    className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold text-slate-800 dark:text-slate-200 outline-none focus:border-indigo-500"
                    defaultValue=""
                  >
                    <option value="" disabled>{isRtl ? '-- حدد وجهتك السحرية --' : '-- Choose Magic Destination --'}</option>
                    {destinationsList.slice(0, 10).map((dest) => (
                      <option key={dest.id} value={dest.id}>
                        {isRtl ? dest.nameAr : dest.name} (${dest.priceUSD})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ) : (
              /* Form input entries */
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-extrabold text-slate-500 dark:text-slate-400">
                      {isRtl ? 'الاسم الكامل للمسافر الرئيسي' : 'Primary Passenger Full Name'}
                    </label>
                    <div className="relative">
                      <span className={`absolute ${isRtl ? 'right-3' : 'left-3'} top-3 text-slate-400`}>
                        <User className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        required
                        placeholder={isRtl ? 'الاسم المطابق لجواز السفر' : 'Full name (as on Passport)'}
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className={`w-full ${isRtl ? 'pr-10 text-right' : 'pl-10 text-left'} py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold outline-none focus:border-indigo-500`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-extrabold text-slate-500 dark:text-slate-400">
                      {isRtl ? 'رقم جواز السفر' : 'Passport Number'}
                    </label>
                    <div className="relative">
                      <span className={`absolute ${isRtl ? 'right-3' : 'left-3'} top-3 text-slate-400`}>
                        <FileText className="w-4 h-4" />
                      </span>
                      <input
                        type="text"
                        required
                        placeholder="e.g. N-9210291"
                        value={passportNumber}
                        onChange={(e) => setPassportNumber(e.target.value.toUpperCase())}
                        className={`w-full ${isRtl ? 'pr-10 text-right' : 'pl-10 text-left'} py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold outline-none focus:border-indigo-500`}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-extrabold text-slate-500 dark:text-slate-400">
                      {isRtl ? 'البريد الإلكتروني للاتصال والطوارئ' : 'Contact Email Address'}
                    </label>
                    <div className="relative">
                      <span className={`absolute ${isRtl ? 'right-3' : 'left-3'} top-3 text-slate-400`}>
                        <Mail className="w-4 h-4" />
                      </span>
                      <input
                        type="email"
                        required
                        placeholder="explorer@flywide.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className={`w-full ${isRtl ? 'pr-10 text-right' : 'pl-10 text-left'} py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold outline-none focus:border-indigo-500`}
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-extrabold text-slate-500 dark:text-slate-400">
                      {isRtl ? 'تاريخ المغادرة المفضل' : 'Preferred Departure Date'}
                    </label>
                    <div className="relative">
                      <span className={`absolute ${isRtl ? 'right-3' : 'left-3'} top-3 text-slate-400`}>
                        <Calendar className="w-4 h-4" />
                      </span>
                      <input
                        type="date"
                        required
                        value={travelDate}
                        onChange={(e) => setTravelDate(e.target.value)}
                        className={`w-full ${isRtl ? 'pr-10 text-right' : 'pl-10 text-left'} py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-semibold outline-none focus:border-indigo-500`}
                      />
                    </div>
                  </div>
                </div>

                {/* Interactive Guests Modifier */}
                <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
                  <div>
                    <h4 className="text-xs font-extrabold text-slate-900 dark:text-white">
                      {isRtl ? 'إجمالي عدد أفراد العائلة والضيوف' : 'Total Family Guest Metrics'}
                    </h4>
                    <p className="text-[10px] text-slate-400">
                      {isRtl ? 'يشمل الأطفال والبالغين للمقاعد والرحلة' : 'Max 1,000 guests authorized'}
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={guestsCount <= 1}
                      onClick={() => setGuestsCount(prev => Math.max(1, prev - 1))}
                      className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:text-sky-500 disabled:opacity-40"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <input
                      type="number"
                      min={1}
                      max={1000}
                      value={guestsCount}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setGuestsCount(isNaN(val) ? 1 : Math.min(1000, Math.max(1, val)));
                      }}
                      className="w-16 text-center py-1.5 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-xs font-black text-slate-900 dark:text-white"
                    />
                    <button
                      type="button"
                      disabled={guestsCount >= 1000}
                      onClick={() => setGuestsCount(prev => Math.min(1000, prev + 1))}
                      className="w-8 h-8 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-center hover:text-sky-500 disabled:opacity-40"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* Secure details info */}
          <div className="p-4 bg-gradient-to-r from-teal-500/10 to-indigo-500/10 rounded-2xl border border-teal-500/20 flex gap-3 text-slate-700 dark:text-slate-350">
            <ShieldCheck className="w-5 h-5 text-teal-500 flex-shrink-0" />
            <div className="space-y-0.5 text-xs">
              <p className="font-extrabold text-slate-900 dark:text-white uppercase text-[10px]">
                {isRtl ? 'تأمين سلامة الأموال والتشهير الإلكتروني' : 'Fly-Wide Funds Guarantee'}
              </p>
              <p className="text-[11px] leading-relaxed">
                {isRtl 
                  ? 'جميع مدفوعاتك وعقود السفر مؤمنة بشهادة SSL عشارية ووكالة السفر المعتمدة بدبي وعجمان في السجل رقم 209-1A.' 
                  : 'All flight bookings are insured under the UAE Fly-Wide physical agency license. No hidden surcharges, pure market-rate accuracy.'}
              </p>
            </div>
          </div>
        </div>

        {/* Right column: Package Checkout Summary & Payment Selection */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-6 shadow-sm space-y-6">
            
            <h3 className={`text-base font-black text-slate-900 dark:text-white border-b border-slate-100 dark:border-slate-800 pb-2.5 flex items-center gap-1.5 ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}>
              <ShoppingCart className="w-5 h-5 text-indigo-500" />
              <span>{isRtl ? 'تفاصيل باقة السفر والعقد المالي' : '2. Reservation Financials'}</span>
            </h3>

            {bookingDestination ? (
              <div className="space-y-4">
                {/* Micro Package Card Description */}
                <div className={`p-4 rounded-2xl bg-gradient-to-r ${bookingDestination.themeGradient} text-white relative overflow-hidden flex items-center justify-between shadow-sm`}>
                  <div className={`${isRtl ? 'text-right' : 'text-left'} space-y-0.5`}>
                    <span className="text-[9px] uppercase font-bold tracking-widest text-sky-100/90">{bookingDestination.continent}</span>
                    <h4 className="text-sm font-black tracking-tight">{isRtl ? bookingDestination.nameAr : bookingDestination.name}</h4>
                    <p className="text-[10px] text-white/90">📍 {isRtl ? bookingDestination.countryAr : bookingDestination.country}</p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-white/85 uppercase block font-medium">{isRtl ? 'باقة الفرد' : 'Single ticket'}</span>
                    <span className="text-base font-black">${bookingDestination.priceUSD}</span>
                  </div>
                </div>

                {/* Sub-invoice details */}
                <div className="space-y-2.5 text-xs border-b border-slate-100 dark:border-slate-800 pb-4">
                  <div className={`flex justify-between items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <span className="text-slate-400">{isRtl ? 'حساب تذاكر السفر الشخصية:' : 'Single Ticket Rate:'}</span>
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      {symbol}{Math.round(bookingDestination.priceUSD * rate)} {currencyCode}
                    </span>
                  </div>
                  <div className={`flex justify-between items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <span className="text-slate-400">{isRtl ? 'مجموع عدد المسافرين:' : 'Total Guest Multiplier:'}</span>
                    <span className="font-extrabold text-slate-900 dark:text-white">
                      × {guestsCount} {guestsCount === 1 ? (isRtl ? 'فرد عائلي' : 'Person') : (isRtl ? 'أفراد' : 'Persons')}
                    </span>
                  </div>
                  {guestsCount > 2 && (
                    <div className={`flex justify-between items-center text-emerald-500 font-bold ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <span>{isRtl ? 'خصم باقة الصيف والعائلة (25% off):' : 'Promo Special markdown 25%:'}</span>
                      <span>{isRtl ? 'متضمن بالتسعيرة' : 'Applied Live'}</span>
                    </div>
                  )}
                </div>

                {/* Main Billing Total */}
                <div className={`flex justify-between items-end p-3 bg-slate-50 dark:bg-slate-950 rounded-2xl ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">{isRtl ? 'المبلغ الإجمالي المستحق' : 'Computed Total Due'}</span>
                    <span className="text-[11px] font-mono text-indigo-400">({guestsCount} × {symbol}{Math.round(bookingDestination.priceUSD * rate)})</span>
                  </div>
                  <div className={`text-right ${isRtl ? 'text-left' : 'text-right'}`}>
                    <span className="text-2xl font-black text-slate-950 dark:text-white">
                      {symbol}{currentTotal}
                    </span>
                    <span className="text-xs font-semibold text-slate-400 ml-1">{currencyCode}</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-6 text-slate-400 text-xs">
                {isRtl ? 'لم تختر باقة سفر لتسعيرها بعد.' : 'Please choose a package to calculate the final total.'}
              </div>
            )}

            {/* PAYMENT METHODS SELECTOR & ACCEPTED LOGOS */}
            <div className="space-y-3.5">
              <h4 className={`text-xs font-black text-slate-500 uppercase tracking-widest ${isRtl ? 'text-right' : 'text-left'}`}>
                {isRtl ? '3. حدد وسيلة السداد المفضلة للرحلة' : '3. Select Premium Payment Option'}
              </h4>

              <div className="space-y-2.5">
                {/* CASH ON SITE AJMAN */}
                <button
                  type="button"
                  onClick={() => handlePaymentSelect('cash')}
                  className={`w-full p-4 rounded-2xl border text-left flex items-start gap-4 hover:border-indigo-500 hover:bg-indigo-50/10 transition cursor-pointer select-none ${
                    selectedPayment === 'cash' 
                      ? 'border-indigo-500 bg-indigo-50/15 dark:bg-indigo-950/20' 
                      : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/60'
                  } ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}
                >
                  <div className="p-2 bg-emerald-100 dark:bg-emerald-950 text-emerald-500 rounded-xl mt-0.5">
                    <Store className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className={`flex items-center gap-1.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {isRtl ? 'نقداً بمكتبنا بفرع عجمان' : 'Cash on site at Ajman Office'}
                      </span>
                      <span className="bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase font-mono">
                        {isRtl ? 'فوري ومجاني' : 'Instant Confirmation'}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      {isRtl ? 'تفضل بزيارة فرع عجمان الشاطئي لتسليم النقد واستلام الإيصال والفيزا.' : 'Pay currency on site & collect original certified passes.'}
                    </p>
                  </div>
                </button>

                {/* ONLINE CARDS */}
                <button
                  type="button"
                  onClick={() => handlePaymentSelect('card')}
                  className={`w-full p-4 rounded-2xl border text-left flex items-start gap-4 hover:border-indigo-500 hover:bg-indigo-50/10 transition cursor-pointer select-none ${
                    selectedPayment === 'card' 
                      ? 'border-indigo-500 bg-indigo-50/15 dark:bg-indigo-950/20' 
                      : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/60'
                  } ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}
                >
                  <div className="p-2 bg-sky-100 dark:bg-sky-950 text-sky-500 rounded-xl mt-0.5">
                    <CreditCard className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className={`flex items-center gap-1.5 ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {isRtl ? 'بطاقات ائتمان فيزا وماستركارد' : 'Online Cards, Visa & Mastercard'}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      {isRtl ? 'سداد فوري وسريع ومؤمن بشهادات الحماية تامة الصلاحية.' : 'Credit / Debit automated direct payment securely processed.'}
                    </p>
                  </div>
                </button>

                {/* TABBY SPLIT PAYMENTS */}
                <button
                  type="button"
                  onClick={() => handlePaymentSelect('tabby')}
                  className={`w-full p-4 rounded-2xl border text-left flex items-start gap-4 hover:border-indigo-500 hover:bg-indigo-50/10 transition cursor-pointer select-none ${
                    selectedPayment === 'tabby' 
                      ? 'border-indigo-500 bg-indigo-50/15 dark:bg-indigo-950/20' 
                      : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/60'
                  } ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}
                >
                  <div className="p-2 bg-purple-100 dark:bg-purple-950 text-purple-500 rounded-xl mt-0.5">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className={`flex items-center gap-1.5 flex-wrap ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {isRtl ? 'تقسيط تابي (Tabby)' : 'Tabby Split Payments'}
                      </span>
                      <span className="bg-purple-50 dark:bg-purple-950/40 text-purple-500 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase font-mono">
                        {isRtl ? 'بدون رسوم إضافية' : '4 splits'}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      {isRtl ? 'قسّم تكلفة رحلتك إلى 4 دفعات مريحة ومتوافقة مع الشريعة.' : 'Split holiday cost into 4 monthly payments with zero fees.'}
                    </p>
                  </div>
                </button>

                {/* TAMARA SPLIT PAYMENTS */}
                <button
                  type="button"
                  onClick={() => handlePaymentSelect('tamara')}
                  className={`w-full p-4 rounded-2xl border text-left flex items-start gap-4 hover:border-indigo-500 hover:bg-indigo-50/10 transition cursor-pointer select-none ${
                    selectedPayment === 'tamara' 
                      ? 'border-indigo-500 bg-indigo-50/15 dark:bg-indigo-950/20' 
                      : 'border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/60'
                  } ${isRtl ? 'flex-row-reverse text-right' : 'text-left'}`}
                >
                  <div className="p-2 bg-amber-100 dark:bg-amber-950 text-amber-500 rounded-xl mt-0.5">
                    <Wallet className="w-5 h-5" />
                  </div>
                  <div className="flex-1 space-y-0.5">
                    <div className={`flex items-center gap-1.5 flex-wrap ${isRtl ? 'flex-row-reverse' : ''}`}>
                      <span className="font-extrabold text-sm text-slate-900 dark:text-white">
                        {isRtl ? 'تقسيط تمارا (Tamara)' : 'Tamara Split Payments'}
                      </span>
                      <span className="bg-amber-50 dark:bg-amber-950/40 text-amber-500 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase font-mono">
                        {isRtl ? 'دفع مرن' : 'Flexible split'}
                      </span>
                    </div>
                    <p className="text-[10px] text-slate-400">
                      {isRtl ? 'قسّم فاتورة السفر والسياحة بكل يسر وسهولة.' : 'Split payments dynamically with Tamara smart planner.'}
                    </p>
                  </div>
                </button>
              </div>

            </div>

            {/* Error Feedback */}
            {errorMsg && (
              <div className={`p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 text-rose-500 text-xs font-bold border border-rose-100 dark:border-rose-950/40 flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                <AlertCircle className="w-4 h-4" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Complete Checkout Action */}
            <button
              onClick={handleCheckoutSubmit}
              disabled={!bookingDestination}
              className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-indigo-600 hover:from-indigo-600 hover:via-purple-600 hover:to-indigo-700 text-white font-extrabold py-3.5 rounded-2xl text-xs md:text-sm shadow-lg flex items-center justify-center gap-2 transition disabled:opacity-40 select-all cursor-pointer"
            >
              <Sparkles className="w-4.5 h-4.5 animate-pulse" />
              <span>{isRtl ? 'إكمال وتأكيد الحجز الفوري ✈️' : 'Authorize & Complete Booking ✈️'}</span>
              <ArrowRight className={`w-4 h-4 ${isRtl ? 'rotate-180' : ''}`} />
            </button>
          </div>
        </div>

      </div>

      {/* POPMODAL: UNDER DEVELOPMENT WARNING */}
      <AnimatePresence>
        {devNoticeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => {
                setDevNoticeOpen(false);
                setSelectedPayment('cash'); // Reset back to Cash as safe default
              }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            {/* Popup Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white dark:bg-slate-900 w-full max-w-sm rounded-3xl p-6 border border-slate-100 dark:border-slate-800 shadow-2xl z-50 text-center"
            >
              <div className="w-12 h-12 rounded-full bg-amber-100 dark:bg-amber-950/20 text-amber-500 flex items-center justify-center mx-auto mb-4">
                <AlertCircle className="w-6 h-6 animate-pulse" />
              </div>

              <h3 className="font-extrabold text-base text-slate-900 dark:text-white mb-2">
                {isRtl ? 'بوابة الدفع قيد التطوير!' : 'Payment Gateways in Development'}
              </h3>
              
              <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 leading-relaxed mb-5">
                {isRtl 
                  ? 'يرجى العلم بأن بوابات الدفع الإلكتروني المباشر حالياً تحت التطوير، يسعدنا تواصلكم وانتظار الملاحظة القادمة. يرجى اختيار السداد نقداً بمكتبنا بفرع عجمان للمتابعة الآمنة.' 
                  : 'The online credit card and split-payment gateways (Tabby & Tamara) are in further development, kindly wait until notice. Please choose "Cash on site at Ajman office" for instant secure booking!'}
              </p>

              <button
                type="button"
                onClick={() => {
                  setDevNoticeOpen(false);
                  setSelectedPayment('cash'); // Fallback to safe Cash defaults immediately
                }}
                className="w-full bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-800 dark:text-white font-extrabold py-2.5 rounded-xl text-xs cursor-pointer"
              >
                {isRtl ? 'حسناً، فهمت' : 'Understood, Fallback to Cash'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* POPMODAL: SUCCESS POPUP CHASSIS */}
      <AnimatePresence>
        {successNoticeOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-xs"
            />

            {/* Popup Box */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative bg-white dark:bg-slate-900 w-full max-w-md rounded-3xl p-6.5 border border-slate-100 dark:border-slate-800 shadow-2xl z-50 text-center space-y-4"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/20 text-emerald-500 flex items-center justify-center mx-auto mb-2 border-2 border-emerald-200">
                <CheckCircle className="w-9 h-9" />
              </div>

              <div className="space-y-1">
                <h3 className="font-black text-lg md:text-xl text-slate-900 dark:text-white">
                  {isRtl ? 'تم السداد والحجز بنجاح! 🎉' : 'Booking Order Complete! 🎉'}
                </h3>
                <p className="text-[10px] text-sky-500 font-mono font-black uppercase tracking-widest">
                  FLY-WIDE TOURISM AJMAN HUB
                </p>
              </div>

              <div className="p-4 bg-emerald-50/50 dark:bg-emerald-950/15 rounded-2xl border border-emerald-100 dark:border-emerald-900/20">
                <p className="text-xs md:text-sm font-extrabold text-emerald-700 dark:text-emerald-400 leading-relaxed">
                  {isRtl
                    ? 'تم السداد بنجاح، نتمنى لكم رحلة سعيدة وممتعة للغاية، شكراً لحجزكم مع فلاي-وايد (FLYWIDE).'
                    : 'Payment has been successful, enjoy your trip, thank you for booking with FLYWIDE.'}
                </p>
              </div>

              <p className="text-[11px] text-slate-400 leading-relaxed">
                {isRtl
                  ? 'تم تأكيد حجز قسيمة رحلتك العائلية تلقائياً. يرجى زيارة فرع عجمان الشاطئي لاستلام تذاكر الفيزا الأصلية وجداول الإقامة المطبوعة.'
                  : 'Your physical voucher code has been synchronized. Please review details in passport management history page.'}
              </p>

              <button
                type="button"
                onClick={() => {
                  setSuccessNoticeOpen(false);
                  onSwitchTab('my-bookings'); // Redirect straight to permanent booking dashboard history
                }}
                className="w-full bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-900 font-extrabold py-3 rounded-xl text-xs cursor-pointer shadow-md"
              >
                {isRtl ? 'افتح تاريخ حجوزاتي وطباعة الفاتورة 📋' : 'Go to My Bookings 📋'}
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
