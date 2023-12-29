'use client'

import { addToCart } from '@/lib/cart'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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

    const handleStore = async () => {
        try {
            console.log('clicked')
            const response = await addToCart(localCart);
            if (response?.success) {
                toast.success('Product added to loved products!')
            }
            else {
                toast.error(response?.message || 'Error occured!')
            }
        } catch (error: any) {
            toast.error(error?.message);
        }
    };


    return (
        <button onClick={handleStore} className={`bg-red-500 text-white  py-2 px-4 rounded-full flex items-center text-center`}>
            <FontAwesomeIcon icon={faHeart} className=" w-[30px]" />
        </button>
    )
}

export default CartButton