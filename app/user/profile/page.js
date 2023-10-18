"use client"
import apiUrl, { api_uri } from '@/app/apiUrl'
import CurrencyFormat from '@/components/common/CurrencyFormat'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { BsTrash } from 'react-icons/bs'

export default function page() {
  const [profile, setProfile] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalProduct, setTotalProduct] = useState(0)
  const [totalPrice, setTotalPrice] = useState(0)
  const [tabItem, setTabItem] = useState("c")
  const [shippingAddress, setShippingAddress] = useState("")
  const [addressErr,setAddressErr] = useState(false)
  const getUserDetails = () => {
    setTotalPrice(0)
    setTotalProduct(0)
    fetch(`${apiUrl}/user/get`,{
      headers:{
        "Authentication":localStorage.getItem("auth")
      }
    }).then(res=>res.json()).then(res=>{
      console.log(res)
      if(res.success===true) {
        setProfile(res.data)
        let priceSum = 0
        res.data.cartList.map(item=>{
          priceSum+=item.quantity*item.productId.price
          setTotalProduct(prev=>prev+item.quantity)
        })
        setTotalPrice(priceSum)
      }else {
        setProfile(null)
      }
      setLoading(false)
    }).catch(err=>{
      setLoading(false)
      setProfile(null)
    })
  }
  const handleDeleteCartItem = id => {
    if(confirm("Are you sure to delete?")){
      fetch(`${apiUrl}/product/cart/delete/${id}`,{
        method:"DELETE",
        headers:{
          "Authentication":localStorage.getItem("auth")
        }
      }).then(res=>res.json()).then(res=>{
        console.log(res)
        if(res.success===true) {
          getUserDetails()
        }else {
          alert("failed to delete")
        }
      }).catch(err=>{
        alert("failed to delete")
      })
    }
  }
  const handlePlaceOrder = () => {
    if(shippingAddress.trim()===""){
      setAddressErr(true)
    }else{
      fetch(`${apiUrl}/order/place/all-cart-product`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          "Authentication":localStorage.getItem("auth")
        },
        body:JSON.stringify({shippingAddress:shippingAddress})
      }).then(res=>res.json()).then(res=>{
        console.log("res: ",res)
        if(res.success === true) {
          alert("order placed successfully!")
          getUserDetails()
          setTabItem("o")
        }
      }).catch(err=>{
        console.log(err)
      })
    }
  }
  useEffect(()=>{
    getUserDetails()
  },[])
  if(loading===true){
    return <div className='min-h-[60vh] flex justify-center items-center'>
      <h1 className='text-2xl font-semibold'>Loading...</h1>
    </div>
  }else if(loading===false && profile===null) {
    return <div className='min-h-[60vh] flex justify-center items-center'>
      <h1 className='text-2xl font-semibold'>Failed to load, try again!</h1>
    </div>
  }

  const CartListComp = () => {
    if(profile.cartList.length<1){
      return <h3 className='text-md text-center my-5 font-semibold text-slate-600'>no product added yet</h3>
    }
    return <table className='w-full'>
        <thead className='bg-slate-700 text-white'>
          <tr>
            <th className='p-2 w-[60%]'>product</th>
            <th className='p-2 w-[10%]'>quantity</th>
            <th className='p-2 w-[15%]'>Total Price</th>
            <th className='p-2 w-[15%]'>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            profile.cartList.map((item,i)=><tr key={i} className='odd:bg-slate-200/20 hover:bg-slate-200/40'>
            <td className='w-[60%]'>
              <div className='flex'>
                <img src={`${api_uri}/images/${item.productId.primaryImage}`} className='h-[60px] w-auto' />
                  <h3 className='text-sm ms-2'>{item.productId.name.substring(0,30)}...</h3>
              </div>
            </td>
            <td className='w-[20%] text-center'>{item.quantity}</td>            
            <td className='w-[20%] text-center'><CurrencyFormat price={Number(item.quantity)*Number(item.productId.price)} /></td>            
            <td className='w-[15%] text-center'>
              <button className='cursor-pointer hover:bg-slate-200 px-3 py-2 hover:shadow-md hover:border-3' onClick={handleDeleteCartItem.bind(this,item._id)}><BsTrash /></button>
            </td>            
          </tr>)
          }
        </tbody>
      </table>
  }
  const OrderListComp = () => {
    return <table className='w-full'>
        <thead className='bg-slate-700 text-white'>
          <tr>
            <th className='p-2 w-[16.1%]'>OrderId</th>
            <th className='p-2 w-[16.1%]'>quantity</th>
            <th className='p-2 w-[16.1%]'>Total Price</th>
            <th className='p-2 w-[16.1%]'>Status</th>
            <th className='p-2 w-[16.1%]'>OrderDate</th>
            <th className='p-2 w-[16.1%]'>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            profile.orderList.map((item,i)=>{
              let quantity = 0;
              let totalPrice = 0;
              item.productList.map(prod=>{
                quantity+=prod.quantity
                totalPrice+=prod.totalPrice
              })
              let orderStatus = {}
              if(item.accepted===true){
                if(item.delivered===true){
                  orderStatus.statusText = "Delivered"
                  orderStatus.message=null
                  orderStatus.icon = "text-green-800 font-semibold px-3 py-1"
                }else {
                  orderStatus.statusText = "Not Delivered"
                  orderStatus.message="wait for delivery"
                  orderStatus.icon = "text-cyan-800 font-semibold px-3 py-1"
                }
              }else {
                orderStatus.statusText = "Not Accepted"
                orderStatus.message="wait for acceptence"
                orderStatus.icon = "text-red-800 font-semibold px-3 py-1"
              }
              return <tr key={i} className='odd:bg-slate-200/20 hover:bg-slate-200/40'>
              <td className='w-[20%]'>
                <p className='text-center text-blue-700 font-semibold'>#{item._id}</p> 
              </td>
              <td className='w-[20%] text-center'>{quantity}</td>            
              <td className='w-[20%] text-center'><CurrencyFormat price={totalPrice} /></td>            
              <td className='w-[20%] text-center'>
                <p className={orderStatus.icon}>{orderStatus.statusText}</p>
                <p className='text-sm text-yellow-500'>{orderStatus.message!==null?orderStatus.message:""}</p>
              </td>            
              <td className='w-[20%] text-center'>{new Date(item.orderDate).toDateString()}</td>            
              <td className='w-[20%] text-center'>
                <button className='cursor-pointer hover:bg-slate-200 px-3 py-2 hover:shadow-md hover:border-3' onClick={handleDeleteCartItem.bind(this,item._id)}><BsTrash /></button>
              </td>            
            </tr>
            })
          }
        </tbody>
      </table>
  }


  return (
    <div>
      <div className='grid min-h-[500px] grid-cols-12 bg-white shadow-md rounded my-5 p-5'>
        <div className='col-span-9 px-5'>
        <div className="mb-3 text-sm font-medium text-center text-gray-500 border-b border-gray-400 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-wrap -mb-px">
                <li className="mr-2">
                    <a href="#" className={`inline-block p-4 rounded-t-lg ${tabItem==="c"?"text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500":"hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}`} aria-current="page" onClick={()=>setTabItem("c")}>Cart List</a>
                </li>
                <li className="mr-2">
                    <a href="#" className={`inline-block p-4 rounded-t-lg ${tabItem==="o"?"text-blue-600 border-b-2 border-blue-600 dark:text-blue-500 dark:border-blue-500":"hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300"}`} onClick={()=>setTabItem("o")}>Order List</a>
                </li>
            </ul>
        </div>
          {
            tabItem==="c"?<CartListComp />:<OrderListComp />
          }
          <div className='flex justify-center'>
            <Link href="/" className='bg-blue-200 border-2 rounded-2xl py-1 px-3 text-slate-600 font-semibold mt-6 inline-block'>Continue Shopping</Link>
          </div>
        </div>
        <div className='col-span-3 border-l px-2'>
        <div className='flex justify-center w-full py-3'>
              <img src='/user.png' className="h-[120px] w-[120px] " />
            </div>
            <h3 className='text-slate-800 text-3xl text-center mb-3'>{profile.name}</h3>
            <h3 className='text-slate-700 text-xl text-center mb-3'>{profile.mobile}</h3>
            {
              profile.cartList.length>0?<div>
              <p className='text-slate-500 mb-2 font-semibold'>Shipping Address</p>
              <textarea rows={3} className={`border p-2 outline-slate-400 ${addressErr&&shippingAddress===""?"border-red-500":""} rounded w-full`} onChange={e=>setShippingAddress(e.target.value.trim())} placeholder='Write your address...'></textarea>
              <p className="text-red-500 italic">{addressErr&&shippingAddress===""?"Please enter shipping address":""}</p>
              <div>
                <p><span className='text-lg mb-3 font-semibold'>Total Product:</span><span className='text-xl ml-2'>{totalProduct}</span></p>
                <p><span className='text-lg mb-3 font-semibold'>Total Price:</span><span className='text-xl ml-2'>{totalPrice}tk</span></p>
              </div>
              <button className='bg-blue-500 text-white text-md font-semibold px-7 py-1 mt-5' onClick={handlePlaceOrder}>Place Order</button>
            </div>:""
            }
            
        </div>
      </div>
    </div>
  )
}
