// import { useState } from 'react'
import Header from './components/header/Header'
import Footer from './components/footer/Footer'
import Home from './components/BODY/Home'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"


function App() {

  return (
    <>
    {/* <Router> */}
      <Header />
      <Routes>
        <Route path="/" element={<Home />}>
        </Route>
        </Routes>
      <Footer />
      {/* </Router> */}
    </>
  )
}

export default App
