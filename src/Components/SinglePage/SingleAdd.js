import React, { useState, useEffect } from 'react';
import { FaAngleRight, FaMinus, FaPlus, FaAngleLeft } from 'react-icons/fa';
import { RiStarSFill } from 'react-icons/ri';
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Benefits from '../Benefits/Benefits';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
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

    let cu = useSelector(store => store.userSection.cu)

    let move = useNavigate();

    let { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { productId } = useParams();
    const [product, setProduct] = useState({});
    const [data, setData] = useState([]);
    const [quantity, setQuantity] = useState(1)
    const [comments, setComments] = useState([])
    const [isLoadingComments, setIsLoadingComments] = useState(true);
    const [loading, setLoading] = useState(false);
    const [size, setSize] = useState('');
    const [Error, setError] = useState(1);
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
    const totalPrice = product?.Fprice * quantity;

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

    async function AddToCart() {

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
            product.size = size;
            product.userId = cu._id;
            product.Fprice = totalPrice;
            product.quantity = quantity;
            product.image = product.images[0];

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
                                    className={index === selectedImage ? 'active' : ''}
                                />
                            ))}
                    </div>
                </div>

                <div className='col-lg-4 col-md-8 col-sm-12 mb-5' style={{ height: "fit-content", position: "relative" }} >
                    <TransformWrapper
                        initialScale={1}
                        initialPositionX={0}
                        initialPositionY={0}
                    >
                        {({ zoomIn, zoomOut, ...rest }) => (
                            <>
                                <TransformComponent>
                                    {product?.images && product?.images.length > 0 ? (
                                        <div className='s-Image'>
                                            <img src={product.images[selectedImage]} className='s-Image img-fluid rounded' alt="No network" />
                                        </div>
                                    ) : (
                                        <div className='s_main_img border'>
                                            <p>No images available</p>
                                        </div>
                                    )}

                                </TransformComponent>
                                {product?.discount && product?.discount > 0 ? (
                                    <div className='discount'>
                                        {`-${product?.discount}%`}
                                    </div>
                                ) : null}
                                <div className="tools">
                                    <button onClick={() => zoomIn()}><AiOutlineZoomIn /></button>
                                    <button onClick={() => zoomOut()}><AiOutlineZoomOut /></button>
                                </div>
                                <div className='single_arrow1' onClick={handleLeftArrowClick}>
                                    <FaAngleLeft />
                                </div>
                                <div className='single_arrow2' onClick={handleRightArrowClick}>
                                    <FaAngleRight />
                                </div>
                            </>
                        )}
                    </TransformWrapper>
                </div>
                <div className='col-lg-4 col-sm-12'>
                    <div className='s_content'>
                        <h1 className='text-center fs-1 ' style={{ color: "#1b2950" }}>{product?.title}</h1>
                        <p className='text-center text-muted fs-6 mb-2'>{product?.description}</p>
                        {comments.filter((item) => item.productId === productId).length > 0 &&
                            <span className='text-center mt-2 mb-3' style={{ color: "red" }}><RiStarSFill /><RiStarSFill /><RiStarSFill />
                                <RiStarSFill /><RiStarSFill />
                                <span className='text-center' style={{ color: "#1b2950" }} >({comments.filter((item) => item.productId === productId).length} Customer Review)</span>
                            </span>
                        }
                        {product.category === "sofa" &&
                            <div>
                                <p className='fw-bolder fs-5'>Size: <span className='fs-6' style={{ color: "#1b2950", fontWeight: "500", textTransform: "capitalize" }}>{size}</span>  </p>
                                <div className='d-flex flex-wrap justify-content-center'>
                                    <div className='size_box' onClick={() => setSize("5-seater")}><p className='m-0'>3+2 Sofa Set</p></div>
                                    <div className='size_box' onClick={() => setSize("3-seater")}><p className='m-0'>3 Seater</p></div>
                                    <div className='size_box' onClick={() => setSize("2-seater")}><p className='m-0'>2 Seater</p></div>
                                    <div className='size_box' onClick={() => setSize("1-seater")}><p className='m-0'>1 Seater</p></div>
                                    <div className='size_box' onClick={() => setSize("corner-sofa")}><p className='m-0'>Corner Sofa</p></div>
                                </div>
                            </div>
                        }
                        {product.category === "bed" &&
                            <div>
                                <p className='fw-bolder fs-5'>Size: <span style={{ color: "#1b2950", fontWeight: "500", textTransform: "capitalize" }}>{size}</span>  </p>
                                <div className='d-flex flex-wrap justify-content-center'>
                                    <div className='size_box' onClick={() => setSize("3ft-double")}><p className='m-0'>3ft Single</p></div>
                                    <div className='size_box' onClick={() => setSize("4ft-standard-double")}><p className='m-0'>4ft Small Double</p></div>
                                    <div className='size_box' onClick={() => setSize("5ft-king")}><p className='m-0'>5ft King</p></div>
                                    <div className='size_box' onClick={() => setSize("4'6ft-king")}><p className='m-0'>4'6ft Standard Double</p></div>
                                    <div className='size_box' onClick={() => setSize("6ft-super-king")}><p className='m-0'>6ft Super King</p></div>
                                </div>
                            </div>
                        }
                        {product.category === "mattress" &&
                            <div>
                                <p className='fw-bolder fs-5'>Size: &nbsp;&nbsp;&nbsp; <span style={{ color: "#1b2950", fontWeight: "500", textTransform: "capitalize" }}>
                                    {size}
                                </span>
                                </p>
                                <div className='d-flex flex-wrap justify-content-center'>
                                    <div className='size_box' onClick={() => setSize("single")}><p className='m-0'>Single</p></div>
                                    <div className='size_box' onClick={() => setSize("small-double")}><p className='m-0'>Small Double</p></div>
                                    <div className='size_box' onClick={() => setSize("double")}><p className='m-0'>Double</p></div>
                                    <div className='size_box' onClick={() => setSize("king")}><p className='m-0'>King</p></div>
                                    <div className='size_box' onClick={() => setSize("super-king")}><p className='m-0'>Super King</p></div>
                                </div>
                            </div>
                        }

                        <div className='d-flex gap-5 align-items-center mt-3'>
                            <p className='fw-bolder fs-5' style={{ color: "#1b2950" }}>Price:</p>
                            <p className='fw-bolder fs-5' style={{ color: "#1b2950" }}>{`£${totalPrice.toFixed(2)}`}</p>
                        </div>
                        <div className='d-flex gap-4 align-items-center'>
                            <div className='mt-3'>
                                <p className='fw-bolder fs-5' style={{ color: "#1b2950" }}>Quantity: </p>
                            </div>
                            <div className='d-flex align-items-center'>
                                <button className="plus_btn" onClick={Decrement}>
                                    <FaMinus />
                                </button>
                                <input name="quantity"
                                    type="number"
                                    className="input_single mx-2"
                                    value={quantity}
                                    min={1}
                                    onChange={handleQuantityChange}
                                />
                                <button className="plus_btn" onClick={Increment}>
                                    <FaPlus />
                                </button>
                            </div>

                        </div>
                    </div>
                    <div className='s_btn mt-3'>
                        <button className='btn s_cart' onClick={() => AddToCart(product)}>Add to Cart</button>
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
                                        <p className='fs-6' style={{ color: "#1b2950" }}>{product.title.slice(0, 70)}...</p>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>


            </div>
            <div className='row mt-5'>
                <div className='col-lg-6 col-md-6 col-sm-12 order-2 order-lg-1  order-xl-1'>
                    {comments.filter((item) => item.productId === productId).length > 0 && (
                        <div className='col-lg-12 col-sm-12'>
                            <div>
                                <p className="text-center fw-bolder fs-4" style={{ color: "rgb(2, 2, 94)" }}>
                                    {`${comments.filter((item) => item.productId === productId).length} Reviews`}
                                </p>
                            </div>
                        </div>
                    )}

                    {isLoadingComments ? (
                        <div className="col-12 my-5 d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
                            <Loader />
                        </div>
                    ) : comments.filter((item) => item.productId === productId).length === 0 ? (
                        <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh", color: "rgb(2, 2, 94)" }} >
                            <h2>No Review available</h2>
                        </div>
                    ) : (
                        <div className='row comments_row'>
                            {comments.filter((item) => item.productId === productId)
                                .map((item, index) => {
                                    return (
                                        <div className='border col-lg-8 col-md-12 col-sm-12 py-2 mb-2'
                                            style={{
                                                height: "fit-content",
                                                backgroundColor: "rgb(255, 255, 255, 0.8)"
                                            }} key={index}>
                                            <div className='d-flex align-items-center' >
                                                <img
                                                    src="/149071-removebg-preview.png"
                                                    className="rounded-circle shadow-1-strong"
                                                    width={50}
                                                    height={50}
                                                    alt="No network"
                                                />
                                                <div className='px-4'>
                                                    <p className='my-0' style={{ fontWeight: "700" }}>{item.name}</p>
                                                    <p>{formatDateTime(item.date)}</p>
                                                    <p>{item.comment}</p>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    )}
                </div>

                <div className='col-lg-6 col-md-6 col-sm-12 order-1 order-lg-2 order-md-2 order-xl-2'>
                    <div>
                        <p className='fw-bolder fs-2 text-center' style={{ color: 'rgb(2, 2, 94)' }} >Leave us a comment</p>

                    </div>
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
