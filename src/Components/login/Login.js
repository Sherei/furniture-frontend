import React from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';

import "./login.css"


export const Login = () => {

  let { register, handleSubmit, reset, formState: { errors } } = useForm();

  let move = useNavigate()

  let dispatch = useDispatch();

  let Login = async (data) => {
    try {
  
      let response = await axios.post(`${process.env.REACT_APP_BASE_URL}/login`, data);

      let loginUser = response.data;

      if (loginUser) {

        localStorage.setItem('userToken', loginUser.myToken);

        dispatch({
          type: "LOGIN_USER",
          payload: loginUser.user,
        });
        if (loginUser.email === "asd@gmail.com") {
          toast.success("Welcome Back Dear Admin");
          move('/dashboard');
        } else if (loginUser.email != "asd@gmail.com") {
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

  return (

    <div className='container'>


      <div className="row my-5 signin">
        <div className="col-lg-7 signup-left">

          <div className="signin-form">

            {/* <h1></h1> */}
            <p>Welcome Back !!!</p>
            <h2>Sign in</h2>

            <form action="" onSubmit={handleSubmit(Login)}>
              <div>
                Email
                <input type="text" {...register('email', {
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
              </div>
              <div>
                Password
                <input type="password" {...register('password', { required: true, })} />
              </div>
              <button className='mt-3'>Login</button>

              <p>I don't have an acount ?<span onClick={() => {
                move("/signup")
              }}> Sign up</span></p>
            </form>

          </div>
        </div>
        <div className="col-lg-5 signup-right">

          <img src="signup.png" alt="" />
        </div>
      </div>
    </div>
  )
}
