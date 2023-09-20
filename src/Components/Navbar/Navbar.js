import React, { useState, useEffect } from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { FaUser, FaWhatsapp } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from "react-toastify"
import "./navbar.css";

export const Navbar = () => {

  const cu = useSelector(store => store.userSection.cu)
  const dispatch = useDispatch()
  const move = useNavigate()
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


  function Logout() {
    dispatch({
      type: 'LOGOUT_USER'
    });
    toast.success("Logout");
    move('/login');
  }
  return <>
    <div className="container py-2 bg-white border-bottom">
      <div className="row">
        <div className="cols-12 d-flex align-items-center justify-content-between">
          <a href="/" className="ms-md-2">
            <img
              src="/logo2.svg"
              height={35}
            />
          </a>
          <div className='d-flex align-items-center'>
            <li className="nav-item">
              <a className="nav-link" href="/login">
                <FaWhatsapp />
              </a>
            </li>
            {cu._id == undefined &&
              <li className="nav-item">
                <a className="nav-link" href="/login">
                  <FaUser />
                </a>
              </li>
            }
            {cu._id != undefined &&
              <>
              {cu.email !="asd@gmail.com" &&
                <li className="nav-item">
                  <a className="nav-link" href="/cart">
                    <span>
                      <FiShoppingCart />
                    </span>
                  </a>
                </li>
              }
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" href="/" id="navbarDarkDropdownMenuLink1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <img src="/149071-removebg-preview.png"
                      className="img-fluid rounded-3"
                      width={50}
                      height={50}
                      alt=""
                    />
                  </a>
                  <ul className="dropdown-menu dropdown_menu2" aria-labelledby="navbarDarkDropdownMenuLink">
                    {cu.email != "asd@gmail.com" &&
                      <li><a className="dropdown-item" href="#">Profile</a></li>
                    }
                    {cu.email === "asd@gmail.com" &&
                      <li><a className="dropdown-item" href="/dashboard">Admin</a></li>
                    }
                    <li><a className="dropdown-item" href="/login" onClick={Logout}>Logout</a></li>
                  </ul>
                </li>
              </>

            }
          </div>
        </div>
      </div>
    </div>

    <div className={`container border-bottom mb-1 ${isSticky ? 'fixed-top navbar-custom' : ''}`}>
      <div className="row ">
        <nav className="navbar navbar-expand-lg">

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
              <li className="nav-item nav-item2 dropdown" >
                <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink1" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Sofas
                </a>
                <ul className="dropdown-menu" style={{ textTransform: "capitalize" }} aria-labelledby="navbarDarkDropdownMenuLink" onClick={() => { move("/Products/" + "sofa") }}>
                  <li><a className="dropdown-item" href="#" >fabric corner sofas</a></li>
                  <li><a className="dropdown-item" href="#" >fabric recliner sofas</a></li>
                  <li><a className="dropdown-item" href="#" >fabric sofa sets</a></li>
                  <li><a className="dropdown-item" href="#" >leather recliner corner sofas</a></li>
                  <li><a className="dropdown-item" href="#" >leather recliner sofas</a></li>
                  <li><a className="dropdown-item" href="#" >leather recliner sofa sets</a></li>
                </ul>
              </li>
              <li className="nav-item nav-item2 dropdown">
                <a className="nav-link dropdown-toggle" href="#" id="navbarDarkDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Beds
                </a>
                <ul className="dropdown-menu" style={{ textTransform: "capitalize" }} aria-labelledby="navbarDarkDropdownMenuLink"
                  onClick={() => { move("/Products/" + "bed") }}>

                  <li><a className="dropdown-item" href="#">Ambassador Beds</a></li>
                  <li><a className="dropdown-item" href="#">Bespoke Beds</a></li>
                  <li><a className="dropdown-item" href="#">Chesterfield Beds</a></li>
                  <li><a className="dropdown-item" href="#">Ottoman Beds</a></li>
                  <li><a className="dropdown-item" href="#">Panel Beds</a></li>
                  <li><a className="dropdown-item" href="#">Wingback bed Frames</a></li>
                  <li><a className="dropdown-item" href="#">Luxuy Beds</a></li>
                  <li><a className="dropdown-item" href="#">Wall Panel Beds Frame</a></li>
                </ul>
              </li>
              <li className="nav-item nav-item2">
                <a className="nav-link" href="/Products/all" role="button">
                  Interrior View
                </a>
              </li>
              <li className="nav-item nav-item2">
                <a className="nav-link" href="/Products/all" role="button">
                  Wardrobes
                </a>
              </li>
              <li className="nav-item nav-item2">
                <a className="nav-link" href="/Products/all" role="button">
                  Mattress
                </a>
              </li>
              <li className="nav-item nav-item2">
                <a className="nav-link" href="/Products/all" role="button" >
                  Dinning
                </a>
              </li>
              <li className="nav-item nav-item2">
                <a className="nav-link" href="/Products/all" role="button" >
                  Products
                </a>
              </li>

            </ul>
          </div>
        </nav>
      </div>
    </div>

  </>
};
