import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar';
import ProductCard from '../components/ProductCard';
import Pagination from '../components/Pagination';
import { getProductsByCategory, type Product } from '../data/products';

const CategoryPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [priceFilter, setPriceFilter] = useState<{ min: number; max: number }>({ min: 0, max: Infinity });
  const itemsPerPage = 12;

  useEffect(() => {
    setLoading(true);
    setCurrentPage(1);

    if (id) {
      getProductsByCategory(id)
        .then((data) => {
          setProducts(data);
          setFilteredProducts(data);
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [id]);


  useEffect(() => {
    const filtered = products.filter(p => p.price >= priceFilter.min && p.price <= priceFilter.max);
    setFilteredProducts(filtered);
    setCurrentPage(1);
  }, [priceFilter, products]);

  const handleFilterChange = (min: number, max: number) => {
    setPriceFilter({ min, max });
  };


  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="page-container">
      <div className="category-layout">
        <FilterSidebar onFilterChange={handleFilterChange} />

        <main className="category-content">
          <h1>Categoría: {id ? id.charAt(0).toUpperCase() + id.slice(1).replace('-', ' ') : 'Productos'}</h1>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '2rem' }}>Cargando productos...</div>
          ) : (
            <>
              {filteredProducts.length === 0 ? (
                <p>No se encontraron productos con los filtros aplicados.</p>
              ) : (
                <>
                  <div className="product-grid">
                    {currentProducts.map((product) => (
                      <ProductCard key={product.id} {...product} />
                    ))}
                  </div>

                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                </>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default CategoryPage;
