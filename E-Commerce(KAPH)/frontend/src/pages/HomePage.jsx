import React from 'react';
import {
  FeaturedProducts,
  Hero,
  ShopCategory,
  Testimonials,
  Contact,
  HomeAbout,
} from '../components';
const HomePage = () => {
  return (
    <main>
      <Hero />
      <ShopCategory />
      <HomeAbout />
      <FeaturedProducts />
      <Testimonials />
      <Contact />
    </main>
  );
};

export default HomePage;
