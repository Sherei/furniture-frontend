import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { FaArrowRight } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import Lottie from 'lottie-react';
import CartAnimation from "../Animations/CartAnimation.json"
import "./OrderDetail.css"
import axios from 'axios';

const OrderDetail = () => {

    // useEffect(() => {
    //     window.scrollTo({
    //         top: 0,
    //         behavior: 'smooth'
    //     });
    // }, []);

    const { OrderId } = useParams();
    const cu = useSelector(store => store.userSection.cu);
    const move = useNavigate();
    const [order, setOrder] = useState({});
    const [loading, setLoading] = useState(true);
    const [expandedItems, setExpandedItems] = useState({});

    useEffect(() => {
        setLoading(true);
        try {
            const fetchData = async () => {
                const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/orderDetail?id=${OrderId}`);
                setOrder(response.data);
            };
            fetchData();
        } catch (error) {
            return <>
                <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }} >
                    <Loader />
                </div>
            </>
        } finally {
            setLoading(false);
        }
    }, [OrderId]);


    const formatDateTime = (dateStr) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', options);
    };

    const toggleDetails = (index) => {
        setExpandedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };



    if (cu._id === undefined || order.length === 0 || order.orderItems?.length === 0) {
        return <div className='py-0 mb-5 d-flex flex-column align-items-center justify-content-center' style={{ height: '70vh' }}>
            <Lottie animationData={CartAnimation} loop={true} style={{ width: "100%", height: "100%" }} />
            <button className='btn review_btn' style={{ width: "fit-content" }} onClick={() => move('/Products/all')}>
                Browse Products <FaArrowRight />
            </button>
        </div>
    }

    return (
        <div className='container my-5' style={{ textTransform: "uppercase" }}>
            <div className='row'>
                <div className='col'>
                    <center>
                        <p className='fw-bolder fs-3'
                            style={{ color: "rgb(2, 2, 94)", textDecoration: "underline rgb(2,2,94)" }}
                        >Order Detail</p>
                        <p><b>Tracking Id: </b>{order?.orderId}</p>
                    </center>
                </div>
            </div>
            <div className='row' id="orderDetail">
                <div className='col-12'>
                    <p><b style={{ color: "rgb(2,2,94)" }}>Name:</b> {order?.name1} {order?.name2}</p>
                    {order?.email && <p><b style={{ color: "rgb(2,2,94)" }}>E-mail: </b>{order?.email}</p>}
                    <p><b style={{ color: "rgb(2,2,94)" }}>Mobile Number: </b>{order?.number1}</p>
                    <p><b style={{ color: "rgb(2,2,94)" }}>Street & House number: </b>{order?.street}</p>
                    {order.appartment && <p><b style={{ color: "rgb(2,2,94)" }}>Appartment: </b>{order?.appartment}</p>}
                    <p><b style={{ color: "rgb(2,2,94)" }}>Shipping Address: </b>{order?.shipping}</p>
                    <p><b style={{ color: "rgb(2,2,94)" }}>Total Products: </b>{order?.orderItems?.length}</p >
                    {order.note && <p><b style={{ color: "rgb(2,2,94)" }}>Note: {order?.note}</b></p >}
                    <p><b style={{ color: "rgb(2,2,94)" }}>Date: </b>{formatDateTime(order?.date)}</p >
                </div>
            </div>
            <div className='col-12'>
                {loading ? (
                    <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }}>
                        <Loader />
                    </div>
                ) : (
                    <>
                        <div className='cart_display_layout1'>
                            {order?.orderItems?.map((item, index) => {
                                return <div className='d-flex gap-4 my-3 border py-3' style={{
                                    marginBottom: "1px solid lightgray"
                                }} key={index}>
                                    <div className='row'>
                                        <div className='col-4'>
                                            <a href={"/single_Add/" + item.productId}>
                                                <div className='text-center' style={{ position: "relative" }}>
                                                    <img
                                                        src={item?.image}
                                                        className="img-fluid rounded-3"
                                                        alt="No Internet"
                                                        style={{ width: "150px" }}
                                                    />
                                                    {item?.discount > 1 &&
                                                        <div className='p-1'
                                                            style={{
                                                                position: "absolute", top: "-5px", right: "2px",
                                                                backgroundColor: "red", color: "white",
                                                                borderRadius: "40px",
                                                            }}>
                                                            <p className='m-0' style={{ fontSize: "10px" }}>
                                                                {`-${item?.discount}%`}
                                                            </p>
                                                        </div>
                                                    }
                                                </div>
                                            </a>
                                        </div>
                                        <div className='col-8'>
                                            <div className='w-100 px-2'>
                                                <div className='py-2 d-flex justify-content-between align-items-center'>
                                                    <p className='m-0' style={{ color: "rgb(2, 2, 94 )", fontSize: "14px" }}>
                                                        {item?.title}
                                                            {item?.size && <p className='text-muted fs-6 m-0'>Size: {item.size ? item.size.replace(/-/g, " ") : ""}/</p>}
                                                            {item?.color && <p className='text-muted fs-6 m-0'>Colour: {item.color ? item.color.replace(/-/g, " ") : ""}/</p>}
                                                            {item?.fabric && <p className='text-muted fs-6 m-0'>Fabric: {item.fabric ? item.fabric.replace(/-/g, " ") : ""}/</p>}
                                                            {item?.headboard && <p className='text-muted fs-6 m-0'>Headboard: {item.headboard ? item.headboard.replace(/-/g, " ") : ""}/</p>}
                                                            {item?.base && <p className='text-muted fs-6 m-0'>Base: {item.base ? item.base.replace(/-/g, " ") : ""}/</p>}
                                                            {item?.detail && <p className='text-muted fs-6 m-0'>Detail: {item.detail ? item.detail.replace(/-/g, " ") : ""}/</p>}
                                                            {item?.mattress && <p className='text-muted fs-6 m-0'>Mattress: {item.mattress ? item.mattress.replace(/-/g, " ") : ""}/</p>}
                                                            {item?.side && <p className='text-muted fs-6 m-0'>Side: {item.side ? item.side.replace(/-/g, " ") : ""}/</p>}
                                                            {(item?.category === "bed" && item?.ottoman) && <p className='text-muted fs-6 m-0'>Match with Ottoman: {item.ottoman ? item.ottoman.replace(/-/g, " ") : ""}/</p>}
                                                            {(item?.category !== "bed" && item?.ottoman) && <p className='text-muted fs-6 m-0'>Mattress Pillow: {item.ottoman ? item.ottoman.replace(/-/g, " ") : ""}/</p>}
                                                    </p>
                                                </div>
                                                <hr className='m-0 p-0' />
                                                {/* <div className='py-2 d-flex justify-content-between align-items-center'>
                                                    <p className='m-0' style={{ color: "rgb(2, 2, 94 )", fontSize: "14px" }}>
                                                        Code
                                                    </p>
                                                    <p className='m-0' style={{ fontSize: "14px" }}>
                                                        &pound;{item?.sn}
                                                    </p>
                                                </div>
                                                <hr className='m-0 p-0' /> */}

                                                <div className='py-2 d-flex justify-content-between align-items-center'>
                                                    <p className='m-0' style={{ color: "rgb(2, 2, 94 )", fontSize: "14px" }}>
                                                        Category
                                                    </p>
                                                    <p className='m-0' style={{ fontSize: "14px" }}>
                                                        {item?.category}
                                                    </p>
                                                </div>
                                                <hr className='m-0 p-0' />
                                                {/* 
                                                <div className='py-2 d-flex justify-content-between align-items-center'>
                                                    <p className='m-0' style={{ color: "rgb(2, 2, 94 )", fontSize: "14px" }}>
                                                        Sub Category
                                                    </p>
                                                    <p className='m-0' style={{ fontSize: "14px" }}>
                                                        {item?.subCategory ? item?.subCategory : "No subcategory"}
                                                    </p>
                                                </div>
                                                <hr className='m-0 p-0' /> */}

                                                <div className='py-2 d-flex justify-content-between align-items-center'>
                                                    <p className='m-0' style={{ color: "rgb(2, 2, 94 )", fontSize: "14px" }}>
                                                        Price
                                                    </p>
                                                    <p className='m-0' style={{ fontSize: "14px" }}>
                                                        &pound;{item?.price}
                                                    </p>
                                                </div>
                                                <hr className='m-0 p-0' />

                                                <div className='py-2 d-flex justify-content-between align-items-center'>
                                                    <p className='m-0' style={{ color: "rgb(2, 2, 94 )", fontSize: "14px" }}>
                                                        Quantity
                                                    </p>
                                                    <p className='m-0' style={{ fontSize: "14px" }}>
                                                        {item?.quantity}
                                                    </p>
                                                </div>
                                                <hr className='m-0 p-0' />


                                                <div className='py-2 d-flex justify-content-between align-items-center'>
                                                    <p className='m-0' style={{ color: "rgb(2, 2, 94 )", fontSize: "14px" }}>
                                                        Total Price
                                                    </p>
                                                    <p className='m-0' style={{ fontSize: "14px" }}>
                                                        &pound;{item?.total.toFixed()}
                                                    </p>
                                                </div>
                                                <hr className='m-0 p-0' />


                                            </div>
                                        </div>
                                    </div>
                                </div>

                            })
                            }
                        </div>
                        <div className='table_display1'>
                            <div className="table-responsive">
                                <table className="table table-bordered" style={{ tableLayout: 'auto' }}>
                                    <thead>
                                        <tr style={{ color: "rgb(2,2,94)" }}>
                                            <th>Sr#</th>
                                            {/* <th>Code</th> */}
                                            <th>Picture</th>
                                            <th>Title</th>
                                            <th>Category</th>
                                            {/* <th>Sub Category</th> */}
                                            <th>Price</th>
                                            <th>Quantity</th>
                                            <th>Discount</th>
                                            <th>Final Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order?.orderItems ? (
                                            order?.orderItems?.map((data, index) => (
                                                <tr key={index} >
                                                    <td>{index + 1}</td>
                                                    {/* <td>{data?.sn}</td> */}
                                                    <td>
                                                        <a href={"/single_Add/" + data.productId}>
                                                            <img src={data?.image} alt="No network" style={{ maxWidth: '80px', height: '80px' }} />
                                                        </a>
                                                    </td>
                                                    <td >
                                                        <p className='m-0' style={{ color: "rgb(2, 2, 94 )", fontSize: "14px" }}>
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
                                                                {data?.side && <p className='text-muted fs-6 m-0'>Side: {data.side ? data.side.replace(/-/g, " ") : ""}/</p>}
                                                                {data?.mattress && <p className='text-muted fs-6 m-0'>Mattress: {data.mattress ? data.mattress.replace(/-/g, " ") : ""}/</p>}
                                                                {(data?.category === "bed" && data?.ottoman) && <p className='text-muted fs-6 m-0'>Match with Ottoman: {data.ottoman ? data.ottoman.replace(/-/g, " ") : ""}/</p>}
                                                                {(data?.category !== "bed" && data?.ottoman) && <p className='text-muted fs-6 m-0'>Mattress Pillow: {data.ottoman ? data.ottoman.replace(/-/g, " ") : ""}/</p>}
                                                            </div>
                                                        </p>
                                                    </td>
                                                    <td>{data?.category}</td>
                                                    {/* <td className='text-center'>{data?.subCategory ? data?.subCategory : "No subcategory"}</td> */}
                                                    <td className='text-center'>{`£${parseFloat(data?.price)?.toFixed()}`}</td>
                                                    <td className='text-center'>{`${parseInt(data?.quantity)}`}</td>
                                                    <td className='text-center'>{`${parseFloat(data?.discount || 0).toFixed()}%`}</td>
                                                    <td className='text-center'>{`£${parseFloat(data?.total)?.toFixed()}`}</td>
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
                        </div>
                    </>
                )}
            </div>

            <div className='col-lg-12 col-md-12 col-sm-12 d-flex justify-content-end'>
                <div className='update mb-3 p-3 border' >
                    <div className='d-flex justify-content-between'>
                        <p className='fw-bolder fs-4' style={{ color: "rgb(2, 2, 94)" }}>Summary</p>
                    </div>
                    <div className='fw-normal d-flex justify-content-between'>
                        <p style={{ color: "rgb(2,2,94)" }}>Items:</p>
                        <p>{order?.orderItems?.length}</p>
                    </div>
                    <div className='fw-normal d-flex justify-content-between'>
                        <p style={{ color: "rgb(2,2,94)" }}>Shipping Fee</p>
                        <p>&pound;{order?.shipping}</p>
                    </div>
                    <div className='fw-bold d-flex justify-content-between'>
                        <p style={{ color: "rgb(2,2,94)" }}>Net Total:</p>
                        <p>&pound;{order?.total}</p>
                    </div>
                    {/* <div className=''>
                        <a href="https://wa.me/+447392608087">
                            <button className='btn review_btn'>
                                Cancel Order
                            </button>
                        </a>
                    </div> */}

                </div>
            </div>
            <div>
                {cu.email === "asd@gmail.com" &&
                    <a href={`/admin-dashboard`}>
                        <button className='btn review_btn' style={{ width: "fit-content" }}>
                            Dashboard <FaArrowRight />
                        </button>
                    </a>
                }
                {cu.email != "asd@gmail.com" &&
                    <a href={`/user-profile/${cu._id}`} >
                        <button className='btn review_btn btn_width' >
                            Back to Website <FaArrowRight />
                        </button>
                    </a>
                }
            </div>
        </div >
    );
};

export default OrderDetail;
