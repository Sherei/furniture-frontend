import React, { useState, useEffect } from 'react';
import { Navbar } from './Components/Navbar/Navbar';
import { Login } from "./Components/login/Login";
import { Signup } from "./Components/signup/Signup";
import { Cart } from "./Components/cart/Cart"
import {Error} from "./Components/Error/Error"
import Home from "./Components/Home/Home"
import Products from './Components/Products/Products';
import Footer from "./Components/Footer/Footer"
import SingleAdd from './Components/SinglePage/SingleAdd';
import Checkout from './Components/Checkout/Checkout';
import { useDispatch, useSelector } from "react-redux";
import { BsWhatsapp } from "react-icons/bs";
import { FaArrowUp} from "react-icons/fa";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import './App.css';
import { Dashboard } from './Components/Dashboard/Dashboard';

function App() {
 

  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {

    const handleScroll = () => {
      if (window.pageYOffset > 0) {
        setShowScrollButton(true);
      } else {
        setShowScrollButton(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  
  let cu = useSelector(store => store.userSection.cu)
  let dispatch = useDispatch()

  useEffect(function () {

    axios.post('https://my-furniture-tau.vercel.app//session-check', { token: localStorage.getItem('userToken') }).then(function (res) {
      if (res.data) {
        dispatch({
          type: "LOGIN_USER",
          payload: res.data
        })
      }
    })

  }, [])


  return <div className='main_body'>
    <div className='btns'>
      {showScrollButton && (
        <div className='top_btn' onClick={scrollToTop}>
          <FaArrowUp />
        </div>
      )}
      
      <a href="https://wa.me/+447392608087">

        <div className='whatsapp-btn'>
          <BsWhatsapp />
        </div>
      </a>
    </div>

    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route exact element={<Home />} path="/"></Route>
          <Route exact path="/single_Add/:productId" element={<SingleAdd/>} />
          <Route exact path="/Products/:prodctName" element={<Products />} />
          <Route exact path="/cart" element={<Cart />}></Route>
          <Route exact path="/login" element={<Login />}></Route>
          <Route exact path="/signup" element={<Signup />}></Route>
          <Route exact path="/checkout" element={<Checkout />}></Route>
          <Route exact path="/dashboard" element={<Dashboard />}></Route>
          <Route exact path="*" element={<Error />}></Route>

        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
    <ToastContainer></ToastContainer>

  </div>
}

export default App;
