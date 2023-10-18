import React from 'react'
import Layout from '../components/Layout'
import { FcGoogle } from "react-icons/fc"
export default function Signin() {
  return (
    <Layout>
        <div className='w-1/4 bg-white rounded shadow-md mx-auto my-12 p-5'>
          <h1 className='text-4xl font-semibold text-slate-900 text-center my-5 uppercase'>Sign in</h1>
          <form>
            <input type="text" placeholder='Enter Mobile Number' className='w-full my-5 outline-none border-none bg-slate-100 px-4 py-2 focus:outline-slate-900/10' />
            <input type="text" placeholder='Enter Password' className='w-full mb-5 outline-none border-none bg-slate-100 px-4 py-2 focus:outline-slate-900/10' />
            <button className='w-full mt-5 mb-3 bg-slate-900 text-white font-semibold py-3 text-lg'>Login</button>
          </form>
          <p className='text-center text-lg font-semibold text-slate-500'>or</p>
          <div>
            <button className='w-full my-3 bg-white text-black font-semibold py-2 text-md flex items-center border justify-center gap-3 shadow rounded'>
              <FcGoogle className='text-3xl' />
              Sign in with Google
            </button>
          </div>
        </div>
    </Layout>
  )
}
