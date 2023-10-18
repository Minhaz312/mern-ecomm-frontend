"use client"
import Link from 'next/link'
import { useState } from 'react'
import { BiChevronDown, BiChevronUp } from 'react-icons/bi'

export default function MobileCategory({categoryList}) {
    const [categoryOpen, setCategoryOpen] = useState(false)
  return (
    <div className={`bg-white transition-all grid ${categoryOpen?"grid-cols-1 w-full":"grid-cols-2"} p-1.5 rounded-lg`}>
        <div className="bg-slate-100 py-1 px-2 rounded-l-lg">
            <h1 className="flex items-center justify-between" onClick={()=>setCategoryOpen(!categoryOpen)}>
                Category
                {
                    categoryOpen?<BiChevronUp />:<BiChevronDown />
                }
            </h1>
            <div className={`overflow-hidden ${categoryOpen?"h-auto":"h-0"}`}>
                {
                    categoryList.map((cat,i)=><Link href="/" className='block mt-2 text-sm' key={i}>{cat.name}</Link>)
                }
            </div>
        </div>
    </div>
  )
}
