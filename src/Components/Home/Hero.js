import React from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/autoplay';
import { Navigation, Autoplay } from 'swiper/modules';
import "./hero.css"
const Hero = () => {
    let array = [
        { title: "60% off", img: "bed.jpg" },
        { title: "40% off", img: "1.jpg" },
        { title: "60% off", img: "3.jpg" },
        { title: "50% off", img: "4.jpg" },
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
                        >
                            {array.map((data) => {
                                return <SwiperSlide>
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