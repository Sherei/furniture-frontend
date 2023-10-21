import React, { useState, useEffect } from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { FaUser, FaWhatsapp } from "react-icons/fa";
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
            <img
              src="/logo2.svg"
              height={35}
            />
          </NavLink>
          <div className='d-flex align-items-center'>
            <li className="nav-item fs-4">
              <a className="nav-link" href='https://wa.me/+923067208343' target="blank">
                <FaWhatsapp />
              </a>
            </li>
            {cu._id == undefined &&
              <li className="fs-4 nav-item">
                <NavLink className="nav-link" to="/login">
                  <FaUser />
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
                  <ul className="dropdown-menu dropdown_menu2" aria-labelledby="navbarDarkDropdownMenuLink">
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

    <div className={`mb-1 ${isSticky ? 'container-fluid fixed-top navbar-custom' : 'container'}`}>
      <div className="row">
        <nav className="navbar navbar-expand-lg p-0">

          <button
            className="navbar-toggler custom-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDarkDropdown"
            aria-controls="navbarNavDarkDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <div className='d-flex flex-column gap-1'>
              <span className="navbar-toggler-icon line1"></span>
              <span className="navbar-toggler-icon line2"></span>
              <span className="navbar-toggler-icon line3"></span>
            </div>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDarkDropdown">
            <ul className="navbar-nav">
              <li className="nav-item2">
                <NavLink className="nav-link" to="/" role="button">
                  Home
                </NavLink>
              </li>
              <li className="nav-item2 dropdown" >
                <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDarkDropdownMenuLink1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Sofas
                </NavLink>
                <ul className="dropdown-menu" style={{ textTransform: "capitalize" }} aria-labelledby="navbarDarkDropdownMenuLink"
                  onClick={() => move('/products/sofa')}>
                  <li> <NavLink className="dropdown-item" to="/products/sofa">All in sofas </NavLink></li>
                  <li> <NavLink className="dropdown-item" >Corner Sofas </NavLink></li>
                  <li> <NavLink className="dropdown-item" >Sofa Sets </NavLink></li>
                  <li> <NavLink className="dropdown-item" >Three & Two Seater Sofas</NavLink></li>
                  <li> <NavLink className="dropdown-item" >Fabric sofas </NavLink></li>
                  <li> <NavLink className="dropdown-item" >Chesterfield Sofas </NavLink></li>
                  <li> <NavLink className="dropdown-item" >U Shaped Sofas</NavLink></li>
                  <li> <NavLink className="dropdown-item" >Leather Sofas</NavLink></li>
                  <li> <NavLink className="dropdown-item" >Recliner Sofas</NavLink></li>
                  <li> <NavLink className="dropdown-item" >Arm Chair & Sweet Chair </NavLink></li>
                </ul>
              </li>
              <li className="nav-item2 dropdown">
                <NavLink className="nav-link dropdown-toggle" to="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Beds
                </NavLink>
                <ul className="dropdown-menu" style={{ textTransform: "capitalize" }} aria-labelledby="navbarDarkDropdownMenuLink"
                  onClick={() => move('/products/bed')}>
                  <li> <NavLink className="dropdown-item" to={`products/bed`}>All in beds </NavLink></li>
                  <li> <NavLink className="dropdown-item" to="#">Ambassador Beds</NavLink></li>
                  <li> <NavLink className="dropdown-item" to="#">Panel Beds</NavLink></li>
                  <li> <NavLink className="dropdown-item" to="#">Wingback Bed Frames</NavLink></li>
                  <li> <NavLink className="dropdown-item" to="#">Ottoman Beds</NavLink></li>
                  <li> <NavLink className="dropdown-item" to="#">Bespoke Beds</NavLink></li>
                  <li> <NavLink className="dropdown-item" to="#">Chesterfield Beds</NavLink></li>
                  <li> <NavLink className="dropdown-item" to="#">Divan Beds</NavLink></li>
                </ul>
              </li>

              <li className="nav-item2">
                <NavLink className="nav-link" to="/Products/all" role="button">
                  Mattress
                </NavLink>
              </li>
              <li className="nav-item2">
                <NavLink className="nav-link" to="/Products/all" role="button">
                  Foot Stools & Puffs
                </NavLink>
              </li>
              {/* <li className="nav-item2">
                <NavLink className="nav-link" to="/Products/all" role="button">
                  Automon Box
                </NavLink>
              </li> */}
              <li className="nav-item2">
                <Link className="nav-link" to="review" role="button" >
                  Reviews
                </Link>
              </li>
              <li className="nav-item2">
                <NavLink className="nav-link" to="/faq" role="button">
                  FAQ's
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>

  </>
};
