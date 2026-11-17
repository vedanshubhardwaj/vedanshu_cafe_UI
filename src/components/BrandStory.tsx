import { useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'motion/react';
import { CRAFT_PILLARS, IMAGES } from '../data/cafeData';
import { SmartImage } from './SmartImage';

export function BrandStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const primaryImageY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [28, -32]
  );
  const secondaryImageY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-18, 36]
  );

  const activePillar = CRAFT_PILLARS[activeIndex];

  return (
    <section
      id="story"
      ref={sectionRef}
      className="bg-[#FAF9F7] border-b border-[#E7E0D6] py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-medium text-[#5C341E] mb-3">Our Craft &amp; Provenance</p>
          <h2 className="font-serif text-[clamp(1.85rem,3.2vw,2.85rem)] leading-[1.12] tracking-[-0.02em] text-stone-900">
            Rooted in heirloom grain, botanical stillness, and patient fermentation.
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-start">
          {/* Left Column: Interactive Editorial Pillars */}
          <div className="lg:col-span-6 space-y-2">
            {CRAFT_PILLARS.map((pillar, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <button
                  key={pillar.index}
                  type="button"
                  onClick={() => setActiveIndex(idx)}
                  className={`w-full text-left p-6 rounded-lg border transition-all duration-200 cursor-pointer ${
                    isSelected
                      ? 'bg-white border-[#5C341E]/35 shadow-sm'
                      : 'bg-transparent border-transparent hover:bg-white/60 hover:border-[#E7E0D6]'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-4 mb-2">
                    <h3 className="font-serif text-xl lg:text-[22px] text-stone-900">
                      <span className="font-mono text-sm text-[#5C341E] mr-3 tabular-figures">
                        {pillar.index}.
                      </span>
                      {pillar.title}
                    </h3>
                    <span className="text-xs font-medium text-stone-500 whitespace-nowrap shrink-0">
                      {isSelected ? 'Selected' : 'Read'}
                    </span>
                  </div>

                  <p className="text-[15px] leading-relaxed text-stone-600 mb-3">
                    {pillar.summary}
                  </p>

                  <p className="text-xs text-stone-500 font-medium">{pillar.metric}</p>
                </button>
              );
            })}

            <div className="pt-6 px-2 grid grid-cols-3 gap-6 border-t border-[#E7E0D6] mt-6">
              <div>
                <p className="font-mono text-2xl font-medium text-stone-900 tabular-figures">72h</p>
                <p className="text-xs text-stone-500 mt-1">Cold dough fermentation</p>
              </div>
              <div>
                <p className="font-mono text-2xl font-medium text-stone-900 tabular-figures">
                  14
                </p>
                <p className="text-xs text-stone-500 mt-1">Courtyard herbs &amp; figs</p>
              </div>
              <div>
                <p className="font-mono text-2xl font-medium text-stone-900 tabular-figures">
                  93°C
                </p>
                <p className="text-xs text-stone-500 mt-1">Pour-over brew water</p>
              </div>
            </div>
          </div>

          {/* Right Column: Dual Counter-Moving Parallax Editorial Frames */}
          <div className="lg:col-span-6 grid grid-cols-12 gap-5 items-center relative">
            <motion.div
              style={{ y: primaryImageY }}
              className="col-span-7 will-change-transform"
            >
              <div className="aspect-[4/3] rounded-lg overflow-hidden border border-[#E7E0D6] bg-white">
                <SmartImage
                  key={activePillar.image}
                  src={activePillar.image}
                  alt={activePillar.imageAlt}
                  fallbackTitle={activePillar.title}
                  className="w-full h-full object-cover transition-opacity duration-300"
                />
              </div>
              <p className="mt-3 text-xs text-stone-500">
                {activePillar.index}. {activePillar.title}
              </p>
            </motion.div>

            <motion.div
              style={{ y: secondaryImageY }}
              className="col-span-5 pt-12 will-change-transform"
            >
              <div className="aspect-[3/4] rounded-lg overflow-hidden border border-[#E7E0D6] bg-white">
                <SmartImage
                  src={
                    activeIndex === 2 ? IMAGES.glassConservatory : IMAGES.espressoBar
                  }
                  alt="Roasted chestnut espresso bar and morning conservatory atmosphere"
                  fallbackTitle="Espresso Bar"
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="mt-3 text-xs text-stone-500">
                Roasted chestnut bar · Daily 07:00–18:00
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
