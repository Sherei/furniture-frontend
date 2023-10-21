import React from 'react'
import { FaCheck } from "react-icons/fa"
import "./faq.css"
const Faq = () => {
    return <>
        <div className='container-fluid mx-0 border' id='faq'>
            <div className='row py-5'>
                <div className='col-12'>
                    <p className='faq_head2'>Questions Answers</p>
                    <p className='faq_head_detail'>We help our clients renew their business</p>
                </div>
                <div className='col-12'>
                    <div className='row faq_row_direction mt-3'>
                        <div className='col-lg-6 col-md-12 col-sm-12 d-flex justify-content-center'>
                            <div className="accordion accordian_col" id="accordionExample">
                                <div className="accordion-item mb-4">
                                    <h2 className="accordion-header custom_header">
                                        <button
                                            className="accordion-button"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseOne"
                                            aria-expanded="true"
                                            aria-controls="collapseOne"
                                        >
                                            <span className='accordian_counting'>1.</span> HOW CONSULTANCY EXPERTS WORK?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseOne"
                                        className="accordion-collapse collapse show"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body">
                                            <strong>This is the first item's accordion body.</strong> It is shown by
                                            default, until the collapse plugin adds the appropriate classes that we
                                            use to style each element. These classes control the overall appearance,
                                            as well as the showing and hiding via CSS transitions. You can modify
                                            any of this with custom CSS or overriding our default variables. It's
                                            also worth noting that just about any HTML can go within the{" "}
                                            <code>.accordion-body</code>, though the transition does limit overflow.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-4">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseTwo"
                                            aria-expanded="false"
                                            aria-controls="collapseTwo"
                                        >
                                            <span className='accordian_counting'>2.</span>  WHAT IS THE BEST ADVICE FOR GROWTH?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseTwo"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body">
                                            <strong>This is the second item's accordion body.</strong> It is hidden
                                            by default, until the collapse plugin adds the appropriate classes that
                                            we use to style each element. These classes control the overall
                                            appearance, as well as the showing and hiding via CSS transitions. You
                                            can modify any of this with custom CSS or overriding our default
                                            variables. It's also worth noting that just about any HTML can go within
                                            the <code>.accordion-body</code>, though the transition does limit
                                            overflow.
                                        </div>
                                    </div>
                                </div>
                                <div className="accordion-item mb-4">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseThree"
                                            aria-expanded="false"
                                            aria-controls="collapseThree"
                                        >
                                            <span className='accordian_counting'>3.</span> HOW TO IMPROVE YOUR BUSINESS?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseThree"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body">
                                            <strong>This is the third item's accordion body.</strong> It is hidden
                                            by default, until the collapse plugin adds the appropriate classes that
                                            we use to style each element. These classes control the overall
                                            appearance, as well as the showing and hiding via CSS transitions. You
                                            can modify any of this with custom CSS or overriding our default
                                            variables. It's also worth noting that just about any HTML can go within
                                            the <code>.accordion-body</code>, though the transition does limit
                                            overflow.
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item mb-4">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseFour"
                                            aria-expanded="false"
                                            aria-controls="collapseFour"
                                        >
                                            <span className='accordian_counting'>4.</span> HOW TO IMPROVE YOUR BUSINESS?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseFour"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body">
                                            <strong>This is the third item's accordion body.</strong> It is hidden
                                            by default, until the collapse plugin adds the appropriate classes that
                                            we use to style each element. These classes control the overall
                                            appearance, as well as the showing and hiding via CSS transitions. You
                                            can modify any of this with custom CSS or overriding our default
                                            variables. It's also worth noting that just about any HTML can go within
                                            the <code>.accordion-body</code>, though the transition does limit
                                            overflow.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-6 col-md-12 col-sm-12  my-3 d-flex justify-content-around flex-wrap align-items-end gap-4'>
                            <div>
                                <p><span className='mx-2' style={{ color: "rgba(45, 149, 253, 1)" }}><FaCheck /></span>Nsectetur cing elit.</p>
                                <p><span className='mx-2' style={{ color: "rgba(45, 149, 253, 1)" }}><FaCheck /></span>Suspe ndisse suscipit sagittis leo.</p>
                                <p><span className='mx-2' style={{ color: "rgba(45, 149, 253, 1)" }}><FaCheck /></span>Entum estibulum dignissim posuere.</p>
                                <p><span className='mx-2' style={{ color: "rgba(45, 149, 253, 1)" }}><FaCheck /></span>If you are going to use a passage</p>
                                <p><span className='mx-2' style={{ color: "rgba(45, 149, 253, 1)" }}><FaCheck /></span>If you are going to use a passage test data.</p>
                            </div>
                            <div className='faq_box'>
                                <p className='faq_box_number'>10</p>
                                <p>Years of <br /> experience</p>
                            </div>

                        </div>

                    </div>
                </div>

            </div>
        </div>

    </>
}

export default Faq