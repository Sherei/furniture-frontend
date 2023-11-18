import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { FaArrowRight } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Error } from '../Error/Error';
import axios from 'axios';
import Lottie from 'lottie-react';
import userPanel from "../Animations/userPanel.json"


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
    const [loading, setLoading] = useState(true);
    const [profile, setProfile] = useState('order');

    useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_BASE_URL}/order`).then((res) => {
            try {
                if (res.data) {
                    setOrder(res.data);
                }
            } catch (e) {
                // console.log(e);
            } finally {
                setLoading(false);
            }
        });
    }, []);

    const filterOrder = order.filter((item) => item.userId === cu._id);

    const formatDateTime = (dateStr) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        };
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', options);
    };


    if (cu._id === undefined || cu.email === 'asd@gmail.com') {
        return <>
            <Error />
        </>
    }

    return (
        <section style={{ backgroundColor: "#eee", minHeight: "100vh" }}>
            <div className="container py-5">
                <div className="row">
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
                </div>
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
                                <p className="text-muted mb-4">{cu.address}</p>
                                <div className="d-flex justify-content-center mb-2">
                                    <button type="button" className="fw-bolder btn btn-outline-primary" onClick={() => setProfile("profile")}>
                                        Profile
                                    </button>
                                    <button type="button" className="btn review_btn ms-1" onClick={() => setProfile("order")}>
                                        My Orders
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {profile === "profile" &&
                        <div className="col-lg-8 col-md-8 col-sm-12">
                            <div className="card mb-4 py-4">
                                <div className="card-body">
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Full Name</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{cu.name}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Email</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{cu.email}</p>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Phone</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{cu.number}</p>
                                        </div>
                                    </div>
                                    {/* <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Password</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{cu.password}</p>
                                        </div>
                                    </div> */}
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Address</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{cu.address}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }

                    {profile === "order" && (
                        <div className='col-lg-8 col-md-8 col-sm-12'>
                            {filterOrder.length === 0 ? (
                                <div className='py-0 my-5 d-flex flex-column align-items-center justify-content-center gap-3' style={{ height: '50vh', backgroundColor: '#eee' }}>
                                    <p className='fw-bolder text-muted'>No Order Placed yet</p>
                                    <Lottie animationData={userPanel} loop={true} style={{ width: "100%", height: "100%" }} />
                                    <button className='btn review_btn' style={{ width: "fit-content" }} onClick={() => move('/Products/all')}>
                                        Browse Products <FaArrowRight />
                                    </button>
                                </div>

                            ) : (
                                <>
                                    {loading ? (
                                        <div className='col-lg col-sm-12 d-flex align-items-center justify-content-center' style={{ height: '50vh' }}>
                                            <Loader />
                                        </div>
                                    ) : (
                                        <div className='py-3 px-2' style={{ backgroundColor: 'white', height: '58vh', overflow: "auto" }}>
                                            
                                            {filterOrder?.map((data, index) => {
                                                const orderItemsLength = data.orderItems.length;
                                                let totalFprice = 0;
                                                data.orderItems.forEach((item) => {
                                                    totalFprice += parseFloat(item?.total);
                                                });
                                                return <>
                                                    <div className='d-flex gap-4 my-3 border' style={{
                                                        marginBottom: "3px solid lightgray"
                                                    }} key={index}>
                                                        <div className='w-100 px-2'>
                                                            <div className='py-2 d-flex justify-content-between align-items-center'>
                                                                <p className='m-0' style={{ color: "rgb(2, 2, 94 )" }}>
                                                                    Order Id
                                                                </p>
                                                                <p className='m-0'>
                                                                    {data?.orderId}
                                                                </p>
                                                            </div>
                                                            <hr className='m-0 p-0' />

                                                            <div className='py-2 d-flex justify-content-between align-items-center'>
                                                                <p className='m-0' style={{ color: "rgb(2, 2, 94 )" }}>
                                                                    Name
                                                                </p>
                                                                <p className='m-0'>
                                                                    {data?.name1}
                                                                </p>
                                                            </div>
                                                            <hr className='m-0 p-0' />
                                                            <div className='py-2  d-flex justify-content-between align-items-center'>
                                                                <p className='m-0' style={{ color: "rgb(2, 2, 94 )" }}>
                                                                    Contact
                                                                </p>
                                                                <p className='m-0'>
                                                                    {data?.number1}
                                                                </p>
                                                            </div>
                                                            <hr className='m-0 p-0' />
                                                            <div className='py-2  d-flex justify-content-between align-items-center'>
                                                                <p className='m-0' style={{ color: "rgb(2, 2, 94 )" }}>
                                                                    Items
                                                                </p>
                                                                <p className='m-0'>
                                                                    {orderItemsLength}
                                                                </p>
                                                            </div>
                                                            <hr className='m-0 p-0' />
                                                            <div className='py-2  d-flex justify-content-between align-items-center'>
                                                                <p className='m-0' style={{ color: "rgb(2, 2, 94 )" }}>
                                                                    Total
                                                                </p>
                                                                <p className='m-0'>
                                                                    {totalFprice?.toFixed(2)}
                                                                </p>
                                                            </div>
                                                            <hr className='m-0 p-0' />
                                                            <div className='py-2  d-flex justify-content-between align-items-center'>
                                                                <p className='m-0' style={{ color: "rgb(2, 2, 94 )" }}>
                                                                    Date
                                                                </p>
                                                                <p className='m-0'>
                                                                    {formatDateTime(data.date)}
                                                                </p>
                                                            </div>
                                                            <hr className='m-0 p-0' />

                                                            <div className='py-2  d-flex justify-content-end'>
                                                                <button className='btn'
                                                                    style={{
                                                                        border: "none",
                                                                        backgroundColor: "transparent",
                                                                        color: "rgb(2, 2, 94 )"
                                                                    }}>
                                                                    <a href={`/order-detail/${data._id}`}>Detail</a>
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                </>
                                            })}
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default UserPanel;
