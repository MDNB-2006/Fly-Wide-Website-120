/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Car,
  Compass,
  Calendar,
  Users,
  CheckCircle,
  Tag,
  ShieldAlert,
  Info,
  ChevronDown,
  X,
  Plus,
  Trash2,
  BookmarkCheck,
  Bike,
  Activity,
  HeartHandshake,
  Baby
} from 'lucide-react';

interface ExtrasProps {
  lang: 'en' | 'ar';
  currencyCode: string;
  currencyRate: number;
  currencySymbol: string;
  onAddNotification?: (title: string, message: string, type: 'info' | 'success' | 'warning') => void;
}

interface ExtraItem {
  id: string;
  category: 'on-road' | 'on-foot';
  name: string;
  nameAr: string;
  description: string;
  descriptionAr: string;
  pricePerDayUSD: number;
  icon: React.ReactNode;
  specs: string[];
  specsAr: string[];
}

export default function Extras({
  lang,
  currencyCode,
  currencyRate,
  currencySymbol,
  onAddNotification
}: ExtrasProps) {
  const isRtl = lang === 'ar';

  // Available extras catalog
  const extrasCatalog: ExtraItem[] = [
    // On Road
    {
      id: 'car-sedan',
      category: 'on-road',
      name: 'Family Economic Sedan',
      nameAr: 'سيارة صالون عائلية اقتصادية',
      description: 'Clean, fuel-efficient fuel hybrid sedan with high safety ratings. Perfect for smooth city cruising.',
      descriptionAr: 'سيارة هجينة نظيفة وموفرة للوقود بـ ٥ مقاعد وتقييم أمان مرتفع. مثالية للتنقل السلس والسريع بداخل المدينة.',
      pricePerDayUSD: 45,
      icon: <Car className="w-6 h-6" />,
      specs: ['5 Seats', 'Automatic', 'AC/Heater', 'Unlimited Miles'],
      specsAr: ['٥ مقاعد', 'ناقل تلقائي', 'تكييف / تدفئة', 'أميال غير محدودة']
    },
    {
      id: 'jeep-4x4',
      category: 'on-road',
      name: 'Sahara & Mountain Jeep (4x4)',
      nameAr: 'جيب الدفع الرباعي للمغامرات (٤x٤)',
      description: 'Aggressive-grip off-road adventure beast. Excellent suspension for sandy deserts or mountain passes.',
      descriptionAr: 'سيارات دفع رباعي متينة ذات قوة عالية صممت خصيصاً للقيادة الفاخرة فوق رمال الصحراء والمنحدرات الجبلية.',
      pricePerDayUSD: 85,
      icon: <Activity className="w-6 h-6" />,
      specs: ['7 Seats', 'Off-road Mode', 'Reinforced Chassis', 'GPS Included'],
      specsAr: ['٧ مقاعد', 'وضعية الدفع الكلي', 'هيكل فولاذي داعم', 'جهاز تحديد المواقع المدمج']
    },
    {
      id: 'camper-van',
      category: 'on-road',
      name: 'Cosy Family Camper Van',
      nameAr: 'كرفان وفان عائلي مجهز للمبيت',
      description: 'Your hotel on wheels! Includes mini-kitchen, 2 fold-out child beds, and panoramic stargazer glass ceiling.',
      descriptionAr: 'فندقك المتحرك على الطريق! يشمل مطبخاً مصغراً، سريرين قابلين للطي للأطفال، وسقفا زجاجيا لمشاهدة النجوم.',
      pricePerDayUSD: 110,
      icon: <Car className="w-6 h-6 text-emerald-500" />,
      specs: ['Sleeps 4', 'Kitchenette', 'Fold-out Beds', 'Stargazing Glass'],
      specsAr: ['يتسع للمبيت لـ ٤ أشخاص', 'مطبخ صغير مدمج', 'أسرة ثنائية قابلة للطي', 'سقف زجاج وبانوراما النجوم']
    },
    {
      id: 'luxury-escalade',
      category: 'on-road',
      name: 'Chauffeur Luxury SUV (Escalade)',
      nameAr: 'سيارة دفع رباعي فارهة من الطراز الملكي',
      description: 'Travel in royal elegance. Premium leather interior, ambient neon lighting, and high-tech family entertainment suite.',
      descriptionAr: 'استمتع بطعم الرفاهية والرحابة الملكية مع مقاعد جلدية فاخرة، شاشات ترفيه عائلية، وإضاءة نيون داخلية مبهجة.',
      pricePerDayUSD: 190,
      icon: <Car className="w-6 h-6 text-indigo-500" />,
      specs: ['7 Ultra-comfort Seats', 'Executive Class', 'Kids TV Monitors', 'Chauffeur available'],
      specsAr: ['٧ مقاعد فائقة الراحة والرفاهية', 'درجة رجال الأعمال الملكية', 'شاشات فيديو للأطفال', 'تتوفر مع سائق خاص عند الطلب']
    },
    {
      id: 'mountain-bike',
      category: 'on-road',
      name: 'Safe Mountain Bike Duo',
      nameAr: 'ثنائي الدراجات الهوائية الآمنة',
      description: 'High-grade gear cycles with helmets for parents and kids. Take active tours on green parks and trails.',
      descriptionAr: 'دراجتان هوائيتان متطورتان ومجهزتان بمساعدات هيدروليكية كاملة وخوذات حماية للآباء الصغار والأبناء للاستكشاف والحدائق.',
      pricePerDayUSD: 15,
      icon: <Bike className="w-6 h-6" />,
      specs: ['Adult + Child size', 'Safety helmets', 'Disc-brakes', 'Safety locks'],
      specsAr: ['مقاس للبالغين + مقاس للأطفال', 'خوذات حماية وسلامة دائرية', 'فرامل قرصية مانعة للانزلاق', 'أقفال أمان معدنية']
    },
    // On Foot
    {
      id: 'guide-male',
      category: 'on-foot',
      name: 'Private Storyteller Guide (Gentleman)',
      nameAr: 'مرشد سياحي خاص مرافق للعائلة (رجل)',
      description: 'Courteous, knowledgeable guide. Fluent in English & Arabic. Takes care of entry gates and local secrets.',
      descriptionAr: 'مرشد سياحي على خلق ولباقة عالية يتحدث اللغتين بطلاقة تامة، يرافق العائلة الكريمة لتسهيل حجز التذاكر وتبسيط التاريخ للأطفال.',
      pricePerDayUSD: 55,
      icon: <Users className="w-6 h-6 text-sky-500" />,
      specs: ['Bilingual', 'Child-friendly stories', '100% Family Certified', 'First-Aid Trained'],
      specsAr: ['يتحدث لغتين بطلاقة', 'رواية قصص كرتونية ومسلية للأطفال', 'معتمد للعائلات ١٠٠٪', 'مدرب على الإسعافات الأولية والسلامة']
    },
    {
      id: 'guide-female',
      category: 'on-foot',
      name: 'Private Storyteller Guide (Lady)',
      nameAr: 'مرشدة سياحية خاصة مرافقة للعائلة (سيدة)',
      description: 'Warm, highly-skilled storyteller guide. Speaks fluent English & Arabic. Wonderful with children activities.',
      descriptionAr: 'مرشدة سياحية ومصاحبة ممتازة ذات رحابة ورعاية عالية للأطفال والأمهات باللغتين العربية والإنجليزية وتسهيل المسارات الشاملة.',
      pricePerDayUSD: 55,
      icon: <Users className="w-6 h-6 text-pink-500" />,
      specs: ['Bilingual', 'Wonderful with toddlers', 'Family Tour Certified', 'Local Gourmet Expert'],
      specsAr: ['تتحدث لغتين بطلاقة', 'لبقة وصديقة ممتازة للأطفال والرضع', 'معتمدة للجولات العائلية', 'خبيرة بالثقافة والمطاعم المحلية المضمونة']
    },
    {
      id: 'kid-trolley',
      category: 'on-foot',
      name: 'Rent a Kid Trolley (Ultra-Safe)',
      nameAr: 'عربة ترولي ذكية فائقة الأمان للأطفال',
      description: 'Avoid tired little feet! Premium safety-lock stroller/trolley with soft cushion, sunhood protection, and security harness.',
      descriptionAr: 'احمِ أقدام أطفالك الصغار من التعب والإمساك بمسارات طويلة! عربة متنقلة راقية بفرامل أمان وحزام خماسي ووقاية كاملة من الشمس.',
      pricePerDayUSD: 12,
      icon: <Baby className="w-6 h-6 text-amber-500" />,
      specs: ['5-Point safety lock', 'Sun-protection hood', 'Storage compartment', 'Smooth suspension wheels'],
      specsAr: ['قفل حزام أمان خماسي النقاط', 'مظلة واقية عريضة من أشعة الشمس', 'سلة تخزين فسيحة للحقائب والمياه', 'عجلات مرنة مانعة للاهتزاز المزعج']
    }
  ];

  // States
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'on-road' | 'on-foot'>('all');
  const [cart, setCart] = useState<{ item: ExtraItem; days: number; date: string }[]>([]);
  const [activeItemForModal, setActiveItemForModal] = useState<ExtraItem | null>(null);
  
  // Custom booking modal settings
  const [bookingDays, setBookingDays] = useState<number>(3);
  const [bookingDate, setBookingDate] = useState<string>(() => {
    return new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0];
  });

  // Terms and T&C dropdown keys toggle
  const [showTerms, setShowTerms] = useState<boolean>(false);

  // Successful checkout ticket
  const [checkoutSuccessTicket, setCheckoutSuccessTicket] = useState<{
    id: string;
    totalUSD: number;
    totalLocal: number;
    date: string;
    items: string[];
    customerName: string;
    customerEmail: string;
  } | null>(null);

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);

  const formatPrice = (usd: number) => {
    const rawVal = usd * currencyRate;
    return `${currencySymbol}${Math.round(rawVal)} ${currencyCode}`;
  };

  const handleOpenAddModal = (item: ExtraItem) => {
    setActiveItemForModal(item);
    setBookingDays(3);
    setBookingDate(new Date(Date.now() + 86400000 * 7).toISOString().split('T')[0]);
  };

  const handleAddToCart = () => {
    if (!activeItemForModal) return;
    
    // Check if item is already in cart, update it
    setCart(prev => {
      const existingIdx = prev.findIndex(c => c.item.id === activeItemForModal.id);
      if (existingIdx !== -1) {
        const copy = [...prev];
        copy[existingIdx] = { item: activeItemForModal, days: bookingDays, date: bookingDate };
        return copy;
      }
      return [...prev, { item: activeItemForModal, days: bookingDays, date: bookingDate }];
    });

    if (onAddNotification) {
      onAddNotification(
        isRtl ? 'تمت الإضافة للمخطط بنجاح! 🛍️' : 'Added to Trip Plan! 🛍️',
        isRtl 
          ? `تم إضافة "${activeItemForModal.nameAr}" لخطتك في تاريخ ${bookingDate}. خصم ١٠٪ نشط!`
          : `Added "${activeItemForModal.name}" to your planner starting ${bookingDate}. 10% Fly-Wide discount active!`,
        'success'
      );
    }

    setActiveItemForModal(null);
  };

  const handleRemoveFromCart = (id: string) => {
    const itemToRemove = cart.find(c => c.item.id === id);
    setCart(prev => prev.filter(c => c.item.id !== id));
    
    if (onAddNotification && itemToRemove) {
      onAddNotification(
        isRtl ? 'تمت الإزالة 🗑️' : 'Removed Item 🗑️',
        isRtl 
          ? `تم استبعاد "${itemToRemove.item.nameAr}" من عربة التخطيط الخاصة بك.`
          : `Removed "${itemToRemove.item.name}" from your temporary trip planner.`,
        'info'
      );
    }
  };

  // Math totals
  const subtotalUSD = cart.reduce((sum, current) => {
    return sum + (current.item.pricePerDayUSD * current.days);
  }, 0);

  // 10% fly-wide discount offer!
  const discountUSD = subtotalUSD * 0.10;
  const totalUSD = subtotalUSD - discountUSD;

  const handleCheckoutSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerEmail.trim()) return;

    const ticketId = `EXT-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
    const targetTicket = {
      id: ticketId,
      totalUSD: totalUSD,
      totalLocal: totalUSD * currencyRate,
      date: cart[0]?.date || 'Custom Date',
      customerName: customerName,
      customerEmail: customerEmail,
      items: cart.map(c => isRtl ? `${c.item.nameAr} (${c.days} ${isRtl ? 'أيام' : 'days'})` : `${c.item.name} (${c.days} days)`)
    };

    setCheckoutSuccessTicket(targetTicket);
    setCart([]);
    setShowCheckoutForm(false);

    if (onAddNotification) {
      onAddNotification(
        isRtl ? 'أكدنا حجز الإضافات بنجاح! 🎉' : 'Extras Confirmed Successfully! 🎉',
        isRtl 
          ? `عزيزي ${customerName}، تم إرسال قسيمة توفير ١٠٪ المبرمة لبريدك الإلكتروني، مع تجهيز التوصيل والخدمات بالمطار.`
          : `Dear ${customerName}, your items are locked with a 10% Fly-Wide Discount. Code ${ticketId} has been linked to your flight pass!`,
        'success'
      );
    }
  };

  const filteredCatalog = selectedCategory === 'all' 
    ? extrasCatalog 
    : extrasCatalog.filter(ex => ex.category === selectedCategory);

  return (
    <div className="w-full max-w-[1536px] xl:max-w-[1720px] mx-auto px-4 md:px-6 py-8" id="family-extras-module">
      
      {/* Dynamic Success Ticket Overlay */}
      <AnimatePresence>
        {checkoutSuccessTicket && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 30 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 30 }}
              type="ticket"
              className="bg-white dark:bg-slate-900 border-2 border-dashed border-indigo-400 dark:border-indigo-600 rounded-3xl p-6 md:p-8 max-w-md w-full shadow-2xl relative text-center text-slate-800 dark:text-slate-100"
            >
              <div className="w-16 h-16 bg-gradient-to-tr from-sky-400 to-indigo-500 rounded-full flex items-center justify-center text-white text-3xl mx-auto mb-4 animate-bounce">
                🎉
              </div>
              
              <h3 className="font-black text-xl md:text-2xl text-slate-900 dark:text-white tracking-tight">
                {isRtl ? 'تم تجهيز وتأكيد الإضافات! ✈️' : 'Extras Locked with 10% Discount!'}
              </h3>
              
              <p className="text-xs text-indigo-500 font-mono font-bold uppercase tracking-wider mt-2 bg-indigo-50 dark:bg-indigo-950/50 py-1.5 px-3.5 rounded-full inline-block">
                {isRtl ? 'قسيمة فلاي-وايد:' : 'Fly-Wide Promo Lock:'} {checkoutSuccessTicket.id}
              </p>

              <div className="text-left bg-slate-50 dark:bg-slate-950/50 p-4 border border-slate-100 dark:border-slate-800 rounded-2xl my-5 space-y-2.5">
                <div className="flex justify-between items-center text-xs pb-1.5 border-b border-dashed border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 font-semibold">{isRtl ? 'اسم المستكشف:' : 'Passenger Name:'}</span>
                  <span className="font-extrabold text-slate-900 dark:text-white">{checkoutSuccessTicket.customerName}</span>
                </div>
                <div className="flex justify-between items-center text-xs pb-1.5 border-b border-dashed border-slate-200 dark:border-slate-800">
                  <span className="text-slate-400 font-semibold">{isRtl ? 'البريد الإلكتروني:' : 'Email Address:'}</span>
                  <span className="font-bold text-slate-600 dark:text-slate-300 truncate max-w-[150px]">{checkoutSuccessTicket.customerEmail}</span>
                </div>
                <div className="space-y-1">
                  <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block">{isRtl ? 'الخدمات المحجوزة:' : 'Booked Assets:'}</span>
                  <div className="flex flex-col gap-1 pl-1 text-[11px] font-bold text-sky-600 dark:text-sky-400">
                    {checkoutSuccessTicket.items.map((it, idx) => (
                      <span key={idx} className="flex items-center gap-1">🗺️ {it}</span>
                    ))}
                  </div>
                </div>
                <div className="flex justify-between items-center text-xs pt-2 border-t border-slate-100 dark:border-slate-800">
                  <span className="text-slate-500 font-extrabold">{isRtl ? 'المجموع النهائي (مخصوم ١٠٪):' : 'Final Total (10% Off):'}</span>
                  <span className="text-base font-black text-emerald-500">
                    {currencySymbol}{Math.round(checkoutSuccessTicket.totalLocal)} <span className="text-[10px] font-mono">{currencyCode}</span>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 p-3 bg-yellow-400/10 rounded-xl text-left text-[10px] leading-relaxed text-amber-600 dark:text-amber-400 font-semibold">
                <ShieldAlert className="w-4 h-4 flex-shrink-0" />
                <span>
                  {isRtl 
                    ? 'سيتم تفعيل هذه الخدمات وتوصيل الكرك أو عربة الأطفال وفان السفر فور هبوط رحلتك في المطار المختار!'
                    : 'Our local airport representatives will greet you with keys and guide nameboards on your arrival. Simple!'
                  }
                </span>
              </div>

              <button
                onClick={() => setCheckoutSuccessTicket(null)}
                className="mt-6 w-full py-3 bg-slate-900 dark:bg-white text-white dark:text-slate-950 font-black rounded-2xl text-xs tracking-wider uppercase cursor-pointer hover:opacity-90"
              >
                {isRtl ? 'رائع، إغلاق' : 'Splendid, Close Pass'}
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Title Banner */}
      <div className="text-center mb-8 relative">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-sky-50 dark:bg-sky-950/40 border border-sky-100 dark:border-sky-900/60 mb-2 animate-pulse-slow">
          <Tag className="w-3.5 h-3.5 text-sky-500" />
          <span className="text-xs font-black text-sky-600 dark:text-sky-400 uppercase tracking-widest">
            {isRtl ? 'خدمات إضافية وتسهيلات طوال السفرة ✨' : 'Fly-Wide Extras Center ✨'}
          </span>
        </div>
        <h2 className="text-2xl md:text-4xl font-black text-slate-800 dark:text-white tracking-tight leading-tight">
          {isRtl ? 'التسهيلات الفاخرة المضمونة لرحلتك 🎒' : 'Pre-Arrange Helpful Trip Extras!'}
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-xs md:text-sm mt-2 max-w-xl mx-auto font-semibold">
          {isRtl
            ? 'خطط مسبقاً لراحتك ووفر ١٠٪ دائم عند الحجز والدفع المقفل مع فلاي-وايد! نضمن لك الفانات والعربات والمرشدين فوراً.'
            : 'Get an automatic 10% exclusive discount on all Road vehicles and Foot safety guides when pre-booked through Fly-Wide.'}
        </p>

        {/* 10% Promotional offer banner card */}
        <div className="mt-4 max-w-lg mx-auto bg-gradient-to-r from-sky-400/10 via-indigo-500/10 to-purple-400/10 border border-sky-200/50 dark:border-sky-700/20 rounded-2xl p-3 flex items-center justify-center gap-3">
          <span className="text-xl">💰</span>
          <span className="text-[11px] md:text-xs font-bold text-slate-700 dark:text-slate-300">
            {isRtl 
              ? 'توفير ١٠٪ على باقتك الإضافية! ستقوم فلاي-وايد بربط الحجز برقم تذكرة طيرانك مباشرة لتسهيل الاستلام.'
              : 'Save 10% instantly on all rentals and guide services when booked before departure under your FLY-WIDE official pass.'
            }
          </span>
        </div>
      </div>

      {/* Main Catalog & Cart View split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Filter menu and available grid */}
        <div className="lg:col-span-8 space-y-6">
          {/* Category tabs */}
          <div className="flex bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200/30 w-fit gap-1 mx-auto sm:mx-0">
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-300 cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-white dark:bg-slate-800 text-sky-500 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
              }`}
            >
              {isRtl ? 'جميع الإضافات' : 'All Helpful Extras'}
            </button>
            <button
              type="category"
              onClick={() => setSelectedCategory('on-road')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-300 flex items-center gap-1 cursor-pointer ${
                selectedCategory === 'on-road'
                  ? 'bg-white dark:bg-slate-800 text-sky-500 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
              }`}
            >
              <Car className="w-3.5 h-3.5" />
              <span>{isRtl ? 'على الطريق (سيارات/فان)' : 'On Road (Vehicles)'}</span>
            </button>
            <button
              type="category"
              onClick={() => setSelectedCategory('on-foot')}
              className={`px-4 py-2 rounded-xl text-xs font-extrabold transition-all duration-300 flex items-center gap-1 cursor-pointer ${
                selectedCategory === 'on-foot'
                  ? 'bg-white dark:bg-slate-800 text-sky-500 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-700'
              }`}
            >
              <Users className="w-3.5 h-3.5" />
              <span>{isRtl ? 'مشياً بالأقدام (مرشد/عربة)' : 'On Foot (Guides/Trolley)'}</span>
            </button>
          </div>

          {/* Grid items */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredCatalog.map((ex) => (
              <motion.div
                layout
                key={ex.id}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm hover:shadow-md transition duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="flex justify-between items-start gap-4">
                    {/* Icon banner */}
                    <div className="w-12 h-12 rounded-2xl bg-sky-50 dark:bg-sky-950/40 text-sky-500 dark:text-sky-400 flex items-center justify-center shadow-inner">
                      {ex.icon}
                    </div>
                    {/* Price stamp */}
                    <div className="text-right">
                      <span className="text-[10px] text-slate-400 block font-semibold uppercase">{isRtl ? 'سعر اليوم' : 'Daily Rent'}</span>
                      <span className="text-lg font-black text-slate-950 dark:text-white">
                        {formatPrice(ex.pricePerDayUSD)}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 mt-4">
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm md:text-base font-black text-slate-900 dark:text-white">
                        {isRtl ? ex.nameAr : ex.name}
                      </h4>
                      <span className={`text-[8.5px] uppercase font-mono px-2 py-0.5 rounded-full font-bold ${
                        ex.category === 'on-road' 
                          ? 'bg-emerald-500/10 text-emerald-500' 
                          : 'bg-indigo-500/10 text-indigo-500'
                      }`}>
                        {ex.category === 'on-road' ? (isRtl ? 'على الطريق' : 'on road') : (isRtl ? 'أقدام' : 'on foot')}
                      </span>
                    </div>

                    <p className="text-[11px] md:text-xs text-slate-500 dark:text-slate-400 leading-relaxed font-semibold">
                      {isRtl ? ex.descriptionAr : ex.description}
                    </p>
                  </div>

                  {/* Specs Pill row */}
                  <div className="flex flex-wrap gap-1.5 mt-3 pt-2 border-t border-slate-50 dark:border-slate-800/40">
                    {(isRtl ? ex.specsAr : ex.specs).map((spec, index) => (
                      <span
                        key={index}
                        className="bg-slate-50 dark:bg-slate-950 text-slate-600 dark:text-slate-300 text-[9.5px] font-bold px-2 py-0.5 rounded-lg border border-slate-100/40 dark:border-slate-800"
                      >
                        ✓ {spec}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-50 dark:border-slate-800/20 flex items-center justify-between">
                  <div className="text-[10px] text-amber-500 dark:text-amber-400 font-bold flex items-center gap-1">
                    <span>🌟</span>
                    <span>{isRtl ? 'خصم ١٠٪ متاح' : '10% Off Applied'}</span>
                  </div>
                  <button
                    onClick={() => handleOpenAddModal(ex)}
                    className="bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 px-4 py-2 rounded-xl text-xs font-black tracking-tight flex items-center gap-1 shadow-sm cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>{isRtl ? 'اختر وتاريخ' : 'Book Extra / Rent'}</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Live Planner & Cart Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-slate-900 text-white p-5 md:p-6 rounded-3xl border border-slate-800 shadow-xl space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xl">🗺️</span>
                <h3 className="font-extrabold text-sm uppercase tracking-wider text-yellow-300">
                  {isRtl ? 'حقيبة التسهيلات العائلية' : 'Trip Extras Planner'}
                </h3>
              </div>
              <span className="bg-sky-500 text-slate-900 font-black text-[9.5px] px-2 py-0.5 rounded-full">
                {cart.length} {isRtl ? 'خدمات' : 'items'}
              </span>
            </div>

            {cart.length === 0 ? (
              <div className="py-12 text-center space-y-2">
                <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-xl mx-auto text-slate-500">
                  🎒
                </div>
                <h4 className="font-extrabold text-xs text-slate-300">
                  {isRtl ? 'المخطط فارغ حالياً!' : 'No extras added yet!'}
                </h4>
                <p className="text-[10.5px] text-slate-500 max-w-[220px] mx-auto leading-relaxed">
                  {isRtl 
                    ? 'اختر سيارات الدفع الرباعي، الفانات، أو مرشداً خاصاً لعائلتك لبدء التوفير.'
                    : 'Click any rental vehicle or family guide on the left to schedule dates and save 10% !'}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Cart list items */}
                <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
                  {cart.map((c) => {
                    const rowUSD = c.item.pricePerDayUSD * c.days;

                    return (
                      <div
                        key={c.item.id}
                        className="bg-slate-800/60 p-3 rounded-2xl border border-slate-700/60 relative flex flex-col justify-between gap-2"
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div>
                            <h4 className="font-extrabold text-[11px] md:text-xs text-yellow-200">
                              {isRtl ? c.item.nameAr : c.item.name}
                            </h4>
                            <span className="text-[9.5px] text-slate-400 block font-mono">
                              📅 {isRtl ? 'تاريخ:' : 'Date:'} {c.date} ({c.days} {isRtl ? 'أيام' : 'days'})
                            </span>
                          </div>
                          <button
                            onClick={() => handleRemoveFromCart(c.item.id)}
                            className="text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 p-1.5 rounded-lg transition"
                            title={isRtl ? 'حذف' : 'Remove'}
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        <div className="flex justify-between items-center bg-slate-900/40 px-2 py-1 rounded-lg text-[10px] text-slate-300 font-semibold">
                          <span>
                            {c.days} × {formatPrice(c.item.pricePerDayUSD)}
                          </span>
                          <span className="text-white font-extrabold">{formatPrice(rowUSD)}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Receipt breakdown */}
                <div className="border-t border-white/10 pt-4 space-y-2 text-xs">
                  <div className="flex justify-between text-slate-400 font-medium">
                    <span>{isRtl ? 'المجموع الفرعي:' : 'Subtotal:'}</span>
                    <span className="font-bold text-slate-300">{formatPrice(subtotalUSD)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-400 font-bold bg-emerald-950/20 px-2 py-1.5 rounded-xl border border-emerald-900/30">
                    <span className="flex items-center gap-1">🎉 {isRtl ? 'خصم فلاي-وايد ١٠٪:' : 'Fly-Wide 10% Off:'}</span>
                    <span>-{formatPrice(discountUSD)}</span>
                  </div>
                  <div className="flex justify-between text-white font-black text-sm pt-2 border-t border-white/5">
                    <span>{isRtl ? 'القيمة الإجمالية:' : 'Total Amount:'}</span>
                    <span className="text-yellow-300 text-base">{formatPrice(totalUSD)}</span>
                  </div>
                </div>

                {/* Checkout form triggers */}
                {!showCheckoutForm ? (
                  <button
                    onClick={() => setShowCheckoutForm(true)}
                    className="w-full py-3 bg-gradient-to-r from-yellow-400 to-amber-500 hover:from-yellow-500 hover:to-amber-600 text-slate-900 font-black rounded-2xl text-xs tracking-wider uppercase shadow-md transition-all cursor-pointer text-center block"
                  >
                    🚀 {isRtl ? 'أكد الحجز بالإيميل للحصول على العرض' : 'Lock 10% Off & Reserve'}
                  </button>
                ) : (
                  <form onSubmit={handleCheckoutSubmit} className="space-y-3 bg-slate-850 p-4 border border-slate-800 rounded-3xl animate-fade-in text-slate-800">
                    <h4 className="text-white text-xs font-black tracking-wider uppercase border-b border-white/5 pb-1 text-center">
                      {isRtl ? 'بيانات مستلم التسهيلات' : 'Passenger Rent Pass Details'}
                    </h4>
                    <div>
                      <label className="block text-[9.5px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        {isRtl ? 'اسم المستكشف بالكامل:' : 'Lead Passenger Name:'}
                      </label>
                      <input
                        type="text"
                        required
                        placeholder={isRtl ? 'مصطفى السفر' : 'Steve Rogers'}
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-extrabold outline-none focus:border-sky-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[9.5px] font-bold text-slate-400 uppercase tracking-wider mb-1">
                        {isRtl ? 'البريد الإلكتروني للسلامة:' : 'Gourmet / Email Address:'}
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="explore@family.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white font-extrabold outline-none focus:border-sky-400"
                      />
                    </div>
                    
                    <div className="flex gap-2 pt-2">
                      <button
                        type="button"
                        onClick={() => setShowCheckoutForm(false)}
                        className="flex-1 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-[10.5px] font-bold cursor-pointer transition text-center"
                      >
                        {isRtl ? 'تراجع' : 'Cancel'}
                      </button>
                      <button
                        type="submit"
                        className="flex-1 py-2 rounded-xl bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-500 hover:to-indigo-600 text-white text-[10.5px] font-extrabold cursor-pointer transition text-center"
                      >
                        {isRtl ? 'تأكيد وحفظ' : 'Confirm Rent'}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>

          {/* Quick FAQ info & Kid Stroller Alert Card */}
          <div className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-3xl p-5 shadow-sm space-y-3.5">
            <h4 className="font-extrabold text-xs text-slate-800 dark:text-slate-100 flex items-center gap-1.5 uppercase tracking-wider">
              <Info className="w-4 h-4 text-sky-500" />
              <span>{isRtl ? 'شروط وقواعد استئجار العربات والسيارات:' : 'Rent Terms & Conditions'}</span>
            </h4>
            
            <div className="text-[10px] text-slate-500 dark:text-slate-400 space-y-2 font-semibold leading-relaxed">
              <p>
                <strong>🚗 {isRtl ? 'متطلبات السائقيين:' : 'License Policy:'}</strong>{' '}
                {isRtl 
                  ? 'رخصة قيادة محلية سارية أو رخصة دولية، يرجى تقديمها للمندوب بمجرد استقبالكم في صالة طيران فلاي-وايد بالمطار.'
                  : 'Requires standard driver license valid for travel country, or international license displayed at airport counter on landing.'
                }
              </p>
              <p>
                <strong>👶 {isRtl ? 'تسهيلات الأطفال والرضع:' : 'Toddler Security:'}</strong>{' '}
                {isRtl 
                  ? 'يتم تعقيم وغسل كل عربات الترولي وحمالات الأطفال وحواف السيارات بسائل طبي صديق للبيئة قبل التسليم.'
                  : 'Double sanitization on child trolleys and baby seats before dispatch. Strollers are delivered clean and locked.'
                }
              </p>
              <p>
                <strong>💰 {isRtl ? 'التأمين الوقائي والوقود:' : 'Fuel & Fully Covered:'}</strong>{' '}
                {isRtl 
                  ? 'السيارات تشمل حماية تأمين شاملة ١٠٠٪ مجانية للعوائل المسافرة. استلم بوقود ممتلئ وأرجعه ممتلئاً لتجنب أي مبالغ إضافية.'
                  : 'Each rental car and camper includes all-inclusive safety shield coverage. Fuel level set to full at terminal dispatch.'
                }
              </p>
            </div>

            <button
              onClick={() => setShowTerms(!showTerms)}
              className="text-[10px] font-extrabold text-indigo-500 hover:text-indigo-600 flex items-center gap-0.5 cursor-pointer"
            >
              <span>{showTerms ? (isRtl ? 'إخفاء التفاصيل القانونية' : 'Hide Legal Terms') : (isRtl ? 'عرض القواعد والتفاصيل القانونية' : 'View Full Lease agreement')}</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-300 ${showTerms ? 'rotate-180' : ''}`} />
            </button>

            {showTerms && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="bg-slate-50 dark:bg-slate-950 p-3 rounded-2xl border border-slate-100 dark:border-slate-800 text-[9px] text-slate-400 leading-normal space-y-1"
              >
                <p>1. {isRtl ? 'لا تفرض شركة فلاي-وايد أي رسوم سرية أو عمولات إضافية عند التسليم.' : 'No hidden fees. Free cancellation and changes anytime before flight touchdown.'}</p>
                <p>2. {isRtl ? 'المرشدين السياحيين معتمدين ومرخصين ومسؤولين عن توجيهكم بسلام وطمأنينة.' : 'All private storytellers carry emergency communication collars and first aid pass.'}</p>
                <p>3. {isRtl ? 'يرجى الحفاظ على معدات وعربات الأطفال والرضع، وإبلاغنا فور حدوث أي تلف أو وعثاء.' : 'Damage to strollers is fully insured; please report locks or wheels wear directly via local staff.'}</p>
              </motion.div>
            )}
          </div>
        </div>

      </div>

      {/* Item interactive detail popup (date selector and booking days multiplier) */}
      <AnimatePresence>
        {activeItemForModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 15 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 15 }}
              className="bg-white dark:bg-slate-900 rounded-3xl p-6 max-w-md w-full border border-slate-100 dark:border-slate-800 shadow-2xl relative text-slate-800 dark:text-slate-100"
            >
              <button
                onClick={() => setActiveItemForModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 bg-slate-100 dark:bg-slate-850 p-1.5 rounded-full transition"
              >
                <X className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-sky-50 dark:bg-sky-950/40 text-sky-500 dark:text-sky-400 flex items-center justify-center">
                  {activeItemForModal.icon}
                </div>
                <div>
                  <h4 className="font-extrabold text-sm md:text-base text-slate-900 dark:text-white">
                    {isRtl ? activeItemForModal.nameAr : activeItemForModal.name}
                  </h4>
                  <span className="text-[10px] text-slate-400 uppercase font-bold">
                    {formatPrice(activeItemForModal.pricePerDayUSD)} / {isRtl ? 'يوم' : 'day'}
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                {/* Date Required selection */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
                    📅 {isRtl ? 'تاريخ بداية الحجز المطلوب:' : 'Select Required Booking Date:'}
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={bookingDate}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => setBookingDate(e.target.value)}
                      className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-200/50 dark:border-slate-800 rounded-xl px-3 py-2 text-xs font-bold outline-none text-slate-700 dark:text-slate-300"
                    />
                  </div>
                </div>

                {/* Days range selector slider */}
                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                      ⏳ {isRtl ? 'مدة الاستئجار المطلوبة:' : 'Number of rent days:'}
                    </label>
                    <span className="bg-sky-50 dark:bg-sky-950 text-sky-500 font-extrabold px-2 py-0.5 rounded-lg text-[10.5px]">
                      {bookingDays} {isRtl ? 'أيام' : 'days'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    value={bookingDays}
                    onChange={(e) => setBookingDays(parseInt(e.target.value))}
                    className="w-full accent-sky-500 h-1.5 bg-slate-100 dark:bg-slate-850 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-[9px] text-slate-400 font-mono pt-1">
                    <span>1 {isRtl ? 'يوم' : 'day'}</span>
                    <span>15 {isRtl ? 'يوم' : 'days'}</span>
                    <span>30 {isRtl ? 'يوم' : 'days'}</span>
                  </div>
                </div>

                {/* Live math preview */}
                <div className="bg-slate-50 dark:bg-slate-950/50 p-4 border border-slate-100 dark:border-slate-800 rounded-2xl">
                  <div className="flex justify-between items-center text-[11px] font-semibold text-slate-500 pb-2 border-b border-white/5">
                    <span>{isRtl ? 'مجموع الأيام الفعلي:' : 'Subtotal duration price:'}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {bookingDays} × {formatPrice(activeItemForModal.pricePerDayUSD)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-black text-slate-900 dark:text-white pt-2">
                    <span>{isRtl ? 'القيمة الإجمالية التقديرية:' : 'Live Price Estimate:'}</span>
                    <span className="text-yellow-500 text-sm">
                      {formatPrice(activeItemForModal.pricePerDayUSD * bookingDays)}
                    </span>
                  </div>
                  <div className="text-[10px] text-emerald-500 font-bold mt-1 text-center">
                    🎉 {isRtl ? 'يتأهل لخصم ١٠٪ عند الإضافة للحقيبة' : 'Qualifies for 10% instant checkout discount'}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => setActiveItemForModal(null)}
                    className="flex-1 py-3 border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 text-xs font-extrabold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-850 cursor-pointer text-center"
                  >
                    {isRtl ? 'تراجع وإلغاء' : 'Close and Cancel'}
                  </button>
                  <button
                    onClick={handleAddToCart}
                    className="flex-1 py-3 bg-gradient-to-r from-sky-400 to-indigo-500 hover:from-sky-500 hover:to-indigo-600 text-white text-xs font-black rounded-2xl shadow-sm cursor-pointer text-center"
                  >
                    {isRtl ? 'إضافة للرحلة' : 'Add to Trip Plan'}
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
