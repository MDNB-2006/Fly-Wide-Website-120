/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  Compass,
  Plane,
  Calendar,
  User,
  Mail,
  FileText,
  CheckCircle,
  MapPin,
  Sparkles,
  ChevronDown,
  Check,
  Globe,
  Coins,
  Ticket,
  ArrowRight,
  AlertCircle,
  Briefcase,
  Layers,
  Heart,
  Undo,
  X,
  Sun,
  Moon,
  ShoppingCart
} from 'lucide-react';

import {
  Language,
  CurrencyCode,
  Destination,
  Booking,
  Notification
} from './types';

import { translations, currencies } from './data/translations';
import { destinationsList, globalSupportedCountries, globalSupportedCountriesAr } from './data/destinations';

import LanguageToggle from './components/LanguageToggle';
import CurrencySelector from './components/CurrencySelector';
import InteractiveMap from './components/InteractiveMap';
import NotificationCenter, { playNotificationChime } from './components/NotificationCenter';
import SecurePayment from './components/SecurePayment';
import Testimonials from './components/Testimonials';
import PackageCard from './components/PackageCard';

import AllDestinations from './components/AllDestinations';
import FlywPoints from './components/FlywPoints';
import AboutUs from './components/AboutUs';
import Extras from './components/Extras';
import Checkout from './components/Checkout';

import { collection, doc, setDoc, updateDoc, deleteDoc, getDocs, query, where } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from './lib/firebase';
import { useAuth } from './contexts/AuthContext';
import AuthModal from './components/AuthModal';


// Helper function to dynamically generate a customized vacation package for any of the 120 countries
const generateCustomPackageForCountry = (countryName: string, lang: 'en' | 'ar'): Destination => {
  let hash = 0;
  for (let i = 0; i < countryName.length; i++) {
    hash = countryName.charCodeAt(i) + ((hash << 5) - hash);
  }
  const positiveHash = Math.abs(hash);
  
  const price = 750 + (positiveHash % 12) * 110;
  const rating = parseFloat((4.5 + (positiveHash % 5) * 0.1).toFixed(2));
  const duration = 5 + (positiveHash % 5);
  
  const continents: any[] = ['Europe', 'Asia', 'Americas', 'Africa', 'Oceania', 'Middle East'];
  const continent = continents[positiveHash % continents.length];
  
  const sceneryTypes: any[] = ['mountain', 'beach', 'desert', 'jungle', 'city'];
  const sceneryType = sceneryTypes[positiveHash % sceneryTypes.length];
  
  const gradients = [
    'from-pink-300 via-rose-300 to-indigo-300',
    'from-blue-300 via-cyan-300 to-emerald-300',
    'from-amber-200 via-orange-300 to-rose-300',
    'from-teal-200 via-cyan-300 to-sky-400',
    'from-orange-300 via-amber-300 to-yellow-200',
    'from-violet-300 via-fuchsia-300 to-sky-300'
  ];
  const themeGradient = gradients[positiveHash % gradients.length];

  // Map to find accurate Arabic translation in our static database array
  const englishIdx = globalSupportedCountries.findIndex(c => c.toLowerCase() === countryName.toLowerCase());
  const arabicIdx = globalSupportedCountriesAr.findIndex((_, idx) => idx === englishIdx);
  const countryAr = englishIdx !== -1 ? globalSupportedCountriesAr[englishIdx] : 'وجهة خاصة';
  const finalCountryEn = englishIdx !== -1 ? globalSupportedCountries[englishIdx] : countryName;

  return {
    id: `custom-${finalCountryEn.toLowerCase().replace(/\s+/g, '-')}`,
    name: `${finalCountryEn} Family Dream Vacation`,
    nameAr: `رحلة الأحلام العائلية في ${countryAr}`,
    country: finalCountryEn,
    countryAr: countryAr,
    continent: continent,
    priceUSD: price,
    rating: rating,
    durationDays: duration,
    description: `A magical pre-arranged guided journey to discover the historical monuments, playful parks, and local delicacies of ${finalCountryEn}!`,
    descriptionAr: `رحلة سحرية منسقة بصحبة مرشدين سياحيين لاستكشاف المعالم التاريخية والحدائق الترفيهية الفسيحة في ${countryAr}!`,
    themeGradient: themeGradient,
    sceneryType: sceneryType,
    highlights: ['Bilingual Local Guide', 'All-Inclusive Family Dining', 'Theme-Park Fast Pass'],
    highlightsAr: ['مرشد محلي يتكلم لغتين', 'وجبات عائلية متكاملة شاملة', 'بطاقة دخول الألعاب الترفيهية']
  };
};

