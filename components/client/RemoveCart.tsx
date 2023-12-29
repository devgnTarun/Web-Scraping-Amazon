'use client'

import { removeFromCart } from '@/lib/cart';
import React from 'react'
import toast from 'react-hot-toast';

const RemoveCart = (url: any) => {
    const handleClick = async () => {
        try {
            const response = await removeFromCart(url);
            if (response.success) {
                toast.success('Product removed from cart!');
            }
            else {
                toast.error(response?.message);
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <button
            onClick={handleClick} // Remove item from localStorage and state
            className="bg-red-500 text-white px-4 py-1 my-2 rounded-full border-b-4 border-red-600 text-sm"
        >
            Remove
        </button>
    )
}

export default RemoveCart