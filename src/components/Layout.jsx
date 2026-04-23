import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import FloatingWhatsApp from './FloatingWhatsApp';

const Layout = () => {
  return (
    <div className="font-sans bg-warm-ivory text-charcoal min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-grow">
        <Outlet />
      </div>
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
};

export default Layout;
