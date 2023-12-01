import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className="w-full min-h-[90vh] flex items-center justify-center">
            <form className="xs:w-[300px] w-[400px] flex-col py-8 px-4 ">
                <input type="email" placeholder='Enter your email!' className='searchbar-input my-2 mt-8' />
                <input type="password" placeholder='Enter you password!' name="Password" className='searchbar-input my-2' />
                <button className="searchbar-btn w-full my-5">Login</button>
                <Link href="/register" className='text-gray-500 py-4 text-xs'>⭐ Don't Account? Register</Link>
            </form>
        </div>
    )
}

export default page