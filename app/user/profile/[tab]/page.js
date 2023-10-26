"use client"
import React, { useState } from 'react'
import apiUrl from '@/app/apiUrl'
import LoadingSpinner from '@/components/common/LoadingSpinner'
import CartList from '@/components/profile/CartList'
import MyData from '@/components/profile/MyData'
import OrderList from '@/components/profile/OrderList'
import requestHeader from '@/utils/requestHeader'
import Link from 'next/link'
import { useSelector } from 'react-redux'
import Swal from 'sweetalert2'

const profileTabs = [
	{id:1,name:"Cart List",tab:"cart"},
	{id:1,name:"Order List",tab:"order-list"},
	{id:1,name:"My Data",tab:"profile"},
]


export default function Page({params}) {

  const user = useSelector(state=>state.user)

  const [pageTab, setPageTab] = useState("cart")
  
  const [shippingAddress, setShippingAddress] = useState("")
  const [addressErr,setAddressErr] = useState(false)

  const [ordering, setOrdering] = useState(false)
  
  
  const handlePlaceOrder = () => {
    if(shippingAddress.trim()===""){
      setAddressErr(true)
    }else{
      setOrdering(true)
      fetch(`${apiUrl}/order/place/all-cart-product`,requestHeader("json",{
        method:"POST",
        body:JSON.stringify({shippingAddress:shippingAddress})
      })).then(res=>res.json()).then(res=>{
        setOrdering(false)
        console.log("res: ",res)
        if(res.success === true) {
          Swal.fire({
            title:"Order Placed Successfully!",
            icon:"success"
          })
          getUserDetails()
          setPageTab("o")
        }
      }).catch(err=>{
        setOrdering(false)
        Swal.fire({
          title:"Failed to place order!",
          icon:"error"
        })
        console.log(err)
      })
    }
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
      
      <div className='grid min-h-[500px] grid-cols-12 bg-white shadow-md rounded my-2 md:my-5 p-2 md:p-5'>
        <div className='col-span-12 md:col-span-9 px-1 md:px-5'>
        <div className="text-sm font-medium text-center text-gray-500 border-b border-gray-400 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
				{profileTabs.map((item,i)=><li key={i} className={`${item.tab==="profile"&&"block sm:hidden"} mr-2`}>
                    <button className={`inline-block p-2 rounded-t-lg ${pageTab===item.tab?"text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500":"hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"} md:p-4`} onClick={()=>setPageTab(item.tab)}>{item.name}</button>
                </li>)}
            </ul>
        </div>
        <div className='h-[300px] py-3 overflow-x-hidden overflow-y-auto'>
			{pageTab==="cart"&&(<CartList />)}
        	{pageTab==="order-list"&&<OrderList list={user.data.orderList} />}
        	{pageTab==="profile"&&<div className='blcok sm:hidden'>
				<MyData user={user.data} />
			</div>}
		</div>
          <div className={`${pageTab==="profile"&&"hidden sm:block"} flex justify-center`}>
            <Link href="/" className='bg-blue-200 border-2 rounded-2xl py-1 px-3 text-slate-600 font-semibold mt-2 inline-block text-[13px] sm:text-base'>Continue Shopping</Link>
          </div>
        </div>
        <div className={`${pageTab==="profile"&&"hidden sm:block"} col-span-12 md:col-span-3 px-2 mt-5`}>
          	<div className='hidden sm:block'>
				<MyData user={user.data} />
			</div>
            {
              user.data.cartList.list.length>0?<div>
              <p className='text-slate-500 mb-2 font-semibold text-sm sm:text-base'>Shipping Address</p>
              <textarea rows={3} className={`border p-2 outline-slate-400 ${addressErr&&shippingAddress===""?"border-red-500":""} rounded w-full text-sm sm:text-base`} onChange={e=>setShippingAddress(e.target.value.trim())} placeholder='Write your address...'></textarea>
              <p className="text-red-500 italic">{addressErr&&shippingAddress===""?"Please enter shipping address":""}</p>
              <div>
                <p><span className='text-lg mb-3 font-semibold text-slate-600'>Total Product:</span><span className='text-xl font-bold text-slate-600 ml-2'>{user.data.cartList.totalProduct}</span></p>
                <p><span className='text-lg mb-3 font-semibold text-slate-600'>Total Price:</span><span className='text-xl font-bold text-slate-600 ml-2'>{user.data.cartList.totalPrice}tk</span></p>
              </div>
              <button className='bg-primary hover:bg-primary/80 text-white text-md font-semibold px-7 py-1.5 mt-5' onClick={handlePlaceOrder}>
                {ordering===true?<LoadingSpinner size={25} light={true} />:"Place Order"}
              </button>
            </div>:""
            }
            
        </div>
      </div>
    </div>
  )
}
