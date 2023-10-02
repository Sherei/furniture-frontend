
import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./home_category.css"

const Categories = () => {
  let array = [
    { img: "/sofas.jpg", title: "All Sofas", path:"/Products/" + "sofa" },
    { img: "/Beds.jpg", title: "All Beds" , path:"/Products/" + "bed"},
    { img: "/living.jpg", title: "Dinning Tables", path:"/Products/" + "dinning" },
    { img: "/mattress.jpg", title: "Wardrobes" , path:"/Products/" + "wardrobes"},
    { img: "/coffee.jpg", title: "Coffee Tables" , path:"/Products/" + "coffee"},
  ]

  let move =useNavigate()

  return (
    <div className='container main_container'>
      <div className='row'>
        <div className='col-lg-12 col-sm-12 my-2 hero_main'>
          <div>
            <p className='fw-bolder fs-5' style={{color:'rgb(2, 2, 94)'}} >Our collections</p>
          </div>
        </div>
        <div className='col-lg-12 col-sm-12'>
          <div className='h_box_main'>
            {array.map((data) => (
              <div className="h_box" onClick={()=>{
                move(data.path)
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