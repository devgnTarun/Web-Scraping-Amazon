'use client'

import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

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

const CartButton = ({ localCart }: { localCart: LocalType }) => {

    const [cartItems, setCartItems] = useState<LocalType[]>([]);

    useEffect(() => {
        const storedItems = localStorage.getItem('products');
        if (storedItems) {
            const parsedItems: LocalType[] = JSON.parse(storedItems);
            setCartItems(parsedItems);
        }
    }, []);

    const isProductInCart = (productId: string) => {
        return cartItems.some(item => item.url === productId);
    };
    const handleStore = () => {
        const productId = localCart.url;
        if (!isProductInCart(productId)) {
            const updatedCart = [...cartItems, localCart];
            localStorage.setItem('products', JSON.stringify(updatedCart));
            setCartItems(updatedCart);
            toast.success('Product added to loved products');
        } else {
            toast.error('Product already exists in loved products');
        }
    };


    return (
        <button onClick={handleStore} className={`bg-red-500 text-white  py-2 px-4 rounded-full flex items-center text-center`}>
            <FontAwesomeIcon icon={faHeart} className=" w-[30px]" />
        </button>
    )
}

export default CartButton