import React, { useState, useEffect } from 'react'
import { BsFillGridFill, BsListStars } from "react-icons/bs"
import { FaArrowAltCircleDown, FaFilter } from "react-icons/fa"
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
            (lowerCaseTitle.includes(lowerCaseSearch) ||
                productCategory.includes(lowerCaseSearch) ||
                productsubCategory.includes(lowerCaseSearch) ||
                productsubCategory.includes(lowerCaseSearch)) &&
            (category === "all" || productCategory.includes(category)) &&
            (subCategory === "all" || productsubCategory.includes(subCategory))
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
                            <p style={{ color: "#1B2950" }}><FaFilter /> Filter</p>
                            <span className='close px-3' onClick={() => setFilter('')}>❌</span>
                        </div>
                        <div id="accordionExample">
                            <div className='p_category'
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseOne"
                                aria-expanded="true"
                                aria-controls="collapseOne"
                                data-bs-parent="#accordionExample"
                            >
                                <p>All Sofas</p> <span><FaArrowAltCircleDown /></span>
                            </div>
                            <div className='accordion-collapse collapse show text-capitalize px-4'
                                id="collapseOne"
                                aria-labelledby="headingOne"
                            >
                                <p onClick={() => setCategory((prevCategory) => "sofa")} className={setCategory === "sofa" ? 'activeCategory' : ''}>All in Sofa</p>
                                <p onClick={() => setSubcategory((prevSubcategory) => "fabric corner sofas")} className={setSubcategory === "fabric corner sofas" ? 'activeCategory' : ''}>fabric corner sofas</p>
                                <p onClick={() => setSubcategory((prevSubcategory) => "fabric recliner sofas")} className={setSubcategory === "fabric recliner sofas" ? 'activeCategory' : ''}>fabric recliner sofas</p>
                                <p onClick={() => setSubcategory((prevSubcategory) => "fabric sofa sets")} className={setSubcategory === "fabric sofa sets" ? 'activeCategory' : ''}>fabric sofa sets</p>
                                <p onClick={() => setSubcategory((prevSubcategory) => "leather recliner corner sofas")} className={setSubcategory === "leather recliner corner sofas" ? 'activeCategory' : ''}>leather recliner corner sofas</p>
                                <p onClick={() => setSubcategory((prevSubcategory) => "leather recliner sofa sets")} className={setSubcategory === "leather recliner sofa sets" ? 'activeCategory' : ''}>leather recliner sofa sets</p>
                            </div>
                            <div className='p_category'
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseTwo"
                                aria-expanded="true"
                                aria-controls="collapseTwo"
                                data-bs-parent="#accordionExample"
                            >
                                <p>All Beds</p> <span><FaArrowAltCircleDown /></span>
                            </div>
                            <div className='accordion-collapse collapse show text-capitalize px-4'
                                id="collapseTwo"
                                aria-labelledby="collapseTwo"
                            >
                                <p onClick={() => setCategory((prevCategory) => "bed")} className={setCategory === "bed" ? 'activeCategory' : ''}>All in Beds</p>
                                <p onClick={() => setSubcategory((prevSubcategory) => "ambassador beds")} className={setSubcategory === "ambassador beds" ? 'activeCategory' : ''}>ambassador beds</p>
                                <p onClick={() => setSubcategory((prevSubcategory) => "bespoke bed")} className={setSubcategory === "bespoke bed" ? 'activeCategory' : ''}>bespoke bed</p>
                                <p onClick={() => setSubcategory((prevSubcategory) => "chesterfield beds")} className={setSubcategory === "chesterfield beds" ? 'activeCategory' : ''}>chesterfield beds</p>
                                <p onClick={() => setSubcategory((prevSubcategory) => "ottoman beds")} className={setSubcategory === "ottoman beds" ? 'activeCategory' : ''}>ottoman beds</p>
                                <p onClick={() => setSubcategory((prevSubcategory) => "panel beds")} className={setSubcategory === "panel beds" ? 'activeCategory' : ''}>panel beds</p>
                                <p onClick={() => setSubcategory((prevSubcategory) => "Wingback bed Frames")} className={setSubcategory === "Wingback bed Frames" ? 'activeCategory' : ''}>Wingback bed Frames</p>
                                <p onClick={() => setSubcategory((prevSubcategory) => "luxury beds")} className={setSubcategory === "luxury beds" ? 'activeCategory' : ''}>luxury beds</p>
                                <p onClick={() => setSubcategory((prevSubcategory) => "wall panel beds frame")} className={setSubcategory === "wall panel beds frame" ? 'activeCategory' : ''}>wall panel beds frame</p>
                            </div>
                            <div className='p_category'
                                data-bs-toggle="collapse"
                                data-bs-target="#collapseThree"
                                aria-expanded="true"
                                aria-controls="collapseThree"
                                data-bs-parent="#accordionExample"
                            >
                                <p>Sort by</p> <span><FaArrowAltCircleDown /></span>
                            </div>
                            <div className='accordion-collapse collapse show text-capitalize px-4'
                                id="collapseThree"
                                aria-labelledby="collapseThree"
                            >
                                <p onClick={() => setSortOrder("")}>All</p>
                                <p onClick={() => setSortOrder("asc")}>Price (Highes)</p>
                                <p onClick={() => setSortOrder("desc")}>Price (Lowest)</p>
                            </div>
                           
                        </div>
                    </div>
                    <div className=''>
                        <button className='btn btn-danger text-uppercase' onClick={ClearFilter}>Clear filter</button>
                    </div>

                    <div>
                        <p style={{ fontWeight: "600" }}>Trending Products</p>
                        {data.filter((item) => item.trending === "true")
                            .map((product) => {
                                return <div className='filter_Card' key={product._id} onClick={() => move("/single_Add/" + product._id)}>
                                    <div>
                                        <img src={product.images[0]} alt="No network" style={{ width: "80px" }} />

                                    </div>
                                    <div className='text-left'>
                                        <p>{product.title}</p>
                                        <span className='px-2 t_Fprice'>{`$${product.Fprice}`}</span>
                                        {product.price &&
                                            <span className='t_price'><s>{`$${product.price}`}</s></span>
                                        }
                                    </div>
                                </div>
                            })

                        }
                    </div>
                    {data.feature === "true" &&
                        <div>
                            <p style={{ fontWeight: "600" }}>Feature Products</p>
                            {data.filter((item) => item.feature === "true")
                                .map((product) => {
                                    return <div className='filter_Card' key={product._id} onClick={() => move("/single_Add/" + product._id)}>
                                        <div>
                                            <img src={product.images[0]} alt="No network" style={{ width: "80px" }} />

                                        </div>
                                        <div className='text-left'>
                                            <p>{product.title}</p>
                                            <span className='px-2 t_Fprice'>{`$${product.Fprice}`}</span>
                                            {product.price &&
                                                <span className='t_price'><s>{`$${product.price}`}</s></span>
                                            }
                                        </div>
                                    </div>
                                })

                            }
                        </div>
                    }
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
                                <button className='btn d-flex align-items-center' style={{ fontWeight: "600" }} role='button' onClick={Filter}><FaFilter /></button>
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
                                            <div className='p_img_box'>
                                                <img src={product.images[0]} alt="No network" />
                                                {product.discount && product.discount > 0 ? (
                                                    <div className='discount'>
                                                        {`${product.discount}%`}
                                                    </div>
                                                ) : null}
                                            </div>
                                            <p className='card_title px-2'>{product.title}</p>
                                            {product.description &&
                                                <p className='p_description px-2'>{product.description}</p>
                                            }
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
                                            <div className='product_card_btns d-flex flex-column align-items-center gap-3 my-4'>
                                                <div>
                                                    <button className='btn p_card_btn1' onClick={() => {
                                                        if (cu._id === undefined) {
                                                            toast.warning("Login to Buy");
                                                            move("/login");
                                                        } else {
                                                            toast.success("Product Added");
                                                        }
                                                    }}>Add To Cart</button>
                                                </div>
                                                <div>
                                                    <a href="https://wa.me/+923067208343">
                                                        <button className='btn p_card_btn2'>Buy Via WhatsApp</button>
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            {filteredProduct.length === 0 &&
                                <div className='col-lg-12 d-flex justify-content-center align-items-center px-4'>
                                    No product available related to this category
                                </div>
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
                                                            <button className='review_btn' onClick={() => {
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

