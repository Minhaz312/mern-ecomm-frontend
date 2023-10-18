import Hero from "@/components/home/Hero";
import Link from "next/link";
import LoadMoreProudct from "@/components/home/LoadMoreProudct";
import TopProduct from "@/components/home/TopProduct";
import apiUrl,{ api_uri } from "@/app/apiUrl";
import ProductItem from "@/components/product/ProductItem";
import FilterCategoryList from "@/components/product/FilterCategoryList";

export default async function Page({params}) {
    const proudctRes  = await fetch(`${apiUrl}/product/get/${0}/${12}/${params.keyword}`,{next:{revalidate:60}});
    const productResJson = await proudctRes.json()
    const productList = productResJson.data;
    let topList = []
    productList.map((item,i)=>{
        if(i<6){
            topList.push(item)
        }
    })
    if(productList.length===0) {
      return <div className="min-h-[60vh]">
        <h3 className="text-2xl text-slate-600 font-semibold mt-12 text-center">No product found for "{params.keyword}"</h3>
      </div>
    }
    const ProductList = () => {
      return productList.map((item,i)=><ProductItem key={i} product={item} />)
    }
    
 return (
    <div>
        <div className='my-5 grid-cols-2 grid gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6'>
            <ProductList />
        </div>
        <LoadMoreProudct totalLoadedProduct={productList.length} totalProduct={productResJson.totalProudct} keyword={params.keyword} />
    </div>
 )
}
