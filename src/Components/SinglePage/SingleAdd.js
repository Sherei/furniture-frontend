import React, { useState, useEffect } from "react";
import {
  FaAngleRight,
  FaMinus,
  FaPlus,
  FaArrowLeft,
  FaArrowRight,
  FaArrowDown,
  FaArrowUp,
  FaShareAlt,
  FaShareSquare,
  FaPinterestP,
  FaInstagram,
  FaTiktok,
  FaFacebook,
} from "react-icons/fa";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io"
import TagManager from 'react-gtm-module'
import { RxCross1 } from "react-icons/rx"
import { useNavigate, useParams } from "react-router-dom";
import Benefits from "../Benefits/Benefits";
import Loader from "../Loader/Loader";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { toast } from "react-toastify";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.min.css";
import axios from "axios";
import { Link } from "react-scroll";
import "./single.css";


const SingleAdd = () => {



  // useEffect(() => {
  //   window.scrollTo({
  //     top: 0,
  //   });
  // }, []);

  let cu = useSelector((store) => store.userSection.cu);

  let move = useNavigate();

  let {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const allComments = useSelector((store) => store.Comment.comment);

  const { productId, title } = useParams();
  const [comments, setComments] = useState([])
  const [product, setProduct] = useState({});
  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false);
  const [size, setSize] = useState("");
  const [color, setColor] = useState("");
  const [detail, setDetail] = useState("");
  const [base, setBase] = useState("");
  const [fabric, setFabric] = useState("");
  const [headboard, setHeadboard] = useState("");
  const [ottoman, setOttoman] = useState("");
  const [mattress, setMattress] = useState("");
  const [side, setSide] = useState("");
  const [Error, setError] = useState("");
  const [selectedImage, setSelectedImage] = useState(0);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [sucess, setSucess] = useState("")
  const [timeoutId, setTimeoutId] = useState(null);
  const dispatch = useDispatch();


  const sendWhatsAppMessage = () => {
    const message = `I'm interested in product\n${window.location.href}\n\nCan you provide more details?`;
    const whatsappURL = `https://wa.me/+447392608087?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank");
  };


  useEffect(() => {

    const source = axios.CancelToken.source();
    const fetchData = async () => {
      try {
        setLoading(true)
        const resp = await axios.get(`${process.env.REACT_APP_BASE_URL}/singleProduct?id=${productId}`, { cancelToken: source.token })
        setProduct(resp?.data)
        setLoading(false)
        TagManager.dataLayer({
          dataLayer: {
            event: "view_item",
            ecommerce: {
              currency: "GBP",
              value: resp.data.Fprice,
              items: [
                {
                  item_id: resp.data._id,
                  item_name: resp.data.title,
                  discount: resp.data.discount ? resp.data.discount : "0",
                  item_category: resp.data.category,
                  item_category2: resp.data.subCategory ? resp.data.subCategory : "No subCategory",
                  item_variant: resp.data.color1 ? resp.data.color1 : "No Color",
                  price: resp.data.Fprice,

                }
              ]
            }
          }
        });
      } catch (error) {
        if (axios.isCancel(error)) {
        } else { }
      }
    };
    fetchData();
    return () => {
      source.cancel();
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [productId]);

  useEffect(() => {
    setLoading(true)
    try {
      axios.get(`${process.env.REACT_APP_BASE_URL}/product`).then((res) => {
        if (res) {
          setData(res.data);
        }
        setLoading(false)
      });
    } catch (e) { }
  }, []);

  const totalImages = product?.images?.length || 0;


  const handleThumbnailClick = (index) => {
    setSelectedImage(index);
    setScrollPosition(index * 23);
  };
  
  const handleLeftArrowClick = () => {
    setSelectedImage(
      (prevSelectedImage) => (prevSelectedImage - 1 + totalImages) % totalImages
    );
  };

  const handleRightArrowClick = () => {
    setSelectedImage(
      (prevSelectedImage) => (prevSelectedImage + 1) % totalImages
    );
  };
  const copyUrlToClipboard = async (url) => {
    try {
      await navigator.clipboard.writeText(url);
      return true;
    } catch (error) {
      console.error("Error copying URL to clipboard:", error);
      return false;
    }
  };

  const handleShare = async (platform) => {
    const shareUrl = window.location.href;
    const copiedSuccessfully = await copyUrlToClipboard(shareUrl);
    if (copiedSuccessfully) {
      toast.success("URL copied to clipboard");
    } else {
      toast.error("Failed to copy URL. Please try again or manually copy the URL.");
    }
    switch (platform) {
      case "general":
        break;
      case "instagram":
        window.open(`https://www.instagram.com/`);
        break;
      case "tiktok":
        window.open(`https://www.tiktok.com/`);
        break;
      case "facebook":
        window.open(`https://www.facebook.com/`);
        break;
      case "pint":
        window.open(`https://www.pinterest.com/`);
        break;
      default:
        console.log("Unsupported platform:", platform);
        break;
    }
  };




  const handleScroll = (direction) => {
    const container = document.querySelector(".small_images");
    if (container) {
      const scrollAmount = 50;

      if (direction === "up") {
        container.scrollBy({
          top: -scrollAmount,
          behavior: "smooth",
        });
      } else if (direction === "down") {
        container.scrollBy({
          top: scrollAmount,
          behavior: "smooth",
        });
      } else if (direction === "left") {
        container.scrollBy({
          left: -scrollAmount,
          behavior: "smooth",
        });
      } else if (direction === "right") {
        container.scrollBy({
          left: scrollAmount,
          behavior: "smooth",
        });
      }
      setScrollPosition(
        direction === "left" || direction === "right"
          ? container.scrollLeft
          : container.scrollTop
      );
    }
  };

  const Increment = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const Decrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  const calculateTotalPrice = (
    quantity,
    size,
    mattress,
    detail,
    headboard,
    ottoman

  ) => {

    let updatedFprice = product?.Fprice || 0;

    updatedFprice += calculateAdditionalPrice(size, mattress, detail, headboard, ottoman);

    let totalPrice = updatedFprice * quantity;

    return totalPrice;
  };

  const calculateAdditionalPrice = (size, mattress, detail, headboard, ottoman) => {

    let additionalPrice = 0;

    if (product?.category === "bed") {
      if (size !== undefined && size !== "") {
        if (size === "4ft-small-double") {
          additionalPrice += Number(product.double);
        } else if (size === "4'6ft-standard-double") {
          additionalPrice += Number(product.standard);
        } else if (size === "5ft-king") {
          additionalPrice += Number(product.king);
        } else if (size === "6ft-super-king") {
          additionalPrice += Number(product.super);
        } else {
          additionalPrice += 0;
        }
      }
      if (headboard !== undefined && headboard !== "") {
        if (headboard === "premium") {
          additionalPrice += 50;
        } else if (headboard === "extra-premium") {
          additionalPrice += 70;
        } else if (headboard === "exclusive") {
          additionalPrice += 90;
        } else if (headboard === "extra-exclusive") {
          additionalPrice += 150;
        } else if (headboard === "diamond") {
          additionalPrice += 180;
        } else {
          additionalPrice += 0;
        }
      }
      if (detail !== undefined && detail !== "") {
        if (detail === "button") {
          additionalPrice += 10;
        }
      }
      if (ottoman !== undefined && ottoman !== "") {
        if (ottoman === "Yes") {
          additionalPrice += 90;
        }
      }
      if (base !== undefined && base !== "") {
        if (base === "ottoman-gaslift") {
          additionalPrice += 120;
        } else if (base === "solid-base") {
          additionalPrice += 60;
        }
      }
      if (mattress !== undefined && mattress !== "") {

        if (mattress === "sprung-single") {
          additionalPrice += 80;
        } else if (mattress === "sprung-small-double") {
          additionalPrice += 95;
        } else if (mattress === "sprung-double") {
          additionalPrice += 105;
        } else if (mattress === "sprung-king") {
          additionalPrice += 120;
        } else if (mattress === "sprung-super-king") {
          additionalPrice += 160;
        } else if (mattress === "ortho-single") {
          additionalPrice += 100;
        } else if (mattress === "ortho-small-double") {
          additionalPrice += 120;
        } else if (mattress === "ortho-double") {
          additionalPrice += 130;
        } else if (mattress === "ortho-king") {
          additionalPrice += 150;
        } else if (mattress === "ortho-super-king") {
          additionalPrice += 180;
        }
      }
    }

    else if (product?.category === "mattress") {
      if (size !== undefined && size !== "") {
        if (product.sn === 1226) {
          if (size === "small-double") {
            additionalPrice += 15;
          } else if (size === "double") {
            additionalPrice += 25;
          } else if (size === "king") {
            additionalPrice += 40;
          } else if (size === "super-king") {
            additionalPrice += 80;
          }
        }
        if (product.sn === 1227) {
          if (size === "small-double") {
            additionalPrice += 20;
          } else if (size === "double") {
            additionalPrice += 30;
          } else if (size === "king") {
            additionalPrice += 50;
          } else if (size === "super-king") {
            additionalPrice += 80;
          }
        }
        if (product.sn === 1228) {
          if (size === "small-double") {
            additionalPrice += 20;
          } else if (size === "double") {
            additionalPrice += 30;
          } else if (size === "king") {
            additionalPrice += 70;
          } else if (size === "super-king") {
            additionalPrice += 120;
          }
        }
        if (product.sn === 1229) {
          if (size === "small-double") {
            additionalPrice += 40;
          } else if (size === "double") {
            additionalPrice += 60;
          } else if (size === "king") {
            additionalPrice += 110;
          } else if (size === "super-king") {
            additionalPrice += 170;
          }
        }
        if (product.sn === 1230) {
          if (size === "small-double") {
            additionalPrice += 20;
          } else if (size === "double") {
            additionalPrice += 70;
          } else if (size === "king") {
            additionalPrice += 120;
          } else if (size === "super-king") {
            additionalPrice += 170;
          }
        }
        else {
          additionalPrice += 0;
        }
      }
      if (ottoman !== undefined && ottoman !== "") {
        if (ottoman === "pillow") {
          additionalPrice += 50;
        }
      }
    }

    return additionalPrice;
  };

  const totalPrice = calculateTotalPrice(
    quantity,
    size,
    mattress,
    detail,
    headboard,
    ottoman
  );

  async function AddToCart(
    product,
    totalPrice,
    size,
    side,
    fabric,
    detail,
    base,
    headboard,
    ottoman,
    mattress,
    color,
  ) {

    if (product.category === "sofa") {
      if (product.color1 !== undefined) {
        if (!color) {
          return setError("options");
        }
      }
      if (product.sn === 1546 || product.sn === 1539 || product.sn === 1527 || product.sn === 1525
        || product.sn === 1512 || product.sn === 1300 || product.sn === 1286 || product.sn === 1020) {
        if (!side) {
          return setError("options");
        } if (!color) {
          return setError("options");
        }
      }
    }
    else if (product?.category === "bed") {
      if (!size) {
        return setError("options");
      }
      if (!detail) {
        return setError("options");
      }
      if (!fabric) {
        return setError("options");
      }
      if (!headboard) {
        return setError("options");
      }
      if (!base) {
        return setError("options");
      }
      if (!mattress) {
        return setError("options");
      }
      if (!ottoman) {
        return setError("options");
      }
      if (!color) {
        return setError("options");
      }
    }
    else if (product?.category === "mattress") {
      if (!size) {
        return setError("options");
      } if (!ottoman) {
        return setError("options");
      }
    }
    else if (product?.category === "ottoman-box") {
      if (!detail) {
        return setError("options");
      }
      if (!fabric) {
        return setError("options");
      }
      if (!color) {
        return setError("options");
      }
    }
    else if (product?.category === "footstools") {
      if (!fabric) {
        return setError("options");
      }
      if (product.color1 === undefined) {
        if (!fabric) {
          return setError("options");
        }
      } else if (product.color1 != undefined) {
        if (!fabric, !color) {
          return setError("options");
        }
      }
    }


    if (cu._id === undefined) {
      move(`/login/${product.title}/${productId}`);
      // toast.success("Login to Place Your Order");
    } else if (cu.email === "asd@gmail.com") {
      dispatch({
        type: "LOGOUT_USER",
      });
      move("/login");
      // toast.success("Login with different account");
    } else {

      try {
        product.userId = cu?._id;
        product.productId = product?._id;
        product.size = size;
        product.color = color;
        product.fabric = fabric;
        product.detail = detail;
        product.base = base;
        product.headboard = headboard;
        product.ottoman = ottoman;
        product.mattress = mattress;
        product.side = side;
        product.total = totalPrice;
        // product.price = product?.price;
        product.quantity = quantity;
        product.image = product?.images[0];
        product.discount = product?.discount;
        let response = await axios.post(
          `${process.env.REACT_APP_BASE_URL}/addToCart`,
          product
        );
        if (response.data.message === "Product Added") {
          dispatch({
            type: "ADD_TO_CART",
            payload: response.data.alldata,

          });
          setSucess("cart")

          TagManager.dataLayer({
            dataLayer: {
              event: "add_to_cart",
              ecommerce: {
                currency: "GBP",
                value: product.total,
                items: [
                  {
                    item_id: product.productId,
                    item_name: product.title,
                    discount: product.discount ? product.discount + "%" : "0",
                    item_category: product.category,
                    item_category2: product.subCategory ? product.subCategory : "No subCategory",
                    item_variant: product.color1 ? product.color1 : "No Color",
                    price: product.Fprice,
                  }
                ]
              }
            }
          });
        }
      } catch (error) {
        // toast.warning("Server Error Try Again Later...")
      } finally {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    if (sucess) {
      const timeoutId = setTimeout(() => {
        setSucess('')
      }, 3000);

      return () => clearTimeout(timeoutId);
    }
    if (Error) {
      const timeoutId = setTimeout(() => {
        setError('')
      }, 4000);

      return () => clearTimeout(timeoutId);
    }
  }, [sucess, Error]);

  async function Order() {

    await AddToCart(
      product,
      totalPrice,
      size,
      side,
      fabric,
      detail,
      base,
      headboard,
      ottoman,
      mattress,
      color,
    )

    if (product.category === "sofa") {
      if (product.color1 !== undefined) {
        if (!color) {
          return setError("options");
        }
      }
      if (product.sn === 1546 || product.sn === 1539 || product.sn === 1527 || product.sn === 1525
        || product.sn === 1512 || product.sn === 1300 || product.sn === 1286 || product.sn === 1020) {
        if (!side) {
          return setError("options");
        } if (!color) {
          return setError("options");
        }
      }
    }
    else if (product?.category === "bed") {
      if (!size) {
        return setError("options");
      }
      if (!detail) {
        return setError("options");
      }
      if (!fabric) {
        return setError("options");
      }
      if (!headboard) {
        return setError("options");
      }
      if (!base) {
        return setError("options");
      }
      if (!mattress) {
        return setError("options");
      }
      if (!ottoman) {
        return setError("options");
      }
      if (!color) {
        return setError("options");
      }
    }
    else if (product?.category === "mattress") {
      if (!size) {
        return setError("options");
      } if (!ottoman) {
        return setError("options");
      }
    }
    else if (product?.category === "ottoman-box") {
      if (!detail) {
        return setError("options");
      }
      if (!fabric) {
        return setError("options");
      }
      if (!color) {
        return setError("options");
      }
    }
    else if (product?.category === "footstools") {
      if (!fabric) {
        return setError("options");
      }
      if (product.color1 === undefined) {
        if (!fabric) {
          return setError("options");
        }
      } else if (product.color1 != undefined) {
        if (!fabric, !color) {
          return setError("options");
        }
      }
    }

    if (cu._id && cu.email !== "asd@gmail.com") {
      move(`/cart-checkout/${cu._id}`);
    } else {
      move("/login/" + productId);
    }
  }

  

  const Comment = async (cmnt) => {
    setLoading(true)
    try {
      const commentWithProductId = { ...cmnt, productId };
      const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/comments`, commentWithProductId);
      if (response.data.message === "Comment Added") {
        dispatch({
          type: "ADD_COMMENT",
          payload: response.data.alldata,
        });
        setLoading(false)
        setComments(response.data.alldata)
        reset();
        setSucess("comment")
        // toast.success("Feedback submitted");
      }
    } catch (e) {
    }
  };

  useEffect(() => {
    setLoading(true);
    try {
      axios.get(`${process.env.REACT_APP_BASE_URL}/comments`).then((res) => {
        if (res) {
          dispatch({ type: "ADD_COMMENT", payload: res.data });
          setLoading(false)
        }
      });
    } catch (e) {
    }
  }, []);

  useEffect(() => {
    if (allComments) {
      setComments(allComments);
      setLoading(false);
    }
  }, [allComments]);

  const formatDateTime = (dateStr) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const date = new Date(dateStr);
    return date.toLocaleDateString("en-GB", options);
  };

  return <>
    {loading  ? (
      <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "80vh" }} >
        <Loader />
      </div >
    ) : product && product.images ? (
      <div className="container-fluid min-vh-100">
        <div className="row">
          <div className="col-lg-12 col-sm-12 mt-4 mb-2 s_categories_P d-flex align-items-center">
            {product?.subCategory != "three-&-two-seater-sofas" &&
              <p style={{ textTransform: "capitalize", fontFamily: "Times New Roman", fontSize: "15px" }}>
                home <FaAngleRight />
                product <FaAngleRight /> {
                  product?.category
                } <FaAngleRight /> {product?.subCategory}
              </p>}
            {product?.subCategory === "three-&-two-seater-sofas" &&
              <p style={{ fontFamily: "Times New Roman", fontSize: "15px" }}>
                Home <FaAngleRight />
                Product <FaAngleRight /> <span style={{ textTransform: "capitalize" }}>{product?.category}</span>
                <FaAngleRight /> 3 and 2 Seater Sofas
              </p>}
          </div>

          <div className="col-lg-1 col-md-2 col-sm-12 order-lg-1 order-md-1 order-2 p-0 m-0 d-flex flex-column align-items-center" style={{ position: "relative" }}>
            <div className="small_images">
              {product?.images &&
                product?.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt="No Network"
                    onClick={() => handleThumbnailClick(index)}
                    className={`rounded-3 ${index === selectedImage ? "activeImg" : ""}`}
                  />
                ))}
            </div>
            {product?.images && product?.images.length > 3 && (
              <>
                {/* <div className="mt-3 arrow_display1 text-center">
                  <button
                    className="plus_btn"
                    onClick={() => handleScroll("up")}
                  >
                    <FaArrowUp />
                  </button>
                  <button
                    className="plus_btn"
                    onClick={() => handleScroll("down")}
                  >
                    <FaArrowDown />
                  </button>
                </div> */}
                {/* <div className="arrow_display2">
                      <button
                        className="plus_btn plus_btn1 mx-2"
                        onClick={() => handleScroll("left")}
                      >
                        <IoIosArrowBack />
                      </button>
                      <button
                        className="plus_btn plus_btn2"
                        onClick={() => handleScroll("right")}
                      >
                        <IoIosArrowForward />
                      </button>
                    </div> */}
              </>
            )}
          </div>

          <div className="col-lg-5 col-md-8 col-sm-12 order-lg-2 order-md-2 order-1 mb-lg-5 mb-2" style={{ height: "fit-content" }}>
            {loading || product.length === 9 ? (
              <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }} >
                <Loader />
              </div>
            ) : (
              <div className="d-flex justify-content-center align-items-center" style={{ transition: "opacity 0.5s ease-in-out",position: "relative" }}>
                <InnerImageZoom
                  zoomScale={1}
                  className="rounded-3"
                  src={
                    product?.images && product.images[selectedImage]
                      ? product.images[selectedImage]
                      : "/loader.jpg"
                  }
                  zoomSrc={
                    product?.images && product.images[selectedImage]
                      ? product.images[selectedImage]
                      : "/loader.jpg"
                  }
                />
                {product?.discount && product?.discount > 0 ? (
                  <div className="discount">{`-${product?.discount}%`}</div>
                ) : null}

                {product?.images && product?.images.length > 1 && (
                  <>
                    <div
                      className="single_arrow1"
                      onClick={handleLeftArrowClick}
                    >
                      <IoIosArrowBack />
                    </div>
                    <div
                      className="single_arrow2"
                      onClick={handleRightArrowClick}
                    >
                      <IoIosArrowForward />
                    </div>
                  </>
                )}
              </div>
            )
            }

          </div>

          <div className="col-lg-5 col-sm-12 order-3" style={{ position: "relative" }}>
            {sucess === "cart" && (
              <div className={`succes_box  px-3 ${sucess === "cart" ? "showVerify" : ""}`}>
                <div className="text-end">
                  <button className="btn fw-bolder fs-3"
                    style={{ position: "absolute", top: "0px", right: "10px", color: "red" }}
                    onClick={() => setSucess("")}> <RxCross1 /></button>
                </div>
                <img src="/verified.gif" alt="No Network" style={{ width: "70px" }} />
                <p className="fw-bolder text-center">Added to Cart</p>
              </div>
            )}
            <div className={`s_content ${product?.category === "bed" ? "bed_class" : ""}`}>
              <h1
                className="text-center fs-1 "
                style={{ color: "#1b2950" }}
              >
                {product?.title}
              </h1>
              {comments.filter((item) => item.productId === productId)
                .length > 0 && (
                  <div className="text-center my-2 cursor" style={{ color: "#1b2950" }}>
                    <Link to="review">
                      ({comments.filter(
                        (item) => item.productId === productId
                      ).length
                      }{" "}
                      Customer Review)
                    </Link>
                  </div>
                )}
              {/* <p className="fs-6 fw-bolder " style={{ color: "#1b2950" }}>
                    Product code: {product?.sn}
                  </p> */}
              <div className="">
                <span
                  className="fw-bold fs-5"
                  style={{ color: "red" }}
                >{`£${totalPrice?.toFixed()}`}.00</span>
                {product.discount > 0 &&
                  <span className="fs-6 text-muted">
                    <s className="mx-2">{`£${product?.price.toFixed()}`}.00</s>
                  </span>}
              </div>

              <div className="single_form  mt-1">

                {(product?.category != "bed" && product?.category != "sofa" && product?.category != "mattress" && product?.category != "footstools") &&
                  <div className="mt-1">
                    <label
                      style={{ fontSize: "17px", fontWeight: "600" }}
                    >
                      Colour<span style={{ color: "red" }}>* </span>&nbsp;{" "}
                      <span className="lable_Case">
                        {color ? color.replace(/-/g, " ") : ""}
                      </span>
                    </label>
                    <p className="mt-1 mb-0">Please Choose Colour</p>
                    <select
                      onChange={(e) => {
                        if (e.target.value === "select color") {
                          return setError("No color selection"), setColor('');
                        } else {
                          setColor(e.target.value);
                        }
                      }}
                      className="form-select mb-2 mr-sm-2"
                    >
                      <option value="select color">Please Choose</option>
                      <option value="black">Black</option>
                      <option value="silver">Silver</option>
                      <option value="pink">Pink</option>
                      <option value="grey">Grey</option>
                      <option value="light-grey">Light Grey</option>
                      <option value="mink">Mink</option>
                      <option value="royal-blue">Royal Blue</option>
                      <option value="sky-blue">Sky Blue</option>
                      <option value="white">White</option>
                      <option value="mustered-gold">Mustered Gold</option>
                      <option value="cream">Cream</option>
                      <option value="steel">Steel</option>
                      <option value="teal">Teal</option>
                      <option value="green">Green</option>
                      <option value="duck-egg">Duck Egg</option>
                      <option value="beige">Beige</option>
                    </select>
                  </div>
                }

                {((product.category === "sofa" || product.category === "footstools") && product.color1 !== undefined) &&
                  <div className="mt-1">
                    <label
                      style={{ fontSize: "17px", fontWeight: "600" }}
                    >
                      Colour<span style={{ color: "red" }}>* </span>&nbsp;{" "}
                      <span className="lable_Case">
                        {color ? color.replace(/-/g, " ") : ""}
                      </span>
                    </label>
                    <p className="mt-1 mb-0">Please Choose Colour</p>
                    <select
                      onChange={(e) => {
                        if (e.target.value === "select color") {
                          return setError("No color selection"), setColor('');

                        } else {
                          setColor(e.target.value);
                        }
                      }}
                      className="form-select mb-2 mr-sm-2"
                    >
                      <option value="select color">Please Choose</option>
                      {product?.color1 && <option value={product.color1}>{product.color1}</option>}
                      {product?.color2 && <option value={product.color2}>{product.color2}</option>}
                      {product?.color3 && <option value={product.color3}>{product.color3}</option>}
                      {product?.color4 && <option value={product.color4}>{product.color4}</option>}
                      {product?.color5 && <option value={product.color5}>{product.color5}</option>}
                      {product?.color6 && <option value={product.color6}>{product.color6}</option>}
                      {product?.color7 && <option value={product.color7}>{product.color7}</option>}
                      {product?.color8 && <option value={product.color8}>{product.color8}</option>}
                      {product?.color9 && <option value={product.color9}>{product.color9}</option>}
                      {product?.color10 && <option value={product.color10}>{product.color10}</option>}
                    </select>
                  </div>
                }
                {(product.sn === 1546 || product.sn === 1539 || product.sn === 1527 || product.sn === 1525
                  || product.sn === 1512 || product.sn === 1300 || product.sn === 1286 || product.sn === 1020) &&
                  <div className="mt-1">
                    <label
                      style={{ fontSize: "17px", fontWeight: "600" }}
                    >
                      Side<span style={{ color: "red" }}>* </span>&nbsp;{" "}
                      <span className="lable_Case">
                        {side ? side.replace(/-/g, " ") : ""}
                      </span>
                    </label>
                    <p className="mt-1 mb-0">Please Choose Side</p>
                    <select
                      onChange={(e) => {
                        if (e.target.value === "select side") {
                          return setError("No side selection"), setSide('');
                        } else {
                          setSide(e.target.value);
                        }
                      }}
                      className="form-select mb-2 mr-sm-2"
                    >
                      <option value="select side">Please Choose</option>
                      <option value="right-hand">Rigth Hand</option>
                      <option value="left-hand">Left Hand</option>
                    </select>
                  </div>
                }

                {/*.................................... Bed Start .......................... */}

                {product?.category === "bed" && (
                  <>
                    <div>
                      <label
                        style={{ fontSize: "17px", fontWeight: "600" }}
                      >
                        Bed Size
                        <span style={{ color: "red" }}>* </span>&nbsp;{" "}
                        <span className="lable_Case">
                          {size ? size.replace(/-/g, " ") : ""}{" "}
                        </span>
                      </label>
                      <p className="mt-1 mb-0">Please Choose Size</p>
                      <select
                        className="form-control form-select mb-2 mr-sm-2"
                        onChange={(e) => {
                          if (e.target.value === "select size") {
                            return setError("bed-size"), setSize('');
                          } else {
                            setSize(e.target.value);
                          }
                        }}
                      >
                        <option value="select size">Select Size</option>
                        <option value="3ft-single">3ft Single</option>
                        <option value="4ft-small-double">
                          4ft Small Double {product?.double ? `(£+${Number(product.double)})` : " "}
                        </option>
                        <option value="4'6ft-standard-double">
                          4'6ft Standard Double {product?.standard ? `(£+${Number(product.standard)})` : " "}
                        </option>
                        <option value="5ft-king">5ft King {product?.king ? `(£+${Number(product.king)})` : " "}</option>
                        <option value="6ft-super-king">
                          6ft Super King {product?.super ? `(£+${Number(product.super)})` : " "}
                        </option>
                      </select>
                    </div>
                    <div className="mt-1">
                      <label
                        style={{ fontSize: "17px", fontWeight: "600" }}
                      >
                        Fabric
                        <span style={{ color: "red" }}>* </span>&nbsp;{" "}
                        <span className="lable_Case">
                          {fabric ? fabric.replace(/-/g, " ") : ""}
                        </span>
                      </label>

                      <p className="mt-1 mb-0">Please Choose Fabric</p>
                      <select
                        className="form-select mb-2 mr-sm-2"
                        onChange={(e) => {
                          if (e.target.value === "select fabric") {
                            return setError("fabric"), setFabric('');
                          } else {
                            setFabric(e.target.value);
                          }
                        }}
                      >
                        <option value="select fabric">Please Choose</option>
                        <option value="plush-velvet">Plush Velvet</option>
                        <option value="crush-velvet">Crush Velvet</option>
                        <option value="chenille">Chenille</option>
                      </select>
                    </div>
                    {product.subCategory != "corner-sofas" &&
                      <div className="mt-1">
                        <label
                          style={{ fontSize: "17px", fontWeight: "600" }}
                        >
                          Colour<span style={{ color: "red" }}>* </span>&nbsp;{" "}
                          <span className="lable_Case">
                            {color ? color.replace(/-/g, " ") : ""}
                          </span>
                        </label>
                        <p className="mt-1 mb-0">Please Choose Colour</p>
                        <select
                          onChange={(e) => {
                            setColor(e.target.value);
                          }}
                          className="form-select mb-2 mr-sm-2"
                        >
                          <option value="select color">Please Choose</option>
                          <option value="black">Black</option>
                          <option value="pink">Pink</option>
                          <option value="silver">Silver</option>
                          <option value="grey">Grey</option>
                          <option value="light-grey">Light Grey</option>
                          <option value="mink">Mink</option>
                          <option value="royal-blue">Royal Blue</option>
                          <option value="sky-blue">Sky Blue</option>
                          <option value="white">White</option>
                          <option value="mustered-gold">Mustered Gold</option>
                          <option value="cream">Cream</option>
                          <option value="steel">Steel</option>
                          <option value="teal">Teal</option>
                          <option value="green">Green</option>
                          <option value="duck-egg">Duck Egg</option>
                          <option value="beige">Beige</option>
                        </select>
                      </div>
                    }
                    <div className="mt-1">
                      <label
                        style={{ fontSize: "17px", fontWeight: "600" }}
                      >
                        Headboard Height
                        <span style={{ color: "red" }}>* </span>&nbsp;{" "}
                        <span className="lable_Case">
                          {headboard ? headboard.replace(/-/g, " ") : ""}
                        </span>
                      </label>
                      <p className="mt-1 mb-0">
                        Please Choose Headboard Height
                      </p>
                      <select
                        className="form-select mb-2 mr-sm-2"
                        onChange={(e) => {
                          if (e.target.value === "headboard") {
                            return setError("headboard"), setHeadboard('');
                          } else {
                            setHeadboard(e.target.value);
                          }
                        }}
                      >
                        <option value="select headboard">
                          Please Choose
                        </option>
                        <option value="standard">Standard (54")</option>
                        <option value="premium">Premium (60") (+£50.00)</option>
                        <option value="extra-premium">Extra Premium (65") (+£70.00)</option>
                        <option value="exclusive">Exclusive (70") (+£90.00)</option>
                        <option value="extra-exclusive">Extra Exclusive Split Headboard (80") (+£150.00)</option>
                        <option value="diamond">Diamond Spilt Headboard (90") (+£180.00)</option>
                        <option value="two-part">Two Part Option Available</option>
                      </select>
                    </div>

                    <div className="mt-1">
                      <label
                        style={{ fontSize: "17px", fontWeight: "600" }}
                      >
                        Detail
                        <span style={{ color: "red" }}>* </span>&nbsp;{" "}
                        <span className="lable_Case">
                          {detail ? detail.replace(/-/g, " ") : ""}
                        </span>
                      </label>
                      <p className="mt-1 mb-0">Please Choose more Detail</p>
                      <select
                        onChange={(e) => {
                          if (e.target.value === "select detail") {
                            return setError("detail"), setDetail('');
                          } else {
                            setDetail(e.target.value);
                          }
                        }}
                        className="form-select mb-2 mr-sm-2"
                      >
                        <option value="select detail">Please Choose</option>
                        <option value="button">Buttons +(£10.0)</option>
                        <option value="diamonds">Diamonds</option>
                        <option value="not-required">Not Required</option>
                      </select>
                    </div>

                    <div className="mt-1">
                      <label
                        style={{ fontSize: "17px", fontWeight: "600" }}
                      >
                        Bed Base
                        <span style={{ color: "red" }}>* </span>&nbsp;{" "}
                        <span className="lable_Case">
                          {base ? base.replace(/-/g, " ") : ""}
                        </span>
                      </label>
                      <p className="mt-1 mb-0">Please Choose Bed Base</p>
                      <select
                        onChange={(e) => {
                          if (e.target.value === "select detail") {
                            return setError("detail"), setBase('');
                          } else {
                            setBase(e.target.value);
                          }
                        }}
                        className="form-select mb-2 mr-sm-2"
                      >
                        <option value="select base">Please Choose</option>
                        <option value="slats">Slats</option>
                        <option value="ottoman-gaslift">
                          Ottoman Gaslift +(£120.00)
                        </option>
                        <option value="solid-base">
                          Solid Base +(£60.00)
                        </option>
                      </select>
                    </div>

                    <div className="mt-1">
                      <label
                        style={{ fontSize: "17px", fontWeight: "600" }}
                      >
                        Mattress &nbsp;{" "}
                        <span style={{ color: "red" }}>* </span>&nbsp;{" "}
                        <span className="lable_Case">
                          {mattress ? mattress.replace(/-/g, " ") : ""}
                        </span>
                      </label>
                      <p className="mt-1 mb-0">
                        Please Choose Mattress
                      </p>
                      <select
                        onChange={(e) => {
                          if (e.target.value === "select size") {
                            return setError("mat"), setMattress('');
                          } else {
                            setMattress(e.target.value);
                          }
                        }}
                        className="form-select mb-2 mr-sm-2"
                      >
                        <option value="select size">Please Choose</option>
                        <option value="no">No</option>
                        <option value="sprung-single">Sprung Memory Foam Mattress (Single Size +£80.00)</option>
                        <option value="sprung-small-double">Sprung Memory Foam Mattress (Small Double Size +£95.00)</option>
                        <option value="sprung-double">Sprung Memory Foam Mattress (Double Size +£105.00)</option>
                        <option value="sprung-king">Sprung Memory Foam Mattress (King Size +£120.00)</option>
                        <option value="sprung-super-king">Sprung Memory Foam Mattress (Super King Size +£160.00)</option>
                        <option value="ortho-single">Orthopedic Memory Foam Mattress (Single Size +£100.00)</option>
                        <option value="ortho-small-double">Orthopedic Memory Foam Mattress (Small Double Size +£120.00)</option>
                        <option value="ortho-double">Orthopedic Memory Foam Mattress (Double Size +£130.00)</option>
                        <option value="ortho-king">Orthopedic Memory Foam Mattress (King Size +£150.00)</option>
                        <option value="ortho-super-king">Orthopedic Memory Foam Mattress (Super King Size +£180.00)</option>

                      </select>
                    </div>

                    <div className="mt-1">
                      <label
                        style={{ fontSize: "17px", fontWeight: "600" }}
                      >
                        Matching Ottoman Box
                        <span style={{ color: "red" }}>* </span>&nbsp;{" "}&nbsp;{" "}
                        <span className="lable_Case">
                          {ottoman ? ottoman.replace(/-/g, " ") : ""}
                        </span>
                      </label>
                      <div className="d-flex gap-2">
                        <div className="d-flex gap-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            onChange={() => {
                              setOttoman("Yes");
                            }}
                          />{" "}
                          <p className="m-0">
                            Yes + £90.00
                          </p>
                        </div>
                        <div className="d-flex gap-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            onChange={() => {
                              setOttoman("No");
                            }}
                          />{" "}
                          <p className="m-0">
                            No
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {/*.................................... Bed End .......................... */}

                {/*.................................... Mattress Start .......................... */}

                {product?.category === "mattress" && (
                  <>
                    <div className="mt-1">
                      <label style={{ fontSize: "17px", fontWeight: "600" }}>
                        Mattress
                        <span style={{ color: "red" }}>* </span> &nbsp;{" "}
                        <span className="lable_Case">
                          {size ? size.replace(/-/g, " ") : ""}
                        </span>
                      </label>
                      <p className="mt-1 mb-0">Please Choose Mattress Size</p>
                      <select
                        onChange={(e) => {
                          if (e.target.value === "select size") {
                            return setError("mat"), setSize('')
                          } else {
                            setSize(e.target.value);
                          }
                        }}
                        className="form-select mb-2 mr-sm-2"
                      >
                        <option value="select size">Please Choose</option>
                        <option value="Single">Single Size</option>
                        <option value="small-double">
                          Small Double Size
                        </option>
                        <option value="double">Double Size</option>
                        <option value="king">King Size</option>
                        <option value="super-king">Super King Size</option>
                      </select>
                    </div>

                    <div className="mt-1">
                      <label style={{ fontSize: "17px", fontWeight: "600" }}>
                        Mattress Pillow Topper
                        <span style={{ color: "red" }}>* </span>&nbsp;{" "}&nbsp;{" "}
                        &nbsp;{" "}
                        <span className="lable_Case">
                          {ottoman ? ottoman.replace(/-/g, " ") : ""}
                        </span>
                      </label>
                      <div className="d-flex gap-2">
                        <div className="d-flex gap-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            onChange={() => {
                              setOttoman("pillow");
                            }}
                          />
                          <p className="m-0">
                            Yes + £50.00
                          </p>
                        </div>
                        <div className="d-flex gap-2">
                          <input
                            className="form-check-input"
                            type="radio"
                            name="flexRadioDefault"
                            id="flexRadioDefault1"
                            onChange={() => {
                              setOttoman("No");
                            }}
                          />{" "}
                          <p className="m-0">
                            No
                          </p>
                        </div>
                      </div>
                    </div>
                  </>
                )}
                {/*.................................... Mattress End .......................... */}

                {/*.................................... Ottoman Start .......................... */}

                {product?.category === "ottoman-box" && (
                  <>
                    <div className="mt-1">
                      <label style={{ fontSize: "17px", fontWeight: "600" }}>
                        Fabric
                        <span style={{ color: "red" }}>* </span> &nbsp;{" "}
                        <span className="lable_Case">
                          {fabric ? fabric.replace(/-/g, " ") : ""}
                        </span>
                      </label>
                      <p className="mt-1 mb-0">Please Choose Fabric</p>
                      <select
                        className="form-select mb-2 mr-sm-2"
                        onChange={(e) => {
                          if (e.target.value === "select fabric") {
                            return setError("fabrics"), setFabric('');
                          } else {
                            setFabric(e.target.value);
                          }
                        }}
                      >
                        <option value="select fabric">Please Choose</option>
                        <option value="plush-velvet">Plush Velvet</option>
                        <option value="crush-velvet">Crush Velvet</option>
                        <option value="chenille">Chenille</option>
                      </select>
                    </div>

                    <div className="mt-1">
                      <label style={{ fontSize: "17px", fontWeight: "600" }}>
                        Detail
                        <span style={{ color: "red" }}>* </span> &nbsp;{" "}
                        <span className="lable_Case">
                          {detail ? detail.replace(/-/g, " ") : ""}
                        </span>
                      </label>
                      <p className="mt-1 mb-0">Please Choose Detail</p>
                      <select
                        className="form-select mb-2 mr-sm-2"
                        onChange={(e) => {
                          if (e.target.value === "select detail") {
                            return setError("detail"), setDetail('');
                          } else {
                            setDetail(e.target.value);
                          }
                        }}
                      >
                        <option value="select detail">Please Choose</option>
                        <option value="matchig-buttons">Matchig Buttons</option>
                        <option value="diamonds">Diamonds</option>
                      </select>
                    </div>

                  </>
                )}
                {/*.................................... Ottoman End .......................... */}

                {/*.................................... Footstools Start .......................... */}
                {product?.category === "footstools" && (
                  <>
                    <div className="mt-1">
                      <label style={{ fontSize: "17px", fontWeight: "600" }}>
                        Fabric
                        <span style={{ color: "red" }}>* </span> &nbsp;{" "}
                        <span className="lable_Case">
                          {fabric ? fabric.replace(/-/g, " ") : ""}
                        </span>
                      </label>
                      <p className="mt-1 mb-0">Please Choose Fabric</p>
                      <select
                        className="form-select mb-2 mr-sm-2"
                        onChange={(e) => {
                          if (e.target.value === "select fabric") {
                            return setError("fabric"), setFabric('');
                          } else {
                            setFabric(e.target.value);
                          }
                        }}
                      >
                        <option value="select fabric">Please Choose</option>
                        <option value="plush-velvet">Plush Velvet</option>
                        <option value="crush-velvet">Crush Velvet</option>
                        <option value="chenille">Chenille</option>
                      </select>
                    </div>
                  </>
                )}
              </div>
              <div className="sigle_quatity_main mt-3">
                <div className="">
                  <p
                    className="m-0"
                    style={{
                      fontSize: "17px",
                      color: "#1b2950",
                      fontWeight: "600",
                    }}
                  >
                    Quantity{" "}
                  </p>
                </div>
                <div className="sigle_quatity">
                  <button className="plus_btn fs-6" onClick={Decrement}>
                    <FaMinus />
                  </button>
                  <p className="input_single text-center m-0 p-0">
                    {quantity}
                  </p>
                  <button className="plus_btn fs-6" onClick={Increment}>
                    <FaPlus />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-3 d-flex flex-wrap gap-3">
              <p className="m-0 d-flex align-items-center cursor" style={{
                fontSize: "17px",
                color: "#1b2950",
                fontWeight: "600",
              }}>Share Product</p>
              <p className="m-0 fs-6 d-flex justify-content-center align-items-center cursor" onClick={() => handleShare("general")} style={{ width: "30px", height: "30px", borderRadius: "100%" }}><FaShareAlt /></p>
              <p className="m-0 fs-6 d-flex justify-content-center align-items-center cursor" onClick={() => handleShare("instagram")} style={{ width: "30px", height: "30px", background: "linear-gradient(115deg, #f9ce34, #ee2a7b, #6228d7)", color: "rgb(255, 255, 255)", borderRadius: "100%" }}><FaInstagram /></p>
              <p className="m-0 fs-6 d-flex justify-content-center align-items-center cursor" onClick={() => handleShare("tiktok")} style={{ width: "30px", height: "30px", background: "black", color: "white", borderRadius: "100%" }}><FaTiktok /></p>
              <p className="m-0 fs-6 d-flex justify-content-center align-items-center cursor" onClick={() => handleShare("facebook")} style={{ width: "30px", height: "30px", backgroundColor: "rgb(24, 119, 242)", color: "rgb(255, 255, 255)", borderRadius: "100%" }}><FaFacebook /></p>
              <p className="m-0 fs-6 d-flex justify-content-center align-items-center cursor" onClick={() => handleShare("pint")} style={{ width: "30px", height: "30px", backgroundColor: "#E60023", color: "#FFFFFF", borderRadius: "100%" }}><FaPinterestP /></p>
            </div>

            {Error === "options" && (
              <div className="error">All fields are required</div>
            )}

            <div className="s_btn my-3">
              <button
                className="btn s_cart fw-bolder"
                onClick={() =>
                  AddToCart(
                    product,
                    totalPrice,
                    size,
                    side,
                    fabric,
                    detail,
                    base,
                    headboard,
                    ottoman,
                    mattress,
                    color,
                  )
                }
              >
                Add to Cart
              </button>
              <button className="btn s_cart fw-bolder" onClick={Order}>
                Order Now
              </button>
            </div>
            <button className="btn s_whatsapp fw-bolder" onClick={sendWhatsAppMessage}>
              Buy via WhatsApp
            </button>
          </div>

        </div>

        <div className="row mt-5 mb-3 d-flex justify-content-center">
          <div className="col-lg-10 col-md-10 col-sm-12">
            <p
              className="fs-2 fw-bolder"
              style={{
                color: "#1b2950",
                borderBottom: "1px solid #1b2950",
                width: "fit-content"

              }}
            >
              Product Detail
            </p>
            {product?.descriptionHead1 && (
              <p
                className="fs-6 my-3 fw-bolder "
                style={{ color: "#1b2950" }}
              >
                {product.descriptionHead1}
              </p>
            )}
            {product?.description && (
              <p className="fs-6" style={{ textAlign: "justify" }}>{product.description}</p>
            )}
            {product?.descriptionHead2 && (
              <p
                className="fs-6 my-3 fw-bolder"
                style={{ color: "#1b2950" }}
              >
                {product.descriptionHead2}
              </p>
            )}
            {product?.description2 && (
              <p className="fs-6" style={{ textAlign: "justify" }}>{product.description2}</p>
            )}
            {product?.descriptionHead3 && (
              <p
                className="fs-6 my-3 fw-bolder"
                style={{ color: "#1b2950" }}
              >
                {product.descriptionHead3}
              </p>
            )}
            {product?.description3 && (
              <p className="fs-6 " style={{ textAlign: "justify" }}>{product.description3}</p>
            )}
            {product?.descriptionHead4 && (
              <p
                className="fs-6 my-3 fw-bolder"
                style={{ color: "#1b2950" }}
              >
                {product.descriptionHead4}
              </p>
            )}
            {product?.description4 && (
              <p className="fs-6" style={{ textAlign: "justify" }}>{product.description4}</p>
            )}

            {product?.dimensionHead && (
              <p className="fs-6 fw-bolder" style={{ color: "#1b2950" }}>
                {product.dimensionHead}
              </p>
            )}
            <ul className="fs-6">
              {product?.dimension1 && (
                <li>
                  <p style={{ color: "#1b2950" }}>{product.dimension1}</p>
                </li>
              )}
              {product?.dimension2 && (
                <li>
                  <p style={{ color: "#1b2950" }}>{product.dimension2}</p>
                </li>
              )}
              {product?.dimension3 && (
                <li>
                  <p style={{ color: "#1b2950" }}>{product.dimension3}</p>
                </li>
              )}
              {product?.dimension4 && (
                <li>
                  <p style={{ color: "#1b2950" }}>{product.dimension4}</p>
                </li>
              )}
            </ul>

            {product?.featureHead && (
              <p className="fs-6 fw-bolder" style={{ color: "#1b2950" }}>
                {product?.featureHead}
              </p>
            )}
            <ul className="fs-6">
              {product?.feature1 && (
                <p>
                  <li style={{ textAlign: "justify" }}>{product.feature1}</li>
                </p>
              )}
              {product?.feature2 && (
                <p>
                  <li style={{ textAlign: "justify" }}>{product.feature2}</li>
                </p>
              )}
              {product?.feature3 && (
                <p>
                  <li style={{ textAlign: "justify" }}>{product.feature3}</li>
                </p>
              )}
              {product?.feature4 && (
                <p>
                  <li style={{ textAlign: "justify" }}>{product.feature4}</li>
                </p>
              )}
              {product?.feature5 && (
                <p>
                  <li style={{ textAlign: "justify" }}>{product.feature5}</li>
                </p>
              )}
              {product?.feature6 && (
                <p>
                  <li style={{ textAlign: "justify" }}>{product.feature6}</li>
                </p>
              )}
              {product?.feature7 && (
                <p>
                  <li style={{ textAlign: "justify" }}>{product.feature7}</li>
                </p>
              )}
            </ul>
            {product?.note2 && (
              <p className="fs-6 fw-bolder" style={{ color: "#1b2950", textAlign: "justify" }}>
                Note: {product.note2}
              </p>
            )}
            {product?.images &&
              product.images.length > 0 &&
              product?.description && (
                <>
                  <div className="my-4 row row-cols-lg-2 row-cols-1 g-4">
                    <div className="cols">
                      {product.images[0] && (
                        <img
                          src={product.images[0]}
                          className="img-fluid rounded-3"
                          alt="No Network"
                        />
                      )}
                    </div>
                    <div>
                      {product.images[1] && (
                        <img
                          src={product.images[1]}
                          className="img-fluid rounded-3"
                          alt="No Network"
                        />
                      )}
                    </div>
                  </div>
                </>
              )}

          </div>
        </div>

        <div className="row mt-5 mb-3 d-flex justify-content-center">
          <div className="col-lg-10 col-md-10 col-sm-12 mb-5">
            <p
              className="fs-2 fw-bolder"
              style={{
                color: "#1b2950",
                borderBottom: "1px solid #1b2950",
                width: "fit-content"
              }}
            >
              Related Products
            </p>
            {loading ? (
              <div
                className="col-lg-12 col-sm-12 d-flex align-items-center justify-content-center"
                style={{ height: "80vh" }}
              >
                <Loader />
              </div>
            ) : data.filter((item) => item.sn !== product.sn && (item.subCategory ? item.subCategory === product.subCategory : item.category === product.category))
              .length === 0 ? (
              <div
                className="col-lg-12 col-sm-12 d-flex align-items-center justify-content-center"
                style={{ height: "50vh" }}
              >
                <h2>No more product available</h2>
              </div>
            ) : (
              <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-sm-2 g-4">
                {data?.filter((item) => (
                  (item?.subCategory ? item.subCategory === product?.subCategory && item.sn !== product.sn : (item.category === product?.category && item.sn !== product.sn))
                )).map((product, index) => (
                  <div className="col" key={index}>
                    <div className="product_box "
                      style={{ position: "relative" }}>
                      <a href={"/product/" + product._id}>
                        <div className="p_img_box">
                          <img src={product.images[0]} alt="No network"
                            style={{ opacity: loading ? 0 : 1, transition: "opacity 0.5s ease-in-out" }}
                          />
                          <div className="overlay">
                            {product.images[1] && (
                              <img src={product.images[1]} alt="" />
                            )}
                          </div>
                        </div>
                      </a>
                      {product.discount && product.discount > 0 ? (
                        <div className="discount">
                          {`${product.discount}%`}
                        </div>
                      ) : null}
                      <p className="card_title px-2">{product.title}</p>
                      <div className="text-left">
                        {product.discount && product.discount > 0 ? (
                          <>
                            <span className="card_Fprice px-2 ">
                              {" "}
                              {`£${product.Fprice?.toFixed()}`}
                            </span>
                            <span className="card_price">
                              <s>{`£${product.price?.toFixed()}`}</s>
                            </span>
                          </>
                        ) : (
                          <span className="card_Fprice px-2 ">
                            {" "}
                            {`£${product.Fprice?.toFixed()}`}
                          </span>
                        )}
                      </div>
                      <div className="product_btns">
                        <a href={"/product/" + product._id}>
                          <button className="btn p_detail_btn">
                            View Detail
                          </button>
                        </a>
                        <button className="btn p_whatsapp_btn" onClick={() => sendWhatsAppMessage(product?.title)}>
                          Buy Via WhatsApp
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="row mb-5" id="review">
          <div
            className="col-lg-6 col-md-6 col-sm-12 py-5"
            style={{ backgroundColor: "rgb(2, 2, 94)" }}
          >
            <h1
              className="text-center fs-1 fw-bolder"
              style={{ color: "white" }}
            >
              Product Reviews
            </h1>
            {loading ? (
              <div
                className="col-lg-12 col-sm-12 d-flex align-items-center justify-content-center"
                style={{ height: "80vh" }}
              >
                <Loader />
              </div>
            ) : comments.filter((item) => item.productId === productId)
              .length === 0 ? (
              <div
                className="col-lg-12 col-sm-12 d-flex align-items-center justify-content-center"
                style={{ height: "50vh" }}
              >
                <h2 style={{ color: "white" }}>No Review available</h2>
              </div>
            ) : (
              <div className="mt-5">
                <Swiper
                  slidesPerView={2}
                  spaceBetween={30}
                  autoplay={{ delay: 3000 }}
                  modules={[Autoplay]}
                  className="mySwiper"
                >
                  {comments
                    .filter((item) => item.productId === productId)
                    .map((item, index) => {
                      return (
                        <SwiperSlide className="review_slide">
                          <div className="px-3 py-2" key={index}>
                            <p className="review_detail text-center">
                              {item.comment}
                            </p>
                            <p
                              className="text-center"
                              style={{ color: "white" }}
                            >
                              {item.name}
                            </p>
                            <p
                              className="text-center"
                              style={{
                                fontWeight: "700",
                                fontWeight: "700",
                                color: "#F7EEDD",
                              }}
                            >
                              {formatDateTime(item.date1 ? item.date1 : item.date)}
                            </p>
                          </div>
                        </SwiperSlide>
                      );
                    })}
                </Swiper>
              </div>
            )}
          </div>

          <div className="col-lg-6 col-md-6 col-sm-12 px-lg-5 px-3 pt-lg-0 pt-5 order-1 order-lg-2 order-md-2 order-xl-2" style={{ position: "relative" }}>
            {sucess === "comment" && (
              <div className={`succes_box  px-3 ${sucess === "comment" ? "showVerify" : ""}`}>
                <div className="text-end">
                  <button className="btn fw-bolder fs-3"
                    style={{ position: "absolute", top: "0px", right: "10px", color: "red" }}
                    onClick={() => setSucess("")}> <RxCross1 /></button>
                </div>
                <img src="/verified.gif" alt="No Network" style={{ width: "70px" }} />
                <p className="fw-bolder text-center">Feedback Submitted</p>
              </div>
            )}
            <p
              className="fw-bolder fs-2 text-center"
              style={{ color: "rgb(2, 2, 94)" }}
            >
              Product Feedback
            </p>
            <form action="" onSubmit={handleSubmit(Comment)}>
              <div className="input-group mb-3">
                <input required="true"
                  autocomplete="off"
                  type="text"
                  className="input w-100"
                  {...register('name', { required: true })}
                />
                <label class="user-label">Name *</label>
                {errors.name ? <div className='error'>Name is required </div> : null}
              </div>
              <div className="input-group mb-3">
                <input required="true"
                  autocomplete="off"
                  type="email"
                  className="input w-100"
                  {...register('email', { required: true })}
                />
                <label class="user-label">Email *</label>
                {errors.email ? <div className='error'>E-mail is required </div> : null}
              </div>
              <div className="input-group mb-3">
                <textarea required="true"
                  type="text"
                  autocomplete="off"
                  className="input w-100"
                  rows={7}
                  {...register('comment', { required: true })}
                />
                <label class="user-label">Write a Review *</label>
                {errors.comment ? <div className='error'>Cannot submit empty comment</div> : null}
              </div>
              <button type="submit" className="btn review_btn w-100">
                Submit
              </button>
            </form>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12 col-sm-12">
            <Benefits />
          </div>
        </div>
      </div >
    ) : (
      <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "80vh" }} >
        <Loader />
      </div >
    )
    }

  </>
};

export default SingleAdd;
