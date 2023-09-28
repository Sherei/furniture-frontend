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
  const [itemQuantities, setItemQuantities] = useState({});

  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_BASE_URL}/addToCart`).then((res) => {
      try {
        if (res) {
          const cartData = res.data.map((item) => ({
            ...item,
            quantity: item.quantity,
          }));
          setCart(cartData);

          const initialItemQuantities = {};
          cartData.forEach((item) => {
            initialItemQuantities[item._id] = item.quantity;
          });
          setItemQuantities(initialItemQuantities);
        }
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    });
  }, []);


  const handleItemQuantityChange = (itemId, newQuantity) => {
    setItemQuantities({
      ...itemQuantities,
      [itemId]: newQuantity,

    });
  };

  const DeleteCartItem = (itemId) => {
    try {
      axios.delete(`${process.env.REACT_APP_BASE_URL}/deleteCart?id=${itemId}`).then(() => {
        setLoading(true);
        setCart(cart.filter((data) => itemId !== data._id));
        toast.success("Item removed");
      });

    } catch (e) {
      console.log(e)
    } finally {
      setLoading(false);
    }
  };

  const filterCart = cart.filter((item) => userId === item.userId);



  const updateCart = () => {
    const updatedCart = cart.map((item) => ({
      ...item,
      quantity: itemQuantities[item._id] || item.quantity,
      Fprice: item.price * (itemQuantities[item._id] || item.quantity),
    }));

    try {
      setLoading(true);
      axios.put(`${process.env.REACT_APP_BASE_URL}/updateCart`, updatedCart)
        .then(() => {
          setCart(updatedCart);
          toast.success("Cart updated successfully");
        })
        .catch((error) => {
          console.error("Error updating cart:", error);
          toast.error("Failed to update cart");
        });
    } catch (e) {
      console.error(e);
      toast.error("Failed to update cart");
    } finally {
      setLoading(false);
    }
  };

  const totalPrice = filterCart.reduce((acc, item) => {
    const itemQuantity = itemQuantities[item._id] || item.quantity;
    const itemPrice = item.price * itemQuantity;
    return acc + itemPrice;
  }, 0);

  // Calculate Net Total (sum of Fprice values)
  const netTotal = filterCart.reduce((acc, item) => {
    const itemQuantity = itemQuantities[item._id] || item.quantity;
    const itemFprice = item.Fprice * itemQuantity;
    return acc + itemFprice;
  }, 0);



  return (
    <div className="container h-100 py-5">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-12">
          <div className="d-flex justify-content-between align-items-center mb-4 px-lg-5 px-md-5 px-xlg-5">
            <h3 className="fw-normal mb-0 text-black" style={{ fontWeight: '700' }}>Shopping Cart</h3>
            <div>
              <h3 className="fw-normal mb-0 text-black">Length: {filterCart.length}</h3>
            </div>
          </div>

          {filterCart.length < 1 && (
            <div className='vh-100 d-flex flex-column gap-5 justify-content-center align-items-center'>
              <h1>Cart is empty</h1>
              <button className='btn review_btn' onClick={() => move('/Products/all')}>Browse Products <FaArrowRight /></button>
            </div>
          )}
          {filterCart.length > 0 && (
            <div className="table-responsive">
              <table className="table table-bordered">
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
                    <tr key={item._id} className='cart_row'>
                      <td className='text-center'>{index + 1}</td>
                      <td className='text-center'>{item.sn}</td>
                      <td className='text-center'>
                        <img
                          src={item.image}
                          className="img-fluid rounded-3"
                          alt="No Internet"
                          style={{ width: "100px" }}
                        />
                      </td>
                      <td>{item.title.slice(0, 15)}</td>
                      <td className="color-red text-center">{`${item.price.toFixed(2)}$`}</td>
                      <td className="color-red text-center">{`${item.discount}%`}</td>
                      <td className='text-center'>
                        <input
                        className='cart_input border text-center'
                          type="number"
                          min={1}
                          style={{ width: "60px" }}
                          value={itemQuantities[item._id]}
                          onChange={(e) => handleItemQuantityChange(item._id, parseInt(e.target.value))}
                        />
                      </td>
                      <td className='text-center'>{`${(item.Fprice * (itemQuantities[item._id] || 1)).toFixed(2)}$`}</td> {/* Display item total price */}
                      <td className='text-center'>
                        <a href="#!" className="text-danger" style={{ fontSize: "20px" }} onClick={() => DeleteCartItem(item._id)}>
                          <AiFillDelete />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <div className='row d-flex justify-content-end'>
        <div className='col-lg-3 col-md-3 col-sm-12'>
          <div className='update mb-3 p-3 border'>
            <div className='d-flex justify-content-between'>
              <p className='fw-bolder fs-4' style={{color:"rgb(2, 2, 94)"}}>Summary</p>
            </div>
            <div className='fw-normal d-flex justify-content-between'>
              <p>Items:</p>
              <p>{filterCart.length}</p>
            </div>
            <div className='fw-normal d-flex justify-content-between'>
              <p>Total:</p>
              <p>{`${totalPrice.toFixed(2)}$`}</p>
            </div>
            <div className='fw-normal d-flex justify-content-between'>
              <p>After Discount</p>
            </div>
            <div className='fw-normal d-flex justify-content-between'>
              <p>Net Total:</p>
              <p>{`${netTotal.toFixed(2)}$`}</p>
            </div>
          </div>
          <div>
            <button className='btn review_btn btn-lg' onClick={updateCart}>
              Update Cart
            </button>
          </div>
        </div>
      </div>

      {filterCart.length > 0 && (
        <div className="card-body mt-5">
          <button type="button" className="btn  review_btn btn-lg" style={{backgroundColor:"#fd5d39"}} onClick={() => { move(`/checkout/${cu._id}`) }}>
            Proceed to Pay
          </button>
        </div>
      )}
    </div>
  );
};
