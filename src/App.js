import React, { useState, useEffect } from 'react';
import { Navbar } from './Components/Navbar/Navbar';
import SingleAdd from './Components/SinglePage/SingleAdd';
import { Login } from "./Components/login/Login";
import Signup from "./Components/Signup/Signup"
import { Cart } from "./Components/cart/Cart"
import Home from "./Components/Home/Home"
import Products from './Components/Products/Products';
import Footer from "./Components/Footer/Footer"
import Checkout from './Components/Checkout/Checkout';
import SingleBlog from './Components/Blog/SingleBlog';
import { useDispatch } from "react-redux";
import { RiMessage2Line } from "react-icons/ri"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios"
import Orderplaced from './Components/Placed/Orderplaced';
import UserPanel from './Components/UserPanel/UserPanel';
import OrderDetail from './Components/OrderDetail/OrderDetail';
import Lottie from 'lottie-react';
import Nointernet from "./Components/Animations/Nointernet.json";
import ReactGA from 'react-ga';
import Sidebar from './Components/Dashboard/Sidebar';
import { AddProduct } from './Components/Dashboard/AddProduct';
import AllBlog from './Components/Blog/AllBlog';
import Allcategories from './Components/Home/Allcategories';
import './App.css';
import AddBlog from './Components/Dashboard/AddBlog';
import { inject } from '@vercel/analytics';
// ReactGA.initialize('G-Y946N662J4');
import { TagManager } from 'react-gtm-module';

TagManager.initialize({
  gtmId: 'GTM-MXQ3QL4D' 
});

function App() {
  

  inject();
  
  // ReactGA.event({
  //   category: 'User Interaction',
  //   action: 'Button Click',
  //   label: 'My Button',
  // });


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
    try {
      axios.post(`${process.env.REACT_APP_BASE_URL}/session-check`, { token: localStorage.getItem('userToken') }).then((res) => {
        if (res.data) {
          dispatch({
            type: 'LOGIN_USER',
            payload: res.data,
          });
        }
      });
    } catch (e) {

    }
  }, []);


  if (isOnline) {
    return (
      <>
        <div className='main_body'>

          {/* {showScrollButton && (
            <div className='top_btn' onClick={scrollToTop}>
            Back To Top
            </div>
          )} */}
          {/* <img src="/greeting.svg" className='greeting' /> */}
          <a href='https://wa.me/+447392608087' target="blank">
            <div className='d-flex align-items-center gap-2 whatsapp-btn_main'>
              <div>
                <p className='m-0'>Chat</p>
              </div>
              <div className='whatsapp-btn'>
                <RiMessage2Line />
              </div>

            </div>

          </a>

          <BrowserRouter>
            <Navbar />
            <main>
              <Routes>
                <Route exact path='/' element={<Home />} />
                {/* User */}
                <Route exact path='/signup' element={<Signup />} />
                <Route exact path='/login' element={<Login />} />
                <Route exact path='/login/:productId' element={<Login />} />
                <Route exact path='/user-profile/:userId' element={<UserPanel />} />

                {/* Products */}
                <Route path='/collections' element={<Allcategories />} />
                <Route exact path='/admin-dashboard-add-product' element={<AddProduct />} />
                <Route exact path='/admin-dashboard-add-product/:productId' element={<AddProduct />} />
                <Route exact path='/Products' element={<Products />} />
                <Route exact path='/single_Add/:productId' element={<SingleAdd />} />
                <Route exact path='/Products/:prodctName' element={<Products />} />

                {/* Cart */}
                <Route exact path='/cart/:userId' element={<Cart />} />
                <Route exact path='/cart-checkout/:userId' element={<Checkout />} />

                {/* Order */}
                <Route path='/placed' element={<Orderplaced />} />
                <Route path='/order-placed/:userId' element={<Orderplaced />} />
                <Route path='/order-detail/:OrderId' element={<OrderDetail />} />

                {/* Admin */}
                <Route exact path='/admin-dashboard' element={<Sidebar />} />

                {/* Blog */}
                <Route exact path='/admin-dashboard-add-blog' element={<AddBlog />} />
                <Route exact path='/admin-dashboard-add-blog/:blogId' element={<AddBlog />} />
                <Route path='/blog_detail/:blogId' element={<SingleBlog />} />
                <Route path='/all-blog' element={<AllBlog />} />

                <Route exact path='*' element={<Home />} />

              </Routes>
            </main>
            <Footer />
          </BrowserRouter>
          <ToastContainer
            style={{
              minWidth: "250px",
            }}
            position="top-center"
            autoClose={1500}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
          />
        </div>
      </>
    );
  }
  return (
    <div className='d-flex flex-column justify-content-center align-items-center' style={{ minHeight: '50vh' }}>
      <div>
        <Lottie animationData={Nointernet} loop={true} />;
      </div>
      <button className='btn review_btn' style={{ width: "200px" }} onClick={() => window.location.reload()}>
        Reload
      </button>
    </div>
  );
}

export default App;