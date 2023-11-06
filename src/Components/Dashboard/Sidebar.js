import React, { useState } from 'react';
import {
  FaTh,
  FaBars,
  FaDiscourse,
  FaServicestack,
  FaCameraRetro,
  FaHome,
  FaQq
} from 'react-icons/fa';
import {AiFillFolderAdd} from 'react-icons/ai'
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
  const [isOpen, setIsOpen] = useState(false);
  const [activeComponent, setActiveComponent] = useState('dashboard');

  const toggle = () => setIsOpen(!isOpen);
  let cu = useSelector(store => store.userSection.cu)
  let dispatch = useDispatch()

  const handleMenuClick = (component) => {
    setActiveComponent(component);
  };

  function Logout() {
    dispatch({
      type: 'LOGOUT_USER'
    });
    toast.success("Logout")
    move('/login');
  }
  let move = useNavigate()

  return (
    <div className="container-fluid sidebarinfo">
      <div style={{ width: isOpen ? '300px' : '50px' }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? 'block' : 'none' }} className="logo">
            SOFA & BEDS
          </h1>
          <div style={{ marginLeft: isOpen ? '50px' : '0px' }} className="bars">
            <FaBars onClick={toggle} />
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
        {activeComponent === 'orders' && <Orders/>}
        {activeComponent === 'users' && <Users/>}
        {activeComponent === 'product' && <Products/>}
        {activeComponent === 'comments' && <Comments/>}
      </div>
    </div>
  );
};

export default Sidebar;
