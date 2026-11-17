import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Check, Plus, X } from 'lucide-react';
import { MENU_ITEMS } from '../data/cafeData';
import { MenuCategory, MenuItem, TastingFlightSelection } from '../types/cafe';
import { SmartImage } from './SmartImage';

interface SignatureMenuProps {
  flightSelection: TastingFlightSelection;
  onSelectForFlight: (item: MenuItem) => void;
  onNavigateToFlight: () => void;
}

const CATEGORIES: { id: MenuCategory; label: string }[] = [
  { id: 'all', label: 'All Offerings' },
  { id: 'bakery', label: 'Wood-Fired Bakery' },
  { id: 'pastry', label: 'Botanical Pastries' },
  { id: 'coffee', label: 'Espresso & Pour-Over' },
  { id: 'botanical', label: 'Botanical Infusions' },
];

export function SignatureMenu({
  flightSelection,
  onSelectForFlight,
  onNavigateToFlight,
}: SignatureMenuProps) {
  const [activeCategory, setActiveCategory] = useState<MenuCategory>('all');
  const [inspectedItem, setInspectedItem] = useState<MenuItem | null>(null);
  const [recentlyAddedId, setRecentlyAddedId] = useState<string | null>(null);

  const filteredItems =
    activeCategory === 'all'
      ? MENU_ITEMS
      : MENU_ITEMS.filter((item) => item.category === activeCategory);

  const isSelectedInFlight = (item: MenuItem) =>
    flightSelection.beverageId === item.id || flightSelection.bakeId === item.id;

  const handleAddToFlight = (item: MenuItem) => {
    onSelectForFlight(item);
    setRecentlyAddedId(item.id);
    window.setTimeout(() => {
      setRecentlyAddedId((prev) => (prev === item.id ? null : prev));
    }, 1800);
  };

  return (
    <section id="menu" className="bg-white border-b border-[#E7E0D6] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* Header & Segmented Category Tabs */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-12">
          <div className="max-w-xl">
            <p className="text-xs font-medium text-[#5C341E] mb-3">Signature Menu</p>
            <h2 className="font-serif text-[clamp(1.85rem,3.2vw,2.85rem)] leading-[1.12] tracking-[-0.02em] text-stone-900">
              Baked over white oak and poured to highlight seasonal terroir.
            </h2>
          </div>

          <div
            role="tablist"
            aria-label="Filter menu offerings"
            className="flex flex-wrap items-center gap-1 p-1 bg-[#F4F1EC] rounded-lg border border-[#E7E0D6] self-start lg:self-auto"
          >
            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category.id;
              return (
                <button
                  key={category.id}
                  role="tab"
                  aria-selected={isActive}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={`relative px-3.5 py-2 text-xs font-medium rounded-md transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive ? 'text-stone-900' : 'text-stone-600 hover:text-stone-900'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeMenuTab"
                      transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                      className="absolute inset-0 bg-white rounded-md shadow-xs border border-[#E7E0D6]/80"
                    />
                  )}
                  <span className="relative z-10">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 3-Column Editorial Product Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => {
              const inFlight = isSelectedInFlight(item);
              const justAdded = recentlyAddedId === item.id;

              return (
                <motion.article
                  layout
                  key={item.id}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
                  className="group flex flex-col justify-between bg-[#FAF9F7] rounded-lg border border-[#E7E0D6] overflow-hidden hover:-translate-y-0.5 hover:border-[#5C341E]/40 transition-all duration-200"
                >
                  <div>
                    <button
                      type="button"
                      onClick={() => setInspectedItem(item)}
                      className="block w-full text-left overflow-hidden bg-[#F4F1EC] cursor-pointer"
                    >
                      <div className="aspect-[4/3] overflow-hidden">
                        <SmartImage
                          src={item.image}
                          alt={item.name}
                          fallbackTitle={item.name}
                          className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                        />
                      </div>
                    </button>

                    <div className="p-6">
                      {/* Zero-pill inline metadata */}
                      <p className="text-xs text-stone-500 mb-2">
                        <span>{item.categoryLabel}</span>
                        <span aria-hidden="true" className="mx-1.5">
                          ·
                        </span>
                        <span>{item.scheduleNote}</span>
                      </p>

                      <div className="flex items-baseline justify-between gap-4 mb-2.5">
                        <h3 className="font-serif text-xl font-medium text-stone-900">
                          <button
                            type="button"
                            onClick={() => setInspectedItem(item)}
                            className="text-left hover:text-[#5C341E] transition-colors cursor-pointer"
                          >
                            {item.name}
                          </button>
                        </h3>
                        <span className="font-mono text-[15px] font-medium text-stone-900 tabular-figures shrink-0">
                          ${item.price.toFixed(2)}
                        </span>
                      </div>

                      <p className="text-sm leading-relaxed text-stone-600 mb-4">
                        {item.description}
                      </p>

                      <p className="text-xs text-stone-500">
                        {item.tastingNotes.join(' · ')}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 py-4 border-t border-[#E7E0D6] bg-white flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => setInspectedItem(item)}
                      className="text-xs font-medium text-stone-700 hover:text-[#5C341E] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
                    >
                      View Notes &amp; Origin
                    </button>

                    <button
                      type="button"
                      onClick={() => handleAddToFlight(item)}
                      className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium rounded-md transition-colors duration-200 whitespace-nowrap shrink-0 cursor-pointer ${
                        inFlight || justAdded
                          ? 'bg-[#3F5243] text-white'
                          : 'bg-[#F4F1EC] text-stone-900 hover:bg-[#5C341E] hover:text-white'
                      }`}
                    >
                      {inFlight || justAdded ? (
                        <>
                          <Check className="w-3.5 h-3.5" />
                          <span>{justAdded ? 'Added to Flight' : 'In Your Flight'}</span>
                        </>
                      ) : (
                        <>
                          <Plus className="w-3.5 h-3.5" />
                          <span>Add to Flight</span>
                        </>
                      )}
                    </button>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Item Tasting Notes & Provenance Modal */}
      <AnimatePresence>
        {inspectedItem && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-950/55 backdrop-blur-xs"
            role="dialog"
            aria-modal="true"
            aria-labelledby="menu-item-modal-title"
            onClick={() => setInspectedItem(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 16, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12, scale: 0.98 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-2xl bg-white rounded-lg border border-[#E7E0D6] overflow-hidden shadow-2xl"
            >
              <div className="grid grid-cols-1 md:grid-cols-12">
                <div className="md:col-span-5 bg-[#F4F1EC]">
                  <SmartImage
                    src={inspectedItem.image}
                    alt={inspectedItem.name}
                    fallbackTitle={inspectedItem.name}
                    className="w-full h-full min-h-[220px] object-cover"
                  />
                </div>

                <div className="md:col-span-7 p-6 lg:p-8 flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-3">
                      <p className="text-xs text-stone-500">
                        {inspectedItem.categoryLabel} · {inspectedItem.scheduleNote}
                      </p>
                      <button
                        type="button"
                        aria-label="Close tasting notes"
                        onClick={() => setInspectedItem(null)}
                        className="p-1.5 text-stone-500 hover:text-stone-900 hover:bg-[#F4F1EC] rounded-md transition-colors cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="flex items-baseline justify-between gap-3 mb-3">
                      <h3
                        id="menu-item-modal-title"
                        className="font-serif text-2xl text-stone-900"
                      >
                        {inspectedItem.name}
                      </h3>
                      <span className="font-mono text-base font-medium text-[#5C341E] tabular-figures shrink-0">
                        ${inspectedItem.price.toFixed(2)}
                      </span>
                    </div>

                    <p className="text-sm leading-relaxed text-stone-600 mb-5">
                      {inspectedItem.description}
                    </p>

                    <div className="space-y-3 py-4 border-y border-[#E7E0D6] text-xs">
                      <div className="flex justify-between gap-4">
                        <span className="text-stone-500">Origin / Grain</span>
                        <span className="font-medium text-stone-800 text-right">
                          {inspectedItem.originOrFlour}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-stone-500">Sensory Notes</span>
                        <span className="font-medium text-stone-800 text-right">
                          {inspectedItem.tastingNotes.join(' · ')}
                        </span>
                      </div>
                      <div className="flex justify-between gap-4">
                        <span className="text-stone-500">Allergens</span>
                        <span className="font-medium text-stone-800 text-right">
                          {inspectedItem.allergens.length > 0
                            ? inspectedItem.allergens.join(', ')
                            : 'None'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex flex-wrap items-center justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        onSelectForFlight(inspectedItem);
                        setInspectedItem(null);
                        onNavigateToFlight();
                      }}
                      className="px-5 py-2.5 text-xs font-medium text-white bg-[#5C341E] hover:bg-[#3D2314] rounded-md transition-colors cursor-pointer"
                    >
                      Use in Tasting Flight
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
