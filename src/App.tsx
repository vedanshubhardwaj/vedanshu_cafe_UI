import { useEffect, useState } from 'react';
import { MotionConfig } from 'motion/react';
import { AmbianceGallery } from './components/AmbianceGallery';
import { BrandStory } from './components/BrandStory';
import { Footer } from './components/Footer';
import { Header } from './components/Header';
import { ParallaxHero } from './components/ParallaxHero';
import { ReservationWorkflow } from './components/ReservationWorkflow';
import { SignatureMenu } from './components/SignatureMenu';
import { TastingFlightConfigurator } from './components/TastingFlightConfigurator';
import {
  AttachedFlightSummary,
  MenuItem,
  ReservationRecord,
  SeatingZoneId,
  TastingFlightSelection,
} from './types/cafe';

const RESERVATION_STORAGE_KEY = 'linden_hearth_reservation_v1';
const FLIGHT_STORAGE_KEY = 'linden_hearth_attached_flight_v1';

export default function App() {
  const [flightSelection, setFlightSelection] = useState<TastingFlightSelection>({
    beverageId: 'geisha-ceramic-pourover',
    bakeId: 'fig-chamomile-galette',
    accompanimentId: 'verbena-citrus-curd',
  });

  const [attachedFlight, setAttachedFlight] = useState<AttachedFlightSummary | null>(
    () => {
      try {
        const saved = localStorage.getItem(FLIGHT_STORAGE_KEY);
        return saved ? (JSON.parse(saved) as AttachedFlightSummary) : null;
      } catch {
        return null;
      }
    }
  );

  const [selectedZoneId, setSelectedZoneId] = useState<SeatingZoneId>('courtyard');

  const [reservation, setReservation] = useState<ReservationRecord | null>(() => {
    try {
      const saved = localStorage.getItem(RESERVATION_STORAGE_KEY);
      return saved ? (JSON.parse(saved) as ReservationRecord) : null;
    } catch {
      return null;
    }
  });

  useEffect(() => {
    try {
      if (attachedFlight) {
        localStorage.setItem(FLIGHT_STORAGE_KEY, JSON.stringify(attachedFlight));
      } else {
        localStorage.removeItem(FLIGHT_STORAGE_KEY);
      }
    } catch {
      // Ignore storage quota errors cleanly
    }
  }, [attachedFlight]);

  useEffect(() => {
    try {
      if (reservation) {
        localStorage.setItem(RESERVATION_STORAGE_KEY, JSON.stringify(reservation));
      } else {
        localStorage.removeItem(RESERVATION_STORAGE_KEY);
      }
    } catch {
      // Ignore storage quota errors cleanly
    }
  }, [reservation]);

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSelectMenuItemForFlight = (item: MenuItem) => {
    if (item.flightSlot === 'beverage') {
      setFlightSelection((prev) => ({ ...prev, beverageId: item.id }));
    } else if (item.flightSlot === 'bake') {
      setFlightSelection((prev) => ({ ...prev, bakeId: item.id }));
    }
  };

  const handleAttachFlight = (flight: AttachedFlightSummary) => {
    setAttachedFlight(flight);
    scrollToSection('reserve');
  };

  const handleReserveFromGallery = (zoneId: SeatingZoneId) => {
    setSelectedZoneId(zoneId);
    scrollToSection('reserve');
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="min-h-screen bg-white text-stone-900 flex flex-col">
        <Header
          hasConfirmedReservation={Boolean(
            reservation && reservation.status === 'confirmed'
          )}
          onNavigate={scrollToSection}
        />

        <main className="flex-1">
          <ParallaxHero onNavigate={scrollToSection} />
          <BrandStory />
          <SignatureMenu
            flightSelection={flightSelection}
            onSelectForFlight={handleSelectMenuItemForFlight}
            onNavigateToFlight={() => scrollToSection('flight')}
          />
          <TastingFlightConfigurator
            selection={flightSelection}
            onChangeSelection={setFlightSelection}
            attachedFlight={attachedFlight}
            onAttachFlight={handleAttachFlight}
          />
          <AmbianceGallery onReserveZone={handleReserveFromGallery} />
          <ReservationWorkflow
            selectedZoneId={selectedZoneId}
            onSelectZoneId={setSelectedZoneId}
            attachedFlight={attachedFlight}
            onRemoveFlight={() => setAttachedFlight(null)}
            onBuildFlightClick={() => scrollToSection('flight')}
            reservation={reservation}
            onSaveReservation={(record) => setReservation(record)}
            onCancelReservation={() => setReservation(null)}
          />
        </main>

        <Footer onNavigate={scrollToSection} />
      </div>
    </MotionConfig>
  );
}
