import React, { useState, useRef, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import {Autoplay } from 'swiper/modules';
import 'swiper/css/autoplay';
import { FaCartArrowDown, FaWhatsapp } from "react-icons/fa";
import Loader from '../Loader/Loader';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import "./trending.css"

const Trending = () => {

    const cu = useSelector(store => store.userSection.cu);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    const move = useNavigate()

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

    return <>
        <div className='container main_container' id='beds'>
            <div className='row'>
                <div className='col-lg-12 col-sm-12 my-2 d-flex  justify-content-between'>
                    <div>
                        <p className='fw-bolder fs-5' style={{color:'rgb(2, 2, 94)'}} >Trending Products</p>
                    </div>
                    <div>
                        <p className='view' onClick={() => {
                            move("/Products");
                        }}>
                            View All
                        </p>
                    </div>
                </div>
                {data.filter((product) => product.feature === "true").length === 0 &&
                    <div className='px-4'>
                        No product available related to this category
                    </div>
                }
                <div className="col">
                    <Swiper
                        spaceBetween={30}
                        modules={[Autoplay]}
                        autoplay={{ delay: 3000 }}
                        className="mySwiper"
                        breakpoints={{
                            640: {
                                slidesPerView: 2,
                            },
                            992: {
                                slidesPerView: 3,
                            },
                            1200: {
                                slidesPerView: 3,
                            },
                        }}
                    >
                        {loading ? (
                            <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "80vh" }} >
                                <Loader />
                            </div>
                        ) : (data
                            .filter((item) => item.trending === "true")
                            .map((product) => (

                                <SwiperSlide className='t_slide'>
                                    <div className="t_card py-2" key={product._id} >
                                        <div className='t_img_box' onClick={() => move("/single_Add/" + product._id)}>
                                            <img src={product.images[0]} alt="No network" />
                                            <div className='trending'>
                                                Trending
                                            </div>
                                            <div className='overlay'>
                                                {product.images[1] &&
                                                    <img src={product.images[1]} alt="" />
                                                }
                                            </div>
                                        </div>
                                        <div className='t_title'>
                                            <p className='px-2'>{product.title}</p>
                                        </div>
                                        <div className='text-left my-3'>
                                            <span className='px-2 t_Fprice'>{`£${product.Fprice.toFixed(1)}`}</span>
                                            {product.price &&
                                                <span className='t_price'><s>{`£${product.price.toFixed(1)}`}</s></span>
                                            }
                                        </div>
                                        <div className='t_buttons'>
                                            <div>
                                                <button className='btn t_shopping' onClick={() => {
                                                    if (cu._id === undefined) {
                                                        toast.warning("Login to Buy");
                                                        move("/login");
                                                    } else {
                                                        toast.success("Product Added");
                                                    }
                                                }}><FaCartArrowDown /></button>
                                            </div>
                                            <div>
                                                <a href="https://wa.me/+923067208343">
                                                    <button className='btn t_whatsapp'><FaWhatsapp /></button>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </SwiperSlide>
                            ))
                        )}
                    </Swiper>
                </div>
            </div>
        </div>

    </>
}
export default Trending