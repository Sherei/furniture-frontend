import React, { useState, useEffect } from 'react'
import { BsFillGridFill, BsListStars, BsFillFunnelFill } from "react-icons/bs"
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import { BsFillMicFill } from "react-icons/bs";
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import { Bars } from 'react-loader-spinner'
import "./products.css"


const Products = () => {


    let cu = useSelector(store => store.userSection.cu)
    let { prodctName } = useParams()
    let [data, setData] = useState([]);
    let [search, setSearch] = useState("")
    let [activeGrid, setActiveGrid] = useState("grid")
    let [sort, setSortOrder] = useState("")
    let [category, setCategory] = useState(prodctName.toLowerCase());
    let [subCategory, setSubcategory] = useState("all")
    let [loading, setLoading] = useState(true);

    let move = useNavigate()
    useEffect(() => {
        setLoading(true);
        axios.get('https://my-furniture-tau.vercel.app//product').then((res) => {
            try {
                if (res) {
                    setData(res.data)
                }
            } catch (e) {

            } finally {
                setLoading(false);
            }
        })
    }, [category])

    let SearchInput = (e) => {
        setSearch(e.target.value || transcript || (e.target.value && transcript))
        resetTranscript()
    }

    let {
        transcript,
        listening,
        resetTranscript,
        browserSupportsSpeechRecognition
    } = useSpeechRecognition();

    let Startlistening = () => {
        SpeechRecognition.startListening()
    }

    function ClearFilter() {
        setCategory("all")
        setSubcategory("all")
        setSortOrder("")
        setActiveGrid("grid")
    }

    if (sort === "asc") {
        data.sort((a, b) => parseInt(b.price) - parseInt(a.price));
    } else if (sort === "desc") {
        data.sort((a, b) => parseInt(a.price) - parseInt(b.price));
    } else {
        data.sort().reverse()
    }
    if (!browserSupportsSpeechRecognition) {
        return <h1>Your Browser doesn't Support Speech Recognition.</h1>;
    }

    const filteredProduct = data.filter((product) => {
        let lowerCaseTitle = product.title.toLowerCase();
        let productCategory = product.category.toLowerCase();
        let productsubCategory = product.subCategory.toLowerCase();
        let lowerCaseSearch = (search || transcript).toLowerCase();
        return (
            (lowerCaseTitle.includes(lowerCaseSearch)) &&
            (category === "all" || category === productCategory) &&
            (subCategory === "all" || subCategory === productsubCategory)
        );
    });

    return <>
        <div className='container-fluid min-vh-100' style={{ overflow: "hidden" }}>
            <div className='row my-5'>

                <div className='col-lg-12 col-sm-12 px-2 main-col1'>
                    <div className='row mb-5'>
                        <div className='col-lg-12 col-sm-12 product'>
                            <div className='position-relative'>
                                <input
                                    type="search"
                                    className="w-100 form-control mb-2 mr-sm-2"
                                    placeholder="Search Anything"
                                    value={search || transcript}
                                    onChange={(SearchInput)}
                                />
                                <span>
                                    <button className="mic_hover" onClick={(Startlistening)}>  <BsFillMicFill /></button>
                                </span>
                            </div>

                            <div className='categories'>
                                <div className='options'>
                                    <select className="form-control mb-2 mr-sm-2" onChange={(e) => {
                                        setCategory(e.target.value.toLowerCase())
                                    }}>
                                        <option value="all">Select Category</option>
                                        <option value="bed">Beds</option>
                                        <option value="sofa">Sofas</option>
                                        <option value="wardrobes">Wardrobes</option>
                                        <option value="dinning">Dinning Tables</option>
                                        <option value="coffee">Coffee Tables</option>
                                    </select>
                                </div>
                            </div>
                            {category === "bed" &&

                                <div className='categories'>
                                    <div>
                                        <select className="form-control mb-2 mr-sm-2" onChange={(e) => {
                                            setSubcategory(e.target.value.toLowerCase())
                                        }}>
                                            <option value="all">Select subCategory</option>
                                            <option value="ambassador beds">Ambassador Beds</option>
                                            <option value="bespoke bed">Bespoke Beds</option>
                                            <option value="chesterfield beds">Chesterfield Beds</option>
                                            <option value="ottoman beds">Ottoman Beds</option>
                                            <option value="panel beds">Panel Beds</option>
                                            <option value="Wingback bed Frames">Wingback bed Frames</option>
                                            <option value="luxury beds">Luxuy Beds</option>
                                            <option value="wall panel beds frame">Wall Panel Beds Frame</option>
                                        </select>
                                    </div>
                                </div>
                            }
                            {category === "sofa" &&
                                <div className='categories'>
                                    <div>
                                        <select className="form-control mb-2 mr-sm-2" onChange={(e) => {
                                            setSubcategory(e.target.value.toLowerCase())
                                        }}>
                                            <option value="select subCategory">Select subCategory</option>
                                            <option value="fabric corner sofas">fabric corner sofas</option>
                                            <option value="fabric recliner sofas">fabric recliner sofas</option>
                                            <option value="fabric sofa sets">fabric sofa sets</option>
                                            <option value="leather recliner corner sofas">leather recliner corner sofas</option>
                                            <option value="leather recliner sofas">leather recliner sofas</option>
                                            <option value="leather recliner sofa sets">leather recliner sofa sets</option>
                                        </select>
                                    </div>
                                </div>
                            }
                            <div className=''>
                                <button className='btn btn-danger text-uppercase' onClick={ClearFilter}>Clear filter</button>
                            </div>

                        </div>
                    </div>
                </div>

                {/* //////////////////////////////////////////////////////////////////////////// */}

                <div className='col-lg-12  min-vh-100 main_col'>
                    <div className='row p_row_display'>
                        <div className='col-lg-2 col-md-12 col-sm-12 pt-5'>
                            <p style={{ fontWeight: "700", color: "red" }}>Discounted Items</p>
                            <div className='s_box'>
                                {data.filter((item) => item.discount > 0).reverse()
                                    .map((product) => (
                                        <div className="single_box" key={product.id} onClick={() => move("/single_Add/" + product._id)}>
                                            <div className='' style={{ position: "relative" }}>
                                                <img src={product.images[0]} alt='No Network' style={{ width: "100px" }} />
                                                {product.discount && product.discount > 0 ? (
                                                    <div className='s_discount'>
                                                        {`${product.discount}%`}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <div>
                                                <p style={{ fontSize: "12px", fontWeight: "500" }}>{product.title.slice(0, 70)}...</p>
                                                <p style={{ fontSize: "12px", fontWeight: "500" }}>{`$ ${product.Fprice}`}</p>
                                            </div>
                                        </div>
                                    ))}
                            </div>

                        </div>
                        <div className='col-lg-10 col-sm-12'>
                            <div className='row d-flex justify-content-between pb-5 px-4'>
                                <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-between'>
                                    <div className='d-flex align-items-center gap-1'>
                                        <div
                                            className={`grid_icon ${activeGrid === "grid" ? "active" : ""}`}
                                            onClick={() => setActiveGrid("grid")}
                                        >
                                            <BsFillGridFill />
                                        </div>
                                        <div
                                            className={`grid_icon ${activeGrid === "list" ? "active" : ""}`}
                                            onClick={() => setActiveGrid("list")}
                                        >
                                            <BsListStars />
                                        </div>
                                    </div>
                                    <div className=''>
                                        <p style={{ fontWeight: "600" }}>{filteredProduct.length} Products</p>
                                    </div>
                                    <div className=''>
                                        <select className='form-control mb-2 mr-sm-2' onChange={(e) => { setSortOrder(e.target.value) }} style={{
                                            border: "none", border: "1px solid #dddfe0",
                                            outline: "none", width: "fit-content"
                                        }}>
                                            <option value="">All</option>
                                            <option value="asc">Price (Highes)</option>
                                            <option value="desc">Price (Lowest)</option>
                                        </select>
                                    </div>
                                </div>
                            </div>
                            {loading ? (
                                <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }} >
                                    <Bars
                                        height="50"
                                        width="80"
                                        color="#1b2950"
                                        ariaLabel="bars-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                        visible={true}
                                    />
                                </div>
                            ) : (
                                <div className="row row-cols-1 row-cols-md-3 row-cols-sm-2 row-cols-1 g-4">
                                    {activeGrid === "grid" &&
                                        filteredProduct.map((product) => (
                                            <div className="col" key={product.id}>
                                                <div className="card">
                                                    <img
                                                        src={product.images[0]}
                                                        className="card-img-top"
                                                        alt="Product"
                                                    />
                                                    {product.discount && product.discount > 0 ? (
                                                        <div className='discount'>
                                                            {`${product.discount}%`}
                                                        </div>
                                                    ) : null}
                                                    <div className="card-body">
                                                        <h5 className="card-title p_title">{product.title}</h5>
                                                        {product.description && (
                                                            <p className="card-text text-center p_display">
                                                                {product.description.slice(0, 90)}...
                                                            </p>
                                                        )}
                                                        <div className='d-flex flex-wrap'>
                                                            <p className='px-1'><b>Price :</b></p>
                                                            {product.discount && product.discount > 0 ? (
                                                                <>
                                                                    <span className='card_Fprice'>{`${product.Fprice.toFixed(2)}$`}</span>
                                                                    <span><s>{`${product.price.toFixed(2)}$`}</s></span>
                                                                </>
                                                            ) : (
                                                                <span className='card_Fprice'>{`${product.Fprice.toFixed(2)}$`}</span>
                                                            )}

                                                        </div>
                                                        <div className='d-flex justify-content-center'>
                                                            <a>
                                                                <button className='order_btn' onClick={() => {
                                                                    if (cu._id === undefined) {
                                                                        toast.warning("Login to Buy")
                                                                        move("/login")
                                                                    } else {
                                                                        toast.success("Product Added")
                                                                    }
                                                                }}>Add To Cart</button>
                                                            </a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            )}


                            <div className="row justify-content-center">
                                {activeGrid === "list" && 
                                filteredProduct.map((product) => {
                                    return <>
                                        <div className="col-md-6 col-xl-6 mb-4">
                                            <div className="card shadow-0 border rounded-3">
                                                <div className="card-body">
                                                    <div className="row">
                                                        <div className="col-md-3 col-lg-3 col-xl-3 col-sm-3 cols-3 mb-3 mb-lg-0">
                                                            <div className="bg-image hover-zoom ripple rounded ripple-surface">
                                                                <img
                                                                    src={product.images[0]}
                                                                    className="w-100"
                                                                />
                                                                {product.discount && product.discount > 0 ? (
                                                                    <div className='discount'>
                                                                        {`${product.discount}%`}
                                                                    </div>
                                                                ) : null}
                                                                <a href="#!">
                                                                    <div className="hover-overlay">
                                                                        <div
                                                                            className="mask"
                                                                            style={{ backgroundColor: "rgba(253, 253, 253, 0.15)" }}
                                                                        />
                                                                    </div>
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div className="col-md-9 col-lg-9 col-xl-9 col-sm-9 cols-9">
                                                            <h5 className="card-title p_title">{product.title}</h5>
                                                            {product.description &&
                                                                <p className="card-text text-center p_display">
                                                                    {product.description.slice(0, 90)}...
                                                                </p>
                                                            }
                                                            <div className='d-flex flex-wrap'>
                                                                <p className='px-1'><b>Price :</b></p>
                                                                {product.discount && product.discount > 0 ? (
                                                                    <>
                                                                        <span className='card_Fprice'>{`${product.Fprice.toFixed(2)}$`}</span>
                                                                        <span><s>{`${product.price.toFixed(2)}$`}</s></span>
                                                                    </>
                                                                ) : (
                                                                    <span className='card_Fprice'>{`${product.Fprice.toFixed(2)}$`}</span>
                                                                )}

                                                            </div>
                                                            <a>
                                                                <button className='order_btn' onClick={() => {
                                                                    if (cu._id === undefined) {
                                                                        toast.warning("Login to Buy")
                                                                        move("/login")
                                                                    } else {
                                                                        toast.success("Product Added")
                                                                    }
                                                                }}>Add To Cart</button>
                                                            </a>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                    </>
                                })}
                            </div>

                        </div>
                    </div>

                    {/* ///////////////////////////////////////////////////////////////////////////////////////////////////// */}




                    {/* //////////////////////////////////////////////////// */}.






                </div>
            </div>

        </div >
    </>

}

export default Products

