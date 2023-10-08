import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import Loader from "../Loader/Loader"
import axios from 'axios';
import { toast } from 'react-toastify';
import "./addproduct.css"

export const AddProduct = () => {

  const [selectedCategory, setSelectedCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [finalPrice, setFinalPrice] = useState(0);
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState("");


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

  let { register, handleSubmit, reset, formState: { errors } } = useForm();


  async function submitProduct(data) {

    setLoading(true);

    let meraForm = new FormData();
    meraForm.append('title', data.title);
    meraForm.append('sn', data.sn);
    meraForm.append('category', data.category);
    meraForm.append('subCategory', data.subCategory);
    meraForm.append('description', data.description);
    meraForm.append('price', data.price);
    meraForm.append('discount', data.discount);
    meraForm.append('Fprice', data.Fprice);
    meraForm.append('trending', data.trending);
    meraForm.append('feature', data.feature);

    for (let i = 0; i < data.images.length; i++) {
      meraForm.append('images', data.images[i]);
    }
    try {

      let response = await axios.post(`${process.env.REACT_APP_BASE_URL}/product`, meraForm)

      if (response.data.message === "Product Added") {
        toast.success("Product Uploaded");
        reset();
      }
    } catch (error) {

      if (error.response && error.response.status === 400) {
        setError("Try with different Serial number")
      } else {
        toast.error("Try Again later")
        console.log("error while uploading add is :" +error)
      }

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className='container my-4'>
      <div className='row border py-5 px-4'>
        <div className='col-lg-12 col-sm-12'>
          <h1 className='p_head' style={{ color: "rgb(2, 2, 94)", fontWeight: "700" }}> Add Product </h1>
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
                  <input type="text" {...register('title', { required: true })} className="form-control mb-2 mr-sm-2" placeholder="Fabric Sofa" />
                  {errors.title && errors.title.type == "required" ? <div className='error'> Title is required </div> : null}
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Serial Number *</label>
                  <input type="number" {...register('sn', { required: true })} min={"1"} className="form-control mb-2 mr-sm-2" placeholder="1234" />
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
                  })} className="form-control mb-2 mr-sm-2" onChange={handleCategoryChange}>
                    <option value="select category">Select Category</option>
                    <option value="sofa">Sofa</option>
                    <option value="bed">Bed</option>
                    <option value="wardrobes">Wardrobes</option>
                    <option value="dinning">Dinning</option>
                    <option value="coffee">Coffee</option>
                  </select>
                  {errors.category ? <div className='error'>Category is required</div> : null}
                </div>

                {selectedCategory === 'sofa' && (
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
                    })} className="form-control mb-2 mr-sm-2">
                      <option value="select subCategory">Select subCategory</option>
                      <option value="fabric corner sofas">fabric corner sofas</option>
                      <option value="fabric recliner sofas">fabric recliner sofas</option>
                      <option value="fabric sofa sets">fabric sofa sets</option>
                      <option value="leather recliner corner sofas">leather recliner corner sofas</option>
                      <option value="leather recliner sofas">leather recliner sofas</option>
                      <option value="leather recliner sofa sets">leather recliner sofa sets</option>
                      <option value="Others">Others</option>
                    </select>
                    {errors.subCategory ? <div className='error'>Select Sub Category</div> : null}

                  </div>
                )}
                {selectedCategory === 'bed' && (
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
                    })} className="form-control mb-2 mr-sm-2">
                      <option value="Select subCategory">Select subCategory</option>
                      <option value="ambassador beds">Ambassador Beds</option>
                      <option value="bespoke bed">Bespoke Beds</option>
                      <option value="chesterfield beds">Chesterfield Beds</option>
                      <option value="ottoman beds">Ottoman Beds</option>
                      <option value="panel beds">Panel Beds</option>
                      <option value="Wingback bed Frames">Wingback bed Frames</option>
                      <option value="luxury beds">Luxuy Beds</option>
                      <option value="wall panel beds frame">Wall Panel Beds Frame</option>
                    </select>
                    {errors.subCategory ? <div className='error'>Select subCategory</div> : null}
                  </div>
                )}
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Add Description</label>
                  <textarea {...register('description', { minLength: 10 })} className="form-control" rows={3} defaultValue={""} />
                  {errors.description && errors.description.type == "minLength" ? <div className='error'>Description Should Contain more than 15 characters </div> : null}
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Price *</label>
                  <input type="number" {...register('price', { required: true })} min={"1"} className="form-control mb-2 mr-sm-2" placeholder="1234" onChange={handlePriceChange} />
                  {errors.price && errors.price.type == "required" ? <div className='error'>Price is required</div> : null}
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12 my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Discount</label>
                  <input type="number" {...register('discount')} min={"1"} className="form-control mb-2 mr-sm-2" placeholder="10" onChange={handleDiscountChange} />
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Final Price *</label>
                  <input type="number" {...register('Fprice')} value={finalPrice} className="form-control mb-2 mr-sm-2" placeholder="1234" />
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12 my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Product Pics *</label>
                  <input type='file' multiple {...register('images', { required: true, maxLength: 10, minLength: 1 })} className="form-control mb-2 mr-sm-2" />
                  {errors.images && errors.images.type === 'required' && <div className='error'>At least one image is required</div>}
                  {errors.images && errors.images.type === 'maxLength' && <div className='error'>Only ten images allowed</div>}
                  {errors.images && errors.images.type === 'minLength' && <div className='error'>At least one image is required</div>}
                </div>

              </div>
              <div className='row'>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                  <input type="checkbox" {...register('trending')} className="form-check-input" id="exampleCheck1" />
                  <span className='px-2'><b>Make Trending</b> </span>
                </div>
                <div className='col-lg-6 col-md-6 col-sm-12'>
                  <input type="checkbox" {...register('feature')} className="form-check-input" id="exampleCheck1" />
                  <span className='px-2'><b>Make Feature</b> </span>
                </div>
                <div className='col-lg-12 col-sm-12 my-5'>
                  <button type="button" className="btn review_btn" onClick={handleSubmit(submitProduct)}>
                    Submit
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div >
    </div >
  );
};
