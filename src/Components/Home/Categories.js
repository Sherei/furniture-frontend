
import React from 'react'
import { useNavigate } from 'react-router-dom';
import "./home_category.css"

const Categories = () => {
  let array = [
    { img: "/sofa.jpg", title: "All Sofas", path:"/Products/" },
    { img: "/bed.jpg", title: "All Beds" , path:"/Products"},
    { img: "/ottoman.jpg", title: "Ottoman Box" , path:"/Products/"},
    { img: "/matres.jpg", title: "Mattresses", path:"/Products/" },
    { img: "/footstools.jpg", title: "Fotstools" , path:"/Products/"},
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
            {array.map((data, index) => (
              <div className="h_box" key={index} onClick={()=>{
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