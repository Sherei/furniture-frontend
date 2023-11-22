import React from 'react'

const Allcategories = () => {
    return <>
        <div className='container my-5'>
            <div className="row row-cols-2 row-cols-md-4 row-cols-lg-4 row-cols-sm-2  g-4">
                <div>
                    <div style={{ position: "relative", width: "100%", height: "200px" }}>
                        <img src="/3_1060x550_crop_center.webp" alt="No Network" style={{ width: "100%", height: "100%" }} />
                        <div style={{
                            position: "absolute",
                            top: "50%",

                        }}>
                            <p className='fw-bolder fs-3 text-uppercase' style={{fontFamily:"giki"}}>Beds</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default Allcategories