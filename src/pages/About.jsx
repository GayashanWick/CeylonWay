import React, { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

const CountUp = ({ end, prefix = "", suffix = "", duration = 2.5 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (isInView) {
      let startTime = null;
      let animationFrame;
      const animate = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        setCount(Math.floor(progress * end));
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        }
      };
      animationFrame = requestAnimationFrame(animate);
      return () => cancelAnimationFrame(animationFrame);
    }
  }, [isInView, end, duration]);

  return <span ref={ref}>{prefix}{count}{end > 0 && count === end ? suffix : count === 0 ? '' : ''}</span>;
};

const About = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);

  const values = [
    {
      icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 18c-3.31 0-6-2.69-6-6s2.69-6 6-6 6 2.69 6 6-2.69 6-6 6zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4z"></path></svg>,
      title: "Small Groups Only",
      text: "We cap every experience at 6–10 guests. Not for marketing reasons — because beyond that number, the forest changes. The animals disappear. The silence goes. We refuse to let that happen."
    },
    {
      icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"></path></svg>,
      title: "Born Here, Not Based Here",
      text: "Every guide, every partner, every supplier we work with is Sri Lankan. Not because it's a selling point — because they know things about this island that no outsider ever could."
    },
    {
      icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M22 12l-10-9-10 9 10 9 10-9zM12 2l8 7.2-8 7.2-8-7.2L12 2zM12 16.4l-5-4.5 5 4.5 5-4.5-5 4.5z"></path></svg>,
      title: "No Shortcuts on Comfort",
      text: "Off-grid doesn't mean uncomfortable. We obsess over the details — the quality of the sleeping gear, the food on the trail, the safety protocols. You should feel far from civilization, never far from care."
    },
    {
      icon: <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="1.5" fill="none"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"></path></svg>,
      title: "Honest Pricing Always",
      text: "We tell you exactly what's included and what isn't before you pay a single rupee. No hidden fees. No surprise upgrades. Just a clear price for a real experience."
    }
  ];

  const team = [
    {
      name: "Gayashan",
      role: "CO-FOUNDER & DIGITAL DIRECTOR",
      desc: "Architects the Ceylon Way brand online. Obsesses over user experience, marketing strategy, and the seamless digital translation of our wilderness."
    },
    {
      name: "Alex",
      role: "CO-FOUNDER & HEAD OF OPERATIONS",
      desc: "The on-ground perfectionist. Ensures every local guide, hotel transfer, and trail experience strictly aligns with our luxury standard."
    },
    {
      name: "Dilini",
      role: "WELLNESS & AYURVEDA COORDINATOR",
      desc: "Trained Ayurvedic practitioner with 8 years experience. Designs every wellness retreat itinerary personally. Speaks English, Sinhala and Tamil."
    }
  ];

  return (
    <div className="bg-warm-ivory min-h-screen pt-20">
      
      {/* Breadcrumb */}
      <div className="hidden lg:block max-w-[1400px] mx-auto px-12 pt-8 absolute z-20 top-20 left-0">
         <div className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-white/50 font-bold">
            <Link to="/" className="hover:text-muted-gold transition-colors">Home</Link> <ChevronRight size={12}/>
            <span className="text-white/80">About Us</span>
         </div>
      </div>

      {/* 1. HERO */}
      <section className="relative h-[65vh] w-full overflow-hidden flex items-end pb-24 pt-32 bg-[#1B3A2D]">
        <div className="absolute inset-0 bg-charcoal/30 mix-blend-multiply" />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 to-transparent" />
        
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9, ease: "easeOut" }} className="max-w-4xl">
            <div className="inline-block text-muted-gold font-sans text-[10px] tracking-widest font-bold uppercase mb-6 px-4 py-1.5 border border-muted-gold/40 rounded-sm">
              Our Story
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-white leading-[1.1] drop-shadow-lg">
               We didn't start a tourism company.<br className="hidden md:block"/> We started sharing what we already loved.
            </h1>
          </motion.div>
        </div>
      </section>

      {/* 2. FOUNDER STORY */}
      <section className="py-24 px-6 md:px-12 bg-white border-b border-gray-100 overflow-hidden">
         <div className="max-w-[1200px] mx-auto flex flex-col md:flex-row gap-16 md:gap-24 items-center">
            
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="w-full md:w-5/12 relative">
               <div className="absolute -inset-4 bg-muted-gold/20 rounded-tl-[80px] rounded-br-[80px] transform -rotate-3 z-0"></div>
               <div className="relative aspect-[4/5] bg-gray-100 rounded-sm shadow-md overflow-hidden z-10">
                  <div className="w-full h-full flex items-center justify-center font-sans tracking-widest text-[10px] uppercase text-charcoal/30">Portrait Placeholder</div>
               </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }} className="w-full md:w-7/12">
               <div className="prose prose-lg">
                  <p className="font-serif text-2xl text-forest-green mb-6 leading-relaxed italic">
                     "Ceylon Way was born out of shared frustration. After watching visitors arrive in Sri Lanka and leave having seen almost nothing of the real island — the same resorts, the same buses, the same templated itineraries — we decided to build something different."
                  </p>
                  <p className="font-sans text-[17px] text-charcoal/80 mb-6 leading-[1.8]">
                     Our names are Gayashan and Alex. We built Ceylon Way to connect Sri Lanka's deepest, most authentic wilderness with a standard of luxury that international travellers expect. 
                  </p>
                  <p className="font-sans text-[17px] text-charcoal/80 mb-8 leading-[1.8]">
                     While Gayashan drives the brand's digital presence, architectural systems, and international marketing strategy — Alex commands our on-ground operations, ensuring every guide, trail, and retreat physically meets our exacting standards. We keep our groups deliberately small. We curate every detail. And every experience we offer is one we would take ourselves.
                  </p>
                  <div className="flex flex-col">
                     <span className="font-serif text-4xl text-forest-green italic" style={{ fontFamily: "'Dancing Script', cursive" }}>Gayashan & Alex</span>
                     <span className="font-sans text-xs uppercase tracking-widest text-charcoal/60 font-bold mt-2">— Co-Founders, Ceylon Way</span>
                  </div>
               </div>
            </motion.div>

         </div>
      </section>

      {/* 3. VALUES */}
      <section className="py-24 px-6 md:px-12 bg-warm-ivory border-b border-gray-200">
         <div className="max-w-[1200px] mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif text-4xl md:text-5xl text-charcoal text-center mb-16">How We Do Things Differently</motion.h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
               {values.map((v, i) => (
                  <motion.div 
                     key={i}
                     initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }}
                     className="bg-white p-10 border border-gray-100 shadow-sm hover:translate-y-[-4px] hover:shadow-md transition-all rounded-sm flex flex-col items-start group"
                  >
                     <div className="w-12 h-12 rounded-full bg-warm-ivory border border-muted-gold flex items-center justify-center text-muted-gold mb-6 group-hover:bg-muted-gold group-hover:text-white transition-colors">
                        {v.icon}
                     </div>
                     <h3 className="font-serif text-2xl text-forest-green mb-4">{v.title}</h3>
                     <p className="font-sans text-sm text-charcoal/70 leading-relaxed">{v.text}</p>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* 4. NUMBERS STRIP */}
      <section className="py-20 px-6 bg-[#1B3A2D]">
         <div className="max-w-[1200px] mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-6 text-center">
            {[
               { end: 500, suffix: "+", label: "Happy Travellers" },
               { end: 40, suffix: "+", label: "Unique Experiences" },
               { end: 12, suffix: "+", label: "Partner Local Guides" },
               { end: 4.9, suffix: "★", label: "Average Guest Rating", float: true }
            ].map((stat, i) => (
               <div key={i} className="flex flex-col items-center justify-center">
                  <div className="font-serif text-5xl md:text-6xl text-muted-gold mb-3 drop-shadow-sm">
                     {stat.float ? (
                        <CountUp end={4.9} suffix="★" duration={1.5} />
                     ) : (
                        <CountUp end={stat.end} suffix={stat.suffix} duration={2} />
                     )}
                  </div>
                  <div className="font-sans text-xs uppercase tracking-widest font-bold text-warm-ivory/80">{stat.label}</div>
               </div>
            ))}
         </div>
      </section>

      {/* 5. TEAM */}
      <section className="py-24 px-6 md:px-12 bg-white">
         <div className="max-w-[1200px] mx-auto">
            <div className="text-center mb-16">
               <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-serif text-4xl md:text-5xl text-charcoal mb-4">The People Behind Your Experience</motion.h2>
               <motion.p initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="font-sans text-lg text-charcoal/70 max-w-2xl mx-auto">
                  A small team of Sri Lankans who would rather be in the forest than in an office.
               </motion.p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
               {team.map((member, i) => (
                  <motion.div 
                     key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.2 }}
                     className="flex flex-col items-center text-center group"
                  >
                     <div className="w-48 h-48 rounded-full bg-gray-50 border-4 border-warm-ivory shadow-lg overflow-hidden mb-6 flex items-center justify-center group-hover:border-muted-gold transition-colors">
                         <span className="font-sans text-[10px] tracking-widest text-charcoal/30 uppercase text-center px-4">
                           {member.name === 'Alex' ? 'Portrait Coming Soon' : 'Photo'}
                         </span>
                     </div>
                     <h3 className="font-serif text-3xl text-forest-green mb-1">{member.name}</h3>
                     <h4 className="font-sans text-[10px] font-bold uppercase tracking-widest text-muted-gold mb-4">{member.role}</h4>
                     <p className="font-sans text-sm text-charcoal/70 leading-relaxed max-w-xs">{member.desc}</p>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

      {/* 6. OUR HOME - LOCATION */}
      <section className="py-24 px-6 md:px-12 bg-warm-ivory border-t border-gray-200">
         <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
            
            <div className="w-full lg:w-1/2">
               <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                  <h2 className="font-serif text-4xl md:text-5xl text-charcoal mb-4">Where We're Based</h2>
                  <p className="font-serif text-xl text-forest-green italic mb-8">We operate from the heart of Sri Lanka — close to the forests, far from the tourist trail.</p>
                  
                  <div className="prose prose-lg mb-10">
                     <p className="font-sans text-[17px] text-charcoal/80 leading-[1.8] mb-6">
                        Ceylon Way is based in Kalagedihena, Gampaha — a quiet town in Sri Lanka's Western Province, surrounded by rubber estates and ancient forest reserves. We're 45 minutes from Colombo Bandaranaike International Airport, making us one of the most accessible starting points for off-grid adventures anywhere in Sri Lanka.
                     </p>
                     <p className="font-sans text-[17px] text-charcoal/80 leading-[1.8]">
                        Our base is where your journey begins — gear pickup, pre-departure briefings, and post-trip conversations over a cup of proper Ceylon tea all happen here.
                     </p>
                  </div>

                  <div className="flex flex-wrap gap-4">
                     <div className="px-4 py-2 bg-white border border-gray-200 rounded-full font-sans text-xs font-semibold text-charcoal shadow-sm flex items-center gap-2">
                        📍 Kalagedihena, Sri Lanka
                     </div>
                     <div className="px-4 py-2 bg-white border border-gray-200 rounded-full font-sans text-xs font-semibold text-charcoal shadow-sm flex items-center gap-2">
                        ✈️ 45 min from BIA Airport
                     </div>
                     <div className="px-4 py-2 bg-white border border-gray-200 rounded-full font-sans text-xs font-semibold text-charcoal shadow-sm flex items-center gap-2">
                        🕐 Open daily 8AM – 7PM
                     </div>
                  </div>
               </motion.div>
            </div>

            <div className="w-full lg:w-1/2">
               <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="w-full h-[350px] lg:h-[450px] rounded-sm overflow-hidden border border-muted-gold shadow-lg bg-white relative p-2">
                  <iframe 
                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15838.256037748892!2d80.0715367610058!3d7.116709848574349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ae2fd0bb7ecab29%3A0xe54b8109bf336cc7!2sKalagedihena!5e0!3m2!1sen!2slk!4v1713800000000!5m2!1sen!2slk" 
                     width="100%" height="100%" style={{ border: 0, filter: 'contrast(1.1) opacity(0.9)' }} allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                  ></iframe>
               </motion.div>
            </div>

         </div>
      </section>

      {/* 7. PARTNERS & CERTIFICATIONS */}
      <section className="py-16 px-6 bg-white border-t border-gray-100">
         <div className="max-w-[1200px] mx-auto text-center">
            <h4 className="font-sans text-xs uppercase tracking-widest font-bold text-charcoal/40 mb-10">Trusted & Recognised By</h4>
            <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-60">
               {['SLTDA', 'TripAdvisor', 'Green Globe', 'Leave No Trace'].map((logo, i) => (
                  <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.15 }} className="hover:opacity-100 transition-opacity cursor-pointer">
                     <span className="font-serif text-2xl font-bold text-gray-400 whitespace-nowrap">{logo}</span>
                  </motion.div>
               ))}
            </div>
         </div>
      </section>

    </div>
  );
};

export default About;
