import React, { useEffect } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import CategoryCardRow from './components/CategoryCardRow';
import FeaturedPackages from './components/FeaturedPackages';
import WhyCeylonWay from './components/WhyCeylonWay';
import Testimonials from './components/Testimonials';
import EmailCapture from './components/EmailCapture';
import Footer from './components/Footer';
import FloatingWhatsApp from './components/FloatingWhatsApp';

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.08,
      smoothWheel: true
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return (
    <div className="font-sans bg-warm-ivory text-charcoal min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <CategoryCardRow />
        <FeaturedPackages />
        <WhyCeylonWay />
        <Testimonials />
        <EmailCapture />
      </main>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

export default App;
