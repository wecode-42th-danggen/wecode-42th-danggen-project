import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';
import Chat from './pages/Chat/Chat';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import Posting from './pages/Posting/Posting';
import Product from './pages/Product/Product';
import ProductList from './pages/ProductList/ProductList';
import SignUp from './pages/SignUp/SignUp';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/nav" element={<Nav />} />
        <Route path="/footer" element={<Footer />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/posting" element={<Posting />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/sign-up" element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
