import { useState } from 'react'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './components/BODY/Home'
import './App.css'
import {Routes, Route } from "react-router-dom"
import Cart from './components/BODY/Cart'
import { Product } from './components/BODY/Interfaces'
import AdmPanel from './components/BODY/AdmPanel'
import ProtectedRoute from './route/ProtectedRoute'


function App() {
  const [cartItems, setCartItems] = useState<any[]>([]);
  const addToCart = (product: Product) => {
    setCartItems(prevItems => {
      const productExists = prevItems.find(item => item.iD_PRODUCTO === product.iD_PRODUCTO);
      if (productExists) {
        return prevItems.map(item =>
          item.iD_PRODUCTO === product.iD_PRODUCTO ? { ...productExists, qty: (productExists.qty || 0) + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, qty: 1 }];
      }
    });
  };

  const deleteQty = (product: Product) => {
    setCartItems(prevItems => prevItems.filter(item => item.iD_PRODUCTO !== product.iD_PRODUCTO));
  };

  const decreaseQty = (product: Product) => {
    setCartItems(prevItems => {
      const productExists = prevItems.find(item => item.iD_PRODUCTO === product.iD_PRODUCTO);
      if (productExists) {
        if (productExists.qty === 1) {
          return prevItems.filter(item => item.iD_PRODUCTO !== product.iD_PRODUCTO);
        } else {
          return prevItems.map(item =>
            item.iD_PRODUCTO === product.iD_PRODUCTO ? { ...productExists, qty: (productExists.qty || 0) - 1 } : item
          );
        }
      }
      return prevItems;
    });
  };

  return (
    <>
      <Header cartItems={cartItems}/>
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />}>
        </Route>
        <Route path='/Cart' element={<Cart addToCart={addToCart} cartItems={cartItems} deleteQty={deleteQty} decreaseQty={decreaseQty}/>} />
        <Route path='/AdmPanel' element={<ProtectedRoute><AdmPanel/></ProtectedRoute>}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
