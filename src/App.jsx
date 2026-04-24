import React, { useEffect } from 'react';
import Lenis from 'lenis';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import PlaceholderPage from './pages/PlaceholderPage';
import StudioPage from './pages/StudioPage';
import Tours from './pages/Tours';
import TourDetail from './pages/TourDetail';
import Wellness from './pages/Wellness';
import Gear from './pages/Gear';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

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
          <Route path="tours/:slug" element={<TourDetail />} />
          <Route path="wellness" element={<Wellness />} />
          <Route path="gear" element={<Gear />} />
          <Route path="blog" element={<Blog />} />
          <Route path="blog/:slug" element={<BlogPost />} />
          <Route path="about" element={<PlaceholderPage title="About Us" />} />
          <Route path="contact" element={<PlaceholderPage title="Contact Us" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
