import { ArrowDownRight, Phone } from 'lucide-react';
import { SAUNA_CONFIG } from '../data/saunaData';
import { ResilientImage } from './ResilientImage';

export function HeroSection() {
  return (
    <section id="top" className="pt-8 pb-12 sm:pt-12 sm:pb-16 lg:pt-16 lg:pb-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* 2-Column Editorial Hero Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
          {/* Left Column: Core Proposition */}
          <div className="lg:col-span-5 flex flex-col justify-between py-2">
            <div>
              <p className="text-sm text-[#6E655A] font-medium flex flex-wrap items-center gap-2">
                <span>{SAUNA_CONFIG.address}</span>
                <span aria-hidden="true">·</span>
                <span>{SAUNA_CONFIG.scheduleNote}</span>
              </p>

              <h1
                className="mt-4 font-display font-semibold text-[#171412] leading-[1.04] tracking-tight"
                style={{
                  fontSize: 'clamp(2.5rem, 4.4vw, 4rem)',
                  textWrap: 'balance',
                }}
              >
                Приватный отдых с парилкой, бассейном и караоке
              </h1>

              <p className="mt-5 text-base sm:text-[17px] leading-[1.65] text-[#4E473F] max-w-[46ch]">
                Закрытый банный комплекс ABAT в Атырау для компаний до 10 человек.
                Сухая финская парилка, тёплый бассейн, бильярд и зал караоке.
                Еду и напитки можно приносить с собой.
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-[#E3DDD2] flex flex-wrap items-center gap-4">
              <a
                href="#booking"
                className="inline-flex items-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-[#9E5B24] hover:bg-[#844A1B] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9E5B24]"
              >
                <span>Забронировать онлайн</span>
                <ArrowDownRight className="w-4 h-4" />
              </a>

              <a
                href={`tel:+${SAUNA_CONFIG.phoneRaw}`}
                className="inline-flex items-center gap-2 px-5 py-3.5 text-sm font-semibold text-[#171412] border border-[#D4CCC0] hover:bg-[#EFEAE1] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 tabular-nums focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9E5B24]"
              >
                <Phone className="w-4 h-4 text-[#9E5B24]" />
                <span>{SAUNA_CONFIG.phoneDisplay}</span>
              </a>
            </div>
          </div>

          {/* Right Column: Official Photo + Video Tour */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 items-stretch">
            <div className="rounded-xl overflow-hidden border border-[#E0D9CD] bg-[#14110E] flex flex-col">
              <div className="aspect-[3/4] w-full flex-1 overflow-hidden">
                <ResilientImage
                  src={SAUNA_CONFIG.heroImage}
                  alt="Сауна ABAT — зал отдыха, караоке и общий стол"
                  className="w-full h-full object-cover object-center"
                  fallbackTitle={SAUNA_CONFIG.brandName}
                />
              </div>
              <div className="px-4 py-2.5 bg-[#181512] text-xs text-[#DFD8CE] flex items-center justify-between gap-2 border-t border-[#2A241E]">
                <span>Зал отдыха и караоке</span>
                <span className="text-[#D89B5E]">Фото</span>
              </div>
            </div>

            <div className="rounded-xl overflow-hidden border border-[#E0D9CD] bg-[#14110E] flex flex-col">
              <div className="aspect-[3/4] w-full flex-1 overflow-hidden bg-[#14110E]">
                <video
                  src={SAUNA_CONFIG.heroVideo}
                  poster={SAUNA_CONFIG.heroVideoPoster}
                  controls
                  playsInline
                  muted
                  autoPlay
                  loop
                  preload="metadata"
                  aria-label="Видеоэкскурсия по залам сауны ABAT"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-4 py-2.5 bg-[#181512] text-xs text-[#DFD8CE] flex items-center justify-between gap-2 border-t border-[#2A241E]">
                <span>Видеоэкскурсия по залам</span>
                <span className="text-[#D89B5E]">Видео</span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Key Facts Strip */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#E0D9CD] rounded-xl bg-[#EFEAE1]/70 divide-y sm:divide-y-0 sm:divide-x divide-[#E0D9CD]">
          <div className="p-5 sm:p-6">
            <div className="text-xs font-medium text-[#6E655A]">Стоимость аренды</div>
            <div className="mt-1.5 font-display text-2xl sm:text-3xl font-semibold text-[#171412] tabular-nums">
              12 000 ₸ / час
            </div>
            <div className="mt-1 text-xs text-[#5A534A]">Фиксированная цена за весь зал</div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="text-xs font-medium text-[#6E655A]">Выгодная акция</div>
            <div className="mt-1.5 font-display text-2xl sm:text-3xl font-semibold text-[#9E5B24] tabular-nums">
              Скидка 3/1
            </div>
            <div className="mt-1 text-xs text-[#5A534A]">Берёте 3 часа — 4-й час в подарок</div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="text-xs font-medium text-[#6E655A]">Вместимость зала</div>
            <div className="mt-1.5 font-display text-2xl sm:text-3xl font-semibold text-[#171412] tabular-nums">
              До 10 человек
            </div>
            <div className="mt-1 text-xs text-[#5A534A]">Комфортно для компании и семьи</div>
          </div>

          <div className="p-5 sm:p-6">
            <div className="text-xs font-medium text-[#6E655A]">График работы</div>
            <div className="mt-1.5 font-display text-2xl sm:text-3xl font-semibold text-[#171412] tabular-nums">
              16:00 — 04:00
            </div>
            <div className="mt-1 text-xs text-[#5A534A]">Ежедневно, без выходных</div>
          </div>
        </div>
      </div>
    </section>
  );
}
