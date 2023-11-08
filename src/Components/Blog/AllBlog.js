import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

const AllBlog = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);
    const move = useNavigate()

    return <>
        <div className='container-fluid min-vh-100 my-5'>
            <div className='row'>
                <div className='col'>
                    <h1 className='text-center fw-bolder'>Blog Posts</h1>
                    <p className='text-center text-muted'>November 08, 2023</p>
                    <div className='d-flex  flex-wrap gap-3 justify-content-center my-5 px-4  '>
                        <div className='block_main mt-5' onClick={() => move("/single-blog/clean-sofa")}>
                            <div className='blog1'>
                                <img src="/blog1.webp" alt="" />
                            </div>
                            <p className='text-muted text-center mt-4'>JULY 05 2023</p>

                            <p className='fw-bolder fs-5 text-center mt-4'>How to clean Sofa</p>
                            <p className='text-center mt-2'>
                                Hey, We understand a sofa is often a large investment and you want
                                to make sure it lasts as long as possible. With proper care, a high-quality sofa can last...
                            </p>
                            <p className='text-muted text-center mt-4 read'  >READ MORE</p>
                        </div>
                        <div className='block_main mt-5' onClick={() => move("/single-blog/perfect-bed")}>
                            <div className='blog2'>
                                <img src="/blog2.webp" alt="" />
                            </div>
                            <p className='text-muted text-center mt-4'>APRIL 10 2023</p>

                            <p className='fw-bolder fs-5 text-center mt-4'>How to choose a Perfect Bed</p>
                            <p className='text-center mt-2'>
                                Your bed is one of the most important pieces of furniture in your home,
                                and choosing the right one can make a big difference in the overall look and feel...
                            </p>
                            <p className='text-muted text-center mt-4 read' >READ MORE</p>

                        </div>
                        <div className='block_main mt-5' onClick={() => move("/single-blog/perfect-sofa")}>
                            <div className='blog3'>
                                <img src="/blog3.webp" alt="" />
                            </div>
                            <p className='text-muted text-center mt-4'>APRIL 10 2023</p>
                            <p className='fw-bolder fs-5 text-center mt-4'>How to choose a Perfect Sofa</p>
                            <p className='text-center mt-2'>
                                A sofa is often the centerpiece of a living room and is where you and your family and friends will spend
                                countless hours lounging and relaxing. With so many different...
                            </p>
                            <p className='text-muted text-center mt-4 read'  >READ MORE</p>
                        </div>
                        <div className='block_main mt-5' onClick={() => move("/single-blog/perfect-mattress")}>
                            <div className='blog4'>
                                <img src="/blog4.webp" alt="" />
                            </div>
                            <p className='text-muted text-center mt-4'>APRIL 10 2023</p>
                            <p className='fw-bolder fs-5 text-center mt-4'>How to choose a Perfect Mattress</p>
                            <p className='text-center mt-2'>
                                Are you in the market for a new mattress? With so many options available, it can be overwhelming to
                                choose the perfect one for your needs. In this blog post,...
                            </p>
                            <p className='text-muted text-center mt-4 read'  >READ MORE</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default AllBlog