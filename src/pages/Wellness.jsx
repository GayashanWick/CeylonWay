import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { client } from '../sanity/client';
import { Leaf, User, Trees, VolumeX } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../config/constants';

const Wellness = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 400]);

  useEffect(() => {
    const fetchWellness = async () => {
      try {
        window.scrollTo(0, 0);
        const query = `*[_type == "package" && category == "wellness"]{
          title, "slug": slug.current, duration, groupSize, priceFrom, shortDescription, highlights,
          "imageUrl": images[0].asset->url
        }`;
        const data = await client.fetch(query);
        setPackages(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchWellness();
  }, []);

  return (
    <div className="bg-warm-ivory min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-screen w-full overflow-hidden flex items-center justify-center text-center">
        <motion.div 
          style={{ y: heroY }} 
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 15, ease: "linear", repeat: Infinity, repeatType: "reverse" }}
        >
          <img src="/wellness-hero.png" alt="Ayurvedic Wellness Retreat" className="w-full h-full object-cover" />
        </motion.div>
        
        <div className="absolute inset-0 bg-charcoal/40" />
        
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <div className="inline-block text-muted-gold font-sans text-xs tracking-[0.3em] uppercase mb-6 drop-shadow-sm font-semibold">
              Spa & Wellness
            </div>
            <h1 className="font-serif text-6xl md:text-8xl text-warm-ivory mb-6 leading-tight drop-shadow-md">Restore. Rebalance.<br />Return.</h1>
            <p className="font-sans text-lg md:text-xl text-warm-ivory/90 max-w-2xl mx-auto leading-relaxed mb-10 drop-shadow-md">
              Ancient Ayurvedic wisdom meets the healing silence of Sri Lanka's wilderness
            </p>
            <button 
              onClick={() => document.getElementById('retreats').scrollIntoView({ behavior: 'smooth' })} 
              className="px-10 py-4 bg-muted-gold text-white font-sans font-semibold tracking-widest text-sm uppercase rounded-sm hover:bg-muted-gold/90 transition-colors shadow-sm"
            >
              Explore Retreats
            </button>
          </motion.div>
        </div>
      </section>

      {/* 2. PHILOSOPHY SECTION */}
      <section className="py-32 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <h2 className="font-serif text-3xl md:text-4xl text-forest-green italic leading-snug border-l-2 border-muted-gold pl-8">
              "True wellness is not a treatment. It is a return to yourself — guided by nature, rooted in Ceylon's ancient healing traditions."
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.9, ease: "easeInOut", delay: 0.2 }}
            className="space-y-6 font-sans text-lg text-charcoal/80 leading-relaxed"
          >
            <p>At Ceylon Way, wellness is not a service — it is the entire experience. Every retreat is designed around the restorative power of Sri Lanka's landscapes, from misty hill country forests to ancient herbal gardens.</p>
            <p>We work exclusively with certified Ayurvedic practitioners and experienced yoga guides, combining traditional treatments with immersive nature experiences that city spas simply cannot replicate.</p>
            <p>Our retreats are intentionally small — never more than 10 guests — so that every experience feels personal, unhurried, and genuinely transformative.</p>
          </motion.div>
        </div>
      </section>

      {/* 3. CATEGORIES STRIP */}
      <section className="py-16 px-6 md:px-12 border-y border-gray-200 bg-white">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Leaf, title: 'Ayurvedic Treatments', desc: 'Traditional healing rituals dating back 3,000 years' },
            { icon: User, title: 'Yoga & Meditation', desc: 'Daily practice in open-air jungle pavilions' },
            { icon: Trees, title: 'Forest Bathing', desc: 'Guided Shinrin-yoku sessions in ancient rainforests' },
            { icon: VolumeX, title: 'Silent Retreats', desc: 'Full digital detox experiences in remote hill country' }
          ].map((cat, i) => (
            <motion.div 
              key={i}
              className="p-8 border border-muted-gold/30 bg-warm-ivory/50 rounded-sm hover:-translate-y-2 transition-transform duration-500 ease-out flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.9, delay: i * 0.15, ease: "easeInOut" }}
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm border border-gray-100">
                <cat.icon size={20} className="text-muted-gold" />
              </div>
              <h3 className="font-serif text-xl text-charcoal mb-3">{cat.title}</h3>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed">{cat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. PACKAGES GRID */}
      <section id="retreats" className="py-32 bg-warm-ivory px-6 md:px-12">
        <div className="max-w-7xl mx-auto border-b border-gray-200 pb-20">
          <motion.div
            className="mb-16 text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <h2 className="font-serif text-5xl text-forest-green mb-4">Our Retreat Experiences</h2>
            <p className="font-sans text-charcoal/70 max-w-2xl text-lg mx-auto">
              All retreats are limited to small groups. Early booking is strongly recommended.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="w-10 h-10 border-4 border-muted-gold border-t-transparent rounded-full animate-spin"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {packages.map((pkg, index) => (
                <motion.div
                  key={pkg.slug}
                  className="group bg-white flex flex-col shadow-sm hover:shadow-xl transition-all duration-500 ease-out border border-gray-100 h-full"
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.9, delay: index * 0.15, ease: "easeInOut" }}
                >
                  <div className="overflow-hidden relative h-80">
                    {pkg.imageUrl ? (
                      <img src={pkg.imageUrl} alt={pkg.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out" />
                    ) : (
                      <div className="w-full h-full bg-[#1B3A2D]/5 flex items-center justify-center font-sans tracking-widest text-xs uppercase text-charcoal/30">No Image Required</div>
                    )}
                  </div>
                  
                  <div className="p-10 flex flex-col flex-grow">
                    <h3 className="font-serif text-3xl text-forest-green mb-4">{pkg.title}</h3>
                    <p className="font-sans text-charcoal/70 leading-relaxed mb-8 flex-grow">{pkg.shortDescription}</p>
                    
                    {pkg.highlights && pkg.highlights.length > 0 && (
                      <div className="mb-8 p-6 bg-warm-ivory border border-gray-100">
                        <h4 className="font-sans text-xs tracking-widest uppercase font-bold text-charcoal/50 mb-4">Highlights</h4>
                        <ul className="space-y-2">
                          {pkg.highlights.map((h, i) => (
                            <li key={i} className="font-sans text-sm text-charcoal/80 flex items-start gap-3">
                              <div className="mt-1.5"><div className="w-1.5 h-1.5 rounded-full bg-muted-gold"></div></div>
                              {h}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="mt-auto">
                      <div className="flex justify-between items-center mb-6 pt-6 border-t border-gray-100">
                        <div className="flex flex-col">
                          <span className="font-sans text-sm font-semibold text-charcoal uppercase tracking-wider mb-1">{pkg.duration}</span>
                          <span className="font-sans text-xs text-charcoal/60">Max {pkg.groupSize || 'Any'} guests</span>
                        </div>
                        <div className="text-right flex flex-col">
                          <span className="font-sans text-xs text-charcoal/60 uppercase tracking-widest mb-1">From</span>
                          <span className="font-sans text-lg font-bold text-forest-green">LKR {pkg.priceFrom?.toLocaleString()}</span>
                        </div>
                      </div>
                      <Link to={`/tours/${pkg.slug}`} className="w-full inline-block text-center py-4 border border-forest-green text-forest-green font-sans text-sm font-semibold tracking-widest uppercase hover:bg-forest-green hover:text-white transition-colors">
                        View Retreat details
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 5. HOW IT WORKS */}
      <section className="py-24 px-6 md:px-12 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          >
            <h2 className="font-serif text-4xl text-forest-green mb-16">The Journey Begins Here</h2>
            
            <div className="flex flex-col md:flex-row justify-between items-center relative gap-8 md:gap-0">
              {/* Desktop Connecting Line */}
              <div className="hidden md:block absolute top-[28px] left-[15%] right-[15%] h-px bg-gray-200 z-0"></div>
              
              {[
                { step: 1, title: 'Choose your retreat', desc: 'Browse packages and select the experience that resonates' },
                { step: 2, title: 'We personalise it', desc: 'Our wellness team contacts you to understand your needs before arrival' },
                { step: 3, title: 'Arrive and let go', desc: 'Everything is prepared. Your only job is to be present.' }
              ].map((s, i) => (
                <div key={i} className="relative z-10 flex flex-col items-center max-w-[250px] bg-white px-4">
                  <div className="w-14 h-14 rounded-full border border-muted-gold text-muted-gold font-serif text-2xl flex items-center justify-center mb-6 shadow-sm bg-white">
                    {s.step}
                  </div>
                  <h3 className="font-sans text-lg font-semibold text-charcoal tracking-wide mb-3">{s.title}</h3>
                  <p className="font-sans text-sm text-charcoal/70 leading-relaxed">{s.desc}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 6. TESTIMONIALS */}
      <section className="py-32 px-6 md:px-12 bg-warm-ivory border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-4xl text-forest-green mb-16 text-center">What our guests say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { quote: "I came exhausted and left transformed. The Ayurvedic treatments combined with those forest walks did something no city spa has ever done for me.", author: "Margaret T., United Kingdom" },
              { quote: "The silence retreat was the most challenging and most rewarding three days of my life. Ceylon Way handled every detail with such care and intention.", author: "Hans W., Germany" },
              { quote: "As someone who has done wellness retreats across Bali, Thailand and India — this was something entirely different. Sri Lanka's energy is unique, and Ceylon Way knows how to unlock it.", author: "Priya M., Australia" }
            ].map((t, i) => (
              <motion.div 
                key={i}
                className="bg-white p-10 border border-muted-gold/20 shadow-sm relative flex flex-col justify-between h-full"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.9, delay: i * 0.15, ease: "easeInOut" }}
              >
                <div className="text-muted-gold/30 font-serif text-8xl absolute top-4 left-6 leading-none">"</div>
                <p className="font-sans text-lg text-charcoal/80 leading-relaxed relative z-10 mb-8 italic pt-6">
                  {t.quote}
                </p>
                <div className="mt-auto border-t border-gray-100 pt-6">
                  <p className="font-sans font-semibold text-charcoal text-sm uppercase tracking-widest mb-2">{t.author}</p>
                  <p className="text-muted-gold text-xs tracking-[0.2em]">⭐⭐⭐⭐⭐</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BOOKING ENQUIRY */}
      <section className="py-32 px-6 md:px-12 bg-[#1B3A2D] text-center">
        <motion.div
          className="max-w-3xl mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: "easeInOut" }}
        >
          <h2 className="font-serif text-5xl text-warm-ivory mb-6 leading-tight">Ready to begin?</h2>
          <p className="font-sans text-lg text-white/80 max-w-xl mx-auto mb-12">
            Retreats fill quickly. Reach out and we will guide you to the right experience.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <a 
              href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Ceylon Way, I'm interested in a wellness retreat. Please share more details.")}`} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="px-8 py-4 bg-[#25D366] text-white font-sans font-semibold tracking-widest text-sm uppercase rounded-sm hover:-translate-y-1 transition-transform"
            >
              Enquire via WhatsApp
            </a>
            <Link 
              to="/contact" 
              className="px-8 py-4 bg-transparent border border-muted-gold text-muted-gold font-sans font-semibold tracking-widest text-sm uppercase rounded-sm hover:bg-muted-gold hover:text-[#1B3A2D] transition-colors"
            >
              Send an Enquiry
            </Link>
          </div>
        </motion.div>
      </section>

    </div>
  );
};

export default Wellness;
