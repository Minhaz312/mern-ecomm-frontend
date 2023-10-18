"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'


export default function ProfileLayout({children}) {
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState(true)
  useEffect(()=>{
    if(localStorage.getItem("auth")===null){
      router.push("/user/login")
      setAuthenticated(false)
    }else {
      setAuthenticated(false)
    }
  },[])
  if(authenticated===true){
    return <div className="min-h-[60vh]">
      <h1 className='md:text-3xl text-xl font-semibold text-slate-800 text-center mt-14'>Checking authentication...</h1>
    </div>
  }
  return (
    <div className="min-h-[60vh]">
        {children}
    </div>
  )
}
