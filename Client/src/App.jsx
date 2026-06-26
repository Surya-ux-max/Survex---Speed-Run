import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero/Hero';
import BentoGrid from './components/BentoGrid/BentoGrid';
import Pricing from './components/Pricing/Pricing';
import Testimonials from './components/Testimonials';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      {/* Sticky header */}
      <Navbar />

      <main>
        {/* Hero with 3D canvas pipeline scene */}
        <Hero />

        {/* Features specifications (Bento Grid / Accordion) */}
        <BentoGrid />

        {/* Pricing REPL calculator */}
        <Pricing />

        {/* Social proof / testimonials */}
        <Testimonials />
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}
