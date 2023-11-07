import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
// import { Swiper, SwiperSlide } from 'swiper/react';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/autoplay';
// import { Navigation, Autoplay } from 'swiper/modules';
import { AiTwotoneMail } from "react-icons/ai"
import { FaLock } from "react-icons/fa"
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
          toast.success("Login Succesfull");
          move("/products/all");
          reset();
        }
      }
    } catch (e) {
      if (e.response && e.response.status === 404) {
        setError("Invalid Credentials")

      } else {
        setError("Invalid Credentials")
      }
    }
  };


  // const handleToggleForm = (isLogin) => {
  //   setShowLogin(isLogin);
  // };

  return <>

    <div className='row rounded mt-4' >
      <div>
        <p className='m-0 fs-5 text-center fw-bolder'>Login to my Account</p>
      </div>
      <form action="" onSubmit={handleSubmit(Login)}>
        {Error === "Invalid Credentials" &&
          <div className='error'> Invalid Credentials </div>
        }
        <div style={{ position: "relative" }} className='mt-3'>
          <input type="text" className="form-control login_form_input" placeholder='E-mail' {...register('email', {
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
          {/* <div className='form_icon'>
            <AiTwotoneMail />
          </div> */}
        </div>

        <div style={{ position: "relative" }} className='mt-3'>
          <input type="password" className="form-control login_form_input" placeholder='Password'{...register('password', { required: true, })} />
          {errors.password ? <div className='error'> Please Enter Your Password </div> : null}
          {/* <div className='form_icon'>
            <FaLock />
          </div> */}
        </div>
        <button className='btn rounded login_btn mt-3'>Login</button>

      </form>
    </div>
  </>

}
