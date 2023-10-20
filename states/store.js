"use client"
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./features/userSlice";
import { Provider } from "react-redux";

export const store =  configureStore({
    reducer:{
        user: userSlice
    }
})

const StoreProvider = ({children}) => {
    return <Provider store={store}>
        {children}
    </Provider>
}

export default StoreProvider