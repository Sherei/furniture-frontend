import React, { useState, useEffect } from 'react';
import { FiShoppingCart } from "react-icons/fi";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { toast } from "react-toastify"
import { NavLink } from "react-router-dom";
import "./navbar.css";

export const Navbar = () => {

  let cu = useSelector(store => store.userSection.cu)
  let dispatch = useDispatch()
  let move = useNavigate()
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
  return (
    <nav className={`navbar navbar-expand-lg navbar-dark bg-black ${isSticky ? 'sticky-navbar' : ''}`}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/">
          <img src="/logo.png" alt="No Network" style={{ maxWidth: "140px" }} />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavDarkDropdown"
          aria-controls="navbarNavDarkDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse justify-content-end" id="navbarNavDarkDropdown">
          <ul className="navbar-nav px-lg-5 px-xlg-5">
            <li className="nav-item dropdown">
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
            <li className="nav-item dropdown">
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
            <li className="nav-item">
              <a className="nav-link" href="#" role="button">
                Wardrobes
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" role="button">
                Mattress
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" role="button" >
                Dinning
              </a>
            </li>
            <li className="nav-item">

              <a className="nav-link" href="/Products/all" role="button" >
                Products
              </a>
            </li>
            {cu._id != undefined && cu.email != "asd@gmail.com" &&
              <>
                <li className="nav-item">
                  <a className="nav-link" href="cart">
                    <span>
                      <FiShoppingCart />
                    </span>
                  </a>
                </li>

              </>
            }
            {cu._id === undefined &&
              <>
                <li className="nav-item">
                  <a className="nav-link" href="/login">

                    Login
                  </a>
                </li>
              </>
            }

            {cu._id != undefined &&
              <>
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
                    {cu.email =="asd@gmail.com" &&
                    <li><a className="dropdown-item" href="/dashboard">Admin</a></li>
                    }
                    <li><a className="dropdown-item" href="/login" onClick={Logout}>Logout</a></li>
                  </ul>
                </li>
              </>
            }

          </ul>
        </div>
      </div>
    </nav>

  );
};
