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
        <div className='container main_container' id='beds'>
            <div className='row'>
                <div className='col-lg-12 col-sm-12 my-2 d-flex  hero_main'>
                    <div>
                        <p className='fw-bolder fs-5' style={{ color: 'rgb(2, 2, 94)' }}  >3+2 Sofa Sets</p>
                    </div>
                    <div>
                        <p className='view' onClick={() => {
                            move("/Products/three-&-two-seater-sofas");
                        }}>
                            View All
                        </p>
                    </div>
                </div>
                <div className='col-lg-12 col-sm-12' style={{ position: "relative" }}>

                    {data?.filter((product) => product.subCategory === "three-&-two-seater-sofas").length === 0 &&
                        <div className='px-4'>
                            No product available related to this category
                        </div>
                    }
                    <div className='h_box_main' ref={containerRef}>
                        {loading ? (
                            <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "80vh" }} >
                                <Loader />
                            </div>
                        ) : (
                            data
                                .filter((item) => item.subCategory === "three-&-two-seater-sofas")
                                .slice(0, 15).reverse()
                                .map((product, index) => (
                                    <div className='card_box' key={index} onClick={() => move("/single_Add/" + product._id)} >
                                        <button className='btn order_btn' onClick={() => move("/single_Add/" + product._id)}>View Detail</button>
                                        <a href="https://wa.me/+923067208343" target="blank">
                                            <button className='btn card_whatsAp '>Buy Via WhatsApp</button>
                                        </a>
                                        <div className='card_img_box'>
                                            <img src={product?.images[0]} className='img-fluid' alt='No Network' />
                                            <div className='overlay'>
                                                {product.images[1] &&
                                                    <img src={product?.images[1]} alt="" />
                                                }
                                            </div>
                                        </div>
                                        {product?.discount && product?.discount > 0 ? (
                                            <div className='discount'>
                                                {`${product?.discount}%`}
                                            </div>
                                        ) : null}
                                        <p className='card_title px-2'>{product?.title}</p>
                                        <div>
                                            {product?.discount && product?.discount > 0 ? (
                                                <>
                                                    <span className='card_Fprice px-2'>{`£${product?.Fprice?.toFixed(1)}`}</span>
                                                    <span className='card_price'><s>{`£${product?.price?.toFixed(1)}`}</s></span>
                                                </>
                                            ) : (
                                                <span className='card_Fprice px-2'>{`£${product?.Fprice?.toFixed(2)}`}</span>
                                            )}
                                            <div className='card_btns'>

                                            </div>
                                        </div>
                                    </div>
                                ))
                        )}
                    </div>
                    <button className={`btn bed_left ${showLeftArrow ? '' : 'hidden'}`} onClick={scrollLeft}><IoIosArrowBack /></button>
                    <button className={`btn bed_right ${showRightArrow ? '' : 'hidden'}`} onClick={scrollRight}><IoIosArrowForward /></button>

                </div>
            </div>
        </div >
    )
}

export default Three