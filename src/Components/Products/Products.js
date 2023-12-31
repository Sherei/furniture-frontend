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
  const move = useNavigate();


  const Filter = () => {
    setFilter(!filter);
  };

  useEffect(() => {
    setCategory(prodctName?.toLowerCase());
  }, [prodctName]);

  useEffect(() => {
    setLoading(true);
    try {
      const apiUrl = `${process.env.REACT_APP_BASE_URL}/products`;
      const params = {
        name: category,
        sort: sort,
        minPrice: minPrice,
        maxPrice: maxPrice,
        search: search
      };
      axios.get(apiUrl, { params }).then((res) => {
        setData(res?.data);
      }).finally(() => {
        setLoading(false);
      });
    } catch (e) { }

  }, [category, sort, minPrice, maxPrice, search]);


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
    setCategory("all");
    setSortOrder("");
    setSearch("");
    setActiveGrid("grid");
  }

  return (
    <>
      <div className="container-fluid min-vh-100 my-lg-5 my-3" style={{ overflow: "hidden" }}>

        <div className={`filter_col_display ${filter ? "showFilter" : "filter_col"}`}>
          <div className="d-flex justify-content-between mb-3">
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
          <div className="accordion d-flex  flex-column gap-4" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingOne">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  All Sofas
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                aria-labelledby="headingOne"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <p
                    onClick={() => setCategory("sofa")}
                    className={
                      category === "sofa" ? "activeCategory" : ""
                    }
                  >
                    All in sofas
                  </p>
                  <p
                    onClick={() => setCategory("corner-sofas")}
                    className={
                      category === "corner-sofas" ? "activeCategory" : ""
                    }
                  >
                    Corner Sofas
                  </p>
                  <p
                    onClick={() => setCategory("sofa-sets")}
                    className={
                      category === "sofa-sets" ? "activeCategory" : ""
                    }
                  >
                    Sofa Sets{" "}
                  </p>
                  <p
                    onClick={() => setCategory("sofa-beds")}
                    className={
                      category === "sofa-beds" ? "activeCategory" : ""
                    }
                  >
                    Sofa Beds
                  </p>
                  <p
                    onClick={() => setCategory("three-&-two-seater-sofas")}
                    className={
                      category === "three-&-two-seater-sofas"
                        ? "activeCategory"
                        : ""
                    }
                  >
                    3 & 2 Seater Sofas
                  </p>
                  <p
                    onClick={() => setCategory("u-shaped-sofas")}
                    className={
                      category === "u-shaped-sofas"
                        ? "activeCategory"
                        : ""
                    }
                  >
                    U Shaped Sofas
                  </p>
                  <p
                    onClick={() => setCategory("leather-sofas")}
                    className={
                      category === "leather-sofas"
                        ? "activeCategory"
                        : ""
                    }
                  >
                    Leather Sofas
                  </p>
                  <p
                    onClick={() => setCategory("recliner-sofas")}
                    className={
                      category === "recliner-sofas"
                        ? "activeCategory"
                        : ""
                    }
                  >
                    Recliner Sofas
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingTwo">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  All Beds
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                aria-labelledby="headingTwo"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <p
                    onClick={() => setCategory("bed")}
                    className={
                      category === "bed" ? "activeCategory" : ""
                    }
                  >
                    All in Beds
                  </p>
                  <p
                    onClick={() => setCategory("ambassador-beds")}
                    className={
                      category === "ambassador-beds"
                        ? "activeCategory"
                        : ""
                    }
                  >
                    Ambassador Beds{" "}
                  </p>
                  <p
                    onClick={() => setCategory("panel-bed")}
                    className={
                      category === "panel-bed" ? "activeCategory" : ""
                    }
                  >
                    Panel Beds
                  </p>
                  <p
                    onClick={() => setCategory("wingback-beds-frames")}
                    className={
                      category === "wingback-beds-frames"
                        ? "activeCategory"
                        : ""
                    }
                  >
                    Wingback Beds
                  </p>
                  <p
                    onClick={() => setCategory("bespoke-beds")}
                    className={
                      category === "bespoke-beds" ? "activeCategory" : ""
                    }
                  >
                    Bespoke Beds
                  </p>
                  <p
                    onClick={() => setCategory("chesterfield-beds")}
                    className={
                      category === "chesterfield-beds"
                        ? "activeCategory"
                        : ""
                    }
                  >
                    Chesterfield Beds
                  </p>
                  <p
                    onClick={() => setCategory("divan-beds")}
                    className={
                      category === "divan-beds" ? "activeCategory" : ""
                    }
                  >
                    Divan Beds
                  </p>
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="m-0 p-0">
                <button
                  className={`accordion-button collapsed accordian2 ${category === "ottoman-box" ? "activeCategory" : ""}`}
                  aria-expanded="false"
                  onClick={() => setCategory("ottoman-box")}
                >
                  Ottoman Box
                </button>
              </h2>
            </div>
            <div className="accordion-item">
              <h2 className="m-0 p-0">
                <button
                  className={`accordion-button collapsed accordian2 ${category === "mattress" ? "activeCategory" : ""}`}
                  aria-expanded="false"
                  onClick={() => setCategory("mattress")}
                >
                  Mattress
                </button>
              </h2>
            </div>
            <div className="accordion-item">
              <h2 className="m-0 p-0">
                <button
                  className={`accordion-button collapsed accordian2 ${category === "footstools" ? "activeCategory" : ""}`}
                  aria-expanded="false"
                  onClick={() => setCategory("footstools")}
                >
                  Footstools
                </button>
              </h2>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header" id="headingThree">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  Sort By
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                aria-labelledby="headingThree"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <p onClick={() => setSortOrder("")}>All</p>
                  <p
                    className={sort === "asc" ? "activeCategory" : ""}
                    onClick={() => setSortOrder("asc")}>Price (Highest)</p>
                  <p
                    className={sort === "desc" ? "activeCategory" : ""}
                    onClick={() => setSortOrder("desc")}>Price (Lowest)</p>
                </div>
              </div>
            </div>
            <div>
              <p className="m-0" style={{ fontSize: "16px", fontWeight: "500" }}>Price Range</p>
            </div>
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
              <p className="m-0 mt-2 px-3" style={{ color: "red" }}>
                &pound;{minPrice} - &pound;{maxPrice}
              </p>
            </div>
          </div>
          <button
            className="btn btn-danger text-uppercase my-4 w-100"
            onClick={ClearFilter}
          >
            Clear filter
          </button>
        </div>

        <div className="row">
          
          <div className="col-lg-2 col_hide">
            <div>
              <p className="fs-4 fw-bolder" style={{ color: "#1b2950" }}><FaFilter />&nbsp;Filter</p>
            </div>
            <div className="accordion d-flex  flex-column gap-4" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingOne">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    All Sofas
                  </button>
                </h2>
                <div
                  id="collapseOne"
                  className="accordion-collapse collapse show"
                  aria-labelledby="headingOne"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p
                      onClick={() => setCategory("sofa")}
                      className={
                        category === "sofa" ? "activeCategory" : ""
                      }
                    >
                      All in sofas
                    </p>
                    <p
                      onClick={() => setCategory("corner-sofas")}
                      className={
                        category === "corner-sofas" ? "activeCategory" : ""
                      }
                    >
                      Corner Sofas
                    </p>
                    <p
                      onClick={() => setCategory("sofa-sets")}
                      className={
                        category === "sofa-sets" ? "activeCategory" : ""
                      }
                    >
                      Sofa Sets{" "}
                    </p>
                    <p
                      onClick={() => setCategory("sofa-beds")}
                      className={
                        category === "sofa-beds" ? "activeCategory" : ""
                      }
                    >
                      Sofa Beds
                    </p>
                    <p
                      onClick={() => setCategory("three-&-two-seater-sofas")}
                      className={
                        category === "three-&-two-seater-sofas"
                          ? "activeCategory"
                          : ""
                      }
                    >
                      3 & 2 Seater Sofas
                    </p>
                    <p
                      onClick={() => setCategory("u-shaped-sofas")}
                      className={
                        category === "u-shaped-sofas"
                          ? "activeCategory"
                          : ""
                      }
                    >
                      U Shaped Sofas
                    </p>
                    <p
                      onClick={() => setCategory("leather-sofas")}
                      className={
                        category === "leather-sofas"
                          ? "activeCategory"
                          : ""
                      }
                    >
                      Leather Sofas
                    </p>
                    <p
                      onClick={() => setCategory("recliner-sofas")}
                      className={
                        category === "recliner-sofas"
                          ? "activeCategory"
                          : ""
                      }
                    >
                      Recliner Sofas
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingTwo">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    All Beds
                  </button>
                </h2>
                <div
                  id="collapseTwo"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingTwo"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p
                      onClick={() => setCategory("bed")}
                      className={
                        category === "bed" ? "activeCategory" : ""
                      }
                    >
                      All in Beds
                    </p>
                    <p
                      onClick={() => setCategory("ambassador-beds")}
                      className={
                        category === "ambassador-beds"
                          ? "activeCategory"
                          : ""
                      }
                    >
                      Ambassador Beds{" "}
                    </p>
                    <p
                      onClick={() => setCategory("panel-bed")}
                      className={
                        category === "panel-bed" ? "activeCategory" : ""
                      }
                    >
                      Panel Beds
                    </p>
                    <p
                      onClick={() => setCategory("wingback-beds-frames")}
                      className={
                        category === "wingback-beds-frames"
                          ? "activeCategory"
                          : ""
                      }
                    >
                      Wingback Beds
                    </p>
                    <p
                      onClick={() => setCategory("bespoke-beds")}
                      className={
                        category === "bespoke-beds" ? "activeCategory" : ""
                      }
                    >
                      Bespoke Beds
                    </p>
                    <p
                      onClick={() => setCategory("chesterfield-beds")}
                      className={
                        category === "chesterfield-beds"
                          ? "activeCategory"
                          : ""
                      }
                    >
                      Chesterfield Beds
                    </p>
                    <p
                      onClick={() => setCategory("divan-beds")}
                      className={
                        category === "divan-beds" ? "activeCategory" : ""
                      }
                    >
                      Divan Beds
                    </p>
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="m-0 p-0">
                  <button
                    className={`accordion-button collapsed accordian2 ${category === "ottoman-box" ? "activeCategory" : ""}`}
                    aria-expanded="false"
                    onClick={() => setCategory("ottoman-box")}>
                    Ottoman Box
                  </button>
                </h2>
              </div>
              <div className="accordion-item">
                <h2 className="m-0 p-0">
                  <button
                    className={`accordion-button collapsed accordian2 ${category === "mattress" ? "activeCategory" : ""}`}
                    aria-expanded="false"
                    onClick={() => setCategory("mattress")}
                  >
                    Mattress
                  </button>
                </h2>
              </div>
              <div className="accordion-item">
                <h2 className="m-0 p-0">
                  <button
                    className={`accordion-button collapsed accordian2 ${category === "footstools" ? "activeCategory" : ""}`}
                    aria-expanded="false"
                    onClick={() => setCategory("footstools")}
                  >
                    Footstools
                  </button>
                </h2>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingThree">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Sort By
                  </button>
                </h2>
                <div
                  id="collapseThree"
                  className="accordion-collapse collapse"
                  aria-labelledby="headingThree"
                  data-bs-parent="#accordionExample"
                >
                  <div className="accordion-body">
                    <p onClick={() => setSortOrder("")}>All</p>
                    <p className={
                      sort === "asc" ? "activeCategory" : ""
                    }
                      onClick={() => setSortOrder("asc")} >Price (Highest)</p>
                    <p className={
                      sort === "desc" ? "activeCategory" : ""
                    }
                      onClick={() => setSortOrder("desc")}>Price (Lowest)</p>

                  </div>
                </div>
              </div>
              <div>
                <p className="m-0" style={{ fontSize: "16px", fontWeight: "500" }}>Price Range</p>
              </div>
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
                <p className="m-0 mt-2 px-3" style={{ color: "red" }}>
                  &pound;{minPrice} - &pound;{maxPrice}
                </p>
              </div>
              <button
                className="btn btn-danger text-uppercase my-4 w-100"
                onClick={ClearFilter}
              >
                Clear filter
              </button>
            </div>
          </div>

          <div className="col-lg-10 col-md-12 col-12">
            <div className="search_bar1 mt-2 mb-3">
              <input
                type="search"
                className="form-control w-80 p-2 border"
                placeholder="Search Anything"
                value={search}
                onChange={SearchInput}
              />
            </div>
            <div className="mb-4 mt-1 d-flex align-items-center justify-content-between">
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
                  {data?.length} Products
                </p>
              </div>
              <div className="search_bar d-flex align-items-center">
                <input
                  type="search"
                  className="form-control w-100 p-2 border"
                  placeholder="Search Anything"
                  value={search}
                  onChange={SearchInput}
                />
              </div>
              <button className="btn fs-4 filter_btn_display" role="button" onClick={Filter}>
                <FaFilter />
              </button>
            </div>
            {loading ? (
              <div
                className="col-lg-12 col-sm-12 d-flex align-items-center justify-content-center"
                style={{ height: "50vh" }}
              >
                <Loader />
              </div>
            ) : data.length === 0 ? (
              <div className="col-12 d-flex justify-content-center align-items-center flex-wrap px-4" style={{ height: "200px" }}>
                <p className="fs-5 bolder">Nothing found try with different keyword</p>
              </div>
            ) : (
              <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 row-cols-sm-2 g-4">
                {activeGrid === "grid" &&
                  data?.map((product, index) => (
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

            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-2 row-cols-sm-2 g-4 my-3">
              {activeGrid === "list" &&
                data?.map((product, index) => {
                  return (
                    <>
                      <div className="col d-flex gap-2 px-0 grid_box_main"
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
                            <p className="card_title px-2 m-0">{product.title}</p>
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
                          <div className="">
                            <button className="btn review_btn btn-outline-primary fs-10 px-5" style={{ width: "fit-content" }}>
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
