'use client'

import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

interface ShareType {
    url: string,
    title: string
}
interface LocalType extends ShareType {
    amazonUrl: string,
    price: string,
    currency: string,
    reviews: string,
    image: string
}

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const storedItems = localStorage.getItem('products');
        if (storedItems) {
            const parsedItems = JSON.parse(storedItems);
            setCartItems(parsedItems);
        }
    }, []);

    const removeFromCart = (index: number) => {
        const updatedCart = [...cartItems];
        updatedCart.splice(index, 1); // Remove the item at the specified index
        localStorage.setItem('products', JSON.stringify(updatedCart));
        setCartItems(updatedCart);
    };

    return (
        <>
            {cartItems?.length === 0
                ?
                <div className="w-full min-h-[60vh] flex items-center justify-center overflow-hidden px-4">
                    <h1 className='text-gray-900 text-3xl font-semibold text-center'>No <span className='text-primary'>Product</span> in <span className='text-pink-600'>Loved</span> products! </h1>
                </div>
                :

                cartItems?.map((item: LocalType, index) => (
                    <div key={index} className="product_card w-[250px] flex-col items-start justify-center gap-[20px] my-[15px]  px-2 py-1 m-[10px]">
                        <Link href={item?.amazonUrl} target='_blank' className="w-[240px] h-[200px] overflow-hidden flex items-center justify-center mx-auto">
                            <Image className='w-[60%] scale_img' src={item.image} alt={item.title} width={400} height={400} />
                        </Link>
                        <div className="flex-col my-2 text-center">
                            <h1 className='text-md text-gray-900 font-semibold'>{item?.title.substring(0, 22)}..</h1>
                            <p className='text-sm mt-1'> {item?.currency} {item?.price}</p>
                            <button
                                onClick={() => removeFromCart(index)} // Remove item from localStorage and state
                                className="bg-red-500 text-white px-4 py-1 my-2 rounded-full border-b-4 border-red-600 text-sm"
                            >
                                Remove
                            </button>
                        </div>
                    </div>
                ))


            }
        </>
    );
};

export default Cart;
