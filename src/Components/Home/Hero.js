import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';
import "./hero.css"
const Hero = () => {

    return <>
        <div className='container-fluid px-0 mx-0' id='/'>
            <div className='row'>
                <div className='col-lg-12 px-0'>
                    <div className='hero_main px-0'>
                        <Swiper
                            navigation={false}
                            modules={[Navigation, Autoplay]}
                            className="mySwiper"
                            autoplay={{
                                delay: 3000,
                                disableOnInteraction: false,
                            }}
                            loop={true}
                            resistance={false}
                            effect="slide"
                        >
                            <SwiperSlide>
                                <div className='slide' style={{ position: "relative" }}>
                                    <img src="/bed.webp" alt="No Network" />
                                    <div className='hero_detail'>
                                        <h1 className='hero_heading mb-4'>Prime Quality Bed4U</h1>
                                        <p className='hero_text'>Already Established on Facebook (Bed4U AND Bed4U Northern Ireland & Ireland),
                                            we have now decided to make it easier for our customers to choose bed designs, sizes, colour they want,
                                            directly from our website. Feel free to contact us or
                                            visit our facebook pages for all lovely pictures of Customers beds & their reviews regrading our products.
                                        </p>
                                        <button className='btn my-5' style={{backgroundColor:"#1877F2", color:"white"}}>Explore On Faceook</button>
                                    </div>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide>
                                <div className='slide' style={{ position: "relative" }}>
                                    <img src="/6.jpg" alt="No Network" />
                                    <div className='hero_detail'>
                                        <h1 className='hero_heading'>Prime Quality Sofa4U</h1>
                                        <p className='hero_text'>
                                            Already Established on Facebook (Bed4U AND Bed4U Northern Ireland & Ireland),
                                            we have now decided to make it easier for our customers to choose bed designs, sizes, colour they want,
                                            directly from our website. Feel free to contact us or
                                            visit our facebook pages for all lovely pictures of Customers beds & their reviews regrading our products.
                                        </p>
                                        <button className='btn my-5' style={{backgroundColor:"#25D366", color:"white"}}>Explore On WhatsApp</button>
                                    </div>
                                </div>
                            </SwiperSlide>

                            <SwiperSlide>
                                <div className='slide' style={{ position: "relative" }}>
                                    <img src="/foot.jpg" alt="No Network" />
                                    <div className='hero_detail'>
                                        <h1 className='hero_heading'>Prime Quality Footstools</h1>
                                        <p className='hero_text'>
                                            Already Established on Facebook (Bed4U AND Bed4U Northern Ireland & Ireland),
                                            we have now decided to make it easier for our customers to choose bed designs, sizes, colour they want,
                                            directly from our website. Feel free to contact us or
                                            visit our facebook pages for all lovely pictures of Customers beds & their reviews regrading our products.
                                        </p>
                                        <button className='btn  my-5' style={{backgroundColor:"#E4405F", color:"white"}}>Explore On Instagram</button>
                                    </div>
                                </div>
                            </SwiperSlide>
                        </Swiper>

                    </div>
                </div>
            </div>
        </div>

    </>
}

export default Hero