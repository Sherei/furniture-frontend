import React, { useEffect, useState, useRef } from 'react';
import Loader from '../Loader/Loader';
import { AiFillDelete } from 'react-icons/ai';
import axios from 'axios';
import { toast } from 'react-toastify';
import './users.css';

export const Users = () => {
  const [Users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/AdminUsers`, {
        params: { search },
      })
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        // console.error('Error fetching data:', error);
        setIsLoading(false);
      });
  }, [search]);

  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
  };

  const DeleteUser = (dataId) => {
    axios.delete(`${process.env.REACT_APP_BASE_URL}/deleteUser?id=${dataId}`).then(() => {
      setUsers(Users.filter((item) => dataId !== item._id));
      toast.success("User removed");
    });
  };

  const formatDateTime = (dateStr) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', options);
  };

  return (
    <>
      <div className='container'>
        <div className="row my-3">
          <div className="col-lg-12 col-sm-12 d-flex justify-content-between">
            <div className="">
              <h1 className="p_head">Users List</h1>
            </div>
            {/* <button className='excel_btn btn' onClick={onDownload}><FaDownload /></button> */}
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
            ) : Users.length === 0 ? (
              <div className="col-12" style={{ height: "300px" }}>
                <p className='text-center'>No User Found...</p>
              </div>
            ) : (
              <>
                {Users.length > 0 && (
                  <div className="table-responsive">
                    <table className="table table-striped table-bordered table-hover">
                      <thead>
                        <tr>
                          <th>Sr #</th>
                          <th>Name</th>
                          <th>Email</th>
                          {/* <th>Contact No</th> */}
                          <th>Date</th>
                          <th>Delete</th>
                        </tr>
                      </thead>
                      <tbody>
                        {Users.map((data, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            {/* <td>{data.number}</td> */}
                            <td className='text-center'>{formatDateTime(data.date)}</td>
                            <td className='text-center'>
                              <button className='delete_btn' onClick={() => DeleteUser(data._id)}>
                                <AiFillDelete />
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
    </>
  );
};
