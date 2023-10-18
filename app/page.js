import Hero from "@/components/home/Hero";
import apiUrl, { api_uri } from "./apiUrl";
import { FaCartArrowDown } from "react-icons/fa";
import Link from "next/link";
import LoadMoreProudct from "@/components/home/LoadMoreProudct";
import TopProduct from "@/components/home/TopProduct";
import ProductItem from "@/components/product/ProductItem";
import SuggestedProduct from "@/components/home/SuggestedProduct";


export const metadata = {
  title: 'Lemda | Online shopping',
  description: 'One of the best company in chattogram.',
}

export default async function Page() {
    try {
        const proudctRes  = await fetch(`${apiUrl}/product/get/${0}/${12}/all`,{next:{revalidate:60}});
        const topProudctRes  = await fetch(`${apiUrl}/product/get/top`,{next:{revalidate:60}});
        const productResJson = await proudctRes.json()
        const topProductResJson = await topProudctRes.json()
        const productList = productResJson.data;
        const topProductList = topProductResJson.data;
        let topList = []
        productList.map((item,i)=>{
            if(i<6){
                topList.push(item)
            }
        })
        return (
           <div>
               <Hero />
               {
                   topProductList.length>0?<TopProduct productList={topProductList} />:""
               }
                <SuggestedProduct />
               {
                   productList.length<1?<h1 className="text-center text-xl font-semibold md:my-15 my-10 text-slate-700 md:text-3xl ">No product uploaded yet</h1>:<h1 className="text-xl text-center text-slate-600 font-semibold my-3 md:text-left">New Arrival</h1>
               }
               <div className='grid grid-cols-2 md:gap-x-3 gap-x-2 gap-y-2 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3'>
                   {
                       productList.map((item,i)=><ProductItem product={item} key={i} />)
                   }
               </div>
               <LoadMoreProudct totalLoadedProduct={productList.length} totalProduct={productResJson.totalProudct} keyword="all" />
           </div>
        )
    } catch (error) {
        return (
            <div className='h-[300px] flex justify-center items-center flex-col'>
                <h3 className='text-xl font-bold text-slate-500'>Failed to Load</h3>
                <p className='text-base text-slate-500 mt-2'>Please check your internet connection</p>
            </div>
        )
    }
}
