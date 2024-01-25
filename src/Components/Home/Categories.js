
import React, { useEffect, useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import Loader from "../Loader/Loader"
import axios from 'axios';
import "./home_category.css"

const Categories = () => {

  const move = useNavigate()
  const containerRef = useRef(null);
  const [product, setProduct] = useState([])
  const [loading, setLoading] = useState(true);
  const [counts, setCounts] = useState({
    sofa: 0,
    cornerSofas: 0,
    threeTwoSeaterSofas: 0,
    bed: 0,
    ottomanBox: 0,
    mattress: 0,
    footstools: 0,
  });

  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const handleScroll = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      setShowLeftArrow(container.scrollLeft > 0);
      setShowRightArrow(container.scrollLeft < container.scrollWidth - container.clientWidth);
    }
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (containerRef.current) {
        containerRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);


  const scrollLeft = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.scrollTo({
        left: container.scrollLeft - 300,
        behavior: 'smooth',
      });
    }
  };

  const scrollRight = () => {
    if (containerRef.current) {
      const container = containerRef.current;
      container.scrollTo({
        left: container.scrollLeft + 200,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_BASE_URL}/product`);
        if (res) {
          setProduct(res.data);
          updateCounts(res.data);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
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

  const [data, setData] = useState([])
  
  useEffect(() => {
    setData([
      { title: "All Sofas", img: "/allsofa.jpeg", numbers: counts.sofa, path: "/products/sofa" },
      { title: "Corner Sofas", img: "/cornersofa.jpeg", numbers: counts.cornerSofas, path: "/products/corner-sofas" },
      { title: "3+2 Sofa Sets", img: "/3+2.jpg", numbers: counts.threeTwoSeaterSofas, path: "/products/three-&-two-seater-sofas" },
      { title: "All Beds", img: "/allbeds.jpg", numbers: counts.bed, path: "/products/bed" },
      { title: "Ottoman Box", img: "/ottomanbox.jpg", numbers: counts.ottomanBox, path: "/products/ottoman-box" },
      { title: "Mattresses", img: "/mattress.jpeg", numbers: counts.mattress, path: "/products/mattress" },
      { title: "Footstools", img: "/footstools.jpeg", numbers: counts.footstools, path: "/products/footstools" }
    ]);
  }, [counts]);

  return (
    <div className='container-fluid px-lg-5 px-sm-4 my-5'>
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
        <div className='col-lg-12 col-sm-12' style={{ position: "relative" }}>

          <div className='h_box_main' ref={containerRef}>
            {data.map((product, index) => (
              <div className="h_box" onClick={() => { move(product.path) }} key={index}>
                <div className='h_box_img_main'>
                  <img src={product.img} alt='No Network' />
                </div>
                <div>
                  <p className='text-center m-0 my-3 fw-bolder'>{product.title}</p>
                  {/* <p className="text-center mt-1">{product.numbers} Products</p> */}
                </div>
              </div>
            )
            )}

          </div>
          <button className={`btn bed_left ${showLeftArrow ? '' : 'hidden'}`} onClick={scrollLeft}><IoIosArrowBack /></button>
          <button className={`btn bed_right ${showRightArrow ? '' : 'hidden'}`} onClick={scrollRight}><IoIosArrowForward /></button>

        </div>
      </div>
    </div>
  );
};

export default Categories;