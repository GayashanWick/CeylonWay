import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import heroBg from '../assets/hero-bg.png';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [mobileMenuOpen]);

  const handleNavClick = (e, href) => {
    if (location.pathname === href) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      setMobileMenuOpen(false);
    } else {
      setMobileMenuOpen(false);
    }
  };

  const baseNavLinks = [
    { name: 'Tours', href: '/tours' },
    { name: 'Destinations', href: '/destinations' },
    { name: 'Wellness', href: '/wellness' },
    { name: 'Gear', href: '/gear' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const navLinks = location.pathname === '/' 
    ? baseNavLinks 
    : [{ name: 'Home', href: '/' }, ...baseNavLinks];

  // Specific pages have a full-screen dark image at the top (Hero). 
  // Other standard pages have a light ivory background at the very top.
  const hasDarkHero = 
    location.pathname === '/' || 
    location.pathname === '/wellness' || 
    (location.pathname.startsWith('/tours/') && location.pathname !== '/tours');

  const textColorClass = (isScrolled || !hasDarkHero) ? 'text-charcoal' : 'text-warm-ivory/90';
  const logoColorClass = (isScrolled || !hasDarkHero) ? 'text-forest-green' : 'text-warm-ivory';
  const menuIconColorClass = (isScrolled || !hasDarkHero) ? 'text-forest-green' : 'text-warm-ivory';

  return (
    <>
      <nav className={`fixed top-0 w-full z-[60] transition-all duration-300 ease-out ${
        isScrolled ? 'bg-warm-ivory/90 backdrop-blur-[12px] shadow-sm py-3' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link 
          to="/" 
          onClick={(e) => handleNavClick(e, '/')}
          className={`font-serif text-3xl font-bold tracking-tight transition-colors ${logoColorClass}`}
        >
          Ceylon Way
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link 
                  to={link.href} 
                  onClick={(e) => handleNavClick(e, link.href)}
                  className={`font-sans text-sm tracking-wide font-medium transition-colors hover:text-muted-gold ${textColorClass}`}
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/contact" className="bg-muted-gold text-white px-6 py-2.5 rounded-sm font-sans text-sm tracking-wider font-semibold hover:bg-muted-gold/90 transition-colors shadow-sm">
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`md:hidden transition-colors ${menuIconColorClass}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>
    </nav>

    {/* Cinematic Mobile Menu Overlay */}
    <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden fixed inset-0 z-[100] bg-forest-green flex flex-col"
          >
            {/* Cinematic Background */}
            <div className="absolute inset-0 z-0">
              <img src={heroBg} alt="Ceylon Way Background" className="w-full h-full object-cover brightness-[0.25]" />
              <div className="absolute inset-0 bg-forest-green/70 mix-blend-multiply" />
            </div>

            {/* Header / Close Area */}
            <div className="relative z-10 px-6 py-6 flex justify-between items-center">
              <Link 
                to="/" 
                onClick={(e) => handleNavClick(e, '/')}
                className="font-serif text-3xl font-bold tracking-tight text-warm-ivory"
              >
                Ceylon Way
              </Link>
              <button 
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 rounded-sm border border-white/20 flex items-center justify-center text-warm-ivory hover:bg-white/10 hover:border-white/40 transition-colors"
                aria-label="Close menu"
              >
                <X size={24} className="font-light" />
              </button>
            </div>

            {/* Navigation Nodes */}
            <div className="relative z-10 flex-grow flex flex-col px-8 pt-8 pb-10 overflow-y-auto">
              <ul className="flex flex-col space-y-6">
                {navLinks.map((link, i) => (
                  <motion.li 
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + (i * 0.05), duration: 0.5, ease: "easeOut" }}
                  >
                    <Link 
                      to={link.href} 
                      className="font-serif text-4xl text-warm-ivory hover:text-muted-gold transition-colors block leading-tight" 
                      onClick={(e) => handleNavClick(e, link.href)}
                    >
                      {link.name}
                    </Link>
                  </motion.li>
                ))}
              </ul>

              {/* Bottom CTA & Tagline */}
              <motion.div 
                className="mt-auto pt-12"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
              >
                <div className="h-px w-12 bg-muted-gold/50 mb-6"></div>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-warm-ivory/60 font-semibold mb-6">Unveil the timeless.</p>
                <Link 
                  to="/contact" 
                  className="inline-block bg-muted-gold text-white px-8 py-4 rounded-sm font-sans tracking-widest text-xs font-bold uppercase hover:bg-white hover:text-charcoal transition-colors shadow-lg"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Plan Your Journey
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
