import React from 'react';
import { motion } from 'framer-motion';

const EmailCapture = () => {
  return (
    <section className="bg-forest-green py-24 px-6 md:px-12">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-3xl md:text-5xl text-warm-ivory mb-6">
            Get our free Off-Grid Sri Lanka Travel Guide
          </h2>
          <p className="font-sans text-warm-ivory/80 mb-10 max-w-2xl mx-auto font-light">
            Insider secrets, secluded eco-lodges, and untouched landscapes delivered straight to your inbox.
          </p>
          
          <form className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow bg-white/10 border border-white/20 text-warm-ivory placeholder-warm-ivory/50 px-6 py-4 outline-none focus:border-muted-gold transition-colors font-sans"
              required
            />
            <button 
              type="submit" 
              className="bg-muted-gold text-white font-sans font-semibold tracking-widest text-sm uppercase px-8 py-4 hover:bg-muted-gold/90 transition-colors whitespace-nowrap"
            >
              Send Me the Guide
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  );
};

export default EmailCapture;
