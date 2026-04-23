import React from 'react';
import { useParams } from 'react-router-dom';

const PlaceholderPage = ({ title }) => {
  const { slug } = useParams();
  
  // Format slug for display if present
  const formattedSlug = slug ? slug.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ') : null;
  const displayTitle = formattedSlug ? `${title}: ${formattedSlug}` : title;

  return (
    <div className="flex items-center justify-center min-h-[70vh] pt-32 pb-24 px-6 bg-warm-ivory">
      <div className="text-center">
        <h1 className="font-serif text-4xl md:text-6xl mb-6 text-forest-green">{displayTitle}</h1>
        <div className="w-16 h-0.5 bg-muted-gold mx-auto mb-8"></div>
        <p className="font-sans text-lg tracking-widest text-charcoal/50 uppercase font-semibold">Coming Soon</p>
      </div>
    </div>
  );
};

export default PlaceholderPage;
