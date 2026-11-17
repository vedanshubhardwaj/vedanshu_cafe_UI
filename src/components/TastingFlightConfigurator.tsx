import { motion, useReducedMotion } from 'motion/react';
import { ArrowRight, Check, RotateCcw, Sparkles } from 'lucide-react';
import { ACCOMPANIMENT_OPTIONS, MENU_ITEMS } from '../data/cafeData';
import {
  AttachedFlightSummary,
  FlavorProfile,
  TastingFlightSelection,
} from '../types/cafe';

interface TastingFlightConfiguratorProps {
  selection: TastingFlightSelection;
  onChangeSelection: (next: TastingFlightSelection) => void;
  attachedFlight: AttachedFlightSummary | null;
  onAttachFlight: (flight: AttachedFlightSummary) => void;
}

const BEVERAGES = MENU_ITEMS.filter((item) => item.flightSlot === 'beverage');
const BAKES = MENU_ITEMS.filter((item) => item.flightSlot === 'bake');

const PRESETS: { label: string; selection: TastingFlightSelection }[] = [
  {
    label: 'Floral Pour & Fig Tart',
    selection: {
      beverageId: 'geisha-ceramic-pourover',
      bakeId: 'fig-chamomile-galette',
      accompanimentId: 'verbena-citrus-curd',
    },
  },
  {
    label: 'Chestnut Hearth & Cortado',
    selection: {
      beverageId: 'chestnut-cortado',
      bakeId: 'hearth-country-miche',
      accompanimentId: 'chestnut-praline-creme',
    },
  },
];

