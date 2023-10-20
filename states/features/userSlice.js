"use client"
import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    isLoading: false,
    isError:false,
    isSuccess:false,
    data:null
  },
  reducers: {
    setLoading:(state)=>{
        state.isLoading=true
    },
    storeUser: (state,action) => {
      state.isLoading = false
      if(action.payload.operation==="success") {
        state.isSuccess = true
        state.data = action.payload.data
    }else if(action.payload.operation==="failed"){
          state.isError = true
          state.data = undefined
      }else{
        state.data = undefined
      }
    },
    updateCartList:(state,action) => {
      if(action.payload.type==="increment"){
        let newCartList = [...state.data.cartList.list,action.payload.data]
        let newTotalPrice = action.payload.data.totalPrice+state.data.cartList.totalPrice
        let newTotalProduct = action.payload.data.totalProduct+state.data.cartList.totalProduct
        let newData = {cartList:{list:newCartList,totalPrice:newTotalPrice,totalProduct:newTotalProduct}}
        for (const key in state.data) {
          if(key!=="cartList"){
            newData[key] = state.data[key]
          }
        }
        state.data = newData
      }else{

      }
    },
    updateCartItem:(state,action) => {
      const data = action.payload;
      let oldList = state.data.cartList.list;
      const oldCartItem = oldList.find(p=>p._id.toString()===data.cartId.toString())
      const index = oldList.findIndex(p=>p._id.toString()===data.cartId.toString());
      oldList.splice(index,1)
      let newCartItem = {quantity:data.quantity,totalPrice:data.totalPrice}
      for (const key in oldCartItem) {
        if(key!=="quantity"&&key!=="totalPrice"){
          newCartItem[key] = oldCartItem[key]
        }
      }
      oldList.push(newCartItem)
      let newData = {}
      for (const key in state.data) {
        if(key==="cartList"){
          newData[key] = oldList
        }else{
          newData[key] = state.data[key]
        }
      }
    }
  },
})

export const { setLoading, storeUser,updateCartList, updateCartItem } = userSlice.actions

export default userSlice.reducer