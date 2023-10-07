import React, { useState, useEffect } from 'react';
import { Navbar } from './Components/Navbar/Navbar';
import { Login } from "./Components/login/Login";
import { Cart } from "./Components/cart/Cart"
import { Error } from "./Components/Error/Error"
import Home from "./Components/Home/Home"
import Products from './Components/Products/Products';
import Footer from "./Components/Footer/Footer"
import SingleAdd from './Components/SinglePage/SingleAdd';
import Checkout from './Components/Checkout/Checkout';
import { useDispatch } from "react-redux";
import { BsWhatsapp } from "react-icons/bs";
import { FaArrowUp } from "react-icons/fa";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import './App.css';
import { Dashboard } from './Components/Dashboard/Dashboard';
import Orderplaced from './Components/Placed/Orderplaced';
import UserPanel from './Components/UserPanel/UserPanel';
import OrderDetail from './Components/OrderDetail/OrderDetail';
import Loader from './Components/Loader/Loader';
import Lottie from 'lottie-react';
import Nointernet from "./Components/Animations/Nointernet.json";
import ReactGA from 'react-ga';
ReactGA.initialize('G-D838NQZVCN');

function App() {


  ReactGA.event({
    category: 'User Interaction',
    action: 'Button Click',
    label: 'My Button',
  });


  const [showScrollButton, setShowScrollButton] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    function onlineHandler() {
      setIsOnline(true);
    }

    function offlineHandler() {
      setIsOnline(false);
    }

    window.addEventListener('online', onlineHandler);
    window.addEventListener('offline', offlineHandler);

    return () => {
      window.removeEventListener('online', onlineHandler);
      window.removeEventListener('offline', offlineHandler);
    };
  }, []);

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
      behavior: 'smooth',
    });
  };

  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .post(`${process.env.REACT_APP_BASE_URL}/session-check`, {
        token: localStorage.getItem('userToken'),
      })
      .then((res) => {
        if (res.data) {
          dispatch({
            type: 'LOGIN_USER',
            payload: res.data,
          });
        }
      });
  }, [dispatch]);

  if (isOnline) {
    return (
      <>
        <div className='main_body'>
          <div className='btns'>
            {showScrollButton && (
              <div className='top_btn' onClick={scrollToTop}>
                <FaArrowUp />
              </div>
            )}

            <a href='https://wa.me/+923067208343'>
              <div className='whatsapp-btn'>
                <BsWhatsapp />
              </div>
            </a>
          </div>

          <BrowserRouter>
            <Navbar />
            <main>
              <Routes>
                <Route exact element={<Home />} path='/' />
                <Route exact element={<UserPanel />} path='/user-profile/:userId' />
                <Route exact path='/single_Add/:productId' element={<SingleAdd />} />
                <Route exact path='/Products/:prodctName' element={<Products />} />
                <Route exact path='/cart' element={<Cart />} />
                <Route exact path='/cart/:userId' element={<Cart />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/cart-checkout/:userId' element={<Checkout />} />
                <Route exact path='/admin-dashboard' element={<Dashboard />} />
                <Route path='/placed' element={<Orderplaced />} />
                <Route path='/order-placed/:userId' element={<Orderplaced />} />
                <Route path='/order-detail/:OrderId' element={<OrderDetail />} />
                <Route exact path='*' element={<Error />} />
              </Routes>
            </main>
            <Footer />
          </BrowserRouter>
          <ToastContainer />
        </div>
      </>
    );
  }
  return (
    <div className='d-flex flex-column justify-content-center align-items-center' style={{ minHeight: '50vh' }}>
      <div>
        <Lottie animationData={Nointernet} loop={true} />;
      </div>
      <button className='btn review_btn' onClick={() => window.location.reload()}>
        Reload
      </button>
    </div>
  );
}

export default App;