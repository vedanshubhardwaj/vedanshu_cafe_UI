import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { ArrowDownRight, ArrowRight } from 'lucide-react';
import { IMAGES } from '../data/cafeData';
import { SmartImage } from './SmartImage';

interface ParallaxHeroProps {
  onNavigate: (sectionId: string) => void;
}

export function ParallaxHero({ onNavigate }: ParallaxHeroProps) {
  const heroRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  });

  const imageY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, 72]);
  const imageScale = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [1, 1] : [1.02, 1.1]
  );
  const copyY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? [0, 0] : [0, -24]);

  return (
    <section
      id="top"
      ref={heroRef}
      className="relative bg-white border-b border-[#E7E0D6] overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10 pt-10 pb-12 lg:pt-14 lg:pb-16">
        {/* Balanced 2-Column Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          <motion.div
            style={{ y: copyY }}
            initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 flex flex-col justify-between py-2 lg:py-4"
          >
            <div>
              <p className="text-xs font-medium tracking-wide text-[#5C341E] mb-4">
                Botanical Courtyard Café · Wood-Fired Bakery · Est. 2019
              </p>

              <h1 className="font-serif text-[clamp(2.4rem,4.3vw,4.1rem)] leading-[1.06] tracking-[-0.02em] font-normal text-stone-900 mb-6">
                Warm oak fire, wild yeast, and single-origin clarity.
              </h1>

              <p className="text-base lg:text-[17px] leading-relaxed text-stone-600 max-w-lg mb-8">
                Inside a sunlit limestone courtyard, we bake naturally leavened loaves over white
                oak embers and pour floral washed coffees beside potted olive and citrus trees.
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={() => onNavigate('reserve')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-medium text-white bg-[#5C341E] hover:bg-[#3D2314] rounded-md transition-all duration-200 hover:-translate-y-0.5 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Reserve a Courtyard Table</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => onNavigate('flight')}
                  className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-medium text-stone-800 bg-[#FAF9F7] hover:bg-[#F4F1EC] border border-[#E7E0D6] rounded-md transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
                >
                  <span>Build Tasting Flight</span>
                  <ArrowDownRight className="w-4 h-4 text-[#5C341E]" />
                </button>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-[#E7E0D6] flex items-center justify-between text-xs text-stone-500">
              <span>142 Linden Passage · Botanical Quarter</span>
              <span className="font-mono tabular-figures text-stone-700">Open 07:00 – 18:00</span>
            </div>
          </motion.div>

          {/* Parallax Courtyard Frame */}
          <div className="lg:col-span-7 relative">
            <motion.div
              initial={prefersReducedMotion ? false : { opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              className="relative h-full min-h-[340px] lg:min-h-[520px] rounded-lg overflow-hidden border border-[#E7E0D6] bg-[#F4F1EC]"
            >
              <motion.div
                style={{ y: imageY, scale: imageScale }}
                className="w-full h-full will-change-transform"
              >
                <SmartImage
                  src={IMAGES.heroCourtyard}
                  alt="Sunlit botanical courtyard at Linden & Hearth with olive trees and oak cafe tables"
                  loading="eager"
                  fallbackTitle="Linden & Hearth Botanical Courtyard"
                  className="w-full h-full object-cover object-center"
                />
              </motion.div>
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/65 via-black/25 to-transparent"
              />
              <div className="absolute bottom-4 left-5 right-5 flex flex-wrap items-center justify-between gap-2 text-xs text-white/95">
                <span className="font-medium">The Olive Tree Courtyard · Morning Service</span>
                <span className="font-mono tabular-figures text-white/85">
                  34°N · Filtered Daylight
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Full-Width 4-Column Hospitality Strip Below Hero Split */}
        <div className="mt-10 lg:mt-12 pt-8 border-t border-[#E7E0D6] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          <div className="space-y-1">
            <p className="text-xs font-medium text-stone-500">First Hearth Bake</p>
            <p className="font-serif text-lg text-stone-900">
              <span className="font-mono tabular-figures text-[#5C341E]">07:00</span> Daily
            </p>
            <p className="text-xs text-stone-500">Sourdough miches &amp; laminated pastries</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium text-stone-500">Roastery Pour-Over Bar</p>
            <p className="font-serif text-lg text-stone-900">Single-Origin Micro-Lots</p>
            <p className="text-xs text-stone-500">Colombia · Ethiopia · Kenya washed lots</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium text-stone-500">Courtyard Tasting Flights</p>
            <p className="font-serif text-lg text-stone-900">3-Course Pairing</p>
            <p className="text-xs text-stone-500">Custom pour, hearth bake &amp; preserve</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs font-medium text-stone-500">Table Reservations</p>
            <p className="font-serif text-lg text-stone-900">Four Seated Zones</p>
            <p className="text-xs text-stone-500">Courtyard · Conservatory · Hearth · Bar</p>
          </div>
        </div>
      </div>
    </section>
  );
}
