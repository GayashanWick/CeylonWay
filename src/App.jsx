import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PlaceholderPage from './pages/PlaceholderPage';
import StudioPage from './pages/StudioPage';
import Tours from './pages/Tours';

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
    <BrowserRouter>
      <Routes>
        <Route path="/studio/*" element={<StudioPage />} />
        
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="tours" element={<Tours />} />
          <Route path="tours/:slug" element={<PlaceholderPage title="Tour Package" />} />
          <Route path="wellness" element={<PlaceholderPage title="Spa & Wellness" />} />
          <Route path="gear" element={<PlaceholderPage title="Gear Rental & Shop" />} />
          <Route path="blog" element={<PlaceholderPage title="Blog" />} />
          <Route path="about" element={<PlaceholderPage title="About Us" />} />
          <Route path="contact" element={<PlaceholderPage title="Contact Us" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
