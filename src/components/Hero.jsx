import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import heroBg from '../assets/hero-bg.png';

const Hero = () => {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 1000], [0, 400]);

  return (
    <section className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background Image with Ken Burns Effect */}
      <motion.div
        className="absolute w-full h-[140%] -top-[20%] z-0"
        style={{ y }}
        initial={{ scale: 1 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 20, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
      >
        <img
          src={heroBg}
          alt="Sri Lanka Wilderness"
          className="w-full h-full object-cover brightness-[0.65]"
        />
        <div className="absolute inset-0 bg-forest-green/30 mix-blend-multiply"></div>
      </motion.div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
        <motion.h1
          className="font-serif text-5xl md:text-7xl lg:text-8xl text-warm-ivory mb-6 leading-tight drop-shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Ceylon, As It Was Meant To Be Found
        </motion.h1>

        <motion.p
          className="font-sans text-lg md:text-xl text-warm-ivory/90 mb-10 max-w-2xl font-light tracking-wide"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          Off-grid journeys and wellness retreats for those who seek the real island
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
        >
          <Link to="/tours" className="bg-forest-green text-warm-ivory px-8 py-3.5 border border-forest-green hover:bg-forest-green/90 transition-colors font-sans text-sm tracking-widest uppercase font-semibold">
            Explore Tours
          </Link>
          <Link to="/wellness" className="bg-transparent text-warm-ivory border-2 border-muted-gold px-8 py-3.5 hover:bg-muted-gold hover:text-white transition-colors font-sans text-sm tracking-widest uppercase font-semibold">
            View Wellness Retreats
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
