import React from 'react';
import './slider.css';

const Slider = () => {
  return (
    <div className="container-fluid px-0 mx-0 py-3" style={{ backgroundColor: "rgba(2, 2, 94, 0.6)" }}>
      <div className="row">
        <div className="col-12 d-flex slider-container">
          <p className="slide-text">Up to 30% OFF!</p>
          <p className="slide-text">IMMEDIATE UK DELIVERY!</p>
          <p className="slide-text ">WITHIN 05-07 DAYS!</p>
        </div>
      </div>
    </div>
  );
};

export default Slider;
