import {
  AccompanimentOption,
  GalleryItem,
  MenuItem,
  SeatingZone,
  TimeSlot,
} from '../types/cafe';

export const IMAGES = {
  heroCourtyard: '/src/assets/images/hero_botanical_courtyard_1794907490016.jpg',
  woodFiredHearth: '/src/assets/images/bakery_wood_fired_hearth_1794907490081.jpg',
  pouroverRitual: '/src/assets/images/coffee_pourover_ritual_1794907491252.jpg',
  botanicalTart: '/src/assets/images/pastry_botanical_tart_1794907490960.jpg',
  glassConservatory: '/src/assets/images/ambiance_glass_conservatory_1794907492036.jpg',
  espressoBar: '/src/assets/images/espresso_chestnut_bar_1794907492957.jpg',
} as const;

export const CRAFT_PILLARS = [
  {
    index: '01',
    title: 'White Oak Wood-Fired Hearth',
    summary:
      'Every morning at 04:30, our brick masonry oven is swept clean of white oak embers to bake naturally leavened loaves with a blistered, deeply caramelized crust.',
    metric: '72-hour cold levain fermentation · 100% stone-milled heirloom Red Fife and Sonora wheat.',
    image: IMAGES.woodFiredHearth,
    imageAlt: 'Blistered country sourdough loaves and golden croissants beside the brick wood-fired oven',
  },
  {
    index: '02',
    title: 'Botanical Courtyard Harvest',
    summary:
      'Steps from our pastry bench, terraced limestone planters yield lemon verbena, black mission figs, chamomile blossoms, and rosemary folded daily into glazes and infusions.',
    metric: 'Zero synthetic essences · Harvested before 07:00 for pastry infusions and syrups.',
    image: IMAGES.botanicalTart,
    imageAlt: 'Roasted hazelnut and black fig tartlet garnished with dried chamomile blossoms',
  },
  {
    index: '03',
    title: 'Light-Roast Single-Origin Bar',
    summary:
      'Our roastery focuses on washed Ethiopian, Kenyan, and Colombian high-altitude micro-lots roasted gently to preserve florals alongside velvety roasted chestnut sweetness.',
    metric: '93°C precision water mineralization · Small-batch 12kg drum roasts every Tuesday.',
    image: IMAGES.espressoBar,
    imageAlt: 'Barista pulling espresso on a roasted chestnut timber espresso bar in morning sunlight',
  },
] as const;

