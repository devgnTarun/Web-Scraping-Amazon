import Modal from "@/components/client/Modal";
import PriceInfoCard from "@/components/client/PriceInfoCard";
import ProductCard from "@/components/client/ProductCard";
import { getProductById , getSimilarProduct} from "@/lib/action"
import { formatNumber } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";


type Props = {
    params: { id: string }
}

const page = async ({ params: { id } }: Props) => {

    const product = await getProductById(id);

    if (!product) redirect('/');

    const similarProduct = await getSimilarProduct(id)

    return (
        <div className="product-container">
            <div className="flex gap-28 xl:flex-row flex-col">
                <div className="product-image">
                    <Image
                        src={product.image}
                        alt={product.title}
                        width={500}
                        height={400}
                        className="mx-auto" />
                </div>

                <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start gap-5 flex-wrap pb-6">
                        <div className="flex flex-col gap-3">
                            <p className="text-[28px] text-secondary font-semibold">
                                {product.title}
                            </p>

                            <Link href={product.url} target='_blank' className="text-black text-base opacity-50" />
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="product-hearts">
                                <Image
                                    src={'/assets/icons/red-heart.svg'}
                                    alt='heart'
                                    width={20}
                                    height={20} />
                                <p className="text-base font-semibold text-[#D46F77]">
                                    {product.reviewsCount}
                                </p>
                            </div>

                            <div className="p-2 bg-white-200 rounded-10">
                                <Image
                                    src={'/assets/icons/bookmark.svg'}
                                    alt="bookmark"
                                    width={20}
                                    height={20}
                                />
                            </div>

                            <div className="p-2 bg-white-200 rounded-10">
                                <Image
                                    src={'/assets/icons/share.svg'}
                                    alt="bookmark"
                                    width={20}
                                    height={20}
                                />
                            </div>
                        </div>
                    </div>

                    <div className="product-info">
                        <div className="flex flex-col gap-2">
                            <p className="text-[34px] text-secondary font-bold">
                                {product.currency} {formatNumber(product.currentPrice)}
                            </p>

                            <p className="text-[21px] text-black opacity-50 line-through">
                                {product.currency} {formatNumber(product.originalPrice)}
                            </p>
                        </div>

                        <div className="flex flex-col gap-4">
                            <div className="flex gap-3 ">
                                <div className="product-stars">
                                    <Image src='/assets/icons/star.svg' alt='stars' width={16} height={16} />
                                    <p className="text-sm text-primary-orange font-semibold">
                                        {product.stars || '25'}
                                    </p>
                                </div>

                                <div className="product-reviews">
                                    <Image src='/assets/icons/comment.svg' alt='stars' width={16} height={16} />
                                    <p className="text-sm text-secondary font-semibold">
                                        {product.reviewsCount}
                                    </p>
                                </div>

                            </div>
                            <p className="text-sm text-black opacity-50">
                                <span className="text-primary-green font-semibold">
                                    93%
                                </span> of buyers recommended this!
                            </p>
                        </div>
                    </div>

                    {/* price cards  */}
                    <div className="my-7 flex flex-col gap-5">
                        <div className="flex flex-wrap gap-5">
                                <PriceInfoCard
                                title='Current Price'
                                icon='/assets/icons/price-tag.svg'
                                value={`${product.currency} ${formatNumber(product.currentPrice)}`}
                                />
                                <PriceInfoCard
                                title='Average Price'
                                icon='/assets/icons/chart.svg'
                                value={`${product.currency} ${formatNumber(product.averagePrice)}`}
                                />
                                <PriceInfoCard
                                title=' Lowest Price'
                                icon='/assets/icons/arrow-down.svg'
                                value={`${product.currency} ${formatNumber(product.lowestPrice)}`}
                                />
                                <PriceInfoCard
                                title='Highest Price'
                                icon='/assets/icons/arrow-up.svg'
                                value={`${product.currency} ${formatNumber(product.highestPrice)}`}
                                />
                        </div>
                    </div>
                    <Modal productId={id}/>
                </div>
            </div>

            <div className="flex flex-col gap-16 ">
                <div className="flex flex-col gap-5">
                    <h3 className="text-2xl text-secondary font-semibold">
                        Product Description
                    </h3>

                    <div className="flex flex-col gap-4">
                        {product?.description}
                    </div>
                </div>
                <button className="btn w-fit mx-auto flex items-center justify-center gap-3 min-w-[200px]">
                    <Image src='/assets/icons/bag.svg' alt='bag' width={22} height={22}/>
                    <Link target="_blank" href={product.affilateUrl  ||product.url} className="text-base text-white">
                        Buy Now
                    </Link>
                </button> 
            </div>
            {
                similarProduct && similarProduct?.length > 0 && (
                    <div className="py-14 flex flex-col gap-2 w-full">
                        <p className="section-text">Similar Products</p>

                        <div className="flex flex-wrap gap-10 mt-7 w-full">
                            {
                                similarProduct.map((product) => 
                                <ProductCard product={product} key={product._id}/>
                                )
                            }
                        </div>
                    </div>
                )}
        </div>
    )
}

export default page