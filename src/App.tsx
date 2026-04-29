/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Icon } from '@iconify/react';
import CountUp from 'react-countup';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const { t, i18n } = useTranslation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const reviews = [
    { textKey: 'Review 1 Text', initials: 'SA', name: 'Sarah A.', typeKey: 'Birthday Order' },
    { textKey: 'Review 2 Text', initials: 'RK', name: 'Rohan K.', typeKey: 'Custom Order' },
    { textKey: 'Review 3 Text', initials: 'MP', name: 'Priya M.', typeKey: 'Regular Customer' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentReviewIndex((prev) => (prev + 1) % reviews.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const toggleLanguage = () => {
    i18n.changeLanguage(i18n.language.startsWith('fr') ? 'en' : 'fr');
  };

  return (
    <div className="bg-[#FAFAF8] text-[#4A4238] font-poppins antialiased selection:bg-[#E3C2C9] selection:text-white relative min-h-screen">
      {/* Navigation */}
      <nav className="fixed w-full z-50 top-0 transition-all duration-300 backdrop-blur-md bg-[#FAFAF8]/80 border-b border-[#F0EBE1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center gap-3">
              <img src="/Logo.jpeg" alt="Sweetmeats Logo" className="h-10 w-auto object-contain mix-blend-multiply rounded-md" />
              <a href="#" className="font-playfair text-xl font-medium tracking-tighter text-[#4A4238]">
                SWEETMEATS
              </a>
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#" className="text-sm font-medium text-[#8B847A] hover:text-[#D5ABB3] transition-colors">{t('Home')}</a>
              <a href="#menu" className="text-sm font-medium text-[#8B847A] hover:text-[#D5ABB3] transition-colors">{t('Menu')}</a>
              <a href="#about" className="text-sm font-medium text-[#8B847A] hover:text-[#D5ABB3] transition-colors">{t('About')}</a>
              <a href="#contact" className="text-sm font-medium text-[#8B847A] hover:text-[#D5ABB3] transition-colors">{t('Contact')}</a>
            </div>
            <div className="flex items-center gap-2 sm:gap-4">
              <button 
                onClick={toggleLanguage} 
                className="inline-flex items-center justify-center w-10 h-10 bg-transparent hover:bg-[#F0EBE1] text-[#4A4238] rounded-full transition-all duration-300"
                aria-label="Toggle Language"
                title={t('Language')}
              >
                <Icon icon="solar:global-linear" className="text-2xl" strokeWidth="1.5" />
              </button>
              <a href="https://wa.me/237651928589?text=Hi,%20I%20would%20like%20to%20know%20more%20about%20your%20cakes!%20(Le%20Client%20si%20vient%20du%20site)" target="_blank" rel="noreferrer" className="hidden sm:inline-flex items-center gap-2 bg-[#D5ABB3] hover:bg-[#C99CA5] text-white text-sm font-medium px-5 py-2.5 rounded-full transition-all duration-300 shadow-[0_4px_14px_0_rgba(213,171,179,0.39)] hover:shadow-[0_6px_20px_rgba(213,171,179,0.23)]">
                <Icon icon="solar:phone-linear" strokeWidth="1.5" />
                {t('Say Hello')}
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden inline-flex items-center justify-center w-10 h-10 text-[#4A4238] hover:bg-[#F0EBE1] rounded-full transition-colors"
                aria-label="Toggle Menu"
              >
                <Icon icon={isMobileMenuOpen ? "solar:close-circle-linear" : "solar:hamburger-menu-linear"} className="text-2xl" strokeWidth="1.5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-40 bg-[#FAFAF8] pt-24 px-6 md:hidden transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="flex flex-col space-y-6 text-center">
          <a href="#" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium text-[#4A4238]">{t('Home')}</a>
          <a href="#menu" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium text-[#4A4238]">{t('Menu')}</a>
          <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium text-[#4A4238]">{t('About')}</a>
          <a href="#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-medium text-[#4A4238]">{t('Contact')}</a>
          <a href="https://wa.me/237651928589?text=Hi,%20I%20would%20like%20to%20know%20more%20about%20your%20cakes!%20(Le%20Client%20si%20vient%20du%20site)" target="_blank" rel="noreferrer" className="inline-flex items-center justify-center gap-2 bg-[#D5ABB3] hover:bg-[#C99CA5] text-white text-base font-medium px-6 py-3 rounded-full transition-all duration-300 mt-4 mx-auto w-fit">
            <Icon icon="solar:phone-linear" strokeWidth="1.5" />
            {t('Say Hello')}
          </a>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-medium mb-8">
                <Icon icon="solar:clock-circle-linear" strokeWidth="1.5" />
                {t('Delivery Available')}
              </div>
              <h1 className="font-playfair text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight text-[#2D2823] leading-[1.1] mb-6">
                {t('Delicious Cakes')} <br />
                <span className="text-[#C6A664] italic font-normal">{t('Made With Love')}</span>
              </h1>
              <p className="text-lg text-[#8B847A] mb-10 max-w-lg font-light leading-relaxed">
                {t('Hero Description')}
              </p>
              <div className="flex flex-wrap items-center gap-4">
                <a href="https://wa.me/237651928589?text=Hi,%20I%20want%20to%20place%20an%20order!%20(Le%20Client%20si%20vient%20du%20site)" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#2D2823] hover:bg-[#1A1714] text-white text-sm font-medium px-6 py-3.5 rounded-full transition-all duration-300">
                  <Icon icon="solar:cart-large-minimalistic-linear" className="text-lg" strokeWidth="1.5" />
                  {t('Order Now on WhatsApp')}
                </a>
                <a href="#menu" className="inline-flex items-center gap-2 bg-transparent hover:bg-[#F0EBE1] text-[#4A4238] border border-[#E5E0D8] text-sm font-medium px-6 py-3.5 rounded-full transition-all duration-300">
                  {t('Explore Menu')}
                </a>
              </div>
            </div>
            <div className="relative lg:ml-auto w-full max-w-lg">
              {/* Decorative background blur */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#E3C2C9]/30 to-[#C6A664]/20 blur-3xl rounded-full transform -translate-x-10 translate-y-10"></div>
              <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden border border-white/50 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)]">
                <img src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Elegant tiered cake" className="object-cover w-full h-full" />
              </div>
              
              {/* Floating Badge */}
              <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-[#F0EBE1] flex items-center gap-4 animate-bounce" style={{ animationDuration: '3s' }}>
                <div className="w-12 h-12 rounded-full bg-[#FCF8F9] flex items-center justify-center text-[#D5ABB3]">
                  <Icon icon="solar:star-fall-minimalistic-linear" className="text-2xl" strokeWidth="1.5" />
                </div>
                <div>
                  <p className="text-xs text-[#8B847A] font-medium uppercase tracking-wider">{t('Rated')}</p>
                  <p className="text-sm font-medium text-[#2D2823]"><CountUp end={4.9} decimals={1} duration={2.5} enableScrollSpy scrollSpyOnce />/5 {t('by Customers')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-white border-y border-[#F0EBE1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-3xl hover:bg-[#FAFAF8] transition-colors duration-300">
              <div className="w-14 h-14 rounded-full bg-[#FCF8F9] text-[#D5ABB3] flex items-center justify-center mb-6">
                <Icon icon="solar:leaf-linear" className="text-3xl" strokeWidth="1.5" />
              </div>
              <h3 className="font-playfair text-xl tracking-tight text-[#2D2823] font-medium mb-3">{t('Freshly Baked')}</h3>
              <p className="text-sm text-[#8B847A] font-light leading-relaxed">{t('Freshly Baked Desc')}</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-3xl hover:bg-[#FAFAF8] transition-colors duration-300">
              <div className="w-14 h-14 rounded-full bg-amber-50 text-[#C6A664] flex items-center justify-center mb-6">
                <Icon icon="solar:magic-stick-3-linear" className="text-3xl" strokeWidth="1.5" />
              </div>
              <h3 className="font-playfair text-xl tracking-tight text-[#2D2823] font-medium mb-3">{t('Customizable')}</h3>
              <p className="text-sm text-[#8B847A] font-light leading-relaxed">{t('Customizable Desc')}</p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-3xl hover:bg-[#FAFAF8] transition-colors duration-300">
              <div className="w-14 h-14 rounded-full bg-stone-50 text-[#4A4238] flex items-center justify-center mb-6">
                <Icon icon="solar:crown-linear" className="text-3xl" strokeWidth="1.5" />
              </div>
              <h3 className="font-playfair text-xl tracking-tight text-[#2D2823] font-medium mb-3">{t('Premium Quality')}</h3>
              <p className="text-sm text-[#8B847A] font-light leading-relaxed">{t('Premium Quality Desc')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Product Section */}
      <section id="menu" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="text-xs font-medium text-[#D5ABB3] tracking-widest uppercase mb-3 block">{t('Our Menu')}</span>
            <h2 className="font-playfair text-4xl sm:text-5xl tracking-tight font-medium text-[#2D2823] mb-4">{t('Signature Collections')}</h2>
            <p className="text-sm text-[#8B847A] font-light">{t('Menu Description')}</p>
          </div>

          {/* Category: Classic Flavours */}
          <div className="mb-16">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-playfair text-2xl tracking-tight font-medium text-[#2D2823]">{t('Classic Flavours')}</h3>
              <div className="h-px bg-[#F0EBE1] flex-grow ml-6 hidden sm:block"></div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[
                { name: 'Bouquet de cupcake', img: '/Bouquet de cupcake.jpeg', priceLarge: '₹1200', priceSmall: '₹650' },
                { name: 'Bûche de Noël', img: '/bûche de Noël.jpeg', priceLarge: '₹1500', priceSmall: '₹800' },
                { name: 'Mignardises', img: '/Mignardises.jpeg', priceLarge: '₹1100', priceSmall: '₹600' },
                { name: 'Beignets sucré', img: '/Beignets sucre.jpeg', priceLarge: '₹900', priceSmall: '₹450' },
                { name: 'Brochettes de viande, Plantain', img: '/Brochettes de boulettes de viande-Plantain.jpeg', priceLarge: '₹1400', priceSmall: '₹750' },
                { name: 'Mini Burger, Sandwich, Quiche', img: '/Mini Burger, Sandwich, Babouts, quiche.jpeg', priceLarge: '₹1600', priceSmall: '₹850' },
                { name: 'Nems', img: '/Nems.jpeg', priceLarge: '₹1000', priceSmall: '₹550' },
                { name: 'Pizza', img: '/Pizza.jpeg', priceLarge: '₹1300', priceSmall: '₹700' },
                { name: 'Poulet panés et frits', img: '/Poulet panes et frits.jpeg', priceLarge: '₹1250', priceSmall: '₹680' },
                { name: 'Roulé, Croissant, Mini tacos', img: '/Roule viande, Croissant jambon, Mini tacos.jpeg', priceLarge: '₹1550', priceSmall: '₹820' },
                { name: 'Samousa', img: '/Samousa.jpeg', priceLarge: '₹950', priceSmall: '₹500' }
              ].map((item, idx) => (
                <div key={idx} className="group relative bg-white rounded-[1.5rem] p-3 border border-[#F0EBE1] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_-12px_rgba(213,171,179,0.3)] transition-all duration-500">
                  <div className="aspect-[4/3] rounded-[1rem] overflow-hidden bg-[#FAFAF8] mb-4 relative">
                    <img src={item.img} alt={item.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
                  </div>
                  <div className="px-2 pb-2">
                    <h4 className="font-playfair text-lg tracking-tight text-[#2D2823] font-medium mb-1 truncate" title={item.name}>{item.name}</h4>
                    <div className="flex items-center gap-2 text-xs text-[#8B847A] mb-4">
                      <span>{t('Custom Sizes')}</span>
                      <span className="w-1 h-1 rounded-full bg-[#D5ABB3]"></span>
                      <span>{t('Made to Order')}</span>
                    </div>
                    <a href={`https://wa.me/237651928589?text=Hi,%20I%20want%20to%20order%20${encodeURIComponent(item.name)}%20(Le%20Client%20si%20vient%20du%20site)`} target="_blank" rel="noreferrer" className="w-full inline-flex items-center justify-center gap-2 bg-[#FAFAF8] hover:bg-[#FCF8F9] hover:text-[#D5ABB3] text-[#4A4238] py-2.5 rounded-xl text-sm font-medium transition-colors border border-[#F0EBE1] hover:border-[#E3C2C9]">
                      <Icon icon="solar:cart-plus-linear" strokeWidth="1.5" />
                      {t('Order on WhatsApp')}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Category: Chocolate & Premium */}
          <div className="mb-10">
            <div className="flex items-center justify-between mb-8">
              <h3 className="font-playfair text-2xl tracking-tight font-medium text-[#2D2823]">{t('Chocolate & Premium')}</h3>
              <div className="h-px bg-[#F0EBE1] flex-grow ml-6 hidden sm:block"></div>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Product Card 5 */}
              <div className="group relative bg-white rounded-[1.5rem] p-3 border border-[#F0EBE1] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_-12px_rgba(213,171,179,0.3)] transition-all duration-500">
                <div className="aspect-[4/3] rounded-[1rem] overflow-hidden bg-[#FAFAF8] mb-4 relative">
                  <img src="/Chocolate Drip Cake with Fresh Fruit - Gosia Cake.jpg" alt="Chocolate Drip Cake" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
                  <span className="absolute top-3 right-3 bg-[#2D2823] text-white text-[10px] font-medium px-2 py-1 rounded-md uppercase tracking-wide">{t('Bestseller')}</span>
                </div>
                <div className="px-2 pb-2">
                  <h4 className="font-playfair text-lg tracking-tight text-[#2D2823] font-medium mb-1">Chocolate Drip Cake with Fresh Fruit - Gosia Cake</h4>
                  <div className="flex items-center gap-2 text-xs text-[#8B847A] mb-4">
                    <span>{t('Custom Sizes')}</span>
                    <span className="w-1 h-1 rounded-full bg-[#D5ABB3]"></span>
                    <span>{t('Made to Order')}</span>
                  </div>
                  <a href="https://wa.me/237651928589?text=Hi,%20I%20want%20to%20order%20Chocolate%20Drip%20Cake%20with%20Fresh%20Fruit%20-%20Gosia%20Cake%20(Le%20Client%20si%20vient%20du%20site)" target="_blank" rel="noreferrer" className="w-full inline-flex items-center justify-center gap-2 bg-[#FAFAF8] hover:bg-[#FCF8F9] hover:text-[#D5ABB3] text-[#4A4238] py-2.5 rounded-xl text-sm font-medium transition-colors border border-[#F0EBE1] hover:border-[#E3C2C9]">
                    <Icon icon="solar:cart-plus-linear" strokeWidth="1.5" />
                    {t('Order on WhatsApp')}
                  </a>
                </div>
              </div>
              {/* Product Card 6 */}
              <div className="group relative bg-white rounded-[1.5rem] p-3 border border-[#F0EBE1] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_-12px_rgba(213,171,179,0.3)] transition-all duration-500">
                <div className="aspect-[4/3] rounded-[1rem] overflow-hidden bg-[#FAFAF8] mb-4 relative">
                  <img src="https://images.unsplash.com/photo-1606890737304-57a1ca8a5b62?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Dark Forest Symphony" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="px-2 pb-2">
                  <h4 className="font-playfair text-lg tracking-tight text-[#2D2823] font-medium mb-1">Dark Forest Symphony</h4>
                  <div className="flex items-center gap-2 text-xs text-[#8B847A] mb-4">
                    <span>{t('Custom Sizes')}</span>
                    <span className="w-1 h-1 rounded-full bg-[#D5ABB3]"></span>
                    <span>{t('Made to Order')}</span>
                  </div>
                  <a href="https://wa.me/237651928589?text=Hi,%20I%20want%20to%20order%20Dark%20Forest%20Symphony%20(Le%20Client%20si%20vient%20du%20site)" target="_blank" rel="noreferrer" className="w-full inline-flex items-center justify-center gap-2 bg-[#FAFAF8] hover:bg-[#FCF8F9] hover:text-[#D5ABB3] text-[#4A4238] py-2.5 rounded-xl text-sm font-medium transition-colors border border-[#F0EBE1] hover:border-[#E3C2C9]">
                    <Icon icon="solar:cart-plus-linear" strokeWidth="1.5" />
                    {t('Order on WhatsApp')}
                  </a>
                </div>
              </div>
              {/* Product Card 7 */}
              <div className="group relative bg-white rounded-[1.5rem] p-3 border border-[#F0EBE1] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_-12px_rgba(213,171,179,0.3)] transition-all duration-500">
                <div className="aspect-[4/3] rounded-[1rem] overflow-hidden bg-[#FAFAF8] mb-4 relative">
                  <img src="https://images.unsplash.com/photo-1588195538326-c5b1e9f80a1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Caramel Macchiato" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="px-2 pb-2">
                  <h4 className="font-playfair text-lg tracking-tight text-[#2D2823] font-medium mb-1">Caramel Macchiato</h4>
                  <div className="flex items-center gap-2 text-xs text-[#8B847A] mb-4">
                    <span>{t('Custom Sizes')}</span>
                    <span className="w-1 h-1 rounded-full bg-[#D5ABB3]"></span>
                    <span>{t('Made to Order')}</span>
                  </div>
                  <a href="https://wa.me/237651928589?text=Hi,%20I%20want%20to%20order%20Caramel%20Macchiato%20(Le%20Client%20si%20vient%20du%20site)%20" target="_blank" rel="noreferrer" className="w-full inline-flex items-center justify-center gap-2 bg-[#FAFAF8] hover:bg-[#FCF8F9] hover:text-[#D5ABB3] text-[#4A4238] py-2.5 rounded-xl text-sm font-medium transition-colors border border-[#F0EBE1] hover:border-[#E3C2C9]">
                    <Icon icon="solar:cart-plus-linear" strokeWidth="1.5" />
                    {t('Order on WhatsApp')}
                  </a>
                </div>
              </div>
               {/* Product Card 8 */}
               <div className="group relative bg-white rounded-[1.5rem] p-3 border border-[#F0EBE1] shadow-[0_4px_20px_-10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_-12px_rgba(213,171,179,0.3)] transition-all duration-500">
                <div className="aspect-[4/3] rounded-[1rem] overflow-hidden bg-[#FAFAF8] mb-4 relative">
                  <img src="/Black & Gold Luxe Birthday Cake.jpg" alt="Black & Gold Luxe Birthday Cake" className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700" />
                </div>
                <div className="px-2 pb-2">
                  <h4 className="font-playfair text-lg tracking-tight text-[#2D2823] font-medium mb-1">Black & Gold Luxe Birthday Cake</h4>
                  <div className="flex items-center gap-2 text-xs text-[#8B847A] mb-4">
                    <span>{t('Custom Sizes')}</span>
                    <span className="w-1 h-1 rounded-full bg-[#D5ABB3]"></span>
                    <span>{t('Made to Order')}</span>
                  </div>
                  <a href="https://wa.me/237651928589?text=Hi,%20I%20want%20to%20order%20Black%20%26%20Gold%20Luxe%20Birthday%20Cake%20(Le%20Client%20si%20vient%20du%20site)" target="_blank" rel="noreferrer" className="w-full inline-flex items-center justify-center gap-2 bg-[#FAFAF8] hover:bg-[#FCF8F9] hover:text-[#D5ABB3] text-[#4A4238] py-2.5 rounded-xl text-sm font-medium transition-colors border border-[#F0EBE1] hover:border-[#E3C2C9]">
                    <Icon icon="solar:cart-plus-linear" strokeWidth="1.5" />
                    {t('Order on WhatsApp')}
                  </a>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-12">
            <a href="#menu" className="inline-flex items-center gap-2 text-sm font-medium text-[#C6A664] hover:text-[#B39352] transition-colors">
              {t('View All Our Special & Signature Art')}
              <Icon icon="solar:arrow-right-linear" strokeWidth="1.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Custom Cake Banner */}
      <section className="py-16 bg-[#2D2823] relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1558301211-0d8c8ddee6ec?ixlib=rb-4.0.3&auto=format&fit=crop&w=1500&q=80')] opacity-10 object-cover w-full h-full mix-blend-overlay"></div>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <span className="text-xs font-medium text-[#C6A664] tracking-widest uppercase mb-3 block">{t('Create Your Dream')}</span>
          <h2 className="font-playfair text-3xl sm:text-4xl tracking-tight font-medium text-white mb-6">{t('Custom Cake Orders')}</h2>
          <p className="text-sm text-[#A8A29A] font-light max-w-2xl mx-auto mb-10">{t('Custom Cake Desc')}</p>
          
          <form action="https://wa.me/237651928589" method="get" target="_blank" className="max-w-3xl mx-auto bg-white/5 backdrop-blur-sm p-6 sm:p-8 rounded-3xl border border-white/10 flex flex-col sm:flex-row gap-4">
            <input type="hidden" name="text" value="Hi, I want to inquire about a custom cake order (C'est un client qui vient du site)." />
            <input type="text" placeholder={t('Your Name')} className="flex-1 bg-transparent border-b border-white/20 focus:border-[#D5ABB3] outline-none py-3 text-sm text-white placeholder:text-white/40 transition-colors" />
            <input type="text" placeholder={t('Occasion (e.g., Wedding)')} className="flex-1 bg-transparent border-b border-white/20 focus:border-[#D5ABB3] outline-none py-3 text-sm text-white placeholder:text-white/40 transition-colors" />
            <button type="submit" className="inline-flex items-center justify-center gap-2 bg-[#D5ABB3] hover:bg-[#C99CA5] text-white text-sm font-medium px-8 py-3.5 rounded-xl transition-all duration-300 mt-4 sm:mt-0 flex-shrink-0">
              {t('Get a Quote')}
              <Icon icon="solar:arrow-right-linear" strokeWidth="1.5" />
            </button>
          </form>
        </div>
      </section>

      {/* About Us */}
      <section id="about" className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <div className="absolute -inset-4 bg-[#FCF8F9] rounded-[2.5rem] transform -rotate-3 z-0"></div>
              <img src="/Logo.jpeg" alt="Sweetmeats Logo" className="relative z-10 rounded-[2rem] shadow-xl object-cover w-full h-full aspect-[4/5]" />
            </div>
            <div>
              <span className="text-xs font-medium text-[#D5ABB3] tracking-widest uppercase mb-3 block">{t('Our Story')}</span>
              <h2 className="font-playfair text-3xl sm:text-4xl tracking-tight font-medium text-[#2D2823] mb-6">{t('Baking Memories Since 2020')}</h2>
              <p className="text-sm text-[#8B847A] font-light leading-relaxed mb-6">
                {t('Story Desc 1')}
              </p>
              <p className="text-sm text-[#8B847A] font-light leading-relaxed mb-10">
                {t('Story Desc 2')}
              </p>
              <div className="flex items-center gap-6">
                <div className="text-center">
                  <p className="font-playfair text-3xl text-[#C6A664] font-medium"><CountUp end={5} duration={2.5} enableScrollSpy scrollSpyOnce />k+</p>
                  <p className="text-xs text-[#8B847A] uppercase tracking-wide mt-1">{t('Cakes Baked')}</p>
                </div>
                <div className="w-px h-10 bg-[#F0EBE1]"></div>
                <div className="text-center">
                  <p className="font-playfair text-3xl text-[#C6A664] font-medium"><CountUp end={100} duration={2.5} enableScrollSpy scrollSpyOnce />%</p>
                  <p className="text-xs text-[#8B847A] uppercase tracking-wide mt-1">{t('Freshness')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section id="gallery" className="py-20 bg-white border-t border-[#F0EBE1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row justify-between items-end mb-12">
            <div>
              <span className="text-xs font-medium text-[#D5ABB3] tracking-widest uppercase mb-3 block">{t('Gallery')}</span>
              <h2 className="font-playfair text-3xl tracking-tight font-medium text-[#2D2823]">{t('Follow Us on Facebook')}</h2>
            </div>
            <a href="https://m.facebook.com/search_results/?q=sweet+meats+p%C3%A2tisserie" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-[#4A4238] hover:text-[#D5ABB3] transition-colors mt-4 sm:mt-0">
              <Icon icon="mdi:facebook" className="text-xl" strokeWidth="1.5" />
              @sweet Meats Patisserie
            </a>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <a href="#" className="group relative aspect-square rounded-2xl overflow-hidden bg-[#FAFAF8] sm:aspect-auto sm:h-80">
              <img src="/Gateau personnalise'(Mikey).jpeg" alt="Insta Post" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-[#2D2823]/0 group-hover:bg-[#2D2823]/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Icon icon="solar:heart-linear" className="text-white text-3xl" strokeWidth="1.5" />
              </div>
            </a>
            <a href="#" className="group relative aspect-square rounded-2xl overflow-hidden bg-[#FAFAF8] sm:aspect-auto sm:h-80">
              <img src="/Gateau personnalise'(animaux).jpeg" alt="Insta Post" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-[#2D2823]/0 group-hover:bg-[#2D2823]/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Icon icon="solar:heart-linear" className="text-white text-3xl" strokeWidth="1.5" />
              </div>
            </a>
            <a href="#" className="group relative aspect-square rounded-2xl overflow-hidden bg-[#FAFAF8] sm:aspect-auto sm:h-80">
              <img src="/Genoise Choco fourage.jpeg" alt="Insta Post" className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700" />
              <div className="absolute inset-0 bg-[#2D2823]/0 group-hover:bg-[#2D2823]/30 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                <Icon icon="solar:heart-linear" className="text-white text-3xl" strokeWidth="1.5" />
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="py-24 bg-[#FCF8F9]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-playfair text-3xl sm:text-4xl tracking-tight font-medium text-[#2D2823]">{t('Sweet Words from You')}</h2>
          </div>
          <div className="relative min-h-[300px] sm:min-h-[320px] w-full max-w-4xl mx-auto flex items-stretch">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentReviewIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="w-full flex"
              >
                <div className="bg-white p-8 sm:p-12 rounded-[2.5rem] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.06)] border border-[#F0EBE1] w-full flex flex-col justify-center items-center text-center">
                  <div className="flex text-[#C6A664] mb-6">
                    <Icon icon="solar:star-bold" strokeWidth="1.5" className="text-xl" />
                    <Icon icon="solar:star-bold" strokeWidth="1.5" className="text-xl" />
                    <Icon icon="solar:star-bold" strokeWidth="1.5" className="text-xl" />
                    <Icon icon="solar:star-bold" strokeWidth="1.5" className="text-xl" />
                    <Icon icon="solar:star-bold" strokeWidth="1.5" className="text-xl" />
                  </div>
                  <p className="text-lg sm:text-xl text-[#4A4238] leading-relaxed mb-8 italic font-light max-w-2xl text-balance">
                    "{t(reviews[currentReviewIndex].textKey)}"
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-[#FAFAF8] flex items-center justify-center text-sm font-medium text-[#8B847A] border border-[#F0EBE1]">
                      {reviews[currentReviewIndex].initials}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-medium text-[#2D2823]">{reviews[currentReviewIndex].name}</p>
                      <p className="text-xs text-[#C6A664] uppercase tracking-wider mt-0.5">{t(reviews[currentReviewIndex].typeKey)}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
          <div className="flex justify-center gap-3 mt-10">
            {reviews.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentReviewIndex(idx)}
                className={`transition-all duration-300 rounded-full ${idx === currentReviewIndex ? 'w-8 h-2 bg-[#D5ABB3]' : 'w-2 h-2 bg-[#E5E0D8] hover:bg-[#D5ABB3]/50'}`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Footer / Contact */}
      <footer id="contact" className="bg-white pt-20 pb-10 border-t border-[#F0EBE1]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            <div className="md:col-span-5">
              <div className="flex items-center gap-3 mb-6">
                <img src="/Logo.jpeg" alt="Sweetmeats Logo" className="h-10 w-auto object-contain mix-blend-multiply rounded-md" />
                <span className="font-playfair text-xl font-medium tracking-tighter text-[#2D2823]">SWEETMEATS</span>
              </div>
              <p className="text-sm text-[#8B847A] font-light mb-8 max-w-sm">{t('Footer Description')}</p>
              <a href="https://wa.me/237651928589?text=Hi,%20I%20have%20an%20inquiry%20(Le%20Client%20si%20vient%20du%20site)." target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#2D2823] hover:bg-[#1A1714] text-white text-sm font-medium px-6 py-3 rounded-xl transition-all duration-300 w-fit">
                <Icon icon="solar:letter-linear" strokeWidth="1.5" />
                {t('Contact via WhatsApp')}
              </a>
            </div>
            <div className="md:col-span-3">
              <h4 className="font-medium text-[#2D2823] mb-6 tracking-tight">{t('Quick Links')}</h4>
              <ul className="space-y-4">
                <li><a href="#" className="text-sm text-[#8B847A] hover:text-[#D5ABB3] transition-colors">{t('Home')}</a></li>
                <li><a href="#menu" className="text-sm text-[#8B847A] hover:text-[#D5ABB3] transition-colors">{t('Menu')}</a></li>
                <li><a href="#about" className="text-sm text-[#8B847A] hover:text-[#D5ABB3] transition-colors">{t('About')}</a></li>
                <li><a href="#contact" className="text-sm text-[#8B847A] hover:text-[#D5ABB3] transition-colors">{t('Contact')}</a></li>
              </ul>
            </div>
            <div className="md:col-span-4">
              <h4 className="font-medium text-[#2D2823] mb-6 tracking-tight">{t('Contact Info')}</h4>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <Icon icon="solar:map-point-linear" className="text-[#D5ABB3] text-lg mt-0.5" strokeWidth="1.5" />
                  <span className="text-sm text-[#8B847A] font-light">Ngousso, Yaounde</span>
                </li>
                <li className="flex items-center gap-3">
                  <Icon icon="solar:phone-linear" className="text-[#D5ABB3] text-lg" strokeWidth="1.5" />
                  <span className="text-sm text-[#8B847A] font-light">+237 6 51 92 85 89</span>
                </li>
                <li className="flex items-center gap-3">
                  <Icon icon="solar:clock-circle-linear" className="text-[#D5ABB3] text-lg" strokeWidth="1.5" />
                  <span className="text-sm text-[#8B847A] font-light">{t('Mon - Sun')}</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-[#F0EBE1] flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-xs text-[#8B847A]">{t('All rights reserved')}</p>
            <div className="flex items-center gap-4 text-[#8B847A]">
              <a href="#" className="hover:text-[#D5ABB3] transition-colors"><Icon icon="solar:plate-linear" className="text-lg" strokeWidth="1.5" /></a>
              <a href="#" className="hover:text-[#D5ABB3] transition-colors"><Icon icon="solar:shop-linear" className="text-lg" strokeWidth="1.5" /></a>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating WhatsApp Button */}
      <a href="https://wa.me/237651928589?text=Hi,%20I%20want%20to%20order%20a%20cake!%20(Le%20Client%20si%20vient%20du%20site)" target="_blank" rel="noreferrer" className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white w-14 h-14 rounded-full flex items-center justify-center shadow-[0_8px_30px_rgba(37,211,102,0.4)] hover:scale-110 transition-transform duration-300 group">
        <span className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-20"></span>
        <svg className="w-8 h-8 relative z-10" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.045.072.045.419-.1.824zm-3.423-14.416c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-5.824 4.74-10.563 10.564-10.563 5.826 0 10.564 4.74 10.564 10.564 0 5.827-4.739 10.565-10.564 10.565z"></path></svg>
      </a>
    </div>
  );
}

