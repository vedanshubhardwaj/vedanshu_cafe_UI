interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-white border-t border-[#E7E0D6] py-14">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#E7E0D6]">
          <div className="md:col-span-5 space-y-3">
            <p className="font-serif text-2xl text-stone-900">Linden &amp; Hearth</p>
            <p className="text-sm leading-relaxed text-stone-600 max-w-sm">
              A botanical courtyard café and wood-fired sourdough bakery celebrating wild
              fermentation, seasonal orchard harvests, and light-roast specialty coffee.
            </p>
          </div>

          <div className="md:col-span-3 space-y-2 text-sm">
            <p className="text-xs font-medium text-stone-500 mb-3">Visit Us</p>
            <p className="text-stone-800">142 Linden Passage</p>
            <p className="text-stone-600">Botanical Quarter</p>
            <p className="font-mono text-xs text-stone-500 tabular-figures pt-1">
              Daily · 07:00 – 18:00
            </p>
          </div>

          <div className="md:col-span-4 space-y-2 text-sm">
            <p className="text-xs font-medium text-stone-500 mb-3">Explore</p>
            <div className="grid grid-cols-2 gap-2">
              {[
                { id: 'story', label: 'Our Story' },
                { id: 'menu', label: 'Signature Menu' },
                { id: 'flight', label: 'Tasting Flight' },
                { id: 'gallery', label: 'Ambiance Gallery' },
                { id: 'reserve', label: 'Reserve Table' },
              ].map((link) => (
                <button
                  key={link.id}
                  type="button"
                  onClick={() => onNavigate(link.id)}
                  className="text-left text-stone-600 hover:text-[#5C341E] transition-colors cursor-pointer"
                >
                  {link.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="pt-6 flex flex-wrap items-center justify-between gap-4 text-xs text-stone-500">
          <p>© 2026 Linden &amp; Hearth Bakery &amp; Roastery. All rights reserved.</p>
          <p>White Oak Hearth · Stone-Milled Grains · Single-Origin Micro-Lots</p>
        </div>
      </div>
    </footer>
  );
}
