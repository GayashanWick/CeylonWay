import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Users, Coffee } from 'lucide-react';

const WhyCeylonWay = () => {
  const reasons = [
    {
      icon: Compass,
      title: 'Local Expertise',
      description: 'Curated by insiders. We know the hidden paths that standard itineraries miss completely.'
    },
    {
      icon: Users,
      title: 'Small Groups Only',
      description: 'Intimate journeys ensuring personalized attention and a low impact on nature.'
    },
    {
      icon: Coffee,
      title: 'Zero-Compromise Comfort',
      description: 'Luxurious eco-lodges and premium glamping options for the ultimate wilderness stay.'
    }
  ];

  return (
    <section className="py-24 bg-forest-green text-warm-ivory px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="font-serif text-4xl md:text-5xl text-warm-ivory mb-4 w-full">Why Ceylon Way</h2>
          <div className="w-16 h-0.5 bg-muted-gold mx-auto mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div 
                key={index}
                className="flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="w-20 h-20 rounded-full border border-warm-ivory/20 flex items-center justify-center mb-6">
                  <Icon size={32} className="text-muted-gold" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl mb-4">{reason.title}</h3>
                <p className="font-sans text-warm-ivory/70 leading-relaxed font-light">
                  {reason.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyCeylonWay;
