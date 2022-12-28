import React from 'react';
import { FeaturedProducts, Hero, Testimonials, Contact } from '../components';
const HomePage = () => {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Testimonials />
      <Contact />
    </main>
  );
};

export default HomePage;
