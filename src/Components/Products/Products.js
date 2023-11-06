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
    const [category, setCategory] = useState("");
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
    }, []);



    const SearchInput = (e) => {
        setSearch(e.target.value)
    }

    function ClearFilter() {
        setCategory("")
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

    useEffect(() => {
       
            setCategory(prodctName?.toLowerCase());
       
    }, [prodctName]);

    const filterProduct = data.filter((product) => {
        const Lsearch = (search ?? "").toLowerCase();
        const Lcategory = (category ?? "").toLowerCase();
        const LproductName = (prodctName ?? "").toLowerCase();

        const LsearchMatch = Lcategory.includes(Lsearch) ||
            product?.category?.toLowerCase().includes(Lsearch) ||
            product?.title?.toLowerCase().includes(Lsearch);

        const categoryMatches = LproductName === "all" ? true
            : product?.category?.toLowerCase() === category || product?.subCategory?.toLowerCase() === category || category === "all"; // Include all categories when "all" is selected

        const productNameMatches = LproductName === "all" || (
            product?.category?.toLowerCase().includes(Lcategory) ||
            product?.subCategory?.toLowerCase().includes(Lcategory)
        );

        return productNameMatches && categoryMatches && LsearchMatch;
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
                                            <p className='fw-bolder fs-6 pt-2'>All Sofas</p>
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseOne"
                                        className="accordion-collapse collapse show"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body">
                                            <p onClick={() => setCategory("sofa")} className={setCategory === "sofa" ? 'activeCategory' : ''}>All in sofas</p>
                                            <p onClick={() => setCategory("corner-sofas")} className={setCategory === "corner-sofas" ? 'activeCategory' : ''}>Corner Sofas</p>
                                            <p onClick={() => setCategory("sofa-sets")} className={setCategory === "sofa-sets" ? 'activeCategory' : ''}>Sofa Sets </p>
                                            <p onClick={() => setCategory("sofa-beds")} className={setCategory === "sofa-beds" ? 'activeCategory' : ''}>Sofa Beds</p>
                                            <p onClick={() => setCategory("three-&-two-seater-sofas")} className={setCategory === "three-&-two-seater-sofas" ? 'activeCategory' : ''}>3 & 2 Seater Sofas</p>
                                            <p onClick={() => setCategory("fabric-sofas")} className={setCategory === "fabric-sofas" ? 'activeCategory' : ''}>Fabric sofas </p>
                                            <p onClick={() => setCategory("chesterfield-sofas")} className={setCategory === "chesterfield-sofas" ? 'activeCategory' : ''}>Chesterfield Sofas</p>
                                            <p onClick={() => setCategory("u-shaped-sofas")} className={setCategory === "u-shaped-sofas" ? 'activeCategory' : ''}>U Shaped Sofas</p>
                                            <p onClick={() => setCategory("leather-sofas")} className={setCategory === "leather-sofas" ? 'activeCategory' : ''}>Leather Sofas</p>
                                            <p onClick={() => setCategory("recliner-sofas")} className={setCategory === "recliner-sofas" ? 'activeCategory' : ''}>Recliner Sofas</p>
                                            <p onClick={() => setCategory("arm-chair-&-swivel-chair")} className={setCategory === "arm-chair-&-swivel-chair" ? 'activeCategory' : ''}>Arm Chair & Swivel Chair</p>
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
                                        <p className='fw-bolder fs-6 pt-2'>All Beds</p>
                                    </button>
                                </h2>
                                <div
                                    id="collapseTwo"
                                    className="accordion-collapse collapse show"
                                    data-bs-parent="#accordionExample"
                                >
                                    <div className="accordion-body">
                                        <p onClick={() => setCategory("bed")} className={setCategory === "bed" ? 'activeCategory' : ''}>All in Beds</p>
                                        <p onClick={() => setCategory("ambassador-beds")} className={setCategory === "ambassador-beds" ? 'activeCategory' : ''}>Ambassador Beds </p>
                                        <p onClick={() => setCategory("panel-bed")} className={setCategory === "panel-bed" ? 'activeCategory' : ''}>Panel Beds</p>
                                        <p onClick={() => setCategory("wingback-beds-frames")} className={setCategory === "wingback-beds-frames" ? 'activeCategory' : ''}>Wingback bed Frames</p>
                                        <p onClick={() => setCategory("ottoman-beds")} className={setCategory === "ottoman-beds" ? 'activeCategory' : ''}>Ottoman Beds </p>
                                        <p onClick={() => setCategory("bespoke-beds")} className={setCategory === "bespoke-beds" ? 'activeCategory' : ''}>Bespoke Beds</p>
                                        <p onClick={() => setCategory("chesterfield-beds")} className={setCategory === "chesterfield-beds" ? 'activeCategory' : ''}>Chesterfield Beds</p>
                                        <p onClick={() => setCategory("divan-beds")} className={setCategory === "divan-beds" ? 'activeCategory' : ''}>Divan Beds</p>
                                    </div>
                                </div>
                            </div>
                            <button className='btn accordian_btn2' onClick={() => setCategory("ottoman-beds")}>Ottoman Box</button> <br />

                            <button className='btn accordian_btn2' onClick={() => setCategory("mattress")}>Mattress</button> <br />

                            <button className='btn accordian_btn2' onClick={() => setCategory("footstools")}>Footstool</button>

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
                                <p className='fw-bolder my-2'>{filterProduct.length} Products</p>
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
                                filterProduct?.map((product, index) => (
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
                                                        <span className='card_Fprice px-2 '> {`£${product.Fprice?.toFixed(1)}`}</span>
                                                        <span className='card_price'><s>{`£${product.price?.toFixed(1)}`}</s></span>
                                                    </>
                                                ) : (
                                                    <span className='card_Fprice px-2 '> {`£${product.Fprice?.toFixed(2)}`}</span>
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
                            {filterProduct.length === 0 &&
                                <div className='col-12 d-flex justify-content-center align-items-center flex-wrap px-4'>
                                    <p className='text-center'>No product available related to this category</p>
                                </div>
                            }
                        </div>
                    )}

                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-sm-1 g-4 my-3">
                        {activeGrid === "list" &&
                            filterProduct?.map((product, index) => {
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
                                                        <span className='card_Fprice px-2 '> {`£${product.Fprice?.toFixed(1)}`}</span>
                                                        <span className='card_price'><s>{`£${product.price?.toFixed(1)}`}</s></span>
                                                    </>
                                                ) : (
                                                    <span className='card_Fprice px-2 '> {`£${product.Fprice?.toFixed(2)}`}</span>
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

