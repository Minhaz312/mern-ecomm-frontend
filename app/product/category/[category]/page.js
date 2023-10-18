import apiUrl,{ api_uri } from '@/app/apiUrl';
import Link from 'next/link';
import { FaCartArrowDown } from 'react-icons/fa';
import LoadMoreProudct from '@/components/home/LoadMoreProudct';
import ProductItem from '@/components/product/ProductItem';
export default async function Page({params}) {
    const {category} = params
    const proudctRes  = await fetch(`${apiUrl}/product/get/category/${category}`,{next:{revalidate:0}});
    const productResJson = await proudctRes.json()
    const productList = productResJson.data;
    const totalAvailable = productResJson.totalProduct;
    if(totalAvailable>0){
      return (
        <div className='min-h-[60vh]'>
          <h2 className='text-slate-400 mt-4 text-xl font-regular'>{totalAvailable} product found for "{category}"</h2>
          <div className='my-5  grid-cols-2 grid gap-3 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6'>
                {
                    productList.map((item,i)=><ProductItem key={i} product={item} />)
                }
                <LoadMoreProudct totalLoadedProduct={productList.length} />
            </div>
        </div>
      )
    }else {
      return <div className='min-h-[60vh] flex justify-center items-center'>
        <h1 className='text-slate-700 mt-4 text-xl font-regular'>No product found for "{category}"</h1>
      </div>
    }
}
