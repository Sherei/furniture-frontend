import React, { useState, useEffect } from 'react';
import { FaAngleRight, FaMinus, FaPlus, FaArrowLeft, FaArrowRight, FaArrowDown, FaArrowUp, FaStar, } from 'react-icons/fa';
import { RiStarSFill } from 'react-icons/ri';
import { IoIosArrowForward,IoIosArrowBack } from "react-icons/io";
import { useNavigate, useParams } from 'react-router-dom';
import Benefits from '../Benefits/Benefits';
import Loader from '../Loader/Loader';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination, Autoplay } from 'swiper/modules';
import { toast } from 'react-toastify';
import InnerImageZoom from 'react-inner-image-zoom';
import 'react-inner-image-zoom/lib/InnerImageZoom/styles.min.css';
import axios from 'axios';
import './single.css';

const SingleAdd = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
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
    const [loading, setLoading] = useState(true);
    const [size, setSize] = useState('')
    const [color, setColor] = useState('')
    const [detail, setDetail] = useState('')
    const [base, setBase] = useState('')
    const [fabric, setFabric] = useState('')
    const [headboard, setHeadboard] = useState('')
    const [ottoman, setOttoman] = useState('')
    const [mattress, setMattress] = useState('')
    const [Error, setError] = useState(1);
    const [selectedImage, setSelectedImage] = useState(0);
    const [scrollPosition, setScrollPosition] = useState(0);

    const dispatch = useDispatch()



    useEffect(() => {
        setLoading(true)

        try {
            axios.get(`${process.env.REACT_APP_BASE_URL}/singleProduct?id=${productId}`).then((res) => {
                setProduct(res.data);
            })
        } catch (e) {
            setLoading(true)
        }
        finally {
            setLoading(false);
        }
    }, [productId]);


    useEffect(() => {
        setLoading(true)
        try {
            axios.get(`${process.env.REACT_APP_BASE_URL}/product`).then((res) => {
                if (res) {
                    setData(res.data);
                }
            });
        } catch (e) {
            setLoading(true)
        } finally {
            setLoading(false);
        }
    }, []);



    const totalImages = product?.images?.length || 0;

    const handleThumbnailClick = (index) => {
        setSelectedImage(index);
        setScrollPosition(index * 23);
    };

    const handleScroll = (direction) => {
        const container = document.querySelector('.small_images');
        if (container) {
            const scrollAmount = 50;
    
            if (direction === 'up') {
                container.scrollBy({
                    top: -scrollAmount,
                    behavior: 'smooth',
                });
            } else if (direction === 'down') {
                container.scrollBy({
                    top: scrollAmount,
                    behavior: 'smooth',
                });
            } else if (direction === 'left') {
                container.scrollBy({
                    left: -scrollAmount,
                    behavior: 'smooth',
                });
            } else if (direction === 'right') {
                container.scrollBy({
                    left: scrollAmount,
                    behavior: 'smooth',
                });
            }
            setScrollPosition(direction === 'left' || direction === 'right' ? container.scrollLeft : container.scrollTop);
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

    const calculateTotalPrice = (quantity, size, mattress, detail, headboard, ottoman) => {

        let totalPrice = (product?.Fprice || 0) * quantity;

        if (product?.category === "bed") {
            if (size !== undefined && size !== '') {
                if (size === "4ft-small-double") {
                    totalPrice += 120;
                }
                else if (size === "4'6ft-standard-ouble") {
                    totalPrice += 180;
                }
                else if (size === "5ft-king") {
                    totalPrice += 250;
                }
                else if (size === "6ft-super-king") {
                    totalPrice += 300;
                } else {
                    totalPrice += 0;
                }
            }
            if (headboard !== undefined && headboard !== '') {
                if (headboard === "extra-premium") {
                    totalPrice += 79;
                }
                else if (headboard === "exclusive") {
                    totalPrice += 129;
                }
                else if (headboard === "extra-exclusive") {
                    totalPrice += 200
                }
                else if (headboard === "diamond") {
                    totalPrice += 380;
                } else {
                    totalPrice += 0;
                }
            }
            if (detail !== undefined && detail !== '') {
                if (detail === "button") {
                    totalPrice += 10;
                }
            }
            if (ottoman !== undefined && ottoman !== '') {
                if (ottoman === "Yes") {
                    totalPrice += 90;
                }
            }
            if (base !== undefined && base !== '') {
                if (base === "ottoman-gaslift") {
                    totalPrice += 120;
                } else if (base === "solid-base") {
                    totalPrice += 60;
                }
            }
            if (mattress !== undefined && mattress !== '') {
                if (mattress === "small-double") {
                    totalPrice += 70;
                } else if (mattress === "double") {
                    totalPrice += 130;
                } else if (mattress === "king") {
                    totalPrice += 180;
                } else if (mattress === "super-king") {
                    totalPrice += 220;
                }
            }
        }
        else if (product?.category === "sofa") {
            if (size !== undefined && size !== '') {

                if (size === "corner-sofa") {
                    totalPrice += 350;
                }
                else if (size === "5+2-seater") {
                    totalPrice += 450;
                }
                else if (size === "3-seater") {
                    totalPrice += 200;
                }
                else if (size === "2-seater") {
                    totalPrice += 100;
                } else {
                    totalPrice += 0;
                }
            }
        }
        else if (product?.category === "mattress") {
            if (size !== undefined && size !== '') {
                if (size === "small-double") {
                    totalPrice += 60;
                }
                else if (size === "double") {
                    totalPrice += 90;
                }
                else if (size === "king") {
                    totalPrice += 150;
                }
                else if (size === "super-king") {
                    totalPrice += 190;
                } else {
                    totalPrice += 0;
                }
            }
            if (ottoman !== undefined && ottoman !== "") {
                if (ottoman === "pillow") {
                    totalPrice += 50;
                }
            }
        }

        return totalPrice;
    };

    const totalPrice = calculateTotalPrice(quantity, size, mattress, detail, headboard, ottoman);



    async function AddToCart(product,
        size, color, fabric, detail, base, headboard, ottoman, mattress, totalPrice) {

        if (product?.category === "bed") {
            if (!size, !detail, !fabric, !color, !headboard, !base, !mattress) {
                return setError("options")
            }
        } else if (product?.category === "sofa") {
            if (!size, !color) {
                return setError("options")
            }
        } else if (product?.category === "mattress") {
            if (!size) {
                return setError("options")
            }
        } else if (product?.category === "ottoman-box") {
            if (!detail, !fabric, !color) {
                return setError("options")
            }
        } else if (product?.category === "footstools") {
            if (!fabric, !color) {
                return setError("options")
            }
        }
        if (cu._id === undefined) {
            move('/login')
            toast.warning("Login to Place Order")
        }
        else if (cu.email === "asd@gmail.com") {
            dispatch({
                type: 'LOGOUT_USER'
            });
            move('/login')
            toast.warning("Login with different account")
        }
        else {
            try {
                product.productId = product?._id;
                product.userId = cu?._id;
                product.size = size;
                product.color = color;
                product.fabric = fabric;
                product.detail = detail;
                product.base = base;
                product.headboard = headboard;
                product.ottoman = ottoman;
                product.mattress = mattress;
                product.total = totalPrice;
                product.price = product?.Fprice;
                product.quantity = quantity;
                product.image = product?.images[0];
                product.discount = product?.discount;
                let response = await axios.post(`${process.env.REACT_APP_BASE_URL}/addToCart`, product)

                if (response.data === "Product Added") {
                    await toast.success("Added to Cart");

                    dispatch({
                        type: "ADD_TO_CART",
                        payload: product,
                    });
                    localStorage.setItem("cart", JSON.stringify(product));
                    window.location.reload();
                    window.location.href = `/cart/${cu._id}`;
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

    async function Order() {

        await AddToCart(product, size, color, fabric, detail, base, headboard, ottoman, mattress, totalPrice);

        if (cu._id) {
            if (cu._id && cu.email !== "asd@gmail.com") {
                move(`/cart-checkout/${cu._id}`);
            }
        } else if (cu._id === undefined || cu.email !== 'asd@gmail.com') {
            toast.warning("Login to see cart");
            move('/login');
        }
    }


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
        }).catch((error) => {
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

    return <>
        {loading ? (
            <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }} >
                <Loader />
            </div>
        ) : (
            <>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className='col-lg-12 col-sm-12 my-4 s_categories_P d-flex align-items-center'>
                            <p style={{ textTransform: "capitalize" }}>home <FaAngleRight />products <FaAngleRight /> {product?.category} <FaAngleRight />  {product?.subCategory}</p>
                        </div>
                        <div className='col-lg-1 col-md-2 col-sm-12 p-0 m-0 d-flex flex-column border' style={{ position: "relative" }}>
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
                            {(product?.images && product?.images.length > 3) &&
                                <>
                                    <div className='mt-3 arrow_display1 text-center'>
                                        <button className='plus_btn' onClick={() => handleScroll('up')}><FaArrowUp /></button>
                                        <button className='plus_btn' onClick={() => handleScroll('down')}><FaArrowDown /></button>
                                    </div>
                                    <div className='arrow_display2'>
                                        <button className='plus_btn plus_btn1 mx-2' onClick={() => handleScroll('left')}><IoIosArrowBack /></button>
                                        <button className='plus_btn plus_btn2' onClick={() => handleScroll('right')}><IoIosArrowForward /></button>
                                    </div>

                                </>
                            }
                        </div>

                        <div className='col-lg-5 col-md-8 col-sm-12 mb-5' style={{ height: "fit-content" }} >
                            <div style={{ position: "relative" }}>
                                <InnerImageZoom
                                    zoomScale={1}
                                    src={product?.images && product.images[selectedImage] ? product.images[selectedImage] : 'fallbackImageURL'}
                                    zoomSrc={product?.images && product.images[selectedImage] ? product.images[selectedImage] : 'fallbackImageURL'}

                                />
                                {product?.discount && product?.discount > 0 ? (
                                    <div className='discount'>
                                        {`-${product?.discount}%`}
                                    </div>
                                ) : null}

                                {product?.images && product?.images.length > 1 &&
                                    <>
                                        <div className='single_arrow1' onClick={handleLeftArrowClick}>
                                            <FaArrowLeft />
                                        </div>
                                        <div className='single_arrow2' onClick={handleRightArrowClick}>
                                            <FaArrowRight />
                                        </div>
                                    </>

                                }
                            </div>
                        </div>
                        <div className='col-lg-5 col-sm-12' >
                            <div className={`s_content ${product?.category === "bed" ? "bed_class" : ""}`}>
                                <h1 className='text-center fs-1 ' style={{ color: "#1b2950" }}>{product?.title}</h1>
                                {comments.filter((item) => item.productId === productId).length > 0 &&
                                    <span className='mt-2 mb-3' style={{ color: "red" }}><RiStarSFill /><RiStarSFill /><RiStarSFill />
                                        <RiStarSFill /><RiStarSFill />
                                        <span className='text-center' style={{ color: "#1b2950" }} >({comments.filter((item) => item.productId === productId).length} Review)</span>
                                    </span>
                                }
                                <p className='fs-6 fw-bolder ' style={{ color: "#1b2950" }}>Product code: {product?.sn}</p>

                                {product.discount && product.discount > 0 ? (
                                    <>
                                        {product?.category === "bed" ? (
                                            <div className='text-center'>
                                                <span className='fw-bold fs-5' style={{ color: "red" }}>{`£${totalPrice?.toFixed()}`}</span>
                                                <span className='fs-6' style={{ color: "red" }}><s className='mx-2'>{`£${product?.price.toFixed()}`}</s></span>
                                            </div>
                                        ) : (
                                            <div>
                                                <span className='fw-bold fs-5' style={{ color: "red" }}>{`£${totalPrice?.toFixed()}`}</span>
                                                <span className='fs-6' style={{ color: "red" }}><s className='mx-2'>{`£${product?.price.toFixed()}`}</s></span>
                                            </div>
                                        )}
                                    </>
                                ) : (
                                    <>
                                        {product?.category === "bed" ? (
                                            <span className='fw-bolder fs-5 text-center' style={{ color: "red" }}>
                                                {`£${totalPrice?.toFixed()}`}
                                            </span>
                                        ) : (
                                            <span className='fw-bolder fs-5' style={{ color: "red" }}>
                                                {`£${totalPrice?.toFixed()}`}
                                            </span>
                                        )}
                                    </>
                                )}



                                <div className='single_form  mt-1'>
                                    {/*.................................... Sofa Start .......................... */}

                                    {product?.category === "sofa" &&
                                        <>
                                            <div>
                                                <label style={{ fontSize: "17px", fontWeight: "600" }}>Size
                                                    <span style={{ color: "red" }}>* </span>&nbsp; <span className='lable_Case'>
                                                        {size ? size.replace(/-/g, " ") : ""}
                                                    </span>
                                                </label>
                                                <p className='mt-1 mb-0'>Please Choose Size</p>
                                                <select className="form-control form-select  mb-2 mr-sm-2"
                                                    onChange={(e) => {
                                                        if (e.target.value === "select size") {
                                                            return setError("size")
                                                        } else {
                                                            setSize(e.target.value)
                                                        }
                                                    }}>
                                                    <option value="select size">Select Size</option>
                                                    <option value="corner-sofa">Corner Sofa +(£350)</option>
                                                    <option value="5+2-seater">3 + 2 Sofa Set +(£450)</option>
                                                    <option value="3-seater">3 Seater +(£200)</option>
                                                    <option value="2-seater">2 Seater +(£100)</option>
                                                    <option value="1-seater">1 Seater</option>
                                                </select>
                                            </div>

                                            <div className='mt-1'>
                                                {product?.category === "sofa" &&
                                                    <label style={{ fontSize: "17px", fontWeight: "600" }}>Colour
                                                        <span style={{ color: "red" }}>* </span>&nbsp; <span className='lable_Case'>
                                                            {color ? color.replace(/-/g, " ") : ""}
                                                        </span>
                                                    </label>
                                                }
                                                <p className='mt-1 mb-0'>Please Choose Colour</p>
                                                <select onChange={(e) => {
                                                    if (e.target.value === "select color") {
                                                        return setError("color")
                                                    } else if (product?.category === "mattress" && e.target.value === "select color") {
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

                                    {product?.category === "bed" && (
                                        <>
                                            <div>
                                                <label style={{ fontSize: "17px", fontWeight: "600" }}>Bed Size
                                                    <span style={{ color: "red" }}>* </span>&nbsp; <span className='lable_Case'>{size ? size.replace(/-/g, " ") : ""} </span>
                                                </label>
                                                <p className='mt-1 mb-0'>Please Choose Size</p>
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
                                                    <option value="4ft-small-double">4ft Small Double +(£120)</option>
                                                    <option value="4'6ft-standard-ouble">4'6ft Standard Double +(£180)</option>
                                                    <option value="5ft-king">5ft King +(£250)</option>
                                                    <option value="6ft-super-king">6ft Super King +(£300)</option>
                                                </select>
                                            </div>

                                            <div className='mt-1'>
                                                <label style={{ fontSize: "17px", fontWeight: "600" }}>Fabric
                                                    <span style={{ color: "red" }}>* </span>&nbsp; <span className='lable_Case'>
                                                        {fabric ? fabric.replace(/-/g, " ") : ""}
                                                    </span>
                                                </label>

                                                <p className='mt-1 mb-0'>Please Choose Fabric</p>
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

                                            <div className='mt-1'>
                                                <label style={{ fontSize: "17px", fontWeight: "600" }}>Headboard Height
                                                    <span style={{ color: "red" }}>* </span>&nbsp; <span className='lable_Case'>
                                                        {headboard ? headboard.replace(/-/g, " ") : ""}
                                                    </span>
                                                </label>
                                                <p className='mt-1 mb-0'>Please Choose Headboard Height</p>
                                                <select className="form-select mb-2 mr-sm-2"
                                                    onChange={(e) => {
                                                        if (e.target.value === "headboard") {
                                                            return setError("headboard")
                                                        } else {
                                                            setHeadboard(e.target.value)
                                                        }
                                                    }}>
                                                    <option value="select headboard">Please Choose</option>
                                                    <option value="standard">Standard (54")</option>
                                                    <option value="extra-premium">Extra Premium (65") (+£79.00)</option>
                                                    <option value="exclusive">Exclusive (70") (+£129.00)</option>
                                                    <option value="extra-exclusive">Extra Exclusive (80") (+£200.00)</option>
                                                    <option value="diamond">Diamond (90") (+£380.00)</option>
                                                    <option value="two-part">Two Part Option Available</option>
                                                </select>
                                            </div>

                                            <div className='mt-1'>
                                                <label style={{ fontSize: "17px", fontWeight: "600" }}>Colour
                                                    <span style={{ color: "red" }}>* </span>&nbsp; <span className='lable_Case'>
                                                        {color ? color.replace(/-/g, " ") : ""}
                                                    </span>
                                                </label>

                                                <p className='mt-1 mb-0'>Please Choose Colour</p>
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

                                            <div className='mt-1'>
                                                <label style={{ fontSize: "17px", fontWeight: "600" }}>Detail
                                                    <span style={{ color: "red" }}>* </span>&nbsp; <span className='lable_Case'>
                                                        {detail ? detail.replace(/-/g, " ") : ""}
                                                    </span>
                                                </label>
                                                <p className='mt-1 mb-0'>Please Choose more Detail</p>
                                                <select
                                                    onChange={(e) => {
                                                        if (e.target.value === "select detail") {
                                                            return setError("detail")
                                                        } else {
                                                            setDetail(e.target.value)
                                                        }
                                                    }} className="form-select mb-2 mr-sm-2">
                                                    <option value="select detail">Please Choose</option>
                                                    <option value="button">Buttons +(£10.0)</option>
                                                    <option value="diamonds">Diamonds</option>
                                                    <option value="not-required">Not Required</option>
                                                </select>
                                            </div>

                                            <div className='mt-1'>
                                                <label style={{ fontSize: "17px", fontWeight: "600" }}>Bed Base
                                                    <span style={{ color: "red" }}>* </span>&nbsp; <span className='lable_Case'>
                                                        {base ? base.replace(/-/g, " ") : ""}
                                                    </span>
                                                </label>
                                                <p className='mt-1 mb-0'>Please Choose Bed Base</p>
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
                                                    <option value="ottoman-gaslift">Ottoman Gaslift +(£120.00)</option>
                                                    <option value="solid-base">Solid Base +(£60.00)</option>
                                                </select>
                                            </div>

                                            <div className='mt-1'>
                                                <label style={{ fontSize: "17px", fontWeight: "600" }}>Mattress Size
                                                    &nbsp; <span style={{ color: "red" }}>* </span>&nbsp; <span className='lable_Case'>
                                                        {mattress ? mattress.replace(/-/g, " ") : ""}
                                                    </span>
                                                </label>
                                                <p className='mt-1 mb-0'>Please Choose Mattress Size</p>
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
                                                    <option value="small-double">Small Double +(£70)</option>
                                                    <option value="double">Double +(£130)</option>
                                                    <option value="king">King +(£180)</option>
                                                    <option value="super-king">Super King +(£220)</option>
                                                    <option value="not-require">Not Require</option>
                                                </select>
                                            </div>

                                            <div className='mt-1'>
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
                                                                setOttoman("Yes")
                                                            }}
                                                        /> &nbsp;
                                                        <label className="form-check-label" htmlFor="flexRadioDefault1">
                                                            Yes + £90.00
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                                </div>

                                {/*.................................... Bed End .......................... */}


                                {/*.................................... Mattress Start .......................... */}

                                {product?.category === "mattress" &&
                                    <>
                                        <div className='mt-1'>
                                            <label style={{ fontSize: "17px", fontWeight: "600" }}>Mattress Size
                                                <span style={{ color: "red" }}>* </span>  &nbsp; <span className='lable_Case'>
                                                    {size ? size.replace(/-/g, " ") : ""}
                                                </span>
                                            </label>
                                            <p className='mt-1 mb-0'>Please Choose Mattress Size</p>
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
                                                <option value="small-double">Small Double +(£60)</option>
                                                <option value="double">Double +(£90)</option>
                                                <option value="king">King +(£150)</option>
                                                <option value="super-king">Super King +(£190)</option>
                                            </select>
                                        </div>

                                        <div className='mt-1'>
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
                                                            setOttoman("pillow")
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

                                {product?.category === "ottoman-box" &&
                                    <>
                                        <div className='mt-1'>
                                            <label style={{ fontSize: "17px", fontWeight: "600" }}>Fabric
                                                <span style={{ color: "red" }}>* </span>  &nbsp; <span className='lable_Case'>
                                                    {fabric ? fabric.replace(/-/g, " ") : ""}
                                                </span>
                                            </label>
                                            <p className='mt-1 mb-0'>Please Choose Fabric</p>
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

                                        <div className='mt-1'>
                                            <label style={{ fontSize: "17px", fontWeight: "600" }}>Colour
                                                <span style={{ color: "red" }}>* </span>  &nbsp; <span className='lable_Case'>
                                                    {color ? color.replace(/-/g, " ") : ""}
                                                </span>
                                            </label>

                                            <p className='mt-1 mb-0'>Please Choose Colour</p>
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

                                        <div className='mt-1'>
                                            <label style={{ fontSize: "17px", fontWeight: "600" }}>Detail
                                                <span style={{ color: "red" }}>* </span>  &nbsp; <span className='lable_Case'>
                                                    {detail ? detail.replace(/-/g, " ") : ""}
                                                </span>
                                            </label>
                                            <p className='mt-1 mb-0'>Please Choose more Detail</p>
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

                                {product?.category === "footstools" &&
                                    <>
                                        <div className='mt-1'>
                                            <label style={{ fontSize: "17px", fontWeight: "600" }}>Fabric
                                                <span style={{ color: "red" }}>* </span>  &nbsp; <span className='lable_Case'>
                                                    {fabric ? fabric.replace(/-/g, " ") : ""}
                                                </span>
                                            </label>
                                            <p className='mt-1 mb-0'>Please Choose Fabric</p>
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

                                        <div className='mt-1'>
                                            <label style={{ fontSize: "17px", fontWeight: "600" }}>Colour
                                                <span style={{ color: "red" }}>* </span>  &nbsp; <span className='lable_Case'>
                                                    {color ? color.replace(/-/g, " ") : ""}
                                                </span>
                                            </label>
                                            <p className='mt-1 mb-0'>Please Choose Colour</p>
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
                            </div>
                            <div className='sigle_quatity_main mt-1'>
                                <div className=''>
                                    <p className='m-0' style={{ fontSize: "17px", color: "#1b2950", fontWeight: "600" }}>Quantity: </p>
                                </div>
                                <div className='sigle_quatity'>
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
                            {Error === "options" &&
                                <div className='error'>All fields are required</div>
                            }

                            <div className='s_btn my-3'>
                                <button className='btn s_cart fw-bolder' onClick={() => AddToCart(product,
                                    size, color, fabric, detail, base, headboard, ottoman, mattress, totalPrice)}>Add to Cart</button>
                                <button className='btn s_cart fw-bolder' onClick={(Order)}>Order now</button>
                            </div>
                            <div className=''>
                                <a href="https://wa.me/+923067208343" target='blank'>
                                    <button className='btn s_whatsapp fw-bolder'>Buy via WhatsApp</button>
                                </a>
                            </div>
                        </div>

                    </div>


                    <div className='row my-5 d-flex justify-content-center'>
                        <div className='col-lg-10 col-md-10 col-sm-12'>
                            <p className='fs-2 fw-bolder' style={{ color: "#1b2950", borderBottom: "1px solid #1b2950" }}>
                                Product Detail
                            </p>

                            {product?.descriptionHead1 && <p className='fs-6 my-3 fw-bolder' style={{ color: "#1b2950" }}>{product.descriptionHead1}</p>}
                            {product?.description && <p className='fs-6 text-muted'>{product.description}</p>}
                            {product?.descriptionHead2 && <p className='fs-6 my-3 fw-bolder' style={{ color: "#1b2950" }}>{product.descriptionHead2}</p>}
                            {product?.description2 && <p className='fs-6 text-muted'>{product.description2}</p>}
                            {product?.descriptionHead3 && <p className='fs-6 my-3 fw-bolder' style={{ color: "#1b2950" }}>{product.descriptionHead3}</p>}
                            {product?.description3 && <p className='fs-6 text-muted'>{product.description3}</p>}
                            {product?.descriptionHead4 && <p className='fs-6 my-3 fw-bolder' style={{ color: "#1b2950" }}>{product.descriptionHead4}</p>}
                            {product?.description4 && <p className='fs-6 text-muted'>{product.description4}</p>}

                            {product?.dimensionHead && <p className='fs-6 fw-bolder' style={{ color: "#1b2950" }}>{product.dimensionHead}</p>}
                            <ul>
                                {product?.dimension1 && <li><p className='fs-6 fw-bolder' style={{ color: "#1b2950" }}>{product.dimension1}</p></li>}
                                {product?.dimension2 && <li><p className='fs-6 fw-bolder' style={{ color: "#1b2950" }}>{product.dimension2}</p></li>}
                                {product?.dimension3 && <li><p className='fs-6 fw-bolder' style={{ color: "#1b2950" }}>{product.dimension3}</p></li>}
                                {product?.dimension4 && <li><p className='fs-6 fw-bolder' style={{ color: "#1b2950" }}>{product.dimension4}</p></li>}
                            </ul>

                            {product.featureHead && <p className='fs-6 fw-bolder' style={{ color: "#1b2950" }}>{product.featureHead}</p>}
                            <ul>
                                {product?.feature1 && <p><li>{product.feature1}</li></p>}
                                {product?.feature2 && <p><li>{product.feature2}</li></p>}
                                {product?.feature3 && <p><li>{product.feature3}</li></p>}
                                {product?.feature4 && <p><li>{product.feature4}</li></p>}
                                {product?.feature5 && <p><li>{product.feature5}</li></p>}
                                {product?.feature6 && <p><li>{product.feature6}</li></p>}
                                {product?.feature7 && <p><li>{product.feature7}</li></p>}
                            </ul>

                            {(product?.images && product.images.length > 0 && product?.description) &&
                                <>
                                    <div className='my-4 d-flex flex-wrap justify-content-center gap-5'>
                                        {product.images[1] && <img src={product.images[1]} className='img-fluid rounded' alt="No Network" style={{ maxHeight: "400px" }} />}
                                        {product.images[2] && <img src={product.images[2]} className='img-fluid rounded' alt="No Network" style={{ maxHeight: "400px" }} />}
                                    </div>
                                </>
                            }

                            {product?.category === "bed" &&
                                <div className="table-responsive">
                                    <p className='fs-6 fw-bolder'>Dimensions: (Should be in table form)</p>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Bed Size Height (Inches)</th>
                                                <th>Length (Inches)</th>
                                                <th>Width (Inches)</th>
                                                <th>Footboard</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr className='text-center'>
                                                <td>Single 3ft</td>
                                                <td>82</td>
                                                <td>38</td>
                                                <td>20</td>
                                            </tr>
                                            <tr className='text-center'>
                                                <td>Small Double 4ft</td>
                                                <td>82</td>
                                                <td>50</td>
                                                <td>20</td>
                                            </tr>
                                            <tr className='text-center'>
                                                <td>Double 4'6ft</td>
                                                <td>82</td>
                                                <td>56</td>
                                                <td>20</td>
                                            </tr>
                                            <tr className='text-center'>
                                                <td>King Size 5ft</td>
                                                <td>84</td>
                                                <td>62</td>
                                                <td>20</td>
                                            </tr>
                                            <tr className='text-center'>
                                                <td>Super King 6ft</td>
                                                <td>84</td>
                                                <td>74</td>
                                                <td>20</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            }

                            {product?.note2 && <p className='fs-6 fw-bolder' style={{ color: "#1b2950" }}>Note: {product.note2}</p>}

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

                        <div className='col-lg-6 col-md-6 col-sm-12 pt-5 px-lg-5 px-3 order-1 order-lg-2 order-md-2 order-xl-2'>
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
        )}
    </>
}

export default SingleAdd;
