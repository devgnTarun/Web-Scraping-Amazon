import React from 'react'
import CartCard from '../../components/client/CartCard'
import Link from 'next/link'

const page = () => {
    return (
        <div className="w-full max-w-[1000px] mx-auto min-h-screen pt-[50px]">
            <h1 className='text-black text-4xl font-bold mx-auto text-center'>Loved <span className='text-primary'>Products</span></h1>
            <div className="w-[90%] mx-auto flex flex-wrap items-center justify-center my-[30px]">
                <CartCard />
            </div>
            <div className="w-full  mt-[30px] text-center" >

                <Link className='text-md text-white bg-green-500 mx-auto px-8 py-3 border-b-4 border-green-600 rounded-full' href={'/'}>Explore more</Link>
            </div>
        </div>
    )
}

export default page