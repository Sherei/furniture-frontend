import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Loader from "../Loader/Loader"

const Ottoman = () => {


    const cu = useSelector(store => store.userSection.cu);
    const move = useNavigate();
    const containerRef = useRef(null);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

    const sendWhatsAppMessage = (title) => {
        const message = `I'm interested in product\n${title}\nCan you provide more details?`;
        const whatsappURL = `https://wa.me/+447392608087?text=${encodeURIComponent(message)}`;
        window.open(whatsappURL, "_blank");
    };

    const handleScroll = () => {
        if (containerRef.current) {
            const container = containerRef.current;
            setShowLeftArrow(container.scrollLeft > 0);
            setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth);
        }
    };

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (containerRef.current) {
                containerRef.current.removeEventListener('scroll', handleScroll);
            }
        };
    }, []);


    const scrollLeft = () => {
        if (containerRef.current) {
            const container = containerRef.current;
            container.scrollTo({
                left: container.scrollLeft - 300,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (containerRef.current) {
            const container = containerRef.current;
            container.scrollTo({
                left: container.scrollLeft + 200,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        setLoading(true)
        try {
            axios.get(`${process.env.REACT_APP_BASE_URL}/product`).then((res) => {
                if (res) {
                    setData(res.data);
                }
                setLoading(false)
            });
        } catch (e) { }
    }, []);

    return (
        <div className='container-fluid px-lg-5 px-sm-4 my-5'>
            <div className='row'>
                <div className='col-lg-12 col-sm-12 my-2 d-flex justify-content-between align-items-center hero_main'>
                    <div>
                        <p className='fw-bolder fs-5' style={{ color: 'rgb(2, 2, 94)' }} >Ottoman Box</p>
                    </div>
                    <div>
                        <a href="/Products/ottoman-box">
                            <p className='view'>
                                View All
                            </p>
                        </a>
                    </div>
                </div>
                <div className='col-lg-12 col-sm-12' style={{ position: "relative" }}>
                    <div className='h_box_main' ref={containerRef}>
                        {data
                            .filter((item) => item.category === "ottoman-box" && item.home === true &&
                                (item.stock === undefined || item.stock === false))
                                .reverse()
                                .slice(0, 20)
                            .map((product, index) => (
                                <div className='card_box' key={index}>
                                   <a href={`/product/${product.title.replace(/ /g, '-')}/${product._id}`}>
                                         <button className='btn order_btn'>View Detail</button>
                                    </a>
                                    <button className='btn card_whatsAp' onClick={() => sendWhatsAppMessage(product.title)}>Buy Via WhatsApp</button>

                                    <a href={`/product/${product.title.replace(/ /g, '-')}/${product._id}`}>
                                         <div className='card_img_box'>
                                            <img src={product.images[0] ? product?.images[0] : "/loader.jpg"} className='img-fluid' alt='No Network'
                                                style={{ opacity: loading ? 0 : 1, transition: "opacity 0.5s ease-in-out" }}
                                            />
                                            <div className='overlay'>
                                                {product.images[1] && <img src={product?.images[1]} alt="" />}
                                            </div>
                                        </div>
                                    </a>
                                    {product?.discount && product?.discount > 0 ? (
                                        <div className='discount'>
                                            {`${product?.discount}%`}
                                        </div>
                                    ) : null}
                                    <p className='card_title px-2'>{product?.title}</p>
                                    <div>
                                        {product?.discount && product?.discount > 0 ? (
                                            <>
                                                <span className='card_Fprice px-2'>{`£${product?.Fprice?.toFixed()}`}</span>
                                                <span className='card_price'><s>{`£${product?.price?.toFixed()}`}</s></span>
                                            </>
                                        ) : (
                                            <span className='card_Fprice px-2'>{`£${product?.Fprice?.toFixed()}`}</span>
                                        )}
                                        <div className='card_btns'></div>
                                    </div>
                                </div>
                            ))}
                    </div>
                    <button className={`btn bed_left ${showLeftArrow ? '' : 'hidden'}`} onClick={scrollLeft}><IoIosArrowBack /></button>
                    <button className={`btn bed_right ${showRightArrow ? '' : 'hidden'}`} onClick={scrollRight}><IoIosArrowForward /></button>
                    {(data?.filter(product => product.category === "ottoman-box" && (product.stock === undefined || product.stock === false)).length === 0 || loading) && (
                    <div className='col-12 d-flex justify-content-center align-items-center' style={{ height: "80vh" }}>
                    {loading ? <Loader /> : "No product available related to this category"}
                </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default Ottoman;
