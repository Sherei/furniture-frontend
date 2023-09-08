import React from 'react'
import "./error.css"
import { useNavigate } from 'react-router'

export const Error = () => {

    let move=useNavigate()
    return (
        <div className='container-fluid my-5 error_container'>
            <div className='row'>
                <div className='col-lg-12 col-sm-12 d-flex flex-column justify-content-center align-items-center '>
                    <h1>
                        404
                        </h1>
                    <h2>
                        Uh Oh! You're Lost.
                    </h2>
                    <p>
                        The page you are looking for does not exist. <br />
                        How you got here is a mystery. But you can click the button to go back to the homePage
                    </p>
                    <button className='mt-2 error_btn' onClick={()=>{
                        move("/")
                    }}>Home</button>
                </div>


            </div>

        </div>
    )
}
