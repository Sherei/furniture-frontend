import React, { useEffect, useState } from 'react';
import { FaUsers, FaClipboardList, FaFirstOrder, FaCommentDots } from "react-icons/fa";
import { Users } from "./Users"
import { Products } from "./Products"
import { Orders } from "./Orders"
import Comments from './Comments';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Loader from '../Loader/Loader';
import { useNavigate } from 'react-router-dom';
import "./dashboard.css";

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
    const [isLoading, setIsLoading] = useState(true);

    let data = [
        { title: "Total Orders", desc: order.length, icon: <FaFirstOrder />, id: "order" },
        { title: "Total Users", desc: users.length, icon: <FaUsers />, id: "users" },
        { title: "Products", desc: product.length, icon: <FaClipboardList />, id: "product" },
        { title: "Comments", desc: comment.length, icon: <FaCommentDots />, id: "comment" },
    ];

    useEffect(() => {
        try {
            setIsLoading(true);
            axios.get(`${process.env.REACT_APP_BASE_URL}/dashboard`).then((res) => {
                setUsers(res.data.Users)
                setProducts(res.data.Products)
                setComments(res.data.comments)
                setOrder(res.data.allOrder)
            })
        } catch (e) { }
        finally {
            setIsLoading(false);
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
            <div className='container-fluid mb-5 mt-2'>
                <div className='row px-3'>
                    <div className="col-lg-12 col-sm-12 d-flex justify-content-between">
                        <h1 className="p_head">
                            Dashboard
                        </h1>
                    </div>
                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 row-cols-sm-2  g-4">
                        {isLoading ? (
                            <div className='col-lg-12 col-sm-12 d-flex align-items-center justify-content-center' style={{ height: "50vh" }}>
                                <Loader />
                            </div>
                        ) : (
                            data.map((item, index) => (
                                <div className='col' key={index} onClick={() => handleItemClick(item.id)}>
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
                                    {/* <div className='dash_card'>
                                        {item.title === "New Order" && (
                                            <div>
                                                <p className='color_card'>4+</p>
                                            </div>
                                        )}*/}
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div id='order'>
                    <div className='row my-5 d-flex gap-5 justify-content-center'>
                        <Orders />
                    </div>
                </div>

                <div  id='users'>
                    <div className='row my-5 d-flex gap-5 justify-content-center'>
                        <Users />
                    </div>
                </div>

                <div  id='product'>
                    <div className='row my-5 d-flex gap-5 justify-content-center'>
                        <Products />
                    </div>
                </div>
                <div  id='comment'>
                    <div className='row my-5 d-flex gap-5 justify-content-center'>
                        <Comments />
                    </div>
                </div>

            </div>
        </>
    );
};
