import React, { useState, useEffect } from 'react';
import { motion, useScroll } from 'framer-motion';
import { Link } from 'react-router-dom';
import { client } from '../sanity/client';
import { Search } from 'lucide-react';

const CATEGORIES = ['All', 'Off-Grid Travel', 'Wellness & Ayurveda', 'Wildlife & Nature', 'Cultural Sri Lanka', 'Gear & Equipment', 'Travel Tips'];

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [featuredPost, setFeaturedPost] = useState(null);
  const [popularPosts, setPopularPosts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  // Pagination (Simple Offset)
  const [page, setPage] = useState(1);
  const POSTS_PER_PAGE = 9;

  useEffect(() => {
    const fetchBlogData = async () => {
      window.scrollTo(0, 0);
      try {
        const featuredRes = await client.fetch(`*[_type == "post" && featured == true][0]{
          "slug": slug.current, title, category, excerpt, readTime, publishedDate,
          "authorName": author->name, "authorPhoto": author->photo.asset->url,
          "imageUrl": featuredImage.asset->url
        }`);
        setFeaturedPost(featuredRes);

        const popularRes = await client.fetch(`*[_type == "post" && popular == true][0...4]{
          "slug": slug.current, title, readTime, "imageUrl": featuredImage.asset->url
        }`);
        setPopularPosts(popularRes);

        fetchGridPosts(1, true);
        
      } catch (err) {
        console.error(err);
        setLoading(false);
      }
    };
    fetchBlogData();
  }, []);

  const fetchGridPosts = async (pageNumber, reset = false) => {
    const start = (pageNumber - 1) * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    try {
      const gPosts = await client.fetch(`*[_type == "post"] | order(publishedDate desc) [${start}...${end}] {
        "slug": slug.current, title, category, excerpt, readTime, publishedDate, tags,
        "authorName": author->name, "authorPhoto": author->photo.asset->url,
        "imageUrl": featuredImage.asset->url
      }`);
      
      if (reset) {
         setPosts(gPosts);
      } else {
         setPosts(prev => [...prev, ...gPosts]);
      }
      setLoading(false);
    } catch(err) { console.error(err); setLoading(false); }
  }

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchGridPosts(nextPage);
  }

  // Client Side Filtering
  const displayedPosts = posts.filter(p => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || (p.tags && p.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchCat && matchSearch;
  });

  // Calculate unique tags from fetched posts for the sidebar pill cloud
  const uniqueTags = [...new Set(posts.flatMap(p => p.tags || []))];

  // Category counts
  const getCategoryCount = (cat) => posts.filter(p => p.category === cat).length;

  return (
    <div className="bg-warm-ivory min-h-screen pt-20">
      
      {/* HERO */}
      <section className="relative py-24 w-full flex flex-col items-center justify-center text-center bg-[#1B3A2D] overflow-hidden">
         <div className="absolute inset-0 bg-charcoal/20 opacity-40 mix-blend-multiply" />
         <div className="relative z-10 max-w-3xl px-6">
           <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
              <div className="inline-block text-muted-gold font-sans font-bold tracking-widest text-xs uppercase mb-6 drop-shadow-md">
                 Ceylon Way Journal
              </div>
              <h1 className="font-serif text-5xl md:text-6xl text-warm-ivory mb-6 leading-tight">Stories, Guides & Hidden Ceylon</h1>
              <p className="font-sans text-lg text-warm-ivory/80 leading-relaxed">
                 Practical travel guides, trail notes, and stories from the heart of Sri Lanka
              </p>
           </motion.div>
         </div>
      </section>

      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16 flex flex-col lg:flex-row gap-16">
        
        {/* MAIN COLUMN */}
        <div className="flex-1 w-full lg:w-3/4">
          
          {/* FEATURED POST */}
          {featuredPost && activeCategory === 'All' && !searchQuery && page === 1 && (
            <motion.div 
               initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
               className="mb-20 flex flex-col md:flex-row bg-white shadow-sm hover:shadow-md transition-shadow rounded-sm overflow-hidden border border-gray-100 group"
            >
              <div className="w-full md:w-[60%] overflow-hidden bg-gray-50 aspect-video md:aspect-auto h-auto min-h-[300px]">
                 {featuredPost.imageUrl ? (
                   <img src={featuredPost.imageUrl} alt={featuredPost.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center font-sans tracking-widest text-sm uppercase text-charcoal/30 relative">
                     <span className="absolute inset-0 bg-[#1B3A2D]/10 mix-blend-multiply"></span>
                     No Image Available
                   </div>
                 )}
              </div>
              <div className="w-full md:w-[40%] p-10 flex flex-col justify-center">
                 <div className="font-sans text-xs uppercase tracking-widest text-muted-gold font-bold mb-4">{featuredPost.category}</div>
                 <h2 className="font-serif text-3xl md:text-4xl text-forest-green mb-4 leading-tight">{featuredPost.title}</h2>
                 <p className="font-sans text-charcoal/70 line-clamp-3 mb-8 leading-relaxed">{featuredPost.excerpt}</p>
                 
                 <div className="flex items-center gap-4 mb-8">
                    {featuredPost.authorPhoto ? (
                       <img src={featuredPost.authorPhoto} alt="..." className="w-10 h-10 rounded-full object-cover" />
                    ) : ( <div className="w-10 h-10 rounded-full bg-gray-200" /> )}
                    <div className="flex flex-col">
                       <span className="font-sans text-xs font-semibold text-charcoal">{featuredPost.authorName?.split('—')[0]}</span>
                       <span className="font-sans text-xs text-charcoal/50">{new Date(featuredPost.publishedDate).toLocaleDateString('en-GB')} • {featuredPost.readTime} min read</span>
                    </div>
                 </div>

                 <Link to={`/blog/${featuredPost.slug}`} className="inline-block text-center px-8 py-3 bg-muted-gold text-white font-sans font-semibold tracking-widest text-sm uppercase rounded-sm hover:bg-muted-gold/90 transition-colors self-start">
                   Read Article
                 </Link>
              </div>
            </motion.div>
          )}

          {/* FILTERS BAR */}
          <div className="flex flex-wrap items-center gap-3 mb-10 pb-6 border-b border-gray-200">
             {CATEGORIES.map(cat => (
               <button
                 key={cat}
                 onClick={() => setActiveCategory(cat)}
                 className={`px-5 py-2.5 font-sans justify-center text-xs tracking-wider uppercase font-semibold rounded-full border transition-all ${
                   activeCategory === cat ? 'border-muted-gold bg-muted-gold text-white' : 'border-gray-200 text-charcoal/60 hover:border-gray-300 hover:text-charcoal'
                 }`}
               >
                 {cat}
               </button>
             ))}
          </div>

          {/* POSTS GRID */}
          {loading ? (
             <div className="flex justify-center items-center py-20"><div className="w-10 h-10 border-4 border-muted-gold border-t-transparent rounded-full animate-spin"></div></div>
          ) : displayedPosts.length === 0 ? (
             <div className="text-center py-20 font-sans text-charcoal/50 border border-dashed border-gray-200 rounded-sm">No posts found matching the criteria.</div>
          ) : (
             <>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                 {displayedPosts.map((post, i) => (
                    <motion.div 
                       key={post.slug}
                       initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: (i % 9) * 0.1 }}
                       className="group bg-white border border-gray-100 flex flex-col hover:border-muted-gold transition-colors duration-300 relative rounded-sm shadow-sm hover:shadow-md"
                    >
                       <Link to={`/blog/${post.slug}`} className="absolute inset-0 z-20" aria-label={`Read ${post.title}`} />
                       <div className="relative aspect-[16/9] overflow-hidden bg-gray-50 border-b border-gray-100">
                          <div className="absolute top-4 left-4 z-10 bg-warm-ivory text-charcoal font-sans text-[10px] tracking-widest font-bold uppercase px-3 py-1 shadow-sm rounded-sm">
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
                          
                          <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gray-50">
                             {post.authorPhoto ? ( <img src={post.authorPhoto} alt="" className="w-8 h-8 rounded-full object-cover" /> ) : ( <div className="w-8 h-8 rounded-full bg-gray-200" /> )}
                             <div className="flex flex-col">
                                <span className="font-sans text-[10px] uppercase tracking-wider font-bold text-charcoal">{post.authorName?.split('—')[0]}</span>
                                <span className="font-sans text-[10px] text-charcoal/50">{new Date(post.publishedDate).toLocaleDateString('en-GB')} • {post.readTime} min</span>
                             </div>
                          </div>
                       </div>
                    </motion.div>
                 ))}
               </div>

               {/* Load More Check */}
               {displayedPosts.length >= (page * POSTS_PER_PAGE) && (
                 <div className="text-center">
                    <button onClick={handleLoadMore} className="bg-transparent border border-muted-gold text-muted-gold font-sans font-semibold tracking-widest text-sm uppercase px-8 py-3 rounded-sm hover:bg-muted-gold hover:text-white transition-colors">
                       Load More Posts
                    </button>
                 </div>
               )}
             </>
          )}

        </div>

        {/* STICKY SIDEBAR (Desktop Only) */}
        <div className="hidden lg:block w-1/4 sticky top-32 h-fit space-y-12">
           
           {/* Search */}
           <div>
              <h4 className="font-serif text-2xl text-charcoal mb-4 border-b border-gray-200 pb-2">Search</h4>
              <div className="relative">
                 <input 
                    type="text" 
                    placeholder="Search articles..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white border border-gray-300 px-4 py-3 pl-10 focus:outline-none focus:border-muted-gold font-sans text-sm rounded-sm text-charcoal transition-colors shadow-sm"
                 />
                 <Search size={16} className="absolute left-3 top-3.5 text-gray-400" />
              </div>
           </div>

           {/* Popular Posts */}
           {popularPosts.length > 0 && (
             <div>
                <h4 className="font-serif text-2xl text-charcoal mb-4 border-b border-gray-200 pb-2">Popular Posts</h4>
                <div className="flex flex-col gap-4">
                   {popularPosts.map((p, i) => (
                      <Link key={i} to={`/blog/${p.slug}`} className="flex gap-4 group">
                         <div className="w-16 h-16 shrink-0 bg-gray-100 overflow-hidden rounded-sm">
                            {p.imageUrl ? (
                              <img src={p.imageUrl} alt={p.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                            ) : (
                              <div className="w-full h-full bg-forest-green/10" />
                            )}
                         </div>
                         <div className="flex flex-col justify-center">
                            <h5 className="font-serif text-sm leading-snug text-charcoal group-hover:text-muted-gold transition-colors line-clamp-2 mb-1">{p.title}</h5>
                            <span className="font-sans text-[10px] text-charcoal/50 uppercase tracking-wider">{p.readTime} min read</span>
                         </div>
                      </Link>
                   ))}
                </div>
             </div>
           )}

           {/* Categories Map */}
           <div>
              <h4 className="font-serif text-2xl text-charcoal mb-4 border-b border-gray-200 pb-2">Categories</h4>
              <ul className="space-y-2">
                 {CATEGORIES.filter(c => c !== 'All').map(c => {
                    const count = getCategoryCount(c);
                    return count > 0 ? (
                       <li key={c}>
                          <button onClick={() => {setActiveCategory(c); setSearchQuery('');}} className={`font-sans text-sm w-full text-left transition-colors flex justify-between items-center ${activeCategory === c ? 'text-muted-gold font-semibold' : 'text-charcoal/70 hover:text-muted-gold'}`}>
                             {c} <span className="text-[10px] bg-gray-100 text-charcoal/50 px-2 py-0.5 rounded-sm font-bold">{count}</span>
                          </button>
                       </li>
                    ) : null;
                 })}
              </ul>
           </div>

           {/* Tags Cloud */}
           {uniqueTags.length > 0 && (
             <div>
                <h4 className="font-serif text-2xl text-charcoal mb-4 border-b border-gray-200 pb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                   {uniqueTags.map(t => (
                      <button key={t} onClick={() => setSearchQuery(t)} className="font-sans text-[10px] uppercase tracking-widest font-bold bg-white border border-gray-200 px-3 py-1.5 text-charcoal/60 rounded-sm hover:border-muted-gold hover:text-muted-gold transition-colors shadow-sm">
                         {t}
                      </button>
                   ))}
                </div>
             </div>
           )}

           {/* Email Capture Widget */}
           <div className="bg-warm-ivory border border-muted-gold/50 p-6 rounded-sm text-center shadow-sm relative overflow-hidden">
              <div className="absolute top-0 right-0 w-16 h-16 bg-muted-gold/10 rounded-bl-full" />
              <h4 className="font-serif text-2xl text-forest-green mb-2 relative z-10">Get our free Off-Grid Sri Lanka Guide</h4>
              <p className="font-sans text-xs text-charcoal/60 mb-6 leading-relaxed relative z-10">Join 5,000+ readers receiving weekly trail insights.</p>
              <form onSubmit={(e) => e.preventDefault()} className="flex flex-col gap-3 relative z-10">
                 <input type="email" placeholder="Email Address" required className="bg-white border border-gray-300 shadow-inner w-full px-4 py-3 font-sans text-sm focus:outline-none focus:border-muted-gold rounded-sm text-center" />
                 <button type="submit" className="w-full bg-forest-green text-white font-sans font-semibold tracking-widest text-[10px] uppercase py-3.5 rounded-sm hover:bg-forest-green/90 transition-colors shadow-sm">
                    Send Me the Guide
                 </button>
              </form>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