export function TastingFlightConfigurator({
  selection,
  onChangeSelection,
  attachedFlight,
  onAttachFlight,
}: TastingFlightConfiguratorProps) {
  const prefersReducedMotion = useReducedMotion();

  const selectedBeverage =
    BEVERAGES.find((b) => b.id === selection.beverageId) ?? BEVERAGES[0];
  const selectedBake = BAKES.find((b) => b.id === selection.bakeId) ?? BAKES[0];
  const selectedAccompaniment =
    ACCOMPANIMENT_OPTIONS.find((a) => a.id === selection.accompanimentId) ??
    ACCOMPANIMENT_OPTIONS[0];

  const aLaCartePrice =
    selectedBeverage.price + selectedBake.price + selectedAccompaniment.price;
  const bundlePrice = Math.round(aLaCartePrice * 0.85 * 100) / 100;

  const combinedProfile: FlavorProfile = {
    roast:
      Math.round(
        ((selectedBeverage.flavorProfile.roast +
          selectedBake.flavorProfile.roast +
          selectedAccompaniment.flavorProfile.roast) /
          3) *
          10
      ) / 10,
    floral:
      Math.round(
        ((selectedBeverage.flavorProfile.floral +
          selectedBake.flavorProfile.floral +
          selectedAccompaniment.flavorProfile.floral) /
          3) *
          10
      ) / 10,
    caramel:
      Math.round(
        ((selectedBeverage.flavorProfile.caramel +
          selectedBake.flavorProfile.caramel +
          selectedAccompaniment.flavorProfile.caramel) /
          3) *
          10
      ) / 10,
    acidity:
      Math.round(
        ((selectedBeverage.flavorProfile.acidity +
          selectedBake.flavorProfile.acidity +
          selectedAccompaniment.flavorProfile.acidity) /
          3) *
          10
      ) / 10,
  };

  const isCurrentlyAttached =
    attachedFlight !== null &&
    attachedFlight.beverageName === selectedBeverage.name &&
    attachedFlight.bakeName === selectedBake.name &&
    attachedFlight.accompanimentName === selectedAccompaniment.name;

  const handleAttach = () => {
    onAttachFlight({
      beverageName: selectedBeverage.name,
      bakeName: selectedBake.name,
      accompanimentName: selectedAccompaniment.name,
      totalPrice: bundlePrice,
      aLaCartePrice,
      flavorProfile: combinedProfile,
    });
  };

  const sensoryMetrics = [
    { label: 'Roast Depth', value: combinedProfile.roast },
    { label: 'Floral Lift', value: combinedProfile.floral },
    { label: 'Caramelized Crust', value: combinedProfile.caramel },
    { label: 'Bright Acidity', value: combinedProfile.acidity },
  ];

  return (
    <section
      id="flight"
      className="bg-[#FAF9F7] border-b border-[#E7E0D6] py-20 lg:py-28"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div className="max-w-2xl">
            <p className="text-xs font-medium text-[#5C341E] mb-3">
              Tasting Flight Configurator
            </p>
            <h2 className="font-serif text-[clamp(1.85rem,3.2vw,2.85rem)] leading-[1.12] tracking-[-0.02em] text-stone-900">
              Compose a three-part courtyard tasting flight.
            </h2>
            <p className="text-base text-stone-600 mt-3 max-w-xl">
              Pair one single-origin pour or botanical tonic, one wood-fired bake, and one
              house-churned preserve at 15% flight savings, ready to attach to your table.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {PRESETS.map((preset) => (
              <button
                key={preset.label}
                type="button"
                onClick={() => onChangeSelection(preset.selection)}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-stone-700 bg-white hover:bg-[#F4F1EC] border border-[#E7E0D6] rounded-md transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <Sparkles className="w-3.5 h-3.5 text-[#5C341E]" />
                <span>{preset.label}</span>
              </button>
            ))}
            <button
              type="button"
              onClick={() => onChangeSelection(PRESETS[0].selection)}
              className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-stone-500 hover:text-stone-900 transition-colors cursor-pointer"
              aria-label="Reset flight to default"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left 8 Columns: 3 Interactive Course Selectors */}
          <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Slot 01: Beverage */}
            <div className="bg-white rounded-lg border border-[#E7E0D6] p-5 space-y-3">
              <div className="pb-3 border-b border-[#F4F1EC]">
                <p className="font-mono text-xs text-[#5C341E] tabular-figures">01.</p>
                <h3 className="font-serif text-lg text-stone-900 mt-0.5">
                  Coffee or Botanical
                </h3>
              </div>

              <div className="space-y-2.5">
                {BEVERAGES.map((bev) => {
                  const active = bev.id === selectedBeverage.id;
                  return (
                    <button
                      key={bev.id}
                      type="button"
                      onClick={() =>
                        onChangeSelection({ ...selection, beverageId: bev.id })
                      }
                      className={`w-full text-left p-3.5 rounded-md border transition-all duration-150 cursor-pointer ${
                        active
                          ? 'bg-[#FAF9F7] border-[#5C341E] shadow-xs'
                          : 'bg-white border-[#E7E0D6] hover:border-stone-400'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-medium text-stone-900 leading-snug">
                          {bev.name}
                        </span>
                        <span className="font-mono text-xs text-stone-600 tabular-figures shrink-0">
                          ${bev.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1.5">
                        {bev.tastingNotes.slice(0, 2).join(' · ')}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Slot 02: Wood-Fired Bake */}
            <div className="bg-white rounded-lg border border-[#E7E0D6] p-5 space-y-3">
              <div className="pb-3 border-b border-[#F4F1EC]">
                <p className="font-mono text-xs text-[#5C341E] tabular-figures">02.</p>
                <h3 className="font-serif text-lg text-stone-900 mt-0.5">
                  Wood-Fired Bake
                </h3>
              </div>

              <div className="space-y-2.5">
                {BAKES.map((bake) => {
                  const active = bake.id === selectedBake.id;
                  return (
                    <button
                      key={bake.id}
                      type="button"
                      onClick={() =>
                        onChangeSelection({ ...selection, bakeId: bake.id })
                      }
                      className={`w-full text-left p-3.5 rounded-md border transition-all duration-150 cursor-pointer ${
                        active
                          ? 'bg-[#FAF9F7] border-[#5C341E] shadow-xs'
                          : 'bg-white border-[#E7E0D6] hover:border-stone-400'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-medium text-stone-900 leading-snug">
                          {bake.name}
                        </span>
                        <span className="font-mono text-xs text-stone-600 tabular-figures shrink-0">
                          ${bake.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1.5">
                        {bake.tastingNotes.slice(0, 2).join(' · ')}
                      </p>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Slot 03: Accompaniment */}
            <div className="bg-white rounded-lg border border-[#E7E0D6] p-5 space-y-3">
              <div className="pb-3 border-b border-[#F4F1EC]">
                <p className="font-mono text-xs text-[#5C341E] tabular-figures">03.</p>
                <h3 className="font-serif text-lg text-stone-900 mt-0.5">
                  Botanical Preserve
                </h3>
              </div>

              <div className="space-y-2.5">
                {ACCOMPANIMENT_OPTIONS.map((acc) => {
                  const active = acc.id === selectedAccompaniment.id;
                  return (
                    <button
                      key={acc.id}
                      type="button"
                      onClick={() =>
                        onChangeSelection({ ...selection, accompanimentId: acc.id })
                      }
                      className={`w-full text-left p-3.5 rounded-md border transition-all duration-150 cursor-pointer ${
                        active
                          ? 'bg-[#FAF9F7] border-[#5C341E] shadow-xs'
                          : 'bg-white border-[#E7E0D6] hover:border-stone-400'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <span className="text-sm font-medium text-stone-900 leading-snug">
                          {acc.name}
                        </span>
                        <span className="font-mono text-xs text-stone-600 tabular-figures shrink-0">
                          ${acc.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-1.5">{acc.subtitle}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right 4 Columns: Live Sensory Balance & Flight Summary */}
          <div className="lg:col-span-4 bg-white rounded-lg border border-[#E7E0D6] p-6 lg:p-7 space-y-6">
            <div>
              <p className="text-xs font-medium text-[#5C341E] mb-1">
                Composed Flight Summary
              </p>
              <h3 className="font-serif text-2xl text-stone-900">
                Your Sensory Balance
              </h3>
            </div>

            {/* Live Animated Sensory Bars (transform-only) */}
            <div className="space-y-3.5 py-4 border-y border-[#E7E0D6]">
              {sensoryMetrics.map((metric) => (
                <div key={metric.label} className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-stone-700">{metric.label}</span>
                    <span className="font-mono text-stone-600 tabular-figures">
                      {metric.value.toFixed(1)} / 10
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-[#F4F1EC] rounded-full overflow-hidden">
                    <motion.div
                      initial={false}
                      animate={{ scaleX: metric.value / 10 }}
                      transition={
                        prefersReducedMotion
                          ? { duration: 0 }
                          : { type: 'spring', stiffness: 260, damping: 28 }
                      }
                      className="h-full w-full origin-left bg-[#5C341E] rounded-full"
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Pairings List */}
            <div className="space-y-2.5 text-sm">
              <div className="flex items-start justify-between gap-3">
                <span className="text-stone-500 text-xs">01. Pour</span>
                <span className="text-stone-900 font-medium text-right text-xs">
                  {selectedBeverage.name}
                </span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <span className="text-stone-500 text-xs">02. Hearth</span>
                <span className="text-stone-900 font-medium text-right text-xs">
                  {selectedBake.name}
                </span>
              </div>
              <div className="flex items-start justify-between gap-3">
                <span className="text-stone-500 text-xs">03. Preserve</span>
                <span className="text-stone-900 font-medium text-right text-xs">
                  {selectedAccompaniment.name}
                </span>
              </div>
            </div>

            <div className="pt-4 border-t border-[#E7E0D6] flex items-baseline justify-between">
              <div>
                <p className="text-xs text-stone-500">Curated Flight Total</p>
                <p className="text-xs text-[#3F5243] font-medium mt-0.5">
                  Includes 15% pairing savings
                </p>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs text-stone-400 line-through mr-2 tabular-figures">
                  ${aLaCartePrice.toFixed(2)}
                </span>
                <span className="font-mono text-xl font-medium text-stone-900 tabular-figures">
                  ${bundlePrice.toFixed(2)}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAttach}
              className={`w-full inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-medium rounded-md transition-colors duration-200 cursor-pointer ${
                isCurrentlyAttached
                  ? 'bg-[#3F5243] text-white hover:bg-[#324236]'
                  : 'bg-[#5C341E] text-white hover:bg-[#3D2314]'
              }`}
            >
              {isCurrentlyAttached ? (
                <>
                  <Check className="w-4 h-4" />
                  <span>Flight Attached — Continue to Booking</span>
                </>
              ) : (
                <>
                  <span>Attach Flight to Table Reservation</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
