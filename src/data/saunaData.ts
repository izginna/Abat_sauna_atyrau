export interface AmenityZone {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  image: string;
  imagePosition?: string;
  alt: string;
}

export interface ExtraService {
  id: 'peeling' | 'massage';
  label: string;
  description: string;
}

export const SAUNA_CONFIG = {
  brandName: 'Сауна ABAT',
  shortMark: 'ABAT',
  city: 'г. Атырау',
  address: 'г. Атырау, Ширина, Алтынколь, 9',
  shortAddress: 'Ширина, Алтынколь, 9',
  hoursLabel: '16:00 — 04:00',
  scheduleNote: 'Без выходных',
  pricePerHour: 12000,
  currency: '₸',
  maxGuests: 10,
  promoLabel: '3/1',
  promoDescription: 'Каждый 4-й час в подарок',
  byoFoodNote: 'Можно приносить свою еду и напитки',
  phoneDisplay: '+7 700 020 59 99',
  phoneRaw: '77000205999',
  whatsappBaseUrl: 'https://wa.me/77000205999',
  heroImage: '/assets/aistudio/IMG_2404_02c6fb19.jpeg',
  heroVideo: '/assets/aistudio/261207dd-4348-4ea6-b34b-7293ed989aeb_788fa34b.MP4',
  heroVideoPoster: '/assets/aistudio/IMG_2402_6d985e13.jpeg',
};

export const AMENITY_ZONES: AmenityZone[] = [
  {
    id: 'pool',
    index: '01',
    title: 'Тёплый бассейн',
    subtitle: 'Чистая вода после парной',
    description:
      'Крытый бассейн с чистой водой, удобной лестницей и отделкой натуральным деревом. Отличное освежение сразу после горячей сухой парилки.',
    details: ['Чистая вода', 'Удобный спуск', 'Выход из парной'],
    image: '/assets/aistudio/IMG_2402_6d985e13.jpeg',
    imagePosition: 'object-[50%_72%]',
    alt: 'Крытый бассейн в сауне ABAT с деревянными стенами и лестницей',
  },
  {
    id: 'billiards',
    index: '02',
    title: 'Бильярдный зал',
    subtitle: 'Отдельная игровая зона',
    description:
      'Полноразмерный бильярдный стол с зелёным сукном, профессиональным освещением и уютным тёплым интерьером для компании друзей.',
    details: ['Большой стол', 'Кии и шары в комплекте', 'Кондиционер'],
    image: '/assets/aistudio/IMG_2399_7c7f5033.jpeg',
    imagePosition: 'object-[50%_58%]',
    alt: 'Бильярдный зал в сауне ABAT',
  },
  {
    id: 'lounge-karaoke',
    index: '03',
    title: 'Гостиная и караоке',
    subtitle: 'Стол, диван и музыка',
    description:
      'Просторная комната отдыха с большим столом, кожаным диваном, телевизором с караоке и чайной зоной. Еду и напитки можно приносить с собой.',
    details: ['Караоке и ТВ', 'До 10 гостей', 'Своя еда и напитки разрешены'],
    image: '/assets/aistudio/IMG_2404_02c6fb19.jpeg',
    imagePosition: 'object-center',
    alt: 'Гостиная с диваном, столом и караоке в сауне ABAT',
  },
];

export const EXTRA_SERVICES: ExtraService[] = [
  {
    id: 'peeling',
    label: 'Пилинг',
    description: 'Глубокое очищение и обновление кожи',
  },
  {
    id: 'massage',
    label: 'Массаж',
    description: 'Восстанавливающий спа-массаж',
  },
];

export interface StartSlot {
  label: string;
  offsetFrom16: number; // 0 for 16:00, 11 for 03:00
}

// Working hours: 16:00 to 04:00 (12-hour operational window)
export const START_TIME_SLOTS: StartSlot[] = Array.from({ length: 12 }, (_, idx) => {
  const hour = (16 + idx) % 24;
  const label = `${String(hour).padStart(2, '0')}:00`;
  return {
    label,
    offsetFrom16: idx,
  };
});

export function formatEndTime(offsetFrom16: number, durationHours: number): string {
  const endOffset = offsetFrom16 + durationHours;
  const endHour = (16 + endOffset) % 24;
  return `${String(endHour).padStart(2, '0')}:00`;
}

export function calculateBookingPrice(totalHours: number) {
  const freeHours = Math.floor(totalHours / 4); // Акция 3/1: 4-й час бесплатно, 8-й час бесплатно и т.д.
  const paidHours = totalHours - freeHours;
  const totalAmount = paidHours * SAUNA_CONFIG.pricePerHour;
  const savings = freeHours * SAUNA_CONFIG.pricePerHour;
  return {
    totalHours,
    freeHours,
    paidHours,
    totalAmount,
    savings,
  };
}

export function formatTenGe(amount: number): string {
  return `${amount.toLocaleString('ru-RU')} ₸`;
}
