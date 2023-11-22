import React from 'react'
import "./about.css"
const About = () => {
    return <>
        <div className='container-fluid p-0' id='about'>
            <div className='row p-0'>
                <div className='col-lg-6 col-sm-12 p-0 about_img min-vh-100' >
                    <img src="/about.jpg" alt="No Network" className='img-fluid' style={{ height: "100%" }} />
                </div>
                <div className='col-lg-6 col-md-12 col-sm-12 px-5 py-5 d-flex align-items-center 
                justify-content-center min-vh-100 ' style={{ backgroundColor: "rgb(2, 2, 94)" }}>
                    <div className='row '>
                        <div className='col-lg-10 col-md-10 col-sm-12'>
                            <p className='fs-1 fw-bolder' style={{ color: "#F7EEDD" }}> The House of Luxury Sofa & Beds </p>
                            <p className='about_text' >
                                Sofa&Beds LTD is an independent company that manufacturer’s high-quality sofas, sofa beds, bedframes,
                                and mattresses. We are proud to offer a wide selection of luxury beds and sofas crafted to the highest standards in Bradford, England. Our Sofa & Beds are made using only
                                the finest materials and are built to last,
                                ensuring a ultimate comfortable and restful night’s sleep for years to come.
                            </p>
                            <p className='about_text'>
                                We understand that our customers value convenience, which is why we provide the best value deals for you,
                                so be sure to browse our top-quality sofas, sofa beds , beds and mattresses. We offer fast delivery all over UK.
                                The average delivery time is less than two weeks from the time you place your order with us,
                                making it easy for you to upgrade your home furniture quickly.
                            </p>
                            <p className='about_text'>
                                If you have any questions about our products, please don’t hesitate to contact us.
                                You can contact us on WhatsApp to discuss further. We personally prefer to chat with our customer before taking an order to understand their needs.
                                We are available six days a week and would be happy to provide you with any additional information you may need.
                            </p>
                            <div className='mt-5 text-center'>
                                <a href="https://www.facebook.com/profile.php?id=100094639442134&mibextid=2JQ9oc" target='blank'>
                                    <button className='btn hero_facebook' >Explore On Facebook</button>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default About