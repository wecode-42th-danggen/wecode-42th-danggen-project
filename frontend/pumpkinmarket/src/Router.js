import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer/Footer';
import Nav from './components/Nav/Nav';
import Community from './pages/AdminProject/Community';
import Dealings from './pages/AdminProject/Dealings';
import Member from './pages/AdminProject/Member';
import Chat from './pages/Chat/Chat';
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
import { MenuProvider } from './components/Nav/MenuProvider';

const Router = () => {
  return (
    <MenuProvider>
      <BrowserRouter>
        <Nav />
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Product />} />
          <Route path="/product-list" element={<ProductList />} />
          <Route path="/posting" element={<Posting />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/mypage" element={<Mypage />} />
          <Route path="/neighborinfo" element={<NeighborInfo />} />
          <Route path="/neighborinfo-list" element={<NeighborInfoList />} />
          <Route
            path="/neighborinfo-posting"
            element={<NeighborInfoPosting />}
          />
          <Route path="/community" element={<Community />} />
          <Route path="/dealings" element={<Dealings />} />
          <Route path="/member" element={<Member />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </MenuProvider>
  );
};

export default Router;
