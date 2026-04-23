import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { client } from '../sanity/client';
import { PortableText } from '@portabletext/react';
import { ChevronDown, Check, X } from 'lucide-react';
import ItineraryBuilder from '../components/ItineraryBuilder';
import { WHATSAPP_NUMBER } from '../config/constants';

const TourDetail = () => {
  const { slug } = useParams();
  const [pkg, setPkg] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPkgs, setRelatedPkgs] = useState([]);
  
  const [activeDay, setActiveDay] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 250]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        window.scrollTo(0, 0);
        
        const query = `*[_type == "package" && slug.current == $slug][0]{
          ...,
          "imageUrl": images[0].asset->url,
          "allImages": images[].asset->url
        }`;
        const data = await client.fetch(query, { slug });
        
        if (!data) throw new Error("Package not found");
        setPkg(data);
        
        const relatedQuery = `*[_type == "package" && category == $cat && slug.current != $slug][0...3]{
          title, "slug": slug.current, category, duration, priceFrom, "imageUrl": images[0].asset->url
        }`;
        const related = await client.fetch(relatedQuery, { cat: data.category, slug });
        setRelatedPkgs(related);
        
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [slug]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-warm-ivory">
        <div className="w-12 h-12 border-4 border-muted-gold border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !pkg) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-warm-ivory py-32 px-6">
        <div className="text-center max-w-2xl">
          <h1 className="font-serif text-4xl text-forest-green mb-4">Package Not Found</h1>
          <p className="font-sans text-charcoal/70 mb-8">{error}</p>
          <Link to="/tours" className="inline-block px-8 py-3 bg-muted-gold text-white font-sans font-semibold tracking-widest text-sm uppercase rounded-sm hover:bg-muted-gold/90 transition-colors">
            Return to All Tours
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-warm-ivory min-h-screen pt-20">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[70vh] md:h-[80vh] w-full overflow-hidden flex items-end">
        <motion.div style={{ y: heroY }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          {pkg.imageUrl ? (
            <img src={pkg.imageUrl} alt={pkg.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-forest-green/90" />
          )}
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 md:px-12 pb-16 md:pb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block bg-muted-gold/90 text-white font-sans text-xs tracking-widest font-semibold uppercase px-4 py-1.5 mb-6 rounded-sm shadow-sm">
              {pkg.category?.replace('-', ' ')}
            </div>
            <h1 className="font-serif text-5xl md:text-7xl text-white mb-6 leading-tight max-w-4xl shadow-sm">{pkg.title}</h1>
            
            <div className="flex flex-wrap items-center gap-6 text-white/90 font-sans tracking-wide text-sm md:text-base">
              <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-muted-gold rounded-full"></span> {pkg.duration}</span>
              {pkg.groupSize && <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-muted-gold rounded-full"></span> Max {pkg.groupSize} Guests</span>}
              {pkg.difficulty && <span className="flex items-center gap-2"><span className="w-1.5 h-1.5 bg-muted-gold rounded-full"></span> {pkg.difficulty}</span>}
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. STICKY OVERVIEW BAR */}
      <div className="sticky top-20 z-40 bg-warm-ivory border-b border-gray-200 shadow-sm hidden md:block">
        <div className="max-w-7xl mx-auto px-12 py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <h2 className="font-serif text-xl text-charcoal font-semibold">{pkg.title}</h2>
            <div className="h-6 w-px bg-gray-300"></div>
            <span className="font-sans text-sm text-charcoal/80">From <span className="font-bold text-forest-green">LKR {pkg.priceFrom?.toLocaleString()}</span></span>
          </div>
          <div className="flex gap-4">
            <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noopener noreferrer" className="px-6 py-2 border border-[#25D366] text-[#25D366] hover:bg-[#25D366] hover:text-white font-sans text-sm tracking-wider font-semibold rounded-sm transition-colors">
              Ask on WhatsApp
            </a>
            <button onClick={() => document.getElementById('builder').scrollIntoView({ behavior: 'smooth' })} className="px-6 py-2 bg-muted-gold text-white hover:bg-muted-gold/90 font-sans text-sm tracking-wider font-semibold rounded-sm transition-colors shadow-sm">
              Customise & Book
            </button>
          </div>
        </div>
      </div>

      {/* 3. ABOUT & HIGHLIGHTS */}
      <section className="py-24 px-6 md:px-12 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          <div className="lg:col-span-2">
            <h2 className="font-serif text-4xl text-forest-green mb-8">About this experience</h2>
            <div className="prose prose-lg prose-headings:font-serif prose-headings:text-charcoal prose-p:font-sans prose-p:text-charcoal/80 max-w-none">
              {pkg.fullDescription ? (
                <PortableText value={pkg.fullDescription} />
              ) : (
                <p className="font-sans text-lg text-charcoal/70 leading-relaxed">{pkg.shortDescription}</p>
              )}
            </div>
          </div>
          
          <div className="lg:col-span-1 space-y-10">
            {pkg.highlights && pkg.highlights.length > 0 && (
              <div>
                <h3 className="font-sans text-xs tracking-widest uppercase font-bold text-charcoal/50 mb-6">Experience Highlights</h3>
                <ul className="space-y-4">
                  {pkg.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="mt-1 bg-muted-gold/10 p-1 rounded-full"><Check size={14} className="text-muted-gold" /></div>
                      <span className="font-sans text-charcoal/80 font-medium">{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            <div className="bg-white p-8 border border-gray-100 shadow-sm rounded-sm">
              <h3 className="font-sans text-xs tracking-widest uppercase font-bold text-charcoal/50 mb-6">Logistics</h3>
              <ul className="space-y-4 font-sans text-sm">
                <li className="flex justify-between border-b border-gray-50 pb-3"><span className="text-charcoal/60">Duration</span><span className="font-semibold text-charcoal">{pkg.duration}</span></li>
                <li className="flex justify-between border-b border-gray-50 pb-3"><span className="text-charcoal/60">Group Size</span><span className="font-semibold text-charcoal">Up to {pkg.groupSize || 'Any'}</span></li>
                {pkg.difficulty && <li className="flex justify-between border-b border-gray-50 pb-3"><span className="text-charcoal/60">Difficulty</span><span className="font-semibold text-charcoal">{pkg.difficulty}</span></li>}
                {pkg.languages && <li className="flex justify-between border-b border-gray-50 pb-3"><span className="text-charcoal/60">Languages</span><span className="font-semibold text-charcoal">{pkg.languages}</span></li>}
                {pkg.departsFrom && <li className="flex justify-between pb-3"><span className="text-charcoal/60">Departs From</span><span className="font-semibold text-charcoal">{pkg.departsFrom}</span></li>}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 4. ITINERARY ACCORDION */}
      {pkg.itinerary && pkg.itinerary.length > 0 && (
        <section className="py-24 bg-white px-6 md:px-12 border-t border-gray-100">
          <div className="max-w-4xl mx-auto">
            <h2 className="font-serif text-4xl text-forest-green mb-12 text-center">Day by Day Itinerary</h2>
            <div className="space-y-4">
              {pkg.itinerary.map((day, i) => (
                <div key={day.dayNumber || i} className="border border-gray-200 rounded-sm overflow-hidden transition-all bg-warm-ivory/30">
                  <button 
                    onClick={() => setActiveDay(activeDay === i ? null : i)}
                    className="w-full flex justify-between items-center p-6 bg-white hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-6">
                      <div className="font-sans font-bold text-muted-gold tracking-widest text-sm uppercase min-w-[70px] text-left">
                        Day {day.dayNumber}
                      </div>
                      <h3 className="font-serif text-xl text-charcoal text-left">{day.title}</h3>
                    </div>
                    <motion.div animate={{ rotate: activeDay === i ? 180 : 0 }}>
                      <ChevronDown size={20} className="text-charcoal/50" />
                    </motion.div>
                  </button>
                  <AnimatePresence>
                    {activeDay === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="p-6 pt-2 pb-8 pl-28 border-t border-gray-100 font-sans text-charcoal/70 leading-relaxed text-base">
                          {day.description}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* INCLUSIONS & EXCLUSIONS */}
      {(pkg.inclusions?.length > 0 || pkg.exclusions?.length > 0) && (
        <section className="py-24 bg-warm-ivory px-6 md:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              {pkg.inclusions?.length > 0 && (
                <div className="bg-white p-10 border border-gray-100">
                  <h3 className="font-serif text-2xl text-forest-green mb-8 flex items-center gap-3"><Check className="text-green-600" /> What's Included</h3>
                  <ul className="space-y-4">
                    {pkg.inclusions.map((item, i) => (
                      <li key={i} className="font-sans text-charcoal/80 flex items-start gap-4">
                        <div className="mt-1.5"><div className="w-1.5 h-1.5 rounded-full bg-green-500"></div></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {pkg.exclusions?.length > 0 && (
                <div className="bg-white p-10 border border-gray-100">
                  <h3 className="font-serif text-2xl text-charcoal mb-8 flex items-center gap-3"><X className="text-red-500" /> What's Not Included</h3>
                  <ul className="space-y-4">
                    {pkg.exclusions.map((item, i) => (
                      <li key={i} className="font-sans text-charcoal/80 flex items-start gap-4">
                        <div className="mt-1.5"><div className="w-1.5 h-1.5 rounded-full bg-red-400"></div></div>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* 5. ITINERARY BUILDER */}
      <ItineraryBuilder pkg={pkg} />

      {/* 6. PHOTO GALLERY */}
      {pkg.allImages && pkg.allImages.length > 1 && (
        <section className="py-24 bg-white px-6 md:px-12">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-4xl text-forest-green mb-12 text-center">Gallery</h2>
            <div className="columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4">
              {pkg.allImages.map((src, i) => (
                <motion.div 
                  key={i} 
                  className="break-inside-avoid overflow-hidden rounded-sm cursor-pointer relative group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: (i % 3) * 0.1 }}
                  onClick={() => setLightboxIndex(i)}
                >
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors z-10" />
                  <img src={src} alt={`Gallery ${i}`} className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700" />
                </motion.div>
              ))}
            </div>
          </div>
          
          {/* Lightbox */}
          <AnimatePresence>
            {lightboxIndex !== null && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 bg-charcoal/95 flex items-center justify-center p-4 backdrop-blur-sm"
              >
                <button onClick={() => setLightboxIndex(null)} className="absolute top-8 right-8 text-white/50 hover:text-white"><X size={40} /></button>
                <img src={pkg.allImages[lightboxIndex]} alt="Expanded" className="max-w-full max-h-[90vh] object-contain shadow-2xl" />
              </motion.div>
            )}
          </AnimatePresence>
        </section>
      )}

      {/* 8. RELATED PACKAGES STRIP */}
      {relatedPkgs.length > 0 && (
        <section className="py-24 bg-warm-ivory px-6 md:px-12 border-t border-gray-100">
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-4xl text-forest-green mb-12">You might also like</h2>
            <div className="flex overflow-x-auto md:grid md:grid-cols-3 gap-8 pb-8 md:pb-0 snap-x">
               {relatedPkgs.map((rel, index) => (
                  <motion.div
                    key={rel.slug}
                    className="group bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col min-w-[300px] snap-center"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
                  >
                    <div className="overflow-hidden relative h-64">
                      {rel.imageUrl ? (
                        <img src={rel.imageUrl} alt={rel.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out" />
                      ) : (
                        <div className="w-full h-full bg-forest-green/10 flex items-center justify-center text-forest-green/30 font-sans tracking-widest text-sm uppercase">No Image</div>
                      )}
                    </div>
                    <div className="p-6 flex-grow flex flex-col border border-t-0 border-gray-100">
                      <h3 className="font-serif text-2xl text-charcoal mb-4 line-clamp-2">{rel.title}</h3>
                      <div className="mt-auto">
                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-50">
                          <span className="font-sans text-xs text-charcoal/60 uppercase">{rel.duration}</span>
                          <span className="font-sans text-sm font-semibold text-forest-green">From LKR {rel.priceFrom?.toLocaleString()}</span>
                        </div>
                        <Link to={`/tours/${rel.slug}`} className="font-sans text-xs font-bold tracking-widest uppercase text-charcoal hover:text-muted-gold transition-colors flex items-center">
                          View details <span className="ml-2">→</span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
};

export default TourDetail;
