import React from 'react'
import { FaArrowRight } from "react-icons/fa"
import "./blog.css"
import { useNavigate } from 'react-router-dom'
const Blog = () => {

    const move = useNavigate()

    return <>
        <div className='container-fluid p-0 min-vh-100'>
            <div className='row'>
                <div className='col'>
                    <h1 className='text-center'>Our Blog</h1>
                    <p className='text-center'>We prepared some helpful tips for you</p>
                    <div className='d-flex flex-wrap  gap-3 justify-content-center my-5 px-4 '>

                        <div className='block_main d-flex flex-column justify-content-center ' onClick={() => move("/single-blog/clean-sofa")}>
                            <div className='blog1 text-center'>
                                <img src="/blog1.webp" alt="" />
                            </div>
                            <p className='fw-bolder fs-5 text-center mt-4'>How to clean Sofa</p>
                            <p className='text-muted text-center mt-4 read'  >READ MORE</p>
                        </div>
                        <div className='block_main d-flex flex-column justify-content-center' onClick={() => move("/single-blog/perfect-bed")}>
                            <div className='blog2'>
                                <img src="/blog2.webp" alt="" />
                            </div>
                            <p className='fw-bolder fs-5 text-center mt-4'>How to choose a Perfect Bed</p>
                            <p className='text-muted text-center mt-4 read' >READ MORE</p>

                        </div>
                        <div className='block_main d-flex flex-column justify-content-center' onClick={() => move("/single-blog/perfect-sofa")}>
                            <div className='blog3'>
                                <img src="/blog3.webp" alt="" />
                            </div>
                            <p className='fw-bolder fs-5 text-center mt-4'>How to choose a Perfect Sofa</p>
                            <p className='text-muted text-center mt-4 read'  >READ MORE</p>

                        </div>
                    </div>
                   
                </div>
                <div className='col-lg-12 my-5 d-flex justify-content-center'>
                    <a href="/all-blog">
                        <button className='review_btn'>VIEW ALL POSTS <FaArrowRight/></button>
                    </a>
                </div>
            </div>
        </div>
    </>
}

export default Blog