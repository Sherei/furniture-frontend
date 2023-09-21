import React, { useState, useEffect } from 'react'
import { BsFillGridFill, BsListStars } from "react-icons/bs"
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from "../Loader/Loader"
import axios from 'axios';


import "./products.css"


const Products = () => {


    const cu = useSelector(store => store.userSection.cu)
    const { prodctName } = useParams()
    const [data, setData] = useState([]);
    const [search, setSearch] = useState("")
    const [activeGrid, setActiveGrid] = useState("grid")
    const [sort, setSortOrder] = useState("")
    const [category, setCategory] = useState(prodctName.toLowerCase());
    const [subCategory, setSubcategory] = useState("all")
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('')

    const move = useNavigate()
    useEffect(() => {
        setLoading(true);
        console.log("process.env.REACT_APP_BASE_URL::", process.env.REACT_APP_BASE_URL)
        axios.get(`${process.env.REACT_APP_BASE_URL}/product`).then((res) => {
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

    const SearchInput = (e) => {
        setSearch(e.target.value)
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

    function Filter() {
        setFilter("showFilter")
        console.log("filter")

    }

    const filteredProduct = data.filter((product) => {
        const lowerCaseTitle = product.title.toLowerCase();
        const productCategory = product.category.toLowerCase();
        const productsubCategory = product.subCategory.toLowerCase();
        const lowerCaseSearch = (search).toLowerCase();
        return (
            (lowerCaseTitle.includes(lowerCaseSearch)) &&
            (category === "all" || category === productCategory) &&
            (subCategory === "all" || subCategory === productsubCategory)
        );
    });

    return <>
        <div className='container-fluid min-vh-100' style={{ overflow: "hidden", position: "relative" }}>
            <div className='row mt-5'>
                <div className='col d-flex justify-content-center'>
                    <input
                        type="search"
                        className='search_bar form-control'
                        placeholder="Search Anything"
                        value={search}
                        onChange={(SearchInput)}
                    />
                </div>
            </div>
            <div className='row my-5'>
                <div className={`${filter ? 'showFilter' : 'filter_col'}`}>
                    <div className='categories'>
                        <div className='d-flex justify-content-between'>
                            <p style={{ color: "white" }}>Categories</p>
                            <span className='close px-3' onClick={()=>setFilter('')}>❌</span>
                        </div>

                        <select className="form-control mb-2 mr-sm-2 py-2" onChange={(e) => {
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
                    {category === "bed" &&

                        <div className='categories'>
                            <p style={{ color: "white" }}>Sub Categories</p>
                            <div>
                                <select className="form-control mb-2 mr-sm-2 py-2" onChange={(e) => {
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
                            <p style={{ color: "white" }}>Sub Categories</p>
                            <div>
                                <select className="form-control mb-2 mr-sm-2 py-2" onChange={(e) => {
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
                        <p style={{ color: "white" }}>Sort by</p>

                        <select className='form-control w-100 mb-2 mr-sm-2' onChange={(e) => { setSortOrder(e.target.value) }} style={{
                            border: "none", border: "1px solid #dddfe0",
                            outline: "none"
                        }}>
                            <option value="">All</option>
                            <option value="asc">Price (Highes)</option>
                            <option value="desc">Price (Lowest)</option>
                        </select>
                    </div>
                    <div className=''>
                        <button className='btn btn-danger text-uppercase' onClick={ClearFilter}>Clear filter</button>
                    </div>

                </div>


                <div className='col-lg-12 col-md-12 col-sm-12'>
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
                                <p style={{ fontWeight: "600" }} onClick={Filter}>Filter</p>
                            </div>
                        </div>
                    </div>
                    {loading ? (
                        <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }} >
                            <Loader />
                        </div>
                    ) : (
                        <div className="row row-cols-1 row-cols-md-4 row-cols-lg-4 row-cols-sm-2  g-4">
                            {activeGrid === "grid" &&
                                filteredProduct.map((product) => (
                                    <div className="col" key={product.id}>
                                        <div className='product_box'>
                                            <button className='btn p_card_btn1' onClick={() => {
                                                if (cu._id === undefined) {
                                                    toast.warning("Login to Buy");
                                                    move("/login");
                                                } else {
                                                    toast.success("Product Added");
                                                }
                                            }}>Add To Cart</button>
                                            <a href="https://wa.me/+923067208343">
                                                <button className='btn p_card_btn2'>Buy Via WhatsApp</button>
                                            </a>
                                            <div className='p_img_box'>
                                                <img src={product.images[0]} alt="No network" />
                                                {product.discount && product.discount > 0 ? (
                                                    <div className='discount'>
                                                        {`${product.discount}%`}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <p className='card_title px-2'>{product.title}</p>
                                            <p className='p_description px-2'>{product.description}</p>
                                            <div className='text-left'>
                                                {product.discount && product.discount > 0 ? (
                                                    <>
                                                        <span className='card_Fprice px-2 '> {`$${product.Fprice.toFixed(1)}`}</span>
                                                        <span className='card_price'><s>{`$${product.price.toFixed(1)}`}</s></span>
                                                    </>
                                                ) : (
                                                    <span className='card_Fprice px-2 '> {`$${product.Fprice.toFixed(2)}`}</span>
                                                )}
                                            </div>
                                            <div className='product_card_btns my-3'>

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
        </div >
    </>

}

export default Products

