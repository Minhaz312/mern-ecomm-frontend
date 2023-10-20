"use client"
import React from 'react'
import CurrencyFormat from '../common/CurrencyFormat';
import { BsTrash } from 'react-icons/bs';

export default function OrderList({list}) {
    if(list===null || list===undefined){
    return <h3 className='text-md text-center my-5 font-semibold text-slate-600'>Failed to load</h3>
  }
    if(list.length<1){
    return <h3 className='text-md text-center my-5 font-semibold text-slate-600'>No order</h3>
  }
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
            list.map((item,i)=>{
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
