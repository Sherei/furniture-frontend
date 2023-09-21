import React from 'react'
import FadeLoader from "react-spinners/FadeLoader";

const Loader = () => {
    return <>
        <FadeLoader
            color="#1b2950"
            height={15}
            loading
            margin={5}
            radius={2}
            speedMultiplier={1}
            width={4}
        />
    </>
}

export default Loader