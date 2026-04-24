import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { client } from '../sanity/client';
import { Link } from 'react-router-dom';
import { SlidersHorizontal, ChevronDown, Check, X } from 'lucide-react';

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
  
  const [isFilterDropdownOpen, setIsFilterDropdownOpen] = useState(false);
  const [isSortDropdownOpen, setIsSortDropdownOpen] = useState(false);
  
  const filterRef = useRef(null);
  const sortRef = useRef(null);

  const SORT_OPTIONS = [
    { label: 'Most Popular', value: 'popular' },
    { label: 'Price: Low to High', value: 'price-low' },
    { label: 'Price: High to Low', value: 'price-high' },
    { label: 'Newest', value: 'newest' }
  ];

  const currentSortLabel = SORT_OPTIONS.find(opt => opt.value === sortOption)?.label || 'Most Popular';

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        setIsFilterDropdownOpen(false);
      }
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setIsSortDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
            {/* Custom Filtering and Sorting Row */}
            <div className="mb-12 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 relative z-20">
              
              {/* FILTER DROPDOWN */}
              <div className="relative w-full sm:w-auto" ref={filterRef}>
                <button 
                  onClick={() => {
                    setIsFilterDropdownOpen(!isFilterDropdownOpen);
                    setIsSortDropdownOpen(false);
                  }}
                  className={`w-full sm:w-auto flex items-center justify-between sm:justify-start gap-4 px-5 py-3 border transition-colors ${
                    isFilterDropdownOpen 
                      ? 'border-charcoal bg-white text-charcoal shadow-sm' 
                      : selectedCategories.length > 0 
                        ? 'border-charcoal bg-white text-charcoal'
                        : 'border-gray-200 bg-transparent text-charcoal hover:border-charcoal'
                  }`}
                >
                  <span className="font-sans text-xs uppercase tracking-widest font-semibold flex items-center gap-2">
                    <SlidersHorizontal size={14} />
                    Filter by Experience 
                    {selectedCategories.length > 0 && (
                      <span className="w-5 h-5 rounded-full bg-muted-gold text-white flex items-center justify-center text-[10px] ml-1">{selectedCategories.length}</span>
                    )}
                  </span>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${isFilterDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isFilterDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full left-0 right-0 sm:right-auto mt-2 w-full sm:w-72 bg-white border border-gray-100 shadow-xl z-50 py-2"
                    >
                      <div className="px-5 py-3 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
                        <span className="font-sans text-[10px] uppercase tracking-widest text-charcoal/50 font-bold">Select Categories</span>
                        {selectedCategories.length > 0 && (
                          <button 
                            onClick={() => setSelectedCategories([])}
                            className="font-sans text-[10px] uppercase tracking-widest text-muted-gold hover:text-charcoal transition-colors font-bold"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                      <div className="max-h-[300px] overflow-y-auto py-2 scrollbar-thin scrollbar-thumb-gray-200">
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
                              className="w-full flex items-center justify-between px-5 py-3 hover:bg-warm-ivory transition-colors text-left group"
                            >
                              <span className={`font-sans text-xs uppercase tracking-widest transition-colors ${isSelected ? 'text-charcoal font-bold' : 'text-charcoal/70 group-hover:text-charcoal'}`}>
                                {cat.label}
                              </span>
                              <div className={`w-4 h-4 border flex items-center justify-center transition-colors ${isSelected ? 'border-muted-gold bg-muted-gold text-white' : 'border-gray-300 text-transparent group-hover:border-charcoal'}`}>
                                <Check size={12} strokeWidth={3} />
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* SORT DROPDOWN */}
              <div className="relative w-full sm:w-auto" ref={sortRef}>
                <button 
                  onClick={() => {
                    setIsSortDropdownOpen(!isSortDropdownOpen);
                    setIsFilterDropdownOpen(false);
                  }}
                  className={`w-full sm:w-auto flex items-center justify-between sm:justify-start gap-4 px-5 py-3 border transition-colors ${
                    isSortDropdownOpen 
                      ? 'border-charcoal bg-white text-charcoal shadow-sm' 
                      : 'border-gray-200 bg-transparent text-charcoal hover:border-charcoal'
                  }`}
                >
                  <span className="font-sans text-xs uppercase tracking-widest font-semibold flex items-center">
                    <span className="text-charcoal/50 mr-2">Sort By:</span>
                    {currentSortLabel}
                  </span>
                  <ChevronDown size={14} className={`transition-transform duration-300 ${isSortDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                <AnimatePresence>
                  {isSortDropdownOpen && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 10 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 left-0 sm:left-auto mt-2 w-full sm:w-56 bg-white border border-gray-100 shadow-xl z-50 py-2"
                    >
                      {SORT_OPTIONS.map(opt => {
                        const isSelected = sortOption === opt.value;
                        return (
                          <button
                            key={opt.value}
                            onClick={() => {
                              setSortOption(opt.value);
                              setIsSortDropdownOpen(false);
                            }}
                            className="w-full flex items-center justify-between px-5 py-3 hover:bg-warm-ivory transition-colors text-left group"
                          >
                            <span className={`font-sans text-xs uppercase tracking-widest transition-colors ${isSelected ? 'text-charcoal font-bold' : 'text-charcoal/70 group-hover:text-charcoal'}`}>
                              {opt.label}
                            </span>
                            {isSelected && <Check size={14} className="text-muted-gold" strokeWidth={3} />}
                          </button>
                        );
                      })}
                    </motion.div>
                  )}
                </AnimatePresence>
               </div>
            </div>

            {/* Active Filters Display & Summary */}
            {selectedCategories.length > 0 && (
              <div className="mb-10 flex flex-wrap items-center gap-3">
                {selectedCategories.map(catValue => {
                  const catLabel = CATEGORY_MAP.find(c => c.value === catValue)?.label;
                  return (
                    <motion.span 
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      key={catValue} 
                      className="inline-flex items-center gap-2 pl-3 pr-2 py-1.5 bg-white border border-gray-200 shadow-sm text-charcoal font-sans text-[10px] uppercase tracking-widest font-bold"
                    >
                      {catLabel}
                      <button 
                        onClick={() => setSelectedCategories(selectedCategories.filter(c => c !== catValue))}
                        className="w-4 h-4 flex items-center justify-center text-charcoal/40 hover:text-charcoal hover:bg-gray-100 transition-colors rounded-sm"
                      >
                        <X size={12} strokeWidth={3} />
                      </button>
                    </motion.span>
                  );
                })}
                <button 
                  onClick={() => setSelectedCategories([])}
                  className="font-sans text-[10px] uppercase tracking-widest text-charcoal/50 hover:text-charcoal transition-colors font-bold ml-2 underline decoration-gray-300 underline-offset-4 hover:decoration-charcoal"
                >
                  Clear All Filters
                </button>
              </div>
            )}

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
                <Link to={`/tours/${pkg.slug}`} className="block overflow-hidden relative h-72 cursor-pointer">
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
                </Link>
                
                <div className="p-8 flex-grow flex flex-col">
                  <Link to={`/tours/${pkg.slug}`}>
                    <h3 className="font-serif text-3xl text-charcoal mb-4 group-hover:text-muted-gold transition-colors line-clamp-2">{pkg.title}</h3>
                  </Link>
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
