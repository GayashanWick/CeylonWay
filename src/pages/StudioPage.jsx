import React from 'react';
import { Studio } from 'sanity';
import config from '../sanity/sanity.config';

const StudioPage = () => {
  return (
    <div className="fixed inset-0 z-[100] h-screen w-screen bg-white">
      <Studio config={config} />
    </div>
  );
};

export default StudioPage;
