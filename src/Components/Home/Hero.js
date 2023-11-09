import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';
import "./hero.css"
import { useNavigate } from 'react-router-dom';
const Hero = () => {

    const array = [
        { img: "/6.jpg" },
        { img: "/4.jpg" },
        { img: "/foot.jpg" },
        { img: "/AdobeStock_246454872_Preview.jpeg" },
        { img: "/3.jpg" },
    ]
    const move = useNavigate()

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
                            {array.map((data, index) => {
                                return <SwiperSlide>
                                    <div className='slide' key={index} style={{ position: "relative" }}>
                                        <img src={data.img} alt="No Network" />
                                        <div className='hero_detail'>
                                            <button className='btn hero_shop' onClick={() => move('/products/all')}>SHOP NOW</button>
                                           
                                        </div>
                                    </div>
                                </SwiperSlide>
                            })

                            }


                        </Swiper>

                    </div>
                </div>
            </div>
        </div>

    </>
}

export default Hero