import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonials = [
  {
    quote: "An absolute masterclass in luxury eco-tourism. The guides were deeply knowledgeable, and our jungle lodge felt like a private sanctuary.",
    name: "Eleanor Whitfield",
    country: "🇬🇧",
    rating: 5
  },
  {
    quote: "Ceylon Way redefines the Sri Lankan experience. The Ayurvedic wellness retreat completely rejuvenated us. Truly off-grid and exceptionally premium.",
    name: "Marcus von Berg",
    country: "🇩🇪",
    rating: 5
  },
  {
    quote: "The best travel experience of my life. The secluded locations are genuinely untouched, and the hospitality was flawless.",
    name: "James Sterling",
    country: "🇦🇺",
    rating: 5
  },
  {
    quote: "Perfect balance of adventure and relaxation. Their attention to detail in the hidden journeys is simply stunning.",
    name: "Sophie Laurent",
    country: "🇫🇷",
    rating: 5
  },
  {
    quote: "Our guide showed us corners of the island no ordinary tourist ever sees. Flawless execution and worth every single penny.",
    name: "Liam O'Connor",
    country: "🇮🇪",
    rating: 5
  }
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 2) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const getVisibleTestimonials = () => {
    const first = testimonials[currentIndex];
    const second = testimonials[(currentIndex + 1) % testimonials.length];
    return [first, second];
  };

  return (
    <section className="py-24 bg-warm-ivory px-6 md:px-12 border-y border-gray-200/50 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-3xl text-center text-forest-green mb-12">Voices of our Travelers</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 min-h-[300px]">
          <AnimatePresence mode="popLayout">
            {getVisibleTestimonials().map((testimonial, index) => (
              <motion.div 
                key={`${currentIndex}-${index}`}
                className="bg-white p-10 shadow-sm border border-gray-100 h-full flex flex-col justify-between"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
              >
                <div>
                  <div className="flex mb-6 text-muted-gold">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                        <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                      </svg>
                    ))}
                  </div>
                  <p className="font-serif text-xl md:text-2xl text-charcoal mb-8 leading-snug italic">
                    "{testimonial.quote}"
                  </p>
                </div>
                <div className="flex items-center">
                  <span className="font-sans font-semibold text-sm tracking-wider uppercase text-forest-green mr-3">
                    {testimonial.name}
                  </span>
                  <span className="text-xl">{testimonial.country}</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
