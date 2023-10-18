"use client"
import React, { useEffect, useState } from 'react'
import { FcGoogle } from "react-icons/fc"
import Swal from 'sweetalert2'
import apiUrl from "./../../apiUrl"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
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
          localStorage.setItem("auth",authToken)
          window.location = "/user/profile"
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
    if(localStorage.getItem("auth")!==null) {
      navigate.push("/user/profile")
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
        <div className='h-[65vh] flex justify-center items-center'>
        <div className='w-1/2 bg-white rounded shadow-md mx-auto my-12 p-5'>
          <h1 className='text-4xl font-semibold text-slate-900 text-center my-5 uppercase'>login to account</h1>
            <input type="text" placeholder='Enter Mobile Number' onChange={e=>setMobile(e.target.value.trim())} className='w-full my-5 outline-none border-none bg-slate-100 px-4 py-2 focus:outline-slate-900/10' />
            <input type="text" placeholder='Enter Password' onChange={e=>setPassword(e.target.value.trim())} className='w-full mb-5 outline-none border-none bg-slate-100 px-4 py-2 focus:outline-slate-900/10' />
            <button className='w-full mt-5 mb-3 bg-slate-900 text-white font-semibold py-3 text-lg' onClick={handleLoginAccount}>{loading?"loading...":"Login"}</button>
            <p className='text-center text-lg font-semibold text-slate-500'>Don't have account? <Link href="/user/signup" className='text-blue-500'>Signup</Link></p>
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
