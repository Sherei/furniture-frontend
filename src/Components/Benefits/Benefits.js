import React from 'react'
import { FaSyncAlt, FaProductHunt, FaRegCreditCard } from "react-icons/fa"
import "./benefit.css"
const Benefits = () => {
    return <>
        <div className='container main_container mb-5' id='benefit'>
            <div className='row'>
                <div className='col-lg-12 col-sm-12 Benefit_main'>
                    <div>
                        <p className='px-4' style={{ fontWeight: "700", fontSize: "20px" , color:"#1b2950" }}>Benefits Of Our Service</p>
                    </div>
                </div>

                <div className='col-lg-12 col-sm-12 my-4'>
                    <div className='benefit_main_box px-lg-5 px-sm-0 gap-5'>
                        <div className='benefit_box'>
                            <div style={{ fontSize: "30px", color: "#fd5d39" }}><FaSyncAlt /></div>
                            <div><p className='text-center' style={{ fontSize: "20px", fontWeight: "600" }}>12 Months Warrenty</p></div>
                            <div><p className='text-center' style={{ fontSize: "15px", fontWeight: "500", marginTop: "-20px" }}>The Most of the U.K</p></div>
                        </div>
                        <div className='benefit_box'>
                            <div style={{ fontSize: "30px", color: "#fd5d39" }}><FaRegCreditCard /></div>
                            <div><p className='text-center' style={{ fontSize: "20px", fontWeight: "600" }}>Flexible Payments</p></div>
                            <div><p className='text-center' style={{ fontSize: "15px", fontWeight: "500", marginTop: "-20px" }}>100% Secure Payments</p></div>
                        </div>
                        <div className='benefit_box'>
                            <div style={{ fontSize: "30px", color: "#fd5d39" }}><FaProductHunt /></div>
                            <div><p className='text-center' style={{ fontSize: "20px", fontWeight: "600" }}>Quality</p></div>
                            <div><p className='text-center' style={{ fontSize: "15px", fontWeight: "500", marginTop: "-20px" }}>100% Original Product</p></div>
                        </div>
                    </div>
                </div>
                <div className='col-lg-12 my-4 d-flex justify-content-center'>

                    <a href="/Products/all">
                        <button className='review_btn'>Browse Products</button>
                    </a>
                </div>

            </div>
        </div>
    </>
}

export default Benefits