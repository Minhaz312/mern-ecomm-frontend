"use client"
import apiUrl,{ api_uri } from '@/app/apiUrl'
import React, { useState } from 'react'
import {useRouter} from 'next/navigation'
import { BiMinus } from 'react-icons/bi'
import { AiOutlinePlus } from 'react-icons/ai'
import { useDispatch, useSelector } from 'react-redux'
import isLoggedIn from '@/utils/isLoggedIn'
import requestHeader from '@/utils/requestHeader'
import { updateCartList } from '@/states/features/userSlice'

export default function ProductDetailsActions({productDetails}) {
    const dispatch = useDispatch()
    const cartList = useSelector(state=>state.user.data)
    const [quantity, setQuantity] = useState(1)
    const [selectedSize, setSelectedSize] = useState(null)
    const [selectedColor, setSelectedColor] = useState(null)

    const router = useRouter()

    const handleAdToCart = () => {
        console.log('old user data: ',cartList)
        if(isLoggedIn()){
            if(productDetails.size.length>0 && selectedSize===null){
                alert("Please select size")
            }else{
                if(productDetails.colors.length>0 && selectedColor===null){
                    alert("Please select color")
                }else {
                    const data = {
                        productId:productDetails._id,
                        color:selectedColor,
                        size:selectedSize,
                        quantity,
                    }
                    fetch(`${apiUrl}/cart/add`,requestHeader("json",{
                        method:"POST",
                        body:JSON.stringify(data)
                    })).then(res=>res.json()).then(res=>{
                        console.log('res data: ',res.data)
                        if(res.success===true) {
                            console.log('res1: ',res)
                            if(cartList!==undefined && cartList!==null){
                                console.log('res2: ',res)
                                dispatch(updateCartList({type:"increment",data:res.data}))
                                console.log('new cartList: ',cartList.cartList)
                            }
                        }
                    }).catch(err=>{
                        console.log('error occured')
                        console.log(err)
                    })
                }
            }
        }else {
            alert("Please login first")
        }
    }
  return (
    <div>
        <div className='my-3'>
            {
            productDetails.size.length>0?<div>
            <h3 className='text-md font-semibold text-slate-700 mb-2'>Sizes({productDetails.size.length})</h3>
            <div className='flex gap-1'>
            {
                productDetails.size.map((size,i)=><p key={i} className={`px-2 py-0.5 cursor-pointer text-sm font-semibold border-2 rounded ${selectedSize!==null&&selectedSize===size?"border-blue-400":"border-slate-100"}`} onClick={()=>setSelectedSize(size)}>{size}</p>)
            }
            </div>
            </div>:""
            }
        </div>
        <div className='my-3'>
            {
            productDetails.colors.length>0?<div>
            <h3 className='text-md font-semibold text-slate-700 mb-2'>Colors({productDetails.colors.length})</h3>
            <div className='flex gap-1'>
            {
                productDetails.colors.map((color,i)=><p key={i} className={`px-2 py-1 cursor-pointer text-sm font-semibold border-2 rounded ${selectedColor!==null&&selectedColor===color?"border-blue-400 font-semibold":"border-slate-100"}`} onClick={()=>setSelectedColor(color)}>{color}</p>)
            }
            </div>
            </div>:""
            }
        </div>
        <div className='flex items-center my-5 md:my-8'>
            <button className='px-3 py-1.5 bg-slate-100' disabled={quantity===1?true:false} onClick={()=>setQuantity(prev=>prev-1)}><BiMinus /></button>
            <p className='mx-4 text-lg font-semibold'>{quantity}</p>
            <button className='px-3 py-1.5 bg-slate-100' disabled={quantity===5?true:false} onClick={()=>setQuantity(prev=>prev+1)}><AiOutlinePlus /></button>
            </div>
        <div>
            <button className={`bg-blue-900 text-white font-bold text-sm rounded px-5 py-1.5 ${productDetails.quantity<1?"cursor-not-allowed":"cursor-pointer"}`} onClick={handleAdToCart} disabled={productDetails.quantity<1?true:false}>Add to Cart</button>
        </div>
    </div>
  )
}
