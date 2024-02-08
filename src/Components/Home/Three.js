import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Loader from "../Loader/Loader"

const Three = () => {

    const cu = useSelector(store => store.userSection.cu);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const move = useNavigate();
    const containerRef = useRef(null);
    const [showLeftArrow, setShowLeftArrow] = useState(false);
    const [showRightArrow, setShowRightArrow] = useState(true);

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
        axios.get(`${process.env.REACT_APP_BASE_URL}/product`).then((res) => {
            try {
                if (res) {
                    setData(res.data);
                }
            } catch (e) {
                // console.log(e);
            } finally {
                setLoading(false);
            }
        });
    }, []);

    return (
        <div className='container-fluid px-lg-5 px-sm-4 my-5'>
            <div className='row'>
                <div className='col-lg-12 col-sm-12 my-2 d-flex  hero_main'>
                    <div>
                        <p className='fw-bolder fs-5' style={{ color: 'rgb(2, 2, 94)' }}  >3+2 Sofa Sets</p>
                    </div>
                    <div>
                        <a href="/Products/three-&-two-seater-sofas">
                            <p className='view'>
                                View All
                            </p>
                        </a>
                    </div>
                </div>
                <div className='col-lg-12 col-sm-12' style={{ position: "relative" }}>
                    <div className='h_box_main' ref={containerRef}>
                        {data
                            .filter((item) => item.subCategory === "three-&-two-seater-sofas" && item.home === true && item.stock === undefined)
                            .map((product, index) => (
                                <div className='card_box' key={index}>
                                    <a href={"/single_Add/" + product._id}>
                                        <button className='btn order_btn'>View Detail</button>
                                    </a>
                                    <a href="https://wa.me/+447392608087" target="blank">
                                        <button className='btn card_whatsAp'>Buy Via WhatsApp</button>
                                    </a>
                                    <a href={"/single_Add/" + product._id}>
                                        <div className='card_img_box'>
                                            <img src={product?.images[0]} className='img-fluid' alt='No Network'
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
                                                {/* <span className='card_price'><s>{`£${product?.price?.toFixed(1)}`}</s></span> */}
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

                    {(data?.filter(product => product.subCategory === "three-&-two-seater-sofas" && product.stock === undefined).length === 0 || loading) && (
                        <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "80vh" }}>
                            {loading ? <Loader /> : "No product available related to this category"}
                        </div>
                    )}

                </div>
            </div>
        </div >
    )
}

export default Three