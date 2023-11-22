import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const Allcategories = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0
        });
    }, []);
    const move = useNavigate()

    return <>
        <div className='container-fluid my-5'>
            <div className='my-5'>
                <p className='fs-2 fw-bolder text-center'>All Collection</p>
            </div>
            <div className="row px-lg-5 px-2 row-cols-1 row-cols-md-3 row-cols-lg-3 row-cols-sm-1  g-4">
                <div onClick={() => move('/products/corner-sofas')}>
                    <div style={{ position: "relative", width: "100%", height: "200px", overflow: "hidden" }}>
                        <img src="/3_1060x550_crop_center.webp" alt="No Network" className='rounded-3 img-fluid' style={{ width: "100%", height: "100%" }} />
                        <div>
                            <p className='fw-bolder fs-3 text-uppercase m-0' style={{
                                color: "#02025E",
                            }}>Corner Sofas</p>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </>
}

export default Allcategories