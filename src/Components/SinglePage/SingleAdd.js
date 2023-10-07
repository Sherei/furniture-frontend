import React, { useState, useEffect } from 'react';
import { FaAngleRight } from 'react-icons/fa';
import { RiStarSFill } from 'react-icons/ri';
import { AiOutlineZoomIn, AiOutlineZoomOut } from 'react-icons/ai';
import { useNavigate, useParams } from 'react-router-dom';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import Benefits from '../Benefits/Benefits';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
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

    const handleThumbnailClick = (index) => {
        setSelectedImage(index);
    };
    const handleQuantityChange = (e) => {
        const newQuantity = parseInt(e.target.value);
        if (!isNaN(newQuantity) && newQuantity >= 1) {
            setQuantity(newQuantity);
        }
    };

    const totalPrice = product.Fprice * quantity;

    const Comment = async (cmnt) => {
        try {
            const commentWithProductId = { ...cmnt, productId };

            const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/comments`, commentWithProductId);
            if (response.status === 200) {
                toast.success("Comment Submitted");
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
        else {

            const totalPrice = product.Fprice * quantity;
            const meraForm = new FormData();

            meraForm.append('title', product.title);
            meraForm.append('productId', product._id);
            meraForm.append('userId', cu._id);
            meraForm.append('price', product.price);
            meraForm.append('quantity', quantity);
            meraForm.append('Fprice', totalPrice);
            meraForm.append('sn', product.sn);
            meraForm.append('category', product.category);
            meraForm.append('subCategory', product.subCategory);
            meraForm.append('description', product.description);
            meraForm.append('image', product.images[0]);
            meraForm.append('discount', product.discount);
            try {
                let response = await axios.post(`${process.env.REACT_APP_BASE_URL}/addToCart`, meraForm)

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

    return <>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-lg-12 col-sm-12 my-4 s_categories_P d-flex align-items-center'>
                    <p style={{ textTransform: "capitalize" }}>home <FaAngleRight />products <FaAngleRight /> {product.category} <FaAngleRight />  {product.subCategory}</p>
                </div>
                <div className='col-lg-1 col-md-2 col-sm-12 d-flex justify-content-center'>
                    <div className='small_images'>
                        {product.images &&
                            product.images.map((image, index) => (
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

                <div className='col-lg-4 col-md-8 col-sm-12 mb-5 border' style={{ height: "fit-content", position: "relative" }} >
                    <TransformWrapper
                        initialScale={1}
                        initialPositionX={0}
                        initialPositionY={0}
                    >
                        {({ zoomIn, zoomOut, ...rest }) => (
                            <>
                                <TransformComponent>
                                    {product.images && product.images.length > 0 ? (
                                        <div className='s-Image'>
                                            <img src={product.images[selectedImage]} className='s-Image img-fluid' alt="No network" />
                                        </div>
                                    ) : (
                                        <div className='s_main_img border'>
                                            <p>No images available</p>
                                        </div>
                                    )}

                                </TransformComponent>
                                {product.discount && product.discount > 0 ? (
                                    <div className='discount'>
                                        {`-${product.discount}%`}
                                    </div>
                                ) : null}
                                <div className="tools">
                                    <button onClick={() => zoomIn()}><AiOutlineZoomIn /></button>
                                    <button onClick={() => zoomOut()}><AiOutlineZoomOut /></button>
                                </div>
                            </>
                        )}
                    </TransformWrapper>
                </div>
                <div className='col-lg-4 col-sm-12'>
                    <div className='s_content'>
                        <h1 className='text-center fs-1' style={{ color: "#1b2950" }}>{product.title}</h1>
                        <p className='text-center text-muted fs-6'>{product.description}</p>
                        <p className='fw-bolder' style={{ color: "#1b2950" }}>
                            Rating <span style={{ color: 'red' }}>
                                <RiStarSFill /><RiStarSFill /><RiStarSFill /><RiStarSFill /><RiStarSFill />
                            </span>
                        </p>
                        <p className='fw-bolder' style={{ color: "#1b2950" }}>
                            <span>Reviews : {comments.filter((item) => item.productId === productId).length}</span>
                        </p>
                        <p className='fw-bolder' style={{ color: "#1b2950" }}>Price:<span className=''>{`$${totalPrice.toFixed(2)}`}</span></p>
                        <p className='fw-bolder' style={{ color: "#1b2950" }}>Quantity: <input
                            className='input_single'
                            type="number"
                            defaultValue={1}
                            min={1} onChange={handleQuantityChange} /></p>
                    </div>
                    <div className='s_btn mt-3'>

                        <button className='btn s_cart' onClick={() => AddToCart(product)}>Add to Cart</button>

                        <a href="https://wa.me/+923067208343">
                            <button className='btn s_whatsapp'>Buy via WhatsApp</button>
                        </a>
                    </div>
                </div>

                {/* Related items */}

                <div className='col-lg-3 col-sm-12 related'>
                    <p className='fw-bolder' style={{ color: "#1b2950" }}>You may like this</p>
                    <div className='s_box'>
                        {data.filter((item) => item.category === product.category).reverse()
                            .map((product) => (
                                <div className="single_box" key={product.id} onClick={() => move("/single_Add/" + product._id)}>
                                    <img  src={product.images[0]} alt='No Network' className='img-fluid single_img' />
                                    {product.discount && product.discount > 0 ? (
                                        <div className='s_discount'>
                                            {`${product.discount}%`}
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
                                .map((item) => {
                                    return (
                                        <div className='border col-lg-8 col-md-12 col-sm-12 py-2 mb-2'
                                            style={{
                                                height: "fit-content",
                                                backgroundColor: "rgb(255, 255, 255, 0.8)"
                                            }}>
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
                                                    <p>{item.date.slice(0, 19)}</p>
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
        </div>
    </>
}

export default SingleAdd;
