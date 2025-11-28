import React from 'react';

const FilterSidebar: React.FC = () => {
  return (
    <aside className="filter-sidebar">
      <h3>Filtros</h3>
      
      <div className="filter-group">
        <h4>Precio</h4>
        <label><input type="checkbox" /> $0 - $1000</label>
        <label><input type="checkbox" /> $1000 - $5000</label>
        <label><input type="checkbox" /> Más de $5000</label>
      </div>

      <div className="filter-group">
        <h4>Marca</h4>
        <label><input type="checkbox" /> Bosch</label>
        <label><input type="checkbox" /> Stanley</label>
        <label><input type="checkbox" /> Makita</label>
        <label><input type="checkbox" /> DeWalt</label>
      </div>

      <div className="filter-group">
        <h4>Disponibilidad</h4>
        <label><input type="checkbox" /> En Stock</label>
        <label><input type="checkbox" /> Envío Inmediato</label>
      </div>
    </aside>
  );
};

export default FilterSidebar;
