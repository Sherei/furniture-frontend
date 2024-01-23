import React, { useEffect, useState } from 'react';
import { AiFillDelete } from 'react-icons/ai';
import { FaPencilAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../Loader/Loader';
import axios from 'axios';

const Blogs = () => {

    const [blog, setblog] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [search, setSearch] = useState('');

    let move = useNavigate()

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_BASE_URL}/blog`, {
                params: { search }
            })
            .then((res) => {
                setblog(res?.data);
                setIsLoading(false);
            })
            .catch((error) => {
                setIsLoading(false);
            });
    }, [search]);

    const handleSearchInputChange = (e) => {
        setSearch(e.target.value);
    };

    const Deleteblog = (dataId) => {
        axios.delete(`${process.env.REACT_APP_BASE_URL}/deleteBlog?id=${dataId}`).then(() => {
            setblog(blog.filter((item) => dataId !== item._id));
            toast.success("blog Removed")
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

    return <>
        <div className="container my-5">
            <div className="row">
                <div className="col-lg-12 col-sm-12 d-flex justify-content-between">
                    <div className="">
                        <h1 className="p_head">
                            Blog List
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

            <div className='row px-0'>
                <div className='col'>
                    {isLoading ? (
                        <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }} >
                            <Loader />
                        </div>
                    ) : blog.length === 0 ? (
                        <div className="col-12" style={{ height: "300px" }}>
                            <p className='text-center'>No Blog Found...</p>
                        </div>
                    ) : (
                        <>
                            {blog.length > 0 && (
                                <div className="table-responsive">
                                    <table className="table table-striped table-bordered table-hover">
                                        <thead>
                                            <tr>
                                                <th>Sr #</th>
                                                <th>Image</th>
                                                <th>Title</th>
                                                <th>Author</th>
                                                <th>Description</th>
                                                <th>Date</th>
                                                <th>Delete</th>
                                                <th>Edit</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {blog?.map((data, index) => (
                                                <tr key={index} >
                                                    <td>{index + 1}</td>
                                                    <td> <img src={data.image} className='rounded-3 img-fluid' style={{ maxWidth: '80px', height: '80px' }} alt="No Network" /></td>
                                                    <td>{data.title}</td>
                                                    <td>{data.author}</td>
                                                    <td>{data.description1}</td>
                                                    <td className='text-center'>{formatDateTime(data.date)}</td>
                                                    <td className='text-center'>
                                                        <button className='delete_btn' onClick={() => Deleteblog(data._id)}>
                                                            <AiFillDelete />
                                                        </button>
                                                    </td>
                                                    <td className='text-center'>
                                                        <button
                                                            className="delete_btn" onClick={() => move(`/admin-dashboard-add-blog/${data?._id}`)}
                                                            style={{ color: "rgb(2, 2, 94)" }}>
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
    </>
}

export default Blogs