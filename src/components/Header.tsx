import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { SAUNA_CONFIG } from '../data/saunaData';

const NAV_LINKS = [
  { href: '#zones', label: 'Пространство' },
  { href: '#pricing', label: 'Условия и цены' },
  { href: '#booking', label: 'Бронирование' },
  { href: '#contacts', label: 'Контакты' },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-[#F7F4EE]/95 backdrop-blur-sm border-b border-[#E3DDD2]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark */}
        <a
          href="#top"
          className="font-display text-2xl font-semibold tracking-tight text-[#171412] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9E5B24]"
        >
          {SAUNA_CONFIG.brandName}
        </a>

        {/* Zone 2: Navigation Links */}
        <nav
          aria-label="Основная навигация"
          className="hidden md:flex items-center gap-7 text-sm font-medium text-[#5A534A]"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hover:text-[#171412] hover:underline underline-offset-4 decoration-[#9E5B24] transition-colors whitespace-nowrap shrink-0 py-1 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#9E5B24]"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#booking"
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#1A1715] hover:bg-[#9E5B24] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9E5B24]"
          >
            Забронировать
          </a>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-expanded={mobileOpen}
            aria-label={mobileOpen ? 'Закрыть меню' : 'Открыть меню'}
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-lg border border-[#D9D1C5] text-[#171412] hover:bg-[#EFEAE1] transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#9E5B24]"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileOpen && (
        <div className="md:hidden border-t border-[#E3DDD2] bg-[#F7F4EE] px-4 py-4">
          <nav aria-label="Мобильное меню" className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-3 text-base font-medium text-[#171412] rounded-lg hover:bg-[#EFEAE1] transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href="#booking"
              onClick={() => setMobileOpen(false)}
              className="mt-2 inline-flex items-center justify-center px-5 py-3 text-sm font-semibold text-white bg-[#9E5B24] hover:bg-[#844A1B] rounded-lg transition-colors"
            >
              Выбрать дату в календаре
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
