import { useEffect, useRef, useState } from 'react';
import {
  AnimatePresence,
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'motion/react';
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react';
import { GALLERY_ITEMS } from '../data/cafeData';
import { GalleryItem, SeatingZoneId } from '../types/cafe';
import { SmartImage } from './SmartImage';

interface AmbianceGalleryProps {
  onReserveZone: (zoneId: SeatingZoneId) => void;
}

export function AmbianceGallery({ onReserveZone }: AmbianceGalleryProps) {
  const galleryRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [activePhotoIndex, setActivePhotoIndex] = useState<number | null>(null);

  const { scrollYProgress } = useScroll({
    target: galleryRef,
    offset: ['start end', 'end start'],
  });

  // Three staggered vertical travel rates for multi-column editorial depth
  const colOneY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [20, -28]
  );
  const colTwoY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [-12, 24]
  );
  const colThreeY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? [0, 0] : [28, -36]
  );

  const columns: [GalleryItem[], GalleryItem[], GalleryItem[]] = [
    [GALLERY_ITEMS[0], GALLERY_ITEMS[4]],
    [GALLERY_ITEMS[1], GALLERY_ITEMS[2]],
    [GALLERY_ITEMS[3], GALLERY_ITEMS[5]],
  ];

  const colTransforms = [colOneY, colTwoY, colThreeY];

  const activePhoto =
    activePhotoIndex !== null ? GALLERY_ITEMS[activePhotoIndex] : null;

  useEffect(() => {
    if (activePhotoIndex === null) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setActivePhotoIndex(null);
      } else if (event.key === 'ArrowRight') {
        setActivePhotoIndex((prev) =>
          prev === null ? null : (prev + 1) % GALLERY_ITEMS.length
        );
      } else if (event.key === 'ArrowLeft') {
        setActivePhotoIndex((prev) =>
          prev === null
            ? null
            : (prev - 1 + GALLERY_ITEMS.length) % GALLERY_ITEMS.length
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activePhotoIndex]);

  return (
    <section
      id="gallery"
      ref={galleryRef}
      className="bg-white border-b border-[#E7E0D6] py-20 lg:py-28 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#5C341E] mb-3">
              Curated Ambiance Gallery
            </p>
            <h2 className="font-serif text-[clamp(1.85rem,3.2vw,2.85rem)] leading-[1.12] tracking-[-0.02em] text-stone-900">
              Four distinct rooms shaped by limestone, timber, and daylight.
            </h2>
          </div>

          <p className="text-sm text-stone-500 max-w-sm">
            Select any architectural frame to inspect seating notes or jump directly to
            reserving that room.
          </p>
        </div>

        {/* 3-Column Staggered Parallax Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-start">
          {columns.map((colItems, colIdx) => (
            <motion.div
              key={colIdx}
              style={{ y: colTransforms[colIdx] }}
              className={`space-y-6 lg:space-y-8 will-change-transform ${
                colIdx === 1 ? 'md:pt-10' : colIdx === 2 ? 'md:pt-4' : ''
              }`}
            >
              {colItems.map((item) => {
                const flatIndex = GALLERY_ITEMS.findIndex((g) => g.id === item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActivePhotoIndex(flatIndex)}
                    className="group block w-full text-left rounded-lg overflow-hidden border border-[#E7E0D6] bg-[#FAF9F7] focus-visible:outline-[#5C341E] cursor-pointer"
                  >
                    <div className={`relative overflow-hidden ${item.aspectClass}`}>
                      <SmartImage
                        src={item.image}
                        alt={`${item.title} — ${item.caption}`}
                        fallbackTitle={item.title}
                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      />
                      <div
                        aria-hidden="true"
                        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-200"
                      />

                      <div className="absolute top-3.5 right-3.5 w-8 h-8 rounded-full bg-white/90 text-stone-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                        <Expand className="w-3.5 h-3.5" />
                      </div>

                      <div className="absolute inset-x-0 bottom-0 p-5 text-white">
                        <p className="text-[11px] text-white/80 mb-1">
                          {item.zone} · {item.lightingNote}
                        </p>
                        <h3 className="font-serif text-lg font-normal text-white">
                          {item.title}
                        </h3>
                      </div>
                    </div>
                  </button>
                );
              })}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Full-Screen Accessible Lightbox */}
      <AnimatePresence>
        {activePhoto && activePhotoIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-stone-950/88 backdrop-blur-sm"
            role="dialog"
            aria-modal="true"
            aria-label={activePhoto.title}
            onClick={() => setActivePhotoIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-5xl bg-white rounded-lg overflow-hidden border border-[#E7E0D6] shadow-2xl grid grid-cols-1 lg:grid-cols-12"
            >
              <div className="lg:col-span-8 bg-stone-900 relative flex items-center justify-center max-h-[72vh]">
                <SmartImage
                  src={activePhoto.image}
                  alt={activePhoto.title}
                  fallbackTitle={activePhoto.title}
                  className="w-full h-full max-h-[72vh] object-cover"
                />

                <button
                  type="button"
                  aria-label="Previous photo"
                  onClick={() =>
                    setActivePhotoIndex(
                      (activePhotoIndex - 1 + GALLERY_ITEMS.length) %
                        GALLERY_ITEMS.length
                    )
                  }
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-900 flex items-center justify-center shadow-md transition-colors cursor-pointer"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>

                <button
                  type="button"
                  aria-label="Next photo"
                  onClick={() =>
                    setActivePhotoIndex((activePhotoIndex + 1) % GALLERY_ITEMS.length)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-stone-900 flex items-center justify-center shadow-md transition-colors cursor-pointer"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              <div className="lg:col-span-4 p-6 lg:p-8 flex flex-col justify-between bg-white">
                <div>
                  <div className="flex items-center justify-between gap-4 pb-4 border-b border-[#E7E0D6]">
                    <span className="font-mono text-xs text-stone-500 tabular-figures">
                      {String(activePhotoIndex + 1).padStart(2, '0')} /{' '}
                      {String(GALLERY_ITEMS.length).padStart(2, '0')}
                    </span>
                    <button
                      type="button"
                      aria-label="Close gallery lightbox"
                      onClick={() => setActivePhotoIndex(null)}
                      className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-[#F4F1EC] rounded-md transition-colors cursor-pointer"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs font-medium text-[#5C341E] mt-5 mb-2">
                    {activePhoto.zone} · {activePhoto.lightingNote}
                  </p>
                  <h3 className="font-serif text-2xl text-stone-900 mb-3">
                    {activePhoto.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-stone-600">
                    {activePhoto.caption}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#E7E0D6] mt-6 space-y-2.5">
                  <button
                    type="button"
                    onClick={() => {
                      const zone = activePhoto.targetZoneId;
                      setActivePhotoIndex(null);
                      onReserveZone(zone);
                    }}
                    className="w-full py-3 px-4 text-sm font-medium text-white bg-[#5C341E] hover:bg-[#3D2314] rounded-md transition-colors cursor-pointer"
                  >
                    Reserve in {activePhoto.zone}
                  </button>
                  <p className="text-[11px] text-center text-stone-500">
                    Use arrow keys to navigate or Esc to close
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
