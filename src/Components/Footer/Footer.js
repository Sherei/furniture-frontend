import React from 'react'
import { FaPhoneSquareAlt, FaEnvelope, FaInstagram, FaLinkedin, FaTwitter, FaFacebook, FaWhatsapp } from "react-icons/fa"
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
    toast.success("Submitted")
    reset()
  }
  return <>
    <div className='container-fluid mx-0 mt-5 px-0' style={{ backgroundColor: "rgb(2, 2, 94)" }} >
      <div className='row footer_row ' style={{ minHeight: "60vh" }}>
        <div className='col-lg-3 col-md-12 col-sm-12 mb-3'>
          <p className='fw-bolder fs-5' style={{ color: "white" }}>ABOUT US</p>
          <p className='footer_head_detail'>We are an independent retail company dedicated to
            supplying good quality furniture products to the consumers
            with substantial savings and ease.</p>
          <div className='footer_address'>
            <a href="tel:00923067208343" target='blak'>
              <div className='mb-2'>
                <span className='footer_addres_icon'><FaPhoneSquareAlt />
                  <span className='px-2'>+923067208343</span>
                </span>
              </div>
            </a>
            <a href="mailto:sharjeelakhtar245@gmail.com" target='blak'>
              <div className='mb-2'>
                <span className='footer_addres_icon'><FaEnvelope />
                  <span className='px-2'>sharjeelakhtar245@gmail.com</span>
                </span>
              </div>
            </a>
            <div className='mb-2'>
              <span className='footer_addres_icon'><ImLocation2 /> <span className='px-2'>66 Broklyn Street New York, USA</span></span>
            </div>
          </div>
        </div>
        <div className='footer_menus col-lg-5 col-md-12 col-sm-12 d-flex gap-5 px-lg-5'>
          <div>
            <p className='fw-bolder fs-5'>INFORMATION</p>
            <NavLink to='products'>
              <p>Shop Now</p>
            </NavLink>
            <Link to='case'>
              <p>Reviews</p>
            </Link>
            <NavLink to='/faq'>
              <p>Faq's</p>
            </NavLink>
            <Link to='about'>
              <p>Contact Us</p>
            </Link>
          </div>
          <div>
            <p className='fw-bolder fs-5'>Popular Categories</p>
            <Link to='about'>
              <p>All Sofas</p>
            </Link>
            <Link to='about'>
              <p>All Beds</p>
            </Link>
            <Link to='about'>
              <p>Sofa Beds</p>
            </Link>
            <Link to='about'>
              <p>Ottomon Box</p>
            </Link>
            <Link to='case'>
              <p>Recliner Sofas</p>
            </Link>
            <Link to='about'>
              <p>Footstools</p>
            </Link>
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
      <div className='row footer_row2'>
        <div className='col-12 footer_display'>
          <div>
            <p className='mt-3 ' style={{ color: "#ffff" }}>All Right Reserved SOFA & BEDS UK 2023 Created By Excellence Creative.</p>
          </div>
          <div className='footer_icon'>
            <a href="https://www.instagram.com/sofa_beds_ltd/?igshid=MzMyNGUyNmU2YQ%3D%3D" target='blank'>
              <div>
                <FaInstagram />
              </div>
            </a>
            <a href='https://wa.me/+923067208343' target="blank">
              <div><FaWhatsapp /></div>
            </a>
            <a href="https://www.facebook.com/profile.php?id=100094639442134&mibextid=2JQ9oc" target='blank'>
              <div>
                <FaFacebook />
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>

  </>
}

export default Footer