import Carousel from "@/components/client/Carousel";
import SearchBar from "@/components/client/SearchBar";
import Image from "next/image";
import { getProducts } from "@/lib/action";
import ProductCard from "@/components/client/ProductCard";


export default async function Home() {

  const products = await getProducts();

  return (
    <>
      <section className="px-6 md:px-20 py-24 border-2">
        <div className="flex max-xl:flex-col gap-16">
          <div className="flex flex-col justify-center">
            <p className="small-text">
              Smart Shopping Starts Here :
              <Image src={'/assets/icons/arrow-right.svg'}
                alt="arror"
                width={16}
                height={16}
              />
            </p>
            <h1 className="head-text">
              Unleash the power of <span className="text-primary">BuyingSense</span>
            </h1>
            <p className="mt-6">
              Powerfull self-serving product, which notify you when your favourite product price comes in stock or goes to lowest year price.
            </p>
            <SearchBar />
          </div>

          <Carousel />
        </div>
      </section>

      <section className="trending-section">
        <h2 className="section-text">Trending</h2>
        <div className="flex flex-wrap gap-x-8 gap-y-16">
          {
            products?.map((product) =>  
               <ProductCard key={product._id} product={product}/>
            )
          }
        </div>
      </section>
    </>
  )
}
