import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import { FaCartArrowDown, FaWhatsapp } from "react-icons/fa";
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
                console.log(e);
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
                        <p style={{ fontWeight: "700", fontSize: "20px", color: "#1b2950" }} >Trending Products</p>
                    </div>
                    <div>
                        <p className='view' onClick={() => {
                            move("/Products");
                        }}>
                            View All
                        </p>
                    </div>
                </div>
                {data.filter((product) => product.trending === "true").length === 0 &&
                    <div className='px-4'>
                        No product available related to this category
                    </div>
                }
                <div className="col h_box_main trending_animation">
                    {loading ? (
                        <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }} >
                            <Loader />
                        </div>
                    ) : (
                        data
                            .filter((item) => item.trending === "true")
                            .map((product) => (
                                <div className="t_card py-2" key={product._id} onClick={() => move("/single_Add/" + product._id)}>
                                    <div className='t_img_box'>
                                        <img src={product.images[0]} alt="No network" />
                                        <div className='trending'>
                                            Trending
                                        </div>
                                    </div>
                                    <div className='t_title'>
                                        <p className='px-2'>{product.title}</p>
                                    </div>
                                    <div className='text-left my-3'>
                                        <span className='px-2 t_Fprice'>{`$${product.Fprice}`}</span>
                                        {product.price &&
                                            <span className='t_price'><s>{`$${product.price}`}</s></span>
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
                            ))
                    )}
                </div>
            </div>
        </div>

    </>
}
export default Trending