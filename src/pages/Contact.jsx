import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, ChevronDown, CheckCircle2 } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../config/constants';

const Contact = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    country: '',
    interests: [],
    dateRange: '',
    groupSize: 1,
    message: '',
    heardFrom: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const interestOptions = ['Off-Grid Tours', 'Spa & Wellness', 'Cultural Tours', 'Wildlife', 'Adventure', 'Gear Rental', 'Just Exploring'];

  const handleInterestToggle = (interest) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest) 
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate network delay for Formspree mapping
    setTimeout(() => {
       setIsSubmitting(false);
       setIsSuccess(true);
    }, 1200);

    /* 
      ACTUAL FORMSPREE LOGIC (UNCOMMENT & ADD YOUR ENDPOINT):
      
      try {
        const response = await fetch("https://formspree.io/f/YOUR_ENDPOINT_ID", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });
        if(response.ok) { setIsSuccess(true); }
      } catch (err) { console.error(err); } finally { setIsSubmitting(false); }
    */
  };

  return (
    <div className="bg-warm-ivory min-h-screen pt-20">
      
      {/* Breadcrumb */}
      <div className="hidden lg:block max-w-[1400px] mx-auto px-12 pt-8 relative z-20">
         <div className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-charcoal/40 font-bold">
            <Link to="/" className="hover:text-muted-gold transition-colors">Home</Link> <ChevronRight size={12}/>
            <span className="text-charcoal/70">Contact</span>
         </div>
      </div>

      {/* 1. HERO */}
      <section className="py-16 md:py-24 px-6 text-center">
         <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="max-w-2xl mx-auto">
            <h1 className="font-serif text-5xl md:text-6xl text-forest-green mb-6">Let's Plan Your Ceylon Way</h1>
            <p className="font-sans text-lg text-charcoal/70 leading-relaxed">
               Tell us what you're dreaming of and we'll build it. We reply to every enquiry within 24 hours.
            </p>
         </motion.div>
      </section>

      {/* 2. MAIN CONTENT (FORM + DETAILS) */}
      <section className="px-6 md:px-12 pb-24">
         <div className="max-w-[1400px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
            
            {/* LEFT - FORM */}
            <div className="w-full lg:w-[60%] bg-white p-8 md:p-12 border border-gray-100 shadow-sm rounded-sm relative overflow-hidden">
               
               <AnimatePresence mode="wait">
                  {!isSuccess ? (
                     <motion.div key="form" initial={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }} transition={{ duration: 0.3 }}>
                        <h2 className="font-serif text-3xl text-charcoal mb-8 border-b border-gray-100 pb-4">Send us a message</h2>
                        
                        <form onSubmit={handleSubmit} className="space-y-6">
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="flex flex-col space-y-2">
                                 <label className="font-sans text-xs font-bold uppercase tracking-widest text-charcoal/70">Full Name *</label>
                                 <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-muted-gold focus:bg-white transition-colors" />
                              </div>
                              <div className="flex flex-col space-y-2">
                                 <label className="font-sans text-xs font-bold uppercase tracking-widest text-charcoal/70">Email Address *</label>
                                 <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-muted-gold focus:bg-white transition-colors" />
                              </div>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="flex flex-col space-y-2">
                                 <label className="font-sans text-xs font-bold uppercase tracking-widest text-charcoal/70">WhatsApp / Phone</label>
                                 <input type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-muted-gold focus:bg-white transition-colors" />
                              </div>
                              <div className="flex flex-col space-y-2">
                                 <label className="font-sans text-xs font-bold uppercase tracking-widest text-charcoal/70">Country of Origin *</label>
                                 <input type="text" required value={formData.country} onChange={e => setFormData({...formData, country: e.target.value})} className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-muted-gold focus:bg-white transition-colors" />
                              </div>
                           </div>

                           <div className="flex flex-col space-y-3 pt-2">
                              <label className="font-sans text-xs font-bold uppercase tracking-widest text-charcoal/70">What interests you most? (Select multiple)</label>
                              <div className="flex flex-wrap gap-3">
                                 {interestOptions.map(opt => (
                                    <button 
                                       key={opt} type="button" onClick={() => handleInterestToggle(opt)}
                                       className={`px-4 py-2 font-sans text-sm rounded-full border transition-all ${formData.interests.includes(opt) ? 'bg-muted-gold border-muted-gold text-white shadow-sm' : 'bg-gray-50 border-gray-200 text-charcoal/60 hover:border-gray-300'}`}
                                    >
                                       {opt}
                                    </button>
                                 ))}
                              </div>
                           </div>

                           <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                              <div className="flex flex-col space-y-2">
                                 <label className="font-sans text-xs font-bold uppercase tracking-widest text-charcoal/70">Approx. Travel Dates</label>
                                 <input type="text" placeholder="e.g. October 2026" value={formData.dateRange} onChange={e => setFormData({...formData, dateRange: e.target.value})} className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-muted-gold focus:bg-white transition-colors" />
                              </div>
                              <div className="flex flex-col space-y-2">
                                 <label className="font-sans text-xs font-bold uppercase tracking-widest text-charcoal/70">Group Size *</label>
                                 <input type="number" min="1" required value={formData.groupSize} onChange={e => setFormData({...formData, groupSize: e.target.value})} className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-muted-gold focus:bg-white transition-colors" />
                              </div>
                           </div>

                           <div className="flex flex-col space-y-2 pt-2">
                              <label className="font-sans text-xs font-bold uppercase tracking-widest text-charcoal/70">Message / Tell us more *</label>
                              <textarea rows="4" required placeholder="How long are you staying? Do you have any specific requests?" value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-muted-gold focus:bg-white transition-colors resize-y"></textarea>
                           </div>

                           <div className="flex flex-col space-y-2 pt-2">
                              <label className="font-sans text-xs font-bold uppercase tracking-widest text-charcoal/70">How did you hear about us?</label>
                              <select value={formData.heardFrom} onChange={e => setFormData({...formData, heardFrom: e.target.value})} className="px-4 py-3 bg-gray-50 border border-gray-200 rounded-sm focus:outline-none focus:border-muted-gold focus:bg-white transition-colors font-sans text-sm text-charcoal/80">
                                 <option value="">Select an option</option>
                                 <option value="Google">Google Search</option>
                                 <option value="Instagram">Instagram</option>
                                 <option value="Facebook">Facebook</option>
                                 <option value="Friend">Friend or Family</option>
                                 <option value="TripAdvisor">TripAdvisor</option>
                                 <option value="Other">Other</option>
                              </select>
                           </div>

                           <button type="submit" disabled={isSubmitting} className="w-full mt-4 bg-forest-green text-white font-sans font-semibold tracking-widest text-sm uppercase py-4 rounded-sm hover:bg-muted-gold hover:shadow-md transition-all flex justify-center items-center gap-2">
                              {isSubmitting ? ( <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div> ) : 'Send My Enquiry'}
                           </button>

                           <p className="font-sans text-[10px] uppercase tracking-widest text-center text-charcoal/40 mt-4">* Indicates required field. We respect your privacy and never spam.</p>

                        </form>
                     </motion.div>
                  ) : (
                     <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="h-full flex flex-col items-center justify-center text-center py-20">
                        <div className="w-16 h-16 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mb-6">
                           <CheckCircle2 size={32} />
                        </div>
                        <h2 className="font-serif text-3xl text-forest-green mb-4">Thank you — your message is on its way! 🌿</h2>
                        <p className="font-sans text-[17px] text-charcoal/70 leading-relaxed mb-8 max-w-md">
                           We'll be in touch within 24 hours. In the meantime, feel free to explore our packages or reach us instantly on WhatsApp.
                        </p>
                        <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 bg-[#25D366] text-white px-8 py-3 rounded-sm font-sans font-bold tracking-widest text-sm uppercase shadow-sm hover:shadow-md transition-all">
                           <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                           Message Us Now
                        </a>
                     </motion.div>
                  )}
               </AnimatePresence>

            </div>

            {/* RIGHT - DETAILS & MAP */}
            <div className="w-full lg:w-[40%] flex flex-col gap-8">
               
               {/* Details Card */}
               <div className="bg-warm-ivory p-10 border border-muted-gold shadow-md rounded-sm">
                  
                  <div className="mb-8">
                     <h3 className="font-serif text-2xl text-charcoal mb-4">Get in touch directly</h3>
                     <a href={`https://wa.me/${WHATSAPP_NUMBER}`} target="_blank" rel="noreferrer" className="w-full inline-flex justify-center items-center gap-2 bg-[#25D366] text-white px-6 py-3 rounded-sm font-sans font-bold tracking-widest text-sm uppercase shadow-sm hover:shadow-md transition-all">
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                        Chat on WhatsApp
                     </a>
                     <p className="font-sans text-[10px] text-charcoal/50 uppercase tracking-widest font-bold mt-2 text-center">Typically replies within 2 hours</p>
                  </div>

                  <ul className="space-y-6 border-b border-muted-gold/30 pb-8 mb-8">
                     <li className="flex flex-col">
                        <span className="font-sans text-xs uppercase tracking-widest font-bold text-muted-gold mb-1">Email</span>
                        <a href="mailto:hello@ceylonway.com" className="font-sans text-charcoal hover:text-muted-gold transition-colors font-semibold">hello@ceylonway.com</a>
                        <span className="font-sans text-xs text-charcoal/50 mt-1">For detailed enquiries and itinerary requests</span>
                     </li>
                     <li className="flex flex-col">
                        <span className="font-sans text-xs uppercase tracking-widest font-bold text-muted-gold mb-1">Phone</span>
                        <a href="tel:+94784236507" className="font-sans text-charcoal hover:text-muted-gold transition-colors font-semibold">+94 78 423 6507</a>
                        <span className="font-sans text-xs text-charcoal/50 mt-1">Available daily 8AM – 7PM (GMT+5:30)</span>
                     </li>
                     <li className="flex flex-col">
                        <span className="font-sans text-xs uppercase tracking-widest font-bold text-muted-gold mb-1">Location</span>
                        <span className="font-sans text-charcoal leading-relaxed font-semibold">Kalagedihena, Gampaha,<br/>Western Province, Sri Lanka</span>
                        <span className="font-sans text-xs text-charcoal/50 mt-1">45 minutes from Colombo Airport</span>
                     </li>
                  </ul>

                  <p className="font-sans text-[13px] text-charcoal/70 leading-relaxed text-center italic mb-6">Prefer to plan in person? We welcome visits to our base by appointment.</p>
                  
                  {/* Socials Placeholder */}
                  <div className="flex justify-center gap-4">
                     {['Insta', 'FB', 'YT', 'TripA'].map((net, i) => (
                        <div key={i} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center font-sans text-[10px] font-bold text-charcoal/40 hover:border-muted-gold hover:text-muted-gold transition-colors cursor-pointer">
                           {net}
                        </div>
                     ))}
                  </div>

               </div>

               {/* Smaller Map Embed */}
               <div className="w-full h-[280px] rounded-sm overflow-hidden border border-muted-gold shadow-md bg-white p-1">
                  <iframe 
                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15838.256037748892!2d80.0715367610058!3d7.116709848574349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2fd0bb7ecab29%3A0xe54b8109bf336cc7!2sKalagedihena!5e0!3m2!1sen!2slk!4v1713800000000!5m2!1sen!2slk" 
                     width="100%" height="100%" style={{ border: 0, filter: 'contrast(1.1) opacity(0.9)' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
               </div>

            </div>
         </div>
      </section>

      {/* 3. FAQ ACCORDION */}
      <section className="py-24 px-6 bg-white border-t border-gray-100">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-serif text-4xl text-charcoal text-center mb-12">Common Questions</h2>
          <div className="space-y-4">
            {[
              { q: "How quickly do you respond to enquiries?", a: "We respond to all WhatsApp messages within 2 hours during operating hours (8AM–7PM daily). Email enquiries are answered within 24 hours. For urgent bookings, WhatsApp is always fastest." },
              { q: "Do you offer private group bookings?", a: "Yes — all our experiences can be arranged as fully private group experiences for families, couples, or corporate retreats. Private groups receive a fully customised itinerary." },
              { q: "Can you arrange airport transfers?", a: "Absolutely. We offer door-to-door transfers from Bandaranaike International Airport to any starting point in Sri Lanka. This can be added to any package." },
              { q: "What is your cancellation policy?", a: "We offer full refunds for cancellations made 14 days or more before departure. Cancellations within 7–14 days receive a 50% refund. Within 7 days, we offer a rebooking credit valid for 12 months." },
              { q: "Do you cater for dietary requirements?", a: "Yes — all dietary requirements including vegetarian, vegan, gluten-free, and Ayurvedic Sattvic diet can be accommodated with advance notice. Please mention this in your enquiry." }
            ].map((faq, i) => (
              <div key={i} className="border border-gray-200 rounded-sm overflow-hidden bg-warm-ivory/30 shadow-sm relative">
                <div className="absolute top-0 left-0 w-1 h-full bg-muted-gold opacity-0 transition-opacity" style={{ opacity: activeFaq === i ? 1 : 0 }} />
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full flex justify-between items-center p-6 text-left hover:bg-white transition-colors"
                >
                  <span className={`font-sans font-semibold transition-colors ${activeFaq === i ? 'text-forest-green' : 'text-charcoal'}`}>{faq.q}</span>
                  <motion.div animate={{ rotate: activeFaq === i ? 180 : 0 }} transition={{ duration: 0.2 }}><ChevronDown size={20} className={activeFaq === i ? 'text-muted-gold' : 'text-charcoal/30'} /></motion.div>
                </button>
                <AnimatePresence>
                  {activeFaq === i && (
                    <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
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

    </div>
  );
};

export default Contact;
