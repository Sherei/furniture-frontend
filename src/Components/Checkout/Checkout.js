import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Error } from '../Error/Error';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import "./checkout.css"
import Loader from '../Loader/Loader';

const Checkout = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);
    const cu = useSelector(store => store.userSection.cu)

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const move = useNavigate()
    const { userId } = useParams();
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState([])
    const [method, setMethod] = useState('')

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

    const totalSum = filterCart.reduce((accumulator, item) => {
        return accumulator + item.Fprice;
    }, 0);


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
                    price: parseFloat(item.price * item.quantity).toString(),
                    quantity: parseInt(item.quantity).toString(),
                    discount: item.discount,
                    Fprice: parseFloat(item.Fprice).toString(),
                };
                orderItems.push(itemData);
            });

            const orderItemsJSON = JSON.stringify(orderItems);

            data.orderId = orderId;
            data.userId = userId;
            data.orderItems = orderItemsJSON;
            
            console.log("order items are ::", orderItems)

            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/Order`, data, {
                headers: {
                    'Content-Type': 'application/json',
                },
                
            });

            if (response.data === "Order is Placed") {
                toast.success("Order is Placed");
                move(`/order-placed/${userId}`);
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


    if (loading) {
        return (
            <div className="col-12 my-5 d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                <Loader />
            </div>
        );
    }

    if (cu._id === undefined || cu.email === "asd@gmail.com" || filterCart.length < 1) {
        return <>
            <Error />
        </>
    }
    return <>
        <div className='container my-5'>
            <div className='row checkout_display'>
                <div className='border col-lg-8 col-sm-12 py-3'>
                    <h4 className="mb-3">Billing address</h4>
                    <form action="" className="needs-validation" onSubmit={handleSubmit(Order)}>
                        <div className="row">
                            <div className="col-md-6 mb-3">
                                <label htmlFor="" className='form_label'>First Name *</label>
                                <input type="text" className="form-control login_form_input"{...register('name1', { required: true })} />
                                {errors.name1 ? <div className='error'>This Field is required</div> : null}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label htmlFor="" className='form_label'>Last Name</label>
                                <input type="text" className="form-control login_form_input"{...register('name2')} />
                            </div>

                            <div className="col-md-6 mb-3">
                                <label htmlFor="" className='form_label'>Mobile*</label>
                                <input type="number" className="form-control login_form_input" {...register('number1', { required: true })} />
                                {errors.number1 ? <div className='error'>This Field is required</div> : null}
                            </div>

                            <div className="col-md-6 mb-3">
                                <label htmlFor="" className='form_label'>Telephone</label>
                                <input type="text" className="form-control login_form_input" {...register('number2')} />
                            </div>

                            <div className="col-md-12 mb-3">
                                <label htmlFor="" className='form_label'>E-mail *</label>
                                <input type="text" className="form-control login_form_input" {...register('email', {
                                    required: true, validate: function (typedValue) {
                                        if (typedValue.match(
                                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\.[0-9]{1, 3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                                        )) {
                                            return true;
                                        } else {
                                            return false;
                                        }
                                    }
                                })} />
                                {errors.email ? <div className='error'>This Field is required</div> : null}
                            </div>


                            <div className="col-md-12 mb-3">
                                <label htmlFor="" className='form_label'>Shipping Address *</label>
                                <input type="text" className="form-control login_form_input" {...register('shipping', { required: true })} />
                                {errors.shipping ? <div className='error'>This Field is required</div> : null}
                            </div>

                        </div>
                        <hr className="mb-4" />

                        <h4 className="mb-3">Payment</h4>

                        <div class="form-check" onClick={() => setMethod("credit")}>
                            <input class="form-check-input" type="radio" name="payment" id="creditCard" />
                            <label class="form-check-label" for="creditCard">
                                Credit Card
                            </label>
                        </div>
                        {method == "credit" &&
                            <div>
                                <p className='error'>This payment Method is not available right now you can select Cash on delivery as your Payment Method</p>
                            </div>
                        }
                        <div class="form-check" onClick={() => setMethod("debit")}>
                            <input class="form-check-input" type="radio" name="payment" id="debitCard" />
                            <label class="form-check-label" for="debitCard">
                                Debit Card
                            </label>
                        </div>
                        {method == "debit" &&
                            <div>
                                <p className='error'>This payment Method is not available right now you can select Cash on delivery as your Payment Method</p>
                            </div>
                        }
                        <div class="form-check" onClick={() => setMethod("paypal")}>
                            <input class="form-check-input" type="radio" name="payment" id="paypal" />
                            <label class="form-check-label" for="paypal">
                                PayPal
                            </label>
                        </div>
                        {method == "paypal" &&
                            <div>
                                <p className='error'>This payment Method is not available right now you can select Cash on delivery as your Payment Method</p>
                            </div>
                        }
                        <div class="form-check" onClick={() => setMethod("cash")}>
                            <input class="form-check-input" type="radio" name="payment" id="cashOnDelivery" {...register('payment', { required: true })} />
                            <label class="form-check-label" for="cashOnDelivery">
                                Cash on Delivery
                            </label>
                            {errors.payment ? <div className='error'>This Field is required</div> : null}

                        </div>

                        <hr className="mb-4" />
                        <button className="btn review_btn btn-lg btn-block">
                            Place Order
                        </button>
                    </form>
                </div>



                <div className='col-lg-4  col-sm-12 px-4 '>
                    <div className='row'>
                        <div className='col-12 d-flex justify-content-between'>
                            <p className='fw-bolder fs-6'>Your Cart</p>
                            <p className='fw-bolder fs-6'>{filterCart?.length}</p>
                        </div>
                    </div>
                    {filterCart.map((item) => {
                        return <>
                            <div className='row border mb-1 pt-3'>
                                <div className='col-3'>
                                    <img className='img-fluid' src={item?.image} alt="No Internet" style={{ width: "100%", height: "auto" }} />
                                </div>
                                <div className='col-9'>
                                    <p className='checout_tittle text-muted'>{item?.title}</p>
                                    <p className='text-end'>{`£${item?.Fprice?.toFixed(2)}`}</p>
                                </div>
                            </div>
                        </>
                    })
                    }
                    <div className='row mt-3'>
                        <div className='px-3 col-12 border d-flex justify-content-between align-items-center'>
                            <p>Total(USD)</p>
                            <p className='fw-bold' >{`£${totalSum?.toFixed(2)}`}</p>

                        </div>
                    </div>

                </div>
            </div>
        </div>

    </>

}

export default Checkout