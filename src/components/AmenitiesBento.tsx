import { ArrowDownRight, Check } from 'lucide-react';
import { AMENITY_ZONES, SAUNA_CONFIG } from '../data/saunaData';
import { ResilientImage } from './ResilientImage';

export function AmenitiesBento() {
  return (
    <section id="zones" className="py-12 sm:py-16 lg:py-20 border-t border-[#E3DDD2]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-sm font-medium text-[#9E5B24]">Зоны комплекса</p>
            <h2
              className="mt-1.5 font-display font-semibold text-[#171412] leading-[1.1] tracking-tight"
              style={{ fontSize: 'clamp(1.75rem, 3vw, 2.75rem)', textWrap: 'balance' }}
            >
              Реальные залы и атмосфера ABAT
            </h2>
          </div>
          <p className="text-sm sm:text-base text-[#5A534A] max-w-[42ch]">
            Продуманное пространство для отдыха: тёплый бассейн, бильярд, гостиная с караоке и сухая парилка.
          </p>
        </div>

        {/* 3-Column Portrait Gallery matching real uploaded photos */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {AMENITY_ZONES.map((zone) => (
            <article
              key={zone.id}
              className="group rounded-xl border border-[#E0D9CD] bg-[#FBF9F5] overflow-hidden flex flex-col"
            >
              <div className="aspect-[3/4] w-full overflow-hidden bg-[#181512]">
                <ResilientImage
                  src={zone.image}
                  alt={zone.alt}
                  fallbackTitle={zone.title}
                  className={`w-full h-full object-cover ${zone.imagePosition ?? 'object-center'} transition-transform duration-300 group-hover:scale-[1.02]`}
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="text-xs font-medium text-[#7B7267]">
                    {zone.subtitle}
                  </div>
                  <h3 className="mt-1 font-display text-2xl font-semibold text-[#171412] leading-tight">
                    {zone.index}. {zone.title}
                  </h3>

                  <p className="mt-2.5 text-sm leading-relaxed text-[#4E473F]">
                    {zone.description}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-[#EAE4D9] flex flex-wrap items-center gap-x-3 gap-y-1.5 text-xs font-medium text-[#5A534A]">
                  {zone.details.map((detail, detailIdx) => (
                    <span key={detail} className="inline-flex items-center gap-2">
                      {detailIdx > 0 && (
                        <span aria-hidden="true" className="text-[#B8AE9F]">
                          ·
                        </span>
                      )}
                      <span>{detail}</span>
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Zone 04: Dry Sauna + Peeling & Massage */}
        <div className="mt-6 rounded-xl border border-[#E0D9CD] bg-[#FBF9F5] p-6 sm:p-8 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            <div className="text-xs font-medium text-[#9E5B24]">
              Парная и дополнительный уход
            </div>
            <h3 className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-[#171412]">
              04. Сухая парилка, пилинг и массаж
            </h3>
            <p className="mt-2 text-sm sm:text-base text-[#4E473F] leading-relaxed">
              Сухая финская парилка с отделкой из дерева (её также видно в видеообзоре выше)
              включена в стоимость аренды. По желанию можно дополнительно заказать пилинг
              или массаж — просто отметьте эти услуги в форме бронирования.
            </p>
          </div>
          <a
            href="#booking"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold text-[#171412] border border-[#D4CCC0] hover:bg-[#EFEAE1] rounded-lg transition-colors whitespace-nowrap shrink-0"
          >
            <span>Выбрать услуги в календаре</span>
            <ArrowDownRight className="w-4 h-4 text-[#9E5B24]" />
          </a>
        </div>

        {/* Transparent Pricing & House Rules */}
        <div
          id="pricing"
          className="mt-10 rounded-xl border border-[#D9D1C5] bg-[#181512] text-[#F7F4EE] p-6 sm:p-8 lg:p-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-5">
              <p className="text-sm font-medium text-[#D89B5E]">Тариф и условия</p>
              <h3
                className="mt-2 font-display font-semibold text-white leading-[1.1]"
                style={{ fontSize: 'clamp(1.75rem, 2.8vw, 2.5rem)', textWrap: 'balance' }}
              >
                Прозрачная цена без доплат за гостей
              </h3>
              <p className="mt-4 text-sm sm:text-base text-[#CFC7BC] leading-relaxed">
                Вы оплачиваете только время аренды всего комплекса — независимо от того,
                придёте вы вдвоём или компанией до {SAUNA_CONFIG.maxGuests} человек.
              </p>

              <div className="mt-6 flex items-baseline gap-3">
                <span className="font-display text-4xl sm:text-5xl font-semibold text-white tabular-nums">
                  12 000 ₸
                </span>
                <span className="text-sm text-[#CFC7BC]">за 1 час аренды</span>
              </div>
            </div>

            <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6 lg:border-l lg:border-[#2E2924] lg:pl-8">
              <div>
                <h4 className="text-base font-semibold text-white">Акция «3/1»</h4>
                <p className="mt-1.5 text-sm text-[#CFC7BC] leading-relaxed">
                  При бронировании 3 часов подряд 4-й час предоставляется бесплатно.
                  4 часа отдыха обойдутся в <span className="text-white font-medium tabular-nums">36 000 ₸</span> вместо{' '}
                  <span className="line-through text-[#8D847A] tabular-nums">48 000 ₸</span>.
                </p>
              </div>

              <div>
                <h4 className="text-base font-semibold text-white">Еда и напитки с собой</h4>
                <p className="mt-1.5 text-sm text-[#CFC7BC] leading-relaxed">
                  В сауну ABAT можно спокойно приносить свою еду и любые напитки
                  без пробкового сбора и наценок.
                </p>
              </div>

              <div>
                <h4 className="text-base font-semibold text-white">Пилинг и массаж</h4>
                <p className="mt-1.5 text-sm text-[#CFC7BC] leading-relaxed">
                  Дополнительно можно заказать спа-пилинг или массаж. Отметьте нужную
                  услугу в календаре бронирования ниже.
                </p>
              </div>

              <div>
                <h4 className="text-base font-semibold text-white">Что включено</h4>
                <ul className="mt-1.5 space-y-1.5 text-sm text-[#CFC7BC]">
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#D89B5E] shrink-0" />
                    <span>Сухая парилка и тёплый бассейн</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-[#D89B5E] shrink-0" />
                    <span>Караоке-система и бильярдный стол</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
