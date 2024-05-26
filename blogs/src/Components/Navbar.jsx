import React from 'react'
import { Link } from "react-router-dom";
const Navbar = () => {
    return (
        <div className='rounded-lg w-full mx-auto flex items-center justify-center p-2 bg-blue-300'>
            <ul className='items-center m-2'>
                <Link to={"/"}>
                    Blog Editor
                </Link>
            </ul>
        </div>
    )
}

export default Navbar
