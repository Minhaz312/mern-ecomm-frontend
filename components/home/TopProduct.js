import { api_uri } from '@/app/apiUrl'
import Link from 'next/link'
import React from 'react'
import { FaCartArrowDown } from 'react-icons/fa'
import ProductItem from '../product/ProductItem'

export default function TopProduct({productList}) {
  return (
    <div className='bg-[#6572ffc6] md:p-8 p-2 md:my-5 my-3 rounded-lg'>
        <h1 className="font-semibold text-slate-100 text-lg sm:text-xl mb-3 md:mb-5">Top Product</h1>
        <div className='grid grid-cols-2 md:gap-x-3 gap-x-2 gap-y-2 lg:grid-cols-6 md:grid-cols-4 sm:grid-cols-3'>
            {
                productList.map((item,i)=><ProductItem key={i} product={item} />)
            }
        </div>
    </div>
  )
}
