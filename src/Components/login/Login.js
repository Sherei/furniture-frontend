import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';
import { AiTwotoneMail } from "react-icons/ai"
import { FaLock, FaPhoneAlt, FaUserAlt, FaLockOpen } from "react-icons/fa"
import axios from 'axios';

import "./login.css"


export const Login = () => {

  let array = [
    { img: "17.jpeg" },
    { img: "15.jpeg" },
    { img: "13.jpeg" },
    { img: "11.jpeg" },
    { img: "16.jpeg" },
    { img: "14.jpeg" }
  ]

  const [showLogin, setShowLogin] = useState(true);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const move = useNavigate()

  const dispatch = useDispatch();

  const Login = async (data) => {
    try {

      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, data);
      // let response = await axios.post("/login", data);

      let loginUser = response.data;

      if (loginUser) {

        localStorage.setItem('userToken', loginUser.myToken);
        
        dispatch({
          type: "LOGIN_USER",
          payload: loginUser.user,
        });
        
        if (loginUser.user.email === "asd@gmail.com") {
          toast.success("Welcome Back Dear Admin");
          move('/dashboard');
        } else {
          toast.success("Welcome Back");
          move("/Products/all");
        }
        reset();
      } else {
        toast.error("Enter valid credentials");
      }
    } catch (e) {
      toast.error("Try Again later");
    }
  };

  async function SignUp(data) {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/signUp`, data);
      // const response = await axios.post("/signUp", data);
      if (response.data === "User Created") {
        toast.success("Account Created");
        handleToggleForm(true)
      } else if (response.data === "Passwords do not match") {
        toast.error("Password does not match");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.warning("Try with different Email");
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    }
  }

  const handleToggleForm = (isLogin) => {
    setShowLogin(isLogin);
  };

  return <>

    <div className='container'>
      <div className='row d-felx justify-content-center my-5 bg-white  py-3  rounded' >

        <div className='col-lg-6 col-md-6 col-sm-0 d-flex align-items-center hide_div'>
          <Swiper
            navigation={false}
            modules={[Navigation, Autoplay]}
            className="mySwiper"
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            loop={true}
          >
            {array.map((data) => {
              return <SwiperSlide>
                <div className='slide' style={{ position: "relative" }}>
                  <img src={`/${data.img}`} alt="" />
                </div>
              </SwiperSlide>
            })}

          </Swiper>
        </div>



        <div className='col-lg-6 col-md-6 col-sm-12' >
          <div className="login-btns">
            <button
              className={`border rounded ${showLogin ? 'active_btn' : ''}`}
              onClick={() => handleToggleForm(true)}
            >
              LOGIN
            </button>
            <button
              className={`border rounded ${!showLogin ? 'active_btn' : ''}`}
              onClick={() => handleToggleForm(false)}
            >
              REGISTER
            </button>
          </div>

          {showLogin ? (
            <div>
              <form action="" className='d-flex justify-content-center flex-column gap-4' onSubmit={handleSubmit(Login)}>
                <div style={{ position: "relative" }}>
                  <input type="text" className="form-control login_form_input" placeholder='Enter Your E-mail' {...register('email', {
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
                  <div className='form_icon'>
                    <AiTwotoneMail />
                  </div>
                </div>

                <div style={{ position: "relative" }}>
                  <input type="password" className="form-control login_form_input" placeholder='Enter Password'{...register('password', { required: true, })} />
                  {errors.password ? <div className='error'> Please Enter Your Password </div> : null}
                  <div className='form_icon'>
                    <FaLock />
                  </div>
                </div>
                <button className='btn border rounded login_btn'>Login</button>
                <div>
                  <p>
                    I don't have an account?{' '}
                    <span className="register_btn" onClick={() => handleToggleForm(false)}>
                      Register
                    </span>
                  </p>
                </div>

              </form>
            </div>
          ) : (
            <form action="" className='d-flex justify-content-center flex-column gap-4' onSubmit={handleSubmit(SignUp)}>
              <div>
                <label htmlFor="" className='form_label'><FaUserAlt /> Name *</label>
                <input type="text" className="form-control login_form_input"{...register('name', { required: true })} />
                {errors.name ? <div className='error'>Name is required </div> : null}
              </div>
              <div>
                <label htmlFor="" className='form_label'><AiTwotoneMail /> E-mail *</label>
                <input type="text" className="form-control login_form_input" {...register('email', {
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
              </div>
              {errors.email ? <div className='error'>E-mail is required</div> : null}

              <div>
                <label htmlFor="" className='form_label'><FaLock /> Password *</label>
                <input type="password" className="form-control login_form_input" {...register('password', { required: true })} />
                {errors.password ? <div className='error'>Password is required</div> : null}

              </div>
              <div>
                <label htmlFor="" className='form_label'><FaLockOpen /> Retype Passowrd *</label>
                <input type="password" className="form-control login_form_input" {...register('cpassword', { required: true })} />
                {errors.cpassword ? <div className='error'>Re Enter Your Passowrd </div> : null}

              </div>
              <div>
                <label htmlFor="" className='form_label'><FaPhoneAlt /> Contact No *</label>
                <input type="text" className="form-control login_form_input"{...register('number', { required: true })} />
                {errors.number && errors.number.type == 'required' ? <div className='error'>Contact number is required</div> : null}
              </div>
              <div>
                <input type="checkbox" className="mx-1" required />
                <span>i have read and agree to the terms.</span>
              </div>
              <button className='btn border rounded login_btn'>Submit</button>
              <div>
                <p>
                  Already have an Account?{' '}
                  <span className="register_btn" onClick={() => handleToggleForm(true)}>
                    Login
                  </span>
                </p>
              </div>
            </form>

          )}
        </div>

      </div>


    </div>
  </>

}
