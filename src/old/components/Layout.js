import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { FaUser } from "react-icons/fa"
import { FiYoutube } from "react-icons/fi"
import { AiFillHome } from "react-icons/ai"
import { BsCartFill, BsInstagram } from "react-icons/bs"
import { RiFacebookFill } from "react-icons/ri"
export default function Layout({children}) {

    const [showSuggestion, setShowSuggestion] = useState(false)
    const handleSearchSuggestion = () => {
        setShowSuggestion(true)
    }
    const handleCloseSearchSuggestion = () => {
        setShowSuggestion(false)
    }

  return (
    <div className='bg-slate-100 min-h-screen m-0 p-0 w-full'>
        <div className='w-full bg-white shadow-sm py-0 px-5 sticky top-0 z-20'>
            <nav className='w-4/5 mx-auto flex items-center py-2'>
                <div className='flex w-full'>
                    <div className='mr-5'>
                        <h1 className='font-bold text-4xl'>BGCExpress</h1>
                    </div>
                    <div className='w-full px-32'>
                        <div className={`relative w-full ${showSuggestion?"drop-shadow-2xl":"shadow-none"}`}>
                            <div className='flex items-center w-full'>
                                <input type="search" placeholder='Search your products...' className='search-input border-none bg-slate-100 w-full transition-all px-3 py-4 outline-none' onBlur={handleCloseSearchSuggestion} onFocus={handleSearchSuggestion} />
                                <button className='px-3 py-4 outline-none border-none bg-black text-white font-semibold'>Search</button>
                            </div>
                            <div className={`${showSuggestion?"block":"hidden"} h-32 bg-white shadow-lg w-full absolute top-full z-20 left-0 right-0 min-h-[100px] h-auto`}>
                                <p className='text-slate-500 text-md m-2'>hp monitor</p>
                                <p className='text-slate-500 text-md m-2'>walton fridge</p>
                                <p className='text-slate-500 text-md m-2'>samsung television</p>
                                <p className='text-slate-500 text-md m-2'>Gacket</p>
                                <p className='text-slate-500 text-md m-2'>water heater</p>
                                {/* <span className='block text-center text-slate-500 mt-14'>start typing...</span> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='p-5'>
                    <ul className='flex gap-5 items-center'>
                        <li>
                            <NavLink to="/" className='flex items-center gap-1 text-xl'><AiFillHome />Home</NavLink>
                        </li>
                        <li>
                            <NavLink to="/profile/cart" className='flex items-center gap-1 text-xl'><BsCartFill />Cart</NavLink>
                        </li>
                        <li>
                            <NavLink to="/signin" className='flex items-center font-bold gap-1 text-xl'><FaUser />Signin</NavLink>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
        <div className='w-4/5 mx-auto'>
            {children}
        </div>
        <div className='bg-slate-900 py-5'>
            <div className='w-4/5 mx-auto'>
                <div className='grid grid-cols-12 gap-3'>
                    <div className='col-span-3 text-white'>
                        <h1 className='font-bold text-4xl'>BGCExpress</h1>
                        <p className='text-sm text-slate-300 my-2'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                        <div className='flex gap-2 my-2'>
                            <BsInstagram color='white' />
                            <RiFacebookFill color='white' />
                            <FiYoutube color='white' />
                        </div>
                    </div>
                    <div className='col-span-3 text-white'>
                        <h3 className='text-lg font-bold'>Quick Links</h3>
                        <ul className='text-sm pl-3 text-slate-300'>
                            <li className='my-2 hover:text-slate-100'>Home</li>
                            <li className='my-2 hover:text-slate-100'>Home</li>
                            <li className='my-2 hover:text-slate-100'>Home</li>
                            <li className='my-2 hover:text-slate-100'>Home</li>
                            <li className='my-2 hover:text-slate-100'>Home</li>
                        </ul>
                    </div>
                    <div className='col-span-3'>
                        <h3 className='text-lg font-bold text-white mb-3'>Get App On</h3>
                        <img src="/images/get-inplay.png" style={{width:"200px",height:"auto"}} />
                    </div>
                </div>
                <div className='border-t border-slate-600 text-slate-300 my-3 py-3 text-center'>
                    Copyright&copy; 2000-2023. All right reserved.
                </div>
            </div>
        </div>
    </div>
  )
}
