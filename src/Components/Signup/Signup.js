import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify';
import { AiTwotoneMail } from "react-icons/ai"
import { FaLock, FaPhoneAlt, FaUserAlt, FaLockOpen, FaAddressCard } from "react-icons/fa"
import Benefits from '../Benefits/Benefits';
import axios from 'axios';

const Signup = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    const [Error, setError] = useState("");

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const move = useNavigate()

    async function SignUp(data) {
        try {

            if (data.password != data.cpassword) {
                return setError("Password does not match")
            }
            data.number = data.number.replace(/\s+/g, "");

            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/signUp`, data);

            if (response.data === "User Created") {
                toast.success("Account Created");
                move('/login')
                reset();
            }
        } catch (error) {

            if (error.response && error.response.status === 400) {
                setError('Try with different E-mail')
            } else {
                setError('Try with different E-mail')
            }
        }
    }
    return <>
        <div className='container my-5'>
            <div className='row d-flex justify-content-center'>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                    <div>
                        <p className='m-0 fs-2 text-center fw-bolder'>Create Your Account</p>
                        <p className='my-3 fs-6 text-center '>Please fill in the infromation below</p>
                    </div>
                    <form action="" onSubmit={handleSubmit(SignUp)}>
                        {Error === "Email Taken" &&
                            <div className='error'>This Email is Already Taken Try with different</div>
                        }
                        <div className='mt-3'>
                            <input type="text" placeholder='Name *' className="form-control login_form_input"{...register('name', { required: true })} />
                            {errors.name ? <div className='error'>This Field is required</div> : null}
                        </div>
                        <div className='mt-2'>
                            <input type="text" placeholder='Email *' className="form-control login_form_input" {...register('email', {
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

                        <div className='mt-2'>
                            <input type="password" placeholder='Password *' className="form-control login_form_input" {...register('password', { required: true })} />
                            {errors.password ? <div className='error'>This Field is required</div> : null}

                        </div>
                        <div className='mt-2'>
                            <input type="password"  placeholder='Confirm Password *' className="form-control login_form_input" {...register('cpassword', { required: true })} />
                            {errors.cpassword ? <div className='error'>Re Enter Your Passowrd </div> : null}

                            {Error === "Password does not match" &&
                                <div className='error'>Password does not match</div>
                            }

                        </div>
                        <button className='btn border rounded login_btn mt-3'>Create my account</button>

                    </form>
                </div>
            </div>
            <div className='row '>
                <Benefits />
            </div>
        </div>
    </>
}

export default Signup