import React, { useState, useEffect } from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { TbPhoneCall } from "react-icons/tb"
import { AiFillMail } from "react-icons/ai"
import { FaRegUser, FaSearch, FaAngleDown, FaArrowRight, FaHeart } from "react-icons/fa"
import { IoSearchSharp } from "react-icons/io5";
import { RxCross1 } from "react-icons/rx"
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { Link } from 'react-scroll';
import { NavLink } from 'react-router-dom';
import { toast } from "react-toastify"
import axios from 'axios';
import { useForm } from 'react-hook-form';
import Lottie from 'lottie-react';
import CartAnimation from "../Animations/CartAnimation.json"
import "./navbar.css";

export const Navbar = () => {

  const move = useNavigate()

  const cu = useSelector(store => store.userSection.cu)

  const cartItems = useSelector(store => store.Cart.cart.filter(item => item.userId === cu._id));
  const cartLength = cartItems.length;

  const dispatch = useDispatch()
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([])
  const [open, setOpen] = useState("close");
  const [Error, setError] = useState("");
  const [searchValue, setSearchValue] = useState("")
  const [loading, setLoading] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const [login, setLogin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [search, setSearch] = useState(false)

  const handleSearchToggle = () => {
    setSearch(!search);
  };
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const toggleLogin = () => {
    setLogin(!login);
  };

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
      } finally {
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_BASE_URL}/product`).then((res) => {
      try {
        if (res) {
          setProducts(res.data);
        }
      } catch (e) {
        // Handle any errors here
      } finally {
        setLoading(false);
      }
    });
  }, []);
  
  useEffect(() => {

    const filtered = products?.filter((product) => {
      const searchResult = searchValue?.toLowerCase();
      const title = product?.title?.toLowerCase();
      const category = product?.category?.toLowerCase();
      const subCategory = product?.subCategory?.toLowerCase();
      const titleMatch = title?.includes(searchResult);
      const categoryMatch = category?.includes(searchResult);
      const subCategoryMatch = subCategory?.includes(searchResult);
  
      return titleMatch || categoryMatch || subCategoryMatch;
    });
  
    setFilteredProducts(filtered);
  }, [searchValue]);
  

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const Login = async (data) => {
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

  const filterCartLength = filterCart.length
  const subtotal = filterCart.reduce((acc, item) => acc + item.total, 0);


  const DeleteCartItem = (itemId) => {
    try {
      axios.delete(`${process.env.REACT_APP_BASE_URL}/deleteCart?id=${itemId}`).then(() => {
        setCart(cart.filter((data) => itemId !== data._id));
        dispatch({
          type: "REMOVE_CART",
          payload: itemId,
        });
        toast.success("Item removed");
      });

    } catch (e) {
      // console.log(e)
    } finally {
      setLoading(false);
    }
  };

  function Logout() {
    dispatch({
      type: 'LOGOUT_USER'
    });
    toast.success("Logout");
    move('/login')
  }

  return <>

    {open === "open" && (
      <div className={`side_cart ${open === "open" ? "side_open" : ""}`}>
        <div className='pt-3 d-flex flex-column justify-content-between min-vh-100' style={{ position: "relative" }}>
          <div className=''>
            <div className='px-2 d-flex justify-content-between' style={{ height: "fit-content" }}>
              <p className='fw-bolder fs-5 m-0'>SHOPPING CART</p>
              <button className='m-0 side_cart_cross' onClick={() => setOpen("close")}><RxCross1 /> CLOSE</button>
            </div>
            {filterCart.length === 0 ? (
              <div className='py-0 mb-5 d-flex flex-column align-items-center justify-content-center' style={{ height: '80vh' }}>
                <Lottie animationData={CartAnimation} loop={true} style={{ width: "100%", height: "100%" }} />
                <button
                  className='btn review_btn'
                  style={{ width: "fit-content" }}
                  onClick={() => {
                    move('/Products/all');
                    setOpen('close');
                  }}
                >
                  Browse Products <FaArrowRight />
                </button>
              </div>
            ) : (
              <>
                {filterCart?.map((item, index) => {
                  return <div className='px-2 mt-4 py-2 d-flex gap-2' key={index}
                    style={{
                      maxWidth: "320px",
                      position: "relative",
                      boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px"
                    }}
                  >
                    <div className='side_img_main' style={{ width: "100px", minHeight: "80px" }}>
                      <img src={item?.image} alt="No Network" style={{ width: "100%", height: "100%" }} />
                    </div>
                    <div className='d-flex gap-2 justify-content-between' style={{ width: "220px", maxHeight: "100px" }}>
                      <div className='d-flex flex-column justify-content-around'>
                        <p className='m-0' style={{ fontSize: "13px" }}>{item?.title}</p>
                        <p className='m-0 fw-bolder' style={{ color: "red" }}>&pound;{item?.total}</p>
                      </div>
                      <button className='side_remove text-danger' onClick={() => DeleteCartItem(item._id)}><RxCross1 /></button>
                    </div>
                  </div>
                }
                )}
              </>
            )}
          </div>

          {(filterCart?.length > 0) &&
            <div className='' style={{ height: "fit-content" }}>
              <div className='d-flex justify-content-between fw-bolder fs-5'>
                <p className=''>Subtotal</p>
                <p>&pound;{subtotal}</p>
              </div>
              <button className='btn'
                style={{
                  backgroundColor: "#1b2950",
                  color: "white",
                  fontWeight: "500",
                  width: "100%"
                }}
                onClick={() => {
                  if (cu._id === undefined) {
                    setLogin("login")
                    toast.warning("Login to see your Cart")
                  } else if (cu.email === "asd@gmail.com") {
                    toast.warning("Login too see cart")
                  } else {
                    setOpen("close")
                    move(`/cart/${cu._id}`)
                  }
                }}>VIEW CART</button>
              <button className='btn mt-3'
                style={{
                  backgroundColor: "#8B0000",
                  color: "white",
                  fontWeight: "500",
                  width: "100%"
                }}
                onClick={() => {
                  setOpen("close")
                  move(`/cart-checkout/${cu._id}`)
                }}
              >
                Check Out
              </button>
              {/* <a href="https://wa.me/+923067208343" target='black'>

                <button className='btn' style={{ backgroundColor: "rgb(38,211,103)", color: "white", fontWeight: "500" }}>Order Via WhatsApp</button>
              </a> */}
            </div>
          }
        </div>
      </div>
    )}

    <div className='container-fluid nav_contact2' style={{ backgroundColor: "#F7EEDD" }}>
      <div className='row py-2'>
        <div className='col d-flex justify-content-center align-items-center gap-lg-5 gap-md-5 gap-2 '>
          <a href="tel:00923067208343" target='blank' className='fs-6'>
            <span className='nav_cotact_icon' style={{ color: "rgb(2, 2, 94)" }}><TbPhoneCall /></span> &nbsp;
            <span className='ml-2' style={{ color: "rgb(2, 2, 94)" }}>
              00923067208343
            </span>&nbsp;
          </a>
          <a href="mailto:sharjeelakhtar245@gmail.com" target='blank'>
            <span className='nav_cotact_icon' style={{ color: "rgb(2, 2, 94)" }}><AiFillMail /></span>&nbsp;
            <span className='m-0 text-lowercase' style={{ color: "rgb(2, 2, 94)" }}>sharjeelakhtar245@gmail.com</span>&nbsp;
          </a>
        </div>
      </div>

    </div>

    <div style={{ position: "relative" }}>
      <div className={`${isSticky ? 'fixed-top navbar-custom' : ''}`} style={{ backgroundColor: "rgb(2, 2, 94)", minHeight: "75px" }}>
        <div className={`py-2 nav_padding container-fluid`} style={{ backgroundColor: "rgb(2, 2, 94)" }}>
          <div className="row">
            <div className="col nav1">
              <div className='row nav1_row'>
                <div className='col-3 d-flex align-items-center'>
                  <NavLink to="/" className="ms-md-2">
                    <img className='logo_navbar'
                      src="/logo.png"
                    />
                  </NavLink>
                </div>
                <div className='col-6 d-flex align-items-center nav_cotact'>
                  <input type="search" placeholder='Search Anything' className='form-control'
                    onChange={(e) => setSearchValue(e.target.value)} />
                </div>
                {search && (
                  <div className='col-12 d-flex align-items-center nav_searchbar'>
                    <input type="search" placeholder='Search Anything' className='form-control'
                      onChange={(e) => setSearchValue(e.target.value)} />
                  </div>
                )}
                <div className='col-3 col-lg-3 col-md-3 d-flex justify-content-end align-items-center'>
                  <div className='d-flex align-items-end'>
                    <li className="nav-item px-0">
                      <NavLink className="nav-link nav-link1" style={{ border: "none" }}>
                        <div className='fs-2 heart'>
                          <FaHeart />
                        </div>
                        <div className='fs-2 nav_search' onClick={handleSearchToggle}>
                          <IoSearchSharp />
                        </div>
                      </NavLink>
                    </li>
                    {cu._id == undefined &&
                      <li className="nav-item px-0">
                        <NavLink className="nav-link nav-link1" style={{ border: "none" }}>
                          <div className='fs-2' onClick={toggleLogin}>
                            <FaRegUser />
                          </div>
                          {login && (
                            <div className='login_div p-4'>
                              <div className='d-flex justify-content-end' style={{ color: "black" }} onClick={() => { setLogin(false) }}><RxCross1 /></div>
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
                                        setLogin(false)
                                      }} >
                                        Register
                                      </span>
                                    </NavLink>

                                  </p>
                                </div>
                              </form>
                            </div>
                          )}
                        </NavLink>
                      </li>
                    }
                    {cu._id != undefined &&
                      <>
                        <li className="nav-item dropdown px-0">
                          <NavLink
                            to="/"
                            className="nav-link dropdown-toggle1 "
                            id="navbarDarkDropdownMenuLink1"
                            role="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            style={{ borderBottom: "none", color: "white" }}
                          >

                            <div className='fs-2' style={{ color: "white" }}>
                              <FaRegUser />
                            </div>

                          </NavLink>
                          <ul className="dropdown-menu menu3" aria-labelledby="navbarDarkDropdownMenuLink">
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
                    <li className="nav-item px-0" onClick={() => {
                      if (cu._id === undefined || cu.email === "asd@gmail.com") {
                        setLogin(true)
                        dispatch({
                          type: 'LOGOUT_USER'
                        });
                        toast.warning("Login to see your Cart")
                        move('/')
                      } else {
                        setOpen("open")
                      }
                    }}>
                      <NavLink className="nav-link nav-link1" style={{ border: "none", position: "relative" }}>
                        <span className={`fs-2`}>
                          <FiShoppingCart />
                          <p className='m-0 cart_number'>
                            {filterCartLength}
                          </p>
                        </span>
                      </NavLink>
                    </li>
                  </div>
                </div>
              </div>


            </div>
          </div>
        </div>

        <nav className={`navbar navbar-expand-lg container-fluid`}>
          <div className="container-fluid nav_bg p-0">
            <button
              className={`custom-toggler ${isMenuOpen ? 'cross' : ''} ${cu._id !== undefined ? 'additional-class' : ''}`}
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
                    <li> <NavLink className="dropdown-item" to="products/three-&-two-seater-sofas">3+2 Sofa Sets</NavLink></li>
                    <li> <NavLink className="dropdown-item" to="products/sofa-beds">Sofa Beds </NavLink></li>
                    <li> <NavLink className="dropdown-item" to="products/fabric-sofas">Fabric sofas</NavLink></li>
                    <li> <NavLink className="dropdown-item" to="products/chesterfield-sofas">Chesterfield Sofas </NavLink></li>
                    <li> <NavLink className="dropdown-item" to="products/u-shaped-sofas">U Shape Sofas</NavLink></li>
                    <li> <NavLink className="dropdown-item" to="products/leather-sofas">Leather Sofas</NavLink></li>
                    <li> <NavLink className="dropdown-item" to="products/recliner-sofas">Recliner Sofas</NavLink></li>
                    <li> <NavLink className="dropdown-item" to="products/arm-chair-&-swivel-chair">Arm Chair & Swivel Chair</NavLink></li>
                  </ul>
                </li>

                <li className="nav-item nav-item2">
                  <NavLink className="nav-link" aria-current="page" to="/products/corner-sofas">
                    Corner Sofas
                  </NavLink>
                </li>
                <li className="nav-item nav-item2">
                  <NavLink className="nav-link" aria-current="page" to="/products/three-&-two-seater-sofas">
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
    </div>
    
    {searchValue && (
      <div className='container'>
        <div className='my-4 fs-2'>
          Search Result...
        </div>
        <div className="row row-cols-2 row-cols-md-4 row-cols-lg-4 row-cols-sm-2  g-4">
          {filteredProducts?.map((product, index) => (
            <div className="col " key={index} >
              <div className='product_box'>
                <div className='p_img_box' onClick={() => move("/single_Add/" + product._id)}>
                  <img src={product.images[0]} alt="No network" />
                  {product.discount && product.discount > 0 ? (
                    <div className='discount'>
                      {`${product.discount}%`}
                    </div>
                  ) : null}
                  <div className='overlay'>
                    {product.images[1] &&
                      <img src={product.images[1]} alt="" />
                    }
                  </div>
                </div>
                <p className='card_title px-2'>{product.title}</p>
                {product.description &&
                  <p className='p_description px-2'>{product.description}</p>
                }
                <div className='text-left'>
                  {product.discount && product.discount > 0 ? (
                    <>
                      <span className='card_Fprice px-2 '> {`£${product.Fprice?.toFixed(1)}`}</span>
                      <span className='card_price'><s>{`£${product.price?.toFixed(1)}`}</s></span>
                    </>
                  ) : (
                    <span className='card_Fprice px-2 '> {`£${product.Fprice?.toFixed(2)}`}</span>
                  )}
                </div>
                <div className='product_btns'>
                  <button className='btn p_detail_btn' onClick={() => move("/single_Add/" + product._id)}>
                    View Detail
                  </button>
                  <a href='https://wa.me/+923067208343' target="blank">
                    <button className='btn p_whatsapp_btn'>Buy Via WhatsApp</button>
                  </a>
                </div>
              </div>
            </div>
          ))
          }
        </div>
      </div>
      )
    }

  </>
};
