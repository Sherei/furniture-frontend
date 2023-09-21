import React, { useEffect, useState, useRef } from 'react';
import Loader from '../Loader/Loader';
import { AiFillDelete } from 'react-icons/ai';
import {FaDownload} from 'react-icons/fa'
import { useDownloadExcel } from 'react-export-table-to-excel';
import axios from 'axios';

export const Products = () => {

  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Products',
    sheet: 'Products'
  })

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/product`)
      // .get("/product")
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredProduct = product.filter((data) => {
    const lowerCaseSearch = search.toLowerCase();
    return (
      data.title.toLowerCase().includes(lowerCaseSearch) ||
      data.category.toLowerCase().includes(lowerCaseSearch) ||
      data.subCategory.toLowerCase().includes(lowerCaseSearch) ||
      data.sn.toString().toLowerCase().includes(lowerCaseSearch)
    );
  });

  return (
    <div className="container-fluid">
      <div className="row my-3">
        <div className="col-lg-12 col-sm-12 d-flex justify-content-between">
          <div className="">
            <h1 className="p_head">
              Products List
            </h1>
          </div>
            <button className='excel_btn btn' onClick={onDownload}><FaDownload/></button>
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
      <div className="row px-0 py-3 user_row">
        <div className="col">
          <div className="table-container">
            {isLoading ? (
             <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }} >
             <Loader />
           </div>
            ) : filteredProduct.length === 0 ? (
              <div className="col-lg-12 col-sm-12 text-center mb-4">
                <p>No matching products found.</p>
              </div>
            ) : (
              <table className="table table-striped" ref={tableRef}>
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
                  </tr>
                </thead>
                <tbody>
                  {filteredProduct.map((data, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{data.sn}</td>
                      <td>
                        <img src={data.images[0]} alt="No network" style={{ maxWidth: '80px', height: '80px' }} />
                      </td>
                      <td>{data.title}</td>
                      <td>{data.category}</td>
                      <td>{data.subCategory}</td>
                      <td>{data.price}</td>
                      <td>{data.Fprice}</td>
                      <td>{data.discount || 0}</td>
                      <td>{data.date.slice(0, 19)}</td>
                      <td>
                        <button
                          className="delete_btn"
                          onClick={() => {
                            axios.delete('https://my-furniture-tau.vercel.app/deleteProduct?id=' + data._id).then(() => {
                              setProduct(product.filter((item) => data._id !== item._id));
                            });
                          }}
                        >
                          <AiFillDelete />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
