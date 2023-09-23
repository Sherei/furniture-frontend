import React, { useState, useEffect } from 'react';
import { FaAngleRight, FaPlus, FaMinus } from 'react-icons/fa';
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

    let cu = useSelector(store => store.userSection.cu)

    let move = useNavigate();

    let { register, handleSubmit, reset, formState: { errors } } = useForm();

    const { productId } = useParams();
    const [data, setData] = useState([]);
    const [product, setProduct] = useState({});
    const [quantity, setQuantity] = useState(1)
    const [comments, setComments] = useState([])
    const [isLoadingComments, setIsLoadingComments] = useState(true);


    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/singleProduct?id=${productId}`).then((res) => {
            setProduct(res.data);
        }).catch((error) => {
            console.error(error);
        });
    }, [productId]);

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/product`).then((res) => {
            try {
                if (res) {
                    setData(res.data);
                }
            } catch (e) {
                console.log(e);
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

    const totalPrice = (product.Fprice * quantity) + parseInt(product.shipping);

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
            console.error(e);
        }
    };

    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/comments`).then((res) => {
            setComments(res.data);
            setIsLoadingComments(false);
        })
            .catch((error) => {
                console.error(error);
                setIsLoadingComments(false);
            });
    }, []);

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

                <div className='col-lg-4 col-md-8 col-sm-12 mb-5' style={{ position: "relative" }} >
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
                                    {product.discount && product.discount > 0 ? (
                                        <div className='discount'>
                                            {`-${product.discount}%`}
                                        </div>
                                    ) : null}
                                </TransformComponent>
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
                        <h1 className='text-center' style={{ fontSize: "34px" }}>{product.title}</h1>
                        <p className='text-center' style={{ fontSize: "15px" }}>{product.description}</p>
                        <p className='' style={{ fontWeight: '600' }}>
                            Rating <span style={{ color: 'red' }}>
                                <RiStarSFill /><RiStarSFill /><RiStarSFill /><RiStarSFill /><RiStarSFill />
                            </span>
                        </p>
                        <p className='' style={{ fontWeight: '600' }}> {` Reviews : ${comments.filter((item) => item.productId === productId).length}`} </p>
                        <p>Shipping Fee:
                            {product.shipping > 0 &&
                                <p>
                                    {product.shipping}
                                </p>
                            }
                            <p style={{color:"green", fontWeight:"600"}}>Free</p>
                        </p>
                        <p className=''><b>Price: </b>
                            <span className='card_Fprice'>{`$${totalPrice}`}</span>
                        </p>
                        <p><b>Quantity: </b>
                            <input className='input_single' type="number" value={quantity} min={1} onChange={handleQuantityChange} /></p>
                    </div>
                    <div className='s_btn mt-5'>
                        <button className='btn' onClick={() => {
                            if (cu._id === undefined) {
                                toast.warning("Login to Buy")
                                move("/login")
                            } else {
                                toast.success("Product Added")
                            }
                        }}
                        >Add to Cart</button>
                    </div>
                </div>

                <div className='col-lg-3 col-sm-12 related'>
                    <p style={{ fontWeight: "700", color: "#1b2950" }}>Related Items</p>
                    <div className='s_box'>
                        {data.filter((item) => item.category === product.category).reverse()
                            .map((product) => (
                                <div className="single_box" key={product.id} onClick={() => move("/single_Add/" + product._id)}>
                                    <div className='' style={{ position: "relative" }}>
                                        <img src={product.images[0]} alt='No Network' className='img-fluid' style={{ width: "100px" }} />
                                        {product.discount && product.discount > 0 ? (
                                            <div className='s_discount'>
                                                {`${product.discount}%`}
                                            </div>
                                        ) : null}
                                    </div>

                                    <div>
                                        <p style={{ fontSize: "12px", fontWeight: "500" }}>{product.title.slice(0, 70)}...</p>
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
                                <p className="text-center" style={{ fontWeight: "700", fontSize: "20px" }}>
                                    {`${comments.filter((item) => item.productId === productId).length} Reviews`}
                                </p>
                            </div>
                        </div>
                    )}

                    {isLoadingComments ? (
                        <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }} >
                            <Loader />
                        </div>
                    ) : comments.filter((item) => item.productId === productId).length === 0 ? (
                        <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }} >
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
                        <h1 style={{ color: "#1b2950", fontWeight: "600" }}>Leave us a comment</h1>
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
