import React, { useState, useEffect } from 'react';
import {
  FaTh,
  FaBars,
  FaDiscourse,
  FaServicestack,
  FaCameraRetro,
  FaHome,
  FaQq
} from 'react-icons/fa';
import { IoIosArrowDroprightCircle, IoIosArrowDropleftCircle } from "react-icons/io"
import { AiFillFolderAdd } from 'react-icons/ai'
import { BiLogOut } from 'react-icons/bi';
import { Dashboard } from './Dashboard';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Products } from './Products';
import { Users } from './Users';
import Comments from './Comments';
import { Orders } from './Orders';
import "./sidebar.css"


const Sidebar = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);

  const [isOpen, setIsOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('dashboard');

  const toggle = () => setIsOpen(!isOpen);
  let cu = useSelector(store => store.userSection.cu)
  let dispatch = useDispatch()

  const handleMenuClick = (component) => {
    setActiveComponent(component);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 992) {
        setIsOpen(false);
      } else {
        setIsOpen(true);
      }
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function Logout() {
    dispatch({
      type: 'LOGOUT_USER'
    });
    toast.success("Logout")
    move('/login');
  }
  let move = useNavigate()

  return (
    <div className="container-fluid d-flex p-0 m-0">
      <div style={{ width: isOpen ? '300px' : '50px' }} className="sidebar">
        <div className="px-2 pt-3 d-flex justify-content-between text-center">
          <p className="fs-5 fw-bolder" style={{ display: isOpen ? 'block' : 'none' }}>
            SOFA & BEDS
          </p>
          <div className="bars">
             {isOpen ? (
            <div className="bars" onClick={toggle}>
              <IoIosArrowDropleftCircle />
            </div>
          ) : (
            <div className="bars" onClick={toggle}>
              <IoIosArrowDroprightCircle />
            </div>
          )}
          </div>
        </div>
        <div className={`link ${activeComponent === 'dashboard' ? 'active' : ''}`} onClick={() => handleMenuClick('dashboard')}>
          <div className="icon">
            <FaTh />
          </div>
          <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
            Dashboard
          </div>
        </div>

        <div className={`link ${activeComponent === 'product' ? 'active' : ''}`} onClick={() => handleMenuClick('product')}>
          <div className="icon">
            <FaDiscourse />
          </div>
          <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
            Products
          </div>
        </div>


        <div className={`link ${activeComponent === 'users' ? 'active' : ''}`} onClick={() => handleMenuClick('users')}>
          <div className="icon">
            <FaServicestack />
          </div>
          <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
            Users
          </div>
        </div>

        <div className={`link ${activeComponent === 'comments' ? 'active' : ''}`} onClick={() => handleMenuClick('comments')}>
          <div className="icon">
            <FaCameraRetro />
          </div>
          <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
            Comments
          </div>
        </div>

        <div className={`link ${activeComponent === 'addProduct' ? 'active' : ''}`}
          onClick={() => move('/admin-dashboard-add-product')}>
          <div className="icon">
            <AiFillFolderAdd />
          </div>
          <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text">
            Add Product
          </div>
        </div>

        <div className="link" onClick={() => {
          move("/")
        }}>
          <div className="icon">
            <FaHome />
          </div>
          <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text" >
            Home
          </div>
        </div>
        <div className="link mb-5">
          <div className="icon">
            <BiLogOut />
          </div>
          <div style={{ display: isOpen ? 'block' : 'none' }} className="link_text" onClick={Logout}>
            Logout
          </div>
        </div>
      </div>
      <div className="dashboard">
        {activeComponent === 'dashboard' && <Dashboard />}
        {activeComponent === 'orders' && <Orders />}
        {activeComponent === 'users' && <Users />}
        {activeComponent === 'product' && <Products />}
        {activeComponent === 'comments' && <Comments />}
      </div>
    </div>
  );
};

export default Sidebar;
