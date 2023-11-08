import React, { useState, useEffect } from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { TbPhoneCall } from "react-icons/tb"
import { AiFillMail } from "react-icons/ai"
import { FaRegUser, FaRegHeart, FaAngleDown } from "react-icons/fa"
import { RxCross1 } from "react-icons/rx"
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-scroll';
import { NavLink } from 'react-router-dom';
import { toast } from "react-toastify"
import axios from 'axios';
import { useForm } from 'react-hook-form';
import "./navbar.css";

export const Navbar = () => {

  const move = useNavigate()
  const cu = useSelector(store => store.userSection.cu)
  const dispatch = useDispatch()
  const [cart, setCart] = useState([])
  const [loading, setLoading] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [login, setLogin] = useState("close");
  const [Error, setError] = useState("");

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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const Login = async (data) => {
    console.log("hello")
    try {

      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, data);

      let loginUser = response.data;

      if (loginUser) {

        localStorage.setItem('userToken', loginUser.myToken);

        dispatch({
          type: "LOGIN_USER",
          payload: loginUser.user,
        });

        if (loginUser.user.email === "asd@gmail.com") {
          toast.success("Welcome Back Dear Admin");
          move('/admin-dashboard');
          reset();
        } else {
          toast.success("Welcome back dear");
          move("/products/all");
          reset();
        }
      }
    } catch (e) {
      if (e.response && e.response.status === 404) {
        setError("Invalid Credentials")

      } else {
        setError("Invalid Credentials")
      }
    }
  };

  const filterCart = cart?.filter((item) => item.userId === cu._id)

  function Logout() {
    dispatch({
      type: 'LOGOUT_USER'
    });
    toast.success("Logout");
  }

  return <>

    <div className='container-fluid nav_contact2 ' style={{ backgroundColor: "#F7EEDD" }}>
      <div className='row py-2'>
        <div className='col  d-flex justify-content-center align-items-center gap-sm-2'>
          <a href="tel:00923067208343" target='blak' className='fs-6'>
            <span className='nav_cotact_icon' style={{ color: "rgb(2, 2, 94)" }}><TbPhoneCall></TbPhoneCall></span> &nbsp;
            <span className='ml-2' style={{ color: "rgb(2, 2, 94)" }}>
              00923067208343
            </span>&nbsp;
          </a>
          <a href="mailto:sharjeelakhtar245@gmail.com" target='blak'>
            <span className='nav_cotact_icon' style={{ color: "rgb(2, 2, 94)" }}><AiFillMail></AiFillMail></span>&nbsp;
            <span className='m-0' style={{ color: "rgb(2, 2, 94)" }}>sharjeelakhtar245@gmail.com</span>&nbsp;
          </a>
        </div>
      </div>

    </div>


    <div className={`${isSticky ? 'fixed-top navbar-custom' : ''}`} style={{ backgroundColor: "rgb(2, 2, 94)" }}>

      <div className={`py-2 nav_padding container-fluid`} style={{ backgroundColor: "rgb(2, 2, 94)" }}>
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
              <li className="nav-item heart fs-2">
                <FaRegHeart />
              </li>
              <li className="nav-item" onClick={() => {
                if (cu._id === undefined) {
                  setLogin("login")
                  toast.warning("Login to see your Cart")

                } else if (cu.email === "asd@gmail.com") {
                  toast.warning("Login too see cart")
                } else {
                  move(`/cart/${cu._id}`)
                }

              }}  >
                <NavLink className="nav-link nav-link1" style={{ border: "none" }}>
                  <span className={`fs-2 ${filterCart?.length > 0 ? 'cart-red' : 'cart-white'}`}>
                    <FiShoppingCart />
                  </span>
                </NavLink>
              </li>
              {cu._id == undefined &&
                <li className="nav-item">
                  <NavLink className="nav-link nav-link1" style={{ border: "none" }}>
                    <div className='fs-2' onClick={() => { setLogin("login") }}>
                      <FaRegUser />
                    </div>
                    {login === "login" &&
                      <div className='login_div p-4'>
                        <div className='d-flex justify-content-end' style={{ color: "black" }} onClick={() => { setLogin("close") }}><RxCross1 /></div>
                        <div>
                          <p className='m-0 fs-5 text-center fw-bolder mt-2'>Login to my Account</p>
                        </div>
                        <form action="" onSubmit={handleSubmit(Login)}>
                          {Error === "Invalid Credentials" &&
                            <div className='error'> Invalid Credentials </div>
                          }
                          <div style={{ position: "relative" }} className='mt-3'>
                            <input type="text" className="form-control login_form_input" placeholder='E-mail' {...register('email', {
                              required: true, validate: function (typedValue) {
                                if (typedValue.match(
                                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                )) {
                                  return true;
                                } else {
                                  return false;
                                }
                              }
                            })} />
                            {errors.email ? <div className='error'> Please Enter Your Valid Email </div> : null}

                          </div>

                          <div style={{ position: "relative" }} className='mt-3'>
                            <input type="password" className="form-control login_form_input" placeholder='Password'{...register('password', { required: true, })} />
                            {errors.password ? <div className='error'> Please Enter Your Password </div> : null}

                          </div>
                          <button className='btn rounded login_btn mt-3' onClick={handleSubmit(Login)}>Login</button>
                          <div className='mt-3'>
                            <p className='m-0 fs-6'>
                              I don't have an account?{' '}
                              <NavLink to="/signup">
                                <span className="register_btn" onClick={() => {
                                  setLogin('close')
                                }} >
                                  Register
                                </span>
                              </NavLink>

                            </p>
                          </div>
                        </form>
                      </div>
                    }
                  </NavLink>
                </li>
              }

              {cu._id != undefined &&
                <>

                  <li className="nav-item dropdown">
                    <NavLink className="nav-link dropdown-toggle dropdown-toggle1 px-lg-0 px-3" to="/" id="navbarDarkDropdownMenuLink1" role="button" data-bs-toggle="dropdown" aria-expanded="false"
                      style={{ borderBottom: "none" }}>
                      <img src="/profile.png"
                        className="nav_image"
                        alt=""

                      />
                    </NavLink>
                    <ul className="dropdown-menu" aria-labelledby="navbarDarkDropdownMenuLink">
                      {cu?.email != "asd@gmail.com" &&
                        <li><NavLink className="dropdown-item" to={`/user-profile/${cu._id}`}>Profile</NavLink></li>
                      }
                      {cu?.email === "asd@gmail.com" &&
                        <li> <NavLink className="dropdown-item" to="/admin-dashboard">Admin </NavLink></li>
                      }
                      <li> <NavLink className="dropdown-item" to="/" onClick={Logout}>Logout </NavLink></li>
                    </ul>
                  </li>
                </>

              }
            </div>
          </div>
        </div>
      </div >
      <nav className={`navbar navbar-expand-lg container-fluid`}>
        <div className="container-fluid nav_bg p-0">
          <button
            className={`custom-toggler ${isMenuOpen ? 'cross' : ''}`}
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={toggleMenu}
          >
            <div className='d-flex flex-column gap-1 lines'>
              <div className={`line1 ${isMenuOpen ? 'cross-line1' : ''}`}></div>
              <div className={`line2 ${isMenuOpen ? 'cross-line2' : ''}`}></div>
              <div className={`line3 ${isMenuOpen ? 'cross-line3' : ''}`}></div>
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
                  className="nav-link d-flex justify-content-between gap-1"
                  href="#"
                  id="navbarDropdown1"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div>
                    <p className='m-0'>Sofas</p>
                  </div>
                  <div>
                    <FaAngleDown />
                  </div>
                </a>
                <ul className="dropdown-menu dropdown_nav" aria-labelledby="navbarDropdown1">
                  <li> <NavLink className="dropdown-item" to="/products/sofa">All Sofas </NavLink></li>
                  <li> <NavLink className="dropdown-item" to="products/corner-sofas">Corner Sofas </NavLink></li>
                  <li> <NavLink className="dropdown-item" to="products/sofa-sets">Sofa Sets </NavLink></li>
                  <li> <NavLink className="dropdown-item" to="products/sofa-beds">Sofa Beds </NavLink></li>
                  <li> <NavLink className="dropdown-item" to="products/three-&-two-seater-sofas">3 & 2 Seater Sofas</NavLink></li>
                  <li> <NavLink className="dropdown-item" to="products/fabric-sofas">Fabric sofas</NavLink></li>
                  <li> <NavLink className="dropdown-item" to="products/chesterfield-sofas">Chesterfield Sofas </NavLink></li>
                  <li> <NavLink className="dropdown-item" to="products/u-shaped-sofas">U Shaped Sofas</NavLink></li>
                  <li> <NavLink className="dropdown-item" to="products/leather-sofas">Leather Sofas</NavLink></li>
                  <li> <NavLink className="dropdown-item" to="products/recliner-sofas">Recliner Sofas</NavLink></li>
                  <li> <NavLink className="dropdown-item" to="products/arm-chair-&-swivel-chair">Arm Chair & Swivel Chair</NavLink></li>
                </ul>
              </li>
             
              <li className="nav-item nav-item2">
                <NavLink className="nav-link" aria-current="page" to="/products/ottoman-box">
                  Corner Sofas
                </NavLink>
              </li>
              <li className="nav-item nav-item2">
                <NavLink className="nav-link" aria-current="page" to="/products/ottoman-box">
                  3+2 Sofa Sets
                </NavLink>
              </li>
              <li className="nav-item nav-item2 dropdown">
                <a
                  className="nav-link d-flex justify-content-between gap-1"
                  href="#"
                  id="navbarDropdown2"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                 <div>
                    <p className='m-0'>Beds</p>
                  </div>
                  <div>
                    <FaAngleDown />
                  </div>
                </a>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown2">
                  <li> <NavLink className="dropdown-item" to="products/bed">All Beds </NavLink></li>
                  <li> <NavLink className="dropdown-item" to="products/ambassador-beds">Ambassador Beds</NavLink></li>
                  <li> <NavLink className="dropdown-item" to="products/panel-bed">Panel Beds</NavLink></li>
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
                <NavLink className="nav-link" aria-current="page" to="/products/footstools">
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
