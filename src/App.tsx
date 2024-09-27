import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { Catalog } from './pages/Catalog';
import { ProductPage } from './pages/ProductPage';
import { About } from './pages/About';
import { Contacts } from './pages/Contacts';
import { Cart } from './pages/purchase';
import { Error } from './pages/Error';

const App: React.FC = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="/catalog/:id" element={<ProductPage />} />
          <Route path="about" element={<About />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="cart" element={<Cart />} />
          <Route path="*" element={<Error />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;