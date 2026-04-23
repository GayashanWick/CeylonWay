import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { client } from '../sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { Link } from 'react-router-dom';

const builder = imageUrlBuilder(client);
function urlFor(source) {
  return builder.image(source);
}

const FeaturedPackages = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const query = `*[_type == "package" && featured == true][0...3]{
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
        console.error('Error fetching featured packages:', err);
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

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

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="w-10 h-10 border-4 border-muted-gold border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : packages.length === 0 ? (
          <div className="text-center py-10 font-sans text-charcoal/50 border border-gray-100 rounded-sm bg-gray-50">
            No featured packages found. Please trigger the Node migrate script or publish tours inside the Sanity Studio.
          </div>
        ) : (
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
                    {pkg.category?.replace('-', ' ')}
                  </div>
                  {pkg.imageUrl ? (
                    <img
                      src={pkg.imageUrl}
                      alt={pkg.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                  ) : (
                    <div className="w-full h-full bg-charcoal/5 flex items-center justify-center font-sans tracking-widest uppercase text-xs text-charcoal/30">
                      No Image Set
                    </div>
                  )}
                </div>
                <h3 className="font-serif text-3xl text-charcoal mb-2 group-hover:text-muted-gold transition-colors line-clamp-1">{pkg.title}</h3>
                <div className="flex justify-between items-center mb-6 border-b border-gray-200 pb-4">
                  <span className="font-sans text-sm text-charcoal/60 tracking-wider uppercase font-medium line-clamp-1">{pkg.duration}</span>
                  <span className="font-sans text-sm font-semibold text-forest-green whitespace-nowrap ml-2">From LKR {pkg.priceFrom?.toLocaleString()}</span>
                </div>
                <Link to={`/tours/${pkg.slug}`} className="font-sans text-sm font-semibold tracking-widest uppercase text-charcoal hover:text-muted-gold transition-colors flex items-center">
                  View Package <span className="ml-2">→</span>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedPackages;
