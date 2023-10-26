"use client"
import React, { useEffect, useState } from 'react'
import CurrencyFormat from '../common/CurrencyFormat'
import { BsTrash } from 'react-icons/bs'
import apiUrl, { api_uri } from '@/app/apiUrl'
import requestHeader from '@/utils/requestHeader'
import { useDispatch, useSelector } from 'react-redux'
import { BiMinus, BiPlus } from 'react-icons/bi'
import { deleteCartItem, updateCartItem } from '@/states/features/userSlice'
import { MdDelete } from 'react-icons/md'
import { IoCloseSharp } from 'react-icons/io5'
import Swal from 'sweetalert2'
export default function CartList() {
  const dispatch = useDispatch()
  const userData = useSelector(state=>state.user.data)

  const [updatingCartItem, setUpdatingCartItem] = useState(false);

  const [selectedCartItem, setSelectedCartItem] = useState([])

  const handleUpdateCartQuantity = async (item,type="inc") => {
    setUpdatingCartItem(true)
    let data = {
      cartId:item._id,
    }
    if(type==="inc"&&item.quantity<10){
      data.quantity = item.quantity+1
      data.totalPrice = item.totalPrice+item.productPrice
    }else if(type==="dec"&&item.quantity!==1){
      data.quantity = item.quantity-1
      data.totalPrice = item.totalPrice-item.productPrice
    }else{
      alert('please look at your action')
    }
    if(data.quantity!==undefined){
      console.log("not undefined")
      const res = await fetch(`${apiUrl}/cart/update/quantity`,requestHeader("json",{
        method:"POST",
        body:JSON.stringify(data)
      }))
      if(res.ok){
        setUpdatingCartItem(false)
        dispatch(updateCartItem(data))
      }
    }
    console.log('data: ',data)
  }
  useEffect(()=>{},[userData])
  if(userData===undefined || userData===null){
    return <h3 className='text-md text-center my-5 font-semibold text-slate-600'>Failed to load</h3>
  }
  
  
  const handleSelectCartItem = id => {
    if(selectedCartItem.length<1){
      setSelectedCartItem([id]);
    }else{
      const index = selectedCartItem.findIndex(p=>p===id)
      if(index>-1){
        let oldList = [...selectedCartItem];
        oldList.splice(index,1)
        setSelectedCartItem(oldList);
      }else{
        setSelectedCartItem(ps=>[...ps,id])
      }
    }
  }



  const handleDeleteCartItem = id => {
    let deleteIdList = []
    if(typeof id === "string"){
      deleteIdList.push(id);
    }else{
      if(selectedCartItem.length>0){
        selectedCartItem.map(item=>{
          deleteIdList.push(item);
        })
      }
    }

    if(deleteIdList.length>0){
      Swal.fire({
          title:"Are you sure?",
          icon:"question",
          showDenyButton: true,
          confirmButtonText: 'Delete',
      }).then(go=>{
        if(go.isConfirmed){
          fetch(`${apiUrl}/cart/delete`,requestHeader("json",{
            method:"DELETE",
            body:JSON.stringify({id:deleteIdList})
          })).then(res=>res.json()).then(res=>{
            console.log('res: ',res)
            if(res.success){
              Swal.fire({
                title:"Your cart cleared",
                icon:"success"
              })
              if(typeof id === "string"){
                dispatch(deleteCartItem({cartId:id}))
              }else{
                selectedCartItem.map(item=>{
                  dispatch(deleteCartItem({cartId:item}))
                })
                setSelectedCartItem([])
              }
            }
          }).catch(err=>{
            Swal.fire({
              title:"Failed to delete!",
              text:"Please try again!",
              icon:"error"
            })
            setSelectedCartItem([])
          })
        }
      })
    }

    
  }

  if(userData.cartList.list.length<1){
      return <h3 className='text-md text-center my-5 font-semibold text-slate-600'>no product added yet</h3>
    }
    return <div className='w-full'>
      {selectedCartItem.length>0&&(<div className='flex justify-end mb-3'>
        <button onClick={handleDeleteCartItem} className='flex items-center justify-center gap-x-2 px-2 py-1 bg-red-700 text-white font-semibold text-sm'>
          <IoCloseSharp size={20} />
          <p>delete {selectedCartItem.length} items</p>
        </button>
      </div>)}
          {
            userData.cartList.list.map((item,i)=><div key={i} className='flex border mb-1 odd:bg-slate-200/20 hover:bg-slate-200/40'>
              <input type='checkbox' name="cart" checked={selectedCartItem.includes(item._id)} className='ml-3' onChange={handleSelectCartItem.bind(this,item._id)} />
                <div className='p-2 '>
                  <img src={`${api_uri}/images/${item.productImage}`} className='h-[70px] w-[70px] object-cover' />
                </div>
                <div key={i} className='w-full grid grid-cols-12'>
              <div className='p-2 col-span-12 sm:col-span-6'>
                  <p className='text-slate-500 text-sm font-semibold line-clamp-2 md:text-base'>{item.productName.substring(0,30)}...</p>
              </div>
              <div className='flex col-span-12 gap-x-4 sm:gap-x-10 sm:col-span-6'>
                <div className='p-2 flex items-center gap-x-2'>
                    <button disabled={updatingCartItem} className='px-1.5 py-1 bg-slate-200' onClick={handleUpdateCartQuantity.bind(this,item,"dec")}><BiMinus /></button>
                    <p>{item.quantity}</p>
                    <button disabled={updatingCartItem} className='px-1.5 py-1 bg-slate-200' onClick={handleUpdateCartQuantity.bind(this,item,"inc")}><BiPlus /></button>
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
