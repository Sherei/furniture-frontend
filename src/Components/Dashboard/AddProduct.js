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
    });
  }, []);

  const cu = useSelector(store => store.userSection.cu);
  const [product, setProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(product ? product.discount : 0);
  const [finalPrice, setFinalPrice] = useState(product ? product.Fprice : 1);;
  const [loading, setLoading] = useState(false);
  const [Error, setError] = useState("");
  const [imagePreviews, setImagePreviews] = useState([]);
  const [formData, setFormData] = useState(new FormData());


  let move = useNavigate();

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

  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    defaultValues: product,
  });


  useEffect(() => {
    try {
      if (productId) {
        axios.get(`${process.env.REACT_APP_BASE_URL}/product_edit?id=${productId}`).then(function (resp) {
          setProduct(resp.data);
          setPrice(resp.data.price);
          setDiscount(resp.data.discount);
          setFinalPrice(resp.data.Fprice);
          setSelectedCategory(resp.data.category);
          const imageArray = [];
          for (let i = 0; i < resp.data.images.length; i++) {
            imageArray.push(resp.data.images[i]);
          }
          setImagePreviews(imageArray);
        });
      }
    } catch (e) {

    }
  }, []);



  const handleImageChange = async (e) => {

    const files = Array.from(e.target.files);

    if (files.length + imagePreviews.length > 10) {
      setError('images');
      return;
    }

    const newFormData = new FormData();

    const existingImages = productId ? product.images : [];
    existingImages.forEach((img) => {
      newFormData.append('images', img);
    });

    for (const file of files) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setImagePreviews((prevPreviews) => [...prevPreviews, e.target.result]);
      };

      reader.readAsDataURL(file);
      newFormData.append('images', file);
    }

    setFormData(newFormData);
  };



  const handleImageDelete = (index) => {

    const updatedPreviews = imagePreviews.filter((_, i) => i !== index);

    setImagePreviews(updatedPreviews);

    const newFormData = new FormData();

    updatedPreviews.forEach((preview) => {

      newFormData.append('images', preview);

    });

    setFormData(newFormData);
  };


  useEffect(() => {
    if (productId) {
      reset(product);
    }
  }, [product]);


  async function submitProduct(data) {

    window.scrollTo({
      top: 0,
    });


    if (imagePreviews.length > 10) {
      setError('images');
      return;
    }

    setLoading(true);

    const cloudinaryUrls = [];

    for (const file of imagePreviews) {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', "zonfnjjo");

      try {
        const response = await axios.post("https://api.cloudinary.com/v1_1/dlw9hxjr4/image/upload", formData);
        cloudinaryUrls.push(response.data.url);
      } catch (error) {

      }
    }


    if (productId) {
      if (selectedCategory !== "bed" && selectedCategory !== "sofa") {
        setSelectedCategory('');
        data.subCategory="";
      }
      data.images = cloudinaryUrls;
      data.discount = discount;
      data.price = price;
      data.Fprice = finalPrice;

      try {
        const response = await axios.put(`${process.env.REACT_APP_BASE_URL}/product-update`, data);
        setLoading(false);
        toast.success("Product updated");
        move('/admin-dashboard');
      } catch (error) {
        if (error.response && error.response.status === 400 && error.response.data.message === 'Cannot add more than 10 images') {
          return setError('images');
        }
      }
    } else {

      data.images = cloudinaryUrls;
      data.discount = discount;
      data.price = price;
      data.Fprice = finalPrice;

      try {
        const response = await axios.post(`${process.env.REACT_APP_BASE_URL}/product`, data);
        if (response.data) {
          toast.success("Product Uploaded");
          reset();
          setImagePreviews([])
          setFinalPrice('')
          setPrice('')
          setError('')
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          setError("Serial number");
          setImagePreviews([])
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
          {Error === "Serial number" &&
            <div className='error'>Try with different serial number</div>
          }
          {Error === "images" &&
            <div className='error'>Invalid number of images. Must be between 1 and 10</div>
          }
          {loading ? (
            <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }} >
              <Loader />
            </div>
          ) : (

            <form>
              <div className='row'>
               

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

                {(selectedCategory === 'sofa') && (
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
                    >
                      <option value="select subCategory">Select subCategory</option>
                      <option value="corner-sofas">Corner Sofas</option>
                      <option value="sofa-beds">Sofa Beds</option>
                      <option value="three-&-two-seater-sofas">3 & 2 Seater Sofas</option>
                      <option value="u-shaped-sofas">U Shaped Sofas</option>
                      <option value="leather-sofas">Leather Sofas</option>
                      <option value="recliner-sofas">Recliner Sofas</option>
                      <option value="arm-chair-&-swivel-chair">Arm Chair & Swivel Chair</option>
                    </select>
                    {errors.subCategory ? <div className='error'>Select Sub Category</div> : null}

                  </div>
                )}
                {(selectedCategory === 'bed') && (
                  <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                    <label style={{ fontSize: "17px", fontWeight: "600" }}>Sub Category *</label>
                    <select {...register('subCategory', {
                      required: true, validate: function (selectedValue) {
                        if (selectedValue == "Select subCategory") {
                          return false;
                        } else {
                          return true;
                        }
                      }
                    })} className="form-control mb-2 mr-sm-2"
                    >
                      <option value="Select subCategory">Select subCategory</option>
                      <option value="ambassador-beds">Ambassador Beds</option>
                      <option value="panel-bed">Panel Beds</option>
                      <option value="wingback-beds-frames">Wingback Bed</option>
                      <option value="ottoman-beds">Ottoman Beds</option>
                      <option value="bespoke-beds">Bespoke Beds</option>
                      <option value="chesterfield-beds">Chesterfield Beds</option>
                      <option value="divan-beds">Divan Beds</option>
                    </select>
                    {errors.subCategory ? <div className='error'>Select subCategory</div> : null}
                  </div>
                )}

                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Price *</label>
                  <input type="number" {...register('price', { required: true })} min={1}
                    className="form-control mb-2 mr-sm-2"
                    defaultValue={product ? product.price : price}
                    onChange={handlePriceChange} />
                  {errors.price && errors.price.type == "required" ? <div className='error'>Price is required</div> : null}
                </div>

                <div className='col-lg-6  col-md-6 col-sm-12 my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Discount</label>
                  <input type="number" {...register('discount')} min={0}
                    className="form-control mb-2 mr-sm-2"
                    defaultValue={product ? product.discount : discount}
                    onChange={handleDiscountChange} />
                </div>

                <div className='col-lg-6 col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Final Price *</label>
                  <input
                    type="number"
                    {...register('Fprice')}
                    min="1"
                    value={finalPrice}
                    className="form-control mb-2 mr-sm-2"
                  />
                </div>

                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Heading 1</label>
                  <input {...register('descriptionHead1')} className="form-control" />
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Description 1</label>
                  <input {...register('description')} className="form-control" />
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Heading 2</label>
                  <input {...register('descriptionHead2')} className="form-control" />
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Description 2</label>
                  <input {...register('description2')} className="form-control" />
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Heading 3</label>
                  <input {...register('descriptionHead3')} className="form-control" />
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Description 3</label>
                  <input {...register('description3')} className="form-control" />
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Heading 4</label>
                  <input {...register('descriptionHead4')} className="form-control" />
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Description 4</label>
                  <input {...register('description4')} className="form-control" />
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Feature Heading</label>
                  <input {...register('featureHead')} className="form-control" />
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Feature 1</label>
                  <input {...register('feature1')} className="form-control" />
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Feature 2</label>
                  <input {...register('feature2')} className="form-control" />
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Feature 3</label>
                  <input {...register('feature3')} className="form-control" />
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Feature 4</label>
                  <input {...register('feature4')} className="form-control" />
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Feature 5</label>
                  <input {...register('feature5')} className="form-control" />
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Feature 6</label>
                  <input {...register('feature6')} className="form-control" />
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Feature 7</label>
                  <input {...register('feature7')} className="form-control" />
                </div>
              
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Note</label>
                  <input {...register('note2')} className="form-control" />
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Dimension Heading</label>
                  <input {...register('dimensionHead')} className="form-control" />
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Dimension 1</label>
                  <input {...register('dimension1')} className="form-control" />
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Dimension 2</label>
                  <input {...register('dimension2')} className="form-control" />
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Dimension 3</label>
                  <input {...register('dimension3')} className="form-control" />
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12  my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Dimension 4</label>
                  <input {...register('dimension4')} className="form-control" />
                </div>
                <div className='col-lg-6  col-md-6 col-sm-12 my-2'>
                  <label style={{ fontSize: "17px", fontWeight: "600" }}>Product Pics *</label>
                  <input
                    type='file'
                    multiple
                    {...register('images', {
                      required: productId ? false : true,
                      minLength: 1,
                      maxLength: 10,
                    })}
                    className="form-control mb-2 mr-sm-2"
                    onChange={handleImageChange}
                  />
                  {errors.images && errors.images.type === 'required' && <div className='error'>At least one image is required</div>}
                  {errors.images && errors.images.type === 'maxLength' && <div className='error'>Only Ten images allowed</div>}
                  {errors.images && errors.images.type === 'minLength' && <div className='error'>At least one image is required</div>}
                  <div className='img_preview d-flex flex-wrap px-3 gap-3'>
                    {(imagePreviews).map((preview, index) => (
                      <div className='p-1' key={index}
                        style={{
                          position: "relative",
                          border: "2px dashed rgb(2,2,94)",
                        }}>
                        <img src={preview} alt={`Preview ${index}`}
                          style={{ height: "80px", width: "80px" }} />
                        <button
                          type="button"
                          className='m-0 px-2'
                          style={{
                            position: "absolute", top: "4px",
                            right: "5px",
                            border: "none",
                            backgroundColor: "rgb(0,0,0,0.2)",
                            color: "white",
                          }}
                          onClick={() => handleImageDelete(index)}
                        >
                          X
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className='row'>
                {!product &&
                  <div className='col-lg-12 col-sm-12 my-5'>
                    <button type="button" className="btn review_btn" style={{ width: "200px" }} onClick={handleSubmit(submitProduct)}>
                      Submit
                    </button>
                  </div>
                }
                {product &&
                  <div className='col-lg-12 col-sm-12 my-5'>
                    <button type="button" className="btn review_btn" style={{ width: "200px" }} onClick={handleSubmit(submitProduct)}>
                      Update
                    </button>
                  </div>
                }
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  </>
};
