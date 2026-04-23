import React from 'react';
import { motion } from 'framer-motion';

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
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-warm-ivory px-6 md:px-12 border-y border-gray-200/50">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index}
              className="bg-white p-10 shadow-sm border border-gray-100"
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className="flex mb-6 text-muted-gold">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path d="M12 17.27L18.18 21L16.54 13.97L22 9.24L14.81 8.63L12 2L9.19 8.63L2 9.24L7.46 13.97L5.82 21L12 17.27Z" />
                  </svg>
                ))}
              </div>
              <p className="font-serif text-xl md:text-2xl text-charcoal mb-8 leading-snug style-italic">
                "{testimonial.quote}"
              </p>
              <div className="flex items-center">
                <span className="font-sans font-semibold text-sm tracking-wider uppercase text-forest-green mr-3">
                  {testimonial.name}
                </span>
                <span className="text-xl">{testimonial.country}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
