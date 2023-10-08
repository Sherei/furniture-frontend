import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';
import "./hero.css"
const Hero = () => {
   
    let array = [
        { img: "albero-furniture-bratislava-3RfIi22Y97Y-unsplash (1).jpg" },
        { img: "3.jpg" },
        { img: "1.jpg" },
        { img: "4.jpg" },
        { img: "albero-furniture-bratislava-3RfIi22Y97Y-unsplash (1).jpg" },
        { img: "AdobeStock_246454872_Preview.jpeg" },
        { img: "3.jpg" },
        {img:"AdobeStock_585163350_Preview.jpeg"},
        { img: "bed.jpg" },
        { img: "4.jpg" },
    ]
    return <>
        <div className='container-fluid' id='/'>
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
                                return <SwiperSlide key={index}>
                                    <div className='slide' style={{ position: "relative" }}>
                                        <img src={`/${data.img}`} alt="" />
                                        <div className='slide_detail'>
                                            <img src="/40.png" className='img-fluid' alt="No network" />
                                        </div>
                                    </div>
                                </SwiperSlide>
                            })}

                        </Swiper>

                    </div>
                </div>
            </div>
        </div>

    </>
}

export default Hero