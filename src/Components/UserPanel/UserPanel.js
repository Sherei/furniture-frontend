import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import { useDispatch } from "react-redux";
import userPanel from "../Animations/userPanel.json"
import axios from 'axios';
import "./userPanel.css"

const UserPanel = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);


    const cu = useSelector((store) => store.userSection.cu);
    const move = useNavigate();
    const { userid } = useParams();
    const [order, setOrder] = useState([]);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        try {
            axios.get(`${process.env.REACT_APP_BASE_URL}/order`).then((res) => {
                if (res.data) {
                    setOrder(res.data);
                }
            });
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

    const filterOrder = order.filter((item) => item.userId === cu._id);

    const formatDateTime = (dateStr) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', options);
    };

    function Logout() {
        dispatch({
            type: "LOGOUT_USER",
        });
        move("/login");
    }
    if (cu._id === undefined || cu.email === 'asd@gmail.com') {
        if (loading) {
            return (
                <div className="col-12 my-5 d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                    <Loader />
                </div>
            );
        } else {
            return <div className="col-12 my-5 d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                <Loader />
            </div>
        }
    }

    return (
        <section style={{ backgroundColor: "#eee", minHeight: "100vh" }}>
            <div className="container py-5">
                {/* <div className="row">
                    <div className="col">
                        <nav aria-label="breadcrumb" className="rounded-3 p-3 mb-4" style={{ backgroundColor: "white" }}>
                            <ol className="breadcrumb mb-0">
                                <li className="breadcrumb-item">
                                    <a href="#">Home</a>
                                </li>
                                <li className="breadcrumb-item">
                                    <a href="#">User</a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">
                                    User Profile
                                </li>
                            </ol>
                        </nav>
                    </div>
                </div> */}
                <div className="row">
                    <div className="col-lg-4 col-md-4 col-sm-12">
                        <div className="card mb-4">
                            <div className="card-body text-center">
                                <img
                                    src="/profile.png"
                                    alt="avatar"
                                    className="rounded-circle img-fluid"
                                    style={{ width: 150 }}
                                />
                                <h5 className="my-3">{cu.name}</h5>
                                <p className="text-muted mb-1">{cu.number}</p>
                                <p className="text-muted mb-4">{cu.email}</p>

                                <button type="button" className="btn review_btn ms-1 my-3" onClick={Logout}>
                                    Logout
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className='col-lg-8 col-md-8 col-sm-12'>
                        {filterOrder.length === 0 ? (
                            <div className='py-0 my-5 d-flex flex-column align-items-center justify-content-center gap-3' style={{ height: '50vh', backgroundColor: '#eee' }}>
                                <p className='fw-bolder text-muted'>No Order Placed yet</p>
                                <Lottie animationData={userPanel} loop={true} style={{ width: "100%", height: "100%" }} />
                                <button className='btn review_btn' onClick={() => move('/Products/all')}>
                                    Shop our products
                                </button>
                            </div>

                        ) : (
                            <>
                                {loading ? (
                                    <div className='col-lg col-sm-12 d-flex align-items-center justify-content-center' style={{ height: '50vh' }}>
                                        <Loader />
                                    </div>
                                ) : (
                                    <div className='px-2'>
                                        <p className='fs-5 fw-bolder m-0' style={{ color: "#1b2950" }}>Orders : {filterOrder?.length}</p>
                                        {filterOrder?.map((item, index) => {
                                            const orderItemsLength = item.orderItems.length;
                                            let totalFprice = 0;
                                            item.orderItems.forEach((data) => {
                                                totalFprice += parseFloat(data?.total);
                                            });
                                            return <>
                                                <div className='row my-2 p-3' key={index} style={{ backgroundColor: "white" }}>
                                                    <div className='col-4'>
                                                        <img src={item?.orderItems[0]?.image} style={{ maxHeight: '180px' }} className='rounded-3 img-fluid' alt="" />
                                                    </div>
                                                    <div className='col-8 ' style={{ position: "relative" }}>
                                                        <p className='panel_index'>{index + 1}</p>
                                                        <p className='m-0'>
                                                            Order ID: {item?.orderId}
                                                        </p>
                                                        <p className='m-0'>
                                                            Contact: {item?.number1}
                                                        </p>
                                                        <p className='m-0'>
                                                            Items: {orderItemsLength}
                                                        </p>
                                                        <p className='m-0'>
                                                            Total: &pound;{item?.total?.toFixed(2)}
                                                        </p>
                                                        <p className='m-0'>
                                                            Date: {formatDateTime(item?.date)}
                                                        </p>
                                                        <p className='m-0'>
                                                            <a href={`/order-detail/${item?._id}`}>Detail</a>
                                                        </p>
                                                    </div>
                                                </div>
                                            </>
                                        })}
                                    </div>
                                )}
                            </>
                        )}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserPanel;
