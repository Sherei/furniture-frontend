import React, { useEffect, useState } from 'react';
import { Bars } from 'react-loader-spinner';
import { AiFillDelete } from 'react-icons/ai';
import axios from 'axios';

export const Products = () => {
  
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get('https://my-furniture-tau.vercel.app//product')
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
            <h1 className="p_head" style={{ color: 'rgb(2, 2, 94)', fontWeight: '700' }}>
              Products List
            </h1>
          </div>
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
              <div className="col-lg-12 col-sm-12 d-flex align-items-center justify-content-center" style={{ height: '50vh' }}>
                <Bars height="50" width="80" color="#1b2950" ariaLabel="bars-loading" wrapperStyle={{}} wrapperClass="" visible={true} />
              </div>
            ) : filteredProduct.length === 0 ? (
              <div className="col-lg-12 col-sm-12 text-center mb-4">
                <p>No matching products found.</p>
              </div>
            ) : (
              <table className="table table-striped">
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
                            axios.delete('https://my-furniture-tau.vercel.app//deleteProduct?id=' + data._id).then(() => {
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
