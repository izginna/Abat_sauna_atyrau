/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AmenitiesBento } from './components/AmenitiesBento';
import { BookingCalendar } from './components/BookingCalendar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { LocationFooter } from './components/LocationFooter';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#F7F4EE] text-[#171412]">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AmenitiesBento />
        <BookingCalendar />
      </main>
      <LocationFooter />
    </div>
  );
}
