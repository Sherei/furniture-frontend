import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router'
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
    const { productId } = useParams();

    const [Error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const togglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const move = useNavigate()

    async function SignUp(data) {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/signUp`, data);
            if (response.data === "User Created") {
                toast.success("Account Created")
                if(productId){
                    move('/login/'+productId)
                }else{
                    move('/login')
                }
                reset();
            }
        } catch (error) {
            if (error.response && error.response.status === 400) {
                setError('This E-mail is already registered with us. Try another one')
            } else {
                setError('This E-mail is already registered with us. Try another one')
            }
        }
    }

    return <>
        <div className='container my-5'>
            <div className='row d-flex justify-content-center'>
                <div className='col-lg-6 col-md-12 col-sm-12'>
                    <div>
                        <p className='m-0 fs-2 text-center fw-bolder' style={{ color: "#1b2950" }}>Create Your Account</p>
                        <p className='my-3 fs-6 text-center '>Please fill in the infromation below</p>
                    </div>
                    <form action="" onSubmit={handleSubmit(SignUp)}>
                        {Error &&
                            <div className='error mb-3'>{Error}</div>
                        }
                        <div className="input-group mb-3">
                            <input required="true"
                                autocomplete="off"
                                type="text"
                                className="input w-100"
                                {...register('name', { required: true })}
                            />
                            <label class="user-label">Name *</label>
                            {errors.name ? <div className='error'>Name is required </div> : null}
                        </div>
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
                        <button className='btn border rounded login_btn mt-4'>Create my account</button>
                        <p className='mt-2 fs-6'>Already have an account? &nbsp;
                           {productId && <a href={"/login/" + productId}>
                                <span
                                    className='register_btn'
                                >
                                    Login
                                </span>
                            </a>}
                            {!productId && <a href={"/login"}>
                                <span
                                    className='register_btn'
                                >
                                    Login
                                </span>
                            </a>}
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