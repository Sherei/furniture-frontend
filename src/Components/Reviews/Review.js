import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import FadeLoader from "react-spinners/FadeLoader";

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
                            <p className="text-center" style={{ fontWeight: "700", fontSize: "20px" , color:"#1b2950" }}>{comments.length} Reviews</p>
                        </div>
                    }
                    {isLoadingComments ? (
                        <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }} >
                            <FadeLoader
                                    color="#1b2950"
                                    height={18}
                                    loading
                                    margin={5}
                                    radius={2}
                                    speedMultiplier={1}
                                    width={4}
                                />
                        </div>
                    ) : comments.length === 0 ? (
                        <div className='col-lg-12 col-sm-12 d-flex align-items-center' style={{ height: "50vh" , color:"#1b2950" }} >
                            <h2>No Review available</h2>
                        </div>
                    ) : (
                        <div className='row comments_row'>
                            {comments.map((item) => {
                                return (
                                    <div className='border col-lg-8 col-md-12 col-sm-12 py-1 mb-2'
                                    style={{
                                        backgroundColor:"rgb(255, 255, 255, 0.8)"
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
                        <h1 style={{  color:"#1b2950", fontWeight: "600" }}>Leave us a comment</h1>
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
                        </div>
                        <button type="submit" className="btn order_btn">
                            Submit
                        </button>
                    </form>

                </div>
            </div>

        </div>
    </>
}

export default Review