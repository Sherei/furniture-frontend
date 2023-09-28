import React, { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import Loader from "../Loader/Loader"
import axios from 'axios';

import "./review.css"

const Review = () => {

    const [comments, setComments] = useState([])
    const [isLoadingComments, setIsLoadingComments] = useState(true);

    let { register, handleSubmit, reset, formState: { errors } } = useForm();


    const Comment = async (cmnt) => {
        try {
            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/comments`, cmnt);
            // const response = await axios.post("/comments", cmnt);
            if (response.status === 200) {
                toast.success("Comment Submitted");
            } else {
                toast.error("Error occurred");
            }
        } catch (e) {
            console.error(e);
        }
    };

    useEffect(() => {
        // axios.get("/comments").then((res) => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/comments`).then((res) => {
            setComments(res.data);
            setIsLoadingComments(false);
        })
            .catch((error) => {
                console.error(error);
                setIsLoadingComments(false);
            });
    }, []);

    const length = comments.length

    return <>
        <div className='container ' id='review'>
            <div className='row mt-5'>
                <div className='col-lg-6 col-md-6 col-sm-12 order-2 order-lg-1 order-md-1 order-xl-1'>
                    {comments.length > 0 &&
                        <div>
                            <p className="text-center fw-bolder fs-4" style={{color: "rgb(2, 2, 94)" }}>{comments.length} Reviews</p>
                        </div>
                    }
                    {isLoadingComments ? (
                        <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }} >
                            <Loader/>
                        </div>
                    ) : comments.length === 0 ? (
                        <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh", color: "rgb(2, 2, 94)" }} >
                            <h2>No Review available</h2>
                        </div>
                    ) : (
                        <div className='row comments_row'>
                            {comments.map((item) => {
                                return (
                                    <div className='border col-lg-8 col-md-12 col-sm-12 py-2 mb-2'
                                        style={{
                                            height:"fit-content",
                                            backgroundColor: "rgb(255, 255, 255, 0.8)"
                                        }}>
                                        <div className='d-flex align-items-center' >
                                            <img
                                                src="/149071-removebg-preview.png"
                                                className="rounded-circle shadow-1-strong"
                                                width={50}
                                                height={50}
                                                alt="No network"
                                            />
                                            <div className='px-4'>
                                                <p className='my-0' style={{ fontWeight: "700" }}>{item.name}</p>
                                                <p>{item.date.slice(0, 19)}</p>
                                                <p>{item.comment}</p>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                <div className='col-lg-6 col-md-6 col-sm-12 order-1 order-lg-2 order-md-2 order-xl-2'>
                    <div>
                        <p className='fw-bolder fs-2 text-center' style={{color:'rgb(2, 2, 94)'}} >Leave us a comment</p>
                    </div>
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
                                Comment *
                            </label>
                            <textarea
                                {...register('comment', { required: true })}
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                rows={5}
                            />
                            {errors.comment ? <div className='error'>Cannot submit empty comment</div> : null}

                        </div>
                        <button type="submit" className="btn review_btn">
                            Submit
                        </button>
                    </form>

                </div>
            </div>

        </div>
    </>
}

export default Review