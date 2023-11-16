import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Error } from '../Error/Error';
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
            top: 0,
            behavior: 'smooth'
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
            toast.success("Item removed");
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
        return accumulator + item.Fprice;
    }, 0);

    const shippingFee = 100;

    const total = totalSum + shippingFee;

    const Order = async (data) => {

        setLoading(true);

        try {
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
                    Fprice: parseFloat(item.Fprice).toString(),
                };
                orderItems.push(itemData);
            });

            const orderItemsJSON = JSON.stringify(orderItems);

            const total = totalSum + shippingFee;
            data.total = total;
            data.orderId = orderId;
            data.userId = userId;
            data.orderItems = orderItemsJSON;
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
                toast.success("Order is Placed");

                move(`/order-placed/${userId}`);
            }
        } catch (e) {
            // console.log(e);
        } finally {
            setLoading(false);
        }
    };


    if (filterCart?.length === 0) {
        return <div className='py-0 mb-5 d-flex flex-column align-items-center justify-content-center' style={{ height: '70vh' }}>
            <Lottie animationData={CartAnimation} loop={true} style={{ width: "100%", height: "100%" }} />
            <button className='btn review_btn' style={{ width: "fit-content" }} onClick={() => move('/Products/all')}>
                Browse Products <FaArrowRight />
            </button>
        </div>
    }

    if (loading) {
        return (
            <div className="col-12 my-5 d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                <Loader />
            </div>
        );
    }

    // if (cu._id === undefined || cu.email === "asd@gmail.com") {
    //     toast.warning("Login to See cart")
    //     return move("/login")
    // }

    return <>
        <div className='container-fluid my-5'>
            <div className='row checkout_display d-flex justify-content-center'>

                <div className='col-lg-6 col-sm-12 py-3 px-3 mt-5 mt-lg-0' style={{ backgroundColor: "white", borderRight: "1px solid lightgray" }}>
                    <h4 className="mb-3 fw-bolder" style={{ color: "rgb(27, 41, 80)" }}>Delivery Details</h4>
                    <form action="" className="needs-validation" onSubmit={handleSubmit(Order)}>
                        <div className="row py-3">
                            <p className='fs-6' style={{ fontWeight: "600", color: "rgb(27, 41, 80)" }}>Personal Information</p>
                            <div className="col-md-6 mb-3">
                                <input type="text" placeholder='First name*' className="form-control py-3" {...register('name1', { required: true })} />
                                {errors.name1 ? <div className='error'>This Field is required</div> : null}
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="text" placeholder='Last name' className="form-control py-3"{...register('name2')} />
                            </div>
                            <div className="col-md-12 mb-3">
                                <input type="text" placeholder='Address*' className="form-control py-3" {...register('shipping', { required: true })} />
                                {errors.shipping ? <div className='error'>This Field is required</div> : null}
                            </div>
                        </div>

                        <div className="row py-3">
                            <p className='fs-6' style={{ fontWeight: "600", color: "rgb(27, 41, 80)" }}>Add appartment, suite, contact etc...</p>
                            <div className="col-md-6 mb-3">
                                <input type="text" placeholder='Country*' className="form-control py-3" {...register('country', { required: true })} />
                                {errors.country ? <div className='error'>This Field is required</div> : null}
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="text" placeholder='City*' className="form-control py-3" {...register('city', { required: true })} />
                                {errors.city ? <div className='error'>This Field is required</div> : null}
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="number" placeholder='Postal Code*' className="form-control py-3" {...register('postal', { required: true })} />
                                {errors.postal ? <div className='error'>This Field is required</div> : null}
                            </div>
                            <div className="col-md-6 mb-3">
                                <input type="number" placeholder='Contact Number*' className="form-control py-3" {...register('number1', { required: true })} />
                                {errors.number1 ? <div className='error'>This Field is required</div> : null}
                            </div>
                            <div className="col-md-12 mb-3">
                                <input type="text" placeholder='E-mail' className="form-control py-3" {...register('email', {
                                    validate: function (typedValue) {
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
                        </div>

                        <hr className="mb-4" />
                        <div className="col-md-12 mb-3">
                            <p className='fs-6' style={{ fontWeight: "600", color: "rgb(27, 41, 80)" }}>Shipping Charges</p>
                            <div className='px-3 py-3 d-flex justify-content-between align-items-center  rounded-3'
                                style={{ border: "1px solid lightgray" }}>
                                <p className='m-0'>Standard</p>
                                <p className='m-0'>&pound;100</p>
                            </div>
                        </div>
                        <div className='py-3 px-2'>
                            <p className='fs-6' style={{ fontWeight: "600", color: "rgb(27, 41, 80)" }}>Payment</p>
                            <div className="col-md-12 mb-3">
                                <input type="text" className="form-control py-3 rounded"
                                    value="Cash on Delivery (COD)" {...register('payment')}
                                    style={{ border: "1px solid lightgray" }}
                                />
                            </div>
                        </div>
                        <hr className="mb-4" />
                        <button className="fw-bolder btn btn-lg"
                            style={{ width: "100%", backgroundColor: "rgb(27, 41, 80)", color: "white" }}
                        >
                            COMPLETE ORDER
                        </button>
                        <p className='my-3 text-center fw-bolder fs-3'>OR</p>
                        <a href="https://wa.me/+923067208343" target='blank'>
                            <button className="btn review_btn btn-lg fw-bolder" style={{ backgroundColor: "rgb(38,211,103)" }}>
                                ORDER VIA WHATSAPP
                            </button>
                        </a>
                    </form>

                    <div className='my-5 checout_display2'>
                       <a href=""><p style={{borderBottom:"1px solid rgb(10,88,211)"}}>Refund policy</p></a> 
                       <a href=""><p style={{borderBottom:"1px solid rgb(10,88,211)"}}>Privacy policy</p></a> 
                       <a href=""><p style={{borderBottom:"1px solid rgb(10,88,211)"}}>Terms of service</p></a> 
                    </div>
                </div>


                <div className='col-lg-4 col-sm-12 px-4 py-3'>
                    <div className='row'>
                        <div className='col-12 d-flex justify-content-between' style={{ color: "rgb(27, 41, 80)" }}>
                            <p className='fw-bolder fs-4'>CART ITEMS</p>
                            <p className='fw-bolder fs-4'>{filterCart?.length}</p>
                        </div>
                    </div>
                    {filterCart?.map((item, index) => {
                        return <>
                            <div className='row border mb-1 pt-3' key={index}>
                                <div className='col-3' style={{ position: "relative" }}>
                                    <img className='img-fluid' src={item?.image} alt="No Internet" style={{ width: "100%", height: "100px" }} />
                                    <p className='m-0 cart_number'>
                                        {item?.quantity}
                                    </p>
                                </div>
                                <div className='col-9 d-flex justify-content-between '>
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
                                    <div>
                                        <p className='text-center fw-bolder'>{`£${item?.Fprice?.toFixed(2)}`}</p>
                                        <div>
                                            <FaAngleDown style={{ transform: expandedItems[index] ? 'rotate(180deg)' : 'rotate(0deg)' }}
                                                onClick={() => toggleDetails(index)} />
                                        </div>
                                        <div>
                                            <button className='btn text-muted' style={{
                                                border:"none",
                                                backgroundColor:"transparent",

                                            }}onClick={() => DeleteCartItem(item._id)}>remove</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    })
                    }

                    <div className='row mt-3 py-3 border' style={{ backgroundColor: "white" }}>
                        <div className='px-3 pt-3 col-12  d-flex justify-content-between align-items-center' style={{ fontWeight: "600", color: "rgb(27, 41, 80)" }}>
                            <p className='m-0 fs-6'>Subtotal</p>
                            <p className='m-0 fs-6'>{`£${totalSum?.toFixed(2)}`}</p>
                        </div>
                        <div className='px-3 col-12 text-muted d-flex justify-content-between align-items-center'>
                            <p className='m-0 fs-6'>Shipping</p>
                            <p className='m-0 fs-6'>{`£${shippingFee}`}</p>
                        </div>
                        <div className='px-3 col-12 d-flex justify-content-between align-items-center' style={{ fontWeight: "600", color: "rgb(27, 41, 80)" }}>
                            <p className='m-0 fs-5'>Total</p>
                            <p className='m-0 fs-5'>{`£${total?.toFixed(2)}`}</p>
                        </div>
                    </div>

                    <div className='my-5 d-flex justify-content-around flex-wrap checout_display1'>
                       <a href=""><p style={{borderBottom:"1px solid rgb(10,88,211)"}}>Refund policy</p></a> 
                       <a href=""><p style={{borderBottom:"1px solid rgb(10,88,211)"}}>Privacy policy</p></a> 
                       <a href=""><p style={{borderBottom:"1px solid rgb(10,88,211)"}}>Terms of service</p></a> 
                    </div>
                </div>
            </div >
        </div >

    </>

}

export default Checkout