
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./home_category.css"

const Categories = () => {

  const move = useNavigate()

  const [product, setProduct] = useState([])
  const [counts, setCounts] = useState({
    sofa: 0,
    cornerSofas: 0,
    threeTwoSeaterSofas: 0,
    bed: 0,
    ottomanBox: 0,
    mattress: 0,
    footstools: 0,
  });

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/product`).then((res) => {
      try {
        if (res) {
          setProduct(res.data);
          updateCounts(res.data);
        }
      } catch (e) {

      }
    });
  }, []);

  const updateCounts = (data) => {
    setCounts((prevCounts) => ({
      sofa: data.filter((d) => d.category === 'sofa').length,
      cornerSofas: data.filter((d) => d.subCategory === 'corner-sofas').length,
      threeTwoSeaterSofas: data.filter((d) => d.subCategory === 'three-&-two-seater-sofas').length,
      bed: data.filter((d) => d.category === 'bed').length,
      ottomanBox: data.filter((d) => d.category === 'ottoman-box').length,
      mattress: data.filter((d) => d.category === 'mattress').length,
      footstools: data.filter((d) => d.category === 'footstools').length,
    }));
  };


  return (
    <div className='container main_container'>
      <div className='row'>
        <div className='col-lg-12 col-sm-12 my-2 d-flex  hero_main'>
          <div>
            <p className='fw-bolder fs-5' style={{ color: 'rgb(2, 2, 94)' }} >Our Collection</p>
          </div>
          <div>
            <p className='view ' onClick={() => {
              move("/collections");
            }}>
              View All
            </p>
          </div>
        </div>
        <div className='col-lg-12 col-sm-12'>
          <div className='h_box_main'>
            <div className="h_box" onClick={() => { move('/products/sofa') }}>
              <div className='h_box_img_main'>
                <img src="/sofa.jpg" alt='No Network' />
              </div>
              <div>
                <p className='text-center m-0 mt-3 fw-bolder'>All Sofas</p>
                <p className="text-center mt-1">{counts.sofa} Products</p>
              </div>
            </div>

            <div className="h_box" onClick={() => { move('/products/corner-sofas') }}>
              <div className='h_box_img_main'>
                <img src="/corner.jpg" alt='No Network' />
              </div>
              <div>
                <p className='text-center m-0 mt-3 fw-bolder'>Corner Sofas</p>
                <p className="text-center mt-1">{counts.cornerSofas} Products</p>
              </div>
            </div>

            <div className="h_box" onClick={() => { move('/products/three-&-two-seater-sofas') }}>
              <div className='h_box_img_main'>
                <img src="/three.webp" alt='No Network' />
              </div>
              <div>
                <p className='text-center m-0 mt-3 fw-bolder'>3+2 Sofa Sets</p>
                <p className="text-center mt-1">{counts.threeTwoSeaterSofas} Products</p>
              </div>
            </div>

            <div className="h_box" onClick={() => { move('/products/bed') }}>
              <div className='h_box_img_main'>
                <img src="/bed.jpg" alt='No Network' />
              </div>
              <div>
                <p className='text-center m-0 mt-3 fw-bolder'>All Beds</p>
                <p className="text-center mt-1">{counts.bed} Products</p>
              </div>
            </div>

            <div className="h_box" onClick={() => { move('/products/ottoman-box') }}>
              <div className='h_box_img_main'>
                <img src="/ottoman.jpg" alt='No Network' />
              </div>
              <div>
                <p className='text-center m-0 mt-3 fw-bolder'>Ottoman Box</p>
                <p className="text-center mt-1">{counts.ottomanBox} Products</p>
              </div>
            </div>

            <div className="h_box" onClick={() => { move('/products/mattress') }}>
              <div className='h_box_img_main'>
                <img src="/matres.jpg" alt='No Network' />
              </div>
              <div>
                <p className='text-center m-0 mt-3 fw-bolder'>Mattresses</p>
                <p className="text-center mt-1">{counts.mattress} Products</p>
              </div>
            </div>

            <div className="h_box" onClick={() => { move('/products/footstools') }}>
              <div className='h_box_img_main'>
                <img src="/footstools.jpg" alt='No Network' />
              </div>
              <div>
                <p className='text-center m-0 mt-3 fw-bolder'>Footstools</p>
                <p className="text-center mt-1">{counts.footstools} Products</p>
              </div>
            </div>


          </div>
        </div>

      </div>
    </div>
  );
};

export default Categories;