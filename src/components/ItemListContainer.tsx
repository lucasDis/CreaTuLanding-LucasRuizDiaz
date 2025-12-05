import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import FontCard from './FontCard';
import Pagination from './Pagination';
import { fonts } from '../data/fonts';

interface ItemListContainerProps {
  greeting?: string;
}

const ItemListContainer: React.FC<ItemListContainerProps> = ({ greeting }) => {
  const { id: categoryId } = useParams<{ id: string }>();
  const [filteredFonts, setFilteredFonts] = useState(fonts);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 9;

  useEffect(() => {
    if (categoryId) {
      setFilteredFonts(fonts.filter(font => font.categoria === categoryId));
    } else {
      setFilteredFonts(fonts);
    }
    setCurrentPage(1); // Reset to page 1 when category changes
  }, [categoryId]);

  // Calculate pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentFonts = filteredFonts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredFonts.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="item-list-container" style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h2 style={{
        textAlign: 'center',
        margin: '40px 0',
        fontSize: '2.5rem',
        color: 'var(--color-primary)'
      }}>
        {greeting || (categoryId ? `Categoría: ${categoryId.charAt(0).toUpperCase() + categoryId.slice(1).replace('-', ' ')}` : 'Todas las Tipografías')}
      </h2>

      {filteredFonts.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem' }}>No se encontraron tipografías en esta categoría.</p>
      ) : (
        <>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
            gap: '30px'
          }}>
            {currentFonts.map(font => (
              <FontCard key={font.id} font={font} />
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
  );
};

export default ItemListContainer;
