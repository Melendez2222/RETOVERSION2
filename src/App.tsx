import { useEffect, useState } from 'react'
import Header from './components/Common/header/Header'
import Footer from './components/Common/footer/Footer'
import Home from './components/BODY/Home'
import './App.css'
import {Routes, Route } from "react-router-dom"
import Cart from './components/BODY/Cart'
import { Product } from './components/BODY/Interfaces'
import AdmPanel from './components/BODY/AdmPanel'
import ProtectedRoute from './route/ProtectedRoute'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from './Redux'
import { addToCart, decreaseQty, deleteQty, setCartItems } from './Redux/cartSlice'


function App() {
  // const [cartItems, setCartItems] = useState<any[]>([]);
  // const addToCart = (product: Product) => {
  //   setCartItems(prevItems => {
  //     const productExists = prevItems.find(item => item.id_Product === product.id_Product);
  //     if (productExists) {
  //       return prevItems.map(item =>
  //         item.id_Product === product.id_Product ? { ...productExists, qty: (productExists.qty || 0) + 1 } : item
  //       );
  //     } else {
  //       return [...prevItems, { ...product, qty: 1 }];
  //     }
  //   });
  // };

  // const deleteQty = (product: Product) => {
  //   setCartItems(prevItems => prevItems.filter(item => item.id_Product !== product.id_Product));
  // };

  // const decreaseQty = (product: Product) => {
  //   setCartItems(prevItems => {
  //     const productExists = prevItems.find(item => item.id_Product === product.id_Product);
  //     if (productExists) {
  //       if (productExists.qty === 1) {
  //         return prevItems.filter(item => item.id_Product !== product.id_Product);
  //       } else {
  //         return prevItems.map(item =>
  //           item.id_Product === product.id_Product ? { ...productExists, qty: (productExists.qty || 0) - 1 } : item
  //         );
  //       }
  //     }
  //     return prevItems;
  //   });
  // };
  // const cartItems = useSelector((state: RootState) => state.cart.items);
  // const dispatch: AppDispatch = useDispatch();

  // const handleAddToCart = (product: Product) => {
  //   dispatch(addToCart(product));
  // };

  // const handleDeleteQty = (product: Product) => {
  //   dispatch(deleteQty(product.id_Product));
  // };

  // const handleDecreaseQty = (product: Product) => {
  //   dispatch(decreaseQty(product.id_Product));
  // };
  //const cartItems = useSelector((state: RootState) => state.cart.items);
  const dispatch: AppDispatch = useDispatch();
  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === 'cartItems') {
        const updatedCartItems = JSON.parse(event.newValue || '[]');
        dispatch(setCartItems(updatedCartItems));
      }
    };

    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [dispatch]);
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home/>}>
        </Route>
        <Route path='/Cart' element={<Cart/>} />
        <Route path='/AdmPanel' element={<ProtectedRoute><AdmPanel/></ProtectedRoute>}/>
      </Routes>
      <Footer />
    </>
  )
}

export default App
