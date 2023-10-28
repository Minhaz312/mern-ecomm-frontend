"use client"
import React, { useState } from 'react'
import CurrencyFormat from '../common/CurrencyFormat';
import { BsEye, BsTrash } from 'react-icons/bs';
import Modal from '../common/Modal';
import OrderInvoice from './OrderInvoice';
import { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';

export default function OrderList({list}) {
  const printInvoiceRef = useRef(null)
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);

  const handleShowInvoice = order => {
    if(showInvoiceModal) {
      setSelectedOrder(null)
      setShowInvoiceModal(false)
    }else{
      setSelectedOrder(order)
      setShowInvoiceModal(true)
    }
  }
  const handlePrintInvoice = useReactToPrint({
    content:()=>printInvoiceRef.current
   })
    if(list===null || list===undefined){
    return <div className='h-full w-full flex justify-center items-center'>
      <h3 className='text-md text-center my-5 font-semibold text-slate-600'>Failed to load</h3>
    </div>
  }
    if(list.length<1){
    return <div className='h-full w-full flex justify-center items-center'>
        <h3 className='text-md text-center my-5 font-semibold text-slate-600'>No order</h3>

    </div>
  }
  return <div>
    {selectedOrder!==null&&(
      <Modal show={showInvoiceModal} onHide={handleShowInvoice} title='Order Invoice' btnTitle='Print' onAction={handlePrintInvoice}>
        <div ref={printInvoiceRef}>
          <OrderInvoice order={selectedOrder} />
        </div>
      </Modal>
    )}
    <table className='w-full'>
          <thead className='bg-slate-700 text-white'>
            <tr>
              <th className='text-[12px] p-2 w-[10%]'>quantity</th>
              <th className='text-[12px] p-2 w-[20%]'>Total Price</th>
              <th className='text-[12px] p-2 w-[30%]'>Status</th>
              <th className='text-[12px] p-2 w-[20%]'>OrderDate</th>
              <th className='text-[12px] p-2 w-[20%]'>Action</th>
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
                  orderStatus.message="Wait for acceptence"
                  orderStatus.icon = "text-red-800 font-semibold px-3 py-1"
                }
                return <tr key={i} className='odd:bg-slate-200/20 hover:bg-slate-200/40'>
                <td className='w-[10%] text-center'>{quantity}</td>            
                <td className='w-[20%] text-center text-sm md:text-base'><CurrencyFormat price={totalPrice} /></td>            
                <td className='w-[20%] text-sm text-center md:text-base'>
                  {item.accepted&&<p className={orderStatus.icon}>{orderStatus.statusText}</p>}
                  <p className='text-[13px] text-yellow-600 font-semibold sm:text-base'>{orderStatus.message!==null?orderStatus.message:""}</p>
                </td>          
                <td className='w-[20%] text-center text-sm md:text-base'>{new Date(item.orderDate).toDateString()}</td>
                <td className='w-[20%] text-center'>
                  <button className='cursor-pointer hover:bg-slate-200 px-3 py-2 hover:shadow-md hover:border-3' onClick={handleShowInvoice.bind(this,item)} ><BsEye /></button>
                </td>            
              </tr>
              })
            }
          </tbody>
    </table>
  </div>
}
