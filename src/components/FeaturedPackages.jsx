import React from 'react';
import { motion } from 'framer-motion';

const packages = [
  {
    title: 'The Leopard Trail',
    duration: '7 Days / 6 Nights',
    price: '345,000 LKR',
    category: 'Wildlife Expedition',
    image: 'https://images.unsplash.com/photo-1566807810034-7338e9fc7b7f?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Cloud Forest Retreat',
    duration: '5 Days / 4 Nights',
    price: '280,000 LKR',
    category: 'Wellness Retreat',
    image: 'https://images.unsplash.com/photo-1586227740560-8cf2732c1531?auto=format&fit=crop&w=800&q=80',
  },
  {
    title: 'Ancient Kingdoms Explorer',
    duration: '10 Days / 9 Nights',
    price: '420,000 LKR',
    category: 'Cultural Immersion',
    image: 'https://images.unsplash.com/photo-1549474149-16c8e312a0ce?auto=format&fit=crop&w=800&q=80',
  }
];

const FeaturedPackages = () => {
  return (
    <section className="py-24 bg-white px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div
          className="mb-16 text-center md:text-left"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h2 className="font-serif text-4xl md:text-5xl text-forest-green mb-4">Our Signature Experiences</h2>
          <p className="font-sans text-charcoal/70 max-w-2xl text-lg">
            Our signature itineraries unveil Sri Lanka in its most exquisite form — timeless, immersive, and quietly luxurious.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {packages.map((pkg, index) => (
            <motion.div
              key={index}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
            >
              <div className="overflow-hidden relative h-96 mb-6">
                <div className="absolute top-4 left-4 z-10 bg-warm-ivory text-forest-green font-sans text-xs tracking-widest font-semibold uppercase px-3 py-1 shadow-md">
                  {pkg.category}
                </div>
                <img
                  src={pkg.image}
                  alt={pkg.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
              <h3 className="font-serif text-3xl text-charcoal mb-2 group-hover:text-muted-gold transition-colors">{pkg.title}</h3>
              <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
                <span className="font-sans text-sm text-charcoal/60 tracking-wider uppercase font-medium">{pkg.duration}</span>
                <span className="font-sans text-sm font-semibold text-forest-green">From {pkg.price}</span>
              </div>
              <button className="font-sans text-sm font-semibold tracking-widest uppercase text-charcoal hover:text-muted-gold transition-colors flex items-center">
                View Package <span className="ml-2">→</span>
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedPackages;
