import React from 'react'
import { FaPhoneSquareAlt, FaEnvelope, FaInstagram, FaLinkedin, FaTwitter, FaFacebook } from "react-icons/fa"
import { ImLocation2 } from "react-icons/im"
import { useForm } from 'react-hook-form';
import { Link } from 'react-scroll'
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
    <div className='container-fluid mx-0 px-0 py-lg-5 py-3 py-xl-5' style={{ backgroundColor: "#02025E" }} >
      <div className='row footer_row ' style={{ minHeight: "60vh" }}>
        <div className='col-lg-3 col-md-12 col-sm-12 mb-3'>
          <p className='footer_head_detail'>We are an independent retail company dedicated to supplying good quality
            products direct to the consumer with substantial savings and ease.</p>
          <div className='footer_address'>
            <div className='mb-2'>
              <span className='footer_addres_icon'><FaPhoneSquareAlt /> <span className='px-2'>+92 306-7208343</span> </span>
            </div>
            <div className='mb-2'>
              <span className='footer_addres_icon'><FaEnvelope /> <span className='px-2'>needhelp@company.com</span></span>

            </div>
            <div className='mb-2'>
              <span className='footer_addres_icon'><ImLocation2 /> <span className='px-2'>66 Broklyn Street New York, USA</span></span>
            </div>
          </div>
        </div>
        <div className='footer_menus col-lg-2 col-md-12 col-sm-12'>
          <p className='fw-bolder fs-5'>INFORMATION</p>
          <Link to='about'>
            <p>Shop</p>
          </Link>
          <Link to="/">
            <p>Discounted Products</p>
          </Link>
          <Link to='case'>
            <p>Cart</p>
          </Link>
          <Link to='case'>
            <p>Reviews</p>
          </Link>
          <Link to='/'>
            <p>Faq's</p>
          </Link>
          <Link to='about'>
            <p>Contact</p>
          </Link>
        </div>
        <div className='footer_menus col-lg-3 col-md-12 col-sm-12'>
          <p className='fw-bolder fs-5'>Popular Categories</p>
          <Link to='about'>
            <p>All Beds & Sofas</p>
          </Link>
          <Link to="/">
            <p>Fabric Sofas</p>
          </Link>
          <Link to='case'>
            <p>Recliner Sofas</p>
          </Link>
          <Link to='/'>
            <p>Leather Sofas</p>
          </Link>
          <Link to='about'>
            <p>Ottomon Beds</p>
          </Link>
          <Link to='about'>
            <p>Footstools</p>
          </Link>
        </div>

        <div className='footer_menus col-lg-4 col-md-12 col-sm-12 mb-5'>
          <p className='fw-bolder fs-5'>NEWSLETTER</p>
          <div className='newsletter_box'>
            <p>Subscribe for latest articles and resources</p>
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
            <p className='mt-3 ' style={{ color: "#ffff" }}>All Right Reserved DVANIO Furniture UK 2023 Created By Excellence Creative.</p>
          </div>
          <div className='footer_icon'>
            <div><FaInstagram /></div>
            <div><FaLinkedin /></div>
            <div><FaTwitter /></div>
            <div><FaFacebook /></div>
          </div>
        </div>
      </div>
    </div>

  </>
}

export default Footer