import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Mail, Lock, User, ShieldCheck, FileText, Sparkles, LogOut, RefreshCw, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Language } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  lang: Language;
}

export default function AuthModal({ isOpen, onClose, lang }: AuthModalProps) {
  const { 
    user, 
    profile, 
    loading, 
    loginWithGoogle, 
    registerWithEmail, 
    loginWithEmail, 
    updateUserProfile, 
    logout, 
    demoLogin,
    isDemoUser 
  } = useAuth();

  const isRtl = lang === 'ar';
  const [activeTab, setActiveTab] = useState<'signin' | 'register' | 'profile'>(user || isDemoUser ? 'profile' : 'signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [passportNumber, setPassportNumber] = useState('');
  
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Sync tab state when user login state changes
  React.useEffect(() => {
    if (user || isDemoUser) {
      setActiveTab('profile');
      if (profile) {
        setFullName(profile.fullName || '');
        setPassportNumber(profile.passportNumber || '');
      }
    } else {
      setActiveTab('signin');
    }
  }, [user, isDemoUser, profile]);

  if (!isOpen) return null;

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsSubmitting(true);
    try {
      await loginWithEmail(email, password);
      setSuccessMessage(isRtl ? 'تم تسجيل الدخول بنجاح!' : 'Logged in successfully!');
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 1500);
    } catch (err: any) {
      console.error(err);
      const errMsgStr = String(err.message || err.code || err || '').toLowerCase();
      const isConfigError = err.code === 'auth/configuration-not-found' || 
                           err.code === 'auth/operation-not-allowed' ||
                           errMsgStr.includes('operation-not-allowed') ||
                           errMsgStr.includes('configuration-not-found');
      if (isConfigError) {
        setErrorMessage(
          isRtl 
            ? 'ميزة تسجيل الدخول بالبريد الإلكتروني غير مفعلة بمشروع Firebase حالياً! يرجى الانتقال إلى Firebase Console > Authentication > Sign-in method وتفعيل Email/Password، أو استخدم "تسجيل وتجربة محاكاة سريعة" بالأسفل للمتابعة فوراً.' 
            : 'Email/Password Authentication is not yet enabled in your Firebase Console. Please go to Build > Authentication > Sign-in method and enable the "Email/Password" provider, or simply click the "Instant Sandbox Safe Login" button below to bypass and continue testing immediately.'
        );
      } else {
        setErrorMessage(err.message || (isRtl ? 'حدث خطأ أثناء تسجيل الدخول' : 'Sign in failed'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    if (!fullName) {
      setErrorMessage(isRtl ? 'يرجى إدخال الاسم الكامل' : 'Please enter full name');
      return;
    }
    setIsSubmitting(true);
    try {
      await registerWithEmail(email, password, fullName, passportNumber);
      setSuccessMessage(isRtl ? 'تم إنشاء الحساب وحفظ البيانات!' : 'Account created and details registered verified!');
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 2000);
    } catch (err: any) {
      console.error(err);
      const errMsgStr = String(err.message || err.code || err || '').toLowerCase();
      const isConfigError = err.code === 'auth/configuration-not-found' || 
                           err.code === 'auth/operation-not-allowed' ||
                           errMsgStr.includes('operation-not-allowed') ||
                           errMsgStr.includes('configuration-not-found');
      if (isConfigError) {
        setErrorMessage(
          isRtl 
            ? 'ميزة إنشاء الحساب بالبريد الإلكتروني غير مفعلة بمشروع Firebase حالياً! يرجى الانتقال إلى Firebase Console > Authentication > Sign-in method وتفعيل Email/Password، أو انقر على زر "إنشاء حساب تجريبي فوري" للوصول الفوري.' 
            : 'Email/Password Sign-up is currently disabled in your Firebase Console. Please activate "Email/Password" under Authentication > Sign-in method in your Firebase console, or press the "Instant Mock Guest Trial" button below to explore all application features immediately.'
        );
      } else {
        setErrorMessage(err.message || (isRtl ? 'فشل إنشاء الحساب' : 'Registration failed'));
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsSubmitting(true);
    try {
      await loginWithGoogle();
      setSuccessMessage(isRtl ? 'تم الدخول بحساب Google!' : 'Authorized via Google account!');
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 1500);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(
        isRtl 
          ? 'تم حظر النافذة المنبثقة للاتصال بـ Google في المتصفح أو لم تتم تهيئتها' 
          : 'Google popup popup blocked or auth interrupted. Use "Instant Sandbox Login" to test.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDemoSignIn = async () => {
    setErrorMessage('');
    setSuccessMessage('');
    setIsSubmitting(true);
    try {
      const mockEmail = email || 'guest.traveler@flywide.com';
      const mockName = fullName || 'Sajid Soman';
      const mockPassport = passportNumber || 'A87251390';
      await demoLogin(mockEmail, mockName, mockPassport);
      setSuccessMessage(isRtl ? 'تم الدخول الآمن للوضع التجريبي!' : 'Secure Sandbox Session Active!');
      setTimeout(() => {
        setSuccessMessage('');
        onClose();
      }, 1500);
    } catch (err: any) {
      setErrorMessage(String(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setSuccessMessage('');
    setIsSubmitting(true);
    try {
      await updateUserProfile(fullName, passportNumber);
      setSuccessMessage(isRtl ? 'تم تحديث بياناتك في قاعدة البيانات فايربيز!' : 'Your registered details synced to Firebase Firestore Database successfully!');
      setTimeout(() => setSuccessMessage(''), 3000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Profile update failed.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dimmed backdrop background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
      />

      <motion.div
        initial={{ scale: 0.95, y: 15, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 15, opacity: 0 }}
        transition={{ type: 'spring', duration: 0.4 }}
        className="relative w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl overflow-hidden border border-slate-200/50 dark:border-slate-800/80 z-10 flex flex-col max-h-[90vh]"
      >
        {/* Sky-gradient decorative crown */}
        <div className="h-2.5 bg-gradient-to-r from-sky-400 via-indigo-500 to-purple-600 flex-shrink-0" />

        {/* Modal Header */}
        <div className="p-6 pb-4 flex items-center justify-between border-b border-slate-100 dark:border-slate-800/60 flex-shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/50 text-indigo-500">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg text-slate-800 dark:text-slate-100">
                {user || isDemoUser 
                  ? (isRtl ? 'الملف الشخصي الآمن' : 'Secured Passenger Profile') 
                  : (isRtl ? 'بوابة حساب المسافرين' : 'Customer Account Gateway')}
              </h3>
              <p className="text-[11px] text-slate-400 uppercase tracking-widest font-bold">
                {isRtl ? 'قاعدة بيانات فايربيز متصلة' : 'Connected Firebase Database'}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 hover:text-slate-700 dark:hover:text-slate-200 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Messages Alert */}
          {errorMessage && (
            <div className="mb-4 p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/20 text-rose-600 dark:text-rose-400 border border-rose-100 dark:border-rose-900/30 text-xs flex items-start gap-2.5">
              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {successMessage && (
            <div className="mb-4 p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/20 text-emerald-600 dark:text-emerald-400 border border-emerald-100 dark:border-emerald-900/30 text-xs flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <span>{successMessage}</span>
            </div>
          )}

          {/* Tab selector for logged-out context */}
          {(!user && !isDemoUser) && (
            <div className="flex bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl mb-6">
              <button
                onClick={() => setActiveTab('signin')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'signin' ? 'bg-white dark:bg-slate-900 text-sky-500 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
              >
                {isRtl ? 'تسجيل الدخول' : 'Sign In'}
              </button>
              <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 py-2 rounded-xl text-xs font-bold transition ${activeTab === 'register' ? 'bg-white dark:bg-slate-900 text-sky-500 shadow-sm' : 'text-slate-500 hover:text-slate-700 dark:text-slate-400'}`}
              >
                {isRtl ? 'إنشاء حساب جديد' : 'Register details'}
              </button>
            </div>
          )}

          {activeTab === 'profile' && (user || isDemoUser) ? (
            /* Logged in passenger profile controller */
            <form onSubmit={handleUpdateProfile} className="space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/30 border border-slate-100 dark:border-slate-800/80 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-sky-400 to-indigo-500 text-white flex items-center justify-center font-black text-lg shadow-sm uppercase">
                    {(profile?.fullName || user?.email || 'F')[0]}
                  </div>
                  <div>
                    <h4 className="font-extrabold text-[#2a2d3e] dark:text-white">
                      {profile?.fullName || isRtl ? 'مسافر غير مسمى' : 'Unnamed Passenger'}
                    </h4>
                    <p className="text-xs text-slate-400 font-mono">
                      {profile?.email || user?.email}
                    </p>
                    <div className="mt-1 flex gap-2">
                      <span className="inline-flex text-[9px] font-bold uppercase p-0.5 px-1.5 bg-indigo-100 dark:bg-indigo-950 text-indigo-500 rounded-md">
                        {isDemoUser ? (isRtl ? 'وضع تجريبي آمن' : 'Sandbox mode') : (isRtl ? 'فايربيز معتمد' : 'Firebase Verified Auth')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">
                  {isRtl ? 'الاسم الكامل للمسافرين' : 'Passenger Full Name'}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={isRtl ? 'اسمك وفق جواز السفر' : 'Your name matching passport'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">
                  {isRtl ? 'رقم جواز السفر' : 'Passport Number'}
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={passportNumber}
                    onChange={(e) => setPassportNumber(e.target.value)}
                    placeholder={isRtl ? 'أدخل رقم الجواز لحفظه بالحجوزات' : 'Enter passport number for auto-fill'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
              </div>

              {profile?.createdAt && (
                <div className="text-[10px] text-slate-400 italic text-left pt-2 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                  <span>
                    {isRtl 
                      ? `تم التسجيل بتاريخ: ${new Date(profile.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}` 
                      : `Registered Account Saved On: ${new Date(profile.createdAt).toLocaleDateString(undefined, { dateStyle: 'long' })}`
                    }
                  </span>
                </div>
              )}

              <div className="flex gap-3 pt-4 border-t border-slate-100 dark:border-slate-800/60">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 bg-gradient-to-r from-sky-400 to-indigo-500 text-white font-extrabold text-xs rounded-xl shadow-lg hover:from-sky-500 hover:to-indigo-600 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>💾 {isRtl ? 'حفظ وتحديث البيانات' : 'Update database details'}</span>
                  )}
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="px-4 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-rose-500 rounded-xl transition flex items-center justify-center gap-1.5 cursor-pointer text-xs font-bold"
                >
                  <LogOut className="w-4 h-4" />
                  <span>{isRtl ? 'خروج' : 'Log Out'}</span>
                </button>
              </div>
            </form>
          ) : activeTab === 'signin' ? (
            /* Sign In traditional + modern third-party form controls */
            <form onSubmit={handleSignIn} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">
                  {isRtl ? 'البريد الإلكتروني للمسافر' : 'Traveler Email'}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="traveler@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">
                  {isRtl ? 'كلمة المرور' : 'Secure Password'}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
                {/* Fallback instruction tooltip */}
                <p className="mt-1 text-[10px] text-slate-400 text-left leading-relaxed">
                  {isRtl 
                    ? '💡 نصيحة: إذا لم تقم بتهيئة تسجيل دخول البريد الإلكتروني مع Firebase بعد، يمكنك استخدام الخيار التجريبي بالأسفل.' 
                    : '💡 Hint: If email sign-in is not activated in your Firebase console, use Instant Sandbox button below.'}
                </p>
              </div>

              <div className="space-y-3 pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-sky-400 hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-sky-600 text-white font-extrabold text-xs rounded-xl shadow-md transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>🔑 {isRtl ? 'تسجيل دخول المسافر' : 'Sign In Safely'}</span>
                  )}
                </button>

                {/* Optional Google Popup Login */}
                <button
                  type="button"
                  onClick={handleGoogleSignIn}
                  className="w-full py-2.5 bg-white dark:bg-slate-800 dark:hover:bg-slate-700/80 hover:bg-slate-50 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-extrabold text-xs rounded-xl shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path fill="#EA4335" d="M12 5.04c1.62 0 3.08.56 4.22 1.65l3.17-3.17C17.47 1.63 14.95 1 12 1 7.35 1 3.28 3.67 1.24 7.57l3.8 2.94C6.01 6.84 8.78 5.04 12 5.04z" />
                    <path fill="#4285F4" d="M23.52 12.3c0-.83-.07-1.62-.21-2.3H12v4.45h6.49c-.28 1.48-1.12 2.73-2.38 3.58l3.7 2.87c2.16-2 3.41-4.93 3.41-8.6z" strokeWidth="0" />
                    <path fill="#FBBC05" d="M5.04 14.47c-.24-.72-.38-1.5-.38-2.3s.14-1.58.38-2.3L1.24 6.93C.45 8.46 0 10.18 0 12s.45 3.54 1.24 5.07l3.8-2.6z" />
                    <path fill="#34A853" d="M12 18.96c3.22 0 5.92-1.07 7.9-2.9l-3.7-2.87c-1.1 1.07-2.51 1.71-4.2 1.71-3.22 0-5.99-1.8-6.96-4.47l-3.8 2.94c2.04 3.9 6.11 6.59 10.76 6.59z" />
                  </svg>
                  <span>{isRtl ? 'تسجيل دخول باستخدام Google' : 'Sign In with Google Account'}</span>
                </button>

                <div className="relative flex py-2 items-center">
                  <div className="flex-grow border-t border-slate-100 dark:border-slate-800" />
                  <span className="flex-shrink mx-4 text-[10px] text-slate-400 font-bold uppercase tracking-wider">
                    {isRtl ? 'أو تجربة سريعة فورا' : 'OR QUICK TEST ACCESS'}
                  </span>
                  <div className="flex-grow border-t border-slate-100 dark:border-slate-800" />
                </div>

                {/* Instant Sandbox Login */}
                <button
                  type="button"
                  onClick={handleDemoSignIn}
                  className="w-full py-2.5 bg-gradient-to-r from-teal-400 to-sky-400 dark:from-teal-600 dark:to-sky-600 text-white font-black text-xs rounded-xl shadow-lg hover:brightness-105 transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span>🚀 {isRtl ? 'تسجيل وتجربة محاكاة سريعة' : 'Instant Sandbox Safe Login'}</span>
                </button>
              </div>
            </form>
          ) : (
            /* Register detailed user profile and credentials form */
            <form onSubmit={handleRegister} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">
                  {isRtl ? 'الاسم الكامل على جواز السفر' : 'Official Full Name (Passport)'}
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder={isRtl ? 'الاسم الكامل الثنائي أو الثلاثي' : 'Official full name for tour boarding'}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">
                  {isRtl ? 'البريد الإلكتروني' : 'Contact Email'}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="traveler@example.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">
                  {isRtl ? 'كلمة المرور الآمنة' : 'Choose Secure Password'}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 mb-1.5 uppercase">
                  {isRtl ? 'رقم جواز السفر لحفظه (اختياري)' : 'Passport Number for Auto-Fill (Optional)'}
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={passportNumber}
                    onChange={(e) => setPassportNumber(e.target.value)}
                    placeholder="E.g., RA108259"
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-transparent text-xs text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-sky-400"
                  />
                </div>
              </div>

              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 bg-indigo-500 hover:bg-indigo-600 text-white font-extrabold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  {isSubmitting ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <span>📝 {isRtl ? 'تسجيل حسابي الشخصي' : 'Register Official Details'}</span>
                  )}
                </button>
              </div>

              <div className="relative flex py-2 items-center">
                <div className="flex-grow border-t border-slate-100 dark:border-slate-800" />
                <span className="flex-shrink mx-4 text-[10px] text-slate-400 font-bold uppercase">
                  {isRtl ? 'أو تجربة فورية' : 'OR INSTANT SIMULATOR'}
                </span>
                <div className="flex-grow border-t border-slate-100 dark:border-slate-800" />
              </div>

              <button
                type="button"
                onClick={handleDemoSignIn}
                className="w-full py-2.5 bg-gradient-to-r from-teal-400 to-sky-400 dark:from-teal-600 dark:to-sky-600 text-white font-black text-xs rounded-xl shadow-lg hover:brightness-105 transition flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>🚀 {isRtl ? 'إنشاء حساب تجريبي فوري' : 'Instant Mock Guest Trial'}</span>
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}
