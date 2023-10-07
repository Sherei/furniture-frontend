import React, { useState, useEffect } from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { FaUser, FaWhatsapp } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
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
          <Link to="/" className="ms-md-2">
            <img
              src="/logo2.svg"
              height={35}
            />
          </Link>
          <div className='d-flex align-items-center'>
            <li className="nav-item fs-4">
              <Link className="nav-link" to="/login">
                <FaWhatsapp />
              </Link>
            </li>
            {cu._id == undefined &&
              <li className="fs-4 nav-item">
                <Link className="nav-link" to="/login">
                  <FaUser />
                </Link>
              </li>
            }
            {cu._id != undefined &&
              <>
                {cu.email != "asd@gmail.com" &&
                  <li className="nav-item" >
                    <Link className="nav-link" to={`/cart/${cu._id}`}>
                      <span className={`fs-4 ${filterCart.length > 0 ? 'cart-red' : ''}`}>
                        <FiShoppingCart />
                      </span>
                    </Link>
                  </li>
                }
                <li className="nav-item dropdown">
                  <Link className="nav-link dropdown-toggle" to="/" id="navbarDarkDropdownMenuLink1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="/149071-removebg-preview.png"
                      className="img-fluid rounded-3"
                      width={50}
                      height={50}
                      alt=""
                    />
                  </Link>
                  <ul className="dropdown-menu dropdown_menu2" aria-labelledby="navbarDarkDropdownMenuLink">
                    {cu.email != "asd@gmail.com" &&
                      <li><Link className="dropdown-item" to={`/user-profile/${cu._id}`}>Profile</Link></li>
                    }
                    {cu.email === "asd@gmail.com" &&
                      <li><Link className="dropdown-item" to="/admin-dashboard">Admin</Link></li>
                    }
                    <li><Link className="dropdown-item" to="/login" onClick={Logout}>Logout</Link></li>
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
                <Link className="nav-link" to="/" role="button">
                  Home
                </Link>
              </li>
              <li className="nav-item2 dropdown" >
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDarkDropdownMenuLink1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Sofas
                </Link>
                <ul className="dropdown-menu" style={{ textTransform: "capitalize" }} aria-labelledby="navbarDarkDropdownMenuLink"
                onClick={()=>move('/products/sofa')}>
                  <li><Link className="dropdown-item" to="/products/sofa">All in sofas</Link></li>
                  <li><Link className="dropdown-item" >fabric corner sofas</Link></li>
                  <li><Link className="dropdown-item" >fabric recliner sofas</Link></li>
                  <li><Link className="dropdown-item" >fabric sofa sets</Link></li>
                  <li><Link className="dropdown-item" >leather recliner corner sofas</Link></li>
                  <li><Link className="dropdown-item" >leather recliner sofas</Link></li>
                  <li><Link className="dropdown-item" >leather recliner sofa sets</Link></li>
                </ul>
              </li>
              <li className="nav-item2 dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Beds
                </Link>
                <ul className="dropdown-menu" style={{ textTransform: "capitalize" }} aria-labelledby="navbarDarkDropdownMenuLink"
                onClick={()=> move('/products/bed')}>
                  <li><Link className="dropdown-item" to={`products/bed`}>All in beds</Link></li>
                  <li><Link className="dropdown-item" to="#">Ambassador Beds</Link></li>
                  <li><Link className="dropdown-item" to="#">Bespoke Beds</Link></li>
                  <li><Link className="dropdown-item" to="#">Chesterfield Beds</Link></li>
                  <li><Link className="dropdown-item" to="#">Ottoman Beds</Link></li>
                  <li><Link className="dropdown-item" to="#">Panel Beds</Link></li>
                  <li><Link className="dropdown-item" to="#">Wingback bed Frames</Link></li>
                  <li><Link className="dropdown-item" to="#">Luxuy Beds</Link></li>
                  <li><Link className="dropdown-item" to="#">Wall Panel Beds Frame</Link></li>
                </ul>
              </li>

              <li className="nav-item2">
                <Link className="nav-link" to="/Products/all" role="button">
                  Wardrobes
                </Link>
              </li>
              <li className="nav-item2">
                <Link className="nav-link" to="/Products/all" role="button">
                  Mattress
                </Link>
              </li>
              <li className="nav-item2">
                <Link className="nav-link" to="/Products/all" role="button" >
                  Dinning
                </Link>
              </li>
              <li className="nav-item2">
                <Link className="nav-link" to="/Products/all" role="button" >
                  Products
                </Link>
              </li>
              <li className="nav-item2">
                <Link className="nav-link" to="/Products/all" role="button">
                  FAQ's
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>

  </>
};
