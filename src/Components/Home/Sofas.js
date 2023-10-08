import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Loader from "../Loader/Loader"


const Sofas = () => {
    let cu = useSelector(store => store.userSection.cu);

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);

    let move = useNavigate();

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
                        <p className='fw-bolder fs-5' style={{color:'rgb(2, 2, 94)'}}  >All Sofas</p>
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

                    {data.filter((product) => product.category === "sofa").length === 0 &&
                        <div className='px-4'>
                            No product available related to this category
                        </div>
                    }
                    <div className='h_box_main'>
                        {loading ? (
                            <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "80vh" }} >
                                <Loader />
                            </div>
                        ) : (
                            data
                                .filter((item) => item.category === "sofa")
                                .slice(0, 15)
                                .map((product, index) => (
                                    <div className='card_box' key={index} >
                                        <button className='btn order_btn' onClick={() => move("/single_Add/" + product._id)}>View Detail</button>

                                        <a href="https://wa.me/+923067208343">

                                            <button className='btn card_whatsAp '>Buy Via WhatsApp</button>
                                        </a>
                                        <div className='card_img_box' onClick={() => move("/single_Add/" + product._id)}>
                                            <img src={product.images[0]} className='img-fluid' alt='No Network' />
                                            {product.discount && product.discount > 0 ? (
                                                <div className='discount'>
                                                    {`${product.discount}%`}
                                                </div>
                                            ) : null}
                                              <div className='overlay'>
                                                {product.images[1] &&
                                                    <img src={product.images[1]} alt="" />
                                                }
                                            </div>
                                        </div>

                                        <p className='card_title px-2'>{product.title}</p>
                                        <div>
                                            {product.discount && product.discount > 0 ? (
                                                <>
                                                    <span className='card_Fprice px-2'>{`£${product.Fprice.toFixed(1)}`}</span>
                                                    <span className='card_price'><s>{`£${product.price.toFixed(1)}`}</s></span>
                                                </>
                                            ) : (
                                                <span className='card_Fprice px-2'>{`£${product.Fprice.toFixed(2)}`}</span>
                                            )}
                                            <div className='card_btns'>

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

export default Sofas;
