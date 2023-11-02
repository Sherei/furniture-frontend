import React, { useEffect, useState, useRef } from 'react';
import Loader from '../Loader/Loader';
import { AiFillDelete } from 'react-icons/ai';
import { FaDownload, FaPencilAlt } from 'react-icons/fa'
import { useDownloadExcel } from 'react-export-table-to-excel';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export const Products = () => {

  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const tableRef = useRef(null);

  let move = useNavigate()

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Products',
    sheet: 'Products'
  })

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/product`)
      .then((res) => {
        setProduct(res?.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsLoading(false);
      });
  }, []);

  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredProduct = product.length > 0 && product?.filter((data) => {
    const lowerCaseSearch = search.toLowerCase();
    return (
      data?.title?.toLowerCase().includes(lowerCaseSearch) ||
      data?.category?.toLowerCase().includes(lowerCaseSearch) ||
      data?.subCategory?.toLowerCase().includes(lowerCaseSearch) ||
      data?.sn?.toString().toLowerCase().includes(lowerCaseSearch)
    );
  });

  const DeleteProduct = (dataId) => {
    axios.delete(`${process.env.REACT_APP_BASE_URL}/deleteProduct?id=${dataId}`).then(() => {
      setProduct(product.filter((item) => dataId !== item._id));
      toast.success("Product Removed")
    });
  };
  const formatDateTime = (dateStr) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', options);
  };

  return (
    <div className="container-fluid">
      <div className="row my-3">
        <div className="col-lg-12 col-sm-12 d-flex justify-content-between">
          <div className="">
            <h1 className="p_head">
              Products List
            </h1>
          </div>
          <button className='excel_btn btn' onClick={onDownload}><FaDownload /></button>
          <div>
            <input
              type="search"
              className="w-100 form-control mb-2 mr-sm-2"
              placeholder="Search Anything"
              value={search}
              onChange={handleSearchInputChange}
            />
          </div>
        </div>
      </div>


      <div className='row px-0 py-3 user_row'>
        <div className='col'>
          {isLoading ? (
            <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }} >
              <Loader />
            </div>
          ) : (
            <>
              {filteredProduct.length > 0 && (
                <div className="table-responsive">
                  <table className="table table-bordered" ref={tableRef}>
                    <thead>
                      <tr>
                        <th>Sr#</th>
                        <th>Serial</th>
                        <th>Picture</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Sub Category</th>
                        <th>Price</th>
                        <th>Final Price</th>
                        <th>Discount</th>
                        <th>Date</th>
                        <th>Delete</th>
                        <th>Edit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredProduct.map((data, index) => (
                        <tr key={index} >
                          <td>{index + 1}</td>
                          <td>{data.sn}</td>
                          <td onClick={() => move("/single_Add/" + data._id)}>
                            <img src={data.images[0]} alt="No   network" style={{ maxWidth: '80px', height: '80px' }} />
                          </td>
                          <td onClick={() => move("/single_Add/" + data._id)}>{data.title}</td>
                          <td >{data.category}</td>
                          <td className='text-center'>
                            {data.subCategory === "select subCategory" ? "No subCategory" : data.subCategory}
                          </td>
                          <td className='text-center'>&pound; {data.price.toFixed(2)}</td>

                          <td className='text-center'>&pound; {data.Fprice.toFixed(2)}</td>
                          <td className='text-center'>{data.discount ? data.discount + '%' : '0%'}</td>
                          <td className='text-center'>{formatDateTime(data.date)}</td>
                          <td className='text-center'>
                            <button
                              className="delete_btn"
                              onClick={() => DeleteProduct(data._id)}>
                              <AiFillDelete />
                            </button>
                          </td>
                          <td className='text-center'>
                            <button
                              className="delete_btn" onClick={() => move(`/admin-dashboard-add-product/${data._id}`)}>
                              <FaPencilAlt />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </>
          )}
        </div>
      </div>


    </div>
  );
};
