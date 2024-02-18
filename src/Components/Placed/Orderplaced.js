import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import Loader from '../Loader/Loader';
import Lottie from 'lottie-react';
import celebration from "../Animations/celebration.json"


const Orderplaced = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    const move = useNavigate();
    const cu = useSelector((store) => store.userSection.cu);
    const { userId } = useParams();
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        setLoading(true);
        try {
            axios.get(`${process.env.REACT_APP_BASE_URL}/order`)
                .then((res) => {
                    if (res.data && res.data.length > 0) {
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

    const filterOrder = order.filter((item) => userId === item.userId);

    if (loading) {
        return (
            <div className="col-12 my-5 d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                <Loader />
            </div>
        );
    }

    if (cu._id === undefined || cu.email === "asd@gmail.com" || filterOrder.length < 1) {
        return <>
            <div className="col-12 my-5 d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                <Loader />
            </div>
        </>
    }

    return (
        <div className="container my-5">
            <div className="row">
                {/* <div className='col' style={{position:"relative"}}>
                <Lottie animationData={celebration} loop={20} autoplay={true}
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        zIndex: 100,

                    }} />

                </div> */}
                <center>
                    <div className="col-12" style={{ minHeight: "80vh" }}>
                        <p className='text-center' style={{ lineHeight: "50px" }}>
                            Thank you for placing an order, <br />
                            Your Tracking ID is: <b>{filterOrder[0].orderId}</b> <br />
                            Order will be delivered within 05-07 working days. We will update you soon. 
                        </p>
                        <div className='order_btns'>
                        <a href={`/order-detail/${filterOrder[0]._id}`}>
                                <button className="review_btn cursor px-5" type='button'>
                                    Order Detail
                                </button>
                            </a>

                            <a href="/Products/all">
                                <button className="review_btn cursor px-5" type='button'>
                                    Browse  More Products
                                </button>
                            </a>

                        </div>
                    </div>
                </center>
            </div >
        </div >
    );
};

export default Orderplaced;
