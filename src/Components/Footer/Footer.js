import React from 'react'
import { FaPhoneSquareAlt, FaEnvelope, FaInstagram, FaTiktok, FaFacebook, FaWhatsapp } from "react-icons/fa"
import { ImLocation2 } from "react-icons/im"
import { useForm } from 'react-hook-form';
import { Link } from 'react-scroll'
import { NavLink } from 'react-router-dom';
import "./footer.css"
import { toast } from 'react-toastify';

const Footer = () => {

  let { register, handleSubmit, reset, formState: { errors }, } = useForm()

  function News(data) {
    localStorage.setItem('email', data.email)
    toast.success("Successfully Subscribed")
    reset()
  }
  return <>
    <div className='container-fluid mx-0 mt-3 pb-3 px-0' style={{ backgroundColor: "rgb(2, 2, 94)" }} >
      <div className='row mx-lg-5 px-3 mt-5' style={{ minHeight: "60vh",borderBottom:"1px solid #fff" }}>
        <div className='col-lg-3 col-md-12 col-sm-12 mb-3'>
          <p className='fw-bolder fs-5' style={{ color: "white" }}>ABOUT US</p>
          <p className='footer_head_detail'>We are an independent retail company dedicated to
            supplying good quality furniture products to the consumers
            with substantial savings and ease.</p>
          <div className='footer_address'>
            <a href="tel:+447392608087" target='blak'>
              <div className='mb-2'>
                <span className='footer_addres_icon'><FaPhoneSquareAlt />
                  <span className='px-2'>+447392608087</span>
                </span>
              </div>
            </a>
            <a href="mailto:sofabedsltd@gmail.com" target='blak'>
              <div className='mb-2'>
                <span className='footer_addres_icon'><FaEnvelope />
                  <span className='px-2'>sofabedsltd@gmail.com</span>
                </span>
              </div>
            </a>
            <div className='mb-2'>
              <span className='footer_addres_icon'><ImLocation2 /> <span className='px-2'>14 Southbrook Terrace, City of Bradford, BD7 1AD, United Kingdom</span></span>
            </div>
          </div>
        </div>
        <div className='footer_menus col-lg-5 col-md-12 col-sm-12 d-flex gap-5 px-lg-5'>
          <div>
            <p className='fw-bolder fs-5'>INFORMATION</p>
            <NavLink to='/products/all'>
              <p>Shop Now</p>
            </NavLink>
            <Link to='review'>
              <p>Reviews</p>
            </Link>
            <Link to='about'>
              <p>About Us</p>
            </Link>
            <a href="https://wa.me/+447392608087" target='blank'>
                <p>Contact Us</p>
            </a>
          </div>
          <div>
            <p className='fw-bolder fs-5'>Popular Categories</p>
            <NavLink to='/products/sofa'>
              <p>All Sofas</p>
            </NavLink>
            <NavLink to='/products/bed'>
              <p>All Beds</p>
            </NavLink>
            <NavLink to='/products/sofa-beds'>
              <p>Sofa Beds</p>
            </NavLink>
            <NavLink to='/products/ottoman-box'>
              <p>Ottomon Box</p>
            </NavLink>
            <NavLink to='/products/recliner-sofas'>
              <p>Recliner Sofas</p>
            </NavLink>
            <NavLink to='/products/footstools'>
              <p>Footstools</p>
            </NavLink>
          </div>

        </div>


        <div className='footer_menus col-lg-4 col-md-12 col-sm-12 mb-5'>
          <p className='fw-bolder fs-5'>NEWSLETTER</p>
          <div className='newsletter_box'>
            <p>Subscribe for latest Updates</p>
            <div style={{ position: 'relative' }}>
              <form onSubmit={handleSubmit(News)}>
                <input type="email" placeholder='Email Address' className='newsletter_input' {...register('news', { required: true })} />
                <button className='newsletter_btn'>REGISTER</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className='row mx-lg-5 mx-3'>
        <div className='col-12 footer_display'>
          <div>
            <p className='mt-3 ' style={{ color: "#ffff" }}>All Right Reserved by SOFA BEDS UK 2023</p>
          </div>
          <div className='footer_icon'>
            <a href="https://www.tiktok.com/@sofabedsltd?_t=8jhkG9FAna6&_r=1" target='blank'>
              <div>
                <FaTiktok />
              </div>
            </a>
            <a href="https://www.instagram.com/sofa_beds_ltd?igsh=MTViOHpycmZ4dDE2Mg==" target='blank'>
              <div>
                <FaInstagram />
              </div>
            </a>
            <a href="https://www.facebook.com/profile.php?id=100094639442134&mibextid=2JQ9oc" target='blank'>
              <div>
                <FaFacebook />
              </div>
            </a>
            <a href='https://wa.me/+447392608087' target="blank">
              <div><FaWhatsapp /></div>
            </a>
          </div>
        </div>
      </div>
    </div>

  </>
}

export default Footer