import { Product } from "@/types";
import Image from "next/image";
import Link from "next/link";

interface Props {
    product: Product
}

const ProductCard = ({ product }: Props) => {


    return (
        <Link href={`/product/${product._id}`} key={product._id} className="  xs:max-w-[90%] max-w-[350px]  xs:w-[90%] w-[350px] text-gray-900  px-[5px] py-[20px] rounded-md border-[0.3px] border-gray-100 ">
            <div>
                <Image src={product.image}
                    alt={product.title}
                    width={300}
                    height={300}
                    className="product-card_img" />
                <div className="relative px-4 -mt-12  ">
                    <div className="bg-white p-6 rounded-lg border-[0.3px] border-gray-200  ">
                        <div className="flex items-baseline">
                        </div>

                        <h4 className="my-2 text-md font-semibold uppercase  ">{product?.title.substring(0, 18)}...</h4>

                        <div className="mt-2 text-sm">
                            <h6 className="text-lg text-gray-900 font-bold ">{product.currency} {product.currentPrice}  <span className="text-red-600 text-sm ml-2"> <span className="line-through">{product.highestPrice}</span></span></h6>

                        </div>
                        <div className="mt-4  flex items-center justify-between">
                            <span className="text-green-500 text-md ">{product.reviewsCount} ratings </span>
                            <span className={`text-md ${product.isOutOfStock ? 'text-red-400' : "text-green-400"}`}>{product.isOutOfStock ? 'Out of Stock' : 'In Stock'} </span>
                        </div>
                    </div>
                </div>

            </div>
        </Link>
    )
}

export default ProductCard