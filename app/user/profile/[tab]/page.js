"use client"
import apiUrl, { api_uri } from '@/app/apiUrl'
import CurrencyFormat from '@/components/common/CurrencyFormat'
import Modal from '@/components/common/Modal'
import CartList from '@/components/profile/CartList'
import OrderList from '@/components/profile/OrderList'
import requestHeader from '@/utils/requestHeader'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BiEditAlt } from 'react-icons/bi'
import { useSelector } from 'react-redux'

export default function Page({params}) {

  const user = useSelector(state=>state.user)

  const [pageTab, setPageTab] = useState("cart")
  const [showProfileModal, setShowProfileModal] = useState(false)
  const [shippingAddress, setShippingAddress] = useState("")
  const [addressErr,setAddressErr] = useState(false)
  
  
  const handlePlaceOrder = () => {
    if(shippingAddress.trim()===""){
      setAddressErr(true)
    }else{
      fetch(`${apiUrl}/order/place/all-cart-product`,requestHeader("json",{
        method:"POST",
        body:JSON.stringify({shippingAddress:shippingAddress})
      })).then(res=>res.json()).then(res=>{
        console.log("res: ",res)
        if(res.success === true) {
          alert("order placed successfully!")
          getUserDetails()
          setPageTab("o")
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  }
  const handleShowProfileModal = () => {
    if(showProfileModal) setShowProfileModal(false)
    else setShowProfileModal(true)
  }



  if(user.isLoading===true){
    return <div className='min-h-[60vh] flex justify-center items-center'>
      <h1 className='text-2xl font-semibold'>Loading...</h1>
    </div>
  }else if(user.isLoading===false && user.data===undefined) {
    return <div className='min-h-[60vh] flex justify-center items-center'>
      <h1 className='text-2xl font-semibold'>Failed to load, try again!</h1>
    </div>
  }

  return (
    <div>
      <Modal show={showProfileModal} title='Your Profile' onHide={handleShowProfileModal}>
        my profile
      </Modal>
      <div className='grid min-h-[500px] grid-cols-12 bg-white shadow-md rounded my-2 md:my-5 p-2 md:p-5'>
        <div className='col-span-12 md:col-span-9 px-1 md:px-5'>
        <div className="mb-3 text-sm font-medium text-center text-gray-500 border-b border-gray-400 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
                <li className="mr-2">
                    <button className={`inline-block p-2 rounded-t-lg ${pageTab==="cart"?"text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500":"hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} md:p-4`} aria-current="page" onClick={()=>setPageTab("cart")}>Cart List</button>
                </li>
                <li className="mr-2">
                    <button className={`inline-block p-2 rounded-t-lg ${pageTab==="order-list"?"text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500":"hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} md:p-4`} onClick={()=>setPageTab("order-list")}>Order List</button>
                </li>
            </ul>
        </div>
        {pageTab==="cart"&&(<CartList />)}
        {pageTab==="order-list"&&<OrderList list={user.data.orderList} />}
          <div className='flex justify-center'>
            <Link href="/" className='bg-blue-200 border-2 rounded-2xl py-1 px-3 text-slate-600 font-semibold mt-6 inline-block'>Continue Shopping</Link>
          </div>
        </div>
        <div className={`col-span-12 md:col-span-3 border-t sm:border-l px-2 mt-5 sm:border-t-0`}>
        <div className='flex justify-center w-full py-3'>
              <img src='/user.png' className="h-[120px] w-[120px] " />
            </div>
            <div className='flex justify-between items-center'>
              <h3 className='text-slate-600 text-3xl text-center mb-3'>{user.data.name}</h3>
              <button className='px-2 py-1' onClick={handleShowProfileModal}>
                <BiEditAlt />
              </button>
            </div>
            <h3 className='text-slate-500 text-md mb-3 sm:text-lg'>{user.data.mobile}</h3>
            {
              user.data.cartList.list.length>0?<div>
              <p className='text-slate-500 mb-2 font-semibold'>Shipping Address</p>
              <textarea rows={3} className={`border p-2 outline-slate-400 ${addressErr&&shippingAddress===""?"border-red-500":""} rounded w-full`} onChange={e=>setShippingAddress(e.target.value.trim())} placeholder='Write your address...'></textarea>
              <p className="text-red-500 italic">{addressErr&&shippingAddress===""?"Please enter shipping address":""}</p>
              <div>
                <p><span className='text-lg mb-3 font-semibold text-slate-600'>Total Product:</span><span className='text-xl font-bold text-slate-600 ml-2'>{user.data.cartList.totalProduct}</span></p>
                <p><span className='text-lg mb-3 font-semibold text-slate-600'>Total Price:</span><span className='text-xl font-bold text-slate-600 ml-2'>{user.data.cartList.totalPrice}tk</span></p>
              </div>
              <button className='bg-blue-600 hover:bg-blue-700 text-white text-md font-semibold px-7 py-1.5 mt-5' onClick={handlePlaceOrder}>Place Order</button>
            </div>:""
            }
            
        </div>
      </div>
    </div>
  )
}
