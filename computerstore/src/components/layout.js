import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './header'
import Cart from './cart'
import '../App.css'

const Layout = () =>{
    return(
        <div className='container-layout'>
            <main className='m-auto'>
                <Header />
                <Outlet/>
            </main>
            <Cart />
        </div>
    )
}

export default Layout