import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { client } from '../sanity/client';
import { PortableText } from '@portabletext/react';
import { Link as LinkIcon, ChevronRight } from 'lucide-react';
import { WHATSAPP_NUMBER } from '../config/constants';

// PortableText custom render components hooking to strict UI bounds
const generateSlug = (text) => text.toString().toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

const ptComponents = {
  block: {
    h2: ({children}) => {
      const slug = generateSlug(children[0]);
      return <h2 id={slug} className="font-serif text-3xl md:text-4xl text-forest-green mt-14 mb-6 pt-4 scroll-mt-[100px] border-b border-gray-100 pb-2">{children}</h2>;
    },
    h3: ({children}) => <h3 className="font-serif text-2xl text-forest-green mt-10 mb-4">{children}</h3>,
    normal: ({children}) => <p className="font-sans text-[17px] text-charcoal/80 leading-[1.8] mb-6">{children}</p>,
    blockquote: ({children}) => (
      <blockquote className="border-l-4 border-muted-gold pl-6 py-2 my-10 bg-warm-ivory/50 font-serif italic text-xl text-charcoal/70 shadow-sm rounded-r-sm">
        {children}
      </blockquote>
    ),
  },
  list: {
    bullet: ({children}) => <ul className="list-disc list-outside ml-6 space-y-3 mb-8 font-sans text-[17px] text-charcoal/80 marker:text-muted-gold marker:text-xl">{children}</ul>,
    number: ({children}) => <ol className="list-decimal list-outside ml-6 space-y-3 mb-8 font-sans text-[17px] text-charcoal/80 marker:text-muted-gold font-bold">{children}</ol>,
  },
  marks: {
    link: ({children, value}) => <a href={value.href} target="_blank" rel="noreferrer" className="text-muted-gold font-semibold hover:underline underline-offset-4">{children}</a>
  }
};

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Reading Progress System
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });

  // Extracted Table of Contents Anchor Nodes
  const [toc, setToc] = useState([]);
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    const fetchPostData = async () => {
      window.scrollTo(0, 0);
      setLoading(true);
      try {
        const postQuery = `*[_type == "post" && slug.current == $slug][0]{
          title, category, excerpt, body, readTime, publishedDate, tags, seoTitle, seoDescription,
          "author": author->{name, "photo": photo.asset->url, bio, isLocalGuide},
          "imageUrl": featuredImage.asset->url
        }`;
        const data = await client.fetch(postQuery, { slug });
        setPost(data);

        if (data) {
          // Pre-compute TOC
          const h2Blocks = data.body?.filter(b => b.style === 'h2') || [];
          const extractedTOC = h2Blocks.map(b => {
             const text = b.children[0]?.text || '';
             return { title: text, id: generateSlug(text) };
          });
          setToc(extractedTOC);

          // Meta programmatic Injection
          const title = data.seoTitle || `${data.title} | Ceylon Way Journal`;
          const desc = data.seoDescription || data.excerpt;
          document.title = title;
          
          let metaDesc = document.querySelector('meta[name="description"]');
          if (!metaDesc) {
            metaDesc = document.createElement('meta');
            metaDesc.name = "description";
            document.head.appendChild(metaDesc);
          }
          metaDesc.content = desc;

          // Schema / JSON-LD Data Builder
          const jsonLd = {
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": data.title,
            "image": [data.imageUrl],
            "datePublished": data.publishedDate,
            "author": { "@type": "Person", "name": data.author?.name },
            "publisher": { "@type": "Organization", "name": "Ceylon Way" }
          };
          
          let script = document.querySelector('#seo-json-ld');
          if (!script) {
             script = document.createElement('script');
             script.type = 'application/ld+json';
             script.id = 'seo-json-ld';
             document.head.appendChild(script);
          }
          script.text = JSON.stringify(jsonLd);

          // Fetch Related Posts
          const relatedQ = `*[_type == "post" && category == $category && slug.current != $slug][0...3]{
            "slug": slug.current, title, excerpt, category, readTime, publishedDate,
            "authorName": author->name, "authorPhoto": author->photo.asset->url,
            "imageUrl": featuredImage.asset->url
          }`;
          const relData = await client.fetch(relatedQ, { category: data.category, slug });
          setRelatedPosts(relData);
        }
        
        setLoading(false);
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchPostData();
  }, [slug]);

  // IO observer for active TOC highlighting
  useEffect(() => {
    if (!toc.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "0px 0px -80% 0px", threshold: 0 }
    );

    toc.forEach((t) => {
      const el = document.getElementById(t.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [toc]);

  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 300]);

  if (loading) {
     return <div className="min-h-screen bg-warm-ivory flex justify-center items-center"><div className="w-12 h-12 border-4 border-muted-gold border-t-transparent rounded-full animate-spin"></div></div>;
  }

  if (!post) {
     return <div className="min-h-screen bg-warm-ivory flex justify-center items-center font-sans text-charcoal">Post not found.</div>;
  }

  return (
    <div className="bg-warm-ivory min-h-screen relative pb-20">
      {/* 0. Scroll Progress Bar */}
      <motion.div className="fixed top-0 left-0 right-0 h-[3px] bg-muted-gold z-[100] origin-left" style={{ scaleX }} />

      {/* 1. HERO SECTION */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden flex items-end pb-20 pt-32">
        <motion.div style={{ y: heroY }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          {post.imageUrl ? (
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full bg-[#1B3A2D] flex items-center justify-center font-sans tracking-widest text-sm uppercase text-white/30">No Image Available</div>
          )}
        </motion.div>
        
        {/* Dark subtle gradient bottom upwards */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-transparent" />
        
        <div className="relative z-10 w-full max-w-[1400px] mx-auto px-6 md:px-12">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: "easeOut" }} className="max-w-4xl">
            <div className="inline-block bg-muted-gold text-white font-sans text-[10px] tracking-widest font-bold uppercase mb-6 px-4 py-1.5 rounded-sm shadow-sm">
              {post.category}
            </div>
            <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-white mb-6 leading-[1.1] drop-shadow-lg">{post.title}</h1>
            <div className="flex items-center gap-4 border-l-2 border-muted-gold pl-4 mt-6">
               {post.author?.photo ? ( <img src={post.author.photo} alt={post.author.name} className="w-12 h-12 rounded-full object-cover border border-white/20 shadow-sm" /> ) : ( <div className="w-12 h-12 rounded-full bg-white/20" /> )}
               <div className="flex flex-col text-white">
                  <span className="font-sans text-sm font-semibold tracking-wide shadow-sm">{post.author?.name}</span>
                  <span className="font-sans text-xs text-white/70">{new Date(post.publishedDate).toLocaleDateString('en-GB')} • {post.readTime} min read</span>
               </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* DESKTOP BREADCRUMB */}
      <div className="hidden lg:block max-w-[1400px] mx-auto px-12 pt-8">
         <div className="flex items-center gap-2 font-sans text-[10px] uppercase tracking-widest text-charcoal/40 font-bold">
            <Link to="/" className="hover:text-muted-gold transition-colors">Home</Link> <ChevronRight size={12}/>
            <Link to="/blog" className="hover:text-muted-gold transition-colors">Journal</Link> <ChevronRight size={12}/>
            <span className="text-charcoal/70 truncate max-w-[300px]">{post.title}</span>
         </div>
      </div>

      {/* 2. MAIN CONTENT AREA */}
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-12 lg:py-16 flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
        
        {/* LEFT BODY */}
        <div className="w-full lg:w-[70%] max-w-[850px]">
          
          <article className="prose-container">
            {post.body ? (
              <PortableText value={post.body} components={ptComponents} />
            ) : (
              <p className="font-sans text-charcoal/50">Article content is empty.</p>
            )}
          </article>

          {/* Tag Cloud Row */}
          {post.tags && post.tags.length > 0 && (
             <div className="mt-16 pt-8 border-t border-gray-200 flex flex-wrap gap-2 items-center">
                <span className="font-sans text-xs uppercase tracking-widest font-bold text-charcoal/40 mr-4">Tags:</span>
                {post.tags.map(t => (
                   <Link key={t} to={`/blog`} className="font-sans text-[10px] font-bold uppercase tracking-widest bg-gray-100 text-charcoal/60 px-3 py-1.5 rounded-sm hover:bg-muted-gold hover:text-white transition-colors">
                      {t}
                   </Link>
                ))}
             </div>
          )}

          {/* Sharing Row */}
          <div className="mt-8 mb-20 flex items-center justify-between bg-warm-ivory/50 p-6 border border-gray-100 rounded-sm shadow-sm">
             <span className="font-serif text-xl text-forest-green italic">Share this story</span>
             <div className="flex gap-3">
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-charcoal/70 hover:bg-[#1877F2] hover:text-white hover:border-[#1877F2] transition-colors"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg></a>
                <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(post.title)}`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-charcoal/70 hover:bg-black hover:text-white hover:border-black transition-colors"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg></a>
                <a href={`https://wa.me/?text=${encodeURIComponent(`Check out this article from Ceylon Way: ${post.title} ${window.location.href}`)}`} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-charcoal/70 hover:bg-[#25D366] hover:text-white hover:border-[#25D366] transition-colors">
                   <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                </a>
                <button onClick={() => {navigator.clipboard.writeText(window.location.href); alert('Link Copied!')}} className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center text-charcoal/70 hover:bg-muted-gold hover:text-white hover:border-muted-gold transition-colors"><LinkIcon size={16}/></button>
             </div>
          </div>

          {/* AUTHOR BIO BOX */}
          <div className="bg-white p-8 md:p-12 border border-gray-200 flex flex-col md:flex-row gap-8 items-center md:items-start shadow-sm rounded-sm">
             {post.author?.photo ? (
               <img src={post.author.photo} alt={post.author.name} className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-sm bg-gray-100 shrink-0" />
             ) : (
               <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-gray-100 shrink-0" />
             )}
             <div className="text-center md:text-left">
                {post.author?.isLocalGuide && (
                   <span className="inline-block bg-forest-green text-white font-sans text-[10px] font-bold tracking-widest uppercase px-3 py-1 mb-4 rounded-full">Written by a Global Local</span>
                )}
                <h3 className="font-serif text-3xl text-forest-green mb-3">{post.author?.name?.split('—')[0]}</h3>
                <p className="font-sans text-sm text-charcoal/70 leading-relaxed max-w-xl">{post.author?.bio}</p>
             </div>
          </div>

        </div>

        {/* RIGHT SIDEBAR (Desktop) */}
        <div className="hidden lg:block w-[30%]">
           <div className="sticky top-32 space-y-12">
             
             {/* Dynamic Table of Contents */}
             {toc.length > 0 && (
               <div className="bg-white p-8 border border-gray-200 rounded-sm shadow-sm relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-muted-gold/20" />
                  <h4 className="font-serif text-2xl text-charcoal mb-6 border-b border-gray-100 pb-4">Table of Contents</h4>
                  <ul className="space-y-4">
                     {toc.map((item, i) => (
                        <li key={i}>
                           <button 
                             onClick={() => document.getElementById(item.id)?.scrollIntoView({ behavior: 'smooth' })}
                             className={`font-sans text-sm w-full text-left transition-colors leading-relaxed ${activeId === item.id ? 'text-muted-gold font-bold ml-1' : 'text-charcoal/60 hover:text-charcoal'}`}
                           >
                              {item.title}
                           </button>
                        </li>
                     ))}
                  </ul>
               </div>
             )}

             {/* Sidebar Newsletter Widget */}
             <div className="bg-warm-ivory border border-muted-gold/50 p-6 rounded-sm text-center shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-16 h-16 bg-muted-gold/10 rounded-bl-full" />
                <h4 className="font-serif text-2xl text-forest-green mb-2 relative z-10">Get our free Off-Grid Sri Lanka Guide</h4>
                <p className="font-sans text-xs text-charcoal/60 mb-6 leading-relaxed relative z-10">Join 5,000+ readers receiving weekly trail insights.</p>
                <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 relative z-10">
                   <input type="email" placeholder="Email Address" required className="bg-white border border-gray-300 w-full px-4 py-3 font-sans text-sm focus:outline-none focus:border-muted-gold rounded-sm text-center" />
                   <button type="submit" className="w-full bg-forest-green text-white font-sans font-semibold tracking-widest text-[10px] uppercase py-3.5 rounded-sm hover:bg-forest-green/90 transition-colors shadow-sm">
                      Send Me the Guide
                   </button>
                </form>
             </div>

             {/* Small Related Posts */}
             {relatedPosts.length > 0 && (
                <div>
                   <h4 className="font-serif text-xl text-charcoal/50 uppercase tracking-widest text-xs font-bold mb-6">Related Posts</h4>
                   <div className="flex flex-col gap-4">
                      {relatedPosts.map(p => (
                         <Link key={p.slug} to={`/blog/${p.slug}`} className="flex gap-4 group bg-white border border-gray-100 p-2 rounded-sm shadow-sm hover:border-muted-gold transition-colors">
                            <div className="w-20 h-20 shrink-0 bg-gray-50 overflow-hidden rounded-sm">
                               {p.imageUrl ? ( <img src={p.imageUrl} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform" /> ) : ( <div className="w-full h-full bg-[#1B3A2D]/10" /> )}
                            </div>
                            <div className="flex flex-col justify-center">
                               <h5 className="font-serif text-sm leading-snug text-charcoal group-hover:text-muted-gold transition-colors line-clamp-2 mb-1">{p.title}</h5>
                               <span className="font-sans text-[10px] text-charcoal/40 uppercase tracking-widest font-bold">{p.readTime} min read</span>
                            </div>
                         </Link>
                      ))}
                   </div>
                </div>
             )}

           </div>
        </div>
      </div>

      {/* 3. FULL WIDTH RELATED SECTION (BOTTOM) */}
      {relatedPosts.length > 0 && (
        <section className="bg-white border-t border-gray-200 py-24 px-6 md:px-12 mt-12">
           <div className="max-w-[1400px] mx-auto">
              <h2 className="font-serif text-4xl text-forest-green mb-12 text-center md:text-left">More from Ceylon Way Journal</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 {relatedPosts.map((post, i) => (
                    <motion.div 
                       key={post.slug}
                       initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                       className="group bg-warm-ivory border border-gray-100 flex flex-col hover:border-muted-gold transition-colors duration-300 relative rounded-sm shadow-sm"
                    >
                       <Link to={`/blog/${post.slug}`} className="absolute inset-0 z-20" aria-label={`Read ${post.title}`} />
                       <div className="relative aspect-[16/9] overflow-hidden bg-white border-b border-gray-100">
                          <div className="absolute top-4 left-4 z-10 bg-white text-charcoal font-sans text-[10px] tracking-widest font-bold uppercase px-3 py-1 shadow-sm rounded-sm">
                             {post.category}
                          </div>
                          {post.imageUrl ? (
                             <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out" />
                          ) : (
                             <div className="w-full h-full flex items-center justify-center font-sans tracking-widest text-[10px] uppercase text-charcoal/30">Placeholder</div>
                          )}
                       </div>
                       <div className="p-6 flex flex-col flex-grow">
                          <h3 className="font-serif text-2xl text-forest-green mb-3 line-clamp-2 leading-snug group-hover:text-muted-gold transition-colors">{post.title}</h3>
                          <p className="font-sans text-sm text-charcoal/70 line-clamp-2 mb-6 flex-grow leading-relaxed">{post.excerpt}</p>
                       </div>
                    </motion.div>
                 ))}
              </div>
           </div>
        </section>
      )}

      {/* MOBILE BACK BUTTON */}
      <Link to="/blog" className="md:hidden fixed bottom-6 left-6 z-50 bg-white border border-gray-200 shadow-xl rounded-full w-12 h-12 flex items-center justify-center text-charcoal hover:bg-gray-50">
         <ChevronRight size={24} className="rotate-180" />
      </Link>

    </div>
  );
};

export default BlogPost;
