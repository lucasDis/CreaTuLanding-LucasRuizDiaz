import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import NavBar from './components/NavBar';
import ItemListContainer from './components/ItemListContainer';
import CategoryPage from './pages/CategoryPage';
import ItemDetailPage from './pages/ItemDetailPage';
import CheckoutPage from './pages/CheckoutPage';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
          <NavBar />
          <Routes>
            <Route path="/" element={<ItemListContainer />} />
            <Route path="/category/:id" element={<CategoryPage />} />
            <Route path="/item/:id" element={<ItemDetailPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
          <Footer />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
