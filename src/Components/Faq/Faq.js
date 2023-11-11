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
                                            style={{ textTransform: "capitalize" }}
                                        >
                                            <span className='accordian_counting' >1.</span> What payment methods do you accept?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseOne"
                                        className="accordion-collapse collapse show"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body">
                                            We accept major credit and debit cards (Visa, Mastercard, American Express),
                                            PayPal, and other secure online payment methods.
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
                                            style={{ textTransform: "capitalize" }}
                                        >
                                            <span className='accordian_counting'>2.</span> What are your shipping options and costs?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseTwo"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body">
                                            We offer various shipping options, including standard and expedited shipping.
                                            Shipping costs may vary based on the item's size, weight,
                                            and your location. You can calculate shipping costs during checkout.
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
                                            style={{ textTransform: "capitalize" }}
                                        >
                                            <span className='accordian_counting'>3.</span>Do you offer international shipping?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseThree"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body">
                                            Yes, we do offer international shipping. Shipping costs and delivery
                                            times may vary based on the destination. Please check during the checkout process for more details.
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
                                            style={{ textTransform: "capitalize" }}
                                        >
                                            <span className='accordian_counting'>4.</span>What is your return policy?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseFour"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body">
                                            We have a hassle-free return policy. If you're not satisfied with your purchase, you can return
                                            it within 7 days for a full refund or exchange. Certain items may have specific return conditions,
                                            so please review our return policy for more details.
                                        </div>
                                    </div>
                                </div>

                                <div className="accordion-item mb-4">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseFive"
                                            aria-expanded="false"
                                            aria-controls="collapseFive"
                                            style={{ textTransform: "capitalize" }}
                                        >
                                            <span className='accordian_counting'>5.</span>Are there any warranties on your furniture?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseFive"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body">
                                            Yes, many of our products come with warranties. The duration and coverage vary by item. You can find warranty
                                            information on the product page or contact our customer service for specific details.
                                        </div>
                                    </div>
                                </div>


                                <div className="accordion-item mb-4">
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target="#collapseSix"
                                            aria-expanded="false"
                                            aria-controls="collapseSix"
                                            style={{ textTransform: "capitalize" }}
                                        >
                                            <span className='accordian_counting'>6.</span>Can I cancel or modify my order after it's been placed?
                                        </button>
                                    </h2>
                                    <div
                                        id="collapseSix"
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#accordionExample"
                                    >
                                        <div className="accordion-body">
                                        We strive to process orders promptly, but if you need to make changes, 
                                        please contact our customer service as soon as possible. 
                                        Once an order is processed, modifications might not be possible.
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