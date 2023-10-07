import React, { useEffect, useState, useRef } from 'react';
import Loader from '../Loader/Loader';
import { AiFillDelete } from 'react-icons/ai';
import { FaDownload } from 'react-icons/fa'
import { useDownloadExcel } from 'react-export-table-to-excel';
import axios from 'axios';
import { toast } from 'react-toastify';
import './users.css';

export const Users = () => {
  const [Users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const tableRef = useRef(null);

  const { onDownload } = useDownloadExcel({
    currentTableRef: tableRef.current,
    filename: 'Users',
    sheet: 'Users'
  });

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BASE_URL}/Users`)
      .then((res) => {
        setUsers(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        // console.error("Error fetching data:", error);
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

  const DeleteUser = (dataId) => {
    axios.delete(`${process.env.REACT_APP_BASE_URL}/deleteUser?id=${dataId}`).then(() => {
      setUsers(Users.filter((item) => dataId !== item._id));
      toast.success("User removed");
    });
  };

  return (
    <>
      <div className='container-fluid'>
        <div className="row my-3">
          <div className="col-lg-12 col-sm-12 d-flex justify-content-between">
            <div className="">
              <h1 className="p_head">Users List</h1>
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
                {filteredUser.length > 0 && (
                  <div className="table-responsive">
                    <table className="table table-bordered" ref={tableRef}>
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
                        {filteredUser.map((data, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{data.name}</td>
                            <td>{data.email}</td>
                            <td>{data.number}</td>
                            <td>{data.date.slice(0, 19)}</td>
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
