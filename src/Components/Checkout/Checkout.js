import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import "./checkout.css"
import Loader from '../Loader/Loader';
import Lottie from 'lottie-react';
import CartAnimation from "../Animations/CartAnimation.json"
import { FaArrowRight, FaAngleDown } from "react-icons/fa"

const Checkout = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0
        });
    }, []);

    const cu = useSelector(store => store.userSection.cu)
    const dispatch = useDispatch()

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const move = useNavigate()
    const { userId } = useParams();
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([])
    const [expandedItems, setExpandedItems] = useState({});

    const toggleDetails = (index) => {
        setExpandedItems((prev) => ({
            ...prev,
            [index]: !prev[index],
        }));
    };

    useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_BASE_URL}/addToCart`).then((res) => {
            try {
                if (res) {
                    setCart(res.data);
                }
            } catch (e) {
                // console.log(e);
            } finally {
                setLoading(false);
            }
        });
    }, []);

    const filterCart = cart.filter((item) => userId === item.userId)

    const DeleteCartItem = (itemId) => {
        try {
            axios.delete(`${process.env.REACT_APP_BASE_URL}/deleteCart?id=${itemId}`).then(() => {
                setCart(cart.filter((data) => itemId !== data._id));
                dispatch({
                    type: "REMOVE_CART",
                    payload: itemId,
                });
            });

        } catch (e) {
            // console.log(e)
        } finally {
            setLoading(false);
        }
    };

    const totalSum = filterCart.reduce((accumulator, item) => {
        return accumulator + item.total;
    }, 0);
    const totalQuantity = filterCart.reduce((accumulator, item) => {
        return accumulator + item.quantity;
    }, 0);

    const shippingFee = totalQuantity * 50;

    const total = totalSum + shippingFee;

    const Order = async (data) => {

        setLoading(true);    
        try {
            useEffect(() => {
                window.scrollTo({
                    top: 0
                });
            }, []);
            const orderItems = [];
            const orderId = uuidv4().substr(0, 10);
            filterCart.forEach((item) => {
                const itemData = {
                    title: item.title,
                    sn: item.sn,
                    category: item.category,
                    image: item.image,
                    subCategory: item.subCategory,
                    price: parseFloat(item.price).toString(),
                    total: parseFloat(item.total).toString(),
                    quantity: parseInt(item.quantity).toString(),
                    discount: item.discount,
                    size: item.size,
                    color: item.color,
                    fabric: item.fabric,
                    detail: item.detail,
                    base: item.base,
                    headboard: item.headboard,
                    ottoman: item.ottoman,
                    mattress: item.mattress,
                };
                orderItems.push(itemData);
            });
            const totalSum = filterCart.reduce((accumulator, item) => {
                return accumulator + item.total;
            }, 0);
            const totalQuantity = filterCart.reduce((accumulator, item) => {
                return accumulator + item.quantity;
            }, 0);
            
            const shippingFee = totalQuantity * 50;
            const Ordertotal = totalSum + shippingFee;

            const orderItemsJSON = JSON.stringify(orderItems);
            data.orderItems = orderItemsJSON;
            data.orderId = orderId;
            data.total = Ordertotal;
            data.userId = userId;
            data.street = data.street;
            data.shipping=shippingFee;
            data.appartment = data.appartment;

            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/Order`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },

            });

            if (response.data === "Order is Placed") {
                dispatch({
                    type: "REMOVE_MULTIPLE_ITEMS",
                    payload: userId,
                });
                window.location.reload();
                window.location.href = `/order-placed/${userId}`;
            }

        } catch (e) {
            // console.log(e);
        } finally {
            setLoading(false);
        }
    };


    if (loading) {
        return (
            <div className="col-12 my-5 d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                <Loader />
            </div>
        );
    }

    if (cu._id === undefined || cu.email === "asd@gmail.com" || filterCart?.length === 0) {
        if (loading) {
            <div className="col-12 my-5 d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                <Loader />
            </div>
        } else {
            return <div className='py-0 mb-5 d-flex flex-column align-items-center justify-content-center' style={{ height: '70vh' }}>
                <Lottie animationData={CartAnimation} loop={true} style={{ width: "100%", height: "100%" }} />
                <button className='btn review_btn' style={{ width: "fit-content" }} onClick={() => move('/Products/all')}>
                    Browse Products <FaArrowRight />
                </button>
            </div>
        }
    }

    return <>
        <div className='container-fluid '>
            <div className='row'>
                <div className='col d-flex align-items-center justify-content-center py-5'
                    style={{
                        height: "200px",
                        backgroundColor: 'rgb(27, 41, 80,0.3)'
                    }}>
                    <p className='fs-2 fw-bolder text-center' style={{ color: "rgb(27, 41, 80)" }}>Place Order!</p>
                </div>
            </div>
            <div className='row checkout_display d-flex justify-content-center my-lg-5'>
                <div className='col-lg-6 col-sm-12 py-3 px-3 mt-3 mt-lg-0 ' style={{ backgroundColor: "white", borderRight: "1px solid lightgray" }}>
                    <form action="" className="needs-validation" onSubmit={handleSubmit(Order)}>
                        <h4 className="mb-3 fw-bolder" style={{ color: "rgb(27, 41, 80)" }}>Delivery Details</h4>
                        <div className="row py-3">
                            <p className='fs-6' style={{ fontWeight: "600", color: "rgb(27, 41, 80)" }}>Personal Information</p>
                            <div className="col-md-6 mb-3">
                                <input type="text" placeholder='First Name*' className="form-control py-2" {...register('name1', { required: true })} />
                                {errors.name1 ? <div className='error'>This Field is required</div> : null}
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="text" placeholder='Last Name *' className="form-control py-2"{...register('name2', { required: true })} />
                                {errors.name2 ? <div className='error'>This Field is required</div> : null}

                            </div>
                            <div className="col-12 mb-3">
                                <input type="number" placeholder='Contact Number*' className="form-control py-2" {...register('number1', { required: true })} />
                                {errors.number1 ? <div className='error'>This Field is required</div> : null}
                            </div>
                        </div>
                        <hr />
                        <div className="row py-3">
                            <p className='fs-6' style={{ fontWeight: "600", color: "rgb(27, 41, 80)" }}>Shipping Address</p>
                            <div className="col-md-12 mb-3">
                                <input type="text" placeholder='House Number & Street Name*' className="form-control py-2" {...register('street', { required: true })} />
                                {errors.street ? <div className='error'>This Field is required</div> : null}
                            </div>
                            <div className="col-md-12 mb-3">
                                <input type="text" placeholder='Appartment, Suite, Unit, etc' className="form-control py-2" {...register('appartment')} />
                                {errors.appartment ? <div className='error'>This Field is required</div> : null}
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="text" placeholder='Country*' className="form-control py-2" {...register('country', { required: true })} />
                                {errors.country ? <div className='error'>This Field is required</div> : null}
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="text" placeholder='Town/City*' className="form-control py-2" {...register('city', { required: true })} />
                                {errors.city ? <div className='error'>This Field is required</div> : null}
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="number" placeholder='Postcode*' className="form-control py-2" {...register('postal', { required: true })} />
                                {errors.postal ? <div className='error'>This Field is required</div> : null}
                            </div>

                            <div className="col-md-6 mb-3">
                                <input type="email" placeholder='E-mail' className="form-control py-2" {...register('email')} />
                                {errors.email ? <div className='error'>This Field is required</div> : null}
                            </div>
                            <div className="col-md-12 mt-3">
                                <p className='mb-0 fw-bold' style={{ fontSize: "14px" }}>Note: Remember all orders are delivered on ground floor.
                                    Extra charges for uplift or desired room.</p>
                            </div>
                        </div>

                        <hr className="mb-4" />
                        <div className="col-md-12 mb-3">
                            <p className='fs-6' style={{ fontWeight: "600", color: "rgb(27, 41, 80)" }}>Shipping Charges</p>
                            <div className='px-3 py-2 d-flex justify-content-between align-items-center  rounded-3'
                                style={{ border: "1px solid lightgray" }}>
                                <p className='m-0'>Standard</p>
                                <p className='m-0'>&pound;50</p>
                            </div>
                        </div>
                        <div className='py-3'>
                            <p className='fs-6' style={{ fontWeight: "600", color: "rgb(27, 41, 80)" }}>Payment</p>
                            <div className="col-md-12 mb-3">
                                <div className='px-3 py-2 d-flex justify-content-between align-items-center  rounded-3'
                                    style={{ border: "1px solid lightgray" }}>
                                    <p className='m-0'>Cash on Delivery (COD) &pound;50 Deposit Required</p>
                                </div>
                            </div>
                        </div>
                        <hr className="mb-4" />
                        <div className='py-3'>
                            <p className='fs-6' style={{ fontWeight: "600", color: "rgb(27, 41, 80)" }}>Order notes</p>
                            <div className="col-md-12 mb-3">
                                <textarea type="text" placeholder='Notes about your order, e.g. special notes for delivery.'
                                    className="form-control py-2 rounded" rows={7} {...register('note')}
                                    style={{ border: "1px solid lightgray" }}
                                />
                            </div>
                        </div>
                        <hr className="mb-4" />

                        <div className='chk_btns chk_btna1 mt-5'>
                            <button className="fw-bolder btn btn-lg"
                                style={{ width: "100%", backgroundColor: "rgb(27, 41, 80)", color: "white" }}
                            >
                                COMPLETE ORDER
                            </button>
                            <p className='my-4 text-center fs-3' style={{ fontWeight: "600" }}>---OR---</p>

                            <a href="https://wa.me/+923067208343" target='blank'>
                                <button className="w-100 btn btn-lg chk_btn"
                                    style={{ backgroundColor: "rgb(38,211,103)" }}>
                                    Order Via WhatsApp
                                </button>
                            </a>
                        </div>
                    </form>
                </div>

                <div className='col-lg-4 col-sm-12 px-4 pt-5 pt-lg-3'>
                    <div className='row'>
                        <div className='col-12 d-flex justify-content-between' style={{ color: "rgb(27, 41, 80)" }}>
                            <p className='fw-bolder fs-4'>ORDER SUMMARY</p>
                            <p className='fw-bolder fs-4'>{filterCart?.length}</p>
                        </div>
                    </div>
                    {filterCart?.map((item, index) => {
                        return <>
                            <div className='row border mb-1 py-3' key={index}>
                                <div className='col-3' style={{ position: "relative" }}>
                                    <img className='img-fluid' src={item?.image} alt="No Internet" />
                                    <p className='m-0 cart_number' style={{
                                        top: "-4px",
                                        right: "4px,"
                                    }}>
                                        {item?.quantity}
                                    </p>
                                </div>
                                <div className='col-9 d-flex justify-content-between'>
                                    <div>
                                        <p className='m-0'>{item?.title.slice(0, 50)}</p>
                                        <div
                                            className={`chk_detail ${expandedItems[index] ? 'detail_height' : ''}`}
                                        >
                                            {item?.size && <p className='text-muted fs-6 m-0'>Size: {item.size ? item.size.replace(/-/g, " ") : ""}</p>}
                                            {item?.color && <p className='text-muted fs-6 m-0'>Colour: {item.color ? item.color.replace(/-/g, " ") : ""}</p>}
                                            {item?.fabric && <p className='text-muted fs-6 m-0'>Fabric: {item.fabric ? item.fabric.replace(/-/g, " ") : ""}</p>}
                                            {item?.headboard && <p className='text-muted fs-6 m-0'>Headboard: {item.headboard ? item.headboard.replace(/-/g, " ") : ""}</p>}
                                            {item?.base && <p className='text-muted fs-6 m-0'>Base: {item.base ? item.base.replace(/-/g, " ") : ""}</p>}
                                            {item?.detail && <p className='text-muted fs-6 m-0'>Detail: {item.detail ? item.detail.replace(/-/g, " ") : ""}</p>}
                                            {item?.mattress && <p className='text-muted fs-6 m-0'>Mattress: {item.mattress ? item.mattress.replace(/-/g, " ") : ""}</p>}
                                            {(item?.category === "bed" && item?.ottoman) && <p className='text-muted fs-6 m-0'>Match with Ottoman: {item.ottoman ? item.ottoman.replace(/-/g, " ") : ""}</p>}
                                            {(item?.category !== "bed" && item?.ottoman) && <p className='text-muted fs-6 m-0'>Mattress Pillow: {item.ottoman ? item.ottoman.replace(/-/g, " ") : ""}</p>}
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-between flex-column">
                                        <div>
                                            <p className='text-center fw-bolder'>{`£${item?.total?.toFixed(2)}`}</p>
                                            <div className='text-center' >
                                                <button style={{
                                                    border: "none",
                                                    backgroundColor: "transparent",

                                                }}>
                                                    <FaAngleDown style={{ transform: expandedItems[index] ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                                        onClick={() => toggleDetails(index)} />
                                                </button>
                                            </div>
                                        </div>
                                        <div>
                                            <button className='btn btn-outline-secondary text-muted' style={{
                                                backgroundColor: "transparent",

                                            }} onClick={() => DeleteCartItem(item._id)}>remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    })
                    }

                    <div className='row mt-3 py-3 border' style={{ backgroundColor: "white" }}>
                        <div className='px-3 pt-3 col-12  d-flex justify-content-between align-items-center'>
                            <p className='fs-6'>Subtotal</p>
                            <p className='fs-6'>{`£${totalSum?.toFixed(2)}`}</p>
                        </div>
                        <div className='px-3 col-12 d-flex justify-content-between align-items-center'>
                            <p className=' fs-6'>Shipping</p>
                            <p className=' fs-6'>{`£${shippingFee}`}</p>
                        </div>
                        <div className='px-3 col-12 d-flex justify-content-between align-items-center' style={{ fontWeight: "600", color: "rgb(27, 41, 80)" }}>
                            <p className='fs-5'>Total</p>
                            <p className='fs-5'>{`£${total?.toFixed(2)}`}</p>
                        </div>
                    </div>
                    <div className='chk_btns chk_btns2 mt-5'>
                        <button className="fw-bolder btn btn-lg"
                            style={{ width: "100%", backgroundColor: "rgb(27, 41, 80)", color: "white" }}
                            onClick={handleSubmit(Order)}
                        >
                            COMPLETE ORDER
                        </button>
                        <p className='my-4 text-center fs-3' style={{ fontWeight: "600" }}>---OR---</p>

                        <a href="https://wa.me/+923067208343" target='blank'>
                            <button className="w-100 btn btn-lg chk_btn"
                                style={{ backgroundColor: "rgb(38,211,103)" }}>
                                Order Via WhatsApp
                            </button>
                        </a>
                    </div>
                </div>
            </div>
            <div className='row d-flex justify-content-center my-5'>
                <div className='col-lg-10 col-sm-12 mt-5'>
                    <div className='row'>
                        <div className='col-lg-6 col-sm-12 chk_secure1'>
                            <div className=''>
                                <p>Secure Shopping</p>
                            </div>
                            <div className='d-flex gap-3'>
                                <img src="/chk1.png" className='img-fluid' alt="No Network" />
                            </div>
                        </div>
                        <div className='col-lg-6 col-sm-12 chk_secure2'>
                            <div className=''>
                                <p>Reason to buy from us</p>
                            </div>
                            <div className='d-flex gap-3'>
                                <img src="/chk2.png" className='img-fluid' alt="No Network" />
                            </div>
                        </div>

                    </div>
                </div>
                {/* <div className='my-5 d-flex gap-3 justify-content-center flex-wrap checout_display2'>
                    <a href=""><p style={{ borderBottom: "1px solid rgb(10,88,211)" }}>Refund policy</p></a>
                    <a href=""><p style={{ borderBottom: "1px solid rgb(10,88,211)" }}>Privacy policy</p></a>
                    <a href=""><p style={{ borderBottom: "1px solid rgb(10,88,211)" }}>Terms of service</p></a>
                </div> */}
            </div>
        </div >

    </>

}

export default Checkout