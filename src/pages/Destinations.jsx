import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { client } from '../sanity/client';
import { WHATSAPP_NUMBER } from '../config/constants';

const DifficultyDots = ({ level }) => {
  const label = level === 1 ? 'Easy' : level === 2 ? 'Moderate' : 'Challenging';
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-1.5">
        {[1, 2, 3].map(dot => (
          <span key={dot} className={`w-2.5 h-2.5 rounded-full ${dot <= level ? 'bg-forest-green shadow-sm' : 'border border-forest-green/30'}`} />
        ))}
      </div>
      <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-charcoal/60">{label}</span>
    </div>
  );
};

const Destinations = () => {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeMapPin, setActiveMapPin] = useState(null);

  const { scrollY } = useScroll();
  const heroY1 = useTransform(scrollY, [0, 800], [0, 200]);
  const heroY2 = useTransform(scrollY, [0, 800], [0, 100]);

  useEffect(() => {
    const fetchDests = async () => {
      window.scrollTo(0, 0);
      try {
        const query = `*[_type == "destination"] | order(orderNumber asc) {
          orderNumber, name, slug, regionName, description, highlights, bestTimeToVisit, difficultyLevel,
          "imageUrl": mainImage.asset->url
        }`;
        const data = await client.fetch(query);
        setDestinations(data);
        if (data.length > 0) setActiveMapPin(data[0].slug.current);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchDests();
  }, []);

  return (
    <div className="bg-warm-ivory min-h-screen pt-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[70vh] w-full overflow-hidden flex items-end pb-24 pt-32 bg-[#1B3A2D]">
        
        {/* Parallax Layers */}
        <motion.div style={{ y: heroY1 }} className="absolute inset-x-0 -top-[20%] h-[140%] opacity-40 mix-blend-multiply bg-[url('https://images.unsplash.com/photo-1586861516773-6771e84d41fa?q=80&w=2000')] bg-cover bg-center" />
        <motion.div style={{ y: heroY2 }} className="absolute inset-x-0 -top-[10%] h-[120%] opacity-30 mix-blend-overlay bg-[url('https://images.unsplash.com/photo-1547820641-fcfdd37f0970?q=80&w=2000')] bg-cover bg-center" />
        
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent z-0" />
        
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: "easeOut" }} className="max-w-4xl">
            <div className="inline-block text-muted-gold font-sans text-[10px] tracking-widest font-bold uppercase mb-6 px-4 py-1.5 border border-muted-gold/40 rounded-sm">
              Where We Go
            </div>
            <h1 className="font-serif text-5xl md:text-7xl text-white leading-[1.1] drop-shadow-2xl mb-6 relative inline-block">
               Ceylon's Most <span className="relative inline-block">
                  Extraordinary
                  <motion.span 
                     initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.8, duration: 1, ease: "anticipate" }}
                     className="absolute -bottom-2 left-0 right-0 h-1 bg-muted-gold origin-left rounded-full" 
                  />
               </span> Places.
            </h1>
            <p className="font-sans text-lg md:text-xl text-white/80 leading-relaxed max-w-2xl mt-8 shadow-sm">
               Each destination we work in has been chosen for one reason — it changes people. Here's where we'll take you.
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. INTRO PARAGRAPH */}
      <section className="py-24 px-6 bg-warm-ivory">
         <motion.div 
            initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8 }} 
            className="max-w-[680px] mx-auto text-center"
         >
            <p className="font-serif text-2xl md:text-[28px] text-charcoal/90 leading-[1.7] italic">
               "Sri Lanka is a small island. You can drive from coast to coast in four hours. But within that space exists a staggering range of landscapes — ancient rainforests, misty mountain plateaus, wildlife-rich plains, and coastlines that have barely changed in a century. We know these places intimately. We've walked every trail, camped in every zone, and built relationships with the communities inside them. This is where we take you."
            </p>
         </motion.div>
      </section>

      {/* 3. DESTINATIONS LISTING */}
      <section className="bg-white border-t border-gray-100 flex flex-col">
         {loading ? (
            <div className="py-40 flex justify-center"><div className="w-12 h-12 border-4 border-muted-gold border-t-transparent rounded-full animate-spin"></div></div>
         ) : (
            destinations.map((dest, i) => {
               const isEven = i % 2 === 0;
               const displayNumber = (i + 1).toString().padStart(2, '0');

               return (
                  <div key={dest.slug.current} className="relative border-b border-gray-100">
                     <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} w-full`}>
                        
                        {/* IMAGE SIDE */}
                        <div className="w-full md:w-1/2 h-[500px] md:h-[700px] relative overflow-hidden group">
                           <motion.div 
                              initial={{ x: isEven ? -50 : 50, opacity: 0 }} 
                              whileInView={{ x: 0, opacity: 1 }} 
                              viewport={{ once: true, margin: "-100px" }} 
                              transition={{ duration: 0.8, ease: "easeOut" }}
                              className="w-full h-full"
                           >
                              {dest.imageUrl ? (
                                 <img src={dest.imageUrl} alt={dest.name} className="w-full h-full object-cover transform scale-105 group-hover:scale-100 transition-transform duration-1000" />
                              ) : (
                                 <div className="w-full h-full bg-[#1B3A2D]/10 flex items-center justify-center font-sans tracking-widest text-xs uppercase text-charcoal/30">Placeholder</div>
                              )}
                              {/* Hover Overlay */}
                              <div className="absolute inset-0 bg-forest-green/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                              
                              {/* Region Badge */}
                              <div className="absolute bottom-6 left-6 z-10 bg-charcoal/80 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10 shadow-lg">
                                 <span className="font-sans text-[10px] text-white font-bold tracking-widest uppercase">{dest.regionName}</span>
                              </div>
                           </motion.div>
                        </div>

                        {/* CONTENT SIDE */}
                        <div className="w-full md:w-1/2 flex items-center relative py-16 md:py-0">
                           {/* Background Decorative Number */}
                           <div className={`absolute top-10 ${isEven ? 'right-10 text-right' : 'left-10 text-left'} text-[150px] md:text-[250px] font-serif leading-none text-muted-gold/10 select-none z-0`}>
                              {displayNumber}
                           </div>

                           <motion.div 
                              initial={{ opacity: 0, y: 30 }} 
                              whileInView={{ opacity: 1, y: 0 }} 
                              viewport={{ once: true, margin: "-100px" }} 
                              transition={{ duration: 0.8, delay: 0.2 }}
                              className="relative z-10 px-8 md:px-16 lg:px-24 w-full flex flex-col items-start"
                           >
                              <span className="font-sans text-[10px] uppercase tracking-widest font-bold text-muted-gold mb-3">{dest.regionName}</span>
                              <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-forest-green mb-8 leading-[1.1]">{dest.name}</h2>
                              
                              <p className="font-sans text-[17px] text-charcoal/80 leading-[1.8] mb-10">
                                 {dest.description}
                              </p>

                              {/* Highlights Pills */}
                              {dest.highlights && (
                                 <div className="flex flex-wrap gap-2 mb-10">
                                    {dest.highlights.map(h => (
                                       <span key={h} className="px-3 py-1.5 border border-muted-gold/50 rounded-sm font-sans text-[10px] uppercase tracking-wider font-semibold text-charcoal/70 bg-warm-ivory/30 shadow-sm">
                                          {h}
                                       </span>
                                    ))}
                                 </div>
                              )}

                              <div className="w-full flex flex-col md:flex-row gap-6 justify-between items-start md:items-center py-6 border-y border-gray-100 mb-10">
                                 <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full bg-forest-green/10 flex items-center justify-center text-forest-green">
                                       <CalendarDays size={16} />
                                    </div>
                                    <div className="flex flex-col">
                                       <span className="font-sans text-[10px] uppercase font-bold tracking-widest text-charcoal/40">Best Visited</span>
                                       <span className="font-sans text-sm text-charcoal font-medium">{dest.bestTimeToVisit}</span>
                                    </div>
                                 </div>

                                 <div className="hidden md:block w-px h-10 bg-gray-200" />

                                 <div className="flex items-center gap-3">
                                    <DifficultyDots level={dest.difficultyLevel} />
                                 </div>
                              </div>

                              <Link to={`/tours?destination=${dest.slug.current}`} className="group inline-flex items-center gap-2 font-sans text-xs uppercase tracking-widest font-bold text-muted-gold hover:text-forest-green transition-colors">
                                 View Packages Here <ArrowRight size={16} className="transform group-hover:translate-x-1 transition-transform" />
                              </Link>
                           </motion.div>
                        </div>

                     </div>
                  </div>
               )
            })
         )}
      </section>

      {/* 4. INTERACTIVE MAP SECTION */}
      <section className="py-24 px-6 md:px-12 bg-warm-ivory">
         <div className="max-w-[1400px] mx-auto">
            <div className="text-center mb-12">
               <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">Where in Sri Lanka?</h2>
               <p className="font-sans text-lg text-charcoal/70">All eight destinations mapped — get a sense of distance and geography before you plan.</p>
            </div>

            {/* Map Pills Navigation */}
            <div className="flex flex-wrap justify-center gap-3 mb-10 max-w-4xl mx-auto">
               {destinations.map(dest => (
                  <button 
                     key={dest.slug.current}
                     onClick={() => setActiveMapPin(dest.slug.current)}
                     className={`px-5 py-2.5 rounded-full font-sans text-xs uppercase tracking-wider font-semibold border transition-all ${
                        activeMapPin === dest.slug.current ? 'bg-muted-gold border-muted-gold text-white shadow-md transform -translate-y-0.5' : 'bg-white border-gray-200 text-charcoal/60 hover:border-gray-300 shadow-sm'
                     }`}
                  >
                     {dest.name}
                  </button>
               ))}
            </div>

            {/* Iframe Base */}
            <div className="w-full h-[350px] md:h-[500px] rounded-sm overflow-hidden border border-muted-gold shadow-xl bg-white p-2 mb-6">
               <iframe 
                  src="https://maps.google.com/maps?q=7.8731,80.7718&t=&z=8&ie=UTF8&iwloc=&output=embed" 
                  width="100%" height="100%" style={{ border: 0, filter: 'contrast(1.05) saturate(1.2)' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
               ></iframe>
            </div>

            <p className="font-serif text-center italic text-lg text-charcoal/60">
               "All destinations are reachable from Colombo within 2–6 hours by road. We handle all transport logistics — you just arrive."
            </p>
         </div>
      </section>

      {/* 5. CTA SECTION */}
      <section className="py-24 px-6 text-center bg-[#1B3A2D] border-t border-white/10">
         <div className="max-w-3xl mx-auto">
            <h2 className="font-serif text-4xl md:text-5xl text-warm-ivory mb-6">Not sure which destination is right for you?</h2>
            <p className="font-sans text-lg text-warm-ivory/70 mb-12 max-w-xl mx-auto">
               Tell us how long you have, what you're looking for, and we'll match you with the right place and the right experience.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
               <Link to="/tours" className="px-8 py-4 bg-muted-gold text-white font-sans font-semibold tracking-widest text-sm uppercase rounded-sm hover:bg-muted-gold/90 transition-colors shadow-lg">
                  Browse All Packages
               </Link>
               <a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent("Hi Ceylon Way! I'd like help choosing the right destination for my trip.")}`} target="_blank" rel="noreferrer" className="px-8 py-4 bg-transparent border border-warm-ivory text-warm-ivory font-sans font-semibold tracking-widest text-sm uppercase rounded-sm hover:bg-warm-ivory hover:text-[#1B3A2D] transition-colors shadow-lg">
                  Ask Us Directly
               </a>
            </div>
         </div>
      </section>

    </div>
  );
};

export default Destinations;
