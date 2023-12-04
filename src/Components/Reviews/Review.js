import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

import { Pagination, Autoplay } from 'swiper/modules';

import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Loader from "../Loader/Loader"
import { FaStar } from "react-icons/fa"
import axios from 'axios';

import "./review.css"

const Review = () => {

    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true);

    let { register, handleSubmit, reset, formState: { errors } } = useForm();


    const Comment = async (cmnt) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/comments`, cmnt);
            // const response = await axios.post("/comments", cmnt);
            if (response.status === 200) {
                toast.success("Comment Submitted");
                reset()
            } else {
                toast.error("Error occurred");
            }
        } catch (e) {
            return <>
                <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }} >
                    <Loader />
                </div>
            </>;
        }
    };

    useEffect(() => {
        setLoading(true);
        try {
            axios.get(`${process.env.REACT_APP_BASE_URL}/comments`).then((res) => {
                setComments(res.data);
            })
        } catch (e) {
            return <>
                <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }} >
                    <Loader />
                </div>
            </>
        } finally {
            setLoading(false);
        }
    }, []);

    const length = comments.length

    const formatDateTime = (dateStr) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',

        };
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', options);
    };

    return <>
        <div className='container-fluid p-0 ' id='review'>
            <div className='row pt-lg-0 pt-5'>
                <div className='col-lg-6 col-md-6 col-sm-12 pt-5' style={{ backgroundColor: "rgb(2, 2, 94)" }}>
                    <h1 className='text-center fs-1 fw-bolder' style={{ color: "white" }}>Our Customers</h1>
                    <p className='text-center fs-6' style={{ color: "white" }}>Over 10,000 happy customers!</p>
                    {loading ? (
                        <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "80vh" }} >
                            <Loader />
                        </div>
                    ) : comments.length === 0 ? (
                        <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh", color: "white" }} >
                            <h2>No Review available</h2>
                        </div>
                    ) : (
                        <div className='mt-5'>
                            <Swiper
                                slidesPerView={2}
                                spaceBetween={30}
                                centeredSlides={true}
                                autoplay={{ delay: 3000 }}
                                modules={[Autoplay]}
                                className="mySwiper"
                            >
                                {comments.map((item, index) => {
                                    return <SwiperSlide className='review_slide'>
                                        <div className='px-3 py-2' key={index} >
                                            <div className='text-center' style={{ color: "yellow" }}>
                                                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                            </div>
                                            <p className='review_detail text-center py-5 mt-3' >
                                                {item.comment}
                                            </p>
                                            <p className='text-center' style={{ color: "white" }}>{item.name}</p>
                                            <p className='text-center text-muted' style={{ fontWeight: "700", fontWeight: "700" }}>{formatDateTime(item.date)}</p>
                                        </div>
                                    </SwiperSlide>
                                })}

                            </Swiper>
                        </div>
                    )}
                </div>

                <div className='col-lg-6 col-md-6 col-sm-12 px-5 pt-5'>
                    <h1 className='text-center fw-bolder mt-lg-2 mt-sm-5 mb-5' style={{ color: 'rgb(2, 2, 94)' }} >
                        Leave Your Feedback</h1>
                    <form action="" onSubmit={handleSubmit(Comment)}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Name *
                            </label>
                            <input
                                {...register('name', { required: true })}
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                            />
                            {errors.name ? <div className='error'>Name is required </div> : null}

                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Email *
                            </label>
                            <input
                                {...register('email', { required: true })}
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                            />
                            {errors.email ? <div className='error'>Email is required </div> : null}

                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Write a Review *
                            </label>
                            <textarea
                                {...register('comment', { required: true })}
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                rows={7}
                            />
                            {errors.comment ? <div className='error'>Cannot submit empty comment</div> : null}

                        </div>
                        <button type="submit " className="btn mt-2 review_btn">
                            Submit
                        </button>
                    </form>

                </div>
            </div>

        </div>
    </>
}

export default Review