import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus, ShoppingCart, ChevronDown } from 'lucide-react';
import { client } from '../sanity/client';
import { Link } from 'react-router-dom';
import { WHATSAPP_NUMBER } from '../config/constants';

const Gear = () => {
  const [gearData, setGearData] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const [showBanner, setShowBanner] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [mode, setMode] = useState('Rent'); // Rent | Buy
  
  const [cart, setCart] = useState([]); // { item, qty }
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [rentalDays, setRentalDays] = useState(3);
  const [activeFaq, setActiveFaq] = useState(null);

  useEffect(() => {
    const fetchGear = async () => {
      try {
        window.scrollTo(0, 0);
        const query = `*[_type == "gear"]{
          _id, name, category, description, condition, rentalPricePerDay, purchasePrice, availableForRent, availableForSale,
          "imageUrl": images[0].asset->url
        }`;
        const data = await client.fetch(query);
        setGearData(data);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchGear();
  }, []);

  const categories = ['All', 'Camping', 'Water & Snorkelling', 'Photography', 'Hiking', 'Safety'];

  const filteredGear = gearData.filter(item => {
    const matchCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchMode = mode === 'Rent' ? item.availableForRent : item.availableForSale;
    return matchCategory && matchMode;
  });

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(c => c.item._id === item._id);
      if (existing) {
        return prev.map(c => c.item._id === item._id ? { ...c, qty: Math.min(5, c.qty + 1) } : c);
      }
      return [...prev, { item, qty: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateCartQty = (id, delta) => {
    setCart(prev => prev.map(c => {
      if (c.item._id === id) {
        const newQty = c.qty + delta;
        return newQty > 0 ? { ...c, qty: Math.min(5, newQty) } : null; // Remove if 0
      }
      return c;
    }).filter(Boolean));
  };

  const getConditionColor = (condition) => {
    if (condition === 'New') return 'bg-forest-green text-white';
    if (condition === 'Excellent') return 'bg-muted-gold text-white';
    return 'bg-gray-200 text-charcoal';
  };

  const calculateTotal = () => {
    return cart.reduce((total, c) => {
      const price = mode === 'Rent' ? c.item.rentalPricePerDay * rentalDays : c.item.purchasePrice;
      return total + (price * c.qty);
    }, 0);
  };

  const cartItemsCount = cart.reduce((acc, c) => acc + c.qty, 0);

  const handleWhatsApp = () => {
    const lines = cart.map(c => `[${c.item.name} x${c.qty}]`);
    const isRent = mode === 'Rent';
    const message = `Hi Ceylon Way! I'd like to enquire about gear ${isRent ? 'rental' : 'purchase'}. My list: ${lines.join(', ')}.${isRent ? ` Estimated rental period: ${rentalDays} days.` : ''} Estimated total: $${calculateTotal()}. Please confirm availability and pricing.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEmail = () => {
    const lines = cart.map(c => `- ${c.item.name} (x${c.qty})`);
    const isRent = mode === 'Rent';
    const subject = `Ceylon Way Gear ${isRent ? 'Rental' : 'Purchase'} Enquiry`;
    const body = `Hi Ceylon Way!\n\nI'd like to enquire about gear ${isRent ? 'rental' : 'purchase'}.\n\nMy list:\n${lines.join('\n')}\n\n${isRent ? `Estimated rental period: ${rentalDays} days\n` : ''}Estimated total: $${calculateTotal()}\n\nPlease confirm availability and pricing.\n\nThank you!`;
    window.open(`mailto:hello@ceylonway.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <div className="bg-warm-ivory min-h-screen pt-20 relative">
      
      {/* 0. BANNER */}
      {showBanner && (
        <div className="w-full bg-[#C9A96E] text-charcoal py-3 px-6 relative z-40 text-center text-sm font-sans font-semibold tracking-wide shadow-sm">
          🔧 This section is currently being updated. Inventory listings are for preview only — please enquire via WhatsApp for actual availability and pricing.
          <button onClick={() => setShowBanner(false)} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-black/10 rounded-full transition-colors">
            <X size={16} />
          </button>
        </div>
      )}

      {/* 1. HERO SECTION */}
      <section className="relative py-32 w-full overflow-hidden flex flex-col items-center justify-center text-center bg-[#1B3A2D]">
        <div className="absolute inset-0 bg-charcoal/10 mix-blend-multiply" style={{ backgroundImage: 'radial-gradient(circle, transparent 20%, #1B3A2D 120%)' }} />
        
        <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: "easeOut" }}>
            <div className="inline-block text-muted-gold font-sans text-xs tracking-widest uppercase mb-6 font-bold border border-muted-gold/30 px-4 py-1.5 rounded-sm">
              Gear Rental & Shop
            </div>
            <h1 className="font-serif text-5xl md:text-7xl text-warm-ivory mb-6 leading-tight">Everything You Need.<br/>Nothing You Have to Carry Home.</h1>
            <p className="font-sans text-lg text-warm-ivory/80 max-w-2xl mx-auto mb-10">
              Rent premium outdoor and adventure gear for your Ceylon Way experience — or take it home.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button 
                onClick={() => { setMode('Rent'); document.getElementById('inventory').scrollIntoView({ behavior: 'smooth' }); }}
                className="px-8 py-3 bg-muted-gold text-white font-sans font-semibold tracking-widest text-sm uppercase rounded-sm hover:bg-muted-gold/90 transition-colors"
              >
                Browse Rentals
              </button>
              <button 
                onClick={() => { setMode('Buy'); document.getElementById('inventory').scrollIntoView({ behavior: 'smooth' }); }}
                className="px-8 py-3 border border-warm-ivory text-warm-ivory font-sans font-semibold tracking-widest text-sm uppercase rounded-sm hover:bg-warm-ivory hover:text-[#1B3A2D] transition-colors"
              >
                Browse Shop
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* 2. HOW IT WORKS */}
      <section className="py-24 px-6 md:px-12 bg-warm-ivory border-b border-gray-200">
        <div className="max-w-5xl mx-auto text-center flex flex-col md:flex-row justify-between items-center relative gap-12 md:gap-0">
          <div className="hidden md:block absolute top-[24px] left-[20%] right-[20%] h-px bg-muted-gold/30 z-0"></div>
          {[
            { step: 1, title: 'Browse & select', desc: 'Add items to your gear list' },
            { step: 2, title: 'Submit enquiry', desc: 'Send your list via WhatsApp or email' },
            { step: 3, title: 'We confirm', desc: 'We check availability and arrange collection or delivery' }
          ].map((s, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              key={i} 
              className="relative z-10 flex flex-col items-center bg-warm-ivory px-4 w-[250px]"
            >
              <div className="w-12 h-12 rounded-full border border-muted-gold text-muted-gold font-sans font-bold flex items-center justify-center mb-6 bg-warm-ivory shadow-sm">
                {s.step}
              </div>
              <h3 className="font-serif text-2xl text-charcoal mb-2">{s.title}</h3>
              <p className="font-sans text-sm text-charcoal/70 leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. INVENTORY & FILTERS */}
      <section id="inventory" className="py-24 bg-white px-6 md:px-12 min-h-[600px] relative">
        <div className="max-w-7xl mx-auto">
          
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center bg-gray-50 p-4 rounded-sm border border-gray-100 mb-12 gap-6">
            <div className="flex bg-white p-1 rounded-sm border border-gray-200 shadow-sm w-full md:w-auto">
              <button 
                onClick={() => setMode('Rent')}
                className={`flex-1 md:flex-none px-8 py-2 font-sans text-sm font-bold tracking-widest uppercase transition-colors rounded-sm ${mode === 'Rent' ? 'bg-[#1B3A2D] text-white' : 'text-charcoal/50 hover:text-charcoal'}`}
              >
                Rent
              </button>
              <button 
                onClick={() => setMode('Buy')}
                className={`flex-1 md:flex-none px-8 py-2 font-sans text-sm font-bold tracking-widest uppercase transition-colors rounded-sm ${mode === 'Buy' ? 'bg-[#1B3A2D] text-white' : 'text-charcoal/50 hover:text-charcoal'}`}
              >
                Buy
              </button>
            </div>
            
            <div className="flex flex-wrap items-center gap-2 justify-center">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 font-sans text-xs tracking-wider uppercase font-semibold rounded-full border transition-colors ${
                    activeCategory === cat ? 'border-muted-gold bg-muted-gold text-white' : 'border-gray-200 text-charcoal/60 hover:border-gray-300'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          {loading ? (
             <div className="flex justify-center items-center py-20"><div className="w-10 h-10 border-4 border-muted-gold border-t-transparent rounded-full animate-spin"></div></div>
          ) : filteredGear.length === 0 ? (
             <div className="text-center py-20 text-charcoal/50 font-sans border border-dashed border-gray-200 rounded-sm">
                No items found for this configuration.
             </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredGear.map((item, i) => {
                const inCart = cart.find(c => c.item._id === item._id);
                return (
                  <motion.div 
                    key={item._id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border border-gray-100 rounded-sm shadow-sm hover:shadow-md transition-shadow bg-white flex flex-col overflow-hidden"
                  >
                    <div className="relative aspect-square bg-gray-50 flex items-center justify-center p-6">
                      <div className="absolute top-4 left-4 z-10 bg-white text-charcoal font-sans text-[10px] tracking-widest font-bold uppercase px-3 py-1 shadow-sm rounded-full">
                        {item.category}
                      </div>
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                      ) : (
                        <span className="font-sans text-xs uppercase tracking-widest text-charcoal/30">Placeholder Image</span>
                      )}
                    </div>
                    <div className="p-6 flex flex-col flex-grow border-t border-gray-100">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-serif text-xl text-charcoal">{item.name}</h3>
                      </div>
                      <p className="font-sans text-sm text-charcoal/70 mb-4 line-clamp-2 min-h-[40px]">{item.description}</p>
                      <div className="mb-4">
                        <span className={`inline-block px-2 py-0.5 rounded-sm font-sans text-[10px] uppercase tracking-wider font-bold ${getConditionColor(item.condition)}`}>
                          Condition: {item.condition}
                        </span>
                      </div>
                      
                      <div className="mt-auto pt-4 border-t border-gray-50 flex items-end justify-between">
                        <div>
                          {mode === 'Rent' ? (
                            <>
                              <div className="font-sans font-bold text-lg text-forest-green">${item.rentalPricePerDay} <span className="text-sm font-normal text-charcoal/50">/ day</span></div>
                              {item.purchasePrice && <div className="font-sans text-xs text-charcoal/50 mt-1">Buy: ${item.purchasePrice}</div>}
                            </>
                          ) : (
                            <>
                              <div className="font-sans font-bold text-lg text-forest-green">${item.purchasePrice}</div>
                              <div className="font-sans text-xs text-charcoal/50 mt-1">Rent: ${item.rentalPricePerDay} / day</div>
                            </>
                          )}
                        </div>
                        
                        {inCart ? (
                          <div className="flex items-center border border-forest-green rounded-sm overflow-hidden">
                            <button onClick={() => updateCartQty(item._id, -1)} className="p-2 bg-forest-green/10 text-forest-green hover:bg-forest-green/20"><Minus size={14} /></button>
                            <span className="px-3 font-sans font-bold text-sm text-forest-green w-8 text-center">{inCart.qty}</span>
                            <button onClick={() => updateCartQty(item._id, 1)} className="p-2 bg-forest-green/10 text-forest-green hover:bg-forest-green/20"><Plus size={14} /></button>
                          </div>
                        ) : (
                          <button 
                            onClick={() => addToCart(item)}
                            className="px-4 py-2 border border-forest-green text-forest-green font-sans font-bold text-xs uppercase tracking-wider rounded-sm hover:bg-forest-green hover:text-white transition-colors"
                          >
                            Add to List
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {/* 6. GEAR INCLUDED STRIP */}
      <section className="py-20 px-6 bg-warm-ivory text-center border-t border-gray-200">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-3xl text-forest-green mb-4">Booking a Ceylon Way tour package?</h2>
          <p className="font-sans text-charcoal/80 mb-8 text-lg">
            Most camping gear is available as an add-on directly through your package. No separate rental needed.
          </p>
          <Link to="/tours" className="inline-block px-8 py-3 bg-muted-gold text-white font-sans font-semibold tracking-widest text-sm uppercase rounded-sm hover:bg-muted-gold/90 transition-colors">
            View Tour Packages
          </Link>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl text-charcoal text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How do I collect or receive the gear?", a: "We arrange delivery to your hotel or collection from our base in Colombo. Details confirmed on enquiry." },
              { q: "What if gear is damaged during my rental?", a: "A small refundable security deposit applies to selected items. Details shared at confirmation." },
              { q: "Can I rent gear without booking a tour?", a: "Absolutely. Gear rental is available independently for any adventure in Sri Lanka." },
              { q: "How far in advance should I book?", a: "We recommend at least 3 days notice. For GoPro and tents during peak season, book 1 week ahead." }
            ].map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-sm overflow-hidden bg-warm-ivory/20">
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="font-sans font-semibold text-charcoal">{faq.q}</span>
                  <motion.div animate={{ rotate: activeFaq === i ? 180 : 0 }}><ChevronDown size={20} className="text-charcoal/50" /></motion.div>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="overflow-hidden">
                      <div className="p-6 pt-0 font-sans text-charcoal/70 leading-relaxed border-t border-gray-100/50 mt-4">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FLOATING CART BUBBLE */}
      {cartItemsCount > 0 && !isCartOpen && (
        <motion.button
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          onClick={() => setIsCartOpen(true)}
          className="fixed bottom-8 left-8 z-50 w-16 h-16 bg-forest-green text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-105 transition-transform"
        >
          <ShoppingCart size={24} />
          <span className="absolute -top-2 -right-2 w-6 h-6 bg-muted-gold text-white font-sans text-xs font-bold rounded-full flex items-center justify-center border-2 border-white">
            {cartItemsCount}
          </span>
        </motion.button>
      )}

      {/* CART DRAWER */}
      <AnimatePresence>
        {isCartOpen && (
          <React.Fragment>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="fixed inset-0 bg-charcoal/40 backdrop-blur-sm z-50"
            />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col"
            >
              <div className="p-6 border-b border-gray-100 flex justify-between items-center bg-warm-ivory">
                <h3 className="font-serif text-2xl text-forest-green flex items-center gap-3">
                  Your Gear List <span className="text-sm font-sans font-bold bg-muted-gold text-white px-2 py-0.5 rounded-full">{cartItemsCount}</span>
                </h3>
                <button onClick={() => setIsCartOpen(false)} className="text-charcoal/50 hover:text-charcoal p-2"><X size={24} /></button>
              </div>

              <div className="flex-grow overflow-y-auto p-6 space-y-6">
                {mode === 'Rent' && (
                  <div className="bg-gray-50 border border-gray-100 p-4 rounded-sm flex justify-between items-center mb-6">
                    <span className="font-sans font-semibold text-charcoal text-sm">Rental Duration</span>
                    <div className="flex items-center border border-gray-300 rounded-sm bg-white">
                       <button onClick={() => setRentalDays(Math.max(1, rentalDays - 1))} className="px-3 py-1 text-charcoal hover:bg-gray-50"><Minus size={14}/></button>
                       <span className="w-8 text-center font-sans font-bold text-sm">{rentalDays}</span>
                       <button onClick={() => setRentalDays(Math.min(14, rentalDays + 1))} className="px-3 py-1 text-charcoal hover:bg-gray-50"><Plus size={14}/></button>
                    </div>
                  </div>
                )}

                {cart.length === 0 ? (
                  <div className="text-center py-10 font-sans text-charcoal/50">Your list is empty.</div>
                ) : (
                  <div className="space-y-4">
                    {cart.map(c => (
                      <div key={c.item._id} className="flex justify-between items-start pb-4 border-b border-gray-50">
                        <div className="flex-1 pr-4">
                          <h4 className="font-sans font-semibold text-charcoal text-sm mb-1">{c.item.name}</h4>
                          <span className="font-sans text-xs text-charcoal/50 bg-gray-100 px-2 py-0.5 rounded-sm">{c.item.category}</span>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                          <span className="font-sans font-bold text-forest-green text-sm flex items-center gap-2">
                            {c.qty} × ${mode === 'Rent' ? c.item.rentalPricePerDay : c.item.purchasePrice}
                          </span>
                          <button onClick={() => updateCartQty(c.item._id, -10)} className="text-[10px] font-sans uppercase font-bold text-red-400 hover:text-red-500 underline underline-offset-2 tracking-wider">Remove</button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-gray-100 bg-gray-50">
                <div className="flex justify-between items-end mb-2">
                  <div className="flex flex-col">
                    <span className="font-sans font-semibold text-charcoal text-sm uppercase tracking-wider">Estimated Total</span>
                    {mode === 'Rent' && <span className="font-sans text-xs text-charcoal/50">For {rentalDays} days</span>}
                  </div>
                  <span className="font-sans text-3xl font-bold text-forest-green">${calculateTotal()}</span>
                </div>
                <p className="font-sans text-[10px] text-charcoal/40 uppercase tracking-widest text-center mb-6 mt-4">Final pricing confirmed on enquiry. Subject to availability.</p>
                
                <div className="space-y-3">
                  <button onClick={handleWhatsApp} disabled={cart.length === 0} className="w-full bg-[#25D366] text-white disabled:opacity-50 font-sans font-semibold tracking-wider text-sm py-4 rounded-sm transition-colors flex items-center justify-center">
                     Send Gear List via WhatsApp
                  </button>
                  <button onClick={handleEmail} disabled={cart.length === 0} className="w-full border border-forest-green text-forest-green disabled:opacity-50 disabled:border-gray-300 disabled:text-gray-400 font-sans font-semibold tracking-wider text-sm py-4 rounded-sm transition-colors flex items-center justify-center hover:bg-forest-green hover:text-white">
                     Send Gear List by Email
                  </button>
                </div>
              </div>
            </motion.div>
          </React.Fragment>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Gear;
