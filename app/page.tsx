import SearchBar from "@/components/client/SearchBar";
import { getProducts } from "@/lib/action";
import ProductCard from "@/components/client/ProductCard";
import Link from "next/link";


export default async function Home() {

  const products = await getProducts(6);


  return (
    <>
      <section className="w-full px-6 md:px-20 py-24  overflow-hidden  background_img">
        <div className="w-full flex text-center">
          <div className="flex flex-col justify-center text-center w-full">
            <h1 className="head-text">
              Automate the affialte with<span className="text-primary"> Smart Buy</span>
            </h1>
            <p className="mt-6 text-sm text-gray-200">
              This is the powerfull tool, which convert your amazon link in affilate, and notify you on <Link className="text-orange-600" target='_blank' href='https://t.me/buying_sense'>Telegram.</Link> and notify you on emails by subscribing it.
            </p>

            <SearchBar />
          </div>

        </div>
      </section>
      {/* infinte box  */}
      <div className="service_box w-[100%] mx-auto  bg-gray-100">
        <div className="card_box">
          <div className="service_card">
            <h1 >Amazon Affilate</h1>
          </div>
          <div className="service_card">
            <h1 >Telegram bot</h1>
          </div>
          <div className="service_card">
            <h1 >Cron Job</h1>
          </div>
          <div className="service_card">
            <h1 >Next.Js Stack</h1>
          </div>
          <div className="service_card">
            <h1 >Regular emails</h1>
          </div>
        </div>
        <div className="card_box">
          <div className="service_card">
            <h1 >Amazon Affilate</h1>
          </div>
          <div className="service_card">
            <h1 >Telegram bot</h1>
          </div>
          <div className="service_card">
            <h1 >Cron Job</h1>
          </div>
          <div className="service_card">
            <h1 >Next.Js Stack</h1>
          </div>
          <div className="service_card">
            <h1 >Regular emails</h1>
          </div>
        </div>
      </div>

      {/* main section  */}
      <section className="trending-section">
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
    </>
  )
}


