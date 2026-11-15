import heroSaunaImg from '../assets/images/hero_sauna_interior_1794757276795.jpg';
import zoneDrySaunaImg from '../assets/images/zone_dry_sauna_1794757277207.jpg';
import zonePoolImg from '../assets/images/zone_pool_1794757277087.jpg';
import zoneBilliardsKaraokeImg from '../assets/images/zone_billiards_karaoke_1794757277849.jpg';
import zoneSpaMassageImg from '../assets/images/zone_spa_massage_1794757277815.jpg';

export interface AmenityZone {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  description: string;
  details: string[];
  image: string;
  alt: string;
  featured?: boolean;
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
  heroImage: heroSaunaImg,
};

export const AMENITY_ZONES: AmenityZone[] = [
  {
    id: 'dry-sauna',
    index: '01',
    title: 'Сухая парилка',
    subtitle: 'Жар кедра и натуральный камень',
    description:
      'Просторная финская парная с отделкой из натурального дерева и мягким сухим жаром. Идеальная температура для глубокого прогрева и восстановления сил.',
    details: ['Сухой финский пар', 'Многоуровневые полки', 'Вместимость до 10 гостей'],
    image: zoneDrySaunaImg,
    alt: 'Сухая финская парилка в сауне ABAT с деревянными полками и каменкой',
  },
  {
    id: 'pool',
    index: '02',
    title: 'Тёплый бассейн',
    subtitle: 'Чистая вода после парной',
    description:
      'Приватный крытый бассейн с комфортной температурой воды, мягкой подсветкой и зоной отдыха для контрастного обновления после горячего пара.',
    details: ['Фильтрация воды', 'Удобный спуск', 'Шезлонги у воды'],
    image: zonePoolImg,
    alt: 'Крытый бассейн в сауне ABAT с каменной отделкой и тёплой подсветкой',
  },
  {
    id: 'billiards-karaoke',
    index: '03',
    title: 'Караоке и бильярд',
    subtitle: 'Вечерний досуг для всей компании',
    description:
      'Отдельная гостиная с полноразмерным бильярдным столом, качественной акустикой, беспроводными микрофонами и мягкой зоной, где можно накрыть свой стол.',
    details: ['Бильярдный стол', 'Караоке-система', 'Своя еда и напитки разрешены'],
    image: zoneBilliardsKaraokeImg,
    alt: 'Зал отдыха с бильярдным столом и караоке в сауне ABAT',
    featured: true,
  },
  {
    id: 'spa-extras',
    index: '04',
    title: 'Пилинг и массаж',
    subtitle: 'Дополнительные спа-процедуры',
    description:
      'По желанию к отдыху можно добавить оздоровительный массаж или очищающий пилинг тела. Укажите нужную процедуру в календаре при бронировании.',
    details: ['Пилинг тела', 'Расслабляющий массаж', 'По предварительному заказу'],
    image: zoneSpaMassageImg,
    alt: 'Спа-зона для пилинга и массажа в сауне ABAT',
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
