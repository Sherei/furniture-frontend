import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Loader from "../Loader/Loader"
import axios from 'axios';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';
import "./addproduct.css"

export const AddProduct = () => {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }, []);

  const cu = useSelector(store => store.userSection.cu);

  const [product, setProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState("");

  const { productId } = useParams();

  const handleDiscountChange = (e) => {
    const newDiscount = parseFloat(e.target.value);
    const newFinalPrice = price - (price * (newDiscount / 100));
    setDiscount(newDiscount);
    setFinalPrice(newFinalPrice);
  };

  const handlePriceChange = (e) => {
    const newPrice = parseFloat(e.target.value);
    const newFinalPrice = newPrice - (newPrice * (discount / 100));
    setPrice(newPrice);
    setFinalPrice(newFinalPrice);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
  };

  let move = useNavigate();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: product, // Assuming product contains existing product data
  });



  useEffect(() => {

    axios.get(`${process.env.REACT_APP_BASE_URL}/product_edit?id=${productId}`).then(function (resp) {
      setProduct(resp.data)
      setPrice(resp.data.price);
      setDiscount(resp.data.discount);
      setFinalPrice(resp.data.Fprice);
    })
  }, [])

  useEffect(() => {
    if (productId) {
      reset(product);
    }
  }, [product]);

  async function submitProduct(data) {

    setLoading(true);

    const formData = new FormData();

    if (data.images.length > 0) {

      const cloudinaryUrl = [];
      for (let i = 0; i < data.images.length; i++) {
        formData.append('file', data.images[i]);
        formData.append('upload_preset', "vnayn2uf");
        await axios.post("https://api.cloudinary.com/v1_1/drouq9iz2/image/upload", formData).then((res) => {
          cloudinaryUrl.push(res.data.url);
        });
      }
      data.images = cloudinaryUrl;
    }
    data.discount = discount;
    data.price = price;
    data.Fprice = finalPrice;

    if (productId) {

      axios.put(`${process.env.REACT_APP_BASE_URL}/product-update`, data).then(function (resp) {
        if (resp) {
    setLoading(true);

          toast.success("Product updated")
          move('/admin-dashboard')
        }
      }).catch(function (resp) {
        console.log(resp);
      })

    } else {

      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/product`, data);
        if (response.data) {
          toast.success("Product Uploaded");
          reset()
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setError("Try with a different Serial number");
        } else {
          toast.error("Try Again later");
        }
      } finally {
        setLoading(false);
      }
    }
  }

  return <>
    <div className='container my-4'>
      <div className='row border py-5 px-4'>
        <div className='col-lg-12 col-sm-12'>
          <div className='d-flex justify-content-between'>
            <h1 className='p_head' style={{ color: "rgb(2, 2, 94)", fontWeight: "700" }}> Add Product </h1>
            <p className='panel_btn' onClick={() => move("/admin-dashboard")}>Admin Panel</p>
          </div>
          {loading ? (
            <div className='d-flex justify-content-center align-items-center'><Loader /></div>
          ) : (
            <form>
              <div className='row'>
                {Error === "Try with different Serial number" &&
                  <div className='error'>Try with different serial number</div>
                }
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Add Title *</label>
                  <input type="text" {...register('title', { required: true })} className="form-control mb-2 mr-sm-2" />
                  {errors.title && errors.title.type == "required" ? <div className='error'> Title is required </div> : null}
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Serial Number *</label>
                  <input type="number" {...register('sn', { required: true })} min={"1"} className="form-control mb-2 mr-sm-2" />
                  {errors.sn && errors.sn.type == "required" ? <div className='error'>Serail Number is required</div> : null}
                </div>

                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Select Category *</label>
                  <select  {...register('category', {
                    required: true, validate: function (selectedValue) {
                      if (selectedValue == "select category") {
                        return false;
                      } else {
                        return true;
                      }
                    }
                  })} className="form-control mb-2 mr-sm-2"
                    defaultValue={product ? product.category : selectedCategory}
                    onChange={handleCategoryChange}
                  >
                    <option value="select category">Select Category</option>
                    <option value="sofa">Sofa</option>
                    <option value="bed">Bed</option>
                    <option value="ottoman-box">Ottoman box</option>
                    <option value="mattress">Mattress</option>
                    <option value="footstools">FootStools & Puffs</option>
                  </select>
                  {errors.category ? <div className='error'>Category is required</div> : null}
                </div>

                {(selectedCategory === 'sofa' || product?.category === "sofa") && (
                  <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                    <label style={{ fontSize: "17px", fontWeight: "600" }}>Sub Category *</label>
                    <select {...register('subCategory', {
                      required: true, validate: function (selectedValue) {
                        if (selectedValue == "select subCategory") {
                          return false;
                        } else {
                          return true;
                        }
                      }
                    })} className="form-control mb-2 mr-sm-2"
                      defaultValue={product ? product.subCategory : ""}
                    >
                      <option value="select subCategory">Select subCategory</option>
                      <option value="corner-sofas">Corner Sofas</option>
                      <option value="sofa-sets">Sofa Sets</option>
                      <option value="sofa-beds">Sofa Beds</option>
                      <option value="three-&-two-seater-sofas">3 & 2 Seater Sofas</option>
                      <option value="fabric-sofas">Fabric sofas</option>
                      <option value="chesterfield-sofas">Chesterfield Sofas</option>
                      <option value="u-shaped-sofas">U Shaped Sofas</option>
                      <option value="leather-sofas">Leather Sofas</option>
                      <option value="recliner-sofas">Recliner Sofas</option>
                      <option value="arm-chair-&-swivel-chair">Arm Chair & Swivel Chair</option>
                      <option value="Others">Others</option>
                    </select>
                    {errors.subCategory ? <div className='error'>Select Sub Category</div> : null}

                  </div>
                )}
                {(selectedCategory === 'bed' || product?.category === "bed") && (
                  <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                    <label style={{ fontSize: "17px", fontWeight: "600" }}>Select Sub Category *</label>
                    <select {...register('subCategory', {
                      required: true, validate: function (selectedValue) {
                        if (selectedValue == "Select subCategory") {
                          return false;
                        } else {
                          return true;
                        }
                      }
                    })} className="form-control mb-2 mr-sm-2"
                      defaultValue={product ? product.subCategory : ""}
                    >
                      <option value="Select subCategory">Select subCategory</option>
                      <option value="ambassador-beds">Ambassador Beds</option>
                      <option value="panel-bed">Panel Beds</option>
                      <option value="wingback-beds-frames">Wingback bed Frames</option>
                      <option value="ottoman-beds">Ottoman Beds</option>
                      <option value="bespoke-beds">Bespoke Beds</option>
                      <option value="chesterfield-beds">Chesterfield Beds</option>
                      <option value="divan-beds">Divan Beds</option>
                    </select>
                    {errors.subCategory ? <div className='error'>Select subCategory</div> : null}
                  </div>
                )}
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Add Description</label>
                  <textarea {...register('description', { minLength: 10 })} className="form-control" rows={3} defaultValue={product ? product.description : ""} />
                  {errors.description && errors.description.type == "minLength" ? <div className='error'>Description Should Contain more than 15 characters </div> : null}
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Price *</label>
                  <input type="number" {...register('price', { required: true })} min={"1"}
                    className="form-control mb-2 mr-sm-2"
                    defaultValue={product ? product.price : price}
                    onChange={handlePriceChange} />
                  {errors.price && errors.price.type == "required" ? <div className='error'>Price is required</div> : null}
                </div>

                <div className='col-lg-6  col-md-6 col-sm-12 my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Discount</label>
                  <input type="number" {...register('discount')} min={"1"}
                    className="form-control mb-2 mr-sm-2"
                    defaultValue={product ? product.discount : discount}
                    onChange={handleDiscountChange} />
                </div>

                <div className='col-lg-6 col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Final Price *</label>
                  <input type="number" {...register('Fprice')}
                    min={"1"}
                    defaultValue={product ? finalPrice : finalPrice}
                    className="form-control mb-2 mr-sm-2" />
                </div>

                <div className='col-lg-6  col-md-6 col-sm-12 my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Product Pics *</label>
                  <input
                    type='file'
                    multiple
                    {...register('images', {
                      required: productId ? false : true,
                      minLength: 1,
                      maxLength: 5,
                    })}
                    className="form-control mb-2 mr-sm-2"
                  />

                  {errors.images && errors.images.type === 'required' && <div className='error'>At least one image is required</div>}
                  {errors.images && errors.images.type === 'maxLength' && <div className='error'>Only ten images allowed</div>}
                  {errors.images && errors.images.type === 'minLength' && <div className='error'>At least one image is required</div>}
                </div>

              </div>
              <div className='row'>
                {/* <div className='col-lg-6 col-md-6 col-sm-12'>

                  <input
                    type="checkbox"
                    {...register('trending')}
                    className="form-check-input"
                    id="exampleCheck1"
                    defaultChecked={product ? product.trending : false}
                  />
                  <span className='px-2'><b>Make Trending</b></span>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                  <input type="checkbox"
                    {...register('feature')}
                    className="form-check-input"
                    id="exampleCheck1"
                    defaultChecked={product ? product.feature : false}
                  />
                  <span className='px-2'><b>Make Feature</b> </span>
                </div> */}
                <div className='col-lg-12 col-sm-12 my-5'>
                  <button type="button" className="btn review_btn" onClick={handleSubmit(submitProduct)}>
                    Submit
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  </>
};
