import React, { useEffect, useState } from 'react';
import { AiFillDelete } from "react-icons/ai"
import { FaArrowRight } from "react-icons/fa"
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import './cart.css';

export const Cart = () => {
  const cu = useSelector(store => store.userSection.cu)
  const move = useNavigate()
  const { userId } = useParams();
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]);
  const [quantity, setQuantity] = useState({}); // Use an object to track quantity for each item

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_BASE_URL}/addToCart`).then((res) => {
      console.log(res.data)
      try {
        if (res) {
          setCart(res.data);
          const initialQuantities = {};
          res.data.forEach((item) => {
            initialQuantities[item._id] = item.quantity;
          });
          setQuantity(initialQuantities);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    });
  }, []);

  const handleQuantityChange = (itemId, event) => {
    const newQuantity = parseInt(event.target.value);
    if (!isNaN(newQuantity) && newQuantity >= 1) {
      setQuantity((prevQuantity) => ({
        ...prevQuantity,
        [itemId]: newQuantity,
      }));
    }
  };

  const calculateTotalPrice = (item) => {
    const itemQuantity = quantity[item._id] || item.quantity;
    return (item.Fprice * itemQuantity).toFixed(2);
  };


  const DeleteCartItem = (itemId) => {
    axios.delete(`${process.env.REACT_APP_BASE_URL}/deleteCart?id=${itemId}`).then(() => {
      setCart(cart.filter((data) => itemId !== data._id));
      toast.success("Item removed")
    });
  };

  const filterCart = cart.filter((item) => userId === item.userId);

  return (
    <div className="container-fluid h-100 py-5">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12" style={{ minHeight: "100vh" }}>
          <div className="d-flex justify-content-between align-items-center mb-4 px-lg-5 px-md-5 px-xlg-5" >
            <h3 className="fw-normal mb-0 text-black" style={{ fontWeight: '700' }}>Shopping Cart</h3>
            <div>
              <h3 className="fw-normal mb-0 text-black" >Length: {filterCart.length}</h3>
            </div>
          </div>
          {filterCart.length < 1 &&
            <div className='vh-100 d-flex flex-column gap-5  justify-content-center align-items-center'>
              <h1>Cart is empty</h1>
              <button className='btn review_btn' onClick={() => move('/Products/all')}>Browse Products <FaArrowRight /></button>
            </div>
          }
          {filterCart.length > 0 &&
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead>
                  <tr>
                    <th>Sr#</th>
                    <th>Product Code</th>
                    <th>Image</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>Discount</th>
                    <th>Quantity</th>
                    <th>Total Price</th>
                    <th>Remove</th>
                  </tr>
                </thead>
                <tbody>
                  {filterCart.map((item, index) => (
                    <tr key={item._id}>
                      <td>{index + 1}</td>
                      <td>{item.sn}</td>
                      <td>
                        <img
                          src={item.image}
                          className="img-fluid rounded-3"
                          alt="No Internet"
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{item.title.slice(0, 15)}</td>
                      <td className="color-red">{item.price.toFixed(2)}</td>
                      <td className="color-red">{`${item.discount}%`}</td>
                      <td>
                        <input
                          type="number"
                          value={quantity[item._id] || item.quantity}
                          min={1}
                          style={{ width: "60px" }}
                          onChange={(e) => handleQuantityChange(item._id, e)}
                        />
                      </td>
                      <td>{calculateTotalPrice(item)}</td>
                      <td >
                        <a href="#!" className="text-danger" style={{ fontSize: "20px" }} onClick={() => DeleteCartItem(item._id)}>
                          <AiFillDelete />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          }
        </div>
        {filterCart.length > 0 &&
          <div className="card-body d-flex justify-content-center">
            <button type="button" className="btn btn-warning btn-block btn-lg" onClick={() => { move(`/checkout/${cu._id}`) }}>
              Proceed to Pay
            </button>
          </div>
        }
      </div>
    </div>
  )
}