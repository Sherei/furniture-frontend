import React, { useState, useEffect, useRef } from 'react'
import { BsFillGridFill, BsListStars } from "react-icons/bs"
import { FaArrowAltCircleDown, FaFilter } from "react-icons/fa"
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from "../Loader/Loader"
import axios from 'axios';


import "./products.css"


const Products = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);
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
        axios.get(`${process.env.REACT_APP_BASE_URL}/product`).then((res) => {
            try {
                if (res) {
                    setData(res.data);
                }
            } catch (e) {

            } finally {
                setLoading(false);
            }
        });
    }, [category, subCategory]);

    useEffect(() => {
        setCategory(prodctName?.toLowerCase());
    }, [prodctName]);

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

    const filterRef = useRef(null);


    useEffect(() => {
        function handleClickOutside(event) {
            if (filter && filterRef.current && !filterRef.current.contains(event.target)) {
                setFilter(false);
            }
        }

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [filter]);

    function Filter() {
        setFilter("showFilter")

    }

    const filteredProduct = data.filter((product) => {
        const lowerCaseTitle = product.title.toLowerCase();
        const productCategory = product.category.toLowerCase();
        const productsubCategory = product.subCategory.toLowerCase();
        const lowerCaseSearch = (search).toLowerCase();
        return (
            (lowerCaseTitle?.includes(lowerCaseSearch) ||
                productCategory?.includes(lowerCaseSearch) ||
                productsubCategory?.includes(lowerCaseSearch) ||
                productsubCategory?.includes(lowerCaseSearch)) &&
            (productCategory?.includes(category)) &&
            (productsubCategory?.includes(subCategory))
        );
    });

    return <>
        <div className='container-fluid min-vh-100' style={{ overflow: "hidden" }}>
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
                        <div className="accordion" id="accordionExample">
                            <div className="accordion-item accordian-item1">
                                <div className="accordion-item accordian-item1">
                                    <h2 className="accordion-header custom_header">
                                        <button
                                            className="accordion-button accordian_btn"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseOne"
                                            aria-expanded="true"
                                            aria-controls="collapseOne"
                                        >
                                            <p className='fw-bolder fs-6'>All Sofas</p>
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseOne"
                                        className="accordion-collapse collapse show"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body">
                                            <p onClick={() => setCategory("sofa")} className={setCategory === "sofa" ? 'activeCategory' : ''}>All in sofas</p>
                                            <p onClick={() => setSubcategory("corner-sofas")} className={setSubcategory === "corner-sofas" ? 'activeCategory' : ''}>Corner Sofas</p>
                                            <p onClick={() => setSubcategory("sofa-sofas")} className={setSubcategory === "sofa-sofas" ? 'activeCategory' : ''}>Sofa Sets </p>
                                            <p onClick={() => setSubcategory("two-&-three-seater-sofas")} className={setSubcategory === "two-&-three-seater-sofas" ? 'activeCategory' : ''}>3 & 2 Seater Sofas</p>
                                            <p onClick={() => setSubcategory("fabric-sofas")} className={setSubcategory === "fabric-sofas" ? 'activeCategory' : ''}>Fabric sofas </p>
                                            <p onClick={() => setSubcategory("chesterfield-sofas")} className={setSubcategory === "chesterfield-sofas" ? 'activeCategory' : ''}>Chesterfield Sofas</p>
                                            <p onClick={() => setSubcategory("u-shaped-sofas")} className={setSubcategory === "u-shaped-sofas" ? 'activeCategory' : ''}>U Shaped Sofas</p>
                                            <p onClick={() => setSubcategory("leather-sofas")} className={setSubcategory === "leather-sofas" ? 'activeCategory' : ''}>Leather Sofas</p>
                                            <p onClick={() => setSubcategory("recliner-sofas")} className={setSubcategory === "recliner-sofas" ? 'activeCategory' : ''}>Recliner Sofas</p>
                                            <p onClick={() => setSubcategory("arm-chair-&-swivel-chair")} className={setSubcategory === "arm-chair-&-swivel-chair" ? 'activeCategory' : ''}>Arm Chair & Swivel Chair</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item accordian-item1">
                                <h2 className="accordion-header custom_header">
                                    <button
                                        className="accordion-button accordian_btn"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseTwo"
                                        aria-expanded="true"
                                        aria-controls="collapseTwo"
                                    >
                                        <p className='fw-bolder fs-6'>All Beds</p>
                                    </button>
                                </h2>
                                <div
                                    id="collapseTwo"
                                    className="accordion-collapse collapse show"
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="accordion-body">
                                        <p onClick={() => setCategory("sofa")} className={setCategory === "sofa" ? 'activeCategory' : ''}>All in sofas</p>
                                        <p onClick={() => setSubcategory("corner-sofas")} className={setSubcategory === "corner-sofas" ? 'activeCategory' : ''}>Corner Sofas</p>
                                        <p onClick={() => setSubcategory("sofa-sets")} className={setSubcategory === "sofa-sofas" ? 'activeCategory' : ''}>Sofa Sets </p>
                                        <p onClick={() => setSubcategory("sofa-beds")} className={setSubcategory === "sofa-beds" ? 'activeCategory' : ''}>Sofa & Beds</p>
                                        <p onClick={() => setSubcategory("three-&-two-seater-sofas")} className={setSubcategory === "two-&-three-seater-sofas" ? 'activeCategory' : ''}>3 & 2 Seater Sofas</p>
                                        <p onClick={() => setSubcategory("fabric-sofas")} className={setSubcategory === "fabric-sofas" ? 'activeCategory' : ''}>Fabric sofas </p>
                                        <p onClick={() => setSubcategory("chesterfield-sofas")} className={setSubcategory === "chesterfield-sofas" ? 'activeCategory' : ''}>Chesterfield Sofas</p>
                                        <p onClick={() => setSubcategory("u-shaped-sofas")} className={setSubcategory === "u-shaped-sofas" ? 'activeCategory' : ''}>U Shaped Sofas</p>
                                        <p onClick={() => setSubcategory("leather-sofas")} className={setSubcategory === "leather-sofas" ? 'activeCategory' : ''}>Leather Sofas</p>
                                        <p onClick={() => setSubcategory("recliner-sofas")} className={setSubcategory === "recliner-sofas" ? 'activeCategory' : ''}>Recliner Sofas</p>
                                        <p onClick={() => setSubcategory("arm-chair-&-swivel-chair")} className={setSubcategory === "arm-chair-&-swivel-chair" ? 'activeCategory' : ''}>Arm Chair & Swivel Chair</p>
                                    </div>
                                </div>
                            </div>
                            <button className='btn accordian_btn2' onClick={() => setSubcategory("ottoman-beds")}>Ottoman Box</button> <br />
                            <button className='btn accordian_btn2' onClick={() => setCategory("mattress")}>Mattress</button> <br />
                            <button className='btn accordian_btn2' onClick={() => setCategory("footstools")}>Footstool & Puffs</button>

                            <div className="accordion-item accordian-item1">
                                <h2 className="accordion-header custom_header">
                                    <button
                                        className="accordion-button accordian_btn"
                                        type="button"
                                        data-bs-toggle="collapse"
                                        data-bs-target="#collapseThree"
                                        aria-expanded="true"
                                        aria-controls="collapseThree"
                                    >
                                        <p className='fw-bolder fs-6'>Sort by</p>
                                    </button>
                                </h2>
                                <div
                                    id="collapseThree"
                                    className="accordion-collapse collapse show"
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="accordion-body">
                                        <p onClick={() => setSortOrder("")}>All</p>
                                        <p onClick={() => setSortOrder("asc")}>Price (Highes)</p>
                                        <p onClick={() => setSortOrder("desc")}>Price (Lowest)</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className=''>
                        <button className='btn btn-danger text-uppercase' onClick={ClearFilter}>Clear filter</button>
                    </div>

                    <div>
                        <p style={{ fontWeight: "600" }}>Trending Products</p>
                        {data.filter((item) => item.trending === "true")
                            .map((product, index) => {
                                return <div className='filter_Card' key={index} onClick={() => move("/single_Add/" + product._id)}>

                                    <img src={product.images[0]} alt="No network" style={{ maxWidth: "80px", height: "80px" }} />

                                    <div className='text-left'>
                                        <p>{product.title}</p>
                                        <span className='px-2 t_Fprice'>{`£${product.Fprice.toFixed(0, 2)}`}</span>
                                        {product.price &&
                                            <span className='t_price'><s>{`£${product.price.toFixed(0, 2)}`}</s></span>
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
                                .map((product, index) => {
                                    return <div className='filter_Card' key={index} onClick={() => move("/single_Add/" + product._id)}>
                                        <img src={product.images[0]} alt="No network" style={{ maxWidth: "80px", height: "80px" }} />
                                        <div className='text-left'>
                                            <p>{product.title}</p>
                                            <span className='px-2 t_Fprice'>{`£${product.Fprice.toFixed(0, 2)}`}</span>
                                            {product.price &&
                                                <span className='t_price'><s>{`£${product.price.toFixed(0, 2)}`}</s></span>
                                            }
                                        </div>
                                    </div>
                                })

                            }
                        </div>
                    }
                </div>


                <div className='col-lg-12 col-md-12 col-sm-12'>
                    <div className='row px-4 mb-4'>
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
                            <div className='d-flex align-items-center'>
                                <p className='fw-bolder my-2'>{filteredProduct.length} Products</p>
                            </div>
                            <div className='d-flex align-items-center'>
                                <button className='btn fs-4' role='button' onClick={Filter}><FaFilter /></button>
                            </div>
                        </div>
                    </div>
                    {loading ? (
                        <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }} >
                            <Loader />
                        </div>
                    ) : (
                        <div className="row row-cols-2 row-cols-md-4 row-cols-lg-4 row-cols-sm-2  g-4">
                            {activeGrid === "grid" &&
                                filteredProduct.map((product, index) => (
                                    <div className="col" key={index} >
                                        <div className='product_box'>
                                            <div className='p_img_box' onClick={() => move("/single_Add/" + product._id)}>
                                                <img src={product.images[0]} alt="No network" />
                                                {product.discount && product.discount > 0 ? (
                                                    <div className='discount'>
                                                        {`${product.discount}%`}
                                                    </div>
                                                ) : null}
                                                <div className='overlay'>
                                                    {product.images[1] &&
                                                        <img src={product.images[1]} alt="" />
                                                    }
                                                </div>
                                            </div>
                                            <p className='card_title px-2'>{product.title}</p>
                                            {product.description &&
                                                <p className='p_description px-2'>{product.description}</p>
                                            }
                                            <div className='text-left'>
                                                {product.discount && product.discount > 0 ? (
                                                    <>
                                                        <span className='card_Fprice px-2 '> {`£${product.Fprice.toFixed(1)}`}</span>
                                                        <span className='card_price'><s>{`£${product.price.toFixed(1)}`}</s></span>
                                                    </>
                                                ) : (
                                                    <span className='card_Fprice px-2 '> {`£${product.Fprice.toFixed(2)}`}</span>
                                                )}
                                            </div>
                                            <div className='product_btns'>
                                                <button className='btn p_detail_btn' onClick={() => move("/single_Add/" + product._id)}>
                                                    View Detail
                                                </button>
                                                <a href='https://wa.me/+923067208343' target="blank">
                                                    <button className='btn p_whatsapp_btn'>Buy Via WhatsApp</button>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            }
                            {filteredProduct.length === 0 &&
                                <div className='col-12 d-flex justify-content-center align-items-center flex-wrap px-4'>
                                    <p className='text-center'>No product available related to this category</p>
                                </div>
                            }
                        </div>
                    )}

                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-sm-1 g-4 my-3">
                        {activeGrid === "list" &&
                            filteredProduct.map((product, index) => {
                                return <>
                                    <div className="col d-flex grid_box_main" key={index} onClick={() => move("/single_Add/" + product._id)} style={{ overflow: "hidden" }}>
                                        <div style={{ width: "40%" }}>
                                            <div className='p_img_box_grid'>
                                                <img src={product.images[0]} alt="No network" />
                                                {product.discount && product.discount > 0 ? (
                                                    <div className='discount'>
                                                        {`${product.discount}%`}
                                                    </div>
                                                ) : null}
                                                <div className='overlay'>
                                                    {product.images[1] &&
                                                        <img src={product.images[1]} alt="" />
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                        <div className='d-flex flex-column justify-content-between gap-3' style={{ width: "60%" }}>
                                            <div>
                                                <p className='card_title px-2'>{product.title}</p>
                                                {product.description &&
                                                    <p className='p_description px-2'>{product.description}</p>
                                                }
                                            </div>
                                            <div className='text-left'>
                                                {product.discount && product.discount > 0 ? (
                                                    <>
                                                        <span className='card_Fprice px-2 '> {`£${product.Fprice.toFixed(1)}`}</span>
                                                        <span className='card_price'><s>{`£${product.price.toFixed(1)}`}</s></span>
                                                    </>
                                                ) : (
                                                    <span className='card_Fprice px-2 '> {`£${product.Fprice.toFixed(2)}`}</span>
                                                )}
                                            </div>
                                            <div className='text-center'>
                                                <button className='btn review_btn btn-outline-primary fs-10'>View Detail</button>
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

