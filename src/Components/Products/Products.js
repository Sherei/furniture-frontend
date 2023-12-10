import React, { useState, useEffect, useRef } from "react";
import { BsFillGridFill, BsListStars } from "react-icons/bs";
import { FaFilter } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import axios from "axios";
import "./products.css";

const Products = () => {
  const cu = useSelector((store) => store.userSection.cu);
  const { prodctName } = useParams();

  useEffect(() => {
    window.scrollTo({
      top: 0,
    });
  }, [prodctName]);

  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");
  const [activeGrid, setActiveGrid] = useState("grid");
  const [sort, setSortOrder] = useState("");
  const [category, setCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [filter, setFilter] = useState(false);
  const [filterProduct, setfilterProduct] = useState([]);
  const move = useNavigate();

  const Filter = () => {
    setFilter(!filter);
  };

  useEffect(() => {
   setLoading(true);
    try {
      axios.get(`${process.env.REACT_APP_BASE_URL}/product`).then((res) => {
       setData(res?.data);
      }).finally(() => {
        setLoading(false);
      });
    } catch (e) {
      return (
        <>
          <div
            className="col-lg-12 col-sm-12 d-flex align-items-center justify-content-center"
            style={{ height: "50vh" }}
          >
            <Loader />
          </div>
        </>
      );
    }
  }, []);

  const handleMinRangeChange = (e) => {
    const value = parseInt(e.target.value);
    setMinPrice(value);
  };

  const handleMaxRangeChange = (e) => {
    const value = parseInt(e.target.value);
    setMaxPrice(value);
  };

  const SearchInput = (e) => {
    setSearch(e.target.value);
  };

  function ClearFilter() {
    setCategory("");
    setSortOrder("");
    setActiveGrid("grid");
  }

  useEffect(() => {
    let alldata = [...data];
    if (sort === "asc") {
      alldata.sort((a, b) => parseInt(b.price) - parseInt(a.price));
    } else if (sort === "desc") {
      alldata.sort((a, b) => parseInt(a.price) - parseInt(b.price));
    } else {
      alldata.sort().reverse();
    }
    setData(alldata);
  }, [sort]);

  useEffect(() => {
    setCategory(prodctName?.toLowerCase());
  }, [prodctName]);

  useEffect(() => {
    setLoading(true)
    try {
      let arr = data?.filter((product) => {
        const Lsearch = (search ?? "").toLowerCase();
        const Lcategory = (category ?? "").toLowerCase();
        const LproductName = (prodctName ?? "").toLowerCase();

        const priceInRange =
          parseInt(product.price) >= minPrice &&
          parseInt(product.price) <= maxPrice;

        const LsearchMatch =
          Lcategory.includes(Lsearch) ||
          product?.category?.toLowerCase().includes(Lsearch) ||
          product?.title?.toLowerCase().includes(Lsearch);

        const categoryMatches =
          LproductName === "all"
            ? true
            : product?.category?.toLowerCase() === category ||
            product?.subCategory?.toLowerCase() === category ||
            category === "all";

        const productNameMatches =
          LproductName === "all" ||
          product?.category?.toLowerCase().includes(Lcategory) ||
          product?.subCategory?.toLowerCase().includes(Lcategory);

        return (
          productNameMatches && categoryMatches && LsearchMatch && priceInRange
        );
      });
      setfilterProduct(arr);
    } catch (e) {
    } finally {
      setLoading(false)
    }

  }, [data, search, category, minPrice, maxPrice, sort]);

  return (
    <>
      <div
        className="container-fluid min-vh-100"
        style={{ overflow: "hidden" }}
      >
        <div className="row mt-5">
          <div className="col d-flex justify-content-center">
            <input
              type="search"
              className="search_bar form-control"
              placeholder="Search Anything"
              value={search}
              onChange={SearchInput}
            />
          </div>
        </div>
        <div className="row my-5">
          <div className={`${filter ? "showFilter" : "filter_col"}`}>
            <div className="categories">
              <div className="d-flex justify-content-between">
                <p className="fs-5" style={{ color: "#1B2950" }}>
                  <FaFilter /> Filter
                </p>
                <span
                  className="close px-3 fs-5"
                  onClick={() => setFilter(false)}
                >
                  ❌
                </span>
              </div>
              <div className="" id="accordionExample">
                <div className="accordion-item accordian-item1">
                  <h2 className="accordion-header custom_header">
                    <button
                      className="accordion-button accordian_btn"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="false"
                      aria-controls="collapseOne"
                    >
                      <p className="fs-6 pt-2">All Sofas</p>
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <p
                        onClick={() => setCategory("sofa")}
                        className={
                          setCategory === "sofa" ? "activeCategory" : ""
                        }
                      >
                        All in sofas
                      </p>
                      <p
                        onClick={() => setCategory("corner-sofas")}
                        className={
                          setCategory === "corner-sofas" ? "activeCategory" : ""
                        }
                      >
                        Corner Sofas
                      </p>
                      <p
                        onClick={() => setCategory("sofa-sets")}
                        className={
                          setCategory === "sofa-sets" ? "activeCategory" : ""
                        }
                      >
                        Sofa Sets{" "}
                      </p>
                      <p
                        onClick={() => setCategory("sofa-beds")}
                        className={
                          setCategory === "sofa-beds" ? "activeCategory" : ""
                        }
                      >
                        Sofa Beds
                      </p>
                      <p
                        onClick={() => setCategory("three-&-two-seater-sofas")}
                        className={
                          setCategory === "three-&-two-seater-sofas"
                            ? "activeCategory"
                            : ""
                        }
                      >
                        3 & 2 Seater Sofas
                      </p>
                      {/* <p onClick={() => setCategory("fabric-sofas")} className={setCategory === "fabric-sofas" ? 'activeCategory' : ''}>Fabric sofas </p>
                                        <p onClick={() => setCategory("chesterfield-sofas")} className={setCategory === "chesterfield-sofas" ? 'activeCategory' : ''}>Chesterfield Sofas</p> */}
                      <p
                        onClick={() => setCategory("u-shaped-sofas")}
                        className={
                          setCategory === "u-shaped-sofas"
                            ? "activeCategory"
                            : ""
                        }
                      >
                        U Shaped Sofas
                      </p>
                      <p
                        onClick={() => setCategory("leather-sofas")}
                        className={
                          setCategory === "leather-sofas"
                            ? "activeCategory"
                            : ""
                        }
                      >
                        Leather Sofas
                      </p>
                      <p
                        onClick={() => setCategory("recliner-sofas")}
                        className={
                          setCategory === "recliner-sofas"
                            ? "activeCategory"
                            : ""
                        }
                      >
                        Recliner Sofas
                      </p>
                      {/* <p onClick={() => setCategory("arm-chair-&-swivel-chair")} className={setCategory === "arm-chair-&-swivel-chair" ? 'activeCategory' : ''}>Arm Chair & Swivel Chair</p> */}
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
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      <p className="fs-6 pt-2">All Beds</p>
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <p
                        onClick={() => setCategory("bed")}
                        className={
                          setCategory === "bed" ? "activeCategory" : ""
                        }
                      >
                        All in Beds
                      </p>
                      <p
                        onClick={() => setCategory("ambassador-beds")}
                        className={
                          setCategory === "ambassador-beds"
                            ? "activeCategory"
                            : ""
                        }
                      >
                        Ambassador Beds{" "}
                      </p>
                      <p
                        onClick={() => setCategory("panel-bed")}
                        className={
                          setCategory === "panel-bed" ? "activeCategory" : ""
                        }
                      >
                        Panel Beds
                      </p>
                      <p
                        onClick={() => setCategory("wingback-beds-frames")}
                        className={
                          setCategory === "wingback-beds-frames"
                            ? "activeCategory"
                            : ""
                        }
                      >
                        Wingback Beds
                      </p>
                      {/* <p onClick={() => setCategory("ottoman-beds")} className={setCategory === "ottoman-beds" ? 'activeCategory' : ''}>Ottoman Beds </p> */}
                      <p
                        onClick={() => setCategory("bespoke-beds")}
                        className={
                          setCategory === "bespoke-beds" ? "activeCategory" : ""
                        }
                      >
                        Bespoke Beds
                      </p>
                      <p
                        onClick={() => setCategory("chesterfield-beds")}
                        className={
                          setCategory === "chesterfield-beds"
                            ? "activeCategory"
                            : ""
                        }
                      >
                        Chesterfield Beds
                      </p>
                      <p
                        onClick={() => setCategory("divan-beds")}
                        className={
                          setCategory === "divan-beds" ? "activeCategory" : ""
                        }
                      >
                        Divan Beds
                      </p>
                    </div>
                  </div>
                </div>
                {prodctName === "ottoman-box" && (
                  <>
                    <button
                      className="btn accordian_btn2"
                      onClick={() => setCategory("ottoman-beds")}
                    >
                      Ottoman Box
                    </button>{" "}
                    <br />
                  </>
                )}
                <button
                  className="btn accordian_btn2"
                  onClick={() => setCategory("mattress")}
                >
                  Mattress
                </button>{" "}
                <br />
                <button
                  className="btn accordian_btn2"
                  onClick={() => setCategory("footstools")}
                >
                  Footstool
                </button>
                <div className="accordion-item accordian-item1">
                  <h2 className="accordion-header custom_header">
                    <button
                      className="accordion-button accordian_btn"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      <p className="fs-6 pt-2">Sort by</p>
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <p onClick={() => setSortOrder("")}>All</p>
                      <p onClick={() => setSortOrder("asc")}>Price (Highes)</p>
                      <p onClick={() => setSortOrder("desc")}>Price (Lowest)</p>
                    </div>
                  </div>
                </div>
                <button className="btn accordian_btn2">Filter by Price</button>
                <div className="px-2" style={{ position: "relative" }}>
                  <div className="d-flex">
                    <input
                      type="range"
                      id="minPriceRange"
                      className="w-50"
                      min={0}
                      max={9000}
                      step={10}
                      value={minPrice}
                      onChange={handleMinRangeChange}
                      style={{ height: "2px" }}
                    />
                    <input
                      type="range"
                      id="maxPriceRange"
                      className="w-50"
                      min={0}
                      max={10000}
                      step={10}
                      value={maxPrice}
                      onChange={handleMaxRangeChange}
                      style={{
                        height: "2px",
                        position: "absolute",
                        top: "0px",
                        right: "4px",
                      }}
                    />
                  </div>
                  <p className="m-0 mt-2" style={{ color: "red" }}>
                    &pound;{minPrice} - &pound;{maxPrice}
                  </p>
                </div>
                <div className="px-2"></div>
              </div>
            </div>
            <div className="">
              <button
                className="btn btn-danger text-uppercase"
                onClick={ClearFilter}
              >
                Clear filter
              </button>
            </div>
          </div>

          <div className="col-lg-12 col-md-12 col-sm-12">
            <div className="row px-4 mb-4">
              <div className="col-lg-12 col-sm-12 d-flex align-items-center justify-content-between">
                <div className="d-flex align-items-center gap-1">
                  <div
                    className={`grid_icon ${activeGrid === "grid" ? "active" : ""
                      }`}
                    onClick={() => setActiveGrid("grid")}
                  >
                    <BsFillGridFill />
                  </div>
                  <div
                    className={`grid_icon ${activeGrid === "list" ? "active" : ""
                      }`}
                    onClick={() => setActiveGrid("list")}
                  >
                    <BsListStars />
                  </div>
                </div>
                <div className="d-flex align-items-center">
                  <p className="fw-bolder my-2">
                    {filterProduct.length} Products
                  </p>
                </div>
                <div className="d-flex align-items-center">
                  <button className="btn fs-4" role="button" onClick={Filter}>
                    <FaFilter />
                  </button>
                </div>
              </div>
            </div>
            {loading ? (
              <div
                className="col-lg-12 col-sm-12 d-flex align-items-center justify-content-center"
                style={{ height: "50vh" }}
              >
                <Loader />
              </div>
            ) : filterProduct.length === 0 ? (
              <div className="col-12 d-flex justify-content-center align-items-center flex-wrap px-4" style={{ height: "300px" }}>
                <Loader />
                {/* <p className="fs-3 bolder">No product available related to this category</p> */}
              </div>
            ) : (
              <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-sm-2  g-4">
                {activeGrid === "grid" &&
                  filterProduct?.map((product, index) => (
                    <div className="col" key={index}>
                      <div
                        className="product_box "
                        style={{ position: "relative" }}
                      >
                        <div
                          className="p_img_box"
                          onClick={() => move("/single_Add/" + product._id)}
                        >
                          <img src={product.images[0]} alt="No network" />
                          <div className="overlay">
                            {product.images[1] && (
                              <img src={product.images[1]} alt="" />
                            )}
                          </div>
                        </div>
                        {product.discount && product.discount > 0 ? (
                          <div className="discount">
                            {`${product.discount}%`}
                          </div>
                        ) : null}
                        <p className="card_title px-2">{product.title}</p>
                        <div className="text-left">
                          {product.discount && product.discount > 0 ? (
                            <>
                              <span className="card_Fprice px-2 ">
                                {" "}
                                {`£${product.Fprice?.toFixed(1)}`}
                              </span>
                              <span className="card_price">
                                <s>{`£${product.price?.toFixed(1)}`}</s>
                              </span>
                            </>
                          ) : (
                            <span className="card_Fprice px-2 ">
                              {" "}
                              {`£${product.Fprice?.toFixed(2)}`}
                            </span>
                          )}
                        </div>
                        <div className="product_btns">
                          <button
                            className="btn p_detail_btn"
                            onClick={() => move("/single_Add/" + product._id)}
                          >
                            View Detail
                          </button>
                          <a href="https://wa.me/+923067208343" target="blank">
                            <button className="btn p_whatsapp_btn">
                              Buy Via WhatsApp
                            </button>
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-sm-2 g-4 my-3">
              {activeGrid === "list" &&
                filterProduct?.map((product, index) => {
                  return (
                    <>
                      <div
                        className="col d-flex gap-2 grid_box_main"
                        key={index}
                        onClick={() => move("/single_Add/" + product._id)}
                        style={{ overflow: "hidden" }}
                      >
                        <div style={{ width: "40%" }}>
                          <div className="p_img_box_grid">
                            <img src={product.images[0]} alt="No network" />
                            {product.discount && product.discount > 0 ? (
                              <div className="discount">
                                {`${product.discount}%`}
                              </div>
                            ) : null}
                            <div className="overlay">
                              {product.images[1] && (
                                <img src={product.images[1]} alt="" />
                              )}
                            </div>
                          </div>
                        </div>
                        <div
                          className="d-flex flex-column justify-content-between gap-3"
                          style={{ width: "60%" }}
                        >
                          <div>
                            <p className="card_title px-2">{product.title}</p>
                            {product.description && (
                              <p className="p_description px-2">
                                {product.description}
                              </p>
                            )}
                          </div>
                          <div className="text-left">
                            {product.discount && product.discount > 0 ? (
                              <>
                                <span className="card_Fprice px-2 ">
                                  {" "}
                                  {`£${product.Fprice?.toFixed(1)}`}
                                </span>
                                <span className="card_price">
                                  <s>{`£${product.price?.toFixed(1)}`}</s>
                                </span>
                              </>
                            ) : (
                              <span className="card_Fprice px-2 ">
                                {" "}
                                {`£${product.Fprice?.toFixed(2)}`}
                              </span>
                            )}
                          </div>
                          <div className="text-center">
                            <button className="btn review_btn btn-outline-primary fs-10">
                              View Detail
                            </button>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
