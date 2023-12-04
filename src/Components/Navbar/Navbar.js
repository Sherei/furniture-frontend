import React, { useState, useEffect, useRef } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { TbPhoneCall } from "react-icons/tb";
import { AiFillMail } from "react-icons/ai";
import {
  FaRegUser,
  FaAngleDown,
  FaArrowRight,
  FaHeart,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import { HiOutlineBars3 } from "react-icons/hi2";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-scroll";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import SingleAdd from "../SinglePage/SingleAdd";
import Loader from "../Loader/Loader";
import { useForm } from "react-hook-form";
import Lottie from "lottie-react";
import CartAnimation from "../Animations/CartAnimation.json";
import "./navbar.css";

export const Navbar = () => {
  const move = useNavigate();
  const ref = useRef();
  const cu = useSelector((store) => store.userSection.cu);

  const allCartItems = useSelector((store) => store.Cart.cart);
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [Error, setError] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [isSticky, setIsSticky] = useState(false);
  const [login, setLogin] = useState(false);
  const [search, setSearch] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isNavOpen, setNavOpen] = useState(false);
  const [open, setCartOpen] = useState(false);
  const toggleCart = () => {
    if (cu._id === undefined || cu.email === "asd@gmail.com") {
      setLogin(true);
      dispatch({
        type: "LOGOUT_USER",
      });

      toast.warning("Login to see your Cart");
      move("/");
    } else {
      setCartOpen(true);
      setLogin(false);
      setSearch(false);
      setNavOpen(false);
    }
  };

  const toggleNav = (event) => {
    event.preventDefault();
    event.stopPropagation();
    setNavOpen(!isNavOpen);
    setLogin(false);
    setSearch(false);
  };

  const closeNav = (event) => {
    setNavOpen(false);
    setSearch(false);
    setLogin(false);
  };

  const handleSearchToggle = () => {
    console.log("efwer");

    setSearch(!search);
    setLogin(false);
    setNavOpen(false);
  };

  const toggleLogin = () => {
    setLogin(!login);
    setSearch(false);
    setNavOpen(false);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (ref.current && !ref.current.contains(event.target)) {
  //       console.log("sdkjfhjkdhfjkd");
  //       setNavOpen(false);
  //       setLogin(false);
  //       setCartOpen(false);
  //     }
  //   };
  //   document.addEventListener("click", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("click", handleClickOutside);
  //   };
  // }, [ref]);

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
    try {
      axios.get(`${process.env.REACT_APP_BASE_URL}/addToCart`).then((res) => {
        if (res) {
          dispatch({ type: "ADD_TO_CART", payload: res.data });
        }
      });
    } catch (e) {
    } finally {
      setLoading(false);
    }
  }, []);

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
      const description = product?.description?.includes(searchResult);
      const descriptionHead2 =
        product?.descriptionHead2?.includes(searchResult);
      const description2 = product?.description2?.includes(searchResult);
      const descriptionHead3 =
        product?.descriptionHead3?.includes(searchResult);
      const description3 = product?.description3?.includes(searchResult);
      const descriptionHead4 =
        product?.descriptionHead4?.includes(searchResult);
      const description4 = product?.description4?.includes(searchResult);
      const featureHead = product?.featureHead?.includes(searchResult);
      const feature1 = product?.feature1?.includes(searchResult);
      const feature2 = product?.feature2?.includes(searchResult);
      const feature3 = product?.feature3?.includes(searchResult);
      const feature4 = product?.feature4?.includes(searchResult);
      const feature5 = product?.feature5?.includes(searchResult);
      const feature6 = product?.feature6?.includes(searchResult);
      const feature7 = product?.feature7?.includes(searchResult);

      return (
        titleMatch ||
        categoryMatch ||
        subCategoryMatch ||
        description ||
        description2 ||
        description3 ||
        description4 ||
        descriptionHead2 ||
        descriptionHead3 ||
        descriptionHead4 ||
        featureHead ||
        feature1 ||
        feature2 ||
        feature3 ||
        feature4 ||
        feature5 ||
        feature6 ||
        feature7
      );
    });

    setFilteredProducts(filtered);
  }, [searchValue]);
  useEffect(() => {
    if (allCartItems) {
      setCart(allCartItems);
    }
  }, [allCartItems]);
  console.log(isNavOpen);
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

  const filterCart = cart?.filter((item) => item.userId === cu._id);

  const filterCartLength = filterCart.length;
  const subtotal = filterCart.reduce((acc, item) => acc + item.total, 0);

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
        <div className={`side_cart px-2 ${open === true ? "side_open" : ""}`}>
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
                  className="px-2 mt-2 py-2 d-flex gap-2"
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
                    onClick={() => {
                      move(`single_Add/${item._id}`);
                      setCartOpen(false);
                    }}
                  >
                    <img
                      src={item?.image}
                      alt="No Network"
                      style={{ width: "100%", height: "100%" }}
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
                          move(`single_Add/${item._id}`);
                          setCartOpen(false);
                        }}
                      >
                        {item?.title}
                      </p>
                      <p className="m-0 fw-bolder" style={{ color: "red" }}>
                        &pound;{item?.total}
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
                <p className="mb-1">Subtotal</p>
                <p className="mb-1">&pound;{subtotal}</p>
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
        </div>
      )}

      <div
        className="container-fluid nav_contact2"
        style={{ backgroundColor: "#F7EEDD" }}
      >
        <div className="row py-2">
          <div className="col d-flex justify-content-center align-items-center gap-lg-5 gap-md-5 gap-2 ">
            <a href="tel:00923067208343" target="blank" className="fs-6">
              <span
                className="nav_cotact_icon"
                style={{ color: "rgb(2, 2, 94)" }}
              >
                <TbPhoneCall />
              </span>{" "}
              &nbsp;
              <span className="ml-2" style={{ color: "rgb(2, 2, 94)" }}>
                00923067208343
              </span>
              &nbsp;
            </a>
            <a href="mailto:sharjeelakhtar245@gmail.com" target="blank">
              <span
                className="nav_cotact_icon"
                style={{ color: "rgb(2, 2, 94)" }}
              >
                <AiFillMail />
              </span>
              &nbsp;
              <span
                className="m-0 text-lowercase"
                style={{ color: "rgb(2, 2, 94)" }}
              >
                sharjeelakhtar245@gmail.com
              </span>
              &nbsp;
            </a>
          </div>
        </div>
      </div>

      <div style={{ position: "relative" }}>
        <div
          className={`${isSticky ? "fixed-top navbar-custom" : ""}`}
          style={{ backgroundColor: "rgb(2, 2, 94)", minHeight: "75px" }}
        >
          <div
            className={`py-2 container-fluid`}
            style={{ backgroundColor: "rgb(2, 2, 94)" }}
          >
            <div className="row">
              <div className="col nav1">
                <div className="row nav1_row">
                  <div
                    className="col-3 d-flex align-items-center justify-content-start gap-2 p-0"
                    style={{ position: "relative" }}
                  >
                    <button
                      className={`custom-toggler fs-2`}
                      data-bs-toggle="collapse"
                      data-bs-target="#navbarNavDropdown"
                      aria-controls="navbarNavDropdown"
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
                  <div
                    className="col-6 d-flex align-items-center nav_cotact"
                    style={{ position: "relative" }}
                  >
                    <input
                      type="search"
                      placeholder="Search Anything"
                      className=""
                      onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <button className="nav_search_btn ">
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
                  <div
                    className="col-3 col-lg-3 col-md-3 d-flex justify-content-end align-items-center"
                    ref={ref}
                  >
                    <div className="d-flex align-items-end">
                      <li className="nav-item px-0">
                        <NavLink
                          className="nav-link nav-link1"
                          style={{ border: "none" }}
                        >
                          <div
                            className="fs-2 heart"
                            style={{ color: "#E7E7E9" }}
                          >
                            <FaHeart />
                          </div>
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
                        <li className="nav-item px-0">
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
                                <div
                                  className="d-flex justify-content-end"
                                  style={{ color: "black" }}
                                  onClick={() => {
                                    setLogin(false);
                                  }}
                                >
                                  <RxCross1 />
                                </div>
                                <div>
                                  <p className="m-0 fs-5 text-center fw-bolder mt-2">
                                    Login to my Account
                                  </p>
                                </div>
                                <form action="" onSubmit={handleSubmit(Login)}>
                                  {Error === "Invalid Credentials" && (
                                    <div className="error">
                                      {" "}
                                      Invalid Credentials{" "}
                                    </div>
                                  )}
                                  <div
                                    style={{ position: "relative" }}
                                    className="mt-3"
                                  >
                                    <input
                                      type="text"
                                      className="form-control login_form_input"
                                      placeholder="E-mail"
                                      {...register("email", {
                                        required: true,
                                        validate: function (typedValue) {
                                          if (
                                            typedValue.match(
                                              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                            )
                                          ) {
                                            return true;
                                          } else {
                                            return false;
                                          }
                                        },
                                      })}
                                    />
                                    {errors.email ? (
                                      <div className="error">
                                        {" "}
                                        Please Enter Your Valid Email{" "}
                                      </div>
                                    ) : null}
                                  </div>

                                  <div
                                    style={{ position: "relative" }}
                                    className="mt-3"
                                  >
                                    <input
                                      type={showPassword ? "text" : "password"}
                                      className="form-control login_form_input"
                                      placeholder="Password"
                                      {...register("password", {
                                        required: true,
                                      })}
                                    />
                                    <button
                                      type="button"
                                      className="password-toggle-btn"
                                      onClick={togglePasswordVisibility}
                                    >
                                      {showPassword ? (
                                        <FaEyeSlash />
                                      ) : (
                                        <FaEye />
                                      )}
                                    </button>
                                    {errors.password ? (
                                      <div className="error">
                                        {" "}
                                        Please Enter Your Password{" "}
                                      </div>
                                    ) : null}
                                  </div>
                                  <button
                                    className="btn rounded login_btn mt-3"
                                    onClick={handleSubmit(Login)}
                                  >
                                    Login
                                  </button>
                                  <div className="mt-3">
                                    <p className="m-0 fs-6">
                                      I don't have an account?{" "}
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
                              to="/"
                              className="nav-link dropdown-toggle1 "
                              id="navbarDarkDropdownMenuLink1"
                              role="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                              style={{ borderBottom: "none", color: "white" }}
                            >
                              <div
                                className="fs-2"
                                style={{ color: "#E7E7E9" }}
                              >
                                <FaRegUser />
                              </div>
                            </NavLink>
                            <ul
                              className="dropdown-menu menu3"
                              aria-labelledby="navbarDarkDropdownMenuLink"
                            >
                              {cu?.email != "asd@gmail.com" && (
                                <li>
                                  <NavLink
                                    className="dropdown-item"
                                    to={`/user-profile/${cu._id}`}
                                  >
                                    Profile
                                  </NavLink>
                                </li>
                              )}
                              {cu?.email === "asd@gmail.com" && (
                                <li>
                                  {" "}
                                  <NavLink
                                    className="dropdown-item"
                                    to="/admin-dashboard"
                                  >
                                    Admin{" "}
                                  </NavLink>
                                </li>
                              )}
                              <li>
                                {" "}
                                <NavLink
                                  className="dropdown-item"
                                  to="/"
                                  onClick={Logout}
                                >
                                  Logout{" "}
                                </NavLink>
                              </li>
                            </ul>
                          </li>
                        </>
                      )}
                      <li className="nav-item px-0" onClick={toggleCart}>
                        <NavLink
                          className="nav-link nav-link1"
                          style={{ border: "none", position: "relative" }}
                        >
                          <span className="fs-2" style={{ color: "#E7E7E9" }}>
                            <FiShoppingCart />
                            <p className="m-0 cart_number">
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

          <nav
            className="navbar navbar-expand-lg navbar-light"
            style={{ backgroundColor: "#F7EEDD" }}
          >
            <div className="container-fluid">
              <div
                className={`collapse navbar-collapse ${
                  isNavOpen ? "show" : ""
                }`}
                id="navbarNavDropdown"
              >
                <ul className="navbar-nav">
                  <li className="nav-item nav-item2">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/"
                      onClick={(event) => closeNav(event)}
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
                          onClick={() => {
                            move("/products/sofa");
                            closeNav();
                          }}
                        >
                          All Sofas
                        </NavLink>
                      </li>
                      {/* <li> <NavLink className="dropdown-item" to="products/corner-sofas" onClick={(event) => closeNav(event)}>Corner Sofas </NavLink></li>
                      <li> <NavLink className="dropdown-item" to="products/three-&-two-seater-sofas" onClick={(event) => closeNav(event)}>3+2 Sofa Sets</NavLink></li> */}
                      <li>
                        {" "}
                        <NavLink
                          className="dropdown-item"
                          to="products/sofa-beds"
                          onClick={(event) => closeNav(event)}
                        >
                          Sofa Beds{" "}
                        </NavLink>
                      </li>
                      <li>
                        {" "}
                        <NavLink
                          className="dropdown-item"
                          to="products/u-shaped-sofas"
                          onClick={(event) => closeNav(event)}
                        >
                          U Shape Sofas
                        </NavLink>
                      </li>
                      <li>
                        {" "}
                        <NavLink
                          className="dropdown-item"
                          to="products/leather-sofas"
                          onClick={(event) => closeNav(event)}
                        >
                          Leather Sofas
                        </NavLink>
                      </li>
                      <li>
                        {" "}
                        <NavLink
                          className="dropdown-item"
                          to="products/recliner-sofas"
                          onClick={(event) => closeNav(event)}
                        >
                          Recliner Sofas
                        </NavLink>
                      </li>
                      {/* <li> <NavLink className="dropdown-item" to="products/arm-chair-&-swivel-chair" onClick={(event) => closeNav(event)}>Arm Chair & Swivel Chair</NavLink></li> */}
                    </ul>
                  </li>
                  <li className="nav-item nav-item2">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/products/corner-sofas"
                      onClick={(event) => closeNav(event)}
                    >
                      Corner Sofas
                    </NavLink>
                  </li>
                  <li className="nav-item nav-item2">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/products/three-&-two-seater-sofas"
                      onClick={(event) => closeNav(event)}
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
                          onClick={(event) => closeNav(event)}
                        >
                          All Beds{" "}
                        </NavLink>
                      </li>
                      <li>
                        {" "}
                        <NavLink
                          className="dropdown-item"
                          to="products/ambassador-beds"
                          onClick={(event) => closeNav(event)}
                        >
                          Ambassador Beds
                        </NavLink>
                      </li>
                      <li>
                        {" "}
                        <NavLink
                          className="dropdown-item"
                          to="products/panel-bed"
                          onClick={(event) => closeNav(event)}
                        >
                          Panel Beds
                        </NavLink>
                      </li>
                      <li>
                        {" "}
                        <NavLink
                          className="dropdown-item"
                          to="products/wingback-beds-frames"
                          onClick={(event) => closeNav(event)}
                        >
                          Wingback Beds
                        </NavLink>
                      </li>
                      {/* <li> <NavLink className="dropdown-item" to="products/ottoman-beds" onClick={(event) => closeNav(event)}>Ottoman Beds</NavLink></li> */}
                      <li>
                        {" "}
                        <NavLink
                          className="dropdown-item"
                          to="products/bespoke-beds"
                          onClick={(event) => closeNav(event)}
                        >
                          Bespoke Beds
                        </NavLink>
                      </li>
                      <li>
                        {" "}
                        <NavLink
                          className="dropdown-item"
                          to="products/chesterfield-beds"
                          onClick={(event) => closeNav(event)}
                        >
                          Chesterfield Beds
                        </NavLink>
                      </li>
                      <li>
                        {" "}
                        <NavLink
                          className="dropdown-item"
                          to="products/divan-beds"
                          onClick={(event) => closeNav(event)}
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
                      onClick={(event) => closeNav(event)}
                    >
                      Ottoman Box
                    </NavLink>
                  </li>
                  <li className="nav-item nav-item2">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/products/footstools"
                      onClick={(event) => closeNav(event)}
                    >
                      Footstools
                    </NavLink>
                  </li>
                  <li className="nav-item nav-item2">
                    <NavLink
                      className="nav-link"
                      aria-current="page"
                      to="/products/mattress"
                      onClick={(event) => closeNav(event)}
                    >
                      Mattresses
                    </NavLink>
                  </li>
                  <li className="nav-item  menu_hide nav-item2">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to="review"
                      onClick={(event) => closeNav(event)}
                    >
                      Reviews
                    </Link>
                  </li>
                  <li className="nav-item  menu_hide nav-item2">
                    <Link
                      className="nav-link"
                      aria-current="page"
                      to="about"
                      onClick={(event) => closeNav(event)}
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

      {searchValue && (
        <div className="container">
          <div className="my-4 fs-2">Search Result...</div>
          {filteredProducts.length === 0 && (
            <div className="mb-5">
              <p>No result found Try with different keyword</p>
            </div>
          )}
          <div className="row row-cols-2 row-cols-md-4 row-cols-lg-4 row-cols-sm-2  g-4">
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
                          {`£${product.Fprice?.toFixed(1)}`}
                        </span>
                        <span className="card_price">
                          <s>{`£${product.price?.toFixed(1)}`}</s>
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
      )}
    </>
  );
};