export const MENU_ITEMS: MenuItem[] = [
  {
    id: 'hearth-country-miche',
    name: 'Roasted Chestnut & Country Miche',
    category: 'bakery',
    categoryLabel: 'Wood-Fired Bakery',
    price: 11.5,
    originOrFlour: 'Stone-Milled Red Fife · Chestnut Flour',
    scheduleNote: 'Out of Hearth 07:30',
    description:
      'Naturally leavened 72-hour sourdough loaf folded with roasted Piedmont chestnut flour for a tender, honeycombed crumb and smoky oak crust.',
    tastingNotes: ['Toasted Chestnut', 'Malt Caramel', 'Crisp Oak Crust'],
    allergens: ['Wheat', 'Tree Nuts'],
    flavorProfile: { roast: 7, floral: 2, caramel: 8, acidity: 4 },
    image: IMAGES.woodFiredHearth,
    flightSlot: 'bake',
  },
  {
    id: 'cultured-butter-croissant',
    name: 'Hearth-Laminated Buckwheat Croissant',
    category: 'pastry',
    categoryLabel: 'Botanical Pastries',
    price: 6.75,
    originOrFlour: 'Normandy Cultured Butter · Toasted Buckwheat',
    scheduleNote: 'First Tray 07:00',
    description:
      'Twenty-seven honeycomb layers laminated over three days with cultured grass-fed butter and a whisper of toasted buckwheat.',
    tastingNotes: ['Browned Butter', 'Toasted Buckwheat', 'Shattering Flake'],
    allergens: ['Wheat', 'Dairy'],
    flavorProfile: { roast: 5, floral: 2, caramel: 9, acidity: 2 },
    image: IMAGES.woodFiredHearth,
    flightSlot: 'bake',
  },
  {
    id: 'fig-chamomile-galette',
    name: 'Black Fig & Chamomile Hazelnut Tartlet',
    category: 'pastry',
    categoryLabel: 'Botanical Pastries',
    price: 8.5,
    originOrFlour: 'Courtyard Fig · Roasted Oregon Hazelnut',
    scheduleNote: 'Limited Morning Batch',
    description:
      'Crisp spelt sablé filled with roasted chestnut-hazelnut frangipane, blistered black figs, and courtyard chamomile blossom honey.',
    tastingNotes: ['Jammy Fig', 'Wild Chamomile', 'Roasted Hazelnut'],
    allergens: ['Wheat', 'Dairy', 'Eggs', 'Tree Nuts'],
    flavorProfile: { roast: 6, floral: 8, caramel: 8, acidity: 5 },
    image: IMAGES.botanicalTart,
    flightSlot: 'bake',
  },
  {
    id: 'geisha-ceramic-pourover',
    name: 'Finca La Pradera Washed Pour-Over',
    category: 'coffee',
    categoryLabel: 'Espresso & Pour-Over',
    price: 9.0,
    originOrFlour: 'Huila, Colombia · 1,950m Elevation',
    scheduleNote: 'Brewed to Order (4 min)',
    description:
      'Hand-poured through matte porcelain into fluted glass, unveiling lifted bergamot blossom, white peach, and a clean cacao finish.',
    tastingNotes: ['Bergamot Blossom', 'White Peach', 'Raw Cane Sugar'],
    allergens: [],
    flavorProfile: { roast: 4, floral: 9, caramel: 6, acidity: 8 },
    image: IMAGES.pouroverRitual,
    flightSlot: 'beverage',
  },
  {
    id: 'chestnut-cortado',
    name: 'Single-Origin Cortado with Oat Crema',
    category: 'coffee',
    categoryLabel: 'Espresso & Pour-Over',
    price: 6.25,
    originOrFlour: 'Sidama, Ethiopia · Natural Process',
    scheduleNote: 'Pulled All Day',
    description:
      'Double ristretto of sun-dried Ethiopian beans balanced with equal parts textured house-steamed oat or jersey milk.',
    tastingNotes: ['Dark Chestnut', 'Stewed Plum', 'Velvet Cocoa'],
    allergens: ['Dairy (Optional Oat)'],
    flavorProfile: { roast: 8, floral: 4, caramel: 9, acidity: 5 },
    image: IMAGES.espressoBar,
    flightSlot: 'beverage',
  },
  {
    id: 'verbena-citrus-tonic',
    name: 'Courtyard Lemon Verbena & Yuzu Tonic',
    category: 'botanical',
    categoryLabel: 'Botanical Infusions',
    price: 7.25,
    originOrFlour: 'Garden Verbena · Cold-Pressed Yuzu',
    scheduleNote: 'Chilled Glassware',
    description:
      'Freshly muddled courtyard lemon verbena steeped with sparkling mineral water, Japanese yuzu zest, and a subtle rosemary-blossom tincture.',
    tastingNotes: ['Lemon Verbena', 'Crisp Yuzu', 'Garden Rosemary'],
    allergens: [],
    flavorProfile: { roast: 1, floral: 10, caramel: 3, acidity: 9 },
    image: IMAGES.glassConservatory,
    flightSlot: 'beverage',
  },
];

