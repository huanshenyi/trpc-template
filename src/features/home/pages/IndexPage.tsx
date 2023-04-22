import React from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Works from '../components/Works';

export const IndexPage: React.FC = () => {
  return (
    <>
      <Hero />
      <About />
      <Works />
      <Services />
    </>
  );
};
