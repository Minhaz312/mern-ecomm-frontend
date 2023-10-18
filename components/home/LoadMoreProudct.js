"use client"
import React, { useState } from 'react'

import apiUrl, { api_uri } from '@/app/apiUrl'
import Link from 'next/link'
import { FaCartArrowDown } from 'react-icons/fa'
import ProductItem from '../product/ProductItem'

export default function LoadMoreProudct({totalLoadedProduct,totalProduct,keyword}) {
    const [loadedProduct, setLoadedProduct] = useState([])
    const [page,setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    const totalPageNumber = Math.ceil(Number(totalProduct)/12)
    console.log("totalProduct: ",totalProduct)
    console.log("totalPageNumber: ",totalPageNumber)
    console.log("loaded product: ",loadedProduct)
    const handleLoadMoreProduct = () => {
        if(totalPageNumber>1 && page<totalPageNumber){
            setLoading(true)
            let skip = 12*page;
            fetch(`${apiUrl}/product/get/${skip}/12/${keyword}`,{next:{revalidate:60}}).then(res=>res.json()).then(res=>{
                console.log(res)
                if(res.success === true) {
                    setLoadedProduct(res.data);
                    setPage(prev=>prev+1)
                }
                setLoading(false)
            }).catch(err=>{
                setLoading(false)
                console.log(err)
            })
        }
    }
  return (
    <div>
        <div className='grid grid-cols-2 md:gap-x-3 gap-x-2 gap-y-2 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3'>
            {
                loadedProduct.map((item,i)=><ProductItem key={i} product={item} />)
            }
        </div>
        <div className={`${totalPageNumber>1 && page<totalPageNumber?"block":"hidden"} w-full flex justify-center`}>
            <button onClick={handleLoadMoreProduct} className='md:px-12 px-3 py-1.5 rounded-md border-2 border-slate-300 md:my-5 my-4 font-semibold md:text-md text-[13px]'>{loading?"loading...":"load more"}</button>
        </div>
    </div>
  )
}