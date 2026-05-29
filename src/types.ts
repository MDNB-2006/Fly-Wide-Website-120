/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Language = 'en' | 'ar';

export interface TranslationDict {
  heroTitle: string;
  heroSub: string;
  searchPlaceholder: string;
  filterAll: string;
  filterEurope: string;
  filterAsia: string;
  filterAmericas: string;
  filterAfrica: string;
  filterOceania: string;
  filterMiddleEast: string;
  popularPackages: string;
  allDestinations: string;
  bookingFormTitle: string;
  bookingSuccess: string;
  fullName: string;
  email: string;
  passportNumber: string;
  travelDate: string;
  guestsCount: string;
  currency: string;
  bookNow: string;
  paySecure: string;
  totalPrice: string;
  paymentTitle: string;
  paymentSubtitle: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  paySuccessMsg: string;
  testimonialTitle: string;
  testimonialSubtitle: string;
  interactiveMapTitle: string;
  interactiveMapSubtitle: string;
  activeNotifications: string;
  realtimeAlerts: string;
  destinationsCount: string;
  myBookings: string;
  viewDetails: string;
  backToHome: string;
  exploreDestinations: string;
  checkoutBtn: string;
  cancelBtn: string;
  languages: {
    en: string;
    ar: string;
  }
}

export type CurrencyCode = 'USD' | 'EUR' | 'GBP' | 'AED' | 'SAR' | 'JPY';

export interface CurrencyConfig {
  code: CurrencyCode;
  symbol: string;
  rate: number; // exchange rate from base 1 USD
  name: string;
  nameAr: string;
}

export interface Destination {
  id: string;
  name: string;
  nameAr: string;
  country: string;
  countryAr: string;
  continent: 'Europe' | 'Asia' | 'Americas' | 'Africa' | 'Oceania' | 'Middle East' | 'Antartica' | 'Antarctica';
  priceUSD: number;
  rating: number;
  durationDays: number;
  description: string;
  descriptionAr: string;
  themeGradient: string; // for the kid-friendly illustrative backgrounds
  sceneryType: 'mountain' | 'beach' | 'city' | 'desert' | 'jungle';
  highlights: string[];
  highlightsAr: string[];
}

export interface Booking {
  id: string;
  destinationId: string;
  destinationName: string;
  destinationNameAr: string;
  fullName: string;
  email: string;
  passportNumber: string;
  travelDate: string;
  guests: number;
  totalCostUSD: number;
  currencyPaid: CurrencyCode;
  status: 'pending_payment' | 'completed' | 'cancelled';
  timestamp: string;
}

export interface Notification {
  id: string;
  title: string;
  titleAr: string;
  message: string;
  messageAr: string;
  timestamp: string;
  type: 'info' | 'warning' | 'success';
}