export default function App() {
  const { user, profile, isDemoUser, logout } = useAuth();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  
  const [lang, setLang] = useState<Language>('en');
  const [currency, setCurrency] = useState<CurrencyCode>('USD');
  const [theme, setTheme] = useState<'light' | 'dark'>(() => {
    try {
      const saved = localStorage.getItem('fly_wide_theme');
      if (saved === 'light' || saved === 'dark') {
        return saved;
      }
    } catch (e) {
      // Ignored
    }
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }
    return 'light';
  });

  useEffect(() => {
    try {
      if (theme === 'dark') {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      localStorage.setItem('fly_wide_theme', theme);
    } catch (e) {
      // Ignored
    }
  }, [theme]);

  const [activeTab, setActiveTab] = useState<'explore' | 'packages' | 'all-destinations' | 'flyw-points' | 'extras' | 'my-bookings' | 'about-us' | 'checkout'>('explore');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('');
  
  // Selected country card generated from search/click on 120 list
  const [clickedAdditionalCountry, setClickedAdditionalCountry] = useState<string | null>(null);

  // Active items for booking process and checkout process
  const [bookingDestination, setBookingDestination] = useState<Destination | null>(null);
  const [activePaymentBooking, setActivePaymentBooking] = useState<Booking | null>(null);

  // Forms states
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    passportNumber: '',
    travelDate: '',
    guests: 1
  });

  // Bookings list state, sync to localStorage
  const [bookings, setBookings] = useState<Booking[]>(() => {
    try {
      const saved = localStorage.getItem('fly_wide_bookings');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Notifications state, pre-populated with actual flight chimes
  const [notifications, setNotifications] = useState<Notification[]>(() => {
    return [
      {
        id: 'notif-1',
        title: 'Flight Gate Change ✈️',
        titleAr: 'تغيير بوابة رحلة طيران ✈️',
        message: 'FLY-WIDE flight FW-302 to Tokyo now departs from Gate A12. Grab free cherry-blossom candy cups at our premium lounge!',
        messageAr: 'تغادر رحلة فلاي-وايد رقم FW-302 إلى طوكيو الآن من البوابة A12. تتوفر أكواب حلوى الكرز المجانية في صالتنا الراقية!',
        timestamp: 'Just now',
        type: 'warning'
      },
      {
        id: 'notif-2',
        title: 'Flash Sale Alert! 🎒',
        titleAr: 'تنبيه عرض خاطف مذهل! 🎒',
        message: 'Book any luxury Maldives reef escape today and secure a free child glass-bottom boat tour pass.',
        messageAr: 'احجز أي رحلة لشعاب المالديف المرجانية المميزة اليوم واحصل مجاناً على بطاقة قارب زجاجي للأطفال.',
        timestamp: '15 mins ago',
        type: 'success'
      }
    ];
  });

  // Save bookings to localStorage
  useEffect(() => {
    localStorage.setItem('fly_wide_bookings', JSON.stringify(bookings));
  }, [bookings]);

  // Load and sync bookings from Firebase if logged in
  useEffect(() => {
    const fetchCloudBookings = async () => {
      const uid = profile?.uid || user?.uid;
      if (!uid) return;

      try {
        const bookingsRef = collection(db, 'bookings');
        const q = query(bookingsRef, where('userId', '==', uid));
        const querySnapshot = await getDocs(q);
        
        const cloudBookings: Booking[] = [];
        querySnapshot.forEach((doc) => {
          cloudBookings.push(doc.data() as Booking);
        });

        // If local entries exist, merge and upload them to Firestore, then refresh
        const localUnsaved = bookings.filter(b => !cloudBookings.some(cb => cb.id === b.id));
        if (localUnsaved.length > 0) {
          const batchPromises = localUnsaved.map(async (bk) => {
            const uploadedBk = { ...bk, userId: uid };
            await setDoc(doc(db, 'bookings', bk.id), uploadedBk);
            return uploadedBk;
          });
          const uploaded = await Promise.all(batchPromises);
          
          // Combine both newly uploaded bookings and existing cloud bookings
          const combined = [...uploaded];
          cloudBookings.forEach(cb => {
            if (!combined.some(c => c.id === cb.id)) {
              combined.push(cb);
            }
          });
          setBookings(combined);
          
          // Show positive notification
          const count = localUnsaved.length;
          const syncNotif: Notification = {
            id: `notif-sync-${Date.now()}`,
            title: lang === 'ar' ? 'تمت مزامنة الحجوزات السابقة ☁️' : 'Past Bookings Synced! ☁️',
            titleAr: 'تمت مزامنة الحجوزات السابقة ☁️',
            message: lang === 'ar' 
              ? `تم ربط ${count} حجز محلي بحسابك في السحابة فايربيز بنجاح!` 
              : `Uploaded ${count} unsaved booking(s) to your permanent Firebase database profile!`,
            messageAr: `تم ربط ${count} حجز محلي بحسابك في السحابة فايربيز بنجاح!`,
            timestamp: 'Just now',
            type: 'success'
          };
          setNotifications(prev => [syncNotif, ...prev]);
        } else {
          setBookings(cloudBookings);
        }
      } catch (err) {
        console.error("Failed to load/sync bookings from Firestore:", err);
      }
    };

    if (profile || user) {
      fetchCloudBookings();
    }
  }, [profile, user]);

  // Handle restoring local storage cache when logging out
  useEffect(() => {
    if (!profile && !user) {
      try {
        const saved = localStorage.getItem('fly_wide_bookings');
        setBookings(saved ? JSON.parse(saved) : []);
      } catch {
        setBookings([]);
      }
    }
  }, [profile, user]);

  // Auto-fill booking form details when user profile is verified and active
  useEffect(() => {
    if (bookingDestination) {
      setFormData(prev => ({
        ...prev,
        fullName: profile?.fullName || user?.displayName || prev.fullName,
        email: profile?.email || user?.email || prev.email,
        passportNumber: profile?.passportNumber || prev.passportNumber || '',
      }));
    }
  }, [bookingDestination, profile, user]);

  // Inject a simulated real-time push alert after 16 seconds to demonstrate notification capabilities
  useEffect(() => {
    const timer = setTimeout(() => {
      const extraAlert: Notification = {
        id: `notif-${Date.now()}`,
        title: 'Middle East Air Discount! 🌟',
        titleAr: 'خصم الطيران الخاص بالشرق الأوسط! 🌟',
        message: 'Global travel update: A 15% automatic cashback discount is applied to all Saudi & UAE flights reserved in the next hour.',
        messageAr: 'تحديث فوري: تم تفعيل استرداد نقدي ١٥٪ لكل تذاكر الطيران المتجهة للمملكة العربية السعودية والإمارات المحجوزة هذه الساعة.',
        timestamp: 'Just now',
        type: 'info'
      };
      setNotifications(prev => [extraAlert, ...prev]);
      playNotificationChime();
    }, 16000);
    return () => clearTimeout(timer);
  }, []);

  const t = translations[lang];
  const isRtl = lang === 'ar';

  const handleDismissNotification = (id: string) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const handleClearNotifications = () => {
    setNotifications([]);
  };

  // Compile active search matching including packages AND generated 120 countries
  const activeDisplayedPackages = useMemo(() => {
    // 1. Filter default packages
    let list = [...destinationsList];

    // Filter by continent filter
    if (selectedContinent) {
      list = list.filter(d => d.continent === selectedContinent);
    }

    // Filter by search query on countries
    if (searchQuery.trim().length > 0) {
      const query = searchQuery.toLowerCase();
      
      // Filter original array
      const matchesOriginal = list.filter(d => 
        d.name.toLowerCase().includes(query) || 
        d.nameAr.includes(query) || 
        d.country.toLowerCase().includes(query) || 
        d.countryAr.includes(query) ||
        d.continent.toLowerCase().includes(query)
      );

      // Look up our database of 120 countries for additional matches to generate cards dynamically
      const matchedAdditionalCountryNames = globalSupportedCountries.filter(c => 
        c.toLowerCase().includes(query) && !destinationsList.some(d => d.country.toLowerCase() === c.toLowerCase())
      );

      // Look up Arabic translations list
      const matchedAdditionalArabicCountryNames = globalSupportedCountriesAr.reduce<string[]>((acc, cAr, idx) => {
        if (cAr.includes(query)) {
          const correspondingEn = globalSupportedCountries[idx];
          if (correspondingEn && !destinationsList.some(d => d.country.toLowerCase() === correspondingEn.toLowerCase())) {
            acc.push(correspondingEn);
          }
        }
        return acc;
      }, []);

      const unitedExtraCountryNames = Array.from(new Set([...matchedAdditionalCountryNames, ...matchedAdditionalArabicCountryNames]));

      // Instantiate dynamic package cards!
      const generatedPacks = unitedExtraCountryNames.map(cName => generateCustomPackageForCountry(cName, lang));

      return [...matchesOriginal, ...generatedPacks];
    }

    // If client clicked on a specific additional country from the 120 bento tray
    if (clickedAdditionalCountry) {
      const generated = generateCustomPackageForCountry(clickedAdditionalCountry, lang);
      // Put it at the front of the list
      list = [generated, ...list];
    }

    return list;
  }, [searchQuery, selectedContinent, clickedAdditionalCountry, lang]);

  const handleBookInitiate = (dest: Destination) => {
    setBookingDestination(dest);
    // Reset forms
    setFormData({
      fullName: '',
      email: '',
      passportNumber: '',
      travelDate: new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0], // 1 week buffer
      guests: 1
    });
  };

  const handleBookFromAllDestinations = (countryName: string, customPriceUSD?: number, continent?: string, guestCount?: number) => {
    const customDest = generateCustomPackageForCountry(countryName, lang);
    if (customPriceUSD) {
      customDest.priceUSD = Math.round(customPriceUSD);
    }
    handleBookInitiate(customDest);
    if (guestCount) {
      setFormData(prev => ({ ...prev, guests: guestCount }));
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingDestination) return;

    // Direct transition to the advanced multi-gateway Checkout tab with all current passenger entries synchronized!
    setActiveTab('checkout');
  };

  const handlePaymentSuccess = async (bookingId: string) => {
    const uid = profile?.uid || user?.uid;
    if (uid) {
      try {
        await updateDoc(doc(db, 'bookings', bookingId), { status: 'completed' });
      } catch (err) {
        console.error("error updating booking status on firestore:", err);
      }
    }

    setBookings(prev => prev.map(b => {
      if (b.id === bookingId) {
        return { ...b, status: 'completed' as const };
      }
      return b;
    }));

    // Update active pay booking screen
    if (activePaymentBooking && activePaymentBooking.id === bookingId) {
      setActivePaymentBooking(prev => prev ? { ...prev, status: 'completed' } : null);
    }

    // Sound chime and notify success
    const completedBooking = bookings.find(b => b.id === bookingId);
    const destLabelEn = completedBooking ? completedBooking.destinationName : 'world package';
    const destLabelAr = completedBooking ? completedBooking.destinationNameAr : 'الباقة المطلوبة';

    const okAlert: Notification = {
      id: `notif-${Date.now()}`,
      title: lang === 'ar' ? 'تم تأكيد تذاكر الطيران! 🛡️' : 'Flight Issued & Secured! 🛡️',
      titleAr: 'تم تأكيد تذاكر الطيران! 🛡️',
      message: lang === 'ar' 
        ? `تهانينا! حجزك لـ ${destLabelAr} مؤكد بالكامل. فحص الإيميل لتحميل دليل السفر.`
        : `Congratulations! Your family adventure to ${destLabelEn} is 100% authorized. Pack your suitcases!`,
      messageAr: `تهانينا! حجزك لـ ${destLabelAr} مؤكد بالكامل. فحص الإيميل لتحميل دليل السفر.`,
      timestamp: 'Just now',
      type: 'success'
    };
    setNotifications(prev => [okAlert, ...prev]);
    playNotificationChime();
  };

  const handleCancelBooking = async (id: string) => {
    const uid = profile?.uid || user?.uid;
    if (uid) {
      try {
        await deleteDoc(doc(db, 'bookings', id));
      } catch (err) {
        console.error("error deleting booking on firestore:", err);
      }
    }

    setBookings(prev => prev.filter(b => b.id !== id));
    if (activePaymentBooking?.id === id) {
      setActivePaymentBooking(null);
    }
  };

  // List of countries excluding the 8 main showcases to prevent duplicates in layout UI
  const additionalCountriesDisplayList = useMemo(() => {
    return globalSupportedCountries.filter(country => 
      !destinationsList.some(d => d.country.toLowerCase() === country.toLowerCase())
    );
  }, []);

  return (
    <div
      dir={isRtl ? 'rtl' : 'ltr'}
      className={`min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 font-sans transition-colors duration-300 pb-12`}
    >
      
      {/* Sticky Premium Navbar (Apple style layout) */}
      <header className="sticky top-0 z-40 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200/40 dark:border-slate-800/80 shadow-sm transition-all duration-300">
        <div className="w-full max-w-[1536px] xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-10 py-4.5 md:py-5 flex items-center justify-between gap-4 lg:gap-8 xl:gap-12">
          
          {/* Logo & Brand text */}
          <div className="flex items-center gap-3.5 md:gap-4 flex-shrink-0 whitespace-nowrap pr-2 lg:pr-4" id="top-branding-logo">
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-tr from-sky-400 via-indigo-500 to-indigo-600 flex items-center justify-center text-white shadow-md transform hover:rotate-12 transition-transform duration-300 cursor-pointer flex-shrink-0">
              <Plane className="w-5.5 h-5.5 md:w-6 md:h-6 transform rotate-45" />
            </div>
            <div className="flex flex-col items-start leading-none gap-1.5 animate-fade-in">
              <span className="font-extrabold text-xl md:text-2xl tracking-tight bg-gradient-to-r from-sky-500 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                FLY-WIDE
              </span>
              <span className="text-[9px] md:text-[10px] uppercase font-black text-indigo-400 dark:text-indigo-400 tracking-widest leading-none">
                {isRtl ? 'للسياحة والسفر السعيد' : 'HAPPY TRAVELS'}
              </span>
            </div>
          </div>

          {/* Navigation tabs link (Multipage feel) */}
          <nav className="hidden lg:flex items-center p-1.5 bg-slate-100 dark:bg-slate-800 rounded-full border border-slate-200/50 shadow-inner max-w-full gap-1.5 mx-2 lg:mx-4 xl:mx-8 flex-shrink">
            <button
              onClick={() => { setActiveTab('explore'); setActivePaymentBooking(null); }}
              className={`px-3 xl:px-4.5 py-2 rounded-full text-xs xl:text-[13px] font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'explore'
                  ? 'bg-white dark:bg-slate-900 border border-slate-200/10 shadow text-sky-500 font-extrabold px-4.5 xl:px-5.5'
                  : 'text-slate-500 dark:text-slate-300 hover:text-sky-500 hover:bg-white/40 dark:hover:bg-slate-900/40'
              }`}
            >
              <span>🗺️</span>
              <span>{isRtl ? 'الاستكشاف' : 'Explore Map'}</span>
            </button>
            <button
              onClick={() => { setActiveTab('packages'); setActivePaymentBooking(null); }}
              className={`px-3 xl:px-4.5 py-2 rounded-full text-xs xl:text-[13px] font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'packages'
                  ? 'bg-white dark:bg-slate-900 border border-slate-200/10 shadow text-sky-500 font-extrabold px-4.5 xl:px-5.5'
                  : 'text-slate-500 dark:text-slate-300 hover:text-sky-500 hover:bg-white/40 dark:hover:bg-slate-900/40'
              }`}
            >
              <span>🎒</span>
              <span>{isRtl ? 'باقات السفر' : 'Packages'}</span>
            </button>
            <button
              onClick={() => { setActiveTab('all-destinations'); setActivePaymentBooking(null); }}
              className={`px-3 xl:px-4.5 py-2 rounded-full text-xs xl:text-[13px] font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'all-destinations'
                  ? 'bg-white dark:bg-slate-900 border border-slate-200/10 shadow text-sky-500 font-extrabold px-4.5 xl:px-5.5'
                  : 'text-slate-500 dark:text-slate-300 hover:text-sky-500 hover:bg-white/40 dark:hover:bg-slate-900/40'
              }`}
            >
              <span>🌏</span>
              <span>{isRtl ? 'جميع الوجهات الـ ١٢٠' : 'All 120 Destinations'}</span>
            </button>
            <button
              onClick={() => { setActiveTab('flyw-points'); setActivePaymentBooking(null); }}
              className={`px-3 xl:px-4.5 py-2 rounded-full text-xs xl:text-[13px] font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'flyw-points'
                  ? 'bg-white dark:bg-slate-900 border border-slate-200/10 shadow text-sky-500 font-extrabold px-4.5 xl:px-5.5'
                  : 'text-slate-500 dark:text-slate-300 hover:text-sky-500 hover:bg-white/40 dark:hover:bg-slate-900/40'
              }`}
            >
              <span>🌟</span>
              <span>{isRtl ? 'مكافآت فلايو' : 'Flyw Points'}</span>
            </button>
            <button
              onClick={() => { setActiveTab('extras'); setActivePaymentBooking(null); }}
              className={`px-3 xl:px-4.5 py-2 rounded-full text-xs xl:text-[13px] font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer relative whitespace-nowrap ${
                activeTab === 'extras'
                  ? 'bg-white dark:bg-slate-900 border border-slate-200/10 shadow text-sky-500 font-extrabold px-4.5 xl:px-5.5'
                  : 'text-slate-500 dark:text-slate-300 hover:text-sky-500 hover:bg-white/40 dark:hover:bg-slate-900/40'
              }`}
            >
              <span>🏷️</span>
              <span>{isRtl ? 'المزايا والإضافات' : 'Extras 10% Off'}</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 absolute -top-0.5 -right-0.5 animate-ping" />
            </button>
            <button
              onClick={() => { setActiveTab('my-bookings'); }}
              className={`px-3 xl:px-4.5 py-2 rounded-full text-xs xl:text-[13px] font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer relative whitespace-nowrap ${
                activeTab === 'my-bookings'
                  ? 'bg-white dark:bg-slate-900 border border-slate-200/10 shadow text-sky-500 font-extrabold px-4.5 xl:px-5.5'
                  : 'text-slate-500 dark:text-slate-300 hover:text-sky-500 hover:bg-white/40 dark:hover:bg-slate-900/40'
              }`}
            >
              <span>📋</span>
              <span>{isRtl ? 'رحلاتي وحجوزاتي' : 'My Bookings History'}</span>
              {bookings.length > 0 && (
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 absolute -top-0.5 -right-0.5 animate-ping" />
              )}
            </button>
            <button
              onClick={() => { setActiveTab('about-us'); setActivePaymentBooking(null); }}
              className={`px-3 xl:px-4.5 py-2 rounded-full text-xs xl:text-[13px] font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer whitespace-nowrap ${
                activeTab === 'about-us'
                  ? 'bg-white dark:bg-slate-900 border border-slate-200/10 shadow text-sky-500 font-extrabold px-4.5 xl:px-5.5'
                  : 'text-slate-500 dark:text-slate-300 hover:text-sky-500 hover:bg-white/40 dark:hover:bg-slate-900/40'
              }`}
            >
              <span>🏢</span>
              <span>{isRtl ? 'من نحن وفرعنا' : 'About Us & Shop'}</span>
            </button>
          </nav>

          {/* Dual-language & Multi-currency controls & Notifications dropdown */}
          <div className="flex items-center gap-3.5 xl:gap-5 flex-shrink-0 pl-2 lg:pl-4">
            <CurrencySelector
              selectedCurrency={currency}
              onCurrencyChange={setCurrency}
              lang={lang}
            />
            <LanguageToggle
              currentLang={lang}
              onLanguageChange={setLang}
            />
            {/* Custom Theme Switcher (Sun: Light mode, Moon: Dark mode) */}
            <div className="flex items-center bg-slate-100/90 dark:bg-slate-900/90 p-1 rounded-full border border-slate-200/50 dark:border-slate-800/80 shadow-sm gap-1">
              <button
                onClick={() => setTheme('light')}
                className={`p-1.5 px-2.5 rounded-full flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer transition-all duration-300 ${
                  theme === 'light'
                    ? 'bg-white text-amber-500 shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-600 dark:text-slate-500 dark:hover:text-amber-400'
                }`}
                title={lang === 'ar' ? 'الوضع النهاري (أبيض)' : 'Daylight Mode (White)'}
                aria-label="Light Mode"
                id="theme-light-btn"
              >
                <Sun className={`w-4 h-4 transition-transform duration-500 ${theme === 'light' ? 'rotate-45' : 'hover:scale-110'}`} />
                <span className="hidden sm:inline text-[10px] uppercase font-bold tracking-wider">
                  {lang === 'ar' ? 'أبيض' : 'Light'}
                </span>
              </button>
              
              <button
                onClick={() => setTheme('dark')}
                className={`p-1.5 px-2.5 rounded-full flex items-center justify-center gap-1.5 text-xs font-semibold cursor-pointer transition-all duration-300 ${
                  theme === 'dark'
                    ? 'bg-slate-800 text-indigo-400 shadow-md font-bold'
                    : 'text-slate-400 hover:text-slate-600 dark:text-slate-400 dark:hover:text-indigo-400'
                }`}
                title={lang === 'ar' ? 'الوضع الليلي (داكن)' : 'Night Mode (Dark)'}
                aria-label="Dark Mode"
                id="theme-dark-btn"
              >
                <Moon className={`w-4 h-4 transition-transform duration-500 ${theme === 'dark' ? 'scale-105' : 'hover:-rotate-12'}`} />
                <span className="hidden sm:inline text-[10px] uppercase font-bold tracking-wider">
                  {lang === 'ar' ? 'داكن' : 'Dark'}
                </span>
              </button>
            </div>

            {/* Premium Checkout & Cart badge */}
            <button
              onClick={() => { setActiveTab('checkout'); setActivePaymentBooking(null); }}
              className={`p-2.5 rounded-full flex items-center justify-center relative border transition-all duration-300 cursor-pointer ${
                activeTab === 'checkout'
                  ? 'bg-indigo-50 border-indigo-200 dark:bg-slate-900 dark:border-slate-800 text-sky-500 font-extrabold'
                  : 'bg-white dark:bg-slate-900 border-slate-200/50 dark:border-slate-800 text-slate-400 hover:text-sky-500'
              }`}
              title={lang === 'ar' ? 'العربة وحساب السداد' : 'Cart & Checkout'}
              id="header-cart-btn-desktop"
            >
              <ShoppingCart className="w-4 h-4" />
              {bookingDestination && (
                <span className="absolute -top-1.5 -right-1.5 w-4.5 h-4.5 bg-rose-500 text-white rounded-full text-[9px] font-black flex items-center justify-center animate-bounce">
                  1
                </span>
              )}
            </button>

            <NotificationCenter
              notifications={notifications}
              onDismiss={handleDismissNotification}
              onClearAll={handleClearNotifications}
              lang={lang}
            />

            {/* Secures Register & Check-In Profiles */}
            {(user || isDemoUser) ? (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="py-1.5 px-3 md:px-3.5 rounded-full hover:scale-105 active:scale-95 bg-gradient-to-tr from-sky-400 to-indigo-500 hover:from-sky-500 hover:to-indigo-600 text-white shadow-md font-extrabold text-xs transition duration-300 flex items-center gap-1.5 cursor-pointer"
                id="navbar-profile-btn"
                title={lang === 'ar' ? 'الملف الشخصي الآمن' : 'Secured Passenger Profile'}
              >
                <div className="w-4.5 h-4.5 rounded-full bg-white/20 flex items-center justify-center text-[10px] font-black uppercase flex-shrink-0">
                  {(profile?.fullName || user?.email || 'U')[0]}
                </div>
                <span className="max-w-[90px] truncate hidden sm:inline-block">
                  {profile?.fullName || user?.displayName || user?.email?.split('@')[0]}
                </span>
              </button>
            ) : (
              <button
                onClick={() => setIsAuthModalOpen(true)}
                className="py-1.5 px-3 rounded-full hover:scale-105 active:scale-95 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700/80 text-slate-700 dark:text-slate-200 font-extrabold text-xs transition duration-300 flex items-center gap-1.5 cursor-pointer shadow-sm"
                id="navbar-login-btn"
              >
                <User className="w-3.5 h-3.5 text-indigo-400" />
                <span>{isRtl ? 'دخول / تسجيل' : 'Sign In'}</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Mobile structural sub-navigation dashboard */}
      <div className="lg:hidden bg-slate-100 dark:bg-slate-900 mx-4 mt-3 rounded-2xl p-1.5 border border-slate-200/50 flex flex-wrap justify-around gap-1">
        <button
          onClick={() => { setActiveTab('explore'); setActivePaymentBooking(null); }}
          className={`px-2.5 py-2.5 rounded-xl text-[10px] font-black tracking-tight text-center transition flex flex-col items-center gap-0.5 cursor-pointer min-w-[70px] ${
            activeTab === 'explore'
              ? 'bg-white dark:bg-slate-800 text-sky-500 shadow-sm'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <span>🗺️</span>
          <span>{isRtl ? 'الاستكشاف' : 'Explore'}</span>
        </button>
        <button
          onClick={() => { setActiveTab('packages'); setActivePaymentBooking(null); }}
          className={`px-2.5 py-2.5 rounded-xl text-[10px] font-black tracking-tight text-center transition flex flex-col items-center gap-0.5 cursor-pointer min-w-[70px] ${
            activeTab === 'packages'
              ? 'bg-white dark:bg-slate-800 text-sky-500 shadow-sm'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <span>🎒</span>
          <span>{isRtl ? 'الباقات' : 'Packages'}</span>
        </button>
        <button
          onClick={() => { setActiveTab('all-destinations'); setActivePaymentBooking(null); }}
          className={`px-2.5 py-2.5 rounded-xl text-[10px] font-black tracking-tight text-center transition flex flex-col items-center gap-0.5 cursor-pointer min-w-[70px] ${
            activeTab === 'all-destinations'
              ? 'bg-white dark:bg-slate-800 text-sky-500 shadow-sm'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <span>🌏</span>
          <span>{isRtl ? 'الـ ١٢٠ بلد' : 'All 120'}</span>
        </button>
        <button
          onClick={() => { setActiveTab('flyw-points'); setActivePaymentBooking(null); }}
          className={`px-2.5 py-2.5 rounded-xl text-[10px] font-black tracking-tight text-center transition flex flex-col items-center gap-0.5 cursor-pointer min-w-[70px] ${
            activeTab === 'flyw-points'
              ? 'bg-white dark:bg-slate-800 text-sky-500 shadow-sm'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <span>🌟</span>
          <span>{isRtl ? 'النقاط' : 'Points'}</span>
        </button>
        <button
          onClick={() => { setActiveTab('extras'); setActivePaymentBooking(null); }}
          className={`px-2.5 py-2.5 rounded-xl text-[10px] font-black tracking-tight text-center transition flex flex-col items-center gap-0.5 cursor-pointer min-w-[70px] ${
            activeTab === 'extras'
              ? 'bg-white dark:bg-slate-800 text-sky-500 shadow-sm'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <span>🏷️</span>
          <span>{isRtl ? 'الإضافات' : 'Extras'}</span>
        </button>
        <button
          onClick={() => { setActiveTab('my-bookings'); }}
          className={`px-2.5 py-2.5 rounded-xl text-[10px] font-black tracking-tight text-center transition flex flex-col items-center gap-0.5 cursor-pointer min-w-[70px] ${
            activeTab === 'my-bookings'
              ? 'bg-white dark:bg-slate-800 text-sky-500 shadow-sm'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <span>📋</span>
          <span>{isRtl ? 'رحلاتي' : 'My Trips'}</span>
        </button>
        <button
          onClick={() => { setActiveTab('about-us'); setActivePaymentBooking(null); }}
          className={`px-2.5 py-2.5 rounded-xl text-[10px] font-black tracking-tight text-center transition flex flex-col items-center gap-0.5 cursor-pointer min-w-[70px] ${
            activeTab === 'about-us'
              ? 'bg-white dark:bg-slate-800 text-sky-500 shadow-sm'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <span>🏢</span>
          <span>{isRtl ? 'فرعنا' : 'About Shop'}</span>
        </button>
        <button
          onClick={() => { setActiveTab('checkout'); setActivePaymentBooking(null); }}
          className={`px-2.5 py-2.5 rounded-xl text-[10px] font-black tracking-tight text-center transition flex flex-col items-center gap-0.5 cursor-pointer min-w-[70px] relative ${
            activeTab === 'checkout'
              ? 'bg-white dark:bg-slate-800 text-sky-500 shadow-sm'
              : 'text-slate-500 dark:text-slate-400'
          }`}
        >
          <span>🛒</span>
          <span>{isRtl ? 'حساب السداد' : 'Checkout'}</span>
          {bookingDestination && (
            <span className="absolute top-1 right-2 w-4.5 h-4.5 bg-rose-500 text-white rounded-full text-[9px] font-black flex items-center justify-center animate-bounce">
              1
            </span>
          )}
        </button>
      </div>

      {/* Hero Header Area (Child Friendly & Apple Inspired Artistry) */}
      <section className="relative overflow-hidden px-4 md:px-8 py-10 md:py-16 text-center max-w-[1536px] xl:max-w-[1720px] mx-auto">
        <div className="absolute inset-0 z-0 opacity-10 dark:opacity-5 pointer-events-none">
          <div className="w-72 h-72 rounded-full bg-sky-400 blur-3xl absolute -left-12 -top-12 animate-pulse" />
          <div className="w-96 h-96 rounded-full bg-indigo-400 blur-3xl absolute -right-20 bottom-0 animate-pulse" />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-1 bg-yellow-400/90 text-slate-900 font-extrabold text-xs px-3.5 py-1 rounded-full shadow-md animate-bounce-slow">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            <span>{isRtl ? 'رحلاتنا تغطي أكثر من ١٢٠ دولة حول العالم!' : 'Servicing 120+ Countries Globally!'}</span>
          </span>

          <h1 className="text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-[1.1] pb-1">
            {t.heroTitle}
          </h1>
          <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm lg:text-base font-semibold leading-relaxed max-w-2xl mx-auto">
            {t.heroSub}
          </p>

          {/* Search container widget */}
          <div className="pt-4 max-w-xl mx-auto">
            <div className="relative bg-white dark:bg-slate-900 p-2 rounded-2xl md:rounded-full border border-slate-200/65 dark:border-slate-800 shadow-lg flex flex-col md:flex-row items-center gap-1.5 focus-within:border-sky-400 transition-all duration-300 dark:focus-within:border-sky-600">
              <div className="flex-1 w-full flex items-center px-4 gap-2">
                <Search className="w-4 h-4 text-sky-500" />
                <input
                  type="text"
                  placeholder={t.searchPlaceholder}
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setClickedAdditionalCountry(null); // Clear manual selects if searching
                    if (e.target.value) {
                      setActiveTab('packages');
                    }
                  }}
                  className="w-full bg-transparent text-xs font-bold outline-none text-slate-700 dark:text-slate-100"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="text-slate-400 hover:text-slate-600 font-extrabold p-1 text-[10px]"
                  >
                    X
                  </button>
                )}
              </div>
              <button
                onClick={() => {
                  setActiveTab('packages');
                }}
                className="w-full md:w-auto bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-500 hover:to-indigo-600 text-white font-extrabold text-xs px-6 py-2.5 rounded-xl md:rounded-full shadow-md transition-all cursor-pointer"
              >
                {isRtl ? 'ابحث الآن 🚀' : 'Search Now 🚀'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Multipage View Router */}
      <main className="relative z-10">
        <AnimatePresence mode="wait">
          
          {/* SECURE PAYMENT PORTAL VIEW - OVERLAYS DEFAULT TABS IF SELECTED */}
          {activePaymentBooking ? (
            <motion.div
              key="payment-gateway"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              className="max-w-7xl mx-auto px-4 md:px-6"
            >
              <div className="mb-6 flex justify-between items-center max-w-2xl mx-auto">
                <button
                  onClick={() => setActivePaymentBooking(null)}
                  className="text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-sky-500 flex items-center gap-1 cursor-pointer"
                >
                  <Undo className="w-4 h-4" />
                  <span>{isRtl ? 'العودة لرحلاتي' : 'Back to My Trips'}</span>
                </button>
                <div className="flex items-center gap-1 text-[11px] font-mono text-emerald-500 font-bold bg-emerald-50 dark:bg-emerald-950/20 py-1.5 px-3.5 rounded-full border border-emerald-100/60 dark:border-emerald-900/30">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  <span>SECURE CHANNEL ACTIVE</span>
                </div>
              </div>

              <SecurePayment
                booking={activePaymentBooking}
                onPaymentSuccess={handlePaymentSuccess}
                lang={lang}
                currencyCode={currency}
              />
            </motion.div>
          ) : activeTab === 'explore' ? (
            
            /* VIEW 1: MAP EXPLORE HOME */
            <motion.div
              key="explore-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="space-y-12"
            >
              {/* World Interactive Map */}
              <InteractiveMap
                onSelectContinent={setSelectedContinent}
                selectedContinent={selectedContinent}
                destinations={destinationsList}
                onOpenBooking={handleBookInitiate}
                lang={lang}
              />

              {/* Showcase packages matching the filtered continent on interactive map */}
              <div className="max-w-[1536px] xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className={`flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 ${
                  isRtl ? 'md:flex-row-reverse text-right' : 'text-left'
                }`}>
                  <div>
                    <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                      {selectedContinent 
                        ? (isRtl ? `باقات متوفرة في ${selectedContinent} 🎒` : `Featured Packages in ${selectedContinent} 🎒`)
                        : (isRtl ? 'باقات سفاري وجبال وبحار محبوبة للجميع! ✨' : 'Hand-Selected Family Packages! ✨')}
                    </h3>
                    <p className="text-xs text-slate-400 font-semibold">
                      {isRtl 
                        ? 'انقر على بطاقة السفر لملء بيانات جواز السفر والانتقال لبوابة الدفع الآمنة.'
                        : 'Tap any vacation pack to start the passenger credential check in seconds.'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {destinationsList
                    .filter(d => !selectedContinent || d.continent === selectedContinent)
                    .map((dest) => (
                      <PackageCard
                        key={dest.id}
                        destination={dest}
                        currencyCode={currency}
                        onBook={handleBookInitiate}
                        lang={lang}
                      />
                    ))
                  }
                </div>
              </div>

              {/* Quick tray of 120+ Global Countries kids can explore (Artistic Layout) */}
              <div className="max-w-[1536px] xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8">
                <div className="bg-gradient-to-tr from-sky-400/10 via-indigo-400/5 to-purple-400/10 rounded-3xl p-6 md:p-8 border border-sky-100/50 dark:border-sky-900/10">
                  <div className={`text-center max-w-2xl mx-auto mb-6`}>
                    <span className="text-xl">🌟</span>
                    <h3 className="text-lg md:text-xl font-black text-slate-800 dark:text-white mt-1">
                      {isRtl ? 'خزانة الـ ١٢٠ دولة المدهشة 🗺️' : 'Instant 120+ Country Boarding Portal 🗺️'}
                    </h3>
                    <p className="text-[11px] md:text-xs text-slate-500 mt-1">
                      {isRtl 
                        ? 'لا داعي للكتابة! اضغط على أي بلد لتقوم شركة فلاي-وايد بإنشاء باقة عائلية تفاعلية مخصصة له مع الفنادق والمرشدين فوراً!' 
                        : 'No typing needed! Simply click any globetrotting destination below to instantly compile a tailored, fully active package profile!'}
                    </p>
                  </div>

                  {/* Horizontal Scroll bar */}
                  <div className="flex flex-wrap gap-1.5 justify-center max-h-40 overflow-y-auto p-1 scrollbar-thin scrollbar-thumb-sky-300">
                    {additionalCountriesDisplayList.map((country, index) => {
                      const cAr = globalSupportedCountriesAr[globalSupportedCountries.indexOf(country)] || country;
                      const isSelected = clickedAdditionalCountry === country;

                      return (
                        <button
                          key={country}
                          onClick={() => {
                            setClickedAdditionalCountry(country);
                            setActiveTab('packages');
                            setSearchQuery(''); // clear query so active select is clear
                            // Scroll down programmatically
                            setTimeout(() => {
                              const el = document.getElementById('package-cards-grid');
                              el?.scrollIntoView({ behavior: 'smooth' });
                            }, 300);
                          }}
                          className={`px-3 py-1.5 rounded-full text-[10.5px] font-bold border transition-all duration-300 flex items-center gap-1 cursor-pointer ${
                            isSelected
                              ? 'bg-gradient-to-r from-sky-400 to-indigo-500 border-transparent text-white scale-102 shadow'
                              : 'bg-white dark:bg-slate-900 border-slate-200/50 dark:border-slate-800 text-slate-600 dark:text-slate-300 hover:border-sky-300 hover:bg-sky-50/50 dark:hover:bg-sky-950/20'
                          }`}
                        >
                          <span>🗺️</span>
                          <span>{isRtl ? cAr : country}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Testimonials Carousel Section */}
              <Testimonials lang={lang} />
            </motion.div>
          ) : activeTab === 'packages' ? (
            
            /* VIEW 2: SEARCH PACKAGES DIRECT GRID */
            <motion.div
              key="packages-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-[1536px] xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 space-y-10"
              id="package-cards-grid"
            >
              {/* Back breadcrumb if active filters exist */}
              {(searchQuery || selectedContinent || clickedAdditionalCountry) && (
                <div className={`flex justify-between items-center bg-sky-50/75 dark:bg-sky-950/20 p-3.5 rounded-2xl border border-sky-100/60 dark:border-sky-900/30 ${
                  isRtl ? 'flex-row-reverse text-right' : 'text-left'
                }`}>
                  <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                    <p className="text-xs font-bold text-sky-800 dark:text-sky-300">
                      {isRtl 
                        ? `عرض باقات السفر المصفاة حسب ${searchQuery ? `البحث: "${searchQuery}"` : selectedContinent ? `قارة: ${selectedContinent}` : `بلد: ${clickedAdditionalCountry}`}`
                        : `Displaying custom listings filtered by ${searchQuery ? `Search: "${searchQuery}"` : selectedContinent ? `Continent: ${selectedContinent}` : `Country: ${clickedAdditionalCountry}`}`
                      }
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      setSearchQuery('');
                      setSelectedContinent('');
                      setClickedAdditionalCountry(null);
                    }}
                    className="text-[10px] bg-white dark:bg-slate-900 shadow font-extrabold text-indigo-500 hover:text-indigo-600 px-3 py-1 rounded-xl cursor-pointer"
                  >
                    {isRtl ? 'إعادة الإظهار الشامل' : 'Reset Filters'}
                  </button>
                </div>
              )}

              {/* Grid cards */}
              <div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {activeDisplayedPackages.map((dest) => (
                    <PackageCard
                      key={dest.id}
                      destination={dest}
                      currencyCode={currency}
                      onBook={handleBookInitiate}
                      lang={lang}
                    />
                  ))}

                  {activeDisplayedPackages.length === 0 && (
                    <div className="col-span-full py-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-dashed border-slate-200 dark:border-slate-800 p-8">
                      <div className="w-16 h-16 rounded-full bg-amber-50 dark:bg-amber-950/20 flex items-center justify-center mx-auto mb-3 text-amber-500">
                        <AlertCircle className="w-8 h-8" />
                      </div>
                      <h4 className="font-extrabold text-base text-slate-800 dark:text-white">
                        {isRtl ? 'لم نجد تلك المحطة بالتحديد!' : 'Destination Not Found in Immediate List!'}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                        {isRtl 
                          ? 'لكن لا تقلق! شركة فلاي-وايد تسير رحلات لـ ١٢٠ دولة. اتصل بمرشد المبيعات عبر الواتساب لتأكيد رحلتك المخصصة.'
                          : 'But do not worry! Fly-Wide supports custom flight chimes to over 120 countries. Type any valid country above to generate its dream pass instantly!'}
                      </p>
                      <button
                        onClick={() => {
                          setSearchQuery('');
                          setSelectedContinent('');
                          setClickedAdditionalCountry(null);
                        }}
                        className="mt-4 bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold px-4 py-2 rounded-full text-xs cursor-pointer"
                      >
                        {isRtl ? 'الرجوع للقائمة الافتراضية' : 'Show Default Showcase'}
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ) : activeTab === 'all-destinations' ? (

            /* VIEW: ALL 120 GLOBAL DESTINATIONS */
            <motion.div
              key="all-destinations-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full"
            >
              <AllDestinations 
                lang={lang} 
                onBook={handleBookFromAllDestinations} 
                currencyCode={currency}
                currencyRate={currencies[currency]?.rate || 1}
                currencySymbol={currencies[currency]?.symbol || '$'}
              />
            </motion.div>
          ) : activeTab === 'flyw-points' ? (

            /* VIEW: FLYW REWARDS POINTS METER */
            <motion.div
              key="flyw-points-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full"
            >
              <FlywPoints 
                lang={lang} 
                realBookingsCount={bookings.filter(b => b.status === 'confirmed').length} 
              />
            </motion.div>
          ) : activeTab === 'extras' ? (

            /* VIEW: EXTRAS ADDON BOOKING CENTER WITH 10% OFF */
            <motion.div
              key="extras-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full"
            >
              <Extras
                lang={lang}
                currencyCode={currency}
                currencyRate={currencies[currency]?.rate || 1}
                currencySymbol={currencies[currency]?.symbol || '$'}
                onAddNotification={(title, message, type) => {
                  const newNotif: Notification = {
                    id: `extras-${Date.now()}`,
                    title: title,
                    titleAr: title,
                    message: message,
                    messageAr: message,
                    timestamp: 'Just now',
                    type: type
                  };
                  setNotifications(prev => [newNotif, ...prev]);
                  try {
                    playNotificationChime();
                  } catch (e) {
                    // Ignore sound errors
                  }
                }}
              />
            </motion.div>
          ) : activeTab === 'about-us' ? (

            /* VIEW: ABOUT US STORY & PHYSICAL SHOWROOM */
            <motion.div
              key="about-us-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full"
            >
              <AboutUs lang={lang} />
            </motion.div>
          ) : activeTab === 'checkout' ? (

            /* VIEW: DEDICATED PASSPORT CHECKOUT CART PAGE */
            <motion.div
              key="checkout-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="w-full"
            >
              <Checkout
                bookingDestination={bookingDestination}
                setBookingDestination={setBookingDestination}
                lang={lang}
                currencyCode={currency}
                onBookingComplete={async (newBooking) => {
                  const uid = profile?.uid || user?.uid;
                  if (uid) {
                    newBooking.userId = uid;
                    try {
                      await setDoc(doc(db, 'bookings', newBooking.id), newBooking);
                    } catch (err) {
                      console.error("error submitting checkout booking to firestore:", err);
                    }
                  }
                  setBookings(prev => [newBooking, ...prev]);

                  const alertMsgEn = `Booking completed successfully for ${newBooking.destinationName}! Enjoy your trip with FLYWIDE!`;
                  const alertMsgAr = `تم حجز وسداد تذكرة ${newBooking.destinationNameAr} بنجاح! نتمنى لكم رحلة سعيدة وممتعة للغاية مع FLYWIDE.`;

                  const notif: Notification = {
                    id: `notif-${Date.now()}`,
                    title: lang === 'ar' ? 'اكتمل السداد بنجاح! 🌴' : 'Checkout Payment Successful! 🌴',
                    titleAr: 'اكتمل السداد بنجاح! 🌴',
                    message: lang === 'ar' ? alertMsgAr : alertMsgEn,
                    messageAr: alertMsgAr,
                    timestamp: 'Just now',
                    type: 'success'
                  };
                  setNotifications(prev => [notif, ...prev]);
                }}
                onSwitchTab={(tab) => {
                  setActiveTab(tab);
                  setActivePaymentBooking(null);
                }}
                userProfile={profile}
                initialFullName={formData.fullName}
                initialEmail={formData.email}
                initialPassportNumber={formData.passportNumber}
                initialTravelDate={formData.travelDate}
                initialGuests={formData.guests}
              />
            </motion.div>
          ) : (
            
            /* VIEW 3: MY COMPARED TRIP BOARDINGS & RECEIPTS */
            <motion.div
              key="bookings-tab"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className="max-w-[1536px] xl:max-w-[1720px] mx-auto px-4 md:px-6"
            >
              <div className={`mb-6 flex justify-between items-center ${isRtl ? 'flex-row-reverse' : ''}`}>
                <div>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 dark:text-white tracking-tight">
                    {isRtl ? 'مركز إدارة حجوزاتك وحقائبك 🎒' : 'Fly-Wide Passenger Dashboard 🎒'}
                  </h3>
                  <p className="text-[11px] md:text-xs text-slate-500">
                    {isRtl 
                      ? 'تفقد الفواتير المحفوظة، وحمل بطاقات ركوب الطائرات، أو باشر عمليات السداد المتبقية.' 
                      : 'Authorize pending files, view secure receipts, and retrieve printable family boarding passes.'}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {bookings.map((book) => {
                  const rate = currencies[currency]?.rate || 1;
                  const sym = currencies[currency]?.symbol || '$';
                  const localPrice = Math.round(book.totalCostUSD * rate);

                  return (
                    <div
                      key={book.id}
                      className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition flex flex-col md:flex-row justify-between items-start md:items-center gap-4 relative overflow-hidden"
                    >
                      {/* Left identity details */}
                      <div className={`space-y-1.5 ${isRtl ? 'text-right' : 'text-left'}`}>
                        <div className={`flex flex-wrap items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                          <span className="bg-sky-50 dark:bg-sky-950 font-mono text-[9px] font-bold text-sky-600 dark:text-sky-400 px-2.5 py-0.5 rounded-full border border-sky-100/50 dark:border-sky-900/40">
                            ID: {book.id}
                          </span>
                          <span className="text-[11px] text-slate-400 font-mono">{book.timestamp}</span>
                        </div>

                        <h4 className="text-base md:text-lg font-black text-slate-900 dark:text-white">
                          {isRtl ? book.destinationNameAr : book.destinationName}
                        </h4>

                        {/* Passenger quick row */}
                        <div className={`flex flex-wrap items-center gap-3.5 text-xs text-slate-400 font-medium ${isRtl ? 'flex-row-reverse' : ''}`}>
                          <span className="flex items-center gap-1">👤 {book.fullName}</span>
                          <span className="flex items-center gap-1">📅 {book.travelDate}</span>
                          <span className="flex items-center gap-1">🎟️ {book.guests} {isRtl ? 'مسافرين' : 'guests'}</span>
                        </div>
                      </div>

                      {/* Right dynamic transaction status */}
                      <div className={`flex md:flex-col items-end justify-between md:justify-center w-full md:w-auto border-t md:border-t-0 border-slate-100 dark:border-slate-800 pt-3 md:pt-0 gap-3`}>
                        <div className="text-left">
                          <span className="text-[10px] text-slate-400 font-semibold block uppercase">{isRtl ? 'القيمة الإجمالية' : 'Total Billing'}</span>
                          <span className="text-base md:text-xl font-black text-slate-950 dark:text-white">
                            {sym}{localPrice} <span className="text-xs text-slate-400 font-bold">{currency}</span>
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          {book.status === 'pending_payment' ? (
                            <>
                              <button
                                onClick={() => handleCancelBooking(book.id)}
                                className="px-3 py-1.5 rounded-xl border border-rose-200 text-rose-500 hover:bg-rose-50 text-[10.5px] font-bold cursor-pointer"
                              >
                                {isRtl ? 'إلغاء' : 'Cancel'}
                              </button>
                              <button
                                onClick={() => setActivePaymentBooking(book)}
                                className="px-4 py-1.5 rounded-xl bg-gradient-to-r from-amber-400 to-amber-500 hover:from-amber-500 hover:to-amber-600 text-slate-900 text-[10.5px] font-extrabold shadow flex items-center gap-1 cursor-pointer"
                              >
                                <span>{isRtl ? 'سداد بآمان 💳' : 'Secure Pay 💳'}</span>
                              </button>
                            </>
                          ) : (
                            <div className="flex items-center gap-1 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-500 px-3 py-1.5 rounded-xl border border-emerald-100/60 dark:border-emerald-900/30 text-xs font-bold leading-none">
                              <CheckCircle className="w-3.5 h-3.5" />
                              <span>{isRtl ? 'مدفوع بالكامل' : 'Paid & Confirmed'}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}

                {bookings.length === 0 && (
                  <div className="py-16 text-center bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-slate-800 p-8 shadow-sm">
                    <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto mb-3 text-slate-300">
                      📋
                    </div>
                    <h4 className="font-extrabold text-base text-slate-800 dark:text-white">
                      {isRtl ? 'لم تسجل أي حجوزات حتى الآن' : 'No Travel Bookings Registered!'}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-sm mx-auto">
                      {isRtl 
                        ? 'انقر على خريطة الملاحة الفاتنة، واختر بلد مغامرتك القادم لتعبئة وثائق جواز السفر!'
                        : "Browse vacation packages, test currency conversions, or tap a flying map balloon to reserve your family ticket!"}
                    </p>
                    <button
                      onClick={() => setActiveTab('explore')}
                      className="mt-4 bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-500 hover:to-indigo-600 text-white font-bold px-5 py-2.5 rounded-full text-xs cursor-pointer shadow-md"
                    >
                      {isRtl ? 'افتح خريطة السفر التفاعلية 🗺️' : 'Open Flying World Map 🗺️'}
                    </button>
                  </div>
                )}
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </main>

      {/* ACTIVE MODAL: BOOKING DRAWER FORM CODES */}
      <AnimatePresence>
        {bookingDestination && activeTab !== 'checkout' && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            
            {/* Backdrop layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setBookingDestination(null)}
              className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            />

            {/* Main Popover form */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 15 }}
              className="relative bg-white dark:bg-slate-900 w-full max-w-lg rounded-3xl shadow-2xl p-6 md:p-8 border border-slate-100 dark:border-slate-800 z-50 text-slate-800 dark:text-slate-100 max-h-[90vh] overflow-y-auto"
            >
              <div className={`flex justify-between items-center border-b border-slate-100 dark:border-slate-800 pb-3 mb-5 ${
                isRtl ? 'flex-row-reverse' : ''
              }`}>
                <div className={`flex items-center gap-2 ${isRtl ? 'flex-row-reverse' : ''}`}>
                  <span className="text-2xl">✈️</span>
                  <div>
                    <h3 className="font-extrabold text-base md:text-lg text-slate-900 dark:text-white">
                      {isRtl ? 'توثيق تذكرة الصعود والمغادرة' : 'Boarding Passport Registry'}
                    </h3>
                    <p className="text-[10px] uppercase font-mono tracking-wider text-sky-500">FLY-WIDE OFFICIAL CLEARANCE</p>
                  </div>
                </div>

                <button
                  onClick={() => setBookingDestination(null)}
                  className="p-1 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-rose-50 hover:text-rose-500 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Destination badge summary */}
              <div className={`p-4 rounded-2.5xl bg-gradient-to-r ${bookingDestination.themeGradient} text-white mb-5 relative overflow-hidden flex items-center justify-between ${
                isRtl ? 'flex-row-reverse text-right' : 'text-left'
              }`}>
                <div className="relative z-10">
                  <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-sky-100/90">{bookingDestination.continent}</span>
                  <h4 className="text-base md:text-lg font-black leading-tight">
                    {isRtl ? bookingDestination.nameAr : bookingDestination.name}
                  </h4>
                  <p className="text-[11px] text-white/90 font-medium">📍 {isRtl ? bookingDestination.countryAr : bookingDestination.country}</p>
                </div>
                <div className="text-right z-10">
                  <span className="text-[10px] text-sky-50 block font-bold uppercase">{isRtl ? 'سعر المسافر' : 'Cost / Guest'}</span>
                  <span className="text-xl md:text-2xl font-black">${bookingDestination.priceUSD}</span>
                </div>
              </div>

              {/* Entry Form */}
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="block text-xs font-extrabold text-slate-500 dark:text-slate-400">
                    {isRtl ? 'الاسم الكامل للمسافر (مطابق للجواز)' : 'Passenger Full Name (matching Passport)'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400"><User className="w-4 h-4" /></span>
                    <input
                      type="text"
                      required
                      placeholder={isRtl ? 'مثل: يوسف الحربي الموقر' : 'e.g. Capt. Arthur Dent'}
                      value={formData.fullName}
                      onChange={(e) => setFormData(prev => ({ ...prev, fullName: e.target.value }))}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-bold outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="space-y-1">
                  <label className="block text-xs font-extrabold text-slate-500 dark:text-slate-400">
                    {isRtl ? 'البريد الإلكتروني للإشعارات' : 'Emergency Contact Email'}
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-2.5 text-slate-400"><Mail className="w-4 h-4" /></span>
                    <input
                      type="email"
                      required
                      placeholder="e.g. explorer@flywide.com"
                      value={formData.email}
                      onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                      className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-bold outline-none focus:border-sky-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="block text-xs font-extrabold text-slate-500 dark:text-slate-400">
                      {isRtl ? 'رقم جواز السفر' : 'Passport Number'}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-400"><FileText className="w-4 h-4" /></span>
                      <input
                        type="text"
                        required
                        placeholder="e.g. G-2023910"
                        value={formData.passportNumber}
                        onChange={(e) => setFormData(prev => ({ ...prev, passportNumber: e.target.value.toUpperCase() }))}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-bold outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="block text-xs font-extrabold text-slate-500 dark:text-slate-400">
                      {isRtl ? 'تاريخ المغادرة المفضل' : 'Preferred Departure Date'}
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-2.5 text-slate-400"><Calendar className="w-4 h-4" /></span>
                      <input
                        type="date"
                        required
                        value={formData.travelDate}
                        onChange={(e) => setFormData(prev => ({ ...prev, travelDate: e.target.value }))}
                        className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-950 text-xs font-bold outline-none focus:border-sky-500"
                      />
                    </div>
                  </div>
                </div>

                {/* Traveler counts selector */}
                <div className="space-y-2 pb-2">
                  <div className="flex justify-between items-center">
                    <label className="block text-xs font-extrabold text-slate-500 dark:text-slate-400">
                      {isRtl ? 'عدد أعضاء المغامرة' : 'Travelers Count'}
                    </label>
                    <span className="text-xs font-black text-sky-500 bg-sky-50 dark:bg-sky-950 px-2 py-0.5 rounded-md">
                      {formData.guests} {formData.guests === 1 ? (isRtl ? 'فرد' : 'Person') : (isRtl ? 'أفراد عائلة' : 'People')}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      disabled={formData.guests <= 1}
                      onClick={() => setFormData(prev => ({ ...prev, guests: Math.max(1, prev.guests - 1) }))}
                      className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 font-black text-lg flex items-center justify-center hover:bg-slate-200 hover:text-sky-500 disabled:opacity-40 transition-colors cursor-pointer"
                    >
                      -
                    </button>

                    {/* Direct Numeric Input */}
                    <input
                      type="number"
                      min={1}
                      max={1000}
                      value={formData.guests}
                      onChange={(e) => {
                        const val = parseInt(e.target.value);
                        setFormData(prev => ({ ...prev, guests: isNaN(val) ? 1 : Math.min(1000, Math.max(1, val)) }));
                      }}
                      className="w-16 text-center py-2.5 rounded-xl border border-slate-200 dark:border-slate-850 bg-slate-50 dark:bg-slate-950 font-black text-xs text-slate-900 dark:text-white outline-none focus:border-sky-500 select-all"
                    />

                    {/* Progress Slider */}
                    <input
                      type="range"
                      min={1}
                      max={150}
                      value={formData.guests > 150 ? 150 : formData.guests}
                      onChange={(e) => setFormData(prev => ({ ...prev, guests: parseInt(e.target.value) || 1 }))}
                      className="flex-1 accent-sky-500 h-2.5 bg-slate-100 dark:bg-slate-800 rounded-lg cursor-pointer"
                    />
                    <button
                      type="button"
                      disabled={formData.guests >= 1000}
                      onClick={() => setFormData(prev => ({ ...prev, guests: Math.min(1000, prev.guests + 1) }))}
                      className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-slate-800 font-black text-lg flex items-center justify-center hover:bg-slate-200 hover:text-sky-500 disabled:opacity-40 transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Cost estimate info box */}
                <div className={`p-4 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800/80 flex justify-between items-center ${
                  isRtl ? 'flex-row-reverse text-right' : 'text-left'
                }`}>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase font-bold">{isRtl ? 'إجمالي الحساب التقديري' : 'Estimated Group Cost'}</span>
                    <h4 className="text-sm font-extrabold text-slate-800 dark:text-slate-200">
                      ${bookingDestination.priceUSD} × {formData.guests}
                    </h4>
                  </div>
                  <span className="text-xl md:text-2xl font-black text-sky-500">
                    ${bookingDestination.priceUSD * formData.guests}
                  </span>
                </div>

                {/* Submissions */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 rounded-full bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-500 hover:to-indigo-600 font-black text-white text-xs tracking-wider shadow-lg flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>{isRtl ? 'المتابعة لإتمام الدفع 🛒' : 'Proceed to Checkout 🛒'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </motion.div>

          </div>
        )}
      </AnimatePresence>

      {/* FOOTER */}
      <footer className="max-w-[1536px] xl:max-w-[1720px] mx-auto px-4 sm:px-6 lg:px-8 mt-16 pt-10 border-t border-slate-200/50 dark:border-slate-800/80 font-sans">
        <div className={`flex flex-col md:flex-row justify-between items-center gap-6 text-center md:text-left ${
          isRtl ? 'md:flex-row-reverse text-right' : 'text-left'
        }`}>
          <div className={`space-y-1 ${isRtl ? 'text-right' : 'text-left'}`}>
            <h4 className="font-extrabold text-sm text-slate-800 dark:text-slate-200 flex items-center justify-center md:justify-start gap-1">
              <span>✈️</span>
              <span>FLY-WIDE Global Tours & Travel Co.</span>
            </h4>
            <p className="text-[11px] text-slate-400 font-semibold">
              {isRtl 
                ? 'تأسست شركة فلاي-وايد لنشر المرح والسلام العائلي وثقافات الصداقة عبر ١٢٠ قارة وبلد.'
                : 'Pioneering joy, child-friendly travel loops, and 100% secure global transaction gates.'}
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 text-[10.5px] text-slate-400 font-bold">
            <span>© 2026 FLY-WIDE Inc.</span>
            <span>•</span>
            <span>{isRtl ? 'حماية المستهلك' : 'Travel Shield Protection'}</span>
            <span>•</span>
            <span>{isRtl ? 'سياسة الخصوصية' : '256-Bit SSL Secured'}</span>
          </div>
        </div>
      </footer>

      {/* Auth and Passenger profile modal */}
      <AnimatePresence>
        {isAuthModalOpen && (
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            lang={lang}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
