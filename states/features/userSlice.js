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
      let newCartItem = {quantity:data.quantity,totalPrice:data.totalPrice}
      for (const key in oldCartItem) {
        if(key!=="quantity"&&key!=="totalPrice"){
          newCartItem[key] = oldCartItem[key]
        }
      }
      oldList.splice(index,1,newCartItem)
      let newData = {}
      for (const key in state.data) {
        if(key==="cartList"){
          console.log('state totalPrice: ',state.data.cartList.totalProduct)
          console.log('data totalPrice: ',data.quantity)
          const newList = {list:oldList,totalPrice:state.data.cartList.totalPrice-oldCartItem.totalPrice+data.totalPrice,totalProduct:state.data.cartList.totalProduct-oldCartItem.quantity+data.quantity}
          newData[key] = newList
        }else{
          newData[key] = state.data[key]
        }
      }
      state.data = newData
    },
    deleteCartItem: (state,action) => {
      const index = state.data.cartList.list.findIndex(p=>p._id.toString()===action.payload.cartId.toString());
      let prevList = state.data.cartList.list.map(obj => ({ ...obj }));
      console.log('prevList after delt: ',prevList)
      prevList.splice(index,1);
      console.log('prevList after delt: ',prevList)
      let newTotalPrice = 0;
      let newTotalProduct = 0;

      prevList.map(item=>{
        newTotalPrice += item.totalPrice
        newTotalProduct += item.quantity
      })
      
      const newList = {totalPrice:newTotalPrice,totalProduct:newTotalProduct,list:prevList}
      state.data = {...state.data,cartList:newList}
    },
    makeEmptyCart: (state) => {
      let data = {}
      for (const key in state.data) {
        if(key==="cartList"){
          data.cartList = {
            list:[],
            totalPrice:0,
            totalProduct:0
          };
        }else{
          data[key] = state.data[key];
        }
      }
      state.data = data;
    },
    addNewOrderItem: (state,action) => {
      let data = {}
      for (const key in state.data) {
        if(key==="orderList"){
          data.orderList = [...state.data.orderList,action.payload.item];
        }else{
          data[key] = state.data[key];
        }
      }
      state.data = data;
    }
  },
})

export const { setLoading, storeUser,updateCartList, updateCartItem, deleteCartItem, makeEmptyCart, addNewOrderItem } = userSlice.actions

export default userSlice.reducer