import React from 'react';
import HeroSection from './HeroSection';
import PromoBanner from './PromoBanner';
import BestsellersSection from './BestsellersSection';
import CategoriesSection from './CategoriesSection';
import AboutSection from './AboutSection';



interface ItemListContainerProps {
  greeting?: string;
}

const ItemListContainer: React.FC<ItemListContainerProps> = ({ greeting }) => {
  return (
    <div className="item-list-container">
      {greeting && <h2 style={{ textAlign: 'center', margin: '20px 0', color: 'var(--color-primary)' }}>{greeting}</h2>}
      <HeroSection />
      <PromoBanner />
      <BestsellersSection />
      <CategoriesSection />
      <AboutSection />
    </div>
  );
};

export default ItemListContainer;
