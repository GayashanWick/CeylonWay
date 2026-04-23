import React from 'react';
import Hero from '../components/Hero';
import CategoryCardRow from '../components/CategoryCardRow';
import FeaturedPackages from '../components/FeaturedPackages';
import WhyCeylonWay from '../components/WhyCeylonWay';
import Testimonials from '../components/Testimonials';
import EmailCapture from '../components/EmailCapture';

const Home = () => {
  return (
    <main>
      <Hero />
      <CategoryCardRow />
      <FeaturedPackages />
      <WhyCeylonWay />
      <Testimonials />
      <EmailCapture />
    </main>
  );
};

export default Home;
