import React from 'react'
import "./footer.css"
const Footer = () => {
  return <>
    <div className='container-fluid' style={{ backgroundColor: "#1b2950" }}>
      <div className='row'>
        <div className='col-lg-12 d-flex align-items-center py-3' >
            <p className='footer_font' style={{ color: "white"}}>All Rights Reserved By <b>RJF Furnishing</b> @2023 Created By <b>Sharjeel Akhtar</b></p>
        </div>
      </div>
    </div>
  </>
}

export default Footer