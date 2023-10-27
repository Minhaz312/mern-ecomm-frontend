"use client"
import React, { useEffect, useState } from 'react'
import { FcGoogle } from "react-icons/fc"
import Swal from 'sweetalert2'
import apiUrl from "../../apiUrl"
import { useRouter } from 'next/navigation'
import Link from 'next/link'
export default function Page() {

  const navigate = useRouter()

  const [userName, setUserName] = useState("")
  const [mobile, setMobile] = useState("")
  const [password, setPassword] = useState("")
  const [errMsg, setErrMsg] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleCreateAccount = () => {
    if(userName.trim()==="" || mobile.trim()==="" || password.trim()===""){
      Swal.fire({title:"Please provide all information",icon:"warning"})
    }else {
      setLoading(true)
      fetch(`${apiUrl}/user/account/create`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
        },
        body:JSON.stringify({name:userName,mobile:mobile,password:password})
      }).then(res=>res.json()).then(res=>{
        setLoading(false)
        console.log(res)
        if(res.success === true) {
          const authToken = res.token;
          console.log("token: ",authToken)
          localStorage.setItem("auth",authToken)
          navigate.replace("/user/profile")
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
    }
  },[])

  return (
    <div>
        <div className='min:h-[65vh] flex justify-center items-center'>
        <div className='w-[90%] md:w-1/2 bg-white rounded shadow-md mx-auto my-12 p-5'>
          <h1 className='text-lg font-semibold text-slate-900 text-center my-3 uppercase lg:text-4xl md:text-2xl md:my-5'>create account</h1>
            <input type="text" placeholder='Enter Name' onChange={e=>setUserName(e.target.value.trim())} className='w-full mt-5 outline-none border-none bg-slate-100 px-2 py-1.5 focus:outline-slate-900/10 md:px-4 md:py-2' />
            <input type="text" placeholder='Enter Mobile Number' onChange={e=>setMobile(e.target.value.trim())} className='w-full my-5 outline-none border-none bg-slate-100 py-1.5 px-2 focus:outline-slate-900/10 md:px-4 md:py-2' />
            <input type="text" placeholder='Enter Password' onChange={e=>setPassword(e.target.value.trim())} className='w-full mb-5 outline-none border-none bg-slate-100 px-2 py-1.5 focus:outline-slate-900/10 md:px-4 md:py-2' />
            <button className='w-full mt-3 mb-3 text-base bg-slate-900 text-white font-semibold py-2 md:py-3 md:text-lg md-5' onClick={handleCreateAccount}>{loading?"loading...":"Create"}</button>
            <p className='text-center text-base lg:text-lg font-semibold text-slate-500'>Already have account? <Link href="/user/login" className='text-blue-500'>Login</Link></p>
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
