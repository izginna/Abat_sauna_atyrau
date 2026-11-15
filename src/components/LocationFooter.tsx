import { Clock, ExternalLink, MapPin, MessageCircle, Phone } from 'lucide-react';
import { SAUNA_CONFIG } from '../data/saunaData';

export function LocationFooter() {
  const twoGisUrl =
    'https://2gis.kz/atyrau/search/%D0%A8%D0%B8%D1%80%D0%B8%D0%BD%D0%B0%20%D0%90%D0%BB%D1%82%D1%8B%D0%BD%D0%BA%D0%BE%D0%BB%D1%8C%209';
  const googleMapsUrl =
    'https://www.google.com/maps/search/?api=1&query=%D0%90%D1%82%D1%8B%D1%80%D0%B0%D1%83+%D0%A8%D0%B8%D1%80%D0%B8%D0%BD%D0%B0+%D0%90%D0%BB%D1%82%D1%8B%D0%BD%D0%BA%D0%BE%D0%BB%D1%8C+9';

  return (
    <footer id="contacts" className="border-t border-[#E3DDD2] bg-[#EFEAE1]/75">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <p className="text-sm font-medium text-[#9E5B24]">Контакты и адрес</p>
            <h2
              className="mt-1.5 font-display font-semibold text-[#171412] leading-tight"
              style={{ fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)' }}
            >
              Ждём вас в сауне ABAT
            </h2>
            <p className="mt-3 text-sm sm:text-base text-[#5A534A] leading-relaxed max-w-[42ch]">
              Уточнить свободные окна, заказать пилинг или массаж и подтвердить бронь
              можно в WhatsApp или по телефону.
            </p>
          </div>

          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="rounded-xl border border-[#DED6CA] bg-[#FBF9F5] p-5">
              <MapPin className="w-5 h-5 text-[#9E5B24]" />
              <div className="mt-3 text-xs font-medium text-[#6E655A]">Адрес</div>
              <div className="mt-1 text-sm font-semibold text-[#171412] leading-snug">
                {SAUNA_CONFIG.address}
              </div>
              <div className="mt-3 flex flex-wrap gap-3 text-xs font-medium">
                <a
                  href={twoGisUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#9E5B24] hover:underline underline-offset-4"
                >
                  <span>2GIS</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-[#5A534A] hover:text-[#171412] hover:underline underline-offset-4"
                >
                  <span>Google Карты</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            <div className="rounded-xl border border-[#DED6CA] bg-[#FBF9F5] p-5">
              <Clock className="w-5 h-5 text-[#9E5B24]" />
              <div className="mt-3 text-xs font-medium text-[#6E655A]">Режим работы</div>
              <div className="mt-1 text-sm font-semibold text-[#171412] tabular-nums">
                {SAUNA_CONFIG.hoursLabel}
              </div>
              <div className="mt-1 text-xs text-[#5A534A]">
                {SAUNA_CONFIG.scheduleNote} · до {SAUNA_CONFIG.maxGuests} чел.
              </div>
            </div>

            <div className="rounded-xl border border-[#DED6CA] bg-[#FBF9F5] p-5">
              <Phone className="w-5 h-5 text-[#9E5B24]" />
              <div className="mt-3 text-xs font-medium text-[#6E655A]">Связь и WhatsApp</div>
              <a
                href={`tel:+${SAUNA_CONFIG.phoneRaw}`}
                className="mt-1 block text-sm font-semibold text-[#171412] hover:text-[#9E5B24] transition-colors tabular-nums"
              >
                {SAUNA_CONFIG.phoneDisplay}
              </a>
              <a
                href={SAUNA_CONFIG.whatsappBaseUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-[#25854D] hover:underline underline-offset-4"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                <span>Написать в WhatsApp</span>
              </a>
            </div>
          </div>
        </div>

        {/* Quiet Footer Bottom Bar */}
        <div className="mt-10 pt-6 border-t border-[#DED6CA] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#6E655A]">
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-semibold text-[#171412]">{SAUNA_CONFIG.brandName}</span>
            <span aria-hidden="true">·</span>
            <span>{SAUNA_CONFIG.address}</span>
          </div>
          <div>Ежедневно с 16:00 до 04:00 · 12 000 ₸/час · Акция 3/1</div>
        </div>
      </div>
    </footer>
  );
}
