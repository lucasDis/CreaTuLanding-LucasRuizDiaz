import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import FontCard from './FontCard';
import Pagination from './Pagination';
import FilterSidebar, { type FilterOptions } from './FilterSidebar';
import LoadingSpinner from './LoadingSpinner';
import ErrorMessage from './ErrorMessage';
import { useFonts } from '../hooks/useFonts';
import { type Font } from '../firebase/fonts';

interface ItemListContainerProps {
  greeting?: string;
}

// Componente principal de listado con Firestore + filtros
const ItemListContainer: React.FC<ItemListContainerProps> = ({ greeting }) => {
  const { id: categoryId } = useParams<{ id: string }>();
  
  // Fetch desde Firestore con custom hook
  const { fonts, loading, error, refetch } = useFonts(categoryId);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    minVariants: 1,
    sortByPopular: false,
    sortByBestSelling: false
  });
  const itemsPerPage = 9;

  // Lógica de filtrado y ordenamiento (memoizada)
  const filteredFonts = useMemo(() => {
    let result = [...fonts];

    if (filters.categories.length > 0) {
      result = result.filter(font => filters.categories.includes(font.categoria));
    }

    if (filters.minVariants > 1) {
      result = result.filter(font => font.variantes.length >= filters.minVariants);
    }

    if (filters.sortByPopular) {
      result.sort((a, b) => {
        const popA = (a as any).popularidad || 0;
        const popB = (b as any).popularidad || 0;
        return popB - popA;
      });
    }

    if (filters.sortByBestSelling) {
      result.sort((a, b) => {
        const salesA = (a as any).ventas || 0;
        const salesB = (b as any).ventas || 0;
        return salesB - salesA;
      });
    }

    return result;
  }, [fonts, filters]);

  // Reset de paginación al cambiar filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [categoryId, filters]);

  // Cálculo de paginación
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFonts = filteredFonts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFonts.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFilterChange = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  // Estado de loading
  if (loading) {
    return (
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>
        <FilterSidebar onFilterChange={handleFilterChange} />
        <div style={{ flex: 1 }}>
          <LoadingSpinner message="Cargando tipografías..." />
        </div>
      </div>
    );
  }

  // Estado de error
  if (error) {
    return (
      <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>
        <FilterSidebar onFilterChange={handleFilterChange} />
        <div style={{ flex: 1 }}>
          <ErrorMessage 
            message={error} 
            onRetry={refetch}
          />
        </div>
      </div>
    );
  }

  // Render principal
  return (
    <div style={{ display: 'flex', minHeight: 'calc(100vh - 80px)' }}>
      <FilterSidebar onFilterChange={handleFilterChange} />

      <div className="item-list-container" style={{ flex: 1, padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{
          textAlign: 'center',
          margin: '40px 0',
          fontSize: '2.5rem',
          color: 'var(--color-primary)'
        }}>
          {greeting || (categoryId ? `Categoría: ${categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace('-', ' ')}` : 'Todas las Tipografías')}
        </h2>

        {filteredFonts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ fontSize: '1.2rem', color: '#666' }}>
              No se encontraron tipografías con los filtros aplicados.
            </p>
            <button
              onClick={() => setFilters({
                categories: [],
                minVariants: 1,
                sortByPopular: false,
                sortByBestSelling: false
              })}
              style={{
                marginTop: '1rem',
                padding: '0.75rem 1.5rem',
                backgroundColor: 'var(--color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer'
              }}
            >
              Limpiar filtros
            </button>
          </div>
        ) : (
          <>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '30px'
            }}>
              {currentFonts.map(font => (
                <FontCard key={font.id} font={font as Font & { id: string }} />
              ))}
            </div>

            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default ItemListContainer;
