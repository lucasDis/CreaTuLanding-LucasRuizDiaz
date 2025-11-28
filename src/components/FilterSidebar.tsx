import React from 'react';

interface FilterSidebarProps {
  onFilterChange?: (minPrice: number, maxPrice: number) => void;
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange }) => {
  const handlePriceFilter = (min: number, max: number) => {
    if (onFilterChange) {
      onFilterChange(min, max);
    }
  };

  return (
    <aside className="filter-sidebar">
      <h3>Filtros</h3>

      <div className="filter-group">
        <h4>Precio</h4>
        <label>
          <input type="radio" name="price" onChange={() => handlePriceFilter(0, Infinity)} defaultChecked />
          Todos
        </label>
        <label>
          <input type="radio" name="price" onChange={() => handlePriceFilter(0, 50000)} />
          Hasta $50,000
        </label>
        <label>
          <input type="radio" name="price" onChange={() => handlePriceFilter(50000, 100000)} />
          $50,000 - $100,000
        </label>
        <label>
          <input type="radio" name="price" onChange={() => handlePriceFilter(100000, Infinity)} />
          Más de $100,000
        </label>
      </div>
    </aside>
  );
};

export default FilterSidebar;
