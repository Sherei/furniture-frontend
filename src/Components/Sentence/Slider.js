import React from 'react';
import './slider.css';

const Slider = () => {
  return (
    <div className="container-fluid px-0 mx-0 py-3" style={{ backgroundColor: "rgba(2, 2, 94, 0.6)" }}>
      <div className="row">
        <div className="col-12 d-flex slider-container">
          <div className="slide-text slide1">Up to 30% OFF!</div>
          <div className="slide-text slide2">DELIVERY WITHIN 05-07 DAYS!</div>
        </div>
      </div>
    </div>
  );
};

export default Slider;
