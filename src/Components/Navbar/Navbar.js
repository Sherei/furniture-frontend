import React, { useState, useEffect } from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-scroll';
import { NavLink } from 'react-router-dom';
import { toast } from "react-toastify"
import axios from 'axios';
import "./navbar.css";

export const Navbar = () => {

  const move = useNavigate()
  const cu = useSelector(store => store.userSection.cu)
  const dispatch = useDispatch()
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true);
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {

    setLoading(true);
    axios.get(`${process.env.REACT_APP_BASE_URL}/addToCart`).then((res) => {
      try {
        if (res) {
          setCart(res.data);
        }
      } catch (e) {
        // console.log(e);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  const filterCart = cart.filter((item) => item.userId === cu._id)

  function Logout() {
    dispatch({
      type: 'LOGOUT_USER'
    });
    toast.success("Logout");
    move('/login');
  }

  return <>
    <div className={`py-2 bg-white border-bottom ${isSticky ? 'container-fluid' : 'container'}`}>
      <div className="row">
        <div className="cols-12 nav1">
          <NavLink to="/" className="ms-md-2">
            <img className='logo_navbar'
              src="/logo.png"

            />
          </NavLink>
          <div className='d-flex align-items-center'>
            <li className="nav-item heart fs-4">
              ❤
            </li>
            {cu._id == undefined &&
              <li className="fs-4 nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
            }
            {cu._id != undefined &&
              <>
                {cu.email != "asd@gmail.com" &&
                  <li className="nav-item" >
                    <NavLink className="nav-link" to={`/cart/${cu._id}`}>
                      <span className={`fs-4 ${filterCart.length > 0 ? 'cart-red' : ''}`}>
                        <FiShoppingCart />
                      </span>
                    </NavLink>
                  </li>
                }
                <li className="nav-item dropdown">
                  <NavLink className="nav-link dropdown-toggle" to="/" id="navbarDarkDropdownMenuLink1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="/149071-removebg-preview.png"
                      className="img-fluid rounded-3"
                      width={50}
                      height={50}
                      alt=""
                    />
                  </NavLink>
                  <ul className="dropdown-menu" aria-labelledby="navbarDarkDropdownMenuLink">
                    {cu.email != "asd@gmail.com" &&
                      <li><NavLink className="dropdown-item" to={`/user-profile/${cu._id}`}>Profile</NavLink></li>
                    }
                    {cu.email === "asd@gmail.com" &&
                      <li> <NavLink className="dropdown-item" to="/admin-dashboard">Admin </NavLink></li>
                    }
                    <li> <NavLink className="dropdown-item" to="/login" onClick={Logout}>Logout </NavLink></li>
                  </ul>
                </li>
              </>

            }
          </div>
        </div>
      </div>
    </div >

    <nav className={`navbar navbar-expand-lg  ${isSticky ? 'container-fluid fixed-top navbar-custom' : 'container'}`}>
      <div className="container-fluid nav_bg">
        <button
          className="navbar-toggler custom-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <div className='d-flex flex-column gap-1'>
            <span className="navbar-toggler-icon line1"></span>
            <span className="navbar-toggler-icon line2"></span>
            <span className="navbar-toggler-icon line3"></span>
          </div>
        </button>

        <div className="collapse nav_bg navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item nav-item2">
              <NavLink className="nav-link" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item  nav-item2 dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown1"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Sofas
              </a>
              <ul className="dropdown-menu dropdown_nav" aria-labelledby="navbarDropdown1">
                <li> <NavLink className="dropdown-item" to="/products/sofa">All Sofas </NavLink></li>
                <li> <NavLink className="dropdown-item" to="products/ ">Corner Sofas </NavLink></li>
                <li> <NavLink className="dropdown-item" to="products/sofa-sets">Sofa Sets </NavLink></li>
                <li> <NavLink className="dropdown-item" to="products/sofa-beds">Sofa & Beds </NavLink></li>
                <li> <NavLink className="dropdown-item" to="products/two-&-three-seater-sofas">3 & 2 Seater Sofas</NavLink></li>
                <li> <NavLink className="dropdown-item" to="products/fabric-sofas">Fabric sofas</NavLink></li>
                <li> <NavLink className="dropdown-item" to="products/chesterfield-sofas">Chesterfield Sofas </NavLink></li>
                <li> <NavLink className="dropdown-item" to="products/u-shaped-sofas">U Shaped Sofas</NavLink></li>
                <li> <NavLink className="dropdown-item" to="products/leather-sofas">Leather Sofas</NavLink></li>
                <li> <NavLink className="dropdown-item" to="products/recliner-sofas">Recliner Sofas</NavLink></li>
                <li> <NavLink className="dropdown-item" to="products/arm-chair-&-swivel-chair">Arm Chair & Swivel Chair</NavLink></li>
              </ul>
            </li>
            <li className="nav-item nav-item2 dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown2"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Beds
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown2">
                <li> <NavLink className="dropdown-item" to="products/bed">All Beds </NavLink></li>
                <li> <NavLink className="dropdown-item" to="products/ambassador-beds">Ambassador Beds</NavLink></li>
                <li> <NavLink className="dropdown-item" to="products/panel-beds">Panel Beds</NavLink></li>
                <li> <NavLink className="dropdown-item" to="products/wingback-beds-frames">Wingback Bed Frames</NavLink></li>
                <li> <NavLink className="dropdown-item" to="products/ottoman-beds">Ottoman Beds</NavLink></li>
                <li> <NavLink className="dropdown-item" to="products/bespoke-beds">Bespoke Beds</NavLink></li>
                <li> <NavLink className="dropdown-item" to="products/chesterfield-beds">Chesterfield Beds</NavLink></li>
                <li> <NavLink className="dropdown-item" to="products/divan-beds">Divan Beds</NavLink></li>
              </ul>
            </li>
            <li className="nav-item nav-item2">
              <NavLink className="nav-link" aria-current="page" to="/products/ottoman-box">
                Ottoman Box
              </NavLink>
            </li>
            <li className="nav-item nav-item2">
              <NavLink className="nav-link" aria-current="page" to="/footstools">
                Footstools
              </NavLink>
            </li>
            <li className="nav-item nav-item2">
              <NavLink className="nav-link" aria-current="page" to="/products/mattress">
                Mattress
              </NavLink>
            </li>
            <li className="nav-item nav-item2">
              <Link className="nav-link" aria-current="page" to="review">
                Reviews
              </Link>
            </li>
            <li className="nav-item nav-item2">
              <NavLink className="nav-link" aria-current="page" to="/faq">
                FAQ's
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>


  </>
};
