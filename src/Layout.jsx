import React from 'react'
import Navbar from './Components/Navbar'
import { Outlet } from 'react-router-dom'

const Layout = () => {
    return (
        <>
            <div className='bg-gray-300 min-h-[100vh]'>
                <Navbar />
                <Outlet />
            </div>
        </>
    )
}

export default Layout