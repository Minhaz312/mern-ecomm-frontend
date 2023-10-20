"use client"
import apiUrl,{ api_uri } from '@/app/apiUrl'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import ProductItem from '../product/ProductItem'

export default function SuggestedProduct() {
    const [loadingProduct, setLoadingProduct] = useState(true)
    const [suggestedProductList, setSuggestedProductList] = useState(null)
    const getSuggestedProduct = () => {
        let histry = localStorage.getItem("histry")
        if(histry!==null) {
            fetch(`${apiUrl}/product/get/suggested`,{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({keyword:histry})
            }).then(res=>res.json()).then(res=>{
                setLoadingProduct(false)
                if(res.success === true) {
                    setSuggestedProductList(res.data)
                }else{
                    setSuggestedProductList([])
                }
            }).catch(err=>{
                setSuggestedProductList([])
                setLoadingProduct(false)
            })
        }else {
            setSuggestedProductList([])
        }
    }
    useEffect(()=>{
        getSuggestedProduct()
    },[])
    if(suggestedProductList===null && loadingProduct===true){
        return ""
    }
    // #8690ff85
    if(suggestedProductList.length<1){
        return ""
    }
  return (
    <div>
        <div className='bg-[#8690ff85] md:p-8 p-2 md:my-5 my-3 rounded-lg'>
        <h1 className="font-semibold text-slate-100 text-lg sm:text-xl mb-3 md:mb-5">Suggested Products</h1>
        <div className='grid grid-cols-2 md:gap-x-3 gap-x-2 gap-y-2 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3'>
            {
                suggestedProductList.map((item,i)=><ProductItem key={i} product={item} />)
            }
        </div>
    </div>
    </div>
  )
}
