import { useMemo, useState } from 'react';
import {
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Copy,
  Gift,
  MessageCircle,
  Minus,
  Plus,
  Users,
} from 'lucide-react';
import {
  EXTRA_SERVICES,
  SAUNA_CONFIG,
  START_TIME_SLOTS,
  calculateBookingPrice,
  formatEndTime,
  formatTenGe,
} from '../data/saunaData';

const WEEKDAYS_RU = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

const MONTHS_NOMINATIVE_RU = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

const MONTHS_GENITIVE_RU = [
  'января',
  'февраля',
  'марта',
  'апреля',
  'мая',
  'июня',
  'июля',
  'августа',
  'сентября',
  'октября',
  'ноября',
  'декабря',
];

function startOfDay(d: Date): Date {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function isSameDay(a: Date, b: Date): boolean {
  return (
    a.getFullYear() === b.getFullYear() &&
    a.getMonth() === b.getMonth() &&
    a.getDate() === b.getDate()
  );
}

function formatDateRu(d: Date): string {
  return `${d.getDate()} ${MONTHS_GENITIVE_RU[d.getMonth()]} ${d.getFullYear()}`;
}

export function BookingCalendar() {
  const today = useMemo(() => startOfDay(new Date()), []);
  const [viewMonth, setViewMonth] = useState<Date>(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [selectedDate, setSelectedDate] = useState<Date>(today);
  const [startOffset, setStartOffset] = useState<number>(2); // 18:00 default
  const [durationHours, setDurationHours] = useState<number>(4); // 4h highlights 3/1 promo right away
  const [guestsCount, setGuestsCount] = useState<number>(6);
  const [selectedExtras, setSelectedExtras] = useState<Array<'peeling' | 'massage'>>([]);
  const [byoFood, setByoFood] = useState<boolean>(true);
  const [guestName, setGuestName] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [copied, setCopied] = useState<boolean>(false);

  const maxAllowedDuration = 12 - startOffset; // Closing at 04:00 (12 hours from 16:00)

  const handleSelectStartOffset = (offset: number) => {
    setStartOffset(offset);
    const maxForSlot = 12 - offset;
    if (durationHours > maxForSlot) {
      setDurationHours(maxForSlot);
    }
  };

  const toggleExtra = (id: 'peeling' | 'massage') => {
    setSelectedExtras((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Calendar grid days (Monday-first)
  const calendarDays = useMemo(() => {
    const year = viewMonth.getFullYear();
    const month = viewMonth.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // JS getDay(): 0 = Sun, 1 = Mon ... 6 = Sat -> convert to Mon=0..Sun=6
    const startWeekday = (firstDayOfMonth.getDay() + 6) % 7;

    const cells: Array<{ date: Date | null; key: string }> = [];
    for (let i = 0; i < startWeekday; i++) {
      cells.push({ date: null, key: `empty-${i}` });
    }
    for (let day = 1; day <= daysInMonth; day++) {
      cells.push({ date: new Date(year, month, day), key: `day-${year}-${month}-${day}` });
    }
    return cells;
  }, [viewMonth]);

  const canGoPrevMonth =
    viewMonth.getFullYear() > today.getFullYear() ||
    (viewMonth.getFullYear() === today.getFullYear() &&
      viewMonth.getMonth() > today.getMonth());

  const goToPrevMonth = () => {
    if (!canGoPrevMonth) return;
    setViewMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setViewMonth((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const startSlotLabel = START_TIME_SLOTS[startOffset]?.label ?? '18:00';
  const endSlotLabel = formatEndTime(startOffset, durationHours);
  const pricing = calculateBookingPrice(durationHours);

  const selectedExtrasLabels = EXTRA_SERVICES.filter((s) =>
    selectedExtras.includes(s.id)
  ).map((s) => s.label);

  const whatsappMessage = useMemo(() => {
    const lines = [
      `Здравствуйте! Хочу забронировать сауну ABAT (${SAUNA_CONFIG.address}).`,
      '',
      `Дата: ${formatDateRu(selectedDate)}`,
      `Время: ${startSlotLabel} — ${endSlotLabel} (${durationHours} ч)`,
      `Гостей: ${guestsCount} чел.`,
    ];

    if (pricing.freeHours > 0) {
      lines.push(
        `Акция 3/1: ${pricing.paidHours} ч оплата + ${pricing.freeHours} ч в подарок`
      );
    }

    lines.push(`Предварительная сумма аренды: ${formatTenGe(pricing.totalAmount)}`);

    if (selectedExtrasLabels.length > 0) {
      lines.push(`Дополнительно: ${selectedExtrasLabels.join(', ')}`);
    } else {
      lines.push('Дополнительные услуги: без доп. услуг');
    }

    lines.push(
      `Еда и напитки с собой: ${byoFood ? 'да' : 'нет'}`
    );

    if (guestName.trim()) {
      lines.push(`Имя: ${guestName.trim()}`);
    }
    if (notes.trim()) {
      lines.push(`Пожелания: ${notes.trim()}`);
    }

    return lines.join('\n');
  }, [
    selectedDate,
    startSlotLabel,
    endSlotLabel,
    durationHours,
    guestsCount,
    pricing,
    selectedExtrasLabels,
    byoFood,
    guestName,
    notes,
  ]);

  const whatsappUrl = `${SAUNA_CONFIG.whatsappBaseUrl}?text=${encodeURIComponent(
    whatsappMessage
  )}`;

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(whatsappMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback ignored if clipboard unavailable
    }
  };

  return (
    <section id="booking" className="py-12 sm:py-16 lg:py-20 border-t border-[#E3DDD2]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mb-10">
          <p className="text-sm font-medium text-[#9E5B24]">Онлайн-бронирование</p>
          <h2
            className="mt-1.5 font-display font-semibold text-[#171412] leading-[1.1] tracking-tight"
            style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', textWrap: 'balance' }}
          >
            Выберите дату, время и перейдите в WhatsApp
          </h2>
          <p className="mt-2.5 text-sm sm:text-base text-[#5A534A] max-w-[58ch]">
            Заполните параметры отдыха в календаре — заявка со всеми данными автоматически
            сформируется для отправки администратору на номер{' '}
            <span className="font-medium text-[#171412] tabular-nums">
              {SAUNA_CONFIG.phoneDisplay}
            </span>
            .
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Side: Interactive Calendar + Controls */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Calendar */}
            <div className="rounded-xl border border-[#E0D9CD] bg-[#FBF9F5] p-5 sm:p-7">
              <div className="flex items-center justify-between gap-4 mb-5">
                <div className="flex items-center gap-2.5">
                  <CalendarDays className="w-5 h-5 text-[#9E5B24]" />
                  <h3 className="text-base sm:text-lg font-semibold text-[#171412]">
                    1. Дата посещения
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={goToPrevMonth}
                    disabled={!canGoPrevMonth}
                    aria-label="Предыдущий месяц"
                    className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-[#DCD4C8] text-[#171412] hover:bg-[#EFEAE1] disabled:opacity-35 disabled:cursor-not-allowed transition-colors"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <span className="min-w-[136px] text-center text-sm font-semibold text-[#171412]">
                    {MONTHS_NOMINATIVE_RU[viewMonth.getMonth()]} {viewMonth.getFullYear()}
                  </span>
                  <button
                    type="button"
                    onClick={goToNextMonth}
                    aria-label="Следующий месяц"
                    className="w-9 h-9 inline-flex items-center justify-center rounded-lg border border-[#DCD4C8] text-[#171412] hover:bg-[#EFEAE1] transition-colors"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Weekday Header */}
              <div className="grid grid-cols-7 gap-1.5 mb-2">
                {WEEKDAYS_RU.map((day) => (
                  <div
                    key={day}
                    className="text-center text-xs font-medium text-[#7B7267] py-1"
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Days Matrix */}
              <div className="grid grid-cols-7 gap-1.5">
                {calendarDays.map((cell) => {
                  if (!cell.date) {
                    return <div key={cell.key} className="h-11" />;
                  }

                  const dateObj = cell.date;
                  const isPast = dateObj < today;
                  const isSelected = isSameDay(dateObj, selectedDate);
                  const isToday = isSameDay(dateObj, today);

                  return (
                    <button
                      key={cell.key}
                      type="button"
                      disabled={isPast}
                      onClick={() => setSelectedDate(dateObj)}
                      aria-pressed={isSelected}
                      aria-label={formatDateRu(dateObj)}
                      className={`h-11 rounded-lg text-sm font-medium tabular-nums transition-colors duration-150 flex flex-col items-center justify-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9E5B24] ${
                        isSelected
                          ? 'bg-[#9E5B24] text-white font-semibold'
                          : isPast
                            ? 'text-[#BEB6AA] cursor-not-allowed'
                            : isToday
                              ? 'bg-[#EFEAE1] text-[#171412] border border-[#9E5B24]/50 hover:bg-[#E5DEC9]'
                              : 'text-[#171412] hover:bg-[#EFEAE1]'
                      }`}
                    >
                      <span>{dateObj.getDate()}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Time & Duration */}
            <div className="rounded-xl border border-[#E0D9CD] bg-[#FBF9F5] p-5 sm:p-7 space-y-6">
              <div>
                <div className="flex flex-wrap items-center justify-between gap-2 mb-3.5">
                  <div className="flex items-center gap-2.5">
                    <Clock className="w-5 h-5 text-[#9E5B24]" />
                    <h3 className="text-base sm:text-lg font-semibold text-[#171412]">
                      2. Время заезда (16:00 — 04:00)
                    </h3>
                  </div>
                  <span className="text-xs text-[#6E655A]">
                    Слоты после 00:00 — ночь выбранной даты
                  </span>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                  {START_TIME_SLOTS.map((slot) => {
                    const active = startOffset === slot.offsetFrom16;
                    return (
                      <button
                        key={slot.label}
                        type="button"
                        onClick={() => handleSelectStartOffset(slot.offsetFrom16)}
                        aria-pressed={active}
                        className={`py-2.5 px-2 rounded-lg text-sm font-medium tabular-nums border transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9E5B24] ${
                          active
                            ? 'bg-[#181512] text-white border-[#181512]'
                            : 'bg-white text-[#171412] border-[#DCD4C8] hover:border-[#9E5B24]'
                        }`}
                      >
                        {slot.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Duration Selector */}
              <div className="pt-5 border-t border-[#EAE4D9]">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-[#171412]">
                      Длительность отдыха
                    </div>
                    <div className="text-xs text-[#6E655A] mt-0.5 tabular-nums">
                      Заезд в {startSlotLabel}, выезд в {endSlotLabel} (макс. {maxAllowedDuration} ч до закрытия)
                    </div>
                  </div>

                  <div className="inline-flex items-center gap-2 bg-[#EFEAE1] p-1 rounded-lg border border-[#DCD4C8]">
                    <button
                      type="button"
                      onClick={() => setDurationHours((h) => Math.max(1, h - 1))}
                      disabled={durationHours <= 1}
                      aria-label="Уменьшить количество часов"
                      className="w-10 h-10 inline-flex items-center justify-center rounded-md bg-white text-[#171412] hover:bg-[#F7F4EE] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="min-w-[74px] text-center text-sm font-semibold text-[#171412] tabular-nums">
                      {durationHours} ч
                    </span>
                    <button
                      type="button"
                      onClick={() =>
                        setDurationHours((h) => Math.min(maxAllowedDuration, h + 1))
                      }
                      disabled={durationHours >= maxAllowedDuration}
                      aria-label="Увеличить количество часов"
                      className="w-10 h-10 inline-flex items-center justify-center rounded-md bg-white text-[#171412] hover:bg-[#F7F4EE] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                {/* Quick 3/1 Promo Helper */}
                {durationHours === 3 && maxAllowedDuration >= 4 && (
                  <div className="mt-4 p-3.5 rounded-lg bg-[#EFEAE1] border border-[#D4C8B8] flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-2.5 text-sm text-[#171412]">
                      <Gift className="w-4 h-4 text-[#9E5B24] shrink-0" />
                      <span>
                        По акции <strong>3/1</strong> 4-й час — бесплатно за ту же цену (36 000 ₸)
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDurationHours(4)}
                      className="px-3.5 py-2 text-xs font-semibold text-white bg-[#9E5B24] hover:bg-[#844A1B] rounded-md transition-colors whitespace-nowrap shrink-0"
                    >
                      Взять 4-й час в подарок
                    </button>
                  </div>
                )}

                {pricing.freeHours > 0 && (
                  <div className="mt-4 p-3.5 rounded-lg bg-[#E9F2EC] border border-[#BFD6C6] flex items-center gap-2.5 text-sm text-[#1D4A2B]">
                    <Gift className="w-4 h-4 shrink-0" />
                    <span>
                      Применена акция <strong>3/1</strong>: {pricing.freeHours}{' '}
                      {pricing.freeHours === 1 ? 'час' : 'часа'} в подарок (экономия{' '}
                      <span className="tabular-nums font-semibold">
                        {formatTenGe(pricing.savings)}
                      </span>
                      )
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Step 3: Guests, Extras & Contact Info */}
            <div className="rounded-xl border border-[#E0D9CD] bg-[#FBF9F5] p-5 sm:p-7 space-y-6">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-2.5">
                  <Users className="w-5 h-5 text-[#9E5B24]" />
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-[#171412]">
                      3. Гости и доп. услуги
                    </h3>
                    <p className="text-xs text-[#6E655A]">
                      Вместимость комплекса — до {SAUNA_CONFIG.maxGuests} человек
                    </p>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 bg-[#EFEAE1] p-1 rounded-lg border border-[#DCD4C8]">
                  <button
                    type="button"
                    onClick={() => setGuestsCount((g) => Math.max(1, g - 1))}
                    disabled={guestsCount <= 1}
                    aria-label="Уменьшить количество гостей"
                    className="w-10 h-10 inline-flex items-center justify-center rounded-md bg-white text-[#171412] hover:bg-[#F7F4EE] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="min-w-[82px] text-center text-sm font-semibold text-[#171412] tabular-nums">
                    {guestsCount} чел.
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setGuestsCount((g) => Math.min(SAUNA_CONFIG.maxGuests, g + 1))
                    }
                    disabled={guestsCount >= SAUNA_CONFIG.maxGuests}
                    aria-label="Увеличить количество гостей"
                    className="w-10 h-10 inline-flex items-center justify-center rounded-md bg-white text-[#171412] hover:bg-[#F7F4EE] disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Extras: Peeling & Massage */}
              <div className="pt-5 border-t border-[#EAE4D9]">
                <div className="text-sm font-semibold text-[#171412] mb-3">
                  Дополнительные спа-услуги (по желанию)
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {EXTRA_SERVICES.map((service) => {
                    const checked = selectedExtras.includes(service.id);
                    return (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => toggleExtra(service.id)}
                        aria-pressed={checked}
                        className={`p-3.5 rounded-lg border text-left transition-colors duration-150 flex items-start gap-3 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9E5B24] ${
                          checked
                            ? 'bg-[#181512] text-white border-[#181512]'
                            : 'bg-white text-[#171412] border-[#DCD4C8] hover:border-[#9E5B24]'
                        }`}
                      >
                        <span
                          className={`mt-0.5 w-5 h-5 rounded flex items-center justify-center shrink-0 border ${
                            checked
                              ? 'bg-[#9E5B24] border-[#9E5B24] text-white'
                              : 'border-[#C5BDB0] bg-transparent'
                          }`}
                        >
                          {checked && <Check className="w-3.5 h-3.5" />}
                        </span>
                        <span>
                          <span className="block text-sm font-semibold">{service.label}</span>
                          <span
                            className={`block text-xs mt-0.5 ${
                              checked ? 'text-[#CFC7BC]' : 'text-[#6E655A]'
                            }`}
                          >
                            {service.description}
                          </span>
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bring your own food/drinks & Name/Notes */}
              <div className="pt-5 border-t border-[#EAE4D9] space-y-4">
                <label className="flex items-center gap-3 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={byoFood}
                    onChange={(e) => setByoFood(e.target.checked)}
                    className="w-5 h-5 accent-[#9E5B24] rounded cursor-pointer"
                  />
                  <span className="text-sm text-[#171412]">
                    Принесём с собой еду и напитки (разрешено бесплатно)
                  </span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
                  <div>
                    <label
                      htmlFor="guest-name"
                      className="block text-xs font-medium text-[#5A534A] mb-1.5"
                    >
                      Ваше имя (необязательно)
                    </label>
                    <input
                      id="guest-name"
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      placeholder="Например, Арман"
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCD4C8] rounded-lg text-[#171412] placeholder:text-[#A49B8E] focus:outline-none focus:border-[#9E5B24]"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="guest-notes"
                      className="block text-xs font-medium text-[#5A534A] mb-1.5"
                    >
                      Пожелания к визиту
                    </label>
                    <input
                      id="guest-notes"
                      type="text"
                      value={notes}
                      onChange={(e) => setNotes(e.target.value)}
                      placeholder="Караоке, прогреть парилку..."
                      className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#DCD4C8] rounded-lg text-[#171412] placeholder:text-[#A49B8E] focus:outline-none focus:border-[#9E5B24]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Summary Card & WhatsApp Deep-Link */}
          <aside className="lg:col-span-5 lg:sticky lg:top-24 rounded-xl border border-[#D9D1C5] bg-[#181512] text-[#F7F4EE] p-6 sm:p-8">
            <p className="text-xs font-medium text-[#D89B5E]">Итог вашей заявки</p>
            <h3 className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-white">
              {SAUNA_CONFIG.brandName}
            </h3>
            <p className="mt-1 text-xs text-[#B5ACA0]">{SAUNA_CONFIG.address}</p>

            {/* Summary Rows */}
            <dl className="mt-6 space-y-3.5 text-sm border-t border-b border-[#2E2924] py-5">
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-[#B5ACA0]">Дата</dt>
                <dd className="font-medium text-white text-right tabular-nums">
                  {formatDateRu(selectedDate)}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-[#B5ACA0]">Время</dt>
                <dd className="font-medium text-white text-right tabular-nums">
                  {startSlotLabel} — {endSlotLabel} ({durationHours} ч)
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-[#B5ACA0]">Гости</dt>
                <dd className="font-medium text-white text-right tabular-nums">
                  {guestsCount} чел.
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-[#B5ACA0]">Доп. услуги</dt>
                <dd className="font-medium text-white text-right">
                  {selectedExtrasLabels.length > 0
                    ? selectedExtrasLabels.join(', ')
                    : 'Не выбраны'}
                </dd>
              </div>
              <div className="flex items-baseline justify-between gap-4">
                <dt className="text-[#B5ACA0]">Тариф</dt>
                <dd className="font-medium text-white text-right tabular-nums">
                  {pricing.paidHours} ч × {formatTenGe(SAUNA_CONFIG.pricePerHour)}
                  {pricing.freeHours > 0 ? ` (+${pricing.freeHours} ч бесплатно)` : ''}
                </dd>
              </div>
            </dl>

            {/* Total Cost */}
            <div className="mt-5 flex items-baseline justify-between gap-4">
              <span className="text-sm text-[#CFC7BC]">К оплате за аренду</span>
              <span className="font-display text-3xl sm:text-4xl font-semibold text-white tabular-nums">
                {formatTenGe(pricing.totalAmount)}
              </span>
            </div>
            {selectedExtrasLabels.length > 0 && (
              <p className="mt-1 text-xs text-[#A89E92] text-right">
                Стоимость пилинга/массажа уточнит администратор в WhatsApp
              </p>
            )}

            {/* Message Preview */}
            <div className="mt-6 rounded-lg bg-[#231F1B] border border-[#342E28] p-3.5">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="text-xs font-medium text-[#B5ACA0]">
                  Текст сообщения для WhatsApp
                </span>
                <button
                  type="button"
                  onClick={handleCopyMessage}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-[#D89B5E] hover:text-white transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Скопировано</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Копировать</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="text-xs text-[#DFD8CE] whitespace-pre-wrap font-sans leading-relaxed max-h-36 overflow-y-auto">
                {whatsappMessage}
              </pre>
            </div>

            {/* Primary WhatsApp Redirect CTA */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 w-full inline-flex items-center justify-center gap-2.5 px-6 py-4 text-base font-semibold text-white bg-[#25854D] hover:bg-[#1E6E3F] rounded-lg transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Забронировать в WhatsApp</span>
            </a>

            <p className="mt-3 text-center text-xs text-[#A89E92] tabular-nums">
              Отправка заявки на номер {SAUNA_CONFIG.phoneDisplay}
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
}
