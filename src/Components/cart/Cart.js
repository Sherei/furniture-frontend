import React, { useEffect, useState } from "react";
import { RxCross1 } from "react-icons/rx";
import { FaArrowRight, FaMinus, FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { FiShoppingCart } from "react-icons/fi";
import { Login } from "../login/Login"
import Loader from "../Loader/Loader";
import Lottie from "lottie-react";
import CartAnimation from "../Animations/CartAnimation.json";
import axios from "axios";
import "./cart.css";

export const Cart = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, []);
  
  const sendWhatsAppMessage = () => {
    const message = `I want to place this order \n\n${window.location.href}`;
    const whatsappURL = `https://wa.me/+447392608087?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };

  const cu = useSelector((store) => store.userSection.cu);
  const allCartItems = useSelector((store) => store.Cart.cart);
  const { userId } = useParams();

  const move = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useState([]);
  const [expandedItems, setExpandedItems] = useState({});
  const [quantity, setQuantity] = useState(1);


  useEffect(() => {
    setLoading(true);
    axios.get(`${process.env.REACT_APP_BASE_URL}/addToCart`).then((res) => {
      try {
        if (res) {
          dispatch({
            type: "ADD_TO_CART",
            payload: res.data,
          });
        }
      } catch (e) {
      } finally {
        setLoading(false);
      }
    });
  }, []);

  useEffect(() => {
    if (allCartItems) {
      setCart(allCartItems);
    }

  }, [allCartItems]);

  const filterCart = cart.filter((item) => item.userId === userId)

  const DeleteCartItem = async (itemId) => {
    try {
      setLoading(true);
      const response = await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/deleteCart?id=${itemId}`
      );
      if (response.data.status === "success") {
        dispatch({
          type: "ADD_TO_CART",
          payload: response.data.alldata,
        });
        setLoading(false);
        // toast.success("Item Removed");
      }
    } catch (e) {
      // console.log(e);
    }
  };


  const handleQuantityChange = (itemId, newQuantity) => {

    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item._id === itemId) {

          const { size, headboard, detail, ottoman, base, mattress } = item;
          let additionalPrices = 0;


          if (item.category === "bed") {
            // Size
            if (size === "4ft-small-double") additionalPrices += 120;
            else if (size === "4'6ft-standard-ouble") additionalPrices += 180;
            else if (size === "5ft-king") additionalPrices += 250;
            else if (size === "6ft-super-king") additionalPrices += 300;
            // Headboard
            if (headboard === "premium") additionalPrices += 50;
            else if (headboard === "extra-premium") additionalPrices += 70;
            else if (headboard === "exclusive") additionalPrices += 90;
            else if (headboard === "extra-exclusive") additionalPrices += 150;
            else if (headboard === "diamond") additionalPrices += 180;
            // Mattress
            if (mattress === "sprung-single") additionalPrices += 80;
            else if (mattress === "sprung-small-double") additionalPrices += 95;
            else if (mattress === "sprung-double") additionalPrices += 105;
            else if (mattress === "sprung-king") additionalPrices += 120;
            else if (mattress === "sprung-super-king") additionalPrices += 160;
            else if (mattress === "ortho-single") additionalPrices += 100;
            else if (mattress === "ortho-small-double") additionalPrices += 120;
            else if (mattress === "ortho-double") additionalPrices += 130;
            else if (mattress === "ortho-king") additionalPrices += 150;
            else if (mattress === "ortho-super-king") additionalPrices += 180;
            // Buttons
            if (detail === "button") additionalPrices += 10;
            if (ottoman === "Yes") additionalPrices += 90;
          }

          if (item.category === "sofa") {
            if (size === "3-seater") additionalPrices += 200;
            else if (size === "2-seater") additionalPrices += 100;
          }

          if (item.category === "mattress") {
            if (size === "small-double") additionalPrices += 20;
            else if (size === "double") additionalPrices += 70;
            else if (size === "king") additionalPrices += 120;
            else if (size === "super-king") additionalPrices += 170;
          }

          const updatedFprice = item.price * newQuantity + additionalPrices;

          return {
            ...item,
            quantity: newQuantity,
            total: updatedFprice,
          };
        }

        return item;
      })
    );
  };

  const totalQuantity = filterCart.reduce((accumulator, item) => {
    return accumulator + item.quantity;
  }, 0);

  const shippingFee = () => {
    if (totalQuantity === 1) {
      return 50;
    } else if (totalQuantity === 2) {
      return 70;
    } else {
      return 99;
    }
  };
  const shippingFeeAmount = shippingFee();

  const subtotal = filterCart.reduce((acc, item) => acc + item.total, 0);
  const total = subtotal + shippingFeeAmount;

  const updateCart = () => {
    try {
      setLoading(true);
      axios
        .put(`${process.env.REACT_APP_BASE_URL}/updateCart`, cart)
        .then((res) => {
          if (res.data.status === "success") {
            dispatch({
              type: "ADD_TO_CART",
              payload: res.data.alldata,
            });
            // toast.success("Cart updated successfully");
          } else {
            // toast.error("Failed to update cart");
          }
        })
        .catch((error) => {
          // toast.error("Failed to update cart");
        });
    } catch (e) {
      // toast.error("Failed to update cart");
    } finally {
      setLoading(false);
    }
  };

  const Increment = (itemId) => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    handleQuantityChange(itemId, quantity + 1);
  };

  const Decrement = (itemId) => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      handleQuantityChange(itemId, quantity - 1);
    }
  };

  const toggleDetails = (index) => {
    setExpandedItems((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <div className="container-fluid h-100">
      <div className="row">
        <div className="col px-0 d-flex justify-content-center align-items-center"
          style={{
            height: "300px",
            backgroundImage: "url(/cartbg2.webp)",
            backgroundPosition: "center", backgroundSize: "cover", backgroundRepeat: "no-repeat"
          }}>
          {/* <img src="/cartbg.jpg" alt="No Network" className='all_img img-fluid' style={{ width: "100%" }} /> */}
          <p
            className="fs-2 fw-bolder text-center"
            style={{ color: "white" }}
          >
            Shopping Cart <FiShoppingCart />
          </p>
        </div>
      </div>
      <div className="row d-flex justify-content-center min-h-100 gap-4 my-lg-3">

        <div className="col-lg-8 col-md-12 col-sm-12">
          {loading ? (
            <div className="col-12 d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
              <Loader />
            </div>
          ) : filterCart.length > 0 ? (
            <>
              <div className="" style={{ minHeight: "50vh" }}>
                {filterCart?.map((item, index) => {
                  return (
                    <div
                      className="d-flex gap-4 border py-3 cart_display_layout1"
                      style={{
                        marginBottom: "1px solid lightgray",
                      }}
                      key={index}
                    >
                      <div className="row">
                        <div className="col-4">
                          <a href={`/product/${item.title.replace(/ /g, '-')}/${item.productId}`}>
                            <div
                              className="text-center"
                              style={{ position: "relative" }}>
                              <img
                                src={item?.image}
                                className="img-fluid rounded-3"
                                alt="Loading"
                                style={{ width: "150px" }}
                              />
                              {item?.discount > 0 && (
                                <div
                                  className="p-1"
                                  style={{
                                    position: "absolute",
                                    top: "-5px",
                                    right: "2px",
                                    backgroundColor: "red",
                                    color: "white",
                                    borderRadius: "40px",
                                  }}
                                >
                                  <p className="m-0" style={{ fontSize: "10px" }}>
                                    {`-${item.discount}%`}
                                  </p>
                                </div>
                              )}
                            </div>
                          </a>
                        </div>
                        <div className="col-8">
                          <div className="w-100 px-2">
                            <div className="py-2 d-flex justify-content-between align-items-center">
                              <p
                                className="m-0"
                                style={{
                                  color: "rgb(2, 2, 94 )",
                                  fontSize: "14px",
                                }}
                              >
                                {item?.title}
                                <div
                                  className={`chk_detail ${expandedItems[index] ? "detail_height" : ""
                                    }`}
                                  onClick={() => toggleDetails(index)}
                                >
                                  {item?.size && (
                                    <p className="text-muted fs-6 m-0">
                                      Size:{" "}
                                      {item.size
                                        ? item.size.replace(/-/g, " ")
                                        : ""}
                                      /
                                    </p>
                                  )}
                                  {item?.color && (
                                    <p className="text-muted fs-6 m-0">
                                      Colour:{" "}
                                      {item.color
                                        ? item.color.replace(/-/g, " ")
                                        : ""}
                                      /
                                    </p>
                                  )}
                                  {item?.side && (
                                    <p className="text-muted fs-6 m-0">
                                      Side:{" "}
                                      {item.side
                                        ? item.side.replace(/-/g, " ")
                                        : ""}
                                      /
                                    </p>
                                  )}
                                  {item?.fabric && (
                                    <p className="text-muted fs-6 m-0">
                                      Fabric:{" "}
                                      {item.fabric
                                        ? item.fabric.replace(/-/g, " ")
                                        : ""}
                                      /
                                    </p>
                                  )}
                                  {item?.headboard && (
                                    <p className="text-muted fs-6 m-0">
                                      Headboard:{" "}
                                      {item.headboard
                                        ? item.headboard.replace(/-/g, " ")
                                        : ""}
                                      /
                                    </p>
                                  )}
                                  {item?.base && (
                                    <p className="text-muted fs-6 m-0">
                                      Base:{" "}
                                      {item.base
                                        ? item.base.replace(/-/g, " ")
                                        : ""}
                                      /
                                    </p>
                                  )}
                                  {item?.detail && (
                                    <p className="text-muted fs-6 m-0">
                                      Detail:{" "}
                                      {item.detail
                                        ? item.detail.replace(/-/g, " ")
                                        : ""}
                                      /
                                    </p>
                                  )}
                                  {item?.mattress && (
                                    <p className="text-muted fs-6 m-0">
                                      Mattress:{" "}
                                      {item.mattress
                                        ? item.mattress.replace(/-/g, " ")
                                        : ""}
                                      /
                                    </p>
                                  )}
                                  {item?.category === "bed" && item?.ottoman && (
                                    <p className="text-muted fs-6 m-0">
                                      Match with Ottoman:{" "}
                                      {item.ottoman
                                        ? item.ottoman.replace(/-/g, " ")
                                        : ""}
                                      /
                                    </p>
                                  )}
                                  {item?.category !== "bed" && item?.ottoman && (
                                    <p className="text-muted fs-6 m-0">
                                      Mattress Pillow:{" "}
                                      {item.ottoman
                                        ? item.ottoman.replace(/-/g, " ")
                                        : ""}
                                      /
                                    </p>
                                  )}
                                </div>
                              </p>
                              <button
                                className="btn text-danger"
                                onClick={() => DeleteCartItem(item._id)}
                              >
                                <RxCross1 />
                              </button>
                            </div>
                            <hr className="m-0 p-0" />

                            <div className="py-2 d-flex justify-content-between align-items-center">
                              <p
                                className="m-0"
                                style={{
                                  color: "rgb(2, 2, 94 )",
                                  fontSize: "14px",
                                }}
                              >
                                Price
                              </p>
                              <p className="m-0" style={{ fontSize: "14px" }}>
                                &pound;{item?.total?.toFixed()}
                              </p>
                            </div>
                            <hr className="m-0 p-0" />
                            <div className="py-2  d-flex justify-content-between align-items-center">
                              <p
                                className="mb-0"
                                style={{
                                  color: "rgb(2, 2, 94 )",
                                  fontSize: "14px",
                                }}
                              >
                                Quantity
                              </p>
                              <div
                                className="sigle_quatity "
                                style={{ border: "none" }}
                              >
                                {/* <button
                              className="plus_btn"
                              onClick={() => Decrement(item?._id)}
                            >
                              <FaMinus />
                            </button> */}
                                <p className="input_single text-center m-0 p-0">
                                  {item.quantity}
                                </p>
                                {/* <button
                              className="plus_btn"
                              onClick={() => Increment(item?._id)}
                            >
                              <FaPlus />
                            </button> */}
                              </div>
                            </div>
                            <hr className="m-0 p-0" />
                            <div className="py-2 d-flex justify-content-between align-items-center">
                              <p
                                className="mb-0 text-black"
                                style={{
                                  color: "rgb(2, 2, 94 )",
                                  fontSize: "14px",
                                }}
                              >
                                Subtotal
                              </p>
                              <p
                                className="m-0 fw-bolder fs-5"
                                style={{ color: "red", fontSize: "17px" }}
                              >
                                &pound;{item?.total?.toFixed()}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                <div className="cart-display">
                  {filterCart?.length > 0 && (
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                            <th>Remove</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filterCart?.map((item, index) => (
                            <tr key={index} className="cart_row">
                              <td className="text-center">
                                <a href={`/product/${item.title.replace(/ /g, '-')}/${item.productId}`}>
                                  <div className="text-center"
                                    style={{ position: "relative" }}>
                                    <img
                                      src={item?.image}
                                      className="img-fluid rounded-3"
                                      alt="No Internet"
                                      style={{ width: "100px" }}
                                    />
                                    {item?.discount > 1 && (
                                      <div
                                        className="p-1"
                                        style={{
                                          position: "absolute",
                                          top: "-5px",
                                          right: "2px",
                                          backgroundColor: "red",
                                          color: "white",
                                          borderRadius: "40px",
                                        }}
                                      >
                                        <p
                                          className="m-0"
                                          style={{ fontSize: "10px" }}
                                        >
                                          {`-${item?.discount}%`}
                                        </p>
                                      </div>
                                    )}
                                  </div>
                                </a>
                              </td>
                              <td>
                                {item?.title}
                                <div
                                  className={`chk_detail ${expandedItems[index] ? "detail_height" : ""
                                    }`}
                                  onClick={() => toggleDetails(index)}
                                >
                                  {item?.size && (
                                    <p className="text-muted fs-6 m-0">
                                      Size:{" "}
                                      {item.size
                                        ? item.size.replace(/-/g, " ")
                                        : ""}
                                      /
                                    </p>
                                  )}
                                  {item?.color && (
                                    <p className="text-muted fs-6 m-0">
                                      Colour:{" "}
                                      {item.color
                                        ? item.color.replace(/-/g, " ")
                                        : ""}
                                      /
                                    </p>
                                  )}
                                  {item?.side && (
                                    <p className="text-muted fs-6 m-0">
                                      Side:{" "}
                                      {item.side
                                        ? item.side.replace(/-/g, " ")
                                        : ""}
                                      /
                                    </p>
                                  )}
                                  {item?.fabric && (
                                    <p className="text-muted fs-6 m-0">
                                      Fabric:{" "}
                                      {item.fabric
                                        ? item.fabric.replace(/-/g, " ")
                                        : ""}
                                      /
                                    </p>
                                  )}
                                  {item?.headboard && (
                                    <p className="text-muted fs-6 m-0">
                                      Headboard:{" "}
                                      {item.headboard
                                        ? item.headboard.replace(/-/g, " ")
                                        : ""}
                                      /
                                    </p>
                                  )}
                                  {item?.base && (
                                    <p className="text-muted fs-6 m-0">
                                      Base:{" "}
                                      {item.base
                                        ? item.base.replace(/-/g, " ")
                                        : ""}
                                      /
                                    </p>
                                  )}
                                  {item?.detail && (
                                    <p className="text-muted fs-6 m-0">
                                      Detail:{" "}
                                      {item.detail
                                        ? item.detail.replace(/-/g, " ")
                                        : ""}
                                      /
                                    </p>
                                  )}
                                  {item?.mattress && (
                                    <p className="text-muted fs-6 m-0">
                                      Mattress:{" "}
                                      {item.mattress
                                        ? item.mattress.replace(/-/g, " ")
                                        : ""}
                                      /
                                    </p>
                                  )}
                                  {item?.category === "bed" && item?.ottoman && (
                                    <p className="text-muted fs-6 m-0">
                                      Match with Ottoman:{" "}
                                      {item.ottoman
                                        ? item.ottoman.replace(/-/g, " ")
                                        : ""}
                                      /
                                    </p>
                                  )}
                                  {item?.category !== "bed" && item?.ottoman && (
                                    <p className="text-muted fs-6 m-0">
                                      Mattress Pillow:{" "}
                                      {item.ottoman
                                        ? item.ottoman.replace(/-/g, " ")
                                        : ""}
                                      /
                                    </p>
                                  )}
                                </div>
                              </td>
                              <td className="color-red text-center">{`£${item?.price?.toFixed()}`}</td>
                              <td className="text-center">
                                <p className="input_single text-center m-0 p-0">
                                  {item.quantity}
                                </p>
                                <div
                                  className="sigle_quatity"
                                  style={{ border: "none" }}
                                >
                                  {/* <button
                                className="plus_btn"
                                onClick={() => Decrement(item._id)}
                              >
                                <FaMinus />
                              </button> */}


                                  {/* <button
                                className="plus_btn"
                                onClick={() => Increment(item._id)}
                              >
                                <FaPlus />
                              </button> */}
                                </div>
                              </td>
                              <td className="text-center">{`£${item?.total?.toFixed()}`}</td>
                              <td className="text-center">
                                <button
                                  className=" btn text-danger"
                                  style={{ fontSize: "20px" }}
                                  onClick={() => DeleteCartItem(item._id)}
                                >
                                  <RxCross1 />
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              <div className="cart_btns gap-2">
                <a href="/Products/all">
                  <button
                    className="btn review_btn px-4"
                    style={{ backgroundColor: "#8B0000" }}
                  >
                    Continue Shopping
                  </button>
                </a>
                {/* <button
              className="btn review_btn px-4"
              onClick={updateCart}
            >
              Update Cart
            </button> */}
              </div>

            </>
          ) : (
            <div className='d-flex flex-column justify-content-center align-items-center' style={{ height: "80vh" }}>
              <img src="/cart.png" alt="" style={{ width: "150px" }} />
              <p className="fw-bolder mt-3" style={{ color: "rgb(2,2,94)" }}>Your Cart is Empty</p>
              <a href="/Products/all">
                <button
                  className="btn review_btn"
                >
                  Shop our products
                </button>
              </a>
            </div >
          )
          }


        </div>

        {filterCart?.length > 0 && (
          <div className="col-lg-3 col-md-12 col-sm-12">
            <div className="update mb-3 py-3 px-3 border">
              <div className="d-flex justify-content-between">
                <p className="fw-bolder fs-4" style={{ color: "rgb(2, 2, 94)" }}>
                  CART TOTALS
                </p>
                <p className="fw-bolder fs-4" style={{ color: "rgb(2, 2, 94)" }}>
                  {totalQuantity}
                </p>
              </div>
              <div className="fw-normal d-flex justify-content-between">
                <p className="fw-bolder m-0" style={{ fontSize: "15px" }}>
                  Subtotal
                </p>
                <p className="text-muted m-0" style={{ fontSize: "15px" }}>
                  &pound;{subtotal?.toFixed()}.00
                </p>
              </div>
              <hr className="m-1" />
              <div className="fw-normal d-flex justify-content-between align-items-center gap-3">
                <p className="fw-bolder m-0" style={{ fontSize: "15px" }}>
                  Shipping
                </p>
                <div>
                  <p
                    className="text-muted m-0  text-end"
                    style={{ fontSize: "13px" }}
                  >
                    Standard Delivery:{" "}
                    <span className="fw-bolder">
                      &pound;{shippingFeeAmount?.toFixed()}
                    </span>{" "}
                  </p>
                  <p className="m-0 text-end" style={{ fontSize: "11px" }}>
                    Shipping options will be updated during checkout.
                  </p>
                </div>
              </div>
              <hr className="m-1" />

              <div className="fw-normal d-flex justify-content-between mt-4">
                <p className="fw-bolder m-0" style={{ fontSize: "17px" }}>
                  Total:
                </p>
                <p className="fw-bolder m-0" style={{ color: "red", fontSize: "17px" }}>
                  &pound;{total?.toFixed()}.00
                </p>
              </div>

              <div className="my-4">
                <a href={`/cart-checkout/${cu._id}`}>
                  <button
                    type="button"
                    className="btn fs-6 py-2 w-100"
                    style={{
                      backgroundColor: "#8B0000",
                      color: "white",
                      width: "100%",
                      fontWeight: "600",
                    }}
                  >
                    Proceed to Checkout
                  </button>
                </a>
                <p className="text-center  my-3">--or--</p>
                  <button
                    type="button"
                    className="btn fs-6 py-2"
                    style={{
                      backgroundColor: "#25d366",
                      color: "White",
                      width: "100%",
                      fontWeight: "600",
                    }}
                    onClick={sendWhatsAppMessage}
                  >
                    Order via WhatsApp
                  </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};