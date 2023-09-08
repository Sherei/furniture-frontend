import React, { useState, useEffect } from 'react';
import { Bars } from 'react-loader-spinner';
import { AiFillDelete } from "react-icons/ai"
import axios from 'axios';

import "./users.css";

export const Users = () => {


  const [Users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('https://my-furniture-tau.vercel.app//Users')
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setIsLoading(false);
      });
  }, []);

  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredUser = Users.filter((data) => {
    const lowerCaseSearch = search.toLowerCase();

    return (
      data.name.toLowerCase().includes(lowerCaseSearch) ||
      data.email.toLowerCase().includes(lowerCaseSearch) ||
      data.number.toLowerCase().includes(lowerCaseSearch)
    );
  });


  return (
    <>
      <div className='container-fluid'>
      <div className="row my-3">
                <div className="col-lg-12 col-sm-12 d-flex justify-content-between">
                    <div className="">
                        <h1 className="p_head" style={{ color: 'rgb(2, 2, 94)', fontWeight: '700' }}>
                            Users List
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
        <div className='row px-0 py-3 user_row'>
          <div className='col'>
            <div className="table-container">
              <table className="table table-striped">
                <thead>
                  <tr>
                    <th>Sr #</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Contact No</th>
                    <th>Date</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }} >
                      <Bars
                        height="50"
                        width="80"
                        color="#1b2950"
                        ariaLabel="bars-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                        visible={true}
                      />
                    </div>
                  ) : (
                    filteredUser.length === 0 ? (
                      <div className="col-lg-12 col-sm-12 text-center mb-4">
                        <p>No matching products found.</p>
                      </div>
                    ) : (
                      filteredUser.map((data, index) => (
                        <tr key={index}>
                          <td>{index + 1}</td>
                          <td>{data.name}</td>
                          <td>{data.email}</td>
                          <td>{data.number}</td>
                          <td>{data.date.slice(0, 19)}</td>
                          <td>
                            <button className='delete_btn' onClick={() => {
                              axios.delete('https://my-furniture-tau.vercel.app//deleteUser?id=' + data._id).then(() => {
                                setUsers(Users.filter(item => data._id != item._id))
                              });
                            }}>
                              <AiFillDelete />
                            </button>
                          </td>
                        </tr>
                      ))
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
