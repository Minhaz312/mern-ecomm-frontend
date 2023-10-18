"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { BiUser } from "react-icons/bi"

export default function Logout() {

    const [authorized, setAuthorized] = useState(null)

    const handleLogout = () => {
        localStorage.removeItem("auth")
        window.location="/"
    }

    useEffect(()=>{
        if(localStorage.getItem("auth")===null){
            setAuthorized(false)
        }else{
            setAuthorized(true)
        }
    },[])
    if(authorized===null) {
        return <li>
            <Link href="/user/login" className='text-slate-500 rounded-full border bg-slate-100/80 p-2 flex items-center font-bold gap-1 text-base sm:text-lg'><BiUser /></Link>
        </li>
    }
    if(authorized) {
    return <li>
        <Link href="/user/login" className='text-slate-500 rounded-full border bg-slate-100/80 p-2 flex items-center font-bold gap-1 text-base sm:text-lg'><BiUser /></Link>
    </li>
    }else {
        return <>
        <li>
            <Link href="/user/profile" className='flex items-center rounded-full border bg-slate-100/80 p-2 font-bold gap-1 text-base sm:text-lg'><BiUser /></Link>
        </li>
        <li>
            <p onClick={handleLogout} className='flex items-center rounded-full border bg-slate-100/80 py-1 px-3 font-regular ms-2 gap-1 text-sm cursor-pointer md:text-base'>Logout</p>
        </li>
        </>
    }
}
