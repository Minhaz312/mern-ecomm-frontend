import { createContext, useEffect, useState } from "react";
import apiUrl from "./../apiUrl"

const initialContext = [
    {_id:"",name:"",categories:[]}
]

export const categoryContext = createContext(initialContext)

export default function CategoryContextProvider({children}){
    const [categoryList, setCategoryList] = useState(null)
    const getAllCategory = () => {
        fetch(`${apiUrl}/category/get/all`).then(res=>{
            if(res.status === 200 && res.data.success === true) {
                setCategoryList(res.data.categories);
            }else {
                setCategoryList([])
            }
        }).catch(err=>{
            console.log(err)
            setCategoryList([])
        })
    }

    useEffect(()=>{
        getAllCategory()
    },[])

    return <categoryContext.Provider value={categoryList}>
        {children}
    </categoryContext.Provider>
}