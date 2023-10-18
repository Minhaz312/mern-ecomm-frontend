import React, { useContext, useEffect, useState } from 'react'
import Layout from '../../components/common/layout'
import DataTable from 'react-data-table-component'
import { FiEdit } from 'react-icons/fi'
import { BsFillTrashFill } from 'react-icons/bs'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import { Alert, Spinner } from 'react-bootstrap'
import axios from 'axios'
import apiUrl, { api_uri } from "../../apiUrl"
import { CategoryContext } from '../../contexts/CategoryPorvider'
import { toast } from 'react-toastify'
export default function AllProduct() {
  const [pLoading, setPLoading] = useState(true)
  const [allProduct, setAllProduct] = useState(null)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const {loading,categoryList} = useContext(CategoryContext)

  const [searchKeyword, setSearchKeyword] = useState("")
  // const [selectedCategory, setSelectedCategory] = useState("")


  const getAllProduct = () => {
    axios.get(`${apiUrl}/product/get/all`).then(res=> {
      console.log("product response: ",res.data.data)
      setPLoading(false)
      if(res.status === 200 && res.data.success === true) {
        setAllProduct(res.data.data)
      }
    }).catch(err=> {
      setPLoading(false)
      setAllProduct([])
      console.log(err)
    })
  }


  const handleOpenDeleteProductModal = productId => {
    Swal.fire({
      title: 'Do you want to delete?',
      showDenyButton: true,
      confirmButtonText: 'Delete',
      icon:"question"
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`${apiUrl}/product/delete/${productId}`).then(res=>{
          console.log("res: ",res)
          if(res.status === 200 && res.data.success === true) {
            getAllProduct()
            Swal.fire({title:'Product deleted successfully',icon:'success'})
          }else {
            Swal.fire({title:"Failed to delete product",icon:"error"})
          }
        }).catch(err=>{
          console.log("err: ",err)
          Swal.fire({title:"Failed to delete product",icon:"error"})
        })
      }
    })
  }

  const handleOpenDeleteMultiProductModal = () => {
    Swal.fire({
      title: 'Do you want to delete?',
      showDenyButton: true,
      confirmButtonText: 'Delete',
      icon:"question"
    }).then((result) => {
      if (result.isConfirmed) {
        let selectedProductIdList = []
        selectedProduct.map(product=>{
          selectedProductIdList.push({id:product._id})
        })
        axios.post(`${apiUrl}/product/delete`,{id:selectedProductIdList}).then(res=>{
          console.log("res: ",res)
          if(res.status === 200 && res.data.success === true) {
            getAllProduct()
            Swal.fire({title:'Product deleted successfully',icon:'success'})
          }else {
            Swal.fire({title:"Failed to delete product",icon:"error"})
          }
        }).catch(err=>{
          console.log("err: ",err)
          Swal.fire({title:"Failed to delete product",icon:"error"})
        })
      }
    })
  }

  

  const handleExportAsCsv = () => {
    
  }
  const handleExportAsExcel = () => {

  } 

  const handleChangeSearchKeyword = e => {
    const keyword = e.target.value.trim();
    if(keyword===""){
      getAllProduct()
    }else {
      setSearchKeyword(keyword)
    }
  }
  const handleSearchProduct = () => {
    if(searchKeyword.trim()!==""){
      axios.get(`${apiUrl}/product/get/search/${searchKeyword}`).then(res=>{
        if(res.status === 200 && res.data.success === true) {
          setAllProduct(res.data.data);
        }else {
          toast.error("failed to search product")
        }
      }).catch(err=>{
        toast.error("failed to search product")
      })
    }
  }
  const handleGetProductByCategory = (e) => {
    const selectedCategory = e.target.value.trim()
    if(selectedCategory!=="" && selectedCategory!=="all"){
      axios.get(`${apiUrl}/product/get/category/${selectedCategory}`).then(res=>{
        if(res.status === 200 && res.data.success === true) {
          setAllProduct(res.data.data);
        }else {
          toast.error("failed to get product")
        }
      }).catch(err=>{
        toast.error("failed to get product")
      })
    }else if(selectedCategory==="all"){
      getAllProduct()
    }
  }
  const handleGetProductByStock = (e) => {
    const selectedStock = e.target.value.trim()
    if(selectedStock==="out"){
      axios.get(`${apiUrl}/product/get/stock/${selectedStock}`).then(res=>{
        if(res.status === 200 && res.data.success === true) {
          setAllProduct(res.data.data);
        }else {
          toast.error("failed to get product")
        }
      }).catch(err=>{
        toast.error("failed to get product")
      })
    }else if(selectedStock==="all"){
      getAllProduct()
    }
  }

  


  useEffect(()=>{
    getAllProduct()
  },[])

  if(pLoading===true) {
    return <Layout>
      <div className='h-100 d-flex justify-content-center align-items-center'>
        <Spinner animation="border" size="lg" />
      </div>
    </Layout>
  }


  const productListColumn = [
    {name:"Name",cell:row=><img src={`${api_uri}/images/${row.primaryImage}`} height="40px" width="auto" />,width:"100px"},
    {name:"Name",selector:row=>row.name.slice(0,100)},
    {name:"Price",selector:row=>row.price,width:"200px"},
    {name:"Discount",selector:row=>row.discount,width:"100px"},
    {name:"Category",selector:row=>row.category.name,width:"200px"},
    {name:"Status",width:"120px",cell:row=><div>
		{
			row.quantity>0&&row.status===true?<button className='btn btn-sm rounded ms-1' style={{backgroundColor:"lightgreen"}} onClick={handleOpenDeleteProductModal.bind(this,row._id)}>Active</button>:<button className='btn btn-sm rounded' style={{backgroundColor:"rgba(255, 0, 0, 0.527)"}}>Out of Stock</button>
		}      
    </div>},
    {name:"Action",cell:row=><div>
      <Link to={`/product/edit/${row._id}`} className='btn btn-sm btn-primary rounded-0'><FiEdit /></Link>
      <button className='btn btn-sm rounded-0 btn-danger' onClick={handleOpenDeleteProductModal.bind(this,row._id)}><BsFillTrashFill /></button>
    </div>}
  ]
  const customStyles = {
    rows: {
        style: {
            minHeight: '72px', // override the row height
        },
    },
    headCells: {
        style: {
            paddingLeft: '8px', // override the cell padding for head cells
            paddingRight: '8px',
            fontSize:"20px",
            backgroundColor:"#3D5BA0",
            color:"white"
        },
    },
    cells: {
        style: {
            paddingLeft: '8px', // override the cell padding for data cells
            paddingRight: '8px',
            fontSize:"16px"
        },
    },
};

