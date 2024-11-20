import React from 'react'
import { products } from '../productitems'
import ProductCart from '../components/productCart'

const Home = () =>{
    return(
        <div>
            <h1 className='text-3xl my-5 ml-10'>List Products</h1>
            <div className='grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-5'>
                {products.map((product,key)=>
                <ProductCart key={key} data={product} />
                )}
            </div>
        </div>
    )
}

export default Home