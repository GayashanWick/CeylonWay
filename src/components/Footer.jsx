import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Instagram = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>;
const Facebook = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>;
const Twitter = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>;
const Youtube = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon></svg>;
const Tiktok = ({ size }) => <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"></path></svg>;

const Footer = () => {
  return (
    <footer className="bg-charcoal text-warm-ivory pt-20 pb-10 px-6 md:px-12 border-t border-forest-green overflow-hidden">
      <motion.div 
        className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >

        {/* Brand */}
        <div className="md:col-span-1">
          <Link to="/" className="font-serif text-3xl font-bold tracking-tight text-warm-ivory block mb-4">
            Ceylon Way
          </Link>
          <p className="font-sans text-warm-ivory/60 text-sm leading-relaxed mb-6">
            Off-grid journeys and wellness retreats for those who seek the real island.
          </p>
          <div className="flex space-x-4 text-warm-ivory/60">
            <a href="#" className="hover:text-muted-gold transition-colors"><Instagram size={20} /></a>
            <a href="#" className="hover:text-muted-gold transition-colors"><Facebook size={20} /></a>
            <a href="#" className="hover:text-muted-gold transition-colors"><Twitter size={20} /></a>
            <a href="#" className="hover:text-muted-gold transition-colors"><Youtube size={20} /></a>
            <a href="#" className="hover:text-muted-gold transition-colors"><Tiktok size={20} /></a>
          </div>
        </div>

        {/* Links */}
        <div>
          <h4 className="font-sans font-semibold tracking-widest text-xs uppercase text-muted-gold mb-6">Experiences</h4>
          <ul className="space-y-4">
            <li><Link to="/tours" className="font-sans text-sm text-warm-ivory/70 hover:text-warm-ivory transition-colors">Off-Grid Tours</Link></li>
            <li><Link to="/wellness" className="font-sans text-sm text-warm-ivory/70 hover:text-warm-ivory transition-colors">Wellness Retreats</Link></li>
            <li><Link to="/tours" className="font-sans text-sm text-warm-ivory/70 hover:text-warm-ivory transition-colors">Cultural Trails</Link></li>
            <li><Link to="/gear" className="font-sans text-sm text-warm-ivory/70 hover:text-warm-ivory transition-colors">Camping Gear</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-sans font-semibold tracking-widest text-xs uppercase text-muted-gold mb-6">Company</h4>
          <ul className="space-y-4">
            <li><Link to="/about" className="font-sans text-sm text-warm-ivory/70 hover:text-warm-ivory transition-colors">Our Story</Link></li>
            <li><Link to="/about" className="font-sans text-sm text-warm-ivory/70 hover:text-warm-ivory transition-colors">Sustainability</Link></li>
            <li><Link to="/blog" className="font-sans text-sm text-warm-ivory/70 hover:text-warm-ivory transition-colors">Travel Blog</Link></li>
            <li><Link to="/contact" className="font-sans text-sm text-warm-ivory/70 hover:text-warm-ivory transition-colors">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-sans font-semibold tracking-widest text-xs uppercase text-muted-gold mb-6">Legal</h4>
          <ul className="space-y-4">
            <li><a href="#" className="font-sans text-sm text-warm-ivory/70 hover:text-warm-ivory transition-colors">Terms of Service</a></li>
            <li><a href="#" className="font-sans text-sm text-warm-ivory/70 hover:text-warm-ivory transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="font-sans text-sm text-warm-ivory/70 hover:text-warm-ivory transition-colors">Booking Conditions</a></li>
          </ul>
        </div>
      </motion.div>

      <motion.div 
        className="max-w-7xl mx-auto pt-8 border-t border-warm-ivory/10 flex flex-col md:flex-row justify-between items-center text-warm-ivory/50 font-sans text-xs"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7, delay: 0.12, ease: "easeOut" }}
      >
        <p>© 2026 Ceylon Way</p>
        <p className="mt-4 md:mt-0">Designed elegantly in Sri Lanka</p>
      </motion.div>
    </footer>
  );
};

export default Footer;
