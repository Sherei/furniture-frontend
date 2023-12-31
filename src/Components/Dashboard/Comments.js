import React, { useEffect, useState } from 'react';
import Loader from '../Loader/Loader';
import { AiFillDelete } from 'react-icons/ai';
import { FaDownload } from 'react-icons/fa'
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from "react-redux";
import axios from 'axios';

const Comments = () => {

    const allComments = useSelector((store) => store.Comment.comment);
    const dispatch = useDispatch()

    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState('');

    useEffect(() => {
        setLoading(true);
        try {
            axios
                .get(`${process.env.REACT_APP_BASE_URL}/Admincomments`, {
                    params: { search },
                }).then((res) => {
                    if (res) {
                        dispatch({ type: "ADD_COMMENT", payload: res.data });
                    }
                });
        } catch (e) {
        } finally {
            setLoading(false);
        }
    }, [search]);

    useEffect(() => {
        if (allComments) {
            setComments(allComments);
            setLoading(false);
        }
    }, [allComments]);

    const handleSearchInputChange = (e) => {
        setSearch(e.target.value);
    };

    const DeleteComment = async (dataId) => {
        try {
            setLoading(true);
            const resp = await axios.delete(
                `${process.env.REACT_APP_BASE_URL}/deleteComment?id=${dataId}`
            );
            if (resp.data.message === "success") {
                dispatch({
                    type: "ADD_COMMENT",
                    payload: resp.data.alldata,
                });
                toast.success("Item Removed");
            }
        } catch (e) {
            // console.log(e);
        } finally {
            setLoading(false);
        }
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


    return <>
        <div className="container">
            <div className="row my-3">
                <div className="col-lg-12 col-sm-12 d-flex justify-content-between">
                    <div className="">
                        <h1 className="p_head">
                            Comments List
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
                    {loading ? (
                        <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }} >
                            <Loader />
                        </div>
                    ) : comments.length === 0 ? (
                        <div className="col-12" style={{ height: "300px" }}>
                            <p className='text-center'>No Comment Found...</p>
                        </div>
                    ) : (
                        <>
                            {comments.length > 0 && (
                                <div className="table-responsive">
                                    <table className="table table-striped table-bordered table-hover">
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
                                            {comments.map((data, index) => (
                                                <tr key={index}>
                                                    <td>{index + 1}</td>
                                                    <td>{data.name}</td>
                                                    <td>{data.email}</td>
                                                    <td><textarea className='textarea' name="" id="" cols="30" rows="2" value={data.comment}></textarea></td>
                                                    <td className='text-center'>{formatDateTime(data.date)}</td>
                                                    <td className='text-center'>
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
}

export default Comments