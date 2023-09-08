import React, { useState } from 'react';

export const Orders = () => {

  return (
    <>
      <div className='container-fluid'>
        <div className='row my-3'>
          <div className='col-lg-12 col-sm-12'>
            <h1 className='p_head' style={{ color: 'rgb(2, 2, 94)', fontWeight: '700' }}>
              Total Orders
            </h1>
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
