import React from 'react'
import { useSelector } from 'react-redux'

const Home = () => {
    const state = useSelector(state => state)
    console.log(state);

    return (
        <>
            Home Page
        </>
    )
}

export default Home
