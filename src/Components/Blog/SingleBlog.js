import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { FaArrowRight } from "react-icons/fa"

const SingleBlog = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }, []);
    const { Name } = useParams()
    const move = useNavigate()
    return <>
        <div className='container min-vh-100 '>
            <div className='row mt-5'>
                <div className='col'>
                    {Name === "perfect-bed" && <>
                        <p className='text-center text-muted'>APR 10, 2023
                            JELENA PETKOVIC</p>
                        <h1 className='text-center fw-bolder'>How to Choose a Perfect Bed</h1>
                    </>
                    }
                    {Name === "perfect-sofa" &&
                        <>
                            <p className='text-center text-muted'>APR 10, 2023
                                JELENA PETKOVIC</p>
                            <h1 className='text-center fw-bolder'>How to Choose a Perfect Sofa</h1>
                        </>
                    }
                    {Name === "clean-sofa" &&
                        <>
                            <p className='text-center text-muted'>JUL 05, 2023
                                JELENA PETKOVIC</p>
                            <h1 className='text-center fw-bolder'>How to Clean Sofa</h1>
                        </>
                    }
                    {Name === "perfect-mattress" &&
                        <>
                            <p className='text-center text-muted'>JUL 05, 2023
                                JELENA PETKOVIC</p>
                            <h1 className='text-center fw-bolder'>How To Choose a Perfect Mattress</h1>
                        </>
                    }

                    {Name === "perfect-bed" &&
                        <>
                            <img
                                src="/3_1060x550_crop_center.webp"
                                className='mt-5 img-fluid'
                                alt="No Network"
                            />
                            <div className='my-5 px-5' >
                                <p className='m-auto'>
                                    Your bed is one of the most important pieces of furniture in your home, and choosing the right one can make a big difference in the overall look and feel of your bedroom. With so many different types of beds available, it can be overwhelming to select the perfect one for your space.
                                    Here are some tips to help you find the ideal bed that meets your needs and
                                    complements your decor.
                                </p>
                                <ol className='mt-4' style={{ width: "90%" }}>
                                    <li>
                                        <p>
                                            Determine your size requirements The first step in choosing a bed is determining what size you need. Consider the size of your bedroom and how much space you have available. Do you want a king, queen, full, or twin size bed? Keep in mind that the larger the bed,
                                            the more space it will take up in your room.
                                        </p>
                                    </li>
                                    <li >
                                        <p>
                                            Choose a style that complements your decor Beds come in a variety of styles, from traditional to modern.
                                            Think about the overall look and feel you want to create in your bedroom, and choose a style that complements your decor. If you have a traditional bedroom, for example, a sleigh bed or four-poster bed may be a good choice,
                                            while a platform bed may work well in a modern space.
                                        </p>
                                    </li>
                                    <li >
                                        <p>
                                            Consider the material and finish The material and finish of your bed can also make a big impact on the overall
                                            look of your bedroom. Consider the color and finish of your existing furniture and choose a bed that complements
                                            those elements. Wood beds are a classic choice, while metal beds can add a touch of modernity to your space.
                                        </p>
                                    </li>
                                    <li >
                                        <p>
                                            Think about storage options If you have limited storage space in your bedroom,
                                            a bed with built-in storage can be a great option. Some beds have drawers or shelves built into the frame,
                                            while others have a hydraulic lift system
                                            that allows you to lift up the mattress and access storage space underneath.
                                        </p>
                                    </li>
                                    <li >
                                        <p>
                                            Choose a comfortable mattress A comfortable mattress is just as important as the bed itself.
                                            When selecting a mattress, consider your preferred level of firmness and support. Do you prefer a softer mattress,
                                            or something more firm?
                                            Don't forget to consider factors such as allergies and back pain when choosing a mattress.
                                        </p>
                                    </li>
                                </ol>
                                <p className='m-auto' >
                                    With these tips in mind, you're ready to start shopping for the perfect bed for your bedroom.
                                    At Furniture Direct Online Store, we offer a wide variety of beds to fit any style and budget.
                                    Visit us today to find the bed that will be the centerpiece of your bedroom for years to come
                                </p>

                            </div>
                        </>
                    }
                    {Name === "clean-sofa" &&
                        <>

                            <img src="/Sofa_Claning_1060x550_crop_center.webp" className='mt-5 img-fluid' alt="No Network" />
                            <div className='my-5 px-5' >
                                <p className='m-auto'>
                                    Hey, <br /> <br />
                                    We understand a sofa is often a large investment and you want to make sure it lasts as long as possible. With proper care, a high-quality sofa can last many years.
                                    Here are some top tips to follow to care for your sofa and ensure it lasts longer.
                                    <br /> <br />
                                </p>
                                <ul className='mt-4' style={{ width: "90%" }}>
                                    <li>
                                        <p>
                                            <span className='fw-bolder'> Clean It Regularly</span> <br /> <br />
                                            Dirt can damage fabric over time, so make sure you clean your sofa regularly to remove dust and debris.
                                            Be gentle on the upholstery by using a special brush attachment with your vacuum.
                                            <br /> <br />
                                        </p>
                                    </li>
                                    <li >
                                        <p>
                                            <span className='fw-bolder'> Keep your sofa stain-free</span> <br /> <br />
                                            Clean up spills immediately to prevent stains from setting in.
                                            Blot liquids gently and don’t rub them in, and consider using an upholstery cleaner.
                                            <br /> <br />
                                        </p>
                                    </li>
                                    <li >
                                        <p>
                                            <span className='fw-bolder'>Keep out of direct sunlight</span> <br /> <br />
                                            Direct sunlight can fade fabric following prolonged exposure. Position your sofa away from windows,
                                            or block direct sunlight using blinds or curtains.
                                            <br /> <br />
                                        </p>
                                    </li>
                                    <li >
                                        <p>
                                            <span className='fw-bolder'>Use Throws</span><br /> <br />
                                            Protect high-contact areas like armrests by using throws.
                                            A good throw or blanket will also provide added protection from spills.
                                            <br /> <br />
                                        </p>
                                    </li>

                                </ul>
                                <p>
                                    Tags: <span style={{ borderBottom: "1px solid rgb(2, 2, 94)" }}>cleaning sofa, sofa maintenance</span>
                                </p>

                            </div>
                        </>
                    }

                    {Name === "perfect-sofa" &&
                        <>

                            <img src="/1_1060x550_crop_center.webp" className='mt-5 img-fluid' alt="No Network" />
                            <div className='my-5 px-5' >
                                <p className='m-auto'>
                                    A sofa is often the centerpiece of a living room and is where you and your
                                    family and friends will spend countless hours lounging and relaxing. With so many different styles, sizes, and materials to choose from, it can be overwhelming to select the perfect sofa for your home.
                                    Here are some tips to help you find the ideal sofa that meets your needs and complements your decor.
                                </p>
                                <ol className='mt-4' style={{ width: "90%" }}>
                                    <li>
                                        <p>
                                            Determine your style Before you start shopping for a sofa, it’s important to determine what style you want. Do you prefer a modern, minimalist look, or something more traditional? Are you drawn to bright colors or neutral tones?
                                            Knowing your style preferences will help you narrow down your options and make shopping for a sofa much easier.
                                        </p>
                                    </li>
                                    <li >
                                        <p>
                                            Consider the size and layout of your room The size of your room and its layout will also influence the type of sofa
                                            you choose. If you have a small living room, for example, you may want a smaller sofa or even a loveseat to avoid overcrowding the space. On the other hand, if you have a large living room,
                                            a sectional sofa or a larger sofa and armchair combination may be more appropriate.
                                        </p>
                                    </li>
                                    <li >
                                        <p>
                                            Determine the level of comfort you need Different people have different comfort preferences when
                                            it comes to sofas. Some people prefer a firmer seat, while others like something softer and more plush. Determine the level of comfort you need in a sofa,
                                            and make sure to test it out by sitting on it in the store or showroom before making a purchase.
                                        </p>
                                    </li>
                                    <li >
                                        <p>
                                            Choose a durable and easy-to-clean material Sofas come in a variety of materials, including leather,
                                            fabric, and microfiber. If you have kids or pets, it’s especially important to choose a material that is durable
                                            and easy to clean. Leather is a good choice for those who want a durable material that is easy to wipe clean,
                                            while microfiber is a popular choice for families with children because it is resistant to stains and spills.
                                        </p>
                                    </li>
                                    <li >
                                        <p>
                                            Don’t forget about the details The details of a sofa can make a big difference in its overall look and feel.
                                            Consider the armrests, the shape of the back, and the type of cushions used. Some sofas have high backs for added comfort and support, while others have lower backs for a more modern look. Think about
                                            how the sofa will fit into your overall decor and choose details that complement your existing furniture and style.
                                        </p>
                                    </li>
                                </ol>
                                <p >
                                    With these tips in mind, you’re ready to start shopping for the perfect sofa for your home.
                                    At Furniture Direct Online Store, we offer a wide variety of sofas to fit any style and budget.
                                    Visit us today to find the sofa that will be the centerpiece of your living room for years to come.
                                </p>

                            </div>
                        </>
                    }
                    {Name === "perfect-mattress" &&
                        <>

                            <img src="/2_1060x550_crop_center.webp" className='mt-5 img-fluid' alt="No Network" />
                            <div className='my-5 px-5' >
                                <p className='m-auto'>
                                    Are you in the market for a new mattress? With so many options available,
                                    it can be overwhelming to choose the perfect one for your needs. In this blog post,
                                    we'll guide you through the process of selecting a mattress that will provide you with the best possible sleep.
                                </p>
                                <ol className='mt-4' style={{ width: "90%" }}>
                                    <li>
                                        <p>
                                            Consider your sleeping position The position you sleep in affects the type of mattress you should choose.
                                            For example, if you sleep on your back, you will want a firmer mattress that provides good support for your spine.
                                            If you sleep on your side, you will want a softer mattress that allows your hips and shoulders to sink in a bit more. If you’re a stomach sleeper,
                                            you may want to consider a firmer mattress to prevent your spine from arching.  </p>
                                    </li>
                                    <li >
                                        <p>
                                            Determine your budget Mattresses can vary greatly in price, from a few hundred dollars to several thousand.
                                            Determine your budget before you start shopping so you can narrow down your options. Remember that a higher price doesn’t necessarily mean a better mattress –
                                            focus on finding one that meets your needs within your budget.
                                        </p>
                                    </li>
                                    <li >
                                        <p>
                                            Look for quality materials A good mattress should last you several years, so it’s important to choose one made
                                            with quality materials. Look for mattresses that are made with high-density foam or innerspring coils, as they
                                            tend to provide better support and durability. Be wary of mattresses made with cheap materials,
                                            as they may not last as long or provide the support you need.
                                        </p>
                                    </li>
                                    <li >
                                        <p>
                                            Try before you buy When shopping for a mattress, it’s important to actually lie down on it and try it out.
                                            Don’t be afraid to spend a few minutes on each mattress you’re considering to get a sense of its comfort level.
                                            If you’re shopping in-store, wear comfortable clothing and shoes you can easily slip off to lie down on each mattress. If you’re shopping online, make sure the store has a
                                            good return policy in case the mattress isn’t right for you.
                                        </p>
                                    </li>
                                    <li >
                                        <p>
                                            Consider additional features Finally, consider any additional features you may want in your mattress.
                                            For example, some mattresses come with cooling gel layers or extra padding for comfort. Others may have adjustable
                                            firmness levels or be designed to relieve pressure points.
                                            Determine what features are important to you and seek out mattresses that have them.
                                        </p>
                                    </li>
                                </ol>
                                <p >
                                    Now that you know how to choose the perfect mattress, it’s time to start shopping. At Furniture Direct Online Store, we offer a wide range of high-quality mattresses to fit any budget and sleeping style. Visit our store
                                    today or shop online to find the mattress that will provide you with the best possible sleep.
                                </p>
                            </div>
                        </>
                    }
                    <div className='my-5 text-center'>
                        <button className='btn review_btn' style={{width:"fit-content"}} onClick={() => move("/all-blog")}>VIEW ALL POSTS <FaArrowRight /></button>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default SingleBlog