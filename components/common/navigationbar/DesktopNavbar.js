"use client"
import { useState } from 'react'
import Link from 'next/link'
import { BiFilter, BiSearch, BiUser } from "react-icons/bi"
import { HiOutlineHome } from "react-icons/hi"
import { FiLogOut } from "react-icons/fi"
import { LiaShoppingCartSolid } from "react-icons/lia"
import SearchBox from './SearchBox'
import Logout from './Logout'

import apiUrl from '@/app/apiUrl'

export default function DesktopNavbar() {
    const [showMobileCategoryList, setShowMobileCategoryList] = useState(false)
    const [categroyList, setCategoryList] = useState(null)
    const handleShowMobileCategoryList = async () => {
        if(showMobileCategoryList) {
            setShowMobileCategoryList(false)
        }
        else {
            setShowMobileCategoryList(true)
            if(categroyList===null){
                try {
                    const res = await fetch(`${apiUrl}/category/get/all`);
                    const categoryRes = await res.json()
                    console.log('catRes: ',categoryRes)
                    setCategoryList(categoryRes.categories)
                } catch (error) {
                    setCategoryList(undefined)
                }
            }
        }
    }
  return (
    <div className='w-full bg-white shadow-sm sticky top-0 z-20 md:px-0'>
        <nav className='cs-container py-1.5'>
            <div className='grid grid-cols-12 items-center py-0 mb-2 lg:mb-0 lg:py-2'>
                <div className='col-span-6 md:col-span-2'>
                    <Link href="/" className='font-bold text-2xl'>
                        <img src="/images/logo.png" className='h-[30px] sm:h-[35px]' />
                    </Link>
                </div>
                <div className='md:col-span-6 w-full md:block hidden'>
                    <SearchBox />
                </div>
                <div className='col-span-6 md:col-span-3 py-2 lg:py-0'>
                    <ul className='flex gap-1.5 sm:gap-3 items-center justify-end'>
                        <li>
                            <Link href="/" className='text-slate-500 rounded-full border bg-slate-100/80 p-2 flex items-center gap-1 text-base sm:text-lg'><HiOutlineHome /></Link>
                        </li>
                        <li>
                            <Link href="/user/profile/cart" className='text-slate-500 rounded-full border bg-slate-100/80 p-2 flex items-center gap-1 text-base sm:text-lg'><LiaShoppingCartSolid /></Link>
                        </li>
                        <Logout />                 
                    </ul>
                </div>
            </div>
            <div className='flex items-center md:hidden'>
                <div className='relative'>
                    <button className={`flex items-center bg-slate-${showMobileCategoryList?"300":"200"} hover:bg-slate-300 py-[8.3px] px-2`} onClick={handleShowMobileCategoryList}>
                        <p className='text-[13px] mr-1 font-semibold'>Category</p>
                        <BiFilter />
                    </button>
                    {showMobileCategoryList===true&&categroyList!==null&&categroyList!==undefined&&(
                        <div className='absolute top-full left-0 bg-white shadow-lg w-[160px] min-h-[100px] h-auto py-2'>
                            {categroyList!==null&&categroyList.map((cat,i)=><div className='group w-full h-full p-1 cursor-pointer'>
                                <p className='text-[13px] font-semibold text-slate-600'>{cat.name}</p>
                                {cat.subcategories.length>0&&<div className='absolute left-full top-0 min-h-full bg-slate-50 w-full hidden group-hover:block p-2'>
                                    {cat.subcategories.map((subcat,j)=><Link href={`/product/category/${subcat.name}`} className='block text-[13px] py-0.5 font-semibold text-slate-600'>{subcat.name}</Link>)}
                                </div>}
                            </div>)}
                        </div>
                    )}
                    {categroyList===undefined&&(<div className='absolute top-full left-0 bg-white shadow-lg w-[160px] min-h-[100px] h-auto py-2'>
                        <p className='text-[12px] text-center mt-6 text-slate-500 font-semibold'>Failed to Fetch</p>
                    </div>)}
                </div>
                <div className='w-full'>
                    <SearchBox />
                </div>
            </div>
        </nav>
    </div>
  )
}
