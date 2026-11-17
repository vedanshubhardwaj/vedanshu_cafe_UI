import { useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  hasConfirmedReservation: boolean;
  onNavigate: (sectionId: string) => void;
}

const NAV_LINKS = [
  { id: 'story', label: 'Story' },
  { id: 'menu', label: 'Signature Menu' },
  { id: 'flight', label: 'Tasting Flight' },
  { id: 'gallery', label: 'Ambiance' },
] as const;

export function Header({ hasConfirmedReservation, onNavigate }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 28,
    restDelta: 0.001,
  });

  const handleNavClick = (id: string) => {
    setMobileOpen(false);
    onNavigate(id);
  };

  return (
    <header className="sticky top-0 z-40 bg-white/92 backdrop-blur-md border-b border-[#E7E0D6]">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="font-serif text-xl lg:text-[22px] font-semibold tracking-tight text-stone-900 whitespace-nowrap shrink-0"
        >
          Linden &amp; Hearth
        </a>

        {/* Zone 2: 4 concise single-line text nav links */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-stone-600"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.id);
              }}
              className="relative py-1 hover:text-[#5C341E] transition-colors duration-200 whitespace-nowrap shrink-0 after:content-[''] after:absolute after:left-0 after:bottom-0 after:w-full after:h-[1px] after:bg-[#5C341E] after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform after:duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: 1 primary CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={() => handleNavClick('reserve')}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-[#5C341E] hover:bg-[#3D2314] rounded-md transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer"
          >
            {hasConfirmedReservation ? 'View Booking' : 'Reserve Table'}
          </button>

          <button
            type="button"
            aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen((prev) => !prev)}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 text-stone-800 hover:bg-[#F4F1EC] rounded-md transition-colors cursor-pointer"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Scroll-linked reading hairline */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX }}
        className="h-[2px] bg-[#5C341E] origin-left"
      />

      {/* Mobile Navigation Drawer */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-b border-[#E7E0D6] px-6 py-4 space-y-2">
          {NAV_LINKS.map((link) => (
            <button
              key={link.id}
              type="button"
              onClick={() => handleNavClick(link.id)}
              className="block w-full text-left py-2.5 text-base font-medium text-stone-800 hover:text-[#5C341E] border-b border-[#F4F1EC] last:border-b-0 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => handleNavClick('reserve')}
            className="w-full mt-3 py-3 text-sm font-medium text-white bg-[#5C341E] hover:bg-[#3D2314] rounded-md transition-colors cursor-pointer"
          >
            {hasConfirmedReservation ? 'View Booking' : 'Reserve Table'}
          </button>
        </div>
      )}
    </header>
  );
}
