import React, { useEffect, useState, useRef } from 'react';
import Loader from '../Loader/Loader';
import { AiFillDelete } from 'react-icons/ai';
import { FaDownload } from 'react-icons/fa';
import { useDownloadExcel } from 'react-export-table-to-excel';
import { toast } from 'react-toastify';
import axios from 'axios';


export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const tableRef = useRef(null);

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/order`)
      .then((res) => {
        setOrders(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, []);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Orders',
    sheet: 'Orders',
  });

  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
  };

  const updateStatus = (orderId, newStatus) => {
    axios
      .put(`${process.env.REACT_APP_BASE_URL}/updateStatus`, {
        id: orderId,
        status: newStatus,
      })
      .then(() => {
        const updatedOrders = orders.map((order) =>
          order._id === orderId ? { ...order, status: newStatus } : order
        );
        setOrders(updatedOrders);
        toast.success('Status updated');
      });
  };

  return (
    <>
      <div className='container-fluid'>
        <div className='row my-3'>
          <div className='col-lg-12 col-sm-12 d-flex justify-content-between'>
            <div className=''>
              <h1 className='p_head'>Orders List</h1>
            </div>
            <button className='excel_btn btn' onClick={onDownload}>
              <FaDownload />
            </button>
            <div>
              <input
                type='search'
                className='w-100 form-control mb-2 mr-sm-2'
                placeholder='Search Anything'
                value={search}
                onChange={handleSearchInputChange}
              />
            </div>
          </div>
        </div>
        <div className='row px-0 py-3 user_row'>
          <div className='col'>
            {isLoading ? (
              <div className='col-lg col-sm-12 d-flex align-items-center justify-content-center' style={{ height: '50vh' }}>
                <Loader />
              </div>
            ) : (
              <>
                {orders.length > 0 && (
                  <div className='table-responsive' style={{ backgroundColor: 'white', minHeight: '58vh' }}>
                    <table className='table table-bordered' ref={tableRef}>
                      <thead>
                        <tr className='text-center'>
                          <th>Sr#</th>
                          <th>OrderId</th>
                          <th>Status</th>
                          <th>Name</th>
                          <th>Email</th>
                          <th>Contact</th>
                          <th>Shipping</th>
                          <th>Products</th>
                          <th>Price</th>
                          <th>Date</th>
                          <th>Detail</th>
                        </tr>
                      </thead>
                      <tbody>
                        {orders.map((data, index) => {
                          const orderItemsLength = data.orderItems.length;
                          let totalFprice = 0;
                          data.orderItems.forEach((item) => {
                            totalFprice += parseFloat(item.Fprice);
                          });

                          const rowClassName = data.status === 'completed' ? 'completed-row' : '';

                          return (
                            <tr key={index} className={`text-center ${rowClassName}`}>
                              <td>{index + 1}</td>
                              <td>{data.orderId}</td>
                              <td>
                                 <select
                                  name=''
                                  id=''
                                  value={data.status}
                                  onChange={(e) => updateStatus(data._id, e.target.value)}
                                >
                                  <option value='pending'>Pending</option>
                                  <option value='completed'>Completed</option>
                                </select>

                              </td>
                              <td>{data.name1}</td>
                              <td>{data.email}</td>
                              <td>{data.number1}</td>
                              <td>{data.shipping}</td>
                              <td className='text-center'>{orderItemsLength}</td>
                              <td className='text-center'>{totalFprice.toFixed(2)}</td>
                              <td>{data.date.slice(0, 10)}</td>
                              <td className='text-center'>
                                <a href={`/order-detail/${data._id}`}>Detail</a>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
