import React from 'react'
import { FaCartArrowDown, FaWhatsapp } from "react-icons/fa";
import { useNavigate } from 'react-router-dom'
import "./trending.css"
const Trending = () => {

    let move = useNavigate()

    return <>
        <div className='container main_container' id='beds'>
            <div className='row'>
                <div className='col-lg-12 col-sm-12 my-2 d-flex  justify-content-between'>
                    <div>
                        <p style={{ fontWeight: "700", fontSize: "20px", color: "#1b2950" }} >Feature Products</p>
                    </div>
                    <div>
                        <p className='view' onClick={() => {
                            move("/Products/" + "feature");
                        }}>
                            View All
                        </p>
                    </div>
                </div>
            </div>
            <div className="row row-cols-1 row-cols-md-4 row-cols-lg-3 row-cols-sm-2 g-4">
                <div className="col t_hover py-2" style={{position:"relative",overflow:"hidden"}}>
                    <div className='t_img_box'>
                        <img src="alaska-large-corner-bg-2.jpg" alt="No network" />
                        <div className='trending'>
                            Trending
                        </div>
                    </div>
                    <div className='t_title'>
                        <p className='px-2'>Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello Hello text-overflow: ellipsis; text-overflow: ellipsis;</p>
                    </div>
                    <div className='text-left my-3'>
                        <span className='px-2 t_Fprice'>$12500</span>
                        <span className='t_price'><s>$1500</s></span>
                    </div>
                    <div className='t_buttons'>
                        <div>
                            <button className='btn t_shopping'><FaCartArrowDown /></button>
                        </div>
                        <div>
                            <button className='btn t_whatsapp'><FaWhatsapp /></button>

                        </div>
                    </div>
                </div>
                
            </div>
        </div>

    </>
}
export default Trending