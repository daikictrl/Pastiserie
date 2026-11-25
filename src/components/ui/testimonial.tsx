import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Icon } from '@iconify/react';

export type Testimonial = {
  quote: string;
  name: string;
  designation: string;
  src: string;
};

export const defaultTestimonials: Testimonial[] = [
  {
    quote:
      "Le gâteau d'anniversaire commandé pour ma fille était magnifique et tellement moelleux ! Tout le monde a demandé le contact. Bravo Sweetmeats !",
    name: "Ambomo Joseph",
    designation: "Gâteau d'Anniversaire — Douala",
    src: "/testimonials/WhatsApp Image 2026-11-25 at 3.57.38 PM.jpeg",
  },
  {
    quote:
      "Le plateau cocktail salé avec les mini burgers et brochettes de plantain a fait l'unanimité lors de notre réception. Produits très frais et bien assaisonnés !",
    name: "Ngah Noah",
    designation: "Plateau Traiteur Événement — Yaoundé",
    src: "/testimonials/WhatsApp Image 2026-11-25 at 4.08.40 PM.jpeg",
  },
  {
    quote:
      "Commande ultra simple sur WhatsApp, respect scrupuleux du modèle choisi et livraison ponctuelle. Vous avez gagné des clients fidèles pour tous nos événements.",
    name: "Mme. Shouki",
    designation: "Cliente Régulière — Douala",
    src: "/testimonials/WhatsApp Image 2026-11-25 at 4.16.51 PM.jpeg",
  },
  {
    quote:
      "Pour notre mariage, le gâteau à étages était grandiose et la pièce montée a émerveillé tous nos invités. Les saveurs praliné et vanille étaient divines.",
    name: "Mme. Marcelle",
    designation: "Gâteau de Mariage — Douala",
    src: "/testimonials/WhatsApp Image 2026-11-25 at 4.16.52 PM (1).jpeg",
  },
  {
    quote:
      "Les nems faits maison et les samoussas dorés sont les meilleurs de la ville. Toujours croustillants, chauds et livrés avec le sourire.",
    name: "Mme. Mvondo",
    designation: "Cocktail d'Entreprise — Yaoundé",
    src: "/testimonials/WhatsApp Image 2026-11-25 at 4.16.52 PM.jpeg",
  },
];

export const AnimatedTestimonials = ({
  testimonials = defaultTestimonials,
  autoplay = true,
}: {
  testimonials?: Testimonial[];
  autoplay?: boolean;
}) => {
  const [active, setActive] = useState(0);

  const handleNext = useCallback(() => {
    setActive((prev) => (prev + 1) % testimonials.length);
  }, [testimonials.length]);

  const handlePrev = () => {
    setActive((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!autoplay) return;
    const interval = setInterval(handleNext, 5500);
    return () => clearInterval(interval);
  }, [autoplay, handleNext]);

  const isActive = (index: number) => index === active;

  // Stable slight rotations for the 3D card deck
  const rotations = [-5, 6, -4, 5, -3];
  const getRotation = (index: number) => `${rotations[index % rotations.length]}deg`;

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E8DDCE] shadow-md relative overflow-hidden flex flex-col justify-between h-full">
      {/* Decorative quotes background badge */}
      <Icon
        icon="solar:quote-down-linear"
        className="text-6xl text-[#F5ECE1] absolute top-4 right-6 pointer-events-none select-none opacity-60"
      />

      {/* Top Header */}
      <div className="flex items-center justify-between mb-6 relative z-10">
        <span className="text-xs font-semibold text-[#B38743] uppercase tracking-wider flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[#B38743]"></span>
          Avis Clients Vérifiés
        </span>
        <div className="flex items-center gap-1 text-[#B38743]">
          {[...Array(5)].map((_, i) => (
            <Icon key={i} icon="solar:star-bold" className="text-xs text-[#B38743]" />
          ))}
        </div>
      </div>

      {/* Main Content Area: 3D Stacked Photo Deck + Quote Text */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 sm:gap-6 items-center my-auto relative z-10">
        {/* 3D Stacked Image Card Deck */}
        <div className="sm:col-span-5 flex justify-center">
          <div className="relative h-44 w-36 sm:h-52 sm:w-40">
            <AnimatePresence>
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.src + index}
                  initial={{ opacity: 0, scale: 0.9, y: 30, rotate: getRotation(index) }}
                  animate={{
                    opacity: isActive(index) ? 1 : 0.55,
                    scale: isActive(index) ? 1 : 0.92,
                    y: isActive(index) ? 0 : 12,
                    zIndex: isActive(index) ? testimonials.length : testimonials.length - Math.abs(index - active),
                    rotate: isActive(index) ? '0deg' : getRotation(index),
                  }}
                  exit={{ opacity: 0, scale: 0.9, y: -30 }}
                  transition={{ duration: 0.45, ease: 'easeInOut' }}
                  className="absolute inset-0 origin-bottom"
                  style={{ perspective: '1000px' }}
                >
                  <div className="h-full w-full rounded-2xl overflow-hidden shadow-xl border-2 border-white bg-[#EAE0D3]">
                    <img
                      src={testimonial.src}
                      alt={testimonial.name}
                      width={400}
                      height={500}
                      draggable={false}
                      className="h-full w-full object-cover transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.src = `https://placehold.co/400x500/FAF7F2/B38743?text=${testimonial.name.charAt(0)}`;
                        e.currentTarget.onerror = null;
                      }}
                    />
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* Text Area */}
        <div className="sm:col-span-7">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="space-y-3"
            >
              <p className="text-xs sm:text-sm text-[#4A3E34] font-light leading-relaxed italic line-clamp-4">
                "{testimonials[active].quote}"
              </p>
              <div>
                <h4 className="font-playfair text-base sm:text-lg font-bold text-[#261E18]">
                  {testimonials[active].name}
                </h4>
                <p className="text-[11px] text-[#B38743] font-medium">
                  {testimonials[active].designation}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="flex items-center justify-between pt-5 mt-4 border-t border-[#F0EBE1] relative z-10">
        {/* Prev / Next Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            aria-label="Témoignage précédent"
            className="group flex h-9 w-9 items-center justify-center rounded-full bg-[#FAF7F2] border border-[#DDD0C2] hover:bg-[#261E18] hover:border-[#261E18] transition-all shadow-2xs active:scale-95"
          >
            <ArrowLeft className="h-4 w-4 text-[#261E18] group-hover:text-white transition-colors" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Témoignage suivant"
            className="group flex h-9 w-9 items-center justify-center rounded-full bg-[#FAF7F2] border border-[#DDD0C2] hover:bg-[#261E18] hover:border-[#261E18] transition-all shadow-2xs active:scale-95"
          >
            <ArrowRight className="h-4 w-4 text-[#261E18] group-hover:text-white transition-colors" />
          </button>
        </div>

        {/* Indicator dots */}
        <div className="flex gap-1.5 items-center">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                active === i ? 'w-5 bg-[#B38743]' : 'w-1.5 bg-[#DFCBB5] hover:bg-[#B38743]/60'
              }`}
              aria-label={`Aller au témoignage ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AnimatedTestimonials;
