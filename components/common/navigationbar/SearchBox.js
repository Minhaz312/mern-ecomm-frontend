"use client"
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { BiSearch, BiUser } from "react-icons/bi"


export default function SearchBox() {
    const [searchHistory, setSearchHistory] = useState(null)

    const [showSuggestion, setShowSuggestion] = useState(false)
    const handleSearchSuggestion = () => {
        setShowSuggestion(true)
    }
    const handleCloseSearchSuggestion = () => {
        setShowSuggestion(false)
    }

    const [searchKeyword, setSearchKeyword] = useState("")

    const navigate = useRouter()


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
                list.push(<Link href={`/product/search/${searchHistory[i]}`} className='block text-slate-500 text-md m-2 cursor-pointer hover:bg-slate-100 p-1' key={i} >{searchHistory[i]}</Link>)
            }
            return list.map(item=>item)
        }else {
            return ""
        }
    }
    useEffect(()=>{
        let histryString = localStorage.getItem("histry")
        if(histryString===null){
            histryString = ""
        }
        let historyArr = histryString.split(",")
        setSearchHistory(historyArr)
    },[])
  return (
    <div className={`${showSuggestion?"drop-shadow-2xl rounded-xl":"shadow-none"}`}>
        <div>
            <div className='relative flex items-center w-full justify-center'>
                <input type="search" placeholder='Search your products...' value={searchKeyword} onChange={e=>setSearchKeyword(e.target.value)} className='search-input border-none bg-slate-200 w-full transition-all px-3 py-2 outline-none text-sm' onFocus={handleSearchSuggestion} onBlur={handleCloseSearchSuggestion} />
                <button className='px-3 py-2 outline-none border-none bg-black text-white font-semibold' onClick={handleOnSearchClick}><BiSearch size={20} /></button>
            </div>
            <div className={`${showSuggestion?"block":"hidden"} bg-white shadow-lg w-full absolute top-full z-20 left-0 right-0 min-h-[100px] h-auto`}>
                <SearchHistoryList />
                {/* <span className='block text-center text-slate-500 mt-14'>start typing...</span> */}
            </div>
        </div>
    </div>
  )
}
