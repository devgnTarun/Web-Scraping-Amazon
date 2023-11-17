import ProductCard from "@/components/client/ProductCard";
import { getProducts } from "@/lib/action";


const page = async () => {

    const products = await getProducts();

  return (
    <section className="trending-section pt-[50px!important]">
    <h2 className="section-text text-center">Products</h2>
    <div className="flex flex-wrap gap-x-8 gap-y-16 items-center justify-around">
      {
        products?.map((product) =>  
           <ProductCard key={product._id} product={product}/>
        )
      }
    </div>
  </section>
  )
}

export default page