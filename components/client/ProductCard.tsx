import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
    product: Product
}

const ProductCard = ({ product }: Props) => {


    return (
        <Link href={`/product/${product._id}`} key={product._id} className="product_card w-[250px] flex-col items-start justify-center gap-[20px]  px-2 py-1 ">
            <div className="w-[240px] h-[240px] overflow-hidden flex items-center justify-center mx-auto">
                <Image className='w-[60%] scale_img ' src={product.image} alt={product.title} width={400} height={400} />
            </div>
            <div className="flex-col my-2 text-center">
                <h1 className='text-md text-gray-900 font-semibold'>{product?.title.substring(0, 22)}..</h1>
                <p className='text-sm mt-1 font-medium'> {product?.currency} {product?.currentPrice} <span className="line-through text-red-500 ml-3">{product.highestPrice}</span></p>
            </div>
        </Link>
    )
}

export default ProductCard