import React from 'react';
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
