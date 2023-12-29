import Modal from "@/components/client/Modal";
import PriceInfoCard from "@/components/client/PriceInfoCard";
import ProductCard from "@/components/client/ProductCard";
import { getProductById, getSimilarProduct } from "@/lib/action"
import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faChartLine, faDollarSign } from '@fortawesome/free-solid-svg-icons';
import { redirect } from "next/navigation";
import ShareButton from "@/components/client/ShareButton";
import CartButton from "@/components/client/CartButton";


type Props = {
    params: { id: string }
}

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

const page = async ({ params: { id } }: Props) => {

    const product = await getProductById(id);

    if (!product) redirect('/');

    const similarProduct = await getSimilarProduct(id);

    const shareProduct: ShareType = {
        url: product._id,
        title: product?.title
    }

    const CartProduct: LocalType = {
        url: product?.url || '',
        title: product?.title || '',
        price: product?.currentPrice || '',
        currency: product?.currency || '',
        reviews: product?.reviewsCount || '',
        amazonUrl: product?.affilateUrl || '',
        image: product?.image || ''
    }

    // Convert to a JSON-friendly format
    const shareProductJSON = JSON.parse(JSON.stringify(shareProduct));

    return (
        <div className="container mx-auto p-4">
            {/* Product Image */}
            <Image src={product?.image} alt="Product" className="rounded-lg  w-[300px] mb-4 object-cover mx-auto" width={500} height={500} />

            {/* Product Title */}
            <h2 className="text-xl font-bold my-2 text-center">{product?.title}</h2>

            {/* Buttons and Ratings */}
            <div className="flex items-center gap-[10px] my-6 w-[90%] mx-auto">
                <CartButton localCart={CartProduct} />
                <ShareButton shareProducts={shareProductJSON} />
                <div className="flex items-center ml-auto w-[130px]">
                    <FontAwesomeIcon icon={faStar} className="text-yellow-500 mr-1 w-[25px]" />
                    <span>{product.reviewsCount} ratings</span>
                </div>
            </div>

            {/* Price Section */}
            <div className="flex items-center space-x-4 mb-4 justify-center flex-wrap gap-y-4 gap-x-8">
                <div className="flex items-center w-[200px] h-[110px] bg-gray-200 justify-center rounded-lg border-t-2 border-gray-300">
                    <FontAwesomeIcon icon={faChartLine} className="text-gray-500 w-[25px]" />
                    <span className="ml-2">Highest:  {product.currency} {product.highestPrice}</span>
                </div>
                <div className="flex items-center w-[200px] h-[110px] bg-gray-200 justify-center rounded-lg border-t-2 border-gray-300">
                    <FontAwesomeIcon icon={faChartLine} className="text-gray-500 w-[25px]" />
                    <span className="ml-2">Lowest:  {product.currency} {product.lowestPrice} </span>
                </div>
                <div className="flex items-center w-[200px] h-[110px] bg-gray-200 justify-center rounded-lg border-t-2 border-gray-300">
                    <FontAwesomeIcon icon={faChartLine} className="text-gray-500 w-[25px]" />
                    <span className="ml-2">Average: {product.currency} ${formatNumber(product.averagePrice)}</span>
                </div>
                <div className="flex items-center w-[200px] h-[110px] bg-gray-200 justify-center rounded-lg border-t-2 border-gray-300">
                    <FontAwesomeIcon icon={faDollarSign} className="text-green-500 w-[25px]" />
                    <span className="ml-2">Current:  {product.currency} {product.currentPrice}</span>
                </div>
            </div>

            <div className="flex gap-[15px] items-center justify-center">
                {/* Track Button */}
                <Modal productId={id} />
                {/* Buy Button */}
                <Link href={product.affilateUrl || product.url} target='_blank' className="bg-green-500 text-white px-6 py-3 rounded-full mb-4 block w-[130px] text-center my-5 text-sm">
                    Buy Now
                </Link>
            </div>
            {/* Description */}
            <div className="my-6 w-[90%] mx-auto">
                {/* Your product description goes here */}
                {product?.description}
            </div>



            {
                similarProduct && similarProduct?.length > 0 && (
                    <div className="py-14 flex flex-col gap-2 w-full">
                        <p className="section-text">Similar Products</p>

                        <div className="flex flex-wrap gap-10 mt-7 w-full">
                            {
                                similarProduct.map((product) =>
                                    <ProductCard product={product} key={product._id} />
                                )
                            }          </div>
                    </div>
                )}
        </div>
    )
}

export default page