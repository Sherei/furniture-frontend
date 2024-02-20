import React from 'react';
import './slider.css'; // Assuming you have your CSS styles defined in slider.css

const Slider = () => {
  return (
    <div className="container-fluid px-0 mx-0 py-3" style={{ backgroundColor: "#F7EEDD" }}>
      <div className="row">
        <div className="col-12 d-flex slider-container">
          <div className="slide-text direction-left">
            <div>
              Up to 30% OFF! 
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              FAST DELIVERY WITHIN 05-07 DAYS!
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              QUALITY GUARANTEED
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
