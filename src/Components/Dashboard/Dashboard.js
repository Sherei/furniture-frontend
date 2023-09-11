import React, { useEffect, useState } from 'react';
import { FaUsers, FaClipboardList, FaFirstOrder, FaCommentDots } from "react-icons/fa";
import { MdProductionQuantityLimits } from "react-icons/md";
import { useNavigate } from 'react-router-dom';
import { Users } from "./Users"
import { AddProduct } from "./AddProduct"
import { Products } from "./Products"
import { Orders } from "./Orders"
import "./dashboard.css";
import Comments from './Comments';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Error } from '../Error/Error';

export const Dashboard = () => {

    let cu = useSelector(store => store.userSection.cu)
    const move = useNavigate()
    const [users, setUsers] = useState([])
    const [product, setProducts] = useState([])
    const [comment, setComments] = useState([])
    useEffect(() => {
        axios.get(`${process.env.REACT_APP_BASE_URL}/dashboard`).then((res) => {
            setUsers(res.data.Users)
            setProducts(res.data.Products)
            setComments(res.data.comments)
        })
    }, [])
    let data = [
        { title: "Total Orders", desc: "43", icon: <FaFirstOrder />, id: "order" },
        { title: "Total Users", desc: users.length, icon: <FaUsers />, id: "users" },
        { title: "Products", desc: product.length, icon: <FaClipboardList />, id: "product" },
        { title: "Comments", desc: comment.length, icon: <FaCommentDots />, id: "comment" },
        { title: "Add Product", icon: <MdProductionQuantityLimits />, id: "addproduct" },
    ];
    const handleItemClick = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    if (cu.email != "asd@gmail.com"){
        return <Error/>
    }else if(cu._id==undefined){
        return <Error/>
    }

        return (
            <>
                <div className='container-fluid'>

                    <div className='row px-3'>
                        <div className='col-lg-12 col-sm-12 py-4'>
                            <h1>Dashboard</h1>
                        </div>
                        {data.map((item) => {
                            return (
                                <div className='col-lg-3 col-sm-5 mb-3' key={item.title} onClick={() => handleItemClick(item.id)}>
                                    <div className='dash_card'>
                                        {item.title === "New Order" && (
                                            <div>
                                                <p className='color_card'>4+</p>
                                            </div>
                                        )}
                                        <div className='dash_icon' style={{ fontSize: "50px" }}>
                                            {item.icon}
                                        </div>
                                        <div className='dash_detail' style={{ fontSize: "20px" }}>
                                            <div>
                                                <p style={{ fontWeight: "600" }}>{item.title}</p>
                                            </div>
                                            <div className='d-flex justify-content-end px-3'>
                                                <p style={{ fontWeight: "600" }}>{item.desc}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}

                    </div>
                    <div className='col-lg-12 col-sm-12' id='order'>
                        <div className='row px-5 my-5 d-flex gap-5 justify-content-center'>
                            <Orders />
                        </div>
                    </div>

                    <div className='col-lg-12 col-sm-12' id='users'>
                        <div className='row px-5 my-5 d-flex gap-5 justify-content-center'>
                            <Users />
                        </div>
                    </div>

                    <div className='col-lg-12 col-sm-12' id='product'>
                        <div className='row px-5 my-5 d-flex gap-5 justify-content-center'>
                            <Products />
                        </div>
                    </div>
                    <div className='col-lg-12 col-sm-12' id='comment'>
                        <div className='row px-5 my-5 d-flex gap-5 justify-content-center'>
                            <Comments />
                        </div>
                    </div>

                    <div className='col-lg-12 col-sm-12' id='addproduct'>
                        <div className='row px-5 my-5 d-flex gap-5 justify-content-center'>
                            <AddProduct />
                        </div>
                    </div>

                </div>
            </>
        );
};
