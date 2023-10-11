import React, { useState, useEffect } from 'react'
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
import { FaLock, FaPhoneAlt, FaUserAlt, FaLockOpen, FaAddressCard } from "react-icons/fa"
import axios from 'axios';
import "./login.css"


export const Login = () => {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);
  let array = [
    { img: "17.jpeg" },
    { img: "15.jpeg" },
    { img: "13.jpeg" },
    { img: "11.jpeg" },
    { img: "16.jpeg" },
    { img: "14.jpeg" }
  ]

  const [showLogin, setShowLogin] = useState(true);
  const [Error, setError] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const move = useNavigate()

  const dispatch = useDispatch();

  const Login = async (data) => {
    try {

      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, data);

      let loginUser = response.data;

      if (loginUser) {

        localStorage.setItem('userToken', loginUser.myToken);

        dispatch({
          type: "LOGIN_USER",
          payload: loginUser.user,
        });

        if (loginUser.user.email === "asd@gmail.com") {
          toast.success("Welcome Back Dear Admin");
          move('/admin-dashboard');
          reset();
        } else {
          toast.success("Welcome Back");
          move("/Products/all");
          reset();
        }
      }
    } catch (e) {
      if (e.response && e.response.status === 404) {
        setError("Invalid Credentials")
        // toast.warning("Invalid Credentials");
      } else {
        setError("Invalid Credentials")
      }
    }
  };

  async function SignUp(data) {
    try {
      if (data.password != data.cpassword) {
        return setError("Password does not match")
      }
      data.number = data.number.replace(/\s+/g, "");

      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/signUp`, data);

      if (response.data === "User Created") {
        toast.success("Account Created");
        handleToggleForm(true)
        reset();
      }
    } catch (error) {

      if (error.response && error.response.status === 400) {
        setError('Email Taken')
      } else {
        setError('Email Taken')
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
            {array.map((data, index) => {
              return <SwiperSlide key={index}>
                <div className='slide' style={{ position: "relative" }}>
                  <img src={`/${data.img}`} className='rounded-2' alt="No network" />
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
                {Error === "Invalid Credentials" &&
                  <div className='error'> Invalid Credentials </div>
                }

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
              {Error === "Email Taken" &&
                <div className='error'>This Email is Already Taken Try with different</div>
              }
              <div>
                <label htmlFor="" className='form_label'><FaUserAlt /> Name *</label>
                <input type="text" className="form-control login_form_input"{...register('name', { required: true })} />
                {errors.name ? <div className='error'>This Field is required</div> : null}
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
              {errors.email ? <div className='error'>This Field is required</div> : null}

              <div>
                <label htmlFor="" className='form_label'><FaLock /> Password *</label>
                <input type="password" className="form-control login_form_input" {...register('password', { required: true })} />
                {errors.password ? <div className='error'>This Field is required</div> : null}

              </div>
              <div>
                <label htmlFor="" className='form_label'><FaLockOpen /> Retype Passowrd *</label>
                <input type="password" className="form-control login_form_input" {...register('cpassword', { required: true })} />
                {errors.cpassword ? <div className='error'>Re Enter Your Passowrd </div> : null}

                {Error === "Password does not match" &&
                  <div className='error'>Password does not match</div>
                }

              </div>
              <div>
                <label htmlFor="" className='form_label'><FaPhoneAlt /> Contact No *</label>
                <input type="text" className="form-control login_form_input"{...register('number', { required: true })} />
                {errors.number && errors.number.type == 'required' ? <div className='error'>This Field is required</div> : null}
              </div>
              <div>
                <label htmlFor="" className='form_label'><FaAddressCard /> Address *</label>
                <input type="text" className="form-control login_form_input"{...register('address', { required: true })} />
                {errors.address && errors.address.type == 'required' ? <div className='error'>This Field is required</div> : null}
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
