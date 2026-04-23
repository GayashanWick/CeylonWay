import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Flower2, Map, Landmark } from 'lucide-react';

const CategoryCardRow = () => {
  const categories = [
    {
      title: 'Off-Grid Tours',
      description: 'Deep jungle expeditions and remote wildlife encounters away from the crowds.',
      icon: MapPin,
    },
    {
      title: 'Spa & Wellness',
      description: 'Holistic Ayurvedic healing and meditation amidst serene landscapes.',
      icon: Flower2,
    },
    {
      title: 'Cultural Trails',
      description: 'Immersive guided heritage walks exploring ancient forgotten kingdoms.',
      icon: Map,
    },
    {
      title: 'Iconic Sri Lanka',
      description: 'The definitive journey through the island’s most celebrated landscapes and timeless wonders.',
      icon: Landmark,
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } }
  };

  return (
    <section className="py-24 bg-warm-ivory px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {categories.map((category, index) => {
            const Icon = category.icon;
            return (
              <motion.div 
                key={index} 
                className="bg-white p-8 group border border-gray-100 hover:border-muted-gold/30 hover:shadow-xl transition-all duration-300"
                variants={itemVariants}
              >
                <div className="w-14 h-14 bg-forest-green/5 flex items-center justify-center rounded-sm mb-6 group-hover:bg-forest-green transition-colors duration-300">
                  <Icon size={24} className="text-forest-green group-hover:text-warm-ivory transition-colors duration-300" />
                </div>
                <h3 className="font-serif text-2xl text-charcoal mb-3">{category.title}</h3>
                <p className="font-sans text-sm text-charcoal/70 leading-relaxed mb-6 h-16">
                  {category.description}
                </p>
                <a href="#" className="font-sans text-sm font-semibold text-muted-gold tracking-wide uppercase flex items-center hover:text-forest-green transition-colors">
                  Explore <span className="ml-2">→</span>
                </a>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default CategoryCardRow;
