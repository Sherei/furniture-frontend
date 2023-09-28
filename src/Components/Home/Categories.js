
import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./home_category.css"

const Categories = () => {
  let array = [
    { img: "/sofas.jpg", title: "All Sofas" },
    { img: "/living.jpg", title: "Dinning Tables" },
    { img: "/Beds.jpg", title: "All Beds" },
    { img: "/mattress.jpg", title: "Wardrobes" },
    { img: "/coffee.jpg", title: "Coffee Tables" },
  ]

  let move =useNavigate()

  return (
    <div className='container main_container'>
      <div className='row'>
        <div className='col-lg-12 col-sm-12 my-2 hero_main'>
          <div>
            <p className='fw-bolder fs-5' style={{color:'#fd5d39'}} >Our collections</p>
          </div>
        </div>
        <div className='col-lg-12 col-sm-12'>
          <div className='h_box_main'>
            {array.map((data) => (
              <div className="h_box" onClick={()=>{
                move("/products")
              }}>
                <div className='h_box_img_main'>
                  <img src={data.img} alt='No Network' />
                </div>
                <div>
                  <p className='h_box_p'>{data.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Categories;