const CategoryListComponent = () => {
  return categoryList!==null?categoryList.map((cat,i)=>{
      if(cat.subcategories.length>0){
          return cat.subcategories.map((s_cat,i)=>{
              return <option key={i} value={s_cat.name}>{s_cat.name}</option>
          })
      }else {
          return <option key={i} value={cat.name}>{cat.name}</option>
      }
  }):<option>no cateogry found</option>
}

  return (
    <Layout>
      <div className='mb-3 w-100 d-flex justify-content-between'>
          <h3>Product List</h3>
          <div className='d-flex gapx-3'>
            <div className='d-flex'>
              <input type="search" className='form-control rounded-0' onChange={handleChangeSearchKeyword} placeholder='Search product...' style={{minWidth:"300px"}} />
              <button className='btn btn-secondary rounded-0' onClick={handleSearchProduct}>search</button>
            </div>
            <select className='form-control rounded-0 ms-2 shadow-sm' style={{width:"100px"}} onChange={handleGetProductByStock}>
              <option>Filter By</option>
              <option value="all">All</option>
              <option value="out">Stock out</option>
              <option>Most Purchased</option>
            </select>
            <select className='form-control rounded-0 ms-2 shadow-sm' style={{width:"auto"}} onChange={e=>handleGetProductByCategory(e)}>
              <option>Filter By Category</option>
              <option value="all">All</option>
              <CategoryListComponent />
            </select>
            <select className='form-control rounded-0 ms-2 shadow-sm' style={{width:"100px"}}>
              <option>Export As</option>
              <option onClick={handleExportAsCsv}>CSV</option>
              <option onClick={handleExportAsExcel}>Excel</option>
            </select>
              <Link to="/product/add" className='btn btn-primary shadow-sm rounded-0 ms-5'>Add New</Link>
          </div>
      </div>
      {
        selectedProduct!==null?<Alert>{selectedProduct.length} product selected  <span className='text-decoration-underline text-danger ms-3' style={{cursor:"pointer"}} onClick={handleOpenDeleteMultiProductModal}>delete all</span></Alert>:null
      }
      {
        allProduct!==null?<DataTable
        columns={productListColumn}
        data={allProduct}
        pagination
        selectableRows
        customStyles={customStyles}
        selectableRowsVisibleOnly
        onSelectedRowsChange={(e)=>{
          if(e.selectedCount>0) {
            setSelectedProduct(e.selectedRows)
          }else {
            setSelectedProduct(null)
          }
        }}  
      />:""
      }
      
    </Layout>
  )
}
