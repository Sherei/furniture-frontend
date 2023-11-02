import React, { useState, useEffect } from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { TbPhoneCall } from "react-icons/tb"
import { AiFillMail } from "react-icons/ai"
import {TiUser} from "react-icons/ti"
import {FaBars,FaUserAlt} from "react-icons/fa"
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

    <div className='container-fluid nav_contact2 ' style={{ backgroundColor: "black" }}>
      <div className='row py-3'>
        <div className='col  d-flex justify-content-center align-items-center gap-sm-2'>
          <a href="tel:00923067208343" target='blak' className='fs-6'>
            <span className='nav_cotact_icon'><TbPhoneCall></TbPhoneCall></span> &nbsp;
            <span className='ml-2'>
              00923067208343
            </span>&nbsp;
          </a>
          <a href="mailto:sharjeelakhtar245@gmail.com" target='blak'>
            <span className='nav_cotact_icon'><AiFillMail></AiFillMail></span>&nbsp;
            <span className='m-0'>sharjeelakhtar245@gmail.com</span>&nbsp;
          </a>
        </div>
      </div>

    </div>
    <div className={`${isSticky ? 'fixed-top navbar-custom' : ''}`} style={{ backgroundColor: "rgb(2, 2, 94)" }}>

    <div className={`py-2 px-5  container-fluid`} style={{ backgroundColor: "rgb(2, 2, 94)" }}>
      <div className="row">
        <div className="cols-12 nav1">
          <NavLink to="/" className="ms-md-2">
            <img className='logo_navbar'
              src="/logo.png"

            />
          </NavLink>
          <div className='nav_cotact'>
            <div>
              <a href="tel:00923067208343" target='blak'>
                <p className='m-0'>Tell: &nbsp;<span className='nav_cotact_icon'><TbPhoneCall></TbPhoneCall></span> </p>
                <p className='m-0'>
                  00923067208343
                </p>
              </a>
            </div>
            <a href="mailto:sharjeelakhtar245@gmail.com" target='blak'>
              <div>
                <p className='m-0'>Mail &nbsp; <span className='nav_cotact_icon'><AiFillMail></AiFillMail></span></p>
                <p className='m-0'>sharjeelakhtar245@gmail.com</p>
              </div>
            </a>
          </div>
          <div className='d-flex align-items-center'>
            <li className="nav-item heart fs-4">
              ❤
            </li>
            {cu._id == undefined &&
              <li className="fs-4 nav-item">
                <NavLink className="nav-link nav-link1" to="/login">
                  <FaUserAlt/>
                </NavLink>
              </li>
            }
            {cu._id != undefined &&
              <>
                {cu.email != "asd@gmail.com" &&
                  <li className="nav-item" >
                    <NavLink className="nav-link" to={`/cart/${cu._id}`}>
                      <span className={`fs-4 ${filterCart.length > 0 ? 'cart-red' : 'cart-white'}`}>
                        <FiShoppingCart />
                      </span>
                    </NavLink>
                  </li>
                }
                <li className="nav-item dropdown">
                  <NavLink className="nav-link dropdown-toggle dropdown-toggle1" to="/" id="navbarDarkDropdownMenuLink1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="/profile.png"
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
    <nav className={`navbar navbar-expand-lg container-fluid`}>
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
          <FaBars/>
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
                <li> <NavLink className="dropdown-item" to="products/sofa-beds">Sofa Beds </NavLink></li>
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
                Mattresses
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

    </div>
  </>
};
