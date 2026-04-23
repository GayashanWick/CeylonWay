import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Tours', href: '/tours' },
    { name: 'Wellness', href: '/wellness' },
    { name: 'Gear', href: '/gear' },
    { name: 'Blog', href: '/blog' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ease-out ${
      isScrolled ? 'bg-warm-ivory/80 backdrop-blur-[12px] shadow-sm py-3' : 'bg-transparent py-6'
    }`}>
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className={`font-serif text-3xl font-bold tracking-tight ${isScrolled ? 'text-forest-green' : 'text-warm-ivory'}`}>
          Ceylon Way
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <ul className="flex space-x-8">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.href} className={`font-sans text-sm tracking-wide font-medium transition-colors hover:text-muted-gold ${
                  isScrolled ? 'text-charcoal' : 'text-warm-ivory/90'
                }`}>
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link to="/contact" className="bg-muted-gold text-white px-6 py-2.5 rounded-sm font-sans text-sm tracking-wider font-semibold hover:bg-muted-gold/90 transition-colors">
            Book Now
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          className={`md:hidden ${isScrolled ? 'text-forest-green' : 'text-warm-ivory'}`}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-warm-ivory shadow-lg border-t border-gray-100">
          <ul className="flex flex-col py-4 px-6 space-y-4">
            {navLinks.map((link) => (
              <li key={link.name}>
                <Link to={link.href} className="font-sans text-charcoal text-lg font-medium hover:text-muted-gold block" onClick={() => setMobileMenuOpen(false)}>
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="pt-4 border-t border-gray-200">
              <Link to="/contact" className="bg-muted-gold text-white px-6 py-3 rounded-sm font-sans text-center block w-full tracking-wider font-semibold hover:bg-muted-gold/90 transition-colors" onClick={() => setMobileMenuOpen(false)}>
                Book Now
              </Link>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
