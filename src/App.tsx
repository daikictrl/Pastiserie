/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect, useMemo, type FormEvent } from 'react';
import { Icon } from '@iconify/react';
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';
import { CAKE_TIERS, SWEET_PASTRIES, SAVORY_CATERING, type CakeTier, type ProductItem } from './data/products';
import { AnimatedTestimonials, defaultTestimonials } from './components/ui/testimonial';

export default function App() {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [selectedTierFilter, setSelectedTierFilter] = useState<string>('all');
  
  // Gallery Modal state (to browse all 30-80+ images of a tier)
  const [activeModalTier, setActiveModalTier] = useState<CakeTier | null>(null);
  
  // Lightbox Preview state (single image full-view)
  const [activeLightbox, setActiveLightbox] = useState<{
    tierTitle: string;
    tierPrice: string;
    tierId: string;
    image: string;
    index: number;
    total: number;
    allImages?: string[];
  } | null>(null);

  // Custom Quote Form state
  const [quoteName, setQuoteName] = useState('');
  const [quoteOccasion, setQuoteOccasion] = useState('');
  const [quoteDate, setQuoteDate] = useState('');
  const [quoteGuests, setQuoteGuests] = useState('');
  const [quoteBudget, setQuoteBudget] = useState('15 000 - 25 000 FCFA');
  const [quoteFlavor, setQuoteFlavor] = useState('');

  // Lock body scroll when mobile drawer, lightbox, or gallery modal is open
  useEffect(() => {
    if (isMobileMenuOpen || activeLightbox || activeModalTier) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen, activeLightbox, activeModalTier]);

  // Testimonials Data dynamically derived from defaultTestimonials
  // (Directly reflects names and edits made in src/components/ui/testimonial.tsx)
  const testimonialsData = useMemo(() => {
    return defaultTestimonials.map((item, idx) => ({
      ...item,
      // If translations are desired for standard review keys, use them; otherwise preserve the item's quote
      quote: idx === 0 ? t('Review 1 Text') : idx === 1 ? t('Review 2 Text') : idx === 2 ? t('Review 3 Text') : item.quote,
    }));
  }, [t]);

  const toggleLanguage = () => {
    const nextLang = i18n.language.startsWith('fr') ? 'en' : 'fr';
    i18n.changeLanguage(nextLang);
  };

  const WHATSAPP_PHONE = '23799306723';

  // Helper for generating order link for a specific cake
  const getCakeOrderLink = (tier: CakeTier, index: number) => {
    const modelRef = `${tier.id.toUpperCase()}-${String(index + 1).padStart(2, '0')}`;
    const msg = [
      `Bonjour Sweetmeats ! 👋`,
      `Je viens de votre site web et je souhaite commander ce gâteau :`,
      `• Gamme : ${tier.priceFormatted}`,
      `• Modèle : Réf #${modelRef}`,
      `Pouvez-vous me confirmer les disponibilités et modalités de commande ? Merci !`
    ].join('\n');
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
  };

  // Helper for generating order link for a pastry or savory item
  const getProductOrderLink = (item: ProductItem) => {
    const title = t(item.titleKey);
    const msg = [
      `Bonjour Sweetmeats ! 👋`,
      `Je viens de votre site web et je souhaite commander :`,
      `• Article : ${title}`,
      item.priceFormatted ? `• Format / Prix : ${item.priceFormatted}` : '',
      `Pouvez-vous me communiquer les détails de commande et délais de livraison ? Merci !`
    ].filter(Boolean).join('\n');
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`;
  };

  // Helper for custom quote submit
  const handleCustomQuoteSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const msg = [
      `Bonjour Sweetmeats ! 👋`,
      `Je souhaite demander un devis personnalisé :`,
      `• Nom : ${quoteName.trim() || 'Non renseigné'}`,
      `• Événement : ${quoteOccasion.trim() || 'Non renseigné'}`,
      quoteDate ? `• Date prévue : ${quoteDate}` : '',
      quoteGuests ? `• Nombre d'invités / parts : ${quoteGuests}` : '',
      quoteBudget ? `• Budget approximatif : ${quoteBudget}` : '',
      quoteFlavor ? `• Thème ou Saveurs : ${quoteFlavor}` : '',
      `Pouvez-vous me recontacter avec une proposition ? Merci !`
    ].filter(Boolean).join('\n');

    window.open(`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`, '_blank', 'noopener,noreferrer');
  };

  // Filtered tiers based on selection
  const displayedTiers = useMemo(() => {
    if (selectedTierFilter === 'all') return CAKE_TIERS;
    return CAKE_TIERS.filter((t) => t.id === selectedTierFilter);
  }, [selectedTierFilter]);

  // Handle lightbox navigation
  const handleLightboxNav = (direction: 'prev' | 'next') => {
    if (!activeLightbox || !activeLightbox.allImages) return;
    const count = activeLightbox.allImages.length;
    let nextIndex = direction === 'next' ? activeLightbox.index + 1 : activeLightbox.index - 1;
    if (nextIndex < 0) nextIndex = count - 1;
    if (nextIndex >= count) nextIndex = 0;

    setActiveLightbox({
      ...activeLightbox,
      index: nextIndex,
      image: activeLightbox.allImages[nextIndex]
    });
  };

  return (
    <div className="bg-[#FAF7F2] text-[#2D241E] font-poppins antialiased selection:bg-[#E2B1B1] selection:text-white relative min-h-screen">
      {/* Sticky Header with Scrolling Announcement Banner & Navigation */}
      <header className="sticky top-0 z-40 shadow-xs">
        {/* Scrolling Text Banner Above Navigation */}
        <div className="bg-[#261E18] text-[#F3E8DF] py-2 border-b border-[#3D322A] overflow-hidden select-none">
          <div className="animate-marquee flex items-center whitespace-nowrap gap-8 text-xs font-light tracking-wide">
            {/* Set 1 */}
            <div className="flex items-center gap-8 shrink-0">
              <span className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-medium text-white">{t('Delivery Available')}</span>
              </span>
              <span className="text-[#B38743]">•</span>
              <span className="text-[#E8D5C4]">{t('Budget Friendly Desc')}</span>
              <span className="text-[#B38743]">•</span>
              <span className="text-stone-300">🎂 Gâteaux d'anniversaire & cérémonies sur commande</span>
              <span className="text-[#B38743]">•</span>
              <a
                href="https://www.tiktok.com/@imelda.gaelle.maa"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-[#EE1D52] transition-colors flex items-center gap-1.5"
              >
                <span>🎵 TikTok : @Sweetmeats</span>
              </a>
              <span className="text-[#B38743]">•</span>
              <span className="text-amber-200">✨ Service traiteur apéritif salé & sucré</span>
              <span className="text-[#B38743]">•</span>
              <span className="text-stone-300">💬 Commandes rapides au +237 99 30 67 23</span>
              <span className="text-[#B38743]">•</span>
            </div>

            {/* Set 2 (Duplicate for seamless continuous loop) */}
            <div className="flex items-center gap-8 shrink-0" aria-hidden="true">
              <span className="flex items-center gap-2">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span className="font-medium text-white">{t('Delivery Available')}</span>
              </span>
              <span className="text-[#B38743]">•</span>
              <span className="text-[#E8D5C4]">{t('Budget Friendly Desc')}</span>
              <span className="text-[#B38743]">•</span>
              <span className="text-stone-300">🎂 Gâteaux d'anniversaire & cérémonies sur commande</span>
              <span className="text-[#B38743]">•</span>
              <a
                href="https://www.tiktok.com/@imelda.gaelle.maa"
                target="_blank"
                rel="noreferrer"
                className="text-white hover:text-[#EE1D52] transition-colors flex items-center gap-1.5"
              >
                <span>🎵 TikTok : @Sweetmeats</span>
              </a>
              <span className="text-[#B38743]">•</span>
              <span className="text-amber-200">✨ Service traiteur apéritif salé & sucré</span>
              <span className="text-[#B38743]">•</span>
              <span className="text-stone-300">💬 Commandes rapides au +237 99 30 67 23</span>
              <span className="text-[#B38743]">•</span>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="backdrop-blur-md bg-[#FAF7F2]/95 border-b border-[#EFE7DE] transition-all">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Brand Logo & Name */}
              <a href="#" className="flex items-center gap-3 group">
                <img
                  src="/Logo.jpeg"
                  alt="Sweetmeats Logo"
                  className="h-11 w-11 object-cover rounded-full border border-[#D9C8B5] shadow-xs group-hover:scale-105 transition-transform"
                />
                <div>
                  <span className="font-playfair text-xl sm:text-2xl font-bold tracking-tight text-[#261E18] block leading-none">
                    SWEETMEATS
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-[#B38743] font-medium block mt-1">
                    Pâtisserie Fine & Traiteur
                  </span>
                </div>
              </a>

              {/* Desktop Navigation Links */}
              <div className="hidden lg:flex items-center space-x-7">
                <a href="#cakes" className="text-sm font-medium text-[#6B5E52] hover:text-[#B38743] transition-colors">
                  {t('Cakes')}
                </a>
                <a href="#pastries" className="text-sm font-medium text-[#6B5E52] hover:text-[#B38743] transition-colors">
                  {t('Pastries')}
                </a>
                <a href="#savory" className="text-sm font-medium text-[#6B5E52] hover:text-[#B38743] transition-colors">
                  {t('Savory')}
                </a>
                <a href="#custom" className="text-sm font-medium text-[#6B5E52] hover:text-[#B38743] transition-colors">
                  {t('CustomOrders')}
                </a>
                <a href="#about" className="text-sm font-medium text-[#6B5E52] hover:text-[#B38743] transition-colors">
                  {t('About')}
                </a>
              </div>

              {/* Language Toggle & Actions */}
              <div className="flex items-center gap-2 sm:gap-4">
                <button
                  onClick={toggleLanguage}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white border border-[#E6DDD2] text-[#4A3E34] text-xs font-medium hover:border-[#B38743] hover:text-[#B38743] transition-all shadow-xs"
                  aria-label="Toggle Language"
                  title="Changer de langue / Change language"
                >
                  <Icon icon="solar:global-linear" className="text-base text-[#B38743]" />
                  <span className="uppercase font-semibold">{i18n.language.startsWith('fr') ? 'FR' : 'EN'}</span>
                </button>

                <a
                  href="https://www.tiktok.com/@imelda.gaelle.maa"
                  target="_blank"
                  rel="noreferrer"
                  className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white hover:bg-black hover:text-white border border-[#E6DDD2] text-[#261E18] text-xs font-medium transition-all shadow-xs group"
                  title="TikTok: @Sweetmeats"
                >
                  <Icon icon="ic:baseline-tiktok" className="text-base text-[#EE1D52] group-hover:text-white transition-colors" />
                  <span>TikTok</span>
                </a>

                <a
                  href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Bonjour Sweetmeats, je viens de votre site et je souhaite passer une commande !')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="hidden sm:inline-flex items-center gap-2 bg-[#261E18] hover:bg-[#3D3228] text-white text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                  <Icon icon="solar:chat-round-dots-linear" className="text-base text-emerald-400" />
                  <span>WhatsApp</span>
                </a>

                {/* Mobile menu toggle */}
                <button
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="lg:hidden inline-flex items-center justify-center w-10 h-10 text-[#261E18] hover:bg-white rounded-full border border-[#E6DDD2] transition-colors"
                  aria-label="Toggle Menu"
                >
                  <Icon icon={isMobileMenuOpen ? 'solar:close-circle-linear' : 'solar:hamburger-menu-linear'} className="text-2xl" />
                </button>
              </div>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Drawer Menu (Right slide-over sheet with backdrop) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              key="mobile-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs lg:hidden"
              aria-hidden="true"
            />

            {/* Slide-over Side Drawer from the right */}
            <motion.div
              key="mobile-drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 280 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-[300px] sm:w-[340px] max-w-[85vw] h-full bg-[#FAF7F2] shadow-2xl flex flex-col justify-between p-6 border-l border-[#E6DDD2] overflow-y-auto lg:hidden"
            >
              {/* Mobile Drawer Top Bar */}
              <div className="flex items-center justify-between pb-5 border-b border-[#E6DDD2]">
                <div className="flex items-center gap-3">
                  <img
                    src="/Logo.jpeg"
                    alt="Sweetmeats Logo"
                    className="h-10 w-10 object-cover rounded-full border border-[#D9C8B5]"
                  />
                  <div>
                    <span className="font-playfair text-xl font-bold tracking-tight text-[#261E18] block leading-none">
                      SWEETMEATS
                    </span>
                    <span className="text-[10px] uppercase tracking-widest text-[#B38743] font-medium block mt-1">
                      Pâtisserie Fine & Traiteur
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-9 h-9 rounded-full bg-white text-[#261E18] hover:bg-[#F2ECE4] border border-[#E6DDD2] flex items-center justify-center shadow-xs transition-colors"
                  aria-label="Fermer le menu"
                >
                  <Icon icon="solar:close-circle-linear" className="text-2xl" />
                </button>
              </div>

              {/* Navigation Links */}
              <div className="flex flex-col space-y-1.5 py-6 my-auto">
                <a
                  href="#cakes"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between text-base font-medium text-[#261E18] px-3.5 py-3 rounded-xl hover:bg-white hover:text-[#B38743] transition-all"
                >
                  <span className="flex items-center gap-3">
                    <Icon icon="solar:cake-bold-duotone" className="text-xl text-[#B38743]" />
                    <span>{t('Cakes')}</span>
                  </span>
                  <Icon icon="solar:alt-arrow-right-linear" className="text-[#C4B5A5] text-sm" />
                </a>
                <a
                  href="#pastries"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between text-base font-medium text-[#261E18] px-3.5 py-3 rounded-xl hover:bg-white hover:text-[#B38743] transition-all"
                >
                  <span className="flex items-center gap-3">
                    <Icon icon="solar:cupcake-bold-duotone" className="text-xl text-[#B38743]" />
                    <span>{t('Pastries')}</span>
                  </span>
                  <Icon icon="solar:alt-arrow-right-linear" className="text-[#C4B5A5] text-sm" />
                </a>
                <a
                  href="#savory"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between text-base font-medium text-[#261E18] px-3.5 py-3 rounded-xl hover:bg-white hover:text-[#B38743] transition-all"
                >
                  <span className="flex items-center gap-3">
                    <Icon icon="solar:chef-hat-heart-bold-duotone" className="text-xl text-[#B38743]" />
                    <span>{t('Savory')}</span>
                  </span>
                  <Icon icon="solar:alt-arrow-right-linear" className="text-[#C4B5A5] text-sm" />
                </a>
                <a
                  href="#custom"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between text-base font-medium text-[#261E18] px-3.5 py-3 rounded-xl hover:bg-white hover:text-[#B38743] transition-all"
                >
                  <span className="flex items-center gap-3">
                    <Icon icon="solar:magic-stick-3-bold-duotone" className="text-xl text-[#B38743]" />
                    <span>{t('CustomOrders')}</span>
                  </span>
                  <Icon icon="solar:alt-arrow-right-linear" className="text-[#C4B5A5] text-sm" />
                </a>
                <a
                  href="#about"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-between text-base font-medium text-[#261E18] px-3.5 py-3 rounded-xl hover:bg-white hover:text-[#B38743] transition-all"
                >
                  <span className="flex items-center gap-3">
                    <Icon icon="solar:shop-2-bold-duotone" className="text-xl text-[#B38743]" />
                    <span>{t('About')}</span>
                  </span>
                  <Icon icon="solar:alt-arrow-right-linear" className="text-[#C4B5A5] text-sm" />
                </a>
              </div>

              {/* Bottom Actions: WhatsApp & TikTok */}
              <div className="pt-5 border-t border-[#E6DDD2] flex flex-col gap-3">
                <a
                  href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Bonjour Sweetmeats, je souhaite passer une commande !')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-[#261E18] hover:bg-[#3D3228] text-white py-3.5 rounded-xl text-sm font-medium shadow-md transition-all active:scale-98"
                >
                  <Icon icon="solar:chat-round-dots-linear" className="text-emerald-400 text-lg" />
                  <span>Commander sur WhatsApp</span>
                </a>

                <a
                  href="https://www.tiktok.com/@imelda.gaelle.maa"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-black hover:bg-stone-900 text-white py-3 rounded-xl text-sm font-medium border border-stone-800 transition-all active:scale-98"
                >
                  <Icon icon="ic:baseline-tiktok" className="text-lg text-[#EE1D52]" />
                  <span>TikTok: @Sweetmeats</span>
                </a>

                <p className="text-center text-[11px] text-[#8C7E72] mt-1">
                  Yaoundé, Cameroun • +237 99 30 67 23
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="relative pt-12 pb-20 lg:pt-20 lg:pb-32 overflow-hidden bg-gradient-to-b from-[#FAF7F2] via-[#F5EFE6] to-[#FAF7F2]">
        {/* Subtle decorative glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#E8D4BA]/25 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 max-w-2xl text-center lg:text-left">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#EFE4D6] border border-[#DFCBB5] text-[#7A5B2F] text-xs font-medium mb-6">
                <Icon icon="solar:cupcake-linear" className="text-sm" />
                <span>Pâtisserie Fine & Traiteur Salé</span>
              </div>

              <h1 className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#261E18] leading-[1.15] mb-6">
                {t('Delicious Cakes')}{' '}
                <span className="text-[#B38743] italic font-normal block sm:inline">
                  {t('Made With Love')}
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#6B5E52] mb-8 font-light leading-relaxed">
                {t('Hero Description')}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4">
                <a
                  href="#cakes"
                  className="inline-flex items-center gap-2 bg-[#B38743] hover:bg-[#9B7336] text-white text-sm font-medium px-7 py-4 rounded-full transition-all shadow-md hover:shadow-lg active:scale-95"
                >
                  <Icon icon="solar:gift-linear" className="text-lg" />
                  <span>{t('Explore Menu')}</span>
                </a>
                <a
                  href="#savory"
                  className="inline-flex items-center gap-2 bg-white hover:bg-[#F3EAE0] text-[#261E18] border border-[#DDD0C2] text-sm font-medium px-6 py-4 rounded-full transition-all shadow-xs"
                >
                  <Icon icon="solar:chef-hat-heart-linear" className="text-lg text-[#B38743]" />
                  <span>{t('Savory')}</span>
                </a>
              </div>

              {/* Highlights pills */}
              <div className="mt-10 pt-8 border-t border-[#E8DDCE] grid grid-cols-3 gap-4 text-center lg:text-left">
                <div>
                  <p className="font-playfair text-2xl font-bold text-[#261E18]">
                    <CountUp end={250} duration={2} enableScrollSpy scrollSpyOnce />+
                  </p>
                  <p className="text-xs text-[#7A6D60] uppercase tracking-wider font-medium mt-1">
                    Modèles Disponibles
                  </p>
                </div>
                <div>
                  <p className="font-playfair text-2xl font-bold text-[#B38743]">5 Gammes</p>
                  <p className="text-xs text-[#7A6D60] uppercase tracking-wider font-medium mt-1">
                    Dès 10 000 FCFA
                  </p>
                </div>
                <div>
                  <p className="font-playfair text-2xl font-bold text-[#261E18]">100%</p>
                  <p className="text-xs text-[#7A6D60] uppercase tracking-wider font-medium mt-1">
                    Fait Maison & Frais
                  </p>
                </div>
              </div>
            </div>

            {/* Right Visual Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm sm:max-w-md">
                {/* Main Featured Cake Card */}
                <div className="aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#EFE8DF] relative group">
                  <img
                    src={CAKE_TIERS[2]?.images[0] || '/cakes/15k/WhatsApp Image 2026-05-07 at 1.48.51 PM.jpeg'}
                    alt="Signature Celebration Cake"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex flex-col justify-end p-6 text-white">
                    <span className="inline-block bg-[#B38743] text-white text-xs font-semibold px-3 py-1 rounded-full w-fit mb-2">
                      Gamme Signature
                    </span>
                    <h3 className="font-playfair text-2xl font-medium">15 000 FCFA</h3>
                    <p className="text-xs text-stone-200 mt-1">Drip Cake & décors personnalisés</p>
                  </div>
                </div>

                {/* Floating Sweet Pastry Badge */}
                <div className="absolute -top-6 -left-6 bg-white p-3.5 rounded-2xl shadow-xl border border-[#EBE1D5] flex items-center gap-3 animate-pulse">
                  <img
                    src="/Bouquet de cupcake.jpeg"
                    alt="Cupcake floral"
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-[#B38743] block">
                      Spécialité
                    </span>
                    <span className="text-xs font-medium text-[#261E18] block">
                      Bouquet de Cupcakes
                    </span>
                  </div>
                </div>

                {/* Floating Savory Platter Badge */}
                <div className="absolute -bottom-6 -right-6 bg-white p-3.5 rounded-2xl shadow-xl border border-[#EBE1D5] flex items-center gap-3">
                  <img
                    src="/Mini Burger, Sandwich, Babouts, quiche.jpeg"
                    alt="Plateau cocktail"
                    className="w-12 h-12 rounded-xl object-cover"
                  />
                  <div>
                    <span className="text-[10px] uppercase font-semibold text-emerald-600 block">
                      Traiteur Cocktail
                    </span>
                    <span className="text-xs font-medium text-[#261E18] block">
                      Mini Burgers & Salés
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Value Pillars */}
      <section className="py-16 bg-white border-y border-[#EFE7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 p-4 rounded-2xl">
              <div className="w-12 h-12 rounded-2xl bg-[#F6EDE2] text-[#B38743] flex items-center justify-center shrink-0">
                <Icon icon="solar:oven-linear" className="text-2xl" />
              </div>
              <div>
                <h3 className="font-playfair text-lg font-bold text-[#261E18] mb-1">
                  {t('Freshly Baked')}
                </h3>
                <p className="text-xs sm:text-sm text-[#7A6D60] leading-relaxed">
                  {t('Freshly Baked Desc')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl">
              <div className="w-12 h-12 rounded-2xl bg-[#EAF2ED] text-emerald-700 flex items-center justify-center shrink-0">
                <Icon icon="solar:tag-price-linear" className="text-2xl" />
              </div>
              <div>
                <h3 className="font-playfair text-lg font-bold text-[#261E18] mb-1">
                  {t('Budget Friendly')}
                </h3>
                <p className="text-xs sm:text-sm text-[#7A6D60] leading-relaxed">
                  {t('Budget Friendly Desc')}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-4 rounded-2xl">
              <div className="w-12 h-12 rounded-2xl bg-[#FBEFEF] text-[#C26565] flex items-center justify-center shrink-0">
                <Icon icon="solar:magic-stick-3-linear" className="text-2xl" />
              </div>
              <div>
                <h3 className="font-playfair text-lg font-bold text-[#261E18] mb-1">
                  {t('Customizable')}
                </h3>
                <p className="text-xs sm:text-sm text-[#7A6D60] leading-relaxed">
                  {t('Customizable Desc')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CAKES CATALOG BY BUDGET */}
      <section id="cakes" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-12">
            <span className="text-xs font-semibold text-[#B38743] tracking-widest uppercase mb-2 block">
              {t('Cakes SectionTag')}
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#261E18] mb-4">
              {t('Cakes Section Title')}
            </h2>
            <p className="text-sm sm:text-base text-[#6B5E52] font-light">
              {t('Cakes Section Desc')}
            </p>
          </div>

          {/* Budget Filter Tabs */}
          <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-16">
            <button
              onClick={() => setSelectedTierFilter('all')}
              className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                selectedTierFilter === 'all'
                  ? 'bg-[#261E18] text-white shadow-md'
                  : 'bg-white text-[#6B5E52] border border-[#E0D5C7] hover:border-[#B38743] hover:text-[#B38743]'
              }`}
            >
              {t('allBudgets')}
            </button>
            {CAKE_TIERS.map((tier) => (
              <button
                key={tier.id}
                onClick={() => setSelectedTierFilter(tier.id)}
                className={`px-4 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all flex items-center gap-2 ${
                  selectedTierFilter === tier.id
                    ? 'bg-[#B38743] text-white shadow-md'
                    : 'bg-white text-[#6B5E52] border border-[#E0D5C7] hover:border-[#B38743] hover:text-[#B38743]'
                }`}
              >
                <span>{tier.priceFormatted}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.5 rounded-full ${
                    selectedTierFilter === tier.id ? 'bg-white/20 text-white' : 'bg-[#F2ECE3] text-[#7A6D60]'
                  }`}
                >
                  {tier.totalImages}
                </span>
              </button>
            ))}
          </div>

          {/* Tiers List */}
          <div className="space-y-20">
            {displayedTiers.map((tier) => {
              // Highlight the best 8 featured models for direct display
              const featuredImages = tier.images.slice(0, 8);

              return (
                <div key={tier.id} className="bg-[#FAF7F2] rounded-3xl p-6 sm:p-8 border border-[#EBE1D5] shadow-xs">
                  {/* Tier Header Banner */}
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 mb-8 border-b border-[#EBE1D5]">
                    <div>
                      <div className="flex items-center gap-3 mb-1">
                        <span className="bg-[#B38743] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                          {tier.priceFormatted}
                        </span>
                        <span className="text-xs text-[#7A6D60] font-medium">
                          {tier.totalImages} modèles disponibles
                        </span>
                      </div>
                      <h3 className="font-playfair text-2xl sm:text-3xl font-bold text-[#261E18]">
                        {t(tier.titleKey)}
                      </h3>
                      <p className="text-sm text-[#7A6D60] max-w-xl mt-1">
                        {t(tier.descKey)}
                      </p>
                    </div>

                    {/* View All Button */}
                    <button
                      onClick={() => setActiveModalTier(tier)}
                      className="self-start md:self-auto inline-flex items-center gap-2 bg-white hover:bg-[#F5ECE1] text-[#261E18] border border-[#DFCBB5] text-xs sm:text-sm font-medium px-5 py-2.5 rounded-full transition-all shadow-xs shrink-0"
                    >
                      <Icon icon="solar:gallery-wide-linear" className="text-lg text-[#B38743]" />
                      <span>{t('viewAllInTier', { count: tier.totalImages })}</span>
                    </button>
                  </div>

                  {/* Featured Grid (8-10 cards) */}
                  <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                    {featuredImages.map((imgSrc, idx) => {
                      const refCode = `${tier.id.toUpperCase()}-${String(idx + 1).padStart(2, '0')}`;
                      return (
                        <div
                          key={idx}
                          className="group bg-white rounded-2xl overflow-hidden border border-[#EFE8DF] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col"
                        >
                          {/* Image preview with zoom modal trigger */}
                          <div
                            onClick={() =>
                              setActiveLightbox({
                                tierTitle: t(tier.titleKey),
                                tierPrice: tier.priceFormatted,
                                tierId: tier.id,
                                image: imgSrc,
                                index: idx,
                                total: tier.images.length,
                                allImages: tier.images
                              })
                            }
                            className="aspect-square bg-[#F5ECE1] relative overflow-hidden cursor-pointer"
                          >
                            <img
                              src={imgSrc}
                              alt={`Gâteau ${tier.priceFormatted} - ${refCode}`}
                              loading="lazy"
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                            {/* Hover overlay hint */}
                            <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="bg-white/90 backdrop-blur-xs text-[#261E18] text-xs font-medium px-3 py-1.5 rounded-full shadow-md flex items-center gap-1.5">
                                <Icon icon="solar:magnifer-zoom-in-linear" className="text-sm" />
                                Agrandir
                              </span>
                            </div>
                            {/* Reference badge */}
                            <span className="absolute top-2.5 left-2.5 bg-black/60 backdrop-blur-xs text-white text-[10px] font-semibold px-2 py-0.5 rounded-md">
                              #{refCode}
                            </span>
                          </div>

                          {/* Card Content & Action */}
                          <div className="p-3.5 flex flex-col justify-between flex-grow">
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-playfair font-bold text-sm sm:text-base text-[#261E18]">
                                {tier.priceFormatted}
                              </span>
                              <span className="text-[10px] text-[#8C7D70] font-medium uppercase tracking-wider">
                                Fait sur mesure
                              </span>
                            </div>

                            <a
                              href={getCakeOrderLink(tier, idx)}
                              target="_blank"
                              rel="noreferrer"
                              className="w-full inline-flex items-center justify-center gap-1.5 bg-[#FAF7F2] hover:bg-[#261E18] text-[#261E18] hover:text-white border border-[#E6DDD2] hover:border-[#261E18] py-2 rounded-xl text-xs font-medium transition-all"
                            >
                              <Icon icon="solar:chat-round-dots-linear" className="text-sm text-emerald-500" />
                              <span>{t('orderThisModel')}</span>
                            </a>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Bottom prompt to explore the rest */}
                  <div className="mt-8 text-center pt-6 border-t border-[#EFE7DE]">
                    <button
                      onClick={() => setActiveModalTier(tier)}
                      className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#B38743] hover:text-[#8E672B] transition-colors"
                    >
                      <span>{t('viewAllInTier', { count: tier.totalImages })}</span>
                      <Icon icon="solar:arrow-right-linear" className="text-base" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SWEET PASTRIES & MIGNARDISES */}
      <section id="pastries" className="py-24 bg-white border-t border-[#EFE7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold text-[#B38743] tracking-widest uppercase mb-2 block">
              {t('sweetSectionTag')}
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#261E18] mb-4">
              {t('sweetSectionTitle')}
            </h2>
            <p className="text-sm sm:text-base text-[#6B5E52] font-light">
              {t('sweetSectionDesc')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SWEET_PASTRIES.map((item) => (
              <div
                key={item.id}
                className="group bg-[#FAF7F2] rounded-3xl p-4 border border-[#EFE8DF] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-white mb-4 relative">
                    <img
                      src={item.image}
                      alt={t(item.titleKey)}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {item.badgeKey && (
                      <span className="absolute top-3 right-3 bg-[#261E18]/80 backdrop-blur-xs text-white text-[10px] font-medium px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {t(item.badgeKey)}
                      </span>
                    )}
                  </div>
                  <h3 className="font-playfair text-lg font-bold text-[#261E18] mb-1">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-xs text-[#7A6D60] leading-relaxed mb-4">
                    {t(item.descKey)}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EAE1D5]">
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-semibold text-[#B38743]">{item.priceFormatted}</span>
                    <span className="text-[#8C7D70]">Frais & Fait Maison</span>
                  </div>
                  <a
                    href={getProductOrderLink(item)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#261E18] hover:bg-[#3D3228] text-white py-2.5 rounded-xl text-xs font-medium transition-colors"
                  >
                    <Icon icon="solar:cart-plus-linear" className="text-sm" />
                    <span>{t('Order on WhatsApp')}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SAVORY CATERING & FINGER FOOD */}
      <section id="savory" className="py-24 bg-[#F5EFE6] border-t border-[#EAE1D5]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-semibold text-emerald-700 tracking-widest uppercase mb-2 block">
              {t('savorySectionTag')}
            </span>
            <h2 className="font-playfair text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-[#261E18] mb-4">
              {t('savorySectionTitle')}
            </h2>
            <p className="text-sm sm:text-base text-[#6B5E52] font-light">
              {t('savorySectionDesc')}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {SAVORY_CATERING.map((item) => (
              <div
                key={item.id}
                className="group bg-white rounded-3xl p-4 border border-[#E8DDCE] shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-[#FAF7F2] mb-4 relative">
                    <img
                      src={item.image}
                      alt={t(item.titleKey)}
                      loading="lazy"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {item.badgeKey && (
                      <span className="absolute top-3 right-3 bg-emerald-700 text-white text-[10px] font-medium px-2.5 py-1 rounded-full uppercase tracking-wider">
                        {t(item.badgeKey)}
                      </span>
                    )}
                  </div>
                  <h3 className="font-playfair text-lg font-bold text-[#261E18] mb-1">
                    {t(item.titleKey)}
                  </h3>
                  <p className="text-xs text-[#7A6D60] leading-relaxed mb-4">
                    {t(item.descKey)}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#EAE1D5]">
                  <div className="flex items-center justify-between mb-3 text-xs">
                    <span className="font-semibold text-[#B38743]">{item.priceFormatted}</span>
                    <span className="text-emerald-700 font-medium">Pour réceptions</span>
                  </div>
                  <a
                    href={getProductOrderLink(item)}
                    target="_blank"
                    rel="noreferrer"
                    className="w-full inline-flex items-center justify-center gap-2 bg-[#FAF7F2] hover:bg-[#261E18] hover:text-white text-[#261E18] border border-[#DFCBB5] py-2.5 rounded-xl text-xs font-medium transition-colors"
                  >
                    <Icon icon="solar:cart-plus-linear" className="text-sm" />
                    <span>{t('Order on WhatsApp')}</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOM CAKE CONFIGURATOR & QUOTE REQUEST */}
      <section id="custom" className="py-24 bg-white border-t border-[#EFE7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 items-center">
            {/* Form Introduction */}
            <div className="lg:col-span-5">
              <span className="text-xs font-semibold text-[#B38743] tracking-widest uppercase mb-2 block">
                {t('Create Your Dream')}
              </span>
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold tracking-tight text-[#261E18] mb-4">
                {t('Custom Cake Orders')}
              </h2>
              <p className="text-sm sm:text-base text-[#6B5E52] leading-relaxed mb-6 font-light">
                {t('Custom Cake Desc')}
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F6EDE2] text-[#B38743] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon icon="solar:check-circle-linear" className="text-lg" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#261E18]">Designs 100% Personnalisés</h4>
                    <p className="text-xs text-[#7A6D60]">Gâteaux à thème, photos comestibles, toppers sur-mesure et étages grandioses.</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F6EDE2] text-[#B38743] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon icon="solar:check-circle-linear" className="text-lg" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#261E18]">Saveurs Gourmandes au Choix</h4>
                    <p className="text-xs text-[#7A6D60]">Chocolat belge, vanille de Madagascar, framboise, caramel beurre salé, red velvet...</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#F6EDE2] text-[#B38743] flex items-center justify-center shrink-0 mt-0.5">
                    <Icon icon="solar:check-circle-linear" className="text-lg" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-[#261E18]">Réponse Rapide sur WhatsApp</h4>
                    <p className="text-xs text-[#7A6D60]">Votre demande est immédiatement envoyée à notre atelier pour confirmation rapide.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Form Card */}
            <div className="lg:col-span-7 bg-[#FAF7F2] rounded-3xl p-6 sm:p-10 border border-[#E8DDCE] shadow-sm">
              <form onSubmit={handleCustomQuoteSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A3E34] uppercase tracking-wider mb-2">
                      {t('Your Name')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={quoteName}
                      onChange={(e) => setQuoteName(e.target.value)}
                      placeholder="Ex: Diane M."
                      className="w-full bg-white rounded-xl px-4 py-3 text-sm border border-[#DDD0C2] focus:outline-none focus:border-[#B38743] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A3E34] uppercase tracking-wider mb-2">
                      {t('Occasion (e.g., Wedding)')} *
                    </label>
                    <input
                      type="text"
                      required
                      value={quoteOccasion}
                      onChange={(e) => setQuoteOccasion(e.target.value)}
                      placeholder="Ex: Anniversaire 30 ans, Mariage..."
                      className="w-full bg-white rounded-xl px-4 py-3 text-sm border border-[#DDD0C2] focus:outline-none focus:border-[#B38743] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A3E34] uppercase tracking-wider mb-2">
                      {t('Event Date')}
                    </label>
                    <input
                      type="date"
                      value={quoteDate}
                      onChange={(e) => setQuoteDate(e.target.value)}
                      className="w-full bg-white rounded-xl px-4 py-3 text-sm border border-[#DDD0C2] focus:outline-none focus:border-[#B38743] transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A3E34] uppercase tracking-wider mb-2">
                      {t('Guest Count')}
                    </label>
                    <input
                      type="text"
                      value={quoteGuests}
                      onChange={(e) => setQuoteGuests(e.target.value)}
                      placeholder="Ex: 15-20 personnes"
                      className="w-full bg-white rounded-xl px-4 py-3 text-sm border border-[#DDD0C2] focus:outline-none focus:border-[#B38743] transition-colors"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-[#4A3E34] uppercase tracking-wider mb-2">
                      {t('Budget Estimate')}
                    </label>
                    <select
                      value={quoteBudget}
                      onChange={(e) => setQuoteBudget(e.target.value)}
                      className="w-full bg-white rounded-xl px-4 py-3 text-sm border border-[#DDD0C2] focus:outline-none focus:border-[#B38743] transition-colors"
                    >
                      <option value="10 000 - 15 000 FCFA">10 000 - 15 000 FCFA</option>
                      <option value="15 000 - 25 000 FCFA">15 000 - 25 000 FCFA</option>
                      <option value="25 000 - 50 000 FCFA">25 000 - 50 000 FCFA</option>
                      <option value="50 000 FCFA et plus">50 000 FCFA et plus (Mariages & Événements)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#4A3E34] uppercase tracking-wider mb-2">
                      {t('Flavor / Theme')}
                    </label>
                    <input
                      type="text"
                      value={quoteFlavor}
                      onChange={(e) => setQuoteFlavor(e.target.value)}
                      placeholder="Ex: Chocolat & Vanille, thème or et blanc"
                      className="w-full bg-white rounded-xl px-4 py-3 text-sm border border-[#DDD0C2] focus:outline-none focus:border-[#B38743] transition-colors"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 bg-[#261E18] hover:bg-[#3D3228] text-white font-medium py-4 rounded-xl text-sm transition-all shadow-md active:scale-98"
                >
                  <Icon icon="solar:chat-round-dots-linear" className="text-lg text-emerald-400" />
                  <span>{t('Get a Quote')}</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ATELIER STORY & 3D ANIMATED TESTIMONIALS (SIDE BY SIDE) */}
      <section id="about" className="py-24 bg-[#FAF7F2] border-t border-[#EFE7DE]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Story & Atelier Heritage */}
            <div className="lg:col-span-6">
              <span className="text-xs font-semibold text-[#B38743] tracking-widest uppercase mb-2 block">
                {t('Our Story')}
              </span>
              <h2 className="font-playfair text-3xl sm:text-4xl font-bold tracking-tight text-[#261E18] mb-6">
                {t('Baking Memories Since 2020')}
              </h2>
              <div className="space-y-4 text-sm sm:text-base text-[#6B5E52] font-light leading-relaxed">
                <p>{t('Story Desc 1')}</p>
                <p>{t('Story Desc 2')}</p>
              </div>

              <div className="mt-8 flex items-center gap-6">
                <div className="flex items-center gap-2.5">
                  <div className="w-11 h-11 rounded-full bg-[#EAE0D3] flex items-center justify-center text-[#B38743]">
                    <Icon icon="solar:star-fall-minimalistic-linear" className="text-xl" />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-[#261E18] block">4.9 / 5</span>
                    <span className="text-xs text-[#8C7D70]">Satisfaction client</span>
                  </div>
                </div>
                <div className="h-8 w-px bg-[#DDD0C2]"></div>
                <div className="flex items-center gap-2.5">
                  <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                    <Icon icon="solar:box-minimalistic-linear" className="text-xl" />
                  </div>
                  <div>
                    <span className="font-bold text-sm text-[#261E18] block">100% Frais</span>
                    <span className="text-xs text-[#8C7D70]">Confection du jour</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: 3D Stacked Animated Testimonial Card */}
            <div className="lg:col-span-6">
              <AnimatedTestimonials testimonials={testimonialsData} autoplay={true} />
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="bg-[#261E18] text-[#D8CCC1] pt-16 pb-12 border-t border-[#3A2F27]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-[#3A2F27]">
            {/* Brand column */}
            <div>
              <div className="flex items-center gap-3 mb-4">
                <img
                  src="/Logo.jpeg"
                  alt="Sweetmeats Logo"
                  className="h-10 w-10 object-cover rounded-full border border-[#524438]"
                />
                <span className="font-playfair text-xl font-bold tracking-tight text-white">
                  SWEETMEATS
                </span>
              </div>
              <p className="text-xs text-[#A8988B] leading-relaxed mb-6">
                {t('Footer Description')}
              </p>
              <div className="flex flex-col gap-2.5">
                <a
                  href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent('Bonjour Sweetmeats !')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-[#B38743] hover:bg-[#9B7336] text-white text-xs font-semibold px-4 py-2.5 rounded-full transition-colors w-fit"
                >
                  <Icon icon="solar:chat-round-dots-linear" className="text-base" />
                  <span>{t('Contact via WhatsApp')}</span>
                </a>
                <a
                  href="https://www.tiktok.com/@imelda.gaelle.maa"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 bg-stone-900 hover:bg-black text-white text-xs font-semibold px-4 py-2.5 rounded-full transition-colors border border-stone-700 w-fit"
                >
                  <Icon icon="ic:baseline-tiktok" className="text-base text-[#EE1D52]" />
                  <span>TikTok: @Sweetmeats</span>
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {t('Quick Links')}
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li>
                  <a href="#cakes" className="hover:text-white transition-colors">
                    {t('Cakes')}
                  </a>
                </li>
                <li>
                  <a href="#pastries" className="hover:text-white transition-colors">
                    {t('Pastries')}
                  </a>
                </li>
                <li>
                  <a href="#savory" className="hover:text-white transition-colors">
                    {t('Savory')}
                  </a>
                </li>
                <li>
                  <a href="#custom" className="hover:text-white transition-colors">
                    {t('CustomOrders')}
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition-colors">
                    {t('About')}
                  </a>
                </li>
              </ul>
            </div>

            {/* Budget Ranges */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                Nos Tarifs Gâteaux
              </h4>
              <ul className="space-y-2 text-xs text-[#A8988B]">
                <li>• Gamme 10 000 FCFA (85 modèles)</li>
                <li>• Gamme 12 000 FCFA (42 modèles)</li>
                <li>• Gamme 15 000 FCFA (36 modèles)</li>
                <li>• Gamme 20 000 FCFA (8 modèles)</li>
                <li>• Gamme 25 000 FCFA+ (79 modèles)</li>
              </ul>
            </div>

            {/* Contact info */}
            <div>
              <h4 className="text-sm font-semibold text-white uppercase tracking-wider mb-4">
                {t('Contact Info')}
              </h4>
              <ul className="space-y-3 text-xs text-[#A8988B]">
                <li className="flex items-center gap-2">
                  <Icon icon="solar:phone-linear" className="text-base text-[#B38743]" />
                  <span>+237 99 30 67 23 (WhatsApp & Appels)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="solar:clock-circle-linear" className="text-base text-[#B38743]" />
                  <span>{t('Mon - Sun')}</span>
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="ic:baseline-tiktok" className="text-base text-[#EE1D52]" />
                  <a
                    href="https://www.tiktok.com/@imelda.gaelle.maa"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors"
                  >
                    TikTok: @Sweetmeats
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <Icon icon="solar:map-point-linear" className="text-base text-[#B38743]" />
                  <span>{t('Location')}</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#8C7D70] gap-4">
            <p>{t('All rights reserved')}</p>
            <p>Confectionné avec amour pour vos célébrations gourmandes.</p>
          </div>
        </div>
      </footer>

      {/* FULL GALLERY MODAL (BROWSE ALL 30-80+ PHOTOS OF A TIER) */}
      <AnimatePresence>
        {activeModalTier && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
          >
            {/* Modal Header */}
            <div className="bg-[#FAF7F2] rounded-2xl p-4 sm:p-6 shadow-xl flex items-center justify-between mb-4 border border-[#E6DDD2]">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="bg-[#B38743] text-white text-xs font-bold px-2.5 py-0.5 rounded-full">
                    {activeModalTier.priceFormatted}
                  </span>
                  <span className="text-xs text-[#7A6D60] font-medium">
                    {t('modalGallerySubtitle', { count: activeModalTier.totalImages })}
                  </span>
                </div>
                <h3 className="font-playfair text-xl sm:text-2xl font-bold text-[#261E18]">
                  {t('modalGalleryTitle', { tier: activeModalTier.priceFormatted })}
                </h3>
              </div>

              <button
                onClick={() => setActiveModalTier(null)}
                className="w-10 h-10 rounded-full bg-white hover:bg-[#EAE0D3] text-[#261E18] flex items-center justify-center transition-colors shadow-xs border border-[#DDD0C2]"
                aria-label="Fermer la galerie"
              >
                <Icon icon="solar:close-circle-linear" className="text-2xl" />
              </button>
            </div>

            {/* Scrollable Grid of All Images in this Tier */}
            <div className="flex-grow overflow-y-auto pr-1">
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3 sm:gap-4">
                {activeModalTier.images.map((imgSrc, idx) => {
                  const refCode = `${activeModalTier.id.toUpperCase()}-${String(idx + 1).padStart(2, '0')}`;
                  return (
                    <div
                      key={idx}
                      className="group bg-white rounded-xl overflow-hidden border border-[#E6DDD2] shadow-xs hover:shadow-lg transition-all flex flex-col"
                    >
                      <div
                        onClick={() =>
                          setActiveLightbox({
                            tierTitle: t(activeModalTier.titleKey),
                            tierPrice: activeModalTier.priceFormatted,
                            tierId: activeModalTier.id,
                            image: imgSrc,
                            index: idx,
                            total: activeModalTier.images.length,
                            allImages: activeModalTier.images
                          })
                        }
                        className="aspect-square bg-[#F5ECE1] relative overflow-hidden cursor-pointer"
                      >
                        <img
                          src={imgSrc}
                          alt={`Gâteau #${refCode}`}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                        <span className="absolute bottom-1.5 left-1.5 bg-black/60 backdrop-blur-xs text-white text-[9px] font-semibold px-1.5 py-0.5 rounded">
                          #{refCode}
                        </span>
                      </div>
                      <div className="p-2">
                        <a
                          href={getCakeOrderLink(activeModalTier, idx)}
                          target="_blank"
                          rel="noreferrer"
                          className="w-full inline-flex items-center justify-center gap-1 bg-[#FAF7F2] hover:bg-[#261E18] text-[#261E18] hover:text-white py-1.5 rounded-lg text-[11px] font-medium transition-colors border border-[#E0D5C7]"
                        >
                          <Icon icon="solar:chat-round-dots-linear" className="text-xs text-emerald-500" />
                          <span>Commander</span>
                        </a>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="pt-3 text-center text-xs text-[#EAE0D3]">
              <span>Cliquez sur n'importe quel modèle pour l'agrandir ou le commander sur WhatsApp.</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* LIGHTBOX SINGLE-IMAGE FULL-VIEW MODAL */}
      <AnimatePresence>
        {activeLightbox && (() => {
          const tier = CAKE_TIERS.find((t) => t.id === activeLightbox.tierId);
          const refCode = `#${activeLightbox.tierId.toUpperCase()}-${String(activeLightbox.index + 1).padStart(2, '0')}`;
          const portionsKey = `portion${activeLightbox.tierId}`;

          return (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
            >
              <div className="relative max-w-4xl w-full bg-[#FAF7F2] rounded-3xl overflow-hidden shadow-2xl border border-[#DFCBB5] my-auto">
                {/* Lightbox Header Bar */}
                <div className="px-5 py-3.5 flex items-center justify-between border-b border-[#EAE0D3] bg-white">
                  <div className="flex items-center gap-2.5">
                    <span className="bg-[#B38743] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                      {activeLightbox.tierPrice}
                    </span>
                    <span className="text-xs sm:text-sm text-[#261E18] font-semibold">
                      {refCode}
                    </span>
                    <span className="text-xs text-[#8C7D70] hidden sm:inline">
                      ({activeLightbox.index + 1} / {activeLightbox.total})
                    </span>
                  </div>
                  <button
                    onClick={() => setActiveLightbox(null)}
                    className="w-9 h-9 rounded-full bg-[#FAF7F2] hover:bg-[#EAE0D3] text-[#261E18] flex items-center justify-center transition-colors border border-[#DDD0C2]"
                    aria-label="Fermer"
                  >
                    <Icon icon="solar:close-circle-linear" className="text-xl" />
                  </button>
                </div>

                {/* 2-Column Showcase Grid */}
                <div className="grid grid-cols-1 md:grid-cols-12 items-stretch">
                  {/* Left Column: Image with Next/Prev Controls */}
                  <div className="md:col-span-7 bg-[#1A1410] relative flex items-center justify-center min-h-[340px] sm:min-h-[420px] md:min-h-[480px] p-4 overflow-hidden select-none">
                    <img
                      src={activeLightbox.image}
                      alt={`Gâteau ${activeLightbox.tierPrice} - ${refCode}`}
                      className="max-h-[62vh] w-auto max-w-full object-contain rounded-xl shadow-lg transition-transform duration-300"
                    />

                    {/* Prev Arrow */}
                    {activeLightbox.allImages && activeLightbox.allImages.length > 1 && (
                      <button
                        onClick={() => handleLightboxNav('prev')}
                        className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md active:scale-90"
                        aria-label="Précédent"
                      >
                        <Icon icon="solar:alt-arrow-left-linear" className="text-2xl" />
                      </button>
                    )}

                    {/* Next Arrow */}
                    {activeLightbox.allImages && activeLightbox.allImages.length > 1 && (
                      <button
                        onClick={() => handleLightboxNav('next')}
                        className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center backdrop-blur-md transition-all shadow-md active:scale-90"
                        aria-label="Suivant"
                      >
                        <Icon icon="solar:alt-arrow-right-linear" className="text-2xl" />
                      </button>
                    )}

                    {/* Counter pill at bottom on mobile */}
                    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-xs text-white text-[11px] px-3 py-1 rounded-full font-medium sm:hidden">
                      {activeLightbox.index + 1} / {activeLightbox.total}
                    </div>
                  </div>

                  {/* Right Column: Descriptions & Details Panel */}
                  <div className="md:col-span-5 p-6 sm:p-7 flex flex-col justify-between bg-white border-t md:border-t-0 md:border-l border-[#EAE0D3]">
                    <div className="space-y-4">
                      {/* Category & Title */}
                      <div>
                        <span className="text-[11px] font-semibold text-[#B38743] uppercase tracking-wider block mb-1">
                          {tier ? t(tier.titleKey) : activeLightbox.tierTitle}
                        </span>
                        <h4 className="font-playfair text-2xl font-bold text-[#261E18]">
                          {activeLightbox.tierPrice}
                        </h4>
                        <p className="text-xs text-[#7A6D60] mt-1.5 leading-relaxed font-light">
                          {tier ? t(tier.descKey) : 'Gâteau de célébration artisanal confectionné sur commande avec des ingrédients frais de premier choix.'}
                        </p>
                      </div>

                      {/* Specs / Features List */}
                      <div className="pt-3 border-t border-[#F0EBE1] space-y-3">
                        <div className="flex items-start gap-2.5 text-xs">
                          <div className="w-6 h-6 rounded-lg bg-[#FAF7F2] text-[#B38743] flex items-center justify-center shrink-0 mt-0.5">
                            <Icon icon="solar:users-group-rounded-linear" className="text-sm" />
                          </div>
                          <div>
                            <span className="font-semibold text-[#261E18] block">{t('suggestedPortions')}</span>
                            <span className="text-[#7A6D60]">{t(portionsKey)}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 text-xs">
                          <div className="w-6 h-6 rounded-lg bg-[#FAF7F2] text-[#B38743] flex items-center justify-center shrink-0 mt-0.5">
                            <Icon icon="solar:clock-circle-linear" className="text-sm" />
                          </div>
                          <div>
                            <span className="font-semibold text-[#261E18] block">{t('leadTime')}</span>
                            <span className="text-[#7A6D60]">{t('leadTimeValue')}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 text-xs">
                          <div className="w-6 h-6 rounded-lg bg-[#FAF7F2] text-[#B38743] flex items-center justify-center shrink-0 mt-0.5">
                            <Icon icon="solar:cupcake-linear" className="text-sm" />
                          </div>
                          <div>
                            <span className="font-semibold text-[#261E18] block">{t('flavorsAvailable')}</span>
                            <span className="text-[#7A6D60]">{t('flavorsList')}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 text-xs">
                          <div className="w-6 h-6 rounded-lg bg-[#FAF7F2] text-[#B38743] flex items-center justify-center shrink-0 mt-0.5">
                            <Icon icon="solar:magic-stick-3-linear" className="text-sm" />
                          </div>
                          <div>
                            <span className="font-semibold text-[#261E18] block">{t('customizationIncluded')}</span>
                            <span className="text-[#7A6D60]">{t('customizationValue')}</span>
                          </div>
                        </div>

                        <div className="flex items-start gap-2.5 text-xs">
                          <div className="w-6 h-6 rounded-lg bg-[#FAF7F2] text-emerald-600 flex items-center justify-center shrink-0 mt-0.5">
                            <Icon icon="solar:delivery-linear" className="text-sm" />
                          </div>
                          <div>
                            <span className="font-semibold text-[#261E18] block">{t('deliveryInfo')}</span>
                            <span className="text-[#7A6D60]">{t('deliveryValue')}</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom CTA Block */}
                    <div className="pt-5 mt-5 border-t border-[#F0EBE1] space-y-2.5">
                      <a
                        href={`https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(
                          `Bonjour Sweetmeats ! 👋\nJe souhaite commander ce modèle de gâteau :\n• Gamme : ${activeLightbox.tierPrice}\n• Référence : ${refCode}\nPouvez-vous me confirmer les disponibilités ? Merci !`
                        )}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full inline-flex items-center justify-center gap-2 bg-[#261E18] hover:bg-[#3D3228] text-white text-xs sm:text-sm font-semibold py-3.5 px-5 rounded-2xl transition-all shadow-md hover:shadow-lg active:scale-98"
                      >
                        <Icon icon="solar:chat-round-dots-linear" className="text-lg text-emerald-400" />
                        <span>{t('orderThisModelWhatsapp')}</span>
                      </a>
                      <p className="text-[11px] text-center text-[#8C7D70]">
                        ⚡ {t('whatsappFastResponse')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
