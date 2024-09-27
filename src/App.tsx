import { useEffect } from 'react'
import Header from './components/Common/header/Header'
import Footer from './components/Common/footer/Footer'
import Home from './components/BODY/Home'
import './App.css'
import {Routes, Route } from "react-router-dom"
import Cart from './components/BODY/Cart'
import AdmPanel from './components/BODY/AdmPanel'
import ProtectedRoute from './route/ProtectedRoute'
import { useDispatch } from 'react-redux'
import { AppDispatch } from './Redux'
import {  setCartItems } from './Redux/cartSlice'


function App() {
  
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
