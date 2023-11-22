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
        { img: "https://res.cloudinary.com/dlw9hxjr4/image/upload/v1699892038/glfklthcuf6edi9cpg8b.jpg", title: "Corner Sofas", path: "/products/corner-sofas" },
        { img: "/3_1060x550_crop_center.webp", title: "3+2 Seater Sofa Set", path: "/products/three-&-two-seater-sofas" },
        { img: "/3_1060x550_crop_center.webp", title: "Sofa-Bed", path: "/products/sofa-beds" },
        { img: "/3_1060x550_crop_center.webp", title: "Fabric Sofas", path: "/products/fabric-sofas" },
        { img: "/3_1060x550_crop_center.webp", title: "Chesterfield Sofas", path: "/products/chesterfield-sofas" },
        { img: "/3_1060x550_crop_center.webp", title: "U Shaped Sofas", path: "/products/u-shaped-sofas" },
        { img: "/3_1060x550_crop_center.webp", title: "Leather Sofas", path: "/products/leather-sofas" },
        { img: "/3_1060x550_crop_center.webp", title: "Recliner Sofas", path: "/products/recliner-sofas" },
        { img: "/3_1060x550_crop_center.webp", title: "All Sofas", path: "/products/sofa" },
        { img: "/3_1060x550_crop_center.webp", title: "Ambassador Beds", path: "/products/ambassador-beds" },
        { img: "/3_1060x550_crop_center.webp", title: "Panel Beds", path: "/products/panel-bed" },
        { img: "/3_1060x550_crop_center.webp", title: "Wingback bed Frames", path: "/products/wingback-beds-frames" },
        { img: "/3_1060x550_crop_center.webp", title: "Ottoman Beds", path: "/products/ottoman-beds" },
        { img: "/3_1060x550_crop_center.webp", title: "Bespoke Beds", path: "/products/bespoke-beds" },
        { img: "/3_1060x550_crop_center.webp", title: "Chesterfield Beds", path: "/products/chesterfield-beds" },
        { img: "/3_1060x550_crop_center.webp", title: "Divan Beds", path: "/products/divan-beds" },
        { img: "/3_1060x550_crop_center.webp", title: "All Beds", path: "/products/bed" },
        { img: "/3_1060x550_crop_center.webp", title: "Ottoman box", path: "/products/ottoman-box" },
        { img: "/3_1060x550_crop_center.webp", title: "Mattress", path: "/products/mattress" },
        { img: "/3_1060x550_crop_center.webp", title: "FootStools & Puffs", path: "/products/footstools" },
    ]

    return <>
        <div className='container-fluid my-5'>
            <div className='my-5'>
                <p className='fs-2 fw-bolder text-center'>All Collection</p>
            </div>
            <div className="row px-lg-5 px-2 row-cols-1 row-cols-md-3 row-cols-lg-3 row-cols-sm-2  g-4">
                {collection.map((item, index) => (
                    <div key={index} className='all_collection_main' onClick={() => move(item.path)}>
                        <div style={{ position: "relative", width: "100%", height: "200px", overflow: "hidden" }}>
                            <img src={item.img} alt="No Network" className='rounded-3 img-fluid all_img' style={{ width: "100%", height: "100%" }} />
                            <div className='w-100' style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
                                <p className='m-0 all_title'>{item.title}</p>
                            </div>
                        </div>
                    </div>
                ))}

            </div>
        </div >
    </>
}

export default Allcategories