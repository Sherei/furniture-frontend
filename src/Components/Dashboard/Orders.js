import React, { useEffect, useState, useRef } from 'react';
import FadeLoader from "react-spinners/FadeLoader";
import { AiFillDelete } from 'react-icons/ai';
import {FaDownload} from 'react-icons/fa'
import { useDownloadExcel } from 'react-export-table-to-excel';

export const Orders = () => {

  const [Orders, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Orders',
    sheet: 'Orders'
  })

  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <>
      <div className='container-fluid'>
        <div className='row my-3'>
        <div className="col-lg-12 col-sm-12 d-flex justify-content-between">
            <div className="">
              <h1 className="p_head">
                Orders List
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
        <div className='row px-0 py-3 user_row'>
          <div className='col'>
          <div className="table-container">
            <table className='table table-striped'>
              <thead>
                <tr>
                  <th>SN</th>
                  <th>Picture</th>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Sub Category</th>
                  <th>Address</th>
                  <th>Contact Number</th>
                  <th>Total Bill</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>12</td>
                  <td>Picture</td>
                  <td>Sofa</td>
                  <td>Sofas</td>
                  <td>Leather Recliner</td>
                  <td>Lahore</td>
                  <td>030670283643</td>
                  <td>41500</td>
                  <td >
                    <select className='select'>
                      <option value='Pending'>Pending</option>
                      <option value='Completed'>Completed</option>
                    </select>
                  </td>
                  <td>03-jul-23</td>
                </tr>
              </tbody>

            </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
