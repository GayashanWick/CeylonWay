import React, { useState } from 'react';
import { Minus, Plus, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { 
  accommodationOptions, 
  calculateTotal, 
  formatCurrency 
} from '../utils/pricingUtils';
import { WHATSAPP_NUMBER } from '../config/constants';

const ItineraryBuilder = ({ pkg }) => {
  const [groupSize, setGroupSize] = useState(2);
  const [currency, setCurrency] = useState('USD');
  const [accId, setAccId] = useState('shared');
  
  // Use durationOptions if available, else fallback to base duration
  const durations = pkg.durationOptions?.length > 0 ? pkg.durationOptions : [pkg.duration];
  const [duration, setDuration] = useState(durations[0]);
  
  const [selectedAddOns, setSelectedAddOns] = useState({});

  // Real-time calculation logic
  const selectedAddOnsTotalLKR = pkg.addOns?.reduce((total, addon) => {
    return total + (selectedAddOns[addon.name] ? addon.priceLKR : 0);
  }, 0) || 0;

  const { perPersonTotal, subtotal } = calculateTotal({
    basePriceLKR: pkg.priceFrom || 0,
    groupSize,
    accommodationId: accId,
    selectedAddOnsTotalLKR
  });

  const accPriceLKR = accommodationOptions.find(o => o.id === accId)?.priceLKR || 0;

  const handleWhatsApp = () => {
    const addonsList = pkg.addOns?.filter(a => selectedAddOns[a.name]).map(a => a.name).join(', ') || 'None';
    const message = `Hi Ceylon Way! I'm interested in ${pkg.title}. Details: ${groupSize} people, ${duration}, ${accommodationOptions.find(o => o.id === accId).label}, Add-ons: ${addonsList}. Estimated total: ${formatCurrency(subtotal, currency)}. Please get in touch.`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const handleEmail = () => {
    const addonsList = pkg.addOns?.filter(a => selectedAddOns[a.name]).map(a => a.name).join(', ') || 'None';
    const subject = `Ceylon Way Enquiry — ${pkg.title}`;
    const body = `Hi Ceylon Way!\n\nI'm interested in the ${pkg.title} package.\n\nDetails:\n- Group Size: ${groupSize} people\n- Duration: ${duration}\n- Accommodation: ${accommodationOptions.find(o => o.id === accId).label}\n- Add-ons: ${addonsList}\n\nEstimated Total: ${formatCurrency(subtotal, currency)}\n\nPlease get in touch with more details on availability or how to proceed.\n\nThank you!`;
    window.open(`mailto:hello@ceylonway.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`);
  };

  return (
    <section id="builder" className="py-24 bg-warm-ivory px-6 md:px-12 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-4xl md:text-5xl text-forest-green mb-16 text-center">Customise Your Experience</h2>
        
        <div className="flex flex-col lg:flex-row gap-16">
          {/* LEFT SIDE CONTROLS */}
          <div className="lg:w-2/3 space-y-12">
            
            {/* Currency Toggle */}
            <div className="flex items-center justify-between border-b border-gray-200 pb-4">
              <h3 className="font-sans font-semibold text-charcoal tracking-wide">Currency Display</h3>
              <div className="flex bg-gray-100 p-1 rounded-sm">
                <button 
                  onClick={() => setCurrency('USD')}
                  className={`px-4 py-1 text-sm font-semibold transition-colors rounded-sm ${currency === 'USD' ? 'bg-white shadow-sm text-charcoal' : 'text-charcoal/50'}`}
                >
                  USD
                </button>
                <button 
                  onClick={() => setCurrency('LKR')}
                  className={`px-4 py-1 text-sm font-semibold transition-colors rounded-sm ${currency === 'LKR' ? 'bg-white shadow-sm text-charcoal' : 'text-charcoal/50'}`}
                >
                  LKR
                </button>
              </div>
            </div>

            {/* Group Size */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-sans text-xl font-medium text-charcoal mb-1">Group Size</h3>
                <p className="font-sans text-sm text-charcoal/60">How many people are travelling?</p>
              </div>
              <div className="flex items-center border border-gray-300 rounded-sm">
                <button 
                  onClick={() => setGroupSize(Math.max(1, groupSize - 1))}
                  className="px-4 py-3 text-charcoal hover:bg-gray-50 transition-colors"
                >
                  <Minus size={18} />
                </button>
                <div className="w-12 text-center font-sans font-semibold text-lg">{groupSize}</div>
                <button 
                  onClick={() => setGroupSize(Math.min(15, groupSize + 1))}
                  className="px-4 py-3 text-charcoal hover:bg-gray-50 transition-colors"
                >
                  <Plus size={18} />
                </button>
              </div>
            </div>

            {/* Duration Selector */}
            {durations.length > 1 && (
              <div>
                <h3 className="font-sans text-xl font-medium text-charcoal mb-4">Duration Options</h3>
                <div className="flex flex-wrap gap-4">
                  {durations.map((dur) => (
                    <button
                      key={dur}
                      onClick={() => setDuration(dur)}
                      className={`px-6 py-3 border rounded-sm font-sans text-sm font-semibold transition-all ${
                        duration === dur ? 'border-muted-gold bg-muted-gold/5 text-muted-gold' : 'border-gray-200 text-charcoal/70 hover:border-gray-300'
                      }`}
                    >
                      {dur}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Accommodation */}
            <div>
              <h3 className="font-sans text-xl font-medium text-charcoal mb-4">Accommodation Standard</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {accommodationOptions.map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setAccId(opt.id)}
                    className={`p-6 border text-left rounded-sm transition-all focus:outline-none ${
                      accId === opt.id ? 'border-muted-gold bg-muted-gold/5 shadow-sm' : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <h4 className={`font-sans font-semibold mb-2 ${accId === opt.id ? 'text-charcoal' : 'text-charcoal/80'}`}>{opt.label}</h4>
                    <p className={`font-sans text-sm ${accId === opt.id ? 'text-muted-gold font-medium' : 'text-charcoal/60'}`}>
                      {opt.priceUSD === 0 ? 'Included' : `+ ${formatCurrency(opt.priceLKR, currency)} / person`}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Add Ons */}
            {pkg.addOns && pkg.addOns.length > 0 && (
              <div>
                <h3 className="font-sans text-xl font-medium text-charcoal mb-4">Enhance Your Journey</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {pkg.addOns.map((addon) => (
                    <div 
                      key={addon.name}
                      onClick={() => setSelectedAddOns({...selectedAddOns, [addon.name]: !selectedAddOns[addon.name]})}
                      className={`p-4 border rounded-sm cursor-pointer transition-all flex justify-between items-center ${
                        selectedAddOns[addon.name] ? 'border-muted-gold bg-muted-gold/5' : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className={`w-5 h-5 rounded-sm border flex items-center justify-center transition-colors ${
                          selectedAddOns[addon.name] ? 'bg-muted-gold border-muted-gold text-white' : 'border-gray-300'
                        }`}>
                          {selectedAddOns[addon.name] && <Check size={14} />}
                        </div>
                        <span className={`font-sans font-medium text-sm ${selectedAddOns[addon.name] ? 'text-charcoal' : 'text-charcoal/80'}`}>
                          {addon.name}
                        </span>
                      </div>
                      <span className={`font-sans text-sm ${selectedAddOns[addon.name] ? 'text-muted-gold font-semibold' : 'text-charcoal/60'}`}>
                        + {formatCurrency(addon.priceLKR, currency)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* RIGHT SIDE SUMMARY CARD */}
          <div className="lg:w-1/3">
            <div className="sticky top-32 bg-white border border-gray-100 shadow-xl p-8 rounded-sm">
              <h3 className="font-serif text-2xl text-forest-green mb-6 border-b border-gray-100 pb-4">Estimated Total</h3>
              
              <div className="space-y-4 font-sans text-sm text-charcoal/80 mb-6">
                <div className="flex justify-between">
                  <span>Base Price (Per Person)</span>
                  <span>{formatCurrency(pkg.priceFrom || 0, currency)}</span>
                </div>
                {accPriceLKR > 0 && (
                  <div className="flex justify-between">
                    <span>Accommodation Upgrade</span>
                    <span>+ {formatCurrency(accPriceLKR, currency)}</span>
                  </div>
                )}
                {pkg.addOns?.filter(a => selectedAddOns[a.name]).map(addon => (
                  <div key={addon.name} className="flex justify-between text-muted-gold">
                    <span>{addon.name}</span>
                    <span>+ {formatCurrency(addon.priceLKR, currency)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 pt-4 mb-6">
                <div className="flex justify-between font-sans text-sm font-semibold text-charcoal mb-2">
                  <span>Subtotal Per Person</span>
                  <span>{formatCurrency(perPersonTotal, currency)}</span>
                </div>
                <div className="flex justify-between font-sans text-sm text-charcoal/60 line-through decoration-gray-300">
                  <span>Group Size</span>
                  <span>× {groupSize}</span>
                </div>
              </div>

              <div className="bg-warm-ivory p-6 -mx-8 mb-8 border-y border-gray-50">
                <div className="flex flex-col items-center justify-center text-center">
                  <span className="font-sans text-xs tracking-widest uppercase text-charcoal/50 font-bold mb-2">Grand Total</span>
                  <motion.div 
                    key={subtotal + currency} 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="font-serif text-4xl text-forest-green mb-2"
                  >
                    {formatCurrency(subtotal, currency)}
                  </motion.div>
                  <span className="font-sans text-[10px] text-charcoal/40 uppercase tracking-wide">
                    {currency === 'USD' ? 'USD prices approximate — final invoice in LKR' : 'All taxes and fees included'}
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <button 
                  onClick={handleWhatsApp}
                  className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-sans font-semibold tracking-wider text-sm py-4 rounded-sm transition-colors flex items-center justify-center gap-2"
                >
                  Ask on WhatsApp
                </button>
                <button 
                  onClick={handleEmail}
                  className="w-full border border-forest-green text-forest-green hover:bg-forest-green hover:text-white font-sans font-semibold tracking-wider text-sm py-4 rounded-sm transition-colors flex items-center justify-center gap-2"
                >
                  Send Enquiry by Email
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ItineraryBuilder;
