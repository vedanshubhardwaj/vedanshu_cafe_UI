import { useEffect, useState } from 'react';
import { motion } from 'motion/react';
import {
  Calendar,
  CheckCircle2,
  Clock,
  Edit3,
  MapPin,
  Sparkles,
  Trash2,
  Users,
} from 'lucide-react';
import { DIETARY_OPTIONS, SEATING_ZONES, TIME_SLOTS } from '../data/cafeData';
import {
  AttachedFlightSummary,
  ReservationRecord,
  SeatingZoneId,
} from '../types/cafe';

interface ReservationWorkflowProps {
  selectedZoneId: SeatingZoneId;
  onSelectZoneId: (zoneId: SeatingZoneId) => void;
  attachedFlight: AttachedFlightSummary | null;
  onRemoveFlight: () => void;
  onBuildFlightClick: () => void;
  reservation: ReservationRecord | null;
  onSaveReservation: (record: ReservationRecord) => void;
  onCancelReservation: () => void;
}

const getTodayIso = () => {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

export function ReservationWorkflow({
  selectedZoneId,
  onSelectZoneId,
  attachedFlight,
  onRemoveFlight,
  onBuildFlightClick,
  reservation,
  onSaveReservation,
  onCancelReservation,
}: ReservationWorkflowProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [date, setDate] = useState<string>(getTodayIso);
  const [partySize, setPartySize] = useState<number>(2);
  const [timeSlot, setTimeSlot] = useState<string>('09:00');
  const [includeFlight, setIncludeFlight] = useState<boolean>(true);
  const [dietaryPreferences, setDietaryPreferences] = useState<string[]>([]);
  const [specialRequest, setSpecialRequest] = useState<string>('');
  const [guestName, setGuestName] = useState<string>('');
  const [guestEmail, setGuestEmail] = useState<string>('');
  const [guestPhone, setGuestPhone] = useState<string>('');
  const [errors, setErrors] = useState<{
    guestName?: string;
    guestEmail?: string;
    guestPhone?: string;
    date?: string;
  }>({});
  const [isEditingExisting, setIsEditingExisting] = useState<boolean>(false);
  const [confirmCancelPrompt, setConfirmCancelPrompt] = useState<boolean>(false);

  // Sync includeFlight whenever user attaches a new flight from the configurator
  useEffect(() => {
    if (attachedFlight) {
      setIncludeFlight(true);
    }
  }, [attachedFlight]);

  const activeZone =
    SEATING_ZONES.find((z) => z.id === selectedZoneId) ?? SEATING_ZONES[0];

  const toggleDietary = (option: string) => {
    setDietaryPreferences((prev) =>
      prev.includes(option) ? prev.filter((item) => item !== option) : [...prev, option]
    );
  };

  const validateGuestDetails = () => {
    const nextErrors: typeof errors = {};
    if (guestName.trim().length < 2) {
      nextErrors.guestName = 'Please enter the primary guest name (at least 2 characters).';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(guestEmail.trim())) {
      nextErrors.guestEmail = 'Please enter a valid email address for your table pass.';
    }
    const digitsOnly = guestPhone.replace(/\D/g, '');
    if (digitsOnly.length < 7) {
      nextErrors.guestPhone = 'Please enter a valid contact phone number (at least 7 digits).';
    }
    if (!date) {
      nextErrors.date = 'Please choose a reservation date.';
    }
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmitReservation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateGuestDetails()) return;

    const codeNumber = Math.floor(1000 + Math.random() * 9000);
    const confirmationCode = reservation?.confirmationCode || `LH-${codeNumber}`;

    onSaveReservation({
      confirmationCode,
      zoneId: activeZone.id,
      zoneName: activeZone.name,
      date,
      timeSlot,
      partySize,
      attachedFlight: includeFlight ? attachedFlight : null,
      dietaryPreferences,
      guestName: guestName.trim(),
      guestEmail: guestEmail.trim(),
      guestPhone: guestPhone.trim(),
      specialRequest: specialRequest.trim(),
      createdAt: new Date().toISOString(),
      status: 'confirmed',
    });
    setIsEditingExisting(false);
    setConfirmCancelPrompt(false);
  };

  const handleEditExisting = () => {
    if (!reservation) return;
    onSelectZoneId(reservation.zoneId);
    setDate(reservation.date);
    setTimeSlot(reservation.timeSlot);
    setPartySize(reservation.partySize);
    setDietaryPreferences(reservation.dietaryPreferences);
    setSpecialRequest(reservation.specialRequest);
    setGuestName(reservation.guestName);
    setGuestEmail(reservation.guestEmail);
    setGuestPhone(reservation.guestPhone);
    setIncludeFlight(Boolean(reservation.attachedFlight));
    setStep(1);
    setIsEditingExisting(true);
  };

  const showConfirmedPass = reservation && reservation.status === 'confirmed' && !isEditingExisting;

  return (
    <section id="reserve" className="bg-[#FAF9F7] py-20 lg:py-28">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-medium text-[#5C341E] mb-3">Table Reservations</p>
          <h2 className="font-serif text-[clamp(1.85rem,3.2vw,2.85rem)] leading-[1.12] tracking-[-0.02em] text-stone-900">
            Reserve your courtyard table or hearth-side counter.
          </h2>
          <p className="text-base text-stone-600 mt-3">
            Select your room, seating time, and optional pre-composed tasting flight for
            seamless table service.
          </p>
        </div>

        {showConfirmedPass ? (
          /* Confirmed Reservation Pass */
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="bg-white rounded-lg border border-[#E7E0D6] p-8 lg:p-10 max-w-4xl"
          >
            <div className="flex flex-wrap items-start justify-between gap-4 pb-6 border-b border-[#E7E0D6]">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-medium text-[#3F5243] mb-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Table Reservation Confirmed</span>
                </div>
                <h3 className="font-serif text-3xl text-stone-900">
                  We look forward to hosting you, {reservation.guestName}.
                </h3>
              </div>

              <div className="text-left sm:text-right">
                <p className="text-xs text-stone-500">Reservation Pass Code</p>
                <p className="font-mono text-2xl font-medium text-[#5C341E] tabular-figures mt-0.5">
                  {reservation.confirmationCode}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 py-6 border-b border-[#E7E0D6]">
              <div>
                <p className="text-xs text-stone-500 flex items-center gap-1.5 mb-1">
                  <MapPin className="w-3.5 h-3.5 text-[#5C341E]" />
                  <span>Seating Room</span>
                </p>
                <p className="text-sm font-medium text-stone-900">{reservation.zoneName}</p>
              </div>

              <div>
                <p className="text-xs text-stone-500 flex items-center gap-1.5 mb-1">
                  <Calendar className="w-3.5 h-3.5 text-[#5C341E]" />
                  <span>Date</span>
                </p>
                <p className="font-mono text-sm font-medium text-stone-900 tabular-figures">
                  {reservation.date}
                </p>
              </div>

              <div>
                <p className="text-xs text-stone-500 flex items-center gap-1.5 mb-1">
                  <Clock className="w-3.5 h-3.5 text-[#5C341E]" />
                  <span>Seating Time</span>
                </p>
                <p className="font-mono text-sm font-medium text-stone-900 tabular-figures">
                  {reservation.timeSlot}
                </p>
              </div>

              <div>
                <p className="text-xs text-stone-500 flex items-center gap-1.5 mb-1">
                  <Users className="w-3.5 h-3.5 text-[#5C341E]" />
                  <span>Party Size</span>
                </p>
                <p className="text-sm font-medium text-stone-900">
                  {reservation.partySize}{' '}
                  {reservation.partySize === 1 ? 'Guest' : 'Guests'}
                </p>
              </div>
            </div>

            {reservation.attachedFlight && (
              <div className="py-6 border-b border-[#E7E0D6]">
                <div className="flex items-baseline justify-between gap-4 mb-3">
                  <p className="text-xs font-medium text-[#5C341E]">
                    Pre-Assigned Tasting Flight
                  </p>
                  <span className="font-mono text-sm font-medium text-stone-900 tabular-figures">
                    ${reservation.attachedFlight.totalPrice.toFixed(2)}
                  </span>
                </div>
                <p className="text-sm text-stone-700">
                  {reservation.attachedFlight.beverageName} ·{' '}
                  {reservation.attachedFlight.bakeName} ·{' '}
                  {reservation.attachedFlight.accompanimentName}
                </p>
              </div>
            )}

            {(reservation.dietaryPreferences.length > 0 || reservation.specialRequest) && (
              <div className="py-5 border-b border-[#E7E0D6] text-xs text-stone-600 space-y-1.5">
                {reservation.dietaryPreferences.length > 0 && (
                  <p>
                    <span className="font-medium text-stone-800">Table Preferences:</span>{' '}
                    {reservation.dietaryPreferences.join(' · ')}
                  </p>
                )}
                {reservation.specialRequest && (
                  <p>
                    <span className="font-medium text-stone-800">Guest Note:</span>{' '}
                    {reservation.specialRequest}
                  </p>
                )}
              </div>
            )}

            <div className="pt-6 flex flex-wrap items-center justify-between gap-4">
              <p className="text-xs text-stone-500">
                Pass confirmation dispatched to {reservation.guestEmail}
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={handleEditExisting}
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-stone-800 bg-[#FAF9F7] hover:bg-[#F4F1EC] border border-[#E7E0D6] rounded-md transition-colors cursor-pointer"
                >
                  <Edit3 className="w-3.5 h-3.5" />
                  <span>Modify Booking</span>
                </button>

                {!confirmCancelPrompt ? (
                  <button
                    type="button"
                    onClick={() => setConfirmCancelPrompt(true)}
                    className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-medium text-stone-600 hover:text-red-700 hover:bg-red-50 border border-transparent hover:border-red-200 rounded-md transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Cancel Reservation</span>
                  </button>
                ) : (
                  <div className="inline-flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setConfirmCancelPrompt(false);
                        onCancelReservation();
                      }}
                      className="px-3.5 py-2 text-xs font-medium text-white bg-red-700 hover:bg-red-800 rounded-md transition-colors cursor-pointer"
                    >
                      Confirm Cancellation
                    </button>
                    <button
                      type="button"
                      onClick={() => setConfirmCancelPrompt(false)}
                      className="px-3 py-2 text-xs font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
                    >
                      Keep Table
                    </button>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        ) : (
          /* Interactive 3-Step Reservation Form */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left 8 Columns: Multi-Step Controls */}
            <form
              onSubmit={handleSubmitReservation}
              noValidate
              className="lg:col-span-8 bg-white rounded-lg border border-[#E7E0D6] p-6 lg:p-8 space-y-8"
            >
              {/* Stepper Header */}
              <div className="flex flex-wrap items-center gap-3 pb-6 border-b border-[#E7E0D6]">
                {[
                  { num: 1 as const, label: '01. Room & Time' },
                  { num: 2 as const, label: '02. Flight & Notes' },
                  { num: 3 as const, label: '03. Guest Details' },
                ].map((item) => {
                  const active = step === item.num;
                  const completed = step > item.num;
                  return (
                    <button
                      key={item.num}
                      type="button"
                      onClick={() => setStep(item.num)}
                      className={`px-4 py-2 text-xs font-medium rounded-md border transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        active
                          ? 'bg-[#5C341E] text-white border-[#5C341E]'
                          : completed
                            ? 'bg-[#F4F1EC] text-stone-900 border-[#E7E0D6]'
                            : 'bg-white text-stone-500 border-[#E7E0D6] hover:text-stone-900'
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>

              {/* Step 1: Room, Date, Party Size, Time Slot */}
              {step === 1 && (
                <div className="space-y-8">
                  <div>
                    <h3 className="font-serif text-xl text-stone-900 mb-4">
                      Choose Your Seating Room
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {SEATING_ZONES.map((zone) => {
                        const selected = zone.id === selectedZoneId;
                        return (
                          <button
                            key={zone.id}
                            type="button"
                            onClick={() => onSelectZoneId(zone.id)}
                            className={`text-left p-4 rounded-lg border transition-all duration-150 cursor-pointer ${
                              selected
                                ? 'bg-[#FAF9F7] border-[#5C341E] shadow-xs'
                                : 'bg-white border-[#E7E0D6] hover:border-stone-400'
                            }`}
                          >
                            <div className="flex items-baseline justify-between gap-2 mb-1">
                              <span className="font-serif text-base font-medium text-stone-900">
                                {zone.name}
                              </span>
                              <span className="text-[11px] font-medium text-[#3F5243] shrink-0">
                                {zone.slotsRemaining} open
                              </span>
                            </div>
                            <p className="text-xs text-stone-500 mb-2">
                              {zone.capacityLabel}
                            </p>
                            <p className="text-xs leading-relaxed text-stone-600">
                              {zone.atmosphere}
                            </p>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <label
                        htmlFor="reserve-date"
                        className="block text-xs font-medium text-stone-700 mb-2"
                      >
                        Reservation Date
                      </label>
                      <input
                        id="reserve-date"
                        type="date"
                        min={getTodayIso()}
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-sm font-mono bg-[#FAF9F7] border border-[#E7E0D6] rounded-md text-stone-900"
                      />
                    </div>

                    <div>
                      <span className="block text-xs font-medium text-stone-700 mb-2">
                        Party Size
                      </span>
                      <div className="grid grid-cols-6 gap-1.5">
                        {[1, 2, 3, 4, 5, 6].map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setPartySize(size)}
                            className={`py-2.5 text-sm font-mono tabular-figures rounded-md border transition-colors cursor-pointer ${
                              partySize === size
                                ? 'bg-[#5C341E] text-white border-[#5C341E]'
                                : 'bg-[#FAF9F7] text-stone-800 border-[#E7E0D6] hover:border-stone-400'
                            }`}
                          >
                            {size === 6 ? '6+' : size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-medium text-stone-700 mb-3">
                      Available Seating Times
                    </span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                      {TIME_SLOTS.map((slot) => {
                        const soldOut = slot.tablesLeft === 0;
                        const active = timeSlot === slot.time;
                        return (
                          <button
                            key={slot.time}
                            type="button"
                            disabled={soldOut}
                            onClick={() => setTimeSlot(slot.time)}
                            className={`p-3 rounded-md border text-left transition-colors ${
                              soldOut
                                ? 'bg-stone-50 border-stone-200 text-stone-400 cursor-not-allowed'
                                : active
                                  ? 'bg-[#5C341E] border-[#5C341E] text-white cursor-pointer'
                                  : 'bg-[#FAF9F7] border-[#E7E0D6] text-stone-900 hover:border-stone-400 cursor-pointer'
                            }`}
                          >
                            <div className="font-mono text-sm font-medium tabular-figures">
                              {slot.time}
                            </div>
                            <div
                              className={`text-[11px] mt-0.5 ${
                                active
                                  ? 'text-white/85'
                                  : soldOut
                                    ? 'text-stone-400'
                                    : 'text-stone-500'
                              }`}
                            >
                              {soldOut ? 'Fully Booked' : `${slot.tablesLeft} tables left`}
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E7E0D6] flex justify-end">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-6 py-3 text-sm font-medium text-white bg-[#5C341E] hover:bg-[#3D2314] rounded-md transition-colors cursor-pointer"
                    >
                      Continue to Tasting Flight &amp; Notes
                    </button>
                  </div>
                </div>
              )}

              {/* Step 2: Tasting Flight Attachment & Dietary Preferences */}
              {step === 2 && (
                <div className="space-y-8">
                  <div>
                    <h3 className="font-serif text-xl text-stone-900 mb-3">
                      Tasting Flight Pairing
                    </h3>

                    {attachedFlight ? (
                      <div className="p-5 rounded-lg border border-[#5C341E]/35 bg-[#FAF9F7] space-y-3">
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <div>
                            <p className="text-xs font-medium text-[#3F5243]">
                              Custom Flight Ready
                            </p>
                            <p className="font-serif text-lg text-stone-900 mt-0.5">
                              {attachedFlight.beverageName} + {attachedFlight.bakeName}
                            </p>
                            <p className="text-xs text-stone-600 mt-1">
                              Paired with {attachedFlight.accompanimentName}
                            </p>
                          </div>
                          <span className="font-mono text-base font-medium text-stone-900 tabular-figures">
                            ${attachedFlight.totalPrice.toFixed(2)}
                          </span>
                        </div>

                        <div className="pt-3 border-t border-[#E7E0D6] flex flex-wrap items-center justify-between gap-3">
                          <label className="inline-flex items-center gap-2 text-xs font-medium text-stone-800 cursor-pointer">
                            <input
                              type="checkbox"
                              checked={includeFlight}
                              onChange={(e) => setIncludeFlight(e.target.checked)}
                              className="w-4 h-4 accent-[#5C341E] rounded"
                            />
                            <span>Serve this flight upon arrival</span>
                          </label>

                          <div className="flex items-center gap-4 text-xs">
                            <button
                              type="button"
                              onClick={onBuildFlightClick}
                              className="font-medium text-[#5C341E] hover:underline cursor-pointer"
                            >
                              Modify Flight
                            </button>
                            <button
                              type="button"
                              onClick={onRemoveFlight}
                              className="text-stone-500 hover:text-stone-900 cursor-pointer"
                            >
                              Clear
                            </button>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="p-5 rounded-lg border border-[#E7E0D6] bg-[#FAF9F7] flex flex-wrap items-center justify-between gap-4">
                        <div>
                          <p className="text-sm font-medium text-stone-900">
                            No tasting flight attached yet
                          </p>
                          <p className="text-xs text-stone-600 mt-1">
                            Compose a 3-course pairing in the configurator to have it waiting
                            warm at your table.
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={onBuildFlightClick}
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium text-[#5C341E] bg-white hover:bg-[#F4F1EC] border border-[#E7E0D6] rounded-md transition-colors cursor-pointer shrink-0"
                        >
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Open Flight Configurator</span>
                        </button>
                      </div>
                    )}
                  </div>

                  <div>
                    <span className="block text-xs font-medium text-stone-700 mb-3">
                      Dietary &amp; Seating Preferences
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                      {DIETARY_OPTIONS.map((option) => {
                        const checked = dietaryPreferences.includes(option);
                        return (
                          <label
                            key={option}
                            className={`flex items-center gap-3 p-3 rounded-md border text-xs font-medium cursor-pointer transition-colors ${
                              checked
                                ? 'bg-[#FAF9F7] border-[#5C341E] text-stone-900'
                                : 'bg-white border-[#E7E0D6] text-stone-700 hover:border-stone-400'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleDietary(option)}
                              className="w-4 h-4 accent-[#5C341E]"
                            />
                            <span>{option}</span>
                          </label>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="special-request"
                      className="block text-xs font-medium text-stone-700 mb-2"
                    >
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      id="special-request"
                      rows={3}
                      value={specialRequest}
                      onChange={(e) => setSpecialRequest(e.target.value)}
                      placeholder="Stroller space, sunlit corner preference, or allergy details..."
                      className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F7] border border-[#E7E0D6] rounded-md text-stone-900 placeholder:text-stone-400"
                    />
                  </div>

                  <div className="pt-4 border-t border-[#E7E0D6] flex items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(1)}
                      className="px-4 py-2.5 text-sm font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={() => setStep(3)}
                      className="px-6 py-3 text-sm font-medium text-white bg-[#5C341E] hover:bg-[#3D2314] rounded-md transition-colors cursor-pointer"
                    >
                      Continue to Guest Details
                    </button>
                  </div>
                </div>
              )}

              {/* Step 3: Guest Details & Validation */}
              {step === 3 && (
                <div className="space-y-6">
                  <h3 className="font-serif text-xl text-stone-900">
                    Guest Contact Details
                  </h3>

                  <div className="space-y-4">
                    <div>
                      <label
                        htmlFor="guest-name"
                        className="block text-xs font-medium text-stone-700 mb-1.5"
                      >
                        Full Name
                      </label>
                      <input
                        id="guest-name"
                        type="text"
                        value={guestName}
                        onChange={(e) => {
                          setGuestName(e.target.value);
                          if (errors.guestName) {
                            setErrors((prev) => ({ ...prev, guestName: undefined }));
                          }
                        }}
                        placeholder="Clara Vance"
                        className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F7] border border-[#E7E0D6] rounded-md text-stone-900 placeholder:text-stone-400"
                      />
                      {errors.guestName && (
                        <p className="text-xs text-red-700 mt-1.5">{errors.guestName}</p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label
                          htmlFor="guest-email"
                          className="block text-xs font-medium text-stone-700 mb-1.5"
                        >
                          Email Address
                        </label>
                        <input
                          id="guest-email"
                          type="email"
                          value={guestEmail}
                          onChange={(e) => {
                            setGuestEmail(e.target.value);
                            if (errors.guestEmail) {
                              setErrors((prev) => ({ ...prev, guestEmail: undefined }));
                            }
                          }}
                          placeholder="clara@example.com"
                          className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F7] border border-[#E7E0D6] rounded-md text-stone-900 placeholder:text-stone-400"
                        />
                        {errors.guestEmail && (
                          <p className="text-xs text-red-700 mt-1.5">
                            {errors.guestEmail}
                          </p>
                        )}
                      </div>

                      <div>
                        <label
                          htmlFor="guest-phone"
                          className="block text-xs font-medium text-stone-700 mb-1.5"
                        >
                          Phone Number
                        </label>
                        <input
                          id="guest-phone"
                          type="tel"
                          value={guestPhone}
                          onChange={(e) => {
                            setGuestPhone(e.target.value);
                            if (errors.guestPhone) {
                              setErrors((prev) => ({ ...prev, guestPhone: undefined }));
                            }
                          }}
                          placeholder="(415) 555-0194"
                          className="w-full px-3.5 py-2.5 text-sm bg-[#FAF9F7] border border-[#E7E0D6] rounded-md text-stone-900 placeholder:text-stone-400"
                        />
                        {errors.guestPhone && (
                          <p className="text-xs text-red-700 mt-1.5">
                            {errors.guestPhone}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[#E7E0D6] flex flex-wrap items-center justify-between gap-4">
                    <button
                      type="button"
                      onClick={() => setStep(2)}
                      className="px-4 py-2.5 text-sm font-medium text-stone-600 hover:text-stone-900 cursor-pointer"
                    >
                      Back
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-3.5 text-sm font-medium text-white bg-[#5C341E] hover:bg-[#3D2314] rounded-md transition-colors cursor-pointer"
                    >
                      {isEditingExisting
                        ? 'Update Table Reservation'
                        : 'Confirm Table Reservation'}
                    </button>
                  </div>
                </div>
              )}
            </form>

            {/* Right 4 Columns: Live Summary Sidebar */}
            <aside className="lg:col-span-4 bg-white rounded-lg border border-[#E7E0D6] p-6 lg:p-7 space-y-5">
              <div>
                <p className="text-xs font-medium text-[#5C341E] mb-1">
                  Booking Summary
                </p>
                <h3 className="font-serif text-2xl text-stone-900">{activeZone.name}</h3>
                <p className="text-xs text-stone-500 mt-1">{activeZone.capacityLabel}</p>
              </div>

              <div className="space-y-3 py-4 border-y border-[#E7E0D6] text-sm">
                <div className="flex justify-between">
                  <span className="text-stone-500">Date</span>
                  <span className="font-mono text-stone-900 tabular-figures">
                    {date}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Seating Time</span>
                  <span className="font-mono text-stone-900 tabular-figures">
                    {timeSlot}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-stone-500">Party</span>
                  <span className="text-stone-900 font-medium">
                    {partySize} {partySize === 1 ? 'Guest' : 'Guests'}
                  </span>
                </div>
              </div>

              {attachedFlight && includeFlight ? (
                <div className="space-y-2 text-xs">
                  <div className="flex items-baseline justify-between">
                    <span className="font-medium text-stone-900">
                      Attached Tasting Flight
                    </span>
                    <span className="font-mono text-stone-900 font-medium tabular-figures">
                      ${attachedFlight.totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <p className="text-stone-600 leading-relaxed">
                    {attachedFlight.beverageName} · {attachedFlight.bakeName} ·{' '}
                    {attachedFlight.accompanimentName}
                  </p>
                </div>
              ) : (
                <p className="text-xs text-stone-500 leading-relaxed">
                  Tables are held for 15 minutes past reservation time. Full menu ordering
                  is always available at your seat.
                </p>
              )}

              <div className="pt-3 border-t border-[#E7E0D6] text-xs text-stone-500">
                142 Linden Passage · Botanical Quarter · Walk-ins welcome at Espresso Bar
              </div>
            </aside>
          </div>
        )}
      </div>
    </section>
  );
}
