"use client"
import React, { useEffect } from 'react'
import CurrencyFormat from '../common/CurrencyFormat'
import { BsTrash } from 'react-icons/bs'
import apiUrl, { api_uri } from '@/app/apiUrl'
import requestHeader from '@/utils/requestHeader'
import { useDispatch, useSelector } from 'react-redux'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { updateCartItem } from '@/states/features/userSlice'
export default function CartList() {
  const dispatch = useDispatch()
  const userData = useSelector(state=>state.user.data)
    const handleDeleteCartItem = id => {
    if(confirm("Are you sure to delete?")){
      fetch(`${apiUrl}/product/cart/delete/${id}`,requestHeader("json",{
        method:"DELETE"
      })).then(res=>res.json()).then(res=>{
      }).catch(err=>{
        alert("failed to delete")
      })
    }
  }
  const handleUpdateCartQuantity = async (item,type="inc") => {
    let data = {
      cartId:item._id,
    }
    if(type==="inc"&&item.quantity<10){
      data.quantity = item.quantity+1
      data.totalPrice = item.totalPrice+item.productPrice
      dispatch(updateCartItem(data))
    }else if(type==="dec"&&item.quantity!==1){
      data.quantity = item.quantity-1
      data.totalPrice = item.totalPrice-item.productPrice
      dispatch(updateCartItem(data))
    }else{
      console.log('please look at your action')
    }
    console.log('data: ',data)
    // const res = await fetch(`${apiUrl}/cart/update/quantity`,requestHeader("json",{
    //   method:"POST",
    //   body:JSON.stringify({cartId:item._id})
    // }))
    // console.log('res of incrs: ',res)
  }
  useEffect(()=>{},[userData])
  if(userData===undefined || userData===null){
    return <h3 className='text-md text-center my-5 font-semibold text-slate-600'>Failed to load</h3>
  }
  console.log('cart list asdf: ',userData.cartList)
  if(userData.cartList.list.length<1){
      return <h3 className='text-md text-center my-5 font-semibold text-slate-600'>no product added yet</h3>
    }
    return <div className='w-full'>
          {
            userData.cartList.list.map((item,i)=><div key={i} className='flex border mb-1 odd:bg-slate-200/20 hover:bg-slate-200/40'>
                <div className='p-2 '>
                  <img src={`${api_uri}/images/${item.productImage}`} className='h-[70px] w-[70px] object-cover' />
                </div>
                <div key={i} className='w-full grid grid-cols-12'>
              <div className='p-2 col-span-12 sm:col-span-6'>
                  <p className='text-slate-500 text-sm font-semibold line-clamp-2 md:text-base'>{item.productName.substring(0,30)}...</p>
              </div>
              <div className='flex col-span-12 gap-x-4 sm:gap-x-10 sm:col-span-6'>
                <div className='p-2 flex items-center gap-x-2'>
                    <button className='px-1.5 py-1 bg-slate-200' onClick={handleUpdateCartQuantity.bind(this,item,"dec")}><BiMinus /></button>
                    <p>{item.quantity}</p>
                    <button className='px-1.5 py-1 bg-slate-200' onClick={handleUpdateCartQuantity.bind(this,item,"inc")}><BiPlus /></button>
                </div>            
                <div className='p-2 flex items-center text-center text-slate-600 font-semibold'><CurrencyFormat price={Number(item.totalPrice)} /></div>   
              </div>           
            </div>
              <div className='p-2 text-center flex items-center'>
                <button className='cursor-pointer hover:bg-slate-200 px-3 py-2 hover:shadow-md hover:border-3' onClick={handleDeleteCartItem.bind(this,item._id)}><BsTrash /></button>
              </div>            
            </div>)
          }
      </div>
}
