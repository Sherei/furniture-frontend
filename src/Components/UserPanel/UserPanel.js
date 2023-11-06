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
                                    <hr />
                                    <div className="row">
                                        <div className="col-sm-3">
                                            <p className="mb-0">Password</p>
                                        </div>
                                        <div className="col-sm-9">
                                            <p className="text-muted mb-0">{cu.password}</p>
                                        </div>
                                    </div>
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
                                    <button className='btn review_btn' onClick={() => move('/Products/all')}>
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
                                        <div className='table-responsive' style={{ backgroundColor: 'white', minHeight: '58vh' }}>
                                            <table className='table table-bordered'>
                                                <thead>
                                                    <tr className='text-center'>
                                                        <th>Sr#</th>
                                                        <th>OrderId</th>
                                                        <th>Name</th>
                                                        <th>Email</th>
                                                        <th>Contact</th>
                                                        <th>Shipping</th>
                                                        <th>Products</th>
                                                        <th>Price</th>
                                                        <th>Date</th>
                                                        <th>Detail</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {filterOrder?.map((data, index) => {
                                                        const orderItemsLength = data.orderItems.length;
                                                        let totalFprice = 0;
                                                        data.orderItems.forEach((item) => {
                                                            totalFprice += parseFloat(item?.Fprice);
                                                        });
                                                        return (
                                                            <tr key={index} className='text-center'>
                                                                <td>{index + 1}</td>
                                                                <td>{data?.orderId}</td>
                                                                <td>{data?.name1}</td>
                                                                <td>{data?.email}</td>
                                                                <td>{data?.number1}</td>
                                                                <td>{data?.shipping}</td>
                                                                <td className='text-center'>{orderItemsLength}</td>
                                                                <td className='text-center'>{totalFprice?.toFixed(2)}</td>
                                                                <td>{data.date.slice(0, 10)}</td>
                                                                <td className='text-center'>
                                                                    <a href={`/order-detail/${data._id}`}>Detail</a>
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </table>
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
