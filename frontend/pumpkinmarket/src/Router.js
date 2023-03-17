import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';
import Chat from './pages/Chatting/Chat';
import Login from './pages/Login/Login';
import Main from './pages/Main/Main';
import Mypage from './pages/Mypage/Mypage';
import NeighborInfo from './pages/NeighborInfo/NeighborInfo';
import NeighborInfoList from './pages/NeighborInfoList/NeighborInfoList';
import NeighborInfoPosting from './pages/NeighborInfoPosting/NeighborInfoPosting';
import Posting from './pages/Posting/Posting';
import Product from './pages/Product/Product';
import ProductList from './pages/ProductList/ProductList';
import SignUp from './pages/SignUp/SignUp';

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product" element={<Product />} />
        <Route path="/product-list" element={<ProductList />} />
        <Route path="/posting" element={<Posting />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/mypage" element={<Mypage />} />
        <Route path="/neighborinfo" element={<NeighborInfo />} />
        <Route path="/neighborinfo-list" element={<NeighborInfoList />} />
        <Route path="/neighborinfo-posting" element={<NeighborInfoPosting />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default Router;
