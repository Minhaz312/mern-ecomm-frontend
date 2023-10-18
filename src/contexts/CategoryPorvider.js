import axios from "axios";
import { createContext, useEffect, useState } from "react";
import apiUrl from "./../apiUrl"
const initialValue = {
  loading:true,
  categoryList: [
    {_id:null,name:null,subcategories:[]}
  ],
  updateList:null
}

export const CategoryContext = createContext(initialValue)

export function CategoryPorvider({children}){
    const [catLoading, setCatLoading] = useState(true);
    const [categoryList, setCategoryList] = useState(initialValue);
    const getAllCategory = () => {
      axios.get(`${apiUrl}/category/get/all`).then(res=>{
        setCatLoading(false)
        if(res.status === 200 && res.data.success===true){
          setCategoryList(res.data.categories)
        }
      }).catch(err=>{
          setCatLoading(false)
    
        })
    }
    const updateCategoryList = list => {
      setCategoryList(list)
    }
    useEffect(()=>{
        getAllCategory()
    },[])
    return <CategoryContext.Provider value={{
      loading:catLoading,
      categoryList:categoryList,
      updateList:getAllCategory
    }}>
        {children}
    </CategoryContext.Provider>
}
