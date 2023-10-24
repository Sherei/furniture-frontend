import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import { Error } from '../Error/Error';
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
        axios.get(`${process.env.REACT_APP_BASE_URL}/order`)
            .then((res) => {
                try {
                    if (res.data && res.data.length > 0) {
                        setOrder(res.data);
                    }
                } catch (e) {
                    // console.log(e);
                } finally {
                    setLoading(false);
                }
            });
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
        return <Error />;
    }

    return (
        <div className="container my-5" style={{ position: "relative" }}>
            <div className="row">
                <Lottie animationData={celebration} loop={20} autoplay={true}
                    style={{
                        position: "absolute",
                        width: "100%",
                        height: "100%",
                        zIndex: 1000,

                    }} />
                <center>
                    <div className="col-12" style={{ minHeight: "80vh" }}>
                        <p className='text-center' style={{ lineHeight: "50px" }}>
                            Thank you for placing an order, <br />
                            Your Order ID is: <b>{filterOrder[0].orderId}</b> <br />
                            Order will be delivered within 05-07 working days

                        </p>
                        <div className='d-flex gap-lg-4 gap-md-4 gap-sm-4 gap-2 flex-wrap align-items-center justify-content-center'
                            style={{ zIndex: 20000 }}>
                            <button className="review_btn my-3" onClick={() => {
                                move(`/user-profile/${cu._id}`)
                            }}
                            style={{ zIndex: 20000 }}>
                                My Order <FaArrowRight />
                            </button>
                            <a href="/Products">
                                <button className="review_btn my-3"
                            style={{ zIndex: 20000 }}>
                                    Browse Products <FaArrowRight />
                                </button>
                            </a>
                        </div>
                    </div>
                </center>
            </div>
        </div>
    );
};

export default Orderplaced;
