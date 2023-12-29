import { getCartProduct } from '@/lib/cart';
import Image from 'next/image';
import Link from 'next/link';
import RemoveCart from './RemoveCart';

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

const Cart = async () => {

    const { lovedProducts } = await getCartProduct();

    return (
        <>
            {lovedProducts?.length === 0 || !lovedProducts
                ?
                <div className="w-full min-h-[60vh] flex items-center justify-center overflow-hidden px-4">
                    <h1 className='text-gray-900 text-3xl font-semibold text-center'>No <span className='text-primary'>Product</span> in <span className='text-pink-600'>Loved</span> products! </h1>
                </div>
                :

                lovedProducts?.map((item: LocalType) => (
                    <div key={item?.url} className="product_card w-[250px] flex-col items-start justify-center gap-[20px] my-[15px]  px-2 py-1 m-[10px]">
                        <Link href={item?.amazonUrl} target='_blank' className="w-[240px] h-[200px] overflow-hidden flex items-center justify-center mx-auto">
                            <Image className='w-[60%] scale_img' src={item.image} alt={item.title} width={400} height={400} />
                        </Link>
                        <div className="flex-col my-2 text-center">
                            <h1 className='text-md text-gray-900 font-semibold'>{item?.title.substring(0, 22)}..</h1>
                            <p className='text-sm mt-1'> {item?.currency} {item?.price}</p>
                            <RemoveCart url={item?.url} />
                        </div>
                    </div>
                ))
            }
        </>
    );
};

export default Cart;
