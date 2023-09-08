import React, { useState, useEffect } from 'react'
import { FaAngleLeft, FaAngleRight } from "react-icons/fa"
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Bars } from 'react-loader-spinner';

const Sofas = () => {
    let cu = useSelector(store => store.userSection.cu)

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    let move = useNavigate();

    useEffect(() => {
        axios.get('https://server-lilac-five.vercel.app/product').then((res) => {
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


    return (
        <div className='container-fluid my-4' id='beds'>
            <div className='row'>
                <div className='col-lg-12 col-sm-12 my-2 d-flex  hero_main'>
                    <div>
                        <p style={{ fontWeight: "700", fontSize: "20px" }} >All Sofas</p>
                    </div>
                    <div>
                        <p className='view' onClick={() => {
                            move("/Products/" + "sofa");
                        }}>
                            View All
                        </p>
                    </div>
                </div>
                <div className='col-lg-12 col-sm-12' style={{ position: "relative" }}>
                    <div className='arrow_icons_main'>
                        <div className='h_box_icon1' >
                            <FaAngleLeft />
                        </div>
                        <div className='h_box_icon2'>
                            <FaAngleRight />
                        </div>
                    </div>

                    <div className='h_box_main'>
                        {loading ? (
                             <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{height:"50vh"}} >
                             <Bars
                                 height="50"
                                 width="80"
                                 color="#1b2950"
                                 ariaLabel="bars-loading"
                                 wrapperStyle={{}}
                                 wrapperClass=""
                                 visible={true}
                             />
                         </div>
                        ) : (
                            data
                                .filter((item) => item.category === "sofa")
                                .slice(0, 15)
                                .map((product) => (

                                    <div className="bed_box">

                                        <div className='b_box_img_main' onClick={() => move("/single_Add/" + product._id)}>
                                            <img src={product.images[0]} alt='No Network' />

                                            {product.discount && product.discount > 0 ? (
                                                <div className='discount'>
                                                    {`-${product.discount}%`}
                                                </div>
                                            ) : null}

                                        </div>
                                        <div className=''>
                                            <p className='card_title'>{product.title}</p>
                                        </div>
                                        <div className='px-2 display'>
                                            {product.description &&
                                                <div>
                                                    <p className='card_description'>{product.description.slice(0, 90)}...</p>
                                                </div>
                                            }
                                            <div className='d-flex'>
                                                <div className='d-flex' style={{ position: "relative", width: "100%" }}>
                                                    <p className='px-1'><b>Price :</b></p>
                                                    {product.discount && product.discount > 0 ? (
                                                        <>
                                                            <span className='card_Fprice'>{`${product.Fprice.toFixed(2)}$`}</span>
                                                            <span><s>{`${product.price.toFixed(2)}$`}</s></span>
                                                        </>
                                                    ) : (
                                                        <span className='card_Fprice'>{`${product.Fprice.toFixed(2)}$`}</span>
                                                    )}
                                                </div>
                                            </div>
                                            <div className='d-flex justify-content-center'>
                                                <a onClick={() => {
                                                    if (cu._id === undefined) {
                                                        toast.warning("Login to Buy")
                                                        move("/login")
                                                    } else {
                                                        toast.success("Product Added")
                                                    }
                                                }} x>
                                                    <button className='order_btn'>Add To Cart</button>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))
                        )}
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Sofas