import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { FaArrowRight, FaDownload } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { Error } from '../Error/Error';
import axios from 'axios';

const OrderDetail = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    const { OrderId } = useParams();
    const cu = useSelector(store => store.userSection.cu);
    const move = useNavigate();
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const [totalSum, setTotalSum] = useState(0);
    const [expandedItems, setExpandedItems] = useState({});

    useEffect(() => {
        try {
            axios.get(`${process.env.REACT_APP_BASE_URL}/orderDetail?id=${OrderId}`).then((res) => {
                setOrder(res.data);
                setLoading(false);
            });
        } catch (e) {
            setLoading(false);
        }
    }, [OrderId]);

    useEffect(() => {

        if (order.orderItems) {
            let sum = 0;
            order.orderItems.forEach((data) => {
                sum += parseFloat(data.Fprice);
            });
            setTotalSum(sum);
        }
    }, [order.orderItems]);

    const toggleDetails = (index) => {
        setExpandedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

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

    if (cu._id === undefined || !order.orderItems?.length) {
        return <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }}>
            <Loader />
        </div>
    }

    return (
        <div className='container my-5'>
            <div className='row'>
                <div className='col'>
                    <center><p className='fw-bolder fs-3'>Order Detail</p></center>
                </div>
            </div>
            <div className='row' id="orderDetail">
                <div className='col-12'>
                    <p><b>Tracking Id: </b>{order?.orderId}</p >
                    <p><b>Name:</b> {order?.name1} {order?.name2}</p>
                    {order?.email && <p><b>E-mail: </b>{order?.email}</p>}
                    <p><b>Mobile Number: </b>{order?.number1}</p>
                    <p><b>Street & House number: </b>{order?.street}</p>
                    {order.appartment && <p><b>Appartment: </b>{order?.appartment}</p>}
                    <p><b>Shipping Address: </b>{order?.shipping}</p>
                    <p><b>Total Products: </b>{order?.orderItems.length}</p >
                    {order.note && <p><b>Note: {order?.note}</b></p >}
                    {/* <p><b>Date: </b>{order?.formatDateTime(order.date)}</p > */}
                </div>
            </div>
            <div className='col-12'>
                {loading ? (
                    <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }}>
                        <Loader />
                    </div>
                ) : (
                    <div className="table-responsive">
                        <table className="table table-bordered" style={{ tableLayout: 'auto' }}>
                            <thead>
                                <tr>
                                    <th>Sr#</th>
                                    <th>Code</th>
                                    <th>Picture</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Sub Category</th>
                                    <th>Price</th>
                                    <th>Quantity</th>
                                    <th>Discount</th>
                                    <th>Final Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.orderItems ? (
                                    order.orderItems.map((data, index) => (
                                        <tr key={index} >
                                            <td>{index + 1}</td>
                                            <td>{data?.sn}</td>
                                            <td onClick={() => move("/single_Add/" + data._id)} >
                                                <img src={data?.image} alt="No network" style={{ maxWidth: '80px', height: '80px' }} />
                                            </td>
                                            <td >
                                                {data?.title}
                                                <div
                                                    className={`chk_detail ${expandedItems[index] ? 'detail_height' : ''}`}
                                                    onClick={() => toggleDetails(index)}
                                                >
                                                    {data?.size && <p className='text-muted fs-6 m-0'>Size: {data.size ? data.size.replace(/-/g, " ") : ""}/</p>}
                                                    {data?.color && <p className='text-muted fs-6 m-0'>Colour: {data.color ? data.color.replace(/-/g, " ") : ""}/</p>}
                                                    {data?.fabric && <p className='text-muted fs-6 m-0'>Fabric: {data.fabric ? data.fabric.replace(/-/g, " ") : ""}/</p>}
                                                    {data?.headboard && <p className='text-muted fs-6 m-0'>Headboard: {data.headboard ? data.headboard.replace(/-/g, " ") : ""}/</p>}
                                                    {data?.base && <p className='text-muted fs-6 m-0'>Base: {data.base ? data.base.replace(/-/g, " ") : ""}/</p>}
                                                    {data?.detail && <p className='text-muted fs-6 m-0'>Detail: {data.detail ? data.detail.replace(/-/g, " ") : ""}/</p>}
                                                    {data?.mattress && <p className='text-muted fs-6 m-0'>Mattress: {data.mattress ? data.mattress.replace(/-/g, " ") : ""}/</p>}
                                                    {(data?.category === "bed" && data?.ottoman) && <p className='text-muted fs-6 m-0'>Match with Ottoman: {data.ottoman ? data.ottoman.replace(/-/g, " ") : ""}/</p>}
                                                    {(data?.category !== "bed" && data?.ottoman) && <p className='text-muted fs-6 m-0'>Mattress Pillow: {data.ottoman ? data.ottoman.replace(/-/g, " ") : ""}/</p>}
                                                </div>
                                            </td>
                                            <td>{data?.category}</td>
                                            <td>{data?.subCategory ? data?.subCategory : "No subcategory"}</td>
                                            <td className='text-center'>{`£${parseFloat(data?.price)?.toFixed()}`}</td>
                                            <td className='text-center'>{`${parseInt(data?.quantity)}`}</td>
                                            <td className='text-center'>{`${parseFloat(data?.discount || 0).toFixed()}%`}</td>
                                            <td className='text-center'>{`£${parseFloat(data?.total)?.toFixed(2)}`}</td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="10">No order items available.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
            <div className='col-lg-12 col-md-12 col-sm-12 d-flex justify-content-end'>
                <div className='update mb-3 p-3 border' style={{ width: "300px" }}>
                    <div className='d-flex justify-content-between'>
                        <p className='fw-bolder fs-4' style={{ color: "rgb(2, 2, 94)" }}>Summary</p>
                    </div>
                    <div className='fw-normal d-flex justify-content-between'>
                        <p>Items:</p>
                        <p>{order.orderItems.length}</p>
                    </div>
                    {/* <div className='fw-normal d-flex justify-content-between'>
                        <p>After Discount</p>
                    </div> */}
                    <div className='fw-bold d-flex justify-content-between'>
                        <p>Net Total:</p>
                        <p>&pound;{order?.total}</p>
                    </div>
                    <div className=''>
                        <a href="https://wa.me/+923067208343">
                            <button className='btn review_btn'>
                                Cancel Order
                            </button>
                        </a>
                    </div>

                </div>
            </div>
            <div>
                {cu.email === "asd@gmail.com" &&
                    <a href={`/admin-dashboard`}>
                        <button className='btn review_btn'>
                            Dashboard <FaArrowRight />
                        </button>
                    </a>
                }
                {cu.email != "asd@gmail.com" &&
                    <a href={`/user-profile/${cu._id}`}>
                        <button className='btn btn-outline-primary fw-bolder'>
                            Back to Profile <FaArrowRight />
                        </button>
                    </a>
                }
            </div>
        </div >
    );
};

export default OrderDetail;
