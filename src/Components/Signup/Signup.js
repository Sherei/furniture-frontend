import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router'
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from "react-toastify";
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
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const move = useNavigate()

    async function SignUp(data) {

        console.log("Signup data is::", data)

        try {

            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/signUp`, data);

            if (response.data === "User Created") {
                toast.success("Account Created")
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
                <div className='col-lg-6 col-md-12 col-sm-12'>
                    <div>
                        <p className='m-0 fs-2 text-center fw-bolder'>Create Your Account</p>
                        <p className='my-3 fs-6 text-center '>Please fill in the infromation below</p>
                    </div>
                    <form action="" onSubmit={handleSubmit(SignUp)}>
                        {Error === "Try with different E-mail" &&
                            <div className='error mb-3'>Try with different E-mail</div>
                        }
                        <div className="input-group mb-3">
                            <input required="true"
                                type="text"
                                className="input w-100"
                                {...register('name', { required: true })}
                            />
                            <label class="user-label">Name *</label>
                            {errors.name ? <div className='error'>Name is required </div> : null}
                        </div>
                        <div className="input-group mb-3">
                            <input required="true"
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
                                type={showPassword ? "text" : "password"}
                                className="input w-100"
                                {...register('password', { required: true })} />
                            <label class="user-label">Passowrd *</label>
                            {errors.password ? <div className='error'>Passowrd is required </div> : null}
                            <button
                                type="button"
                                className="password-toggle-btn"
                                onClick={togglePasswordVisibility}
                            >
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </button>
                        </div>
                        <button className='btn border rounded login_btn mt-4'>Create my account</button>
                        <p className='mt-2 fs-6'>Already have an account? &nbsp;
                            <a href="/login" style={{ borderBottom: "1px solid blue" }}>
                                Login
                            </a>
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

export default Signup