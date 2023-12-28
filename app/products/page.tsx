import ProductCard from '@/components/client/ProductCard'
import { getProducts } from '@/lib/action';
import Link from 'next/link';
import React from 'react'

const page = async () => {
    const products = await getProducts();
    return (
        < section className="trending-section" >
            <h2 className="section-text">Prod<span className="text-primary">ucts</span> </h2>
            <div className="flex flex-wrap gap-x-6 gap-y-10  items-center justify-around">
                {
                    products?.map((product) =>
                        <ProductCard key={product._id} product={product} />
                    )
                }
            </div>
            <Link href={'/products'} className="text-white bg-green-500 px-6 py-3 text-md rounded-xl w-[170px] mx-auto text-center hover:bg-green-600 font-bold"> Explore more</Link>

        </section >
    )
}

export default page