import React, { useEffect, useState } from 'react';
import { FaUsers, FaClipboardList, FaFirstOrder, FaCommentDots, FaBlog } from "react-icons/fa";
import { Users } from "./Users"
import { Products } from "./Products"
import { Orders } from "./Orders"
import Comments from './Comments';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';
import "./dashboard.css";
import Blogs from './Blogs';

export const Dashboard = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0
        });
    }, []);

    let cu = useSelector(store => store.userSection.cu)
    const move = useNavigate()

    const [users, setUsers] = useState([])
    const [product, setProducts] = useState([])
    const [comment, setComments] = useState([])
    const [order, setOrder] = useState([])
    const [blog, setBlog] = useState([])
    const [isLoading, setIsLoading] = useState(true);

    let data = [
        { title: "Total Orders", desc: order.length, icon: <FaFirstOrder />, id: "order" },
        { title: "Total Users", desc: users.length, icon: <FaUsers />, id: "users" },
        { title: "Products", desc: product.length, icon: <FaClipboardList />, id: "product" },
        { title: "Comments", desc: comment.length, icon: <FaCommentDots />, id: "comment" },
        { title: "Blogs", desc: blog.length, icon: <FaBlog />, id: "blog" },
    ];

    useEffect(() => {
        try {
            axios.get(`${process.env.REACT_APP_BASE_URL}/dashboard`).then((res) => {
                setUsers(res.data.Users)
                setProducts(res.data.Products)
                setComments(res.data.comments)
                setOrder(res.data.allOrder)
                setBlog(res.data.allBlog)
            })
        } catch (e) { }finally{
            setIsLoading(false)
        }
    }, [])


    const handleItemClick = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // if (cu.email != "asd@gmail.com") {
    //     return move('/')
    // } else if (cu._id === undefined) {
    //     return move('/')
    // }

    return (
        <>
            <div className='container my-3'>
                <div className='row'>
                    <div className="col-lg-12 col-sm-12 d-flex justify-content-between">
                        <h1 className="p_head">
                            Dashboard
                        </h1>
                    </div>
                </div>
                <div className='row row-cols-1 row-cols-md-3 row-cols-lg-4 row-cols-sm-2 g-3'>
                    {isLoading ? (
                        <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }}>
                            <Loader />
                        </div>
                    ) : (data.map((item, index) => {
                        return <div className='col' key={index} onClick={() => handleItemClick(item.id)}>
                            <div className='p-3 admin_card'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <div>
                                        <p className='admin_card_title'>{item.title}</p>
                                        <p className='admin_card_number'>{item.desc}</p>
                                    </div>
                                    <div className='card_icon'>
                                        {item.icon}
                                    </div>
                                </div>
                            </div>
                        </div>
                    })
                    )}
                </div>
                <div className='row'>
                    <div className='col-12' id='order'>
                        <Orders />
                    </div>
                    <div className='col-12' id='users'>
                        <Users />
                    </div>
                    <div className='col-12' id='product'>
                        <Products />
                    </div>
                    <div className='col-12' id='comment'>
                        <Comments />
                    </div>
                    <div className='col-12' id='blog'>
                        <Blogs />
                    </div>
                </div>
            </div>
        </>
    );
};
