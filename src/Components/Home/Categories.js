
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./home_category.css"

const Categories = () => {
  let array = [

    { img: "/footstools.jpg", title: "Fotstools", path: "/Products/" },
  ]
  const move = useNavigate()

  const [product, setProduct] = useState([])

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/product`).then((res) => {
      try {
        if (res) {
          setProduct(res.data);
        }
      } catch (e) {

      }
    });
  }, []);

  return (
    <div className='container main_container'>
      <div className='row'>
        <div className='col-lg-12 col-sm-12 my-2 hero_main'>
          <div>
            <p className='fw-bolder fs-5' style={{ color: 'rgb(2, 2, 94)' }} >Our collections</p>
          </div>
        </div>
        <div className='col-lg-12 col-sm-12'>
          <div className='h_box_main'>
            <div className="h_box" onClick={()=>{move('/products/sofa')}}>
              <div className='h_box_img_main'>
                <img src="/sofa.jpg" alt='No Network' />
              </div>
              <div>
                <p className='text-center m-0 mt-3 fw-bolder'>All Sofas</p>
                <p className='text-center mt-1'>({product.filter(data => data.category === "sofa").length} Products)</p>
              </div>
            </div>

            <div className="h_box" onClick={()=>{move('/products/corner-sofas')}}>
              <div className='h_box_img_main'>
                <img src="/corner.jpg" alt='No Network' />
              </div>
              <div>
                <p className='text-center m-0 mt-3 fw-bolder'>Corner Sofas</p>
                <p className='text-center mt-1'>({product.filter(data => data.subCategory === "corner-sofas").length} Products)</p>
              </div>
            </div>

            <div className="h_box" onClick={()=>{move('/products/sofa-sets')}}>
              <div className='h_box_img_main'>
                <img src="/set.webp" alt='No Network' />
              </div>
              <div>
                <p className='text-center m-0 mt-3 fw-bolder'>Sofa Sets</p>
                <p className='text-center mt-1'>({product.filter(data => data.subCategory === "sofa-sets").length} Products)</p>
              </div>
            </div>

            <div className="h_box" onClick={()=>{move('/products/three-&-two-seater-sofas')}}>
              <div className='h_box_img_main'>
                <img src="/three.webp" alt='No Network' />
              </div>
              <div>
                <p className='text-center m-0 mt-3 fw-bolder'>3 & 2 Seater</p>
                <p className='text-center mt-1'>({product.filter(data => data.subCategory === "three-&-two-seater-sofas").length} Products)</p>
              </div>
            </div>

            <div className="h_box" onClick={()=>{move('/products/bed')}}>
              <div className='h_box_img_main'>
                <img src="/bed.jpg" alt='No Network' />
              </div>
              <div>
                <p className='text-center m-0 mt-3 fw-bolder'>All Beds</p>
                <p className='text-center mt-1'>({product.filter(data => data.category === "bed").length} Products)</p>
              </div>
            </div>

            <div className="h_box" onClick={()=>{move('/products/ottoman-box')}}>
              <div className='h_box_img_main'>
                <img src="/ottoman.jpg" alt='No Network' />
              </div>
              <div>
                <p className='text-center m-0 mt-3 fw-bolder'>Ottoman Box</p>
                <p className='text-center mt-1'>({product.filter(data => data.category === "ottoman-box").length} Products)</p>
              </div>
            </div>

            <div className="h_box" onClick={()=>{move('/products/mattress')}}>
              <div className='h_box_img_main'>
                <img src="/matres.jpg" alt='No Network' />
              </div>
              <div>
                <p className='text-center m-0 mt-3 fw-bolder'>Mattresses</p>
                <p className='text-center mt-1'>({product.filter(data => data.category === "mattress").length} Products)</p>
              </div>
            </div>

            <div className="h_box" onClick={()=>{move('/products/footstools')}}>
              <div className='h_box_img_main'>
                <img src="/footstools.jpg" alt='No Network' />
              </div>
              <div>
                <p className='text-center m-0 mt-3 fw-bolder'>Footstools</p>
                <p className='text-center mt-1'>({product.filter(data => data.category === "footstools").length} Products)</p>
              </div>
            </div>


          </div>
        </div>

      </div>
    </div>
  );
};

export default Categories;