export const ACCOMPANIMENT_OPTIONS: AccompanimentOption[] = [
  {
    id: 'cultured-fig-butter',
    name: 'Whipped Cultured Butter & Fig Leaf Jam',
    subtitle: 'Sea Salt Flakes · Warm Hearth Serve',
    price: 4.5,
    notes: 'Balances bright washed pour-overs and crisp sourdough crust.',
    flavorProfile: { roast: 3, floral: 6, caramel: 8, acidity: 4 },
  },
  {
    id: 'chestnut-praline-creme',
    name: 'Roasted Chestnut & Espresso Mascarpone',
    subtitle: 'Raw Wildflower Honey · Cacao Nib',
    price: 5.25,
    notes: 'Deepens nutty sweetness alongside laminated pastries and cortados.',
    flavorProfile: { roast: 8, floral: 3, caramel: 9, acidity: 2 },
  },
  {
    id: 'verbena-citrus-curd',
    name: 'Courtyard Verbena & Meyer Lemon Curd',
    subtitle: 'Crushed Pistachio · Botanical Sugar',
    price: 4.75,
    notes: 'Lifts aromatic florals and cuts through rich butter layers.',
    flavorProfile: { roast: 1, floral: 9, caramel: 5, acidity: 9 },
  },
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-courtyard',
    title: 'The Olive Tree Courtyard',
    zone: 'Sunlit Courtyard',
    lightingNote: 'Dappled Morning Sun · 08:00–11:30',
    caption:
      'Aged white oak tables nestled beneath potted Mediterranean olive trees and limewash stone arches.',
    aspectClass: 'aspect-[16/10]',
    parallaxOffset: [0, -28],
    image: IMAGES.heroCourtyard,
    targetZoneId: 'courtyard',
  },
  {
    id: 'gal-conservatory',
    title: 'Glasshouse Conservatory',
    zone: 'Glass Conservatory',
    lightingNote: 'Filtered Zenith Daylight · Quiet Acoustics',
    caption:
      'Steel-framed botanical atrium with trailing ferns, Meyer lemon trees, and linen-draped walnut tables.',
    aspectClass: 'aspect-[3/4]',
    parallaxOffset: [18, -36],
    image: IMAGES.glassConservatory,
    targetZoneId: 'conservatory',
  },
  {
    id: 'gal-hearth',
    title: 'Brick Masonry Hearth',
    zone: 'Hearth Counter',
    lightingNote: 'Radiant Ember Glow · Front-Row Bake View',
    caption:
      'Travertine marble bench facing the wood-fired oven where loaves and laminated pastries emerge every hour.',
    aspectClass: 'aspect-[4/3]',
    parallaxOffset: [-10, -22],
    image: IMAGES.woodFiredHearth,
    targetZoneId: 'hearth',
  },
  {
    id: 'gal-espresso',
    title: 'Roasted Chestnut Espresso Bar',
    zone: 'Espresso Bar',
    lightingNote: 'East Window Beams · Barista Tasting Counter',
    caption:
      'Hand-rubbed chestnut timber counter where single-origin espresso flights are dialed in beside ceramic vessels.',
    aspectClass: 'aspect-[3/4]',
    parallaxOffset: [22, -44],
    image: IMAGES.espressoBar,
    targetZoneId: 'espresso-bar',
  },
  {
    id: 'gal-pourover',
    title: 'Pour-Over Study Station',
    zone: 'Espresso Bar',
    lightingNote: 'Gallery Minimalist Alcove · 93°C Brew',
    caption:
      'Unbleached paper filters, porcelain drippers, and fluted glassware reserved for slow single-origin tastings.',
    aspectClass: 'aspect-[4/3]',
    parallaxOffset: [-12, -26],
    image: IMAGES.pouroverRitual,
    targetZoneId: 'espresso-bar',
  },
  {
    id: 'gal-patisserie',
    title: 'Seasonal Patisserie Bench',
    zone: 'Glass Conservatory',
    lightingNote: 'Soft Linen Diffused Light · Morning Service',
    caption:
      'Matte stoneware plates dressed with roasted orchard fruit, wild hazelnuts, and dried courtyard blossoms.',
    aspectClass: 'aspect-[4/3]',
    parallaxOffset: [10, -24],
    image: IMAGES.botanicalTart,
    targetZoneId: 'conservatory',
  },
];

export const SEATING_ZONES: SeatingZone[] = [
  {
    id: 'courtyard',
    name: 'Sunlit Courtyard',
    capacityLabel: '2–6 Guests · Open Air',
    atmosphere: 'Limestone flagstones beneath olive trees and warm afternoon shade.',
    availabilityText: 'Available Today · 4 tables open',
    slotsRemaining: 4,
  },
  {
    id: 'conservatory',
    name: 'Glass Conservatory',
    capacityLabel: '2–4 Guests · Sheltered Atrium',
    atmosphere: 'Bright steel-framed glasshouse surrounded by citrus and trailing ferns.',
    availabilityText: 'Limited · 2 tables open',
    slotsRemaining: 2,
  },
  {
    id: 'hearth',
    name: 'Hearth Counter',
    capacityLabel: '1–3 Guests · Bakery View',
    atmosphere: 'Travertine marble counter facing the wood-fired oven and pastry bench.',
    availabilityText: 'Available Today · 3 seats open',
    slotsRemaining: 3,
  },
  {
    id: 'espresso-bar',
    name: 'Chestnut Espresso Bar',
    capacityLabel: '1–2 Guests · Tasting Bar',
    atmosphere: 'Intimate chestnut wood counter ideal for slow pour-over flights.',
    availabilityText: 'Available Today · 5 seats open',
    slotsRemaining: 5,
  },
];

export const TIME_SLOTS: TimeSlot[] = [
  { time: '08:00', period: 'Morning', tablesLeft: 3 },
  { time: '09:00', period: 'Morning', tablesLeft: 2 },
  { time: '10:00', period: 'Morning', tablesLeft: 0 },
  { time: '11:15', period: 'Midday', tablesLeft: 4 },
  { time: '12:30', period: 'Midday', tablesLeft: 2 },
  { time: '14:00', period: 'Afternoon', tablesLeft: 5 },
  { time: '15:15', period: 'Afternoon', tablesLeft: 3 },
  { time: '16:30', period: 'Afternoon', tablesLeft: 4 },
];

export const DIETARY_OPTIONS = [
  'Oat or Botanical Milk',
  'Low-Gluten Selection',
  'Nut-Free Table Prep',
  'Shaded Courtyard Table',
  'Celebration Pastry Candle',
] as const;
