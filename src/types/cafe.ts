export type MenuCategory = 'all' | 'bakery' | 'pastry' | 'coffee' | 'botanical';

export interface FlavorProfile {
  roast: number;
  floral: number;
  caramel: number;
  acidity: number;
}

export interface MenuItem {
  id: string;
  name: string;
  category: Exclude<MenuCategory, 'all'>;
  categoryLabel: string;
  price: number;
  originOrFlour: string;
  scheduleNote: string;
  description: string;
  tastingNotes: [string, string, string];
  allergens: string[];
  flavorProfile: FlavorProfile;
  image: string;
  flightSlot?: 'beverage' | 'bake' | 'accompaniment';
}

export interface AccompanimentOption {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  notes: string;
  flavorProfile: FlavorProfile;
}

export interface TastingFlightSelection {
  beverageId: string;
  bakeId: string;
  accompanimentId: string;
}

export interface AttachedFlightSummary {
  beverageName: string;
  bakeName: string;
  accompanimentName: string;
  totalPrice: number;
  aLaCartePrice: number;
  flavorProfile: FlavorProfile;
}

export interface GalleryItem {
  id: string;
  title: string;
  zone: string;
  lightingNote: string;
  caption: string;
  aspectClass: string;
  parallaxOffset: [number, number];
  image: string;
  targetZoneId: SeatingZoneId;
}

export type SeatingZoneId = 'courtyard' | 'hearth' | 'conservatory' | 'espresso-bar';

export interface SeatingZone {
  id: SeatingZoneId;
  name: string;
  capacityLabel: string;
  atmosphere: string;
  availabilityText: string;
  slotsRemaining: number;
}

export interface TimeSlot {
  time: string;
  period: 'Morning' | 'Midday' | 'Afternoon';
  tablesLeft: number;
}

export interface ReservationRecord {
  confirmationCode: string;
  zoneId: SeatingZoneId;
  zoneName: string;
  date: string;
  timeSlot: string;
  partySize: number;
  attachedFlight: AttachedFlightSummary | null;
  dietaryPreferences: string[];
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  specialRequest: string;
  createdAt: string;
  status: 'confirmed' | 'cancelled';
}
