import React, { useState } from 'react';

export interface FilterOptions {
  categories: string[];
  minVariants: number;
  sortByPopular: boolean;
  sortByBestSelling: boolean;
}

interface FilterSidebarProps {
  onFilterChange: (filters: FilterOptions) => void;
}

// Sidebar de filtros para catálogo de tipografías
const FilterSidebar: React.FC<FilterSidebarProps> = ({ onFilterChange }) => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [minVariants, setMinVariants] = useState(1);
  const [sortByPopular, setSortByPopular] = useState(false);
  const [sortByBestSelling, setSortByBestSelling] = useState(false);

  const categories = [
    { id: 'serif', label: 'Serif' },
    { id: 'sans-serif', label: 'Sans Serif' },
    { id: 'monospace', label: 'Monospace' },
    { id: 'display', label: 'Display' },
    { id: 'handwriting', label: 'Handwriting' }
  ];

  // Handlers de filtros
  const handleCategoryChange = (categoryId: string) => {
    const newCategories = selectedCategories.includes(categoryId)
      ? selectedCategories.filter(c => c !== categoryId)
      : [...selectedCategories, categoryId];
    
    setSelectedCategories(newCategories);
    notifyFilterChange({ categories: newCategories });
  };

  const handleVariantsChange = (value: number) => {
    setMinVariants(value);
    notifyFilterChange({ minVariants: value });
  };

  const handlePopularChange = (checked: boolean) => {
    setSortByPopular(checked);
    if (checked) setSortByBestSelling(false);
    notifyFilterChange({ sortByPopular: checked, sortByBestSelling: false });
  };

  const handleBestSellingChange = (checked: boolean) => {
    setSortByBestSelling(checked);
    if (checked) setSortByPopular(false);
    notifyFilterChange({ sortByBestSelling: checked, sortByPopular: false });
  };

  const notifyFilterChange = (partialFilters: Partial<FilterOptions>) => {
    onFilterChange({
      categories: partialFilters.categories ?? selectedCategories,
      minVariants: partialFilters.minVariants ?? minVariants,
      sortByPopular: partialFilters.sortByPopular ?? sortByPopular,
      sortByBestSelling: partialFilters.sortByBestSelling ?? sortByBestSelling
    });
  };

  const clearFilters = () => {
    setSelectedCategories([]);
    setMinVariants(1);
    setSortByPopular(false);
    setSortByBestSelling(false);
    onFilterChange({
      categories: [],
      minVariants: 1,
      sortByPopular: false,
      sortByBestSelling: false
    });
  };

  return (
    <aside className="filter-sidebar">
      <div className="filter-header">
        <h3>Filtros</h3>
        <button className="clear-filters-btn" onClick={clearFilters}>
          Limpiar
        </button>
      </div>

      {/* Filtro por categorías */}
      <div className="filter-group">
        <h4>Tipo de Fuente</h4>
        {categories.map(category => (
          <label key={category.id} className="filter-checkbox">
            <input
              type="checkbox"
              checked={selectedCategories.includes(category.id)}
              onChange={() => handleCategoryChange(category.id)}
            />
            <span>{category.label}</span>
          </label>
        ))}
      </div>

      {/* Filtro por variantes */}
      <div className="filter-group">
        <h4>Variantes Mínimas</h4>
        <div className="slider-container">
          <input
            type="range"
            min="1"
            max="5"
            value={minVariants}
            onChange={(e) => handleVariantsChange(Number(e.target.value))}
            className="variants-slider"
          />
          <div className="slider-value">{minVariants} {minVariants === 1 ? 'variante' : 'variantes'}</div>
        </div>
      </div>

      {/* Ordenamiento */}
      <div className="filter-group">
        <h4>Ordenar por</h4>
        <label className="filter-checkbox">
          <input
            type="checkbox"
            checked={sortByPopular}
            onChange={(e) => handlePopularChange(e.target.checked)}
          />
          <span>Más Usadas</span>
        </label>
        <label className="filter-checkbox">
          <input
            type="checkbox"
            checked={sortByBestSelling}
            onChange={(e) => handleBestSellingChange(e.target.checked)}
          />
          <span>Más Vendidas</span>
        </label>
      </div>
    </aside>
  );
};

export default FilterSidebar;
