import React, { useEffect, useState } from 'react';
import './cart.css';
import { AiFillDelete } from "react-icons/ai"
import { FaPlus, FaMinus } from "react-icons/fa"
import { useNavigate } from 'react-router-dom';
import Checkout from '../Checkout/Checkout';

export const Cart = () => {

  const move = useNavigate()
  const array = [
    { title: "Roman Brown Recliner Leather Sofa 3 Seater Bonded Leather", img: "/alaska-large-corner-bg-1.jpg", sn: "S.N:4001", price: "$450" },
    { title: "Shannon Corner Scatter Back Sofa", img: "/ashton-chesterfield-sofa-product-3-bg-1-150x150.jpg", sn: "S.N:4001", price: "$750" },
    { title: "Alaska Large Corner", img: "/4.jpg", sn: "S.N:4001", price: "$450" },
    { title: "Ashton Chesterfield Corner (Black)", img: "/ashton-chesterfield-corner-black-bg.jpg", sn: "S.N:4001", price: "$430" },
    { title: "Roman Brown Recliner Corner Leather Sofa 3 Seater", img: "/ashton-chesterfield-sofa-3.jpg", sn: "S.N:4001", price: "$999" },
  ]
  const [showModel, setShowModel] = useState(false)

  const closeModal = () => {
    setShowModel(false);
  };



  return <>
    <section className="h-100" style={{ backgroundColor: "#eee" }}>
      <div className="container h-100 py-5">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-10">
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="fw-normal mb-0 text-black">Shopping Cart</h3>
              <div>
                <p className="mb-0">
                  <span className="text-muted">Sort by:</span>{" "}
                  <a href="#!" className="text-body">
                    price <i className="fas fa-angle-down mt-1" />
                  </a>
                </p>
              </div>
            </div>
            {array.map((item) => {
              return <>
                <div className="card rounded-3 mb-4">
                  <div className="card-body p-4">
                    <div className="row d-flex justify-content-between align-items-center">
                      <div className="col-md-2 col-lg-2 col-xl-2">
                        <img
                          src={item.img}
                          className="img-fluid rounded-3"
                          alt="Cotton T-shirt"
                        />
                      </div>
                      <div className="col-md-4 col-lg-4 col-xl-4">
                        <p className="lead fw-normal mb-2">{item.title}</p>
                        <p>
                          <span className="text-muted">{item.sn} </span>
                          <span className="text-muted">{item.discount} </span>
                        </p>
                      </div>
                      <div className="col-md-2 col-lg-2 col-xl-2 d-flex">
                        <button
                          className="btn btn-link px-2"
                          onclick="this.parentNode.querySelector('input[type=number]').stepDown()"
                        >
                          <FaMinus />
                          <i className="fas fa-minus" />
                        </button>
                        <input
                          id="form1"
                          min={0}
                          name="quantity"
                          defaultValue={2}
                          type="number"
                          className="form-control form-control-sm"
                        />
                        <button
                          className="btn btn-link px-2"
                          onclick="this.parentNode.querySelector('input[type=number]').stepUp()"
                        >
                          <FaPlus />
                          <i className="fas fa-plus" />
                        </button>
                      </div>
                      <div className="col-md-3 col-lg-2 col-xl-2 offset-lg-1">
                        <h5 className="mb-0">{item.price}</h5>
                      </div>
                      <div className="col-md-1 col-lg-1 col-xl-1 text-end">
                        <a href="#!" className="text-danger" style={{ fontSize: "20px" }}>
                          <AiFillDelete />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

              </>
            })

            }
            <div className="card">
              <div className="card-body">
                <button type="button" className="btn btn-warning btn-block btn-lg" onClick={() => { move("/checkout") }}>
                  Proceed to Pay
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

    </section>


  </>
}

