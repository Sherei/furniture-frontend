import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router'
import { useSelector, useDispatch } from 'react-redux';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Benefits from '../Benefits/Benefits';
import axios from 'axios';
import "./login.css"


export const Login = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const cu = useSelector(store => store.userSection.cu)

  const [Error, setError] = useState("");
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

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
          move('/admin-dashboard');
        } else {
          move("/products/all");
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

  if (cu._id !== undefined) {
    move('/products')
  }

  return <>
    <div className='container my-5'>
      <div className='row d-flex justify-content-center'>
        <div className='col-lg-6 col-md-6 col-sm-12'>
          <div>
            <p className='m-0 fs-3 text-center fw-bolder' style={{ color: "#1b2950" }}>Login to my Account</p>
            <p className='m-0 fs-6 text-center text-muted my-3'>Enter your E-mail & Password</p>
          </div>
          <form action="" onSubmit={handleSubmit(Login)}>
            {Error === "Invalid Credentials" &&
              <div className='error mb-3'> Invalid Credentials </div>
            }
            <div className="input-group mb-3">
              <input required="true"
                autocomplete="off"
                type="email"
                className="input w-100" {...register('email', {
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
              <label class="user-label">Email *</label>
              {errors.email ? <div className='error'>Email is required </div> : null}
            </div>
            <div className="input-group mb-3">
              <input required="true"
                autocomplete="off"
                type={showPassword ? "text" : "password"}
                className="input w-100"
                {...register('password', { required: true })} />
              <label class="user-label">Password *</label>
              {errors.password ? <div className='error'>Password is required </div> : null}
              <button
                type="button"
                className="password-toggle-btn"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>
            <button className='btn rounded login_btn mt-3'>Login</button>
            <p className='mt-2 fs-6'>I don't have an account. &nbsp;
              <span
                className='register_btn'
                onClick={() => {
                  move("/signup")
                }}>
                Register
              </span>
            </p>
          </form>
        </div>
      </div>
      <div className='row '>
        <Benefits />
      </div>
    </div>
  </>

}
