import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import { Error } from '../Error/Error';
import Loader from '../Loader/Loader';
import Lottie from 'react-lottie';
import celebration from "../Animations/celebration.json"

const Orderplaced = () => {

    const move = useNavigate();

    const cu = useSelector((store) => store.userSection.cu);
    const { userId } = useParams();
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [animationState, setAnimationState] = useState({
        isStopped: false,
        isPaused: false,
    });

    useEffect(() => {
        setLoading(true);
        axios.get(`${process.env.REACT_APP_BASE_URL}/order`)
            .then((res) => {
                try {
                    if (res.data && res.data.length > 0) {
                        setOrder(res.data);
                    }
                } catch (e) {
                    console.log(e);
                } finally {
                    setLoading(false);
                }
            });
    }, []);

    const filterOrder = order.filter((item) => userId === item.userId)


    const defaultOptions = {
        loop: 1,
        autoplay: true,
        animationData: celebration,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    if (loading) {
        return (
            <div className="col-12 my-5 d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                <Loader />
            </div>
        );
    }

    if (cu._id === undefined || cu.email === "asd@gmail.com" || filterOrder.length < 1) {
        return <>
            <Error />
        </>
    }

    return (
        <div className="container my-5" style={{ position: "relative" }}>
            <div className="row">
                <center>
                    <div className="col-12" style={{ minHeight: "80vh" }}>
                        <Lottie
                            options={defaultOptions}
                            isStopped={animationState.isStopped}
                            isPaused={animationState.isPaused}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100vh',
                            }}
                        />
                        <p className='text-center' style={{ lineHeight: "50px" }}>
                            Thank you for placing an order, <br />
                            Your Order ID is: <b>{filterOrder[0].orderId}</b>
                        </p>
                        <div className='d-flex gap-lg-4 gap-md-4 gap-sm-4 gap-2 flex-wrap align-items-center justify-content-center'
                            style={{
                                zIndex: 20000
                            }}>
                            <button className="review_btn my-3" onClick={() => {
                                move(`/user-profile/${cu._id}`)
                            }}>
                                My Order <FaArrowRight />
                            </button>
                            <a href="/Products/all">
                                <button className="review_btn my-3">
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
