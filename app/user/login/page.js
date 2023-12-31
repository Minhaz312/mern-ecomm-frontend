"use client"
import React, { useEffect, useState } from 'react'
import { FcGoogle } from "react-icons/fc"
import Swal from 'sweetalert2'
import apiUrl from "./../../apiUrl"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import isLoggedIn from '@/utils/isLoggedIn'
import { AUTH_TOKEN_NAME } from '@/utils/constants'
export default function Page() {

  const navigate = useRouter()

  const [mobile, setMobile] = useState("")
  const [password, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState(null)
  const [loading, setLoading] = useState(false)

  const [authenticationChecking, setAuthenticationChecking] = useState(true)

  const handleLoginAccount = () => {
    if(mobile.trim()==="" || password.trim()===""){
      Swal.fire({title:"Please provide all information",icon:"warning"})
    }else {
      setLoading(true)
      // 01997785142
      fetch(`${apiUrl}/user/account/login`,{
        method:"POST",
        mode:"cors",
        headers:{
          "Content-Type":"application/json"
        },
        body:JSON.stringify({mobile:mobile,password:password})
      }).then(res=>res.json()).then(res=>{
        setLoading(false)
        console.log(res)
        if(res.success === true) {
          const authToken = res.token;
          localStorage.setItem(AUTH_TOKEN_NAME,authToken)
          window.location.href = "/user/profile/me"
        }else {
          setErrMsg("failed to login, try again!")
        }
      }).catch(err=>{
        setLoading(false)
        setErrMsg("failed to login, try again!")
      })
    }
  }

  useEffect(()=>{
    if(isLoggedIn()) {
      navigate.push("/user/profile/me")
      setAuthenticationChecking(false)
    }else {
      setAuthenticationChecking(false)
    }
  },[])

  if(authenticationChecking===true){
    return <div className='min-h-[60vh]'>
      <h1 className='text-center mt-10 text-2xl text-slate-600 font-semibold'>Checking authentication...</h1>
    </div>
  }

  return (
    <div>
        <div className='min:h-[65vh] flex justify-center items-center'>
        <div className='w-[90%] md:w-1/2 bg-white rounded shadow-md mx-auto my-6 md:my-12 p-3 md:p-5'>
          <h1 className='text-xl md:text-3xl lg:text-4xl font-semibold text-slate-900 text-center my-5 uppercase'>login to account</h1>
            <input type="text" placeholder='Enter Mobile Number' onChange={e=>setMobile(e.target.value.trim())} className='w-full my-5 outline-none border-none bg-slate-100 py-1.5 px-2 md:px-4 md:py-2 focus:outline-slate-900/10' />
            <input type="text" placeholder='Enter Password' onChange={e=>setPassword(e.target.value.trim())} className='w-full mb-5 outline-none border-none bg-slate-100 py-1.5 px-2 md:px-4 md:py-2 focus:outline-slate-900/10' />
            <button className='w-full mt-3 mb-3 bg-slate-900 text-white font-semibold py-2 text-base md:mt-5 md:py-3 md:text-lg' onClick={handleLoginAccount}>{loading?"loading...":"Login"}</button>
            <p className='text-center text-sm font-semibold text-slate-500 md:text-lg'>Don't have account? <Link href="/user/signup" className='text-blue-500'>Signup</Link></p>
          {/* <p className='text-center text-lg font-semibold text-slate-500'>or</p>
          <div>
            <button className='w-full my-3 bg-white text-black font-semibold py-2 text-md flex items-center border justify-center gap-3 shadow rounded'>
              <FcGoogle className='text-3xl' />
              Sign in with Google
            </button>
          </div> */}
        </div>
        </div>
    </div>
  )
}
