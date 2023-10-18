"use client"
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { FaBars } from 'react-icons/fa'
import { BiSearch, BiUser } from "react-icons/bi"

import {GrList} from 'react-icons/gr'

import { usePathname, useRouter } from 'next/navigation'
import { navLinks } from '../../navLinks'
import Modal from '../Modal'
import apiUrl from "../../../app/apiUrl"

export default function MobileNav() {
  const pathname = usePathname()
  const navigate = useRouter()

  const [categoryList,setCategoryList] = useState(null)
  const [openSubcat,setOpenSubcat] = useState(null)

  const [categoryActive, setCategoryActive] = useState(false)
  
  const [searchHistory, setSearchHistory] = useState(null)

    const [showSuggestion, setShowSuggestion] = useState(false)
    const handleSearchSuggestion = () => {
        setShowSuggestion(true)
    }
    const handleCloseSearchSuggestion = () => {
        setShowSuggestion(false)
    }

    const [searchKeyword, setSearchKeyword] = useState("")



    const handleOnSearchClick = () => {
        if(searchKeyword.trim()!==""){
            let prevHistory = localStorage.getItem("histry");
            if(prevHistory===null){
                prevHistory = []
            }else {
                prevHistory = prevHistory.split(",")
                if(prevHistory.includes(searchKeyword)===false){
                    if(prevHistory.length===5){
                        prevHistory.shift()
                        prevHistory.push(searchKeyword)
                    }else {
                        prevHistory.push(searchKeyword)
                    }
                }
            }
            let newHistry = prevHistory.join(",")
            localStorage.setItem("histry",newHistry)
            setSearchHistory(prevHistory)
            navigate.push(`/product/search/${searchKeyword}`)
        }
    }
    const handleGetSearchHistory = name => {
        console.log("name: ",name)
        setSearchKeyword(name)
    }
    const SearchHistoryList = () => {
        if(searchHistory!==null){
            let list = []
            for (let i = searchHistory.length-1; i >= 0; i--) {
                list.push(<p className='text-slate-500 text-md m-2 cursor-pointer hover:bg-slate-100 p-1' key={i} onMouseOver={handleGetSearchHistory.bind(this,searchHistory[i])}>{searchHistory[i]}</p>)
            }
            return list.map(item=>item)
        }else {
            return ""
        }
    }

  const handleOpenCatList = () => {
    if(categoryActive) setCategoryActive(false)
    else {
      getAllCat()
      setCategoryActive(true)
    }
  }

  const getAllCat = async () => {
    const catRes = await fetch(`${apiUrl}/category/get/all`);
    const catJson = await catRes.json();
    console.log("catJson: ",catJson.categories)
    setCategoryList(catJson.categories)
  }

  return (
    <>
    {
      categoryList!==null&&<Modal show={categoryActive} onHide={handleOpenCatList} footer={false} title='Filter by Category'>
        {
          categoryList.map((cat,i)=>{
            const hasSubCat = cat.subcategories.length;
            return <div key={i} onClick={()=>setOpenSubcat(i)} className={`${openSubcat===i?"bg-slate-200/40":"bg-slate-100/60"} rounded-md mt-2 pb-2`}>
              {hasSubCat?<p className='px-2 cursor-pointer py-1 hover:bg-slate-200/40'>{cat.name}</p>:<Link className='px-2 py-1 mt-2' href="/">{cat.name}</Link>}
              {hasSubCat&&openSubcat===i?<div className='bg-slate-200/30'>
                {
                  cat.subcategories.map((subcat,j)=><Link key={j} href="/" className='ml-4 text-sm block mt-2'>{subcat.name}</Link>)
                }
              </div>:""}
            </div>
          })
        }
      </Modal>
    }
      
      <div className='sm:hidden block'>
          <div className='flex justify-between items-center bg-white p-2'>
              {
                showSuggestion===false&&(<Link href="/" className='font-bold text-2xl'>
                <img src="/images/logo.png" className='h-[25px]' />
            </Link>)
              }
            <div className={`z-50 relative ${showSuggestion?"w-full drop-shadow-2xl rounded-xl":"w-8/12 shadow-none"}`}>
                <div className='flex items-center'>
                    <input type="search" placeholder='Search your products...' value={searchKeyword} onChange={e=>setSearchKeyword(e.target.value)} className='search-input border-none bg-slate-200 w-full transition-all px-3 py-1.5 outline-none text-sm' onFocus={handleSearchSuggestion} onBlur={handleCloseSearchSuggestion} />
                    <button className='px-3 py-2 outline-none border-none bg-black text-white font-semibold' onClick={handleOnSearchClick}><BiSearch /></button>
                </div>
                <div className={`${showSuggestion?"block":"hidden"} bg-white shadow-lg w-full absolute top-full z-20 left-0 right-0 min-h-[100px] h-auto`}>
                    <SearchHistoryList />
                    {/* <span className='block text-center text-slate-500 mt-14'>start typing...</span> */}
                </div>
            </div>
          </div>
          <div className='bg-white w-full rounded-t-xl pt-1 fixed bottom-0 text-black'>
          <div className="shadow-[2px_0_20px] shadow-slate-200 flex justify-around items-center px-2">
              <div className='flex flex-col items-center'>
                <button onClick={handleOpenCatList} className={`rounded-full ${categoryActive?"bg-[#010c80] text-white shadow-xl":" text-slate-900"} p-2.5`}>
                    <GrList size={20} color={categoryActive?"#ffffff":"#000"} />
                </button>
                {categoryActive&&<p className='text-[10px] font-bold'>Home</p>
                }
              </div>
              {
                navLinks.map((link,i)=>{
                  const isActive = pathname === link.link && categoryActive===false?true:false;
                  return <div className='flex flex-col items-center' key={i}>
                  <Link href={link.link} replace={true}>
                    <button className={`rounded-full ${isActive?"bg-[#010c80] text-white shadow-xl":"bg-slate200 text-slate-900"} p-2.5`}>
                        {link.icon}
                    </button>
                  </Link>
                  {
                    isActive&&(<p className='text-[10px] font-bold'>{link.name}</p>)
                  }
                </div>
                })
              }
            </div>
          </div>
      </div>
    </>
  )
}
