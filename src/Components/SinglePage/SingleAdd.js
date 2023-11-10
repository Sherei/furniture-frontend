import React, { useState, useEffect } from 'react';
import { FaAngleRight, FaMinus, FaPlus, FaAngleLeft, FaStar } from 'react-icons/fa';
import { RiStarSFill } from 'react-icons/ri';
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { TransformWrapper, TransformComponent, PinchZoomPan } from "react-zoom-pan-pinch";
import Benefits from '../Benefits/Benefits';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';

import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import './single.css';

const SingleAdd = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);

    let cu = useSelector(store => store.userSection.cu);

    let move = useNavigate();

    let { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [data, setData] = useState([]);
    const [quantity, setQuantity] = useState(1)
    const [comments, setComments] = useState([])
    const [isLoadingComments, setIsLoadingComments] = useState(true);
    const [loading, setLoading] = useState(false);
    const [size, setSize] = useState('')
    const [color, setColor] = useState('')
    const [detail, setDetail] = useState('')
    const [base, setBase] = useState('')
    const [fabric, setFabric] = useState('')
    const [headboard, setHeadboard] = useState('')
    const [ottoman, setOttoman] = useState('')
    const [mattress, setMattress] = useState('')
    const [Error, setError] = useState(1);
    const [descriptionExpanded, setDescriptionExpanded] = useState(false);

    const dispatch = useDispatch()



    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/singleProduct?id=${productId}`).then((res) => {
            setProduct(res.data);
        }).catch((error) => {
            // console.error(error);
        });
    }, [productId]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/product`).then((res) => {
            try {
                if (res) {
                    setData(res.data);
                }
            } catch (e) {
                // console.log(e);
            }
        });
    }, []);


    const [selectedImage, setSelectedImage] = useState(0);
    const totalImages = product?.images?.length || 0;

    const handleThumbnailClick = (index) => {
        setSelectedImage(index);
    };

    const handleQuantityChange = (e) => {
        // const newQuantity = parseInt(e.target.value);
        // if (!isNaN(newQuantity) && newQuantity >= 1) {
        //     setQuantity(newQuantity);
        // }
    };

    const Increment = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    const Decrement = () => {
        if (quantity > 1) {
            setQuantity((prevQuantity) => prevQuantity - 1);
        }
    };
    // const totalPrice = product?.Fprice * quantity;

    const calculateTotalPrice = (price, quantity, size, mattress, detail, fabric, headboard, ottoman) => {

        let totalPrice = price * quantity;

        if (size === "small-double" || size === "2-seater" || size === "4ft" || mattress === "small-double") {
            totalPrice += 1 * 50;
        } else if (size === "double" || size === "3-seater" || size === "4'6ft" || mattress === "double") {
            totalPrice += 3 * 50;
        } else if (size === "king" || size === "5-seater" || size === "5ft" || mattress === "king") {
            totalPrice += 4 * 50;
        } else if (size === "super-king" || size === "corner-sofa" || size === "6ft" || mattress === "super-king") {
            totalPrice += 5 * 50;
        }

        return totalPrice;
    };

    const totalPrice = calculateTotalPrice(product.Fprice, quantity, size, detail, fabric, headboard, ottoman);


    async function AddToCart(product) {

        if (product.category === "bed") {
            if (!size || !fabric || !headboard || !color || !detail || !base) {
                return setError("bed")
            }
        }
        if (product.category === "sofa") {
            if (!size || !color) {
                return setError("sofa")
            }
        }
        if (product.category === "footstools") {

            if (!size) {
                return setError("footstools")
            }
        }
        if (product.category === "ottoman-box") {

            if (!fabric || !color || !detail) {
                return setError("ottoman-box")
            }
        }
        if (product.category === "footstools") {

            if (!fabric || !color) {
                return setError("footstools")
            }
        }

        if (cu._id === undefined) {
            move('/login')
            toast.warning("Login First")
        }
        else if (cu.email === "asd@gmail.com") {
            dispatch({
                type: 'LOGOUT_USER'
            });
            move('/login')
            toast.warning("Login with different account")
        }
        else {

            if (product.discount === null || product.discount === undefined) {
                product.discount = 0;
            }

            const totalPrice = product.Fprice * quantity;
            product.productId = product._id;
            product.userId = cu._id;
            product.size = size;
            product.color = color;
            product.fabric = fabric;
            product.detail = detail;
            product.base = base;
            product.Fprice = totalPrice;
            product.image = product.images[0];
            console.log(product)
            try {
                let response = await axios.post(`${process.env.REACT_APP_BASE_URL}/addToCart`, product)

                if (response.data === "Product Added") {
                    toast.success("Added to Cart");
                }
            } catch (error) {

                if (error.response && error.response.status === 400) {
                    toast.warning("Product is Already into cart");
                } else {
                    toast.error("An error occurred. Please try again later.");
                }

            } finally {
                setLoading(false);
            }
        }
    };

    const handleLeftArrowClick = () => {
        setSelectedImage((prevSelectedImage) => (prevSelectedImage - 1 + totalImages) % totalImages);
    };

    const handleRightArrowClick = () => {
        setSelectedImage((prevSelectedImage) => (prevSelectedImage + 1) % totalImages);
    };

    const Comment = async (cmnt) => {
        try {
            const commentWithProductId = { ...cmnt, productId };

            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/comments`, commentWithProductId);
            if (response.status === 200) {
                toast.success("Comment Submitted");
                reset();
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            } else {
                toast.error("Error occurred");
            }
        } catch (e) {
            // console.error(e);
        }
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/comments`).then((res) => {
            setComments(res.data);
            setIsLoadingComments(false);
        })
            .catch((error) => {
                // console.error(error);
                setIsLoadingComments(false);
            });
    }, []);
    const formatDateTime = (dateStr) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            second: 'numeric',
        };
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', options);
    };

    function Order() {
        if (cu._id === undefined || cu.email === "asd@gmail.com") {
            return <Error />;
        } else {
            AddToCart()
            move(`/cart-checkout/${cu._id}`)
        }
    }

    return <>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-12 col-sm-12 my-4 s_categories_P d-flex align-items-center'>
                    <p style={{ textTransform: "capitalize" }}>home <FaAngleRight />products <FaAngleRight /> {product?.category} <FaAngleRight />  {product?.subCategory}</p>
                </div>
                <div className='col-lg-1 col-md-2 col-sm-12 d-flex justify-content-center'>
                    <div className='small_images'>
                        {product?.images &&
                            product?.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={image}
                                    alt='No Network'
                                    onClick={() => handleThumbnailClick(index)}
                                    className={index === selectedImage ? 'activeImg' : ''}
                                />
                            ))}
                    </div>
                </div>

                <div className='col-lg-4 col-md-8 col-sm-12 mb-5' style={{ height: "fit-content" }} >
                    <div style={{ position: "relative" }}>
                        <TransformWrapper
                            initialScale={1}
                            maxScale={5}
                            initialPositionX={0}
                            initialPositionY={0}
                            draggableUnZoomed={false}
                            draggableZoomed={false}

                        >
                            {({ zoomIn, zoomOut, ...rest }) => (
                                <>
                                    <TransformComponent disabled>
                                        {product?.images && product?.images.length > 0 ? (
                                            <div className='s-Image'>
                                                <img src={product?.images[selectedImage]} className='s-Image img-fluid rounded' alt="No network" />
                                            </div>
                                        ) : (
                                            <div className='s_main_img '>
                                                <p>No images available</p>
                                            </div>
                                        )}

                                    </TransformComponent>
                                    {product?.discount && product?.discount > 0 ? (
                                        <div className='discount'>
                                            {`-${product?.discount}%`}
                                        </div>
                                    ) : null}
                                    {product?.images && product?.images.length > 0 &&
                                        <div className="tools">
                                            <button onClick={() => zoomIn()}><AiOutlineZoomIn /></button>
                                            <button onClick={() => zoomOut()}><AiOutlineZoomOut /></button>
                                        </div>
                                    }
                                    {product?.images && product?.images.length > 0 &&
                                        <>
                                            <div className='single_arrow1' onClick={handleLeftArrowClick}>
                                                <FaAngleLeft />
                                            </div>
                                            <div className='single_arrow2' onClick={handleRightArrowClick}>
                                                <FaAngleRight />
                                            </div>
                                        </>

                                    }
                                </>
                            )}
                        </TransformWrapper>
                    </div>
                    {product.description &&
                        <div className='mt-5'>
                            <p className='fs-3 fw-bolder' style={{ color: "#1b2950", borderBottom: "1px solid #1b2950" }}>Product Detail</p>
                            <p className={`text-center text-muted fs-6 mb-2 single_description ${descriptionExpanded ? 'expanded' : ''}`}>
                                {product?.description}
                            </p>
                            <div className="d-flex justify-content-center mt-4">
                                <button
                                    className='btn single_read_btn'
                                    onClick={() => setDescriptionExpanded(!descriptionExpanded)}
                                >
                                    {descriptionExpanded ? 'Read Less' : 'Read More'}
                                </button>
                            </div>
                        </div>
                    }
                </div>
                <div className='col-lg-4 col-sm-12'>
                    <div className='s_content'>
                        <h1 className='text-center fs-1 ' style={{ color: "#1b2950" }}>{product?.title}</h1>
                        {comments.filter((item) => item.productId === productId).length > 0 &&
                            <span className='mt-2 mb-3' style={{ color: "red" }}><RiStarSFill /><RiStarSFill /><RiStarSFill />
                                <RiStarSFill /><RiStarSFill />
                                <span className='text-center' style={{ color: "#1b2950" }} >({comments.filter((item) => item.productId === productId).length} Review)</span>
                            </span>
                        }
                        {product.discount && product.discount > 0 ? (
                            <>
                                {product.category === "bed" ? (
                                    <div className='text-center'>
                                        <span className='fw-bold fs-5 mx-2' style={{ color: "red" }}>{`£${totalPrice?.toFixed(1)}`}</span>
                                        <span className='fs-6' style={{ color: "red" }}><s>{`£${product.price.toFixed(2)}`}</s></span>
                                    </div>
                                ) : (
                                    <div>
                                        <span className='fw-bold fs-5 mx-2' style={{ color: "red" }}>{`£${totalPrice?.toFixed(1)}`}</span>
                                        <span className='fs-6' style={{ color: "red" }}><s>{`£${product.price.toFixed(2)}`}</s></span>
                                    </div>
                                )}
                            </>
                        ) : (
                            <>
                                {product.category === "bed" ? (
                                    <span className='fw-bolder fs-5 text-center' style={{ color: "red" }}>
                                        {`£${totalPrice?.toFixed(2)}`}
                                    </span>
                                ) : (
                                    <span className='fw-bolder fs-5' style={{ color: "red" }}>
                                        {`£${totalPrice?.toFixed(2)}`}
                                    </span>
                                )}
                            </>
                        )}



                        <div className='single_form  mt-3'>
                            {(Error === "bed" || Error === "sofa" || Error === "mattress" || Error === "ottoman-box") &&
                                <div className='error'>All fields are required</div>
                            }

                            {/*.................................... Sofa Start .......................... */}

                            {product.category === "sofa" &&
                                <>
                                    <div>
                                        <label style={{ fontSize: "17px", fontWeight: "600" }}>Size
                                            <span style={{ color: "red" }}>* </span>&nbsp; <span className='lable_Case'>
                                                {size ? size.replace(/-/g, " ") : ""}
                                            </span>
                                        </label>
                                        <p className='mt-2 mb-0'>Please Choose Size</p>

                                        <select className="form-control form-select  mb-2 mr-sm-2"
                                            onChange={(e) => {
                                                if (e.target.value === "select size") {
                                                    return setError("size")
                                                } else {
                                                    setSize(e.target.value)
                                                }
                                            }}>
                                            <option value="select size">Select Size</option>
                                            <option value="corner-sofa">Corner Sofa</option>
                                            <option value="5+2-seater">3 + 2 Sofa Set</option>
                                            <option value="3-seater">3 Seater</option>
                                            <option value="2-seater">2 Seater</option>
                                            <option value="1-seater">1 Seater</option>
                                        </select>
                                    </div>

                                    <div className='mt-3'>
                                        {product.category === "sofa" &&
                                            <label style={{ fontSize: "17px", fontWeight: "600" }}>Colour
                                                <span style={{ color: "red" }}>* </span>&nbsp; <span className='lable_Case'>
                                                    {color ? color.replace(/-/g, " ") : ""}
                                                </span>
                                            </label>
                                        }
                                        <p className='mt-2 mb-0'>Please Choose Colour</p>
                                        <select onChange={(e) => {
                                            if (e.target.value === "select color") {
                                                return setError("color")
                                            } else if (product.category === "mattress" && e.target.value === "select color") {
                                                return setColor("Not selected")
                                            } else {
                                                setColor(e.target.value)
                                            }
                                        }} className="form-select mb-2 mr-sm-2">
                                            <option value="select color">Please Choose</option>
                                            <option value="black">Black</option>
                                            <option value="silver">Silver</option>
                                            <option value="grey">Grey</option>
                                            <option value="mink">Mink</option>
                                            <option value="royal-blue">Royal Blue</option>
                                            <option value="sky-blue">Sky Blue</option>
                                            <option value="white">White</option>
                                            <option value="mustered-gold">Mustered Gold</option>
                                            <option value="cream">Cream</option>
                                            <option value="pink">Pink</option>
                                            <option value="steel">Steel</option>
                                            <option value="teal">Teal</option>
                                            <option value="green">Green</option>
                                            <option value="duck-egg">Duck Egg</option>
                                            <option value="beige">Beige</option>
                                        </select>
                                    </div>
                                </>
                            }

                            {/*............................ Sofa End ............................ */}



                            {/*........................ Bed Start ..................... */}

                            {product.category === "bed" && (
                                <>
                                    <div>
                                        <label style={{ fontSize: "17px", fontWeight: "600" }}>Bed Size
                                            <span style={{ color: "red" }}>* </span>&nbsp; <span className='lable_Case'>{size ? size.replace(/-/g, " ") : ""} </span>
                                        </label>
                                        <p className='mt-2 mb-0'>Please Choose Size</p>

                                        <select className="form-control form-select mb-2 mr-sm-2"

                                            onChange={(e) => {
                                                if (e.target.value === "select size") {
                                                    return setError("bed-size")
                                                } else {
                                                    setSize(e.target.value)
                                                }
                                            }}>
                                            <option value="select size">Select Size</option>
                                            <option value="3ft-single">3ft Single</option>
                                            <option value="4ft-small-double">4ft Small Double</option>
                                            <option value="4'6ft-standard-ouble">4'6ft Standard Double</option>
                                            <option value="5ft-king">5ft King</option>
                                            <option value="6ft-super-king">6ft Super King</option>
                                        </select>
                                    </div>

                                    <div className='mt-3'>
                                        <label style={{ fontSize: "17px", fontWeight: "600" }}>Fabric
                                            <span style={{ color: "red" }}>* </span>&nbsp; <span className='lable_Case'>
                                                {fabric ? fabric.replace(/-/g, " ") : ""}
                                            </span>
                                        </label>

                                        <p className='mt-2 mb-0'>Please Choose Fabric</p>
                                        <select className="form-select mb-2 mr-sm-2"
                                            onChange={(e) => {
                                                if (e.target.value === "select fabric") {
                                                    return setError("fabric")
                                                } else {
                                                    setFabric(e.target.value)
                                                }
                                            }}>
                                            <option value="select fabric">Please Choose</option>
                                            <option value="plush-velvet">Plush Velvet</option>
                                            <option value="crush-velvet">Crush Velvet</option>
                                            <option value="chenille">Chenille</option>
                                        </select>
                                    </div>

                                    <div className='mt-3'>
                                        <label style={{ fontSize: "17px", fontWeight: "600" }}>Headboard Height
                                            <span style={{ color: "red" }}>* </span>&nbsp; <span className='lable_Case'>
                                                {headboard ? headboard.replace(/-/g, " ") : ""}
                                            </span>
                                        </label>
                                        <p className='mt-2 mb-0'>Please Choose Headboard Height</p>
                                        <select className="form-select mb-2 mr-sm-2"
                                            onChange={(e) => {
                                                if (e.target.value === "headboard") {
                                                    return setError("headboard")
                                                } else {
                                                    setHeadboard(e.target.value)
                                                }
                                            }}>
                                            <option value="select headboard">Please Choose</option>
                                            <option value="standard-(54)">Standard (54")</option>
                                            <option value="extra-premium-(65)-(+£79.00)">Extra Premium (65") (+£79.00)</option>
                                            <option value="exclusive-(70)-(+£129.00)">Exclusive (70") (+£129.00)</option>
                                            <option value="extra-exclusive-(80)-(+£200.00)">Extra Exclusive (80") (+£200.00)</option>
                                            <option value="diamond-(90)-(+£380.00)">Diamond (90") (+£380.00)</option>
                                            <option value="two-part">Two Part Option Available</option>
                                        </select>
                                    </div>

                                    <div className='mt-3'>
                                        <label style={{ fontSize: "17px", fontWeight: "600" }}>Colour
                                            <span style={{ color: "red" }}>* </span>&nbsp; <span className='lable_Case'>
                                                {color ? color.replace(/-/g, " ") : ""}
                                            </span>
                                        </label>

                                        <p className='mt-2 mb-0'>Please Choose Colour</p>
                                        <select onChange={(e) => {
                                            if (e.target.value === "select color") {
                                                return setError("color")
                                            } else {
                                                setColor(e.target.value)
                                            }
                                        }} className="form-select mb-2 mr-sm-2">
                                            <option value="select color">Please Choose</option>
                                            <option value="black">Black</option>
                                            <option value="silver">Silver</option>
                                            <option value="grey">Grey</option>
                                            <option value="mink">Mink</option>
                                            <option value="royal-blue">Royal Blue</option>
                                            <option value="sky-blue">Sky Blue</option>
                                            <option value="white">White</option>
                                            <option value="mustered-gold">Mustered Gold</option>
                                            <option value="cream">Cream</option>
                                            <option value="pink">Pink</option>
                                            <option value="steel">Steel</option>
                                            <option value="teal">Teal</option>
                                            <option value="green">Green</option>
                                            <option value="duck-egg">Duck Egg</option>
                                            <option value="beige">Beige</option>
                                        </select>
                                    </div>

                                    <div className='mt-3'>
                                        <label style={{ fontSize: "17px", fontWeight: "600" }}>Detail
                                            <span style={{ color: "red" }}>* </span>&nbsp; <span className='lable_Case'>
                                                {detail ? detail.replace(/-/g, " ") : ""}
                                            </span>
                                        </label>
                                        <p className='mt-2 mb-0'>Please Choose more Detail</p>
                                        <select
                                            onChange={(e) => {
                                                if (e.target.value === "select detail") {
                                                    return setError("detail")
                                                } else {
                                                    setDetail(e.target.value)
                                                }
                                            }} className="form-select mb-2 mr-sm-2">
                                            <option value="select detail">Please Choose</option>
                                            <option value="button-+£10.0">Buttons +£10.0</option>
                                            <option value="diamonds">Diamonds</option>
                                            <option value="not-required">Not Required</option>
                                        </select>
                                    </div>

                                    <div className='mt-3'>
                                        <label style={{ fontSize: "17px", fontWeight: "600" }}>Bed Base
                                            <span style={{ color: "red" }}>* </span>&nbsp; <span className='lable_Case'>
                                                {base ? base.replace(/-/g, " ") : ""}
                                            </span>
                                        </label>
                                        <p className='mt-2 mb-0'>Please Choose Bed Base</p>
                                        <select
                                            onChange={(e) => {

                                                if (e.target.value === "select base") {
                                                    setBase('Not Selected')
                                                } else {
                                                    setBase(e.target.value)
                                                }
                                            }} className="form-select mb-2 mr-sm-2">
                                            <option value="select base">Please Choose</option>
                                            <option value="slats">Slats</option>
                                            <option value="ottoman-gaslift-+£120.00">Ottoman Gaslift +£120.00</option>
                                            <option value="solid-base-+£60.00">Solid Base +£60.00</option>
                                        </select>
                                    </div>

                                    <div className='mt-3'>
                                        <label style={{ fontSize: "17px", fontWeight: "600" }}>Mattress Size
                                            &nbsp; <span className='lable_Case'>
                                                {mattress ? mattress.replace(/-/g, " ") : ""}
                                            </span>
                                        </label>
                                        <p className='mt-2 mb-0'>Please Choose Mattress Size</p>
                                        <select
                                            onChange={(e) => {
                                                if (e.target.value === "select size") {
                                                    return setError("mat")
                                                } else {
                                                    setMattress(e.target.value)
                                                }
                                            }}
                                            className="form-select mb-2 mr-sm-2">
                                            <option value="select size">Please Choose</option>
                                            <option value="Single">Single</option>
                                            <option value="small-double">Small Double</option>
                                            <option value="double">Double</option>
                                            <option value="king">King</option>
                                            <option value="super-king">Super King</option>
                                            <option value="not-require">Not Require</option>
                                        </select>
                                    </div>

                                    <div className='mt-3'>
                                        <label style={{ fontSize: "17px", fontWeight: "600" }}>
                                            Matching Ottoman Box
                                            &nbsp; <span className='lable_Case'>
                                                {ottoman ? ottoman.replace(/-/g, " ") : ""}
                                            </span>
                                        </label>
                                        <div className='d-flex gap-2'>
                                            <div>
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="flexRadioDefault"
                                                    id="flexRadioDefault1"
                                                    onChange={() => {
                                                        setOttoman("Yes + £90.00")
                                                    }}
                                                /> &nbsp;
                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                    Yes + £90.00
                                                </label>
                                            </div>
                                            <div>
                                                <input
                                                    className="form-check-input"
                                                    type="radio"
                                                    name="flexRadioDefault"
                                                    id="flexRadioDefault1"
                                                    onChange={() => {
                                                        setOttoman("No")
                                                    }}
                                                /> &nbsp;
                                                <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                    No
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>

                        {/*.................................... Bed End .......................... */}


                        {/*.................................... Mattress Start .......................... */}

                        {product.category === "mattress" &&
                            <>
                                <div className='mt-3'>
                                    <label style={{ fontSize: "17px", fontWeight: "600" }}>Mattress Size
                                        <span style={{ color: "red" }}>* </span>  &nbsp; <span className='lable_Case'>
                                            {size ? size.replace(/-/g, " ") : ""}
                                        </span>
                                    </label>
                                    <p className='mt-2 mb-0'>Please Choose Mattress Size</p>
                                    <select
                                        onChange={(e) => {
                                            if (e.target.value === "select size") {
                                                return setError("mat")
                                            } else {
                                                setSize(e.target.value)
                                            }
                                        }}
                                        className="form-select mb-2 mr-sm-2">
                                        <option value="select size">Please Choose</option>
                                        <option value="Single">Single</option>
                                        <option value="small-double">Small Double</option>
                                        <option value="double">Double</option>
                                        <option value="king">King</option>
                                        <option value="super-king">Super King</option>
                                    </select>
                                </div>

                                <div className='mt-3'>
                                    <label style={{ fontSize: "17px", fontWeight: "600" }}>Mattress Pillow Topper
                                        &nbsp; <span className='lable_Case'>
                                            {ottoman ? ottoman.replace(/-/g, " ") : ""}
                                        </span>
                                    </label>

                                    <div className='d-flex gap-2'>
                                        <div>
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault1"
                                                onChange={() => {
                                                    setOttoman("Yes + £50.00")
                                                }}
                                            />
                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                Yes + £50.00
                                            </label>
                                        </div>
                                        <div>
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="flexRadioDefault"
                                                id="flexRadioDefault1"
                                                onChange={() => {
                                                    setOttoman("No")
                                                }}
                                            /> &nbsp;
                                            <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                No
                                            </label>
                                        </div>

                                    </div>
                                </div>

                            </>


                        }
                        {/*.................................... Mattress End .......................... */}

                        {/*.................................... Ottoman Start .......................... */}

                        {product.category === "ottoman-box" &&
                            <>
                                <div className='mt-3'>
                                    <label style={{ fontSize: "17px", fontWeight: "600" }}>Fabric
                                        <span style={{ color: "red" }}>* </span>  &nbsp; <span className='lable_Case'>
                                            {fabric ? fabric.replace(/-/g, " ") : ""}
                                        </span>
                                    </label>
                                    <p className='mt-2 mb-0'>Please Choose Fabric</p>
                                    <select className="form-select mb-2 mr-sm-2"
                                        onChange={(e) => {
                                            if (e.target.value === "select fabric") {
                                                return setError("fabric")
                                            } else {
                                                setFabric(e.target.value)
                                            }
                                        }}>
                                        <option value="select fabric">Please Choose</option>
                                        <option value="plush-velvet">Plush Velvet</option>
                                        <option value="crush-velvet">Crush Velvet</option>
                                        <option value="chenille">Chenille</option>
                                    </select>
                                </div>

                                <div className='mt-3'>
                                    <label style={{ fontSize: "17px", fontWeight: "600" }}>Colour
                                        <span style={{ color: "red" }}>* </span>  &nbsp; <span className='lable_Case'>
                                            {color ? color.replace(/-/g, " ") : ""}
                                        </span>
                                    </label>

                                    <p className='mt-2 mb-0'>Please Choose Colour</p>
                                    <select onChange={(e) => {
                                        if (e.target.value === "select color") {
                                            return setError("color")
                                        } else {
                                            setColor(e.target.value)
                                        }
                                    }} className="form-select mb-2 mr-sm-2">
                                        <option value="select color">Please Choose</option>
                                        <option value="black">Black</option>
                                        <option value="silver">Silver</option>
                                        <option value="grey">Grey</option>
                                        <option value="mink">Mink</option>
                                        <option value="royal-blue">Royal Blue</option>
                                        <option value="sky-blue">Sky Blue</option>
                                        <option value="white">White</option>
                                        <option value="mustered-gold">Mustered Gold</option>
                                        <option value="cream">Cream</option>
                                        <option value="pink">Pink</option>
                                        <option value="steel">Steel</option>
                                        <option value="teal">Teal</option>
                                        <option value="green">Green</option>
                                        <option value="duck-egg">Duck Egg</option>
                                        <option value="beige">Beige</option>
                                    </select>
                                </div>

                                <div className='mt-3'>
                                    <label style={{ fontSize: "17px", fontWeight: "600" }}>Detail
                                        <span style={{ color: "red" }}>* </span>  &nbsp; <span className='lable_Case'>
                                            {detail ? detail.replace(/-/g, " ") : ""}
                                        </span>
                                    </label>
                                    <p className='mt-2 mb-0'>Please Choose more Detail</p>
                                    <select
                                        onChange={(e) => {
                                            if (e.target.value === "select detail") {
                                                return setError("detail")
                                            } else {
                                                setDetail(e.target.value)
                                            }
                                        }} className="form-select mb-2 mr-sm-2">
                                        <option value="select detail">Please Choose</option>
                                        <option value="matchig-buttons">Matchig Buttons </option>
                                        <option value="diamonds">Diamonds</option>
                                    </select>
                                </div>

                            </>
                        }
                        {/*.................................... Ottoman End .......................... */}


                        {/*.................................... Footstools Start .......................... */}

                        {product.category === "footstools" &&
                            <>
                                <div className='mt-3'>
                                    <label style={{ fontSize: "17px", fontWeight: "600" }}>Fabric
                                        <span style={{ color: "red" }}>* </span>  &nbsp; <span className='lable_Case'>
                                            {fabric ? fabric.replace(/-/g, " ") : ""}
                                        </span>
                                    </label>
                                    <p className='mt-2 mb-0'>Please Choose Fabric</p>
                                    <select className="form-select mb-2 mr-sm-2"
                                        onChange={(e) => {
                                            if (e.target.value === "select fabric") {
                                                return setError("fabric")
                                            } else {
                                                setFabric(e.target.value)
                                            }
                                        }}>
                                        <option value="select fabric">Please Choose</option>
                                        <option value="plush-velvet">Plush Velvet</option>
                                        <option value="crush-velvet">Crush Velvet</option>
                                        <option value="chenille">Chenille</option>
                                    </select>
                                </div>

                                <div className='mt-3'>
                                    <label style={{ fontSize: "17px", fontWeight: "600" }}>Colour
                                        <span style={{ color: "red" }}>* </span>  &nbsp; <span className='lable_Case'>
                                            {color ? color.replace(/-/g, " ") : ""}
                                        </span>
                                    </label>
                                    <p className='mt-2 mb-0'>Please Choose Colour</p>
                                    <select onChange={(e) => {
                                        if (e.target.value === "select color") {
                                            return setError("color")
                                        } else {
                                            setColor(e.target.value)
                                        }
                                    }} className="form-select mb-2 mr-sm-2">
                                        <option value="select color">Please Choose</option>
                                        <option value="black">Black</option>
                                        <option value="silver">Silver</option>
                                        <option value="grey">Grey</option>
                                        <option value="mink">Mink</option>
                                        <option value="royal-blue">Royal Blue</option>
                                        <option value="sky-blue">Sky Blue</option>
                                        <option value="white">White</option>
                                        <option value="mustered-gold">Mustered Gold</option>
                                        <option value="cream">Cream</option>
                                        <option value="pink">Pink</option>
                                        <option value="steel">Steel</option>
                                        <option value="teal">Teal</option>
                                        <option value="green">Green</option>
                                        <option value="duck-egg">Duck Egg</option>
                                        <option value="beige">Beige</option>
                                    </select>
                                </div>
                            </>
                        }

                        {/*.................................... Footstools End .......................... */}



                        <div className='sigle_quatity_main mt-3'>
                            <div className='mt-3'>
                                <p style={{ fontSize: "17px", color: "#1b2950", fontWeight: "600" }}>Quantity: </p>
                            </div>
                            <div className='sigle_quatity'>
                                <button className="plus_btn" onClick={Decrement}>
                                    <FaMinus />
                                </button>

                                <p className="input_single text-center m-0 p-0">
                                    {quantity}
                                </p>
                                <button className="plus_btn" onClick={Increment}>
                                    <FaPlus />
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className='s_btn my-3'>
                        <button className='btn s_cart' onClick={() => AddToCart(product)}>Add to Cart</button>
                        <button className='btn s_cart' onClick={(Order)}>Order now</button>
                    </div>
                    <div className=''>
                        <a href="https://wa.me/+923067208343" target='blank'>
                            <button className='btn s_whatsapp'>Buy via WhatsApp</button>
                        </a>
                    </div>

                </div>


                {/* Related items */}

                <div className='col-lg-3 col-sm-12 related'>
                    <p className='fw-bolder' style={{ color: "#1b2950" }}>You may like this</p>
                    <div className='s_box'>
                        {data?.filter((item) => item.category === product?.category).reverse()
                            .map((product, index) => (
                                <div className="single_box" key={index} onClick={() => {
                                    window.scrollTo({
                                        top: 0,
                                        behavior: 'smooth',
                                    });
                                    move("/single_Add/" + product._id);
                                }}
                                >
                                    <img src={product?.images[0]} alt='No Network' className='img-fluid single_img' />
                                    {product?.discount && product?.discount > 0 ? (
                                        <div className='s_discount'>
                                            {`${product?.discount}%`}
                                        </div>
                                    ) : null}
                                    <div>
                                        <p className='fs-6' style={{ color: "#1b2950" }}>{product?.title.slice(0, 70)}...</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </div>



            <div className='row mt-5 pt-5'>
                <div className='col-lg-6 col-md-6 col-sm-12 py-5' style={{ backgroundColor: "rgb(2, 2, 94)" }}>
                    <h1 className='text-center fs-1 fw-bolder' style={{ color: "white" }}>Product Reviews</h1>
                    {isLoadingComments ? (
                        <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "80vh" }} >
                            <Loader />
                        </div>
                    ) : comments.filter((item) => item.productId === productId).length === 0 ? (
                        <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh", color: "rgb(2, 2, 94)" }} >
                            <h2 style={{ color: "white" }}>No Review available</h2>
                        </div>
                    ) : (
                        <div className='mt-5'>
                            <Swiper
                                slidesPerView={2}
                                spaceBetween={30}
                                autoplay={{ delay: 3000 }}
                                modules={[Autoplay]}
                                className="mySwiper"
                            >
                                {comments.filter((item) => item.productId === productId)
                                    .map((item, index) => {
                                        return <SwiperSlide className='review_slide'>
                                            <div className='px-3 py-2' key={index} >
                                                <div className='text-center' style={{ color: "yellow" }}>
                                                    <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
                                                </div>
                                                <p className='review_detail text-center py-5 mt-3' >
                                                    {item.comment}
                                                </p>
                                                <p className='text-center' style={{ color: "white" }}>{item.name}</p>
                                                <p className='text-center text-muted' style={{ fontWeight: "700", fontWeight: "700" }}>{formatDateTime(item.date)}</p>
                                            </div>
                                        </SwiperSlide>
                                    })}

                            </Swiper>
                        </div>
                    )}
                </div>

                <div className='col-lg-6 col-md-6 col-sm-12 pt-5 order-1 order-lg-2 order-md-2 order-xl-2'>
                    <p className='fw-bolder fs-2 text-center' style={{ color: 'rgb(2, 2, 94)' }} >Product Feedback</p>
                    <form action="" onSubmit={handleSubmit(Comment)}>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Name *
                            </label>
                            <input
                                {...register('name', { required: true })}
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                            />
                            {errors.name ? <div className='error'>Name is required </div> : null}

                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Email *
                            </label>
                            <input
                                {...register('email', { required: true })}
                                type="email"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                            />
                            {errors.email ? <div className='error'>Email is required </div> : null}

                        </div>
                        <div className="mb-3">
                            <label htmlFor="exampleInputEmail1" className="form-label">
                                Comment *
                            </label>
                            <textarea
                                {...register('comment', { required: true })}
                                type="text"
                                className="form-control"
                                id="exampleInputEmail1"
                                aria-describedby="emailHelp"
                                rows={5}
                            />
                            {errors.comment ? <div className='error'>Cannot submit empty comment</div> : null}
                        </div>
                        <button type="submit" className="btn review_btn">
                            Submit
                        </button>
                    </form>

                </div>
            </div>
            <div className='row'>
                <div className='col-lg-12 col-sm-12'>
                    <Benefits />
                </div>
            </div>
        </div >
    </>
}

export default SingleAdd;
