import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { client } from '../sanity/client';
import { Link } from 'react-router-dom';

const Tours = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        if (!import.meta.env.VITE_SANITY_PROJECT_ID) {
          throw new Error('Sanity Project ID is missing. Please connect your CMS via the .env file!');
        }

        const query = `*[_type == "package"]{
          title, 
          "slug": slug.current, 
          category, 
          duration, 
          priceFrom, 
          shortDescription,
          "imageUrl": images[0].asset->url
        }`;
        
        const data = await client.fetch(query);
        setPackages(data);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to fetch packages from Sanity');
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  return (
    <section className="py-32 bg-warm-ivory px-6 md:px-12 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h1 className="font-serif text-5xl md:text-6xl text-forest-green mb-6">Our Expeditions</h1>
          <div className="w-16 h-0.5 bg-muted-gold mx-auto mb-8"></div>
          <p className="font-sans text-charcoal/70 max-w-2xl mx-auto text-lg leading-relaxed">
            Discover our curated selection of pristine wilderness journeys and holistic wellness retreats. 
            All our itineraries are dynamically served directly from Sanity CMS.
          </p>
        </motion.div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-12 h-12 border-4 border-muted-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : error ? (
          <div className="bg-red-50 border border-red-200 text-red-800 p-8 text-center max-w-2xl mx-auto shadow-sm">
            <h3 className="font-serif text-2xl font-bold mb-2">CMS Connection Required</h3>
            <p className="font-sans font-medium">{error}</p>
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center py-20 font-sans text-charcoal/60 bg-white shadow-sm border border-gray-100 p-10 max-w-2xl mx-auto">
            No packages found yet. Please login to the Sanity Studio and publish some tours!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {packages.map((pkg, index) => (
              <motion.div
                key={pkg.slug}
                className="group bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
              >
                <div className="overflow-hidden relative h-72">
                  <div className="absolute top-4 left-4 z-10 bg-warm-ivory text-forest-green font-sans text-xs tracking-widest font-semibold uppercase px-3 py-1 shadow-md">
                    {pkg.category}
                  </div>
                  {pkg.imageUrl ? (
                    <img
                      src={pkg.imageUrl}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full bg-forest-green/10 flex items-center justify-center text-forest-green/30 font-sans tracking-widest text-sm uppercase font-semibold">
                      No Image Set
                    </div>
                  )}
                </div>
                
                <div className="p-8 flex-grow flex flex-col">
                  <h3 className="font-serif text-3xl text-charcoal mb-4 group-hover:text-muted-gold transition-colors line-clamp-2">{pkg.title}</h3>
                  <p className="font-sans text-charcoal/70 mb-8 line-clamp-3 font-light text-sm">
                    {pkg.shortDescription}
                  </p>
                  
                  <div className="mt-auto">
                    <div className="flex justify-between items-center mb-6 border-b border-gray-100 pb-4">
                      <span className="font-sans text-xs text-charcoal/60 tracking-wider uppercase font-medium">{pkg.duration}</span>
                      <span className="font-sans text-sm font-semibold text-forest-green">LKR {pkg.priceFrom?.toLocaleString()}</span>
                    </div>
                    <Link to={`/tours/${pkg.slug}`} className="font-sans text-xs font-bold tracking-widest uppercase text-charcoal hover:text-muted-gold transition-colors flex items-center">
                      View Itinerary <span className="ml-2">→</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Tours;
