import React from 'react';
import HeroSection from './HeroSection';
import PromoBanner from './PromoBanner';
import BestsellersSection from './BestsellersSection';
import CategoriesSection from './CategoriesSection';
import AboutSection from './AboutSection';



const ItemListContainer: React.FC = () => {
  return (
    <div className="item-list-container">
      {/* Estructura principal de la página de inicio */}
      <HeroSection />
      <PromoBanner />
      <BestsellersSection />
      <CategoriesSection />
      <AboutSection />
    </div>
  );
};

export default ItemListContainer;
