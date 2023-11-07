import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify';
import { AiTwotoneMail } from "react-icons/ai"
import { FaLock, FaPhoneAlt, FaUserAlt, FaLockOpen, FaAddressCard } from "react-icons/fa"
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
                // handleToggleForm(true)
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
        <div className='row rounded mt-4' >
            <div>
                <p className='m-0 fs-5 text-center fw-bolder'>Create Your Account</p>
            </div>
            <form action="" onSubmit={handleSubmit(SignUp)}>
                {Error === "Email Taken" &&
                    <div className='error'>This Email is Already Taken Try with different</div>
                }
                <div className='mt-3'>
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
                <div className='my-3 d-flex align-items-center'>
                    <input type="checkbox" className="mx-1" required />
                    <span className='text-muted'>i have read and agree to the terms.</span>
                </div>
                <button className='btn border rounded login_btn'>Submit</button>
                
            </form>
        </div>

    </>
}

export default Signup