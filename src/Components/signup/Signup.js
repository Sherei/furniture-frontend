import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import "./signup.css"

export const Signup = () => {

  let { register, handleSubmit, reset, formState: { errors } } = useForm();

  let move = useNavigate();

  async function SignUp(data) {
    try {
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/signUp`, data);
      // const response = await axios.post("/signUp", data);
      if (response.data === "User Created") {
        toast.success("Account Created");
        move("/login")
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


  return (

    <div className='container'>
      <div className="row my-5 signup">
        <div className="col-lg-7 signup-left">
          <div className="signup-form">
            {/* <h1>BuyRight</h1> */}
            <p>Start Your Shopping From Here !!!</p>
            <h2>Sign up</h2>
            <form action="" onSubmit={handleSubmit(SignUp)}>
              <div>
                Name
                <input type="text"  {...register('name', { required: true })} />
              </div>
              <div>
                Email
                <input type="text"  {...register('email', {
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
                <input type="password"  {...register('password', { required: true })} />
              </div>
              <div>
                Confirm Password
                <input type="password"  {...register('cpassword', { required: true })} />
              </div>
              <div>
               Contact Number
                <input type="text"  {...register('number', { required: true })} />
              </div>
              <button className='mt-3'>Sign Up</button>

              <p>Already have an acount ?<span className='signin' onClick={() => {
                move('/login')
              }}> Sign In</span></p>
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
