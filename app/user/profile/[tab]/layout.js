"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import isLoggedIn from '@/utils/isLoggedIn'

export default function ProfileLayout({children}) {
  const router = useRouter()
  
  const [checkingAuth, setCheckingAuth] = useState(true)

  useEffect(()=>{
    if(isLoggedIn()===false){
      router.push("/user/login")
    }else {
      setCheckingAuth(false)
    }
  },[checkingAuth])
  if(checkingAuth){
    return (
      <div className="min-h-[60vh] h-auto">
          please wait...
      </div>
    )
  }
  return (
    <div className="min-h-[60vh] h-auto">
        {children}
    </div>
  )
}
