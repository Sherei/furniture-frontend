import React, { useState, useEffect, useRef } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { TbPhoneCall } from "react-icons/tb";
import { AiFillMail } from "react-icons/ai";
import {
  FaRegUser,
  FaAngleDown,
  FaArrowRight,
  FaInstagram,
  FaTiktok,
  FaFacebook,
  FaWhatsapp
} from "react-icons/fa";
import { FaVanShuttle } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { HiOutlineBars3 } from "react-icons/hi2";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import CartAnimation from "../Animations/CartAnimation.json";
import "./navbar.css";

export const Navbar = () => {

  const move = useNavigate();
  const cu = useSelector((store) => store.userSection.cu);
  const allCartItems = useSelector((store) => store.Cart.cart);
  const dispatch = useDispatch();

  const ref = useRef();
  const cartRef = useRef();

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [Error, setError] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const [login, setLogin] = useState(false);
  const [search, setSearch] = useState(false);
  const [isNavOpen, setNavOpen] = useState(false);
  const [open, setCartOpen] = useState(false);

  const toggleCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!cu._id) {
      setLogin(true);
      setNavOpen(false);
      setSearch(false);
    } else {
      setCartOpen(true);
      setNavOpen(false);
      setSearch(false);
      setLogin(false);
    }
  };

  const toggleNav = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setNavOpen(!isNavOpen);
    setLogin(false);
    setSearch(false);
  };

  const closeNav = () => {
    setNavOpen(false);
    setSearch(false);
    setLogin(false);
  };

  const handleSearchToggle = () => {
    setSearch(!search);
    setLogin(false);
    setNavOpen(false);
  };

  const toggleLogin = () => {
    setLogin(!login);
    setSearch(false);
    setNavOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setLogin(false);
        setCartOpen(false);
      }
      else if (cartRef.current && !cartRef.current.contains(event.target)) {
        setLogin(false);
        setCartOpen(false);
        closeNav();
        setSearch(false);
      }

    };
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [ref]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_BASE_URL}/addToCart`).then((res) => {
      try {
        if (res) {
          dispatch({
            type: "ADD_TO_CART",
            payload: res.data,
          });
        }
      } catch (e) {
      } finally {
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    if (allCartItems) {
      setCart(allCartItems);
    }
  }, [allCartItems]);

  const filterCart = cart.filter((item) => cu._id === item.userId);

  const subtotal = filterCart.reduce((acc, item) => acc + item.total, 0);

  const totalQuantity = filterCart.reduce((accumulator, item) => {
    return accumulator + item.quantity;
  }, 0);

  useEffect(() => {

    setLoading(true);
    try {
      axios.get(`${process.env.REACT_APP_BASE_URL}/product`).then((res) => {
        if (res) {
          setProducts(res.data);
        }
      });
    } catch (e) {
    } finally {
      setLoading(false);
    }
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
      return (
        titleMatch ||
        categoryMatch ||
        subCategoryMatch
      );
    });
    setFilteredProducts(filtered);
  }, [searchValue]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const Login = async (data) => {
    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/login`,
        data
      );

      let loginUser = response.data;

      if (loginUser) {
        localStorage.setItem("userToken", loginUser.myToken);

        dispatch({
          type: "LOGIN_USER",
          payload: loginUser.user,
        });

        if (loginUser.user.email === "asd@gmail.com") {
          move("/admin-dashboard");
          reset();
        } else {
          move("/products/all");
          reset();
        }
      }
    } catch (e) {
      if (e.response && e.response.status === 404) {
        setError("Invalid Credentials");
      } else {
        setError("Invalid Credentials");
      }
    }
  };

  const DeleteCartItem = async (itemId) => {
    try {
      setLoading(true);
      const resp = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/deleteCart?id=${itemId}`
      );
      if (resp.data.status === "success") {
        dispatch({
          type: "ADD_TO_CART",
          payload: resp.data.alldata,
        });
        window.gtag('event', 'remove_from_cart', {
          item_id: itemId,
      });
        toast.success("Item Removed");
      }
    } catch (e) {
      // console.log(e);
    } finally {
      setLoading(false);
    }
  };

  function Logout() {
    dispatch({
      type: "LOGOUT_USER",
    });
    move("/login");
  }

  return (
    <>
      {open && (
        <div className={`side_cart px-2 ${open === true ? "side_open" : ""}`} cartRef={ref}>
          <div className="pt-2 d-flex justify-content-between align-items-center">
            <p className="fw-bolder fs-5 m-0">SHOPPING CART</p>
            <button
              className="m-0 side_cart_cross"
              onClick={() => setCartOpen(false)}
            >
              <RxCross1 /> CLOSE
            </button>
          </div>
          {filterCart.length === 0 ? (
            <div
              className="py-0 d-flex flex-column align-items-center justify-content-center "
              style={{ height: "75vh" }}
            >
              <Lottie
                animationData={CartAnimation}
                loop={true}
                style={{ width: "100%", height: "100%" }}
              />
              <button
                className="btn review_btn"
                style={{ width: "fit-content" }}
                onClick={() => {
                  move("/Products/all");
                  setCartOpen("close");
                }}
              >
                Browse Products <FaArrowRight />
              </button>
            </div>
          ) : (
            <div className="" style={{ height: "72vh", overflow: "auto" }}>
              {filterCart?.map((item, index) => (
                <div
                  className="px-2 mt-2 py-2 d-flex gap-2 cursor"
                  key={index}
                  style={{
                    maxWidth: "320px",
                    position: "relative",
                    boxShadow: "rgba(0, 0, 0, 0.24) 0px 3px 8px",
                  }}
                >
                  <div
                    className="side_img_main"
                    style={{ width: "100px", minHeight: "80px" }}
                  >
                    <img
                      src={item?.image}
                      alt="No Network"
                      style={{ width: "100%", height: "100%" }}
                      onClick={() => {
                        setCartOpen(false);
                      }}
                    />
                  </div>
                  <div
                    className="d-flex gap-2 justify-content-between"
                    style={{ width: "220px", maxHeight: "100px" }}
                  >
                    <div className="d-flex flex-column justify-content-around">
                      <p
                        className="m-0"
                        style={{ fontSize: "13px" }}
                        onClick={() => {
                          move(`/single_Add/${item.productId}`)
                          setCartOpen(false);
                        }}
                      >
                        {item?.title}
                      </p>
                      <p className="m-0 fw-bolder" style={{ color: "red" }}>
                        &pound;{item?.total?.toFixed()}
                      </p>
                    </div>
                    <button
                      className="side_remove text-danger"
                      onClick={() => DeleteCartItem(item._id)}
                    >
                      <RxCross1 />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
          {filterCart?.length > 0 && (
            <div className="">
              <div className="d-flex justify-content-between fw-bolder fs-5">
                <p className="mb-1">Subtotal {totalQuantity > 1 && <span>({totalQuantity})</span>}</p>
                <p className="mb-1">&pound;{subtotal?.toFixed()}</p>
              </div>
              <button
                className="btn"
                style={{
                  backgroundColor: "#1b2950",
                  color: "white",
                  fontWeight: "500",
                  width: "100%",
                }}
                onClick={() => {
                  if (cu._id === undefined) {
                    setLogin("login");
                    toast.warning("Login to see your Cart");
                  } else if (cu.email === "asd@gmail.com") {
                    toast.warning("Login too see cart");
                  } else {
                    setCartOpen(false);
                    move(`/cart/${cu._id}`);
                  }
                }}
              >
                VIEW CART
              </button>
              <button
                className="btn mt-1"
                style={{
                  backgroundColor: "#8B0000",
                  color: "white",
                  fontWeight: "500",
                  width: "100%",
                }}
                onClick={() => {
                  setCartOpen(false);
                  move(`/cart-checkout/${cu._id}`);
                }}
              >
                Check Out
              </button>
            </div>
          )}
        </div >
      )}

      <div className="fixed-top">
        <div className="container-fluid nav_contact2" style={{ backgroundColor: "#F7EEDD" }}>
          <div className="row py-2">
            <div className="col d-flex justify-content-between align-items-center px-lg-4 px-sm-2 gap-lg-5 gap-md-5 gap-2 ">
              <div className="d-flex align-items-center gap-2 nav_cotact_icon "> 
                <img src="/express.png" style={{ width: "50px" }} alt="" />
                <p className="m-0" style={{color:"#02025E"}}>
                Express Delivery UK!!
                </p>
              </div>
              <div className="d-flex gap-3 align-items-center fs-4 nav_social">
                {/* <p className="m-0 fw-bolder" style={{color:"#02025E"}}>Follow us</p> */}
                <img src="/follow.png" className="img-fluid" style={{width:"70px"}} alt="" />
                <a  href="" style={{backgroundColor:"rgb(255, 0, 0)", color:"rgb(0, 0, 0)"}}>
                  <FaTiktok />
                </a>
                <a href='https://wa.me/+447392608087' target="blank" style={{backgroundColor:"#EF3A74", color:"rgb(255, 255, 255)"}}>
                  <FaInstagram />
                </a>
                <a href="https://www.facebook.com/profile.php?id=100094639442134&mibextid=2JQ9oc" target='blank' style={{backgroundColor:"rgb(24, 119, 242)", color:"rgb(255, 255, 255)"}}>
                  <FaFacebook />
                </a>
              </div>
                <a href="tel:+447392608087" target="blank" className="fs-6">
                  <span
                    className="nav_cotact_icon suport_margin"
                    style={{color:"#02025E"}}
                  >
                    Support: <TbPhoneCall />  +44 7392 608087
                  </span>{" "}
                </a>
            </div>
          </div>
        </div>
        <div className="container-fluid nav_contact3" style={{ backgroundColor: "#F7EEDD" }}>
          <div className="row py-2">
            <div className="col d-flex justify-content-center align-items-center px-lg-4 px-sm-2 gap-lg-5 gap-md-5 gap-2 ">
              <div>
                <span
                  className="fs-6 fw-bolder m-0"
                  style={{ color: "rgb(2, 2, 94)" }}
                >
                  <img src="/express.png" style={{ width: "50px" }} alt="" />
                  &nbsp;&nbsp;Express Delivery UK!!
                </span>{" "}
              </div>
            </div>
          </div>
        </div>
        <div style={{ position: "relative" }}>
          <div style={{ backgroundColor: "rgb(2, 2, 94)", minHeight: "75px" }} >
            <div
              className={`py-2 container-fluid`}
              style={{ backgroundColor: "rgb(2, 2, 94)" }}
            >
              <div className="row">
                <div className="col 
              ">
                  <div className="row nav1_row">
                    <div className="col-3 d-flex align-items-center justify-content-start gap-2 p-0"
                      style={{ position: "relative" }}
                    >
                      <button
                        className={`custom-toggler fs-2`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                        onClick={toggleNav}
                      >
                        <div className="fs-2 lines">
                          {isNavOpen ? <RxCross1 /> : <HiOutlineBars3 />}
                        </div>
                      </button>
                      <div>
                        <NavLink to="/" className="ms-md-2">
                          <img className="logo_navbar" src="/logo2.png" />
                        </NavLink>
                      </div>
                    </div>
                    <div className="col-6 d-flex align-items-center nav_cotact"
                      style={{ position: "relative", overflow: "hidden" }}
                    >
                      <input
                        type="search"
                        placeholder="Search Anything"
                        className="h-70"
                        onChange={(e) => setSearchValue(e.target.value)}
                      />
                      <button className="nav_search_btn">
                        <FiSearch />
                      </button>
                    </div>
                    {search && (
                      <div
                        className={`nav_searchbar w-100 `}
                        style={{ backgroundColor: "#02025E", height: "55px" }}
                      >
                        <input
                          type="search"
                          placeholder="Search Anything"
                          onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <button className="nav_search_btn ">
                          <FiSearch />
                        </button>
                      </div>
                    )}
                    <div className="col-3 col-lg-3 col-md-3 d-flex justify-content-end align-items-center">
                      <div className="d-flex align-items-end">
                        <li className="nav-item px-0">
                          <NavLink
                            className="nav-link nav-link1"
                            style={{ border: "none" }}
                          >
                            <div
                              className="fs-2 nav_search"
                              onClick={handleSearchToggle}
                              style={{ color: "#E7E7E9" }}
                            >
                              <FiSearch />
                            </div>
                          </NavLink>
                        </li>
                        {cu._id == undefined && (
                          <li className="nav-item px-0" ref={ref}>
                            <NavLink
                              className="nav-link nav-link1"
                              style={{ border: "none" }}
                            >
                              <div
                                className="fs-2"
                                onClick={toggleLogin}
                                style={{ color: "#E7E7E9" }}
                              >
                                <FaRegUser />
                              </div>
                              {login && (
                                <div className="login_div p-4">
                                  <div className="d-flex justify-content-between align-items-center mb-4">
                                    <div>
                                      <p className="m-0 fs-5 text-center fw-bolder" style={{ color: "#1b2950" }}>
                                        Login to my Account
                                      </p>
                                    </div>
                                    <div
                                      style={{ color: "#1b2950" }}
                                      onClick={() => {
                                        setLogin(false);
                                      }}
                                    >
                                      <RxCross1 />
                                    </div>
                                  </div>
                                  <form action="" onSubmit={handleSubmit(Login)}>
                                    {Error === "Invalid Credentials" && (
                                      <div className="error mb-3">
                                        {" "}
                                        Invalid Credentials{" "}
                                      </div>
                                    )}
                                    <div className="input-group my-4">
                                      <input required="true"
                                        autocomplete="off"
                                        type="email"
                                        className="input w-100" {...register('email', {
                                          required: true, validate: function (typedValue) {
                                            if (typedValue.match(
                                              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                            )) {
                                              return true;
                                            } else {
                                              return false;
                                            }
                                          }
                                        })} />
                                      <label class="user-label">Email *</label>
                                      {errors.email ? <div className='error'>Email is required </div> : null}
                                    </div>
                                    <div className="input-group mb-3">
                                      <input required="true"
                                        autocomplete="off"
                                        type="password"
                                        className="input w-100"
                                        {...register('password', { required: true })} />
                                      <label class="user-label">Password *</label>
                                      {errors.password ? <div className='error'>Password is required </div> : null}

                                    </div>
                                    <button
                                      className="btn rounded login_btn mt-3"
                                      onClick={handleSubmit(Login)}
                                    >
                                      Login
                                    </button>
                                    <div className="mt-3">
                                      <p className="m-0 fs-6">
                                        I don't have an account.{" "}
                                        <NavLink to="/signup">
                                          <span
                                            className="register_btn"
                                            onClick={() => {
                                              setLogin(false);
                                            }}
                                          >
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
                        )}
                        {cu._id != undefined && (
                          <>
                            <li className="nav-item dropdown px-0">
                              <NavLink
                                className="nav-link nav-link1 dropdown-toggle1 fs-2"
                                id="navbarDropdown"
                                role="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                                style={{ borderBottom: "none", color: "#E7E7E9" }}
                                onClick={() => setSearch(false)}
                              >
                                <FaRegUser />
                              </NavLink>
                              <ul
                                className="dropdown-menu menu3"
                                aria-labelledby="navbarDropdown"
                              >
                                {cu?.email != "asd@gmail.com" && (
                                  <li>
                                    <NavLink className="dropdown-item" to={`/user-profile/${cu._id}`} >
                                      Profile
                                    </NavLink>
                                  </li>
                                )}
                                {cu?.email === "asd@gmail.com" && (
                                  <li>
                                    <NavLink className="dropdown-item" to="/admin-dashboard" >
                                      Admin
                                    </NavLink>
                                  </li>
                                )}
                                <li>
                                  {" "}
                                  <NavLink
                                    className="dropdown-item" to="/login" onClick={Logout} >
                                    Logout{" "}
                                  </NavLink>
                                </li>
                              </ul>

                            </li>

                          </>
                        )}
                        <li className="nav-item px-0">
                          <NavLink
                            className="nav-link nav-link1"
                            style={{ border: "none", position: "relative" }}
                            onClick={toggleCart}
                          >
                            <span className="fs-2" style={{ color: "#E7E7E9" }}>
                              <FiShoppingCart />
                              {(cu._id != undefined && cu.email != "asd@gmail.com") &&
                                <p className="m-0 cart_number">
                                  {filterCart.length}
                                </p>
                              }
                            </span>
                          </NavLink>
                        </li>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <nav
              className={`navbar navbar-expand-lg navbar-light ${isNavOpen ? "show_nav" : ""}`}
              style={{ backgroundColor: "#F7EEDD" }}
            >
              <div className="container-fluid">
                <div
                  className={`collapse navbar-collapse ${isNavOpen ? "show" : ""
                    }`}
                  id="navbarNavDropdown"
                >
                  <ul className="navbar-nav">
                    <li className="nav-item nav-item2">
                      <NavLink
                        className="nav-link"
                        aria-current="page"
                        to="/"
                        onClick={() => closeNav()}
                      >
                        Home
                      </NavLink>
                    </li>
                    <li className="nav-item dropdown nav-item2">
                      <a
                        className="nav-link d-flex justify-content-between gap-1 "
                        href="#"
                        id="navbarDropdownMenuLink"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <div>
                          <p className="m-0">Sofas</p>
                        </div>
                        <div>
                          <FaAngleDown />
                        </div>
                      </a>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdownMenuLink"
                      >
                        <li>
                          <NavLink
                            className="dropdown-item"
                            to="/products/sofa"
                            onClick={() => {
                              closeNav();
                            }}
                          >
                            All Sofas
                          </NavLink>
                        </li>
                        <li>
                          {" "}
                          <NavLink
                            className="dropdown-item"
                            to="products/corner-sofas"
                            onClick={() => closeNav()}
                          >
                            Corner Sofas{" "}
                          </NavLink>
                        </li>
                        <li>
                          {" "}
                          <NavLink
                            className="dropdown-item"
                            to="products/three-&-two-seater-sofas"
                            onClick={() => closeNav()}
                          >
                            3+2 Sofa Sets{" "}
                          </NavLink>
                        </li>

                        <li>
                          {" "}
                          <NavLink
                            className="dropdown-item"
                            to="products/sofa-beds"
                            onClick={() => closeNav()}
                          >
                            Sofa Beds{" "}
                          </NavLink>
                        </li>
                        <li>
                          {" "}
                          <NavLink
                            className="dropdown-item"
                            to="products/u-shaped-sofas"
                            onClick={() => closeNav()}
                          >
                            U Shape Sofas
                          </NavLink>
                        </li>
                        <li>
                          {" "}
                          <NavLink
                            className="dropdown-item"
                            to="products/leather-sofas"
                            onClick={() => closeNav()}
                          >
                            Leather Sofas
                          </NavLink>
                        </li>
                        <li>
                          {" "}
                          <NavLink
                            className="dropdown-item"
                            to="products/recliner-sofas"
                            onClick={() => closeNav()}
                          >
                            Recliner Sofas
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item nav-item2">
                      <NavLink
                        className="nav-link"
                        aria-current="page"
                        to="/products/corner-sofas"
                        onClick={() => closeNav()}
                      >
                        Corner Sofas
                      </NavLink>
                    </li>
                    <li className="nav-item nav-item2">
                      <NavLink
                        className="nav-link"
                        aria-current="page"
                        to="/products/three-&-two-seater-sofas"
                        onClick={() => closeNav()}
                      >
                        3+2 Sofa Sets
                      </NavLink>
                    </li>
                    <li className="nav-item dropdown nav-item2">
                      <a
                        className="nav-link d-flex justify-content-between gap-1 "
                        href="#"
                        id="navbarDropdownMenuLink"
                        role="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <div>
                          <p className="m-0">Beds</p>
                        </div>
                        <div>
                          <FaAngleDown />
                        </div>
                      </a>
                      <ul
                        className="dropdown-menu"
                        aria-labelledby="navbarDropdownMenuLink"
                      >
                        <li>
                          {" "}
                          <NavLink
                            className="dropdown-item"
                            to="products/bed"
                            onClick={() => closeNav()}
                          >
                            All Beds{" "}
                          </NavLink>
                        </li>
                        <li>
                          {" "}
                          <NavLink
                            className="dropdown-item"
                            to="products/ambassador-beds"
                            onClick={() => closeNav()}
                          >
                            Ambassador Beds
                          </NavLink>
                        </li>
                        <li>
                          {" "}
                          <NavLink
                            className="dropdown-item"
                            to="products/panel-bed"
                            onClick={() => closeNav()}
                          >
                            Panel Beds
                          </NavLink>
                        </li>
                        <li>
                          {" "}
                          <NavLink
                            className="dropdown-item"
                            to="products/wingback-beds-frames"
                            onClick={() => closeNav()}
                          >
                            Wingback Beds
                          </NavLink>
                        </li>
                        <li>
                          {" "}
                          <NavLink
                            className="dropdown-item"
                            to="products/bespoke-beds"
                            onClick={() => closeNav()}
                          >
                            Bespoke Beds
                          </NavLink>
                        </li>
                        <li>
                          {" "}
                          <NavLink
                            className="dropdown-item"
                            to="products/chesterfield-beds"
                            onClick={() => closeNav()}
                          >
                            Chesterfield Beds
                          </NavLink>
                        </li>
                        <li>
                          {" "}
                          <NavLink
                            className="dropdown-item"
                            to="products/divan-beds"
                            onClick={() => closeNav()}
                          >
                            Divan Beds
                          </NavLink>
                        </li>
                      </ul>
                    </li>
                    <li className="nav-item nav-item2">
                      <NavLink
                        className="nav-link"
                        aria-current="page"
                        to="/products/ottoman-box"
                        onClick={() => closeNav()}
                      >
                        Ottoman Box
                      </NavLink>
                    </li>
                    <li className="nav-item nav-item2">
                      <NavLink
                        className="nav-link"
                        aria-current="page"
                        to="/products/footstools"
                        onClick={() => closeNav()}
                      >
                        Footstools
                      </NavLink>
                    </li>
                    <li className="nav-item nav-item2">
                      <NavLink
                        className="nav-link"
                        aria-current="page"
                        to="/products/mattress"
                        onClick={() => closeNav()}
                      >
                        Mattresses
                      </NavLink>
                    </li>
                    <li className="nav-item  menu_hide nav-item2">
                      <Link
                        className="nav-link"
                        aria-current="page"
                        to="review"
                        onClick={() => closeNav()}
                      >
                        Reviews
                      </Link>
                    </li>
                    <li className="nav-item  menu_hide nav-item2">
                      <Link
                        className="nav-link"
                        aria-current="page"
                        to="about"
                        onClick={() => closeNav()}
                      >
                        About Us
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>

      </div >



      {searchValue && (
          <div className="container-fluid px-lg-3 px-2">
            <div className="my-4 fs-5">Search Result...</div>
            {filteredProducts.length === 0 && (
              <div className="mb-5">
                <p className="m-0 fs-6">No result found...</p>
              </div>
            )}
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-sm-2  g-4">
              {filteredProducts?.reverse().map((product, index) => (
                <div className="col " key={index}>
                  <div className="product_box">
                    <div
                      className="p_img_box"
                      onClick={() => move("/single_Add/" + product._id)}
                    >
                      <img src={product.images[0]} alt="No network" />
                      {product.discount && product.discount > 0 ? (
                        <div className="discount">{`${product.discount}%`}</div>
                      ) : null}
                      <div className="overlay">
                        {product.images[1] && (
                          <img src={product.images[1]} alt="" />
                        )}
                      </div>
                    </div>
                    <p className="card_title px-2">{product.title}</p>
                    {product.description && (
                      <p className="p_description px-2">{product.description}</p>
                    )}
                    <div className="text-left">
                      {product.discount && product.discount > 0 ? (
                        <>
                          <span className="card_Fprice px-2 ">
                            {" "}
                            {`£${product.Fprice?.toFixed(2)}`}
                          </span>
                          <span className="card_price">
                            <s>{`£${product.price?.toFixed(2)}`}</s>
                          </span>
                        </>
                      ) : (
                        <span className="card_Fprice px-2 ">
                          {" "}
                          {`£${product.Fprice?.toFixed(2)}`}
                        </span>
                      )}
                    </div>
                    <div className="product_btns">
                      <button
                        className="btn p_detail_btn"
                        onClick={() => move("/single_Add/" + product._id)}
                      >
                        View Detail
                      </button>
                      <a href="https://wa.me/+923067208343" target="blank">
                        <button className="btn p_whatsapp_btn">
                          Buy Via WhatsApp
                        </button>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
      }
    </>
  );
};
