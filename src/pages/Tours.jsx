import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { client } from '../sanity/client';
import { Link } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown } from 'lucide-react';

const CATEGORY_MAP = [
  { label: 'Off-Grid', value: 'off-grid' },
  { label: 'Cultural', value: 'cultural' },
  { label: 'Wellness', value: 'wellness' },
  { label: 'Adventure', value: 'adventure' },
  { label: 'Beach / Coastal', value: 'beach-coastal' },
  { label: 'Wildlife', value: 'wildlife' },
  { label: 'Day Trip', value: 'day-trip' }
];

const Tours = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [selectedCategories, setSelectedCategories] = useState([]);
  const [sortOption, setSortOption] = useState('popular');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

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
          featured,
          _createdAt,
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

  const filteredAndSortedPackages = packages
    .filter(pkg => {
      if (selectedCategories.length === 0) return true;
      return selectedCategories.includes(pkg.category);
    })
    .sort((a, b) => {
      if (sortOption === 'price-low') return (a.priceFrom || 0) - (b.priceFrom || 0);
      if (sortOption === 'price-high') return (b.priceFrom || 0) - (a.priceFrom || 0);
      if (sortOption === 'newest') return new Date(b._createdAt || 0) - new Date(a._createdAt || 0);
      // Default: Popular (Featured first, then newest)
      if (a.featured !== b.featured) return a.featured ? -1 : 1;
      return new Date(b._createdAt || 0) - new Date(a._createdAt || 0);
    });

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
          <>
            {/* Filtering and Sorting Row */}
            <div className="mb-12">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-gray-200 pb-6">
                
                {/* Desktop Categories */}
                <div className="hidden md:flex flex-wrap gap-2">
                  {CATEGORY_MAP.map(cat => {
                    const isSelected = selectedCategories.includes(cat.value);
                    return (
                      <button
                        key={cat.value}
                        onClick={() => {
                          setSelectedCategories(prev => 
                            prev.includes(cat.value) 
                              ? prev.filter(c => c !== cat.value)
                              : [...prev, cat.value]
                          );
                        }}
                        className={`px-4 py-2 text-xs tracking-widest uppercase font-semibold border transition-all duration-300 ${
                          isSelected 
                            ? 'bg-charcoal text-white border-charcoal' 
                            : 'bg-transparent text-charcoal/60 border-gray-200 hover:border-charcoal hover:text-charcoal'
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </div>

                {/* Mobile Filter Toggle */}
                <div className="w-full md:hidden flex justify-between items-center">
                  <button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    className="flex items-center gap-2 text-sm font-semibold tracking-widest uppercase text-charcoal"
                  >
                    <SlidersHorizontal size={16} /> Filters {selectedCategories.length > 0 && `(${selectedCategories.length})`}
                  </button>
                </div>

                {/* Sort Dropdown */}
                <div className="relative">
                  <div className="flex items-center gap-3">
                    <span className="text-xs tracking-widest uppercase font-semibold text-charcoal/50">Sort By</span>
                    <div className="relative group">
                        <select 
                          value={sortOption}
                          onChange={(e) => setSortOption(e.target.value)}
                          className="appearance-none bg-transparent border-none text-sm font-semibold text-charcoal pr-8 focus:outline-none cursor-pointer"
                        >
                          <option value="popular">Most Popular</option>
                          <option value="price-low">Price: Low to High</option>
                          <option value="price-high">Price: High to Low</option>
                          <option value="newest">Newest</option>
                        </select>
                        <ChevronDown size={14} className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none text-charcoal/50 group-hover:text-charcoal" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Categories Drawer */}
              {isFilterOpen && (
                <motion.div 
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  className="md:hidden pt-4 pb-2 flex flex-wrap gap-2 border-b border-gray-200 mb-6"
                >
                  {CATEGORY_MAP.map(cat => {
                    const isSelected = selectedCategories.includes(cat.value);
                    return (
                      <button
                        key={cat.value}
                        onClick={() => {
                          setSelectedCategories(prev => 
                            prev.includes(cat.value) 
                              ? prev.filter(c => c !== cat.value)
                              : [...prev, cat.value]
                          );
                        }}
                        className={`px-4 py-2 text-[10px] tracking-widest uppercase font-semibold border transition-all duration-300 ${
                          isSelected 
                            ? 'bg-charcoal text-white border-charcoal' 
                            : 'bg-transparent text-charcoal/60 border-gray-200 hover:border-charcoal hover:text-charcoal'
                        }`}
                      >
                        {cat.label}
                      </button>
                    );
                  })}
                </motion.div>
              )}

              {/* Selection Summary / Clear Filters */}
              {selectedCategories.length > 0 && (
                <div className="flex justify-between items-center mt-6">
                  <span className="text-xs uppercase font-sans tracking-widest text-charcoal/50 font-semibold">
                    {filteredAndSortedPackages.length} package{filteredAndSortedPackages.length !== 1 && 's'} found
                  </span>
                  <button 
                    onClick={() => setSelectedCategories([])}
                    className="text-xs uppercase font-sans tracking-widest text-muted-gold font-bold hover:text-charcoal transition-colors shrink-0"
                  >
                    Clear Filters
                  </button>
                </div>
              )}
            </div>

            {filteredAndSortedPackages.length === 0 ? (
              <div className="text-center py-20 font-sans text-charcoal/60 bg-white/50 border border-gray-100 p-10 max-w-2xl mx-auto shadow-sm">
                No expeditions match your selected criteria. Please adjust your filters.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {filteredAndSortedPackages.map((pkg, index) => (
                  <motion.div
                    key={pkg.slug}
                className="group bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.12, ease: "easeOut" }}
              >
                <div className="overflow-hidden relative h-72">
                  <div className="absolute top-4 left-4 z-10 bg-warm-ivory text-forest-green font-sans text-[10px] tracking-widest font-bold uppercase px-3 py-1.5 shadow-md">
                    {CATEGORY_MAP.find(c => c.value === pkg.category)?.label || pkg.category}
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
        </>
        )}
      </div>
    </section>
  );
};

export default Tours;
