import React, { useEffect, useState, useRef } from 'react';
import Loader from '../Loader/Loader';
import { AiFillDelete } from 'react-icons/ai';
import { FaDownload } from 'react-icons/fa'
import { useDownloadExcel } from 'react-export-table-to-excel';
import { toast } from 'react-toastify';
import axios from 'axios';

export const Orders = () => {

  const [Orders, setOrder] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState('');
  const tableRef = useRef(null);

  
  useEffect(() => {
    axios
        .get(`${process.env.REACT_APP_BASE_URL}/comments`)
       
        .then((res) => {
          setOrder(res.data);
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
    sheet: 'Orders'
  })

  const handleSearchInputChange = (e) => {
    setSearch(e.target.value);
  };

  const filteredOrders = Orders.filter((data) => {

    const lowerCaseSearch = search.toLowerCase();
    return (
        data.name.toLowerCase().includes(lowerCaseSearch) ||
        data.email.toLowerCase().includes(lowerCaseSearch) ||
        data.comment.toLowerCase().includes(lowerCaseSearch)
    );
});

const DeleteComment = (dataId) => {
    axios.delete(`${process.env.REACT_APP_BASE_URL}/deleteComment?id=${dataId}`).then(() => {
        setOrder(Orders.filter((item) => dataId !== item._id));
        toast.success("comment removed")
    });

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
                    {isLoading ? (
                        <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }} >
                            <Loader />
                        </div>
                    ) : (
                        <>
                            {filteredOrders.length > 0 && (
                                <div className="table-responsive">
                                    <table className="table table-bordered" ref={tableRef}>
                                        <thead>
                                            <tr>
                                                <th>Sr#</th>
                                                <th>Name</th>
                                                <th>Email</th>
                                                <th>Comment</th>
                                                <th>Date</th>
                                                <th>Dalete</th>
                                            </tr>

                                        </thead>
                                        <tbody>
                                            {filteredOrders.map((data, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.email}</td>
                                                    <td><textarea className='textarea' name="" id="" cols="30" rows="2" value={data.comment}></textarea></td>
                                                    <td>{data.date.slice(0, 19)}</td>
                                                    <td>
                                                        <button className="delete_btn" onClick={() => DeleteComment(data._id)}>
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
