import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import "./collection.css"
const Allcategories = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0
        });
    }, []);
    const move = useNavigate()

    const collection = [
        { img: "/cornersofa.jpeg", title: "Corner Sofas", path: "/products/corner-sofas" },
        { img: "/3+2.jpg", title: "3+2 Seater Sofa Set", path: "/products/three-&-two-seater-sofas" },
        { img: "/sofa-beds.webp", title: "Sofa Beds", path: "/products/sofa-beds" },
        { img: "/u-shaped.jpg", title: "U Shaped Sofas", path: "/products/u-shaped-sofas" },
        { img: "/leather.webp", title: "Leather Sofas", path: "/products/leather-sofas" },
        { img: "/recliner.jpg", title: "Recliner Sofas", path: "/products/recliner-sofas" },
        { img: "/blog3.jpg", title: "All Sofas", path: "/products/sofa" },
        { img: "/ambassador.jpg", title: "Ambassador Beds", path: "/products/ambassador-beds" },
        { img: "/panel.jpg", title: "Panel Beds", path: "/products/panel-bed" },
        { img: "/wingback.jpg", title: "Wingback beds", path: "/products/wingback-beds-frames" },
        { img: "/bespoke.png", title: "Bespoke Beds", path: "/products/bespoke-beds" },
        { img: "/chesterfield.jpg", title: "Chesterfield Beds", path: "/products/chesterfield-beds" },
        { img: "/divanbed.webp", title: "Divan Beds", path: "/products/divan-beds" },
        { img: "/blog2.jpg", title: "All Beds", path: "/products/bed" },
        { img: "/ottomanbox.jpg", title: "Ottoman box", path: "/products/ottoman-box" },
        { img: "/mattress.jpg", title: "Mattress", path: "/products/mattress" },
        { img: "/footstools.jpg", title: "Footstools", path: "/products/footstools" },
    ]

    return <>
        <div className='container-fluid my-5'>
            <div className='my-5'>
                <p className='fs-2 fw-bolder text-center' style={{ color: "rgb(2, 2, 94)" }}>All Collection</p>
            </div>
            <div className="row px-lg-5 px-2 row-cols-1 row-cols-md-3 row-cols-lg-3 row-cols-sm-2  g-4">
                {collection.map((item, index) => (
                    <a href={item.path}>
                        <div key={index} className='all_collection_main'>
                            <div style={{ position: "relative", width: "100%", height: "200px", overflow: "hidden" }}>
                                <img src={item.img} alt="No Network" className='rounded-3 img-fluid all_img' style={{ width: "100%", height: "100%" }} />
                                <div
                                    className='d-flex align-items-center justify-content-center'
                                    style={{
                                        position: 'absolute',
                                        height: '100%',
                                        width: '100%',
                                        top: '0',
                                        left: '0',
                                        backgroundColor: 'rgba(0, 0, 0, 0.3)',
                                        color: '#fff',
                                        padding: '10px',
                                        boxSizing: 'border-box',
                                    }}
                                >
                                    <p className='m-0 all_title'>{item.title}</p>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}

            </div>
        </div >
    </>
}

export default Allcategories