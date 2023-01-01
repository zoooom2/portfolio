import React from 'react';
import {
  FeaturedProducts,
  Hero,
  ShopCategory,
  Testimonials,
  Contact,
} from '../components';
const HomePage = () => {
  return (
    <main>
      <Hero />
      <ShopCategory />
      <FeaturedProducts />
      <Testimonials />
      <Contact />
    </main>
  );
};

export default HomePage;
