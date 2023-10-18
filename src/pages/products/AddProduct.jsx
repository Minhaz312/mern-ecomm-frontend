import React, { useEffect, useReducer } from 'react'
import Layout from '../../components/common/layout'
import { Col, Row } from 'react-bootstrap'
import { useState } from 'react'
import ReactQuill from 'react-quill';
import { toast } from 'react-toastify';
import { GrFormClose } from "react-icons/gr"
import apiUrl from "../../apiUrl"
import axios from 'axios';
import Swal from 'sweetalert2';

const initialProductProps = {
    name:null,
    brand:null,
    description:null,
    price:null,
    size:[],
    colors:[],
    quantity:null,
    discount:null,
    tags:"",
    categoryId:null
}


const productReducer = (state,action) => {
    switch (action.type) {
        case "addName":
            return {...state, name:action.value}
        case "addBrand":
            return {...state, brand:action.value}
        case "addDescription":
            return {...state, description:action.value}
        case "addPrice":
            return {...state, price:action.value}
        case "addSize":
            return {...state, size:[...state.size,...action.value]}
        case "removeSize":
            return {...state, size:[...action.value]}
        case "addColor":
            return {...state, colors:[...state.colors,...action.value]}
        case "removeColor":
            return {...state, colors:[...action.value]}
        case "addQuantity":
            return {...state, quantity:action.value}
        case "addDiscount":
            return {...state, discount:action.value}
        case "addTags":
            return {...state, tags:action.value}
        case "addPrimaryImage":
            return {...state, primaryImage:action.value}
        case "addImages":
            return {...state, images:action.value}
        case "addCategoryId":
            return {...state, categoryId:action.value}
        default:
            return state;
    }
}


export default function AddProduct() {
    const [selectedImageList, setSelectedImageList] = useState([])
    const [selectedPrimaryImage, setSelectedPrimaryImage] = useState(null)
    const [selectedPrimaryImageToPreview, setSelectedPrimaryImageToPreview] = useState(null)
    const [productDescription, setProductDescription] = useState("")
    const [selectedImageListToPreview, setSelectedImageListToPreview] = useState([])

    const [categoryList, setCategoryList] = useState(null)

    const [productProps, dispatch] = useReducer(productReducer, initialProductProps)

    const [newSize, setNewSize] = useState("")
    const [newColor, setNewColor] = useState("")


    // product properties value 

    const handleGetProductName = e => {
        const name = e.target.value.trim()
        dispatch({type:"addName",value:name})
    }
    const handleGetBrand = e => {
        const name = e.target.value.trim()
        dispatch({type:"addBrand",value:name})
    }
    const handleGetProductDescription = e => {
        const desc = e.trim()
        setProductDescription(desc)
        dispatch({type:"addDescription",value:desc})
    }
    const handleGetProductPrice = e => {
        const price = e.target.value.trim()
        dispatch({type:"addPrice",value:price})
    }
    const handleGetProductSize = e => {
        const size = e.target.value.trim()
        if(size!==""){
            setNewSize(size)
        }
    }
    const handleAddNewSize = () => {
        if(newSize!==""){
            dispatch({type:"addSize",value:[newSize]})
        }
    }
    const handleRemoveSize = size => {
        const prevSizeList = productProps.size
        let newSizeList = []
        prevSizeList.map(item=>{
            if(item!==size){
                newSizeList.push(item)
            }
        })
        dispatch({type:"removeSize",value:newSizeList})
    }
    const handleAddNewColor = () => {
        if(newColor!==""){
            dispatch({type:"addColor",value:[newColor]})
        }
    }
    const handleRemoveColor = color => {
        if(productProps.colors.length>1){
            const prevColorList = productProps.colors
            let newColorList = []
            prevColorList.map(item=>{
                if(item!==color){
                    newColorList.push(item)
                }
            })
            dispatch({type:"removeColor",value:newColorList})
        }
    }
    const handleGetProductColor = e => {
        const color = e.target.value.trim()
        if(color!==""){
            setNewColor(color)
        }
    }
    const handleGetProductQuantity = e => {
        const quantity = e.target.value.trim()
        dispatch({type:"addQuantity",value:quantity})
    }
    const handleGetProductDiscount = e => {
        const discount = e.target.value.trim()
        dispatch({type:"addDiscount",value:discount})
    }
    const handleGetProductTags = e => {
        const tags = e.target.value.trim()
        dispatch({type:"addTags",value:tags})
    }
    const handleGetProductCategoryId = e => {
        const categoryId = e.target.value.trim()
        dispatch({type:"addCategoryId",value:categoryId})
    }


    const getAllCateogry = () => {
        axios.get(`${apiUrl}/category/get/all`).then(res=>{
          console.log("res: ",res)
          if(res.status === 200 && res.data.success===true){
            setCategoryList(res.data.categories)
          }
        }).catch(err=>{
    
        })
    }

    
    const handleAddProduct = () => {
        // console.log("clicked add product")
        // console.log("file list length",selectedImageList.length)
        // console.log("preview file list length",selectedImageListToPreview.length)
        if(productProps.name==="" || productProps.price==="" || productProps.size==="" || productProps.colors===null || productProps.quantity==="" || productProps.discount==="" || productProps.description===null || productProps.categoryId===null){
            Swal.fire({title:"Please fill all fields!",icon:"warning"})
        }else {
            console.log("product props: ",productProps)
            console.log("selected images: ",selectedImageList)
            const formData = new FormData()

            formData.append("primaryImage",selectedPrimaryImage)
            for (let i = 0; i < selectedImageList.length; i++) {
                formData.append("images",selectedImageList[i].file)
            }
            // for(const property in productProps) {
            //     formData.append(`${property}`,productProps[property])
            // }
            formData.append("data",JSON.stringify(productProps))

            axios.post(`${apiUrl}/product/add`,formData,{headers:{"Content-Type":"multipart/form-data"}}).then(res=>{
                if(res.status === 200 && res.data.success === true) {
                    toast.success("Product added")
                }else {
                    toast.error("Failed to add product")
                }
            }).catch(err=>{
                console.log(err)
                toast.error("Failed to add product")
            })
        }
        
    }

    
    const CategoryListComponent = () => {
        return categoryList!==null?categoryList.map((cat,i)=>{
            if(cat.subcategories.length>0){
                return cat.subcategories.map((s_cat,i)=>{
                    return <option key={i} value={s_cat._id}>{s_cat.name}</option>
                })
            }else {
                return <option key={i} value={cat._id}>{cat.name}</option>
            }
        }):<option>no cateogry found</option>
    }

    useEffect(()=>{
        getAllCateogry()
    },[])

    const handleSelectPrimaryProductImage = e => {
        const image = e.target.files[0];
        const objectUrl = URL.createObjectURL(image);
        setSelectedPrimaryImageToPreview(objectUrl)
        setSelectedPrimaryImage(image)
    }
    const handleSelectProductImage = e => {
        let fileList = []
        let previewList = [];
        [...e.target.files].forEach((file,i)=>{
            fileList.push({id:i+1,file:file})
            previewList.push({id:i+1,src:URL.createObjectURL(file)})
        })
        setSelectedImageList(fileList)
        setSelectedImageListToPreview(prev=>previewList)

    }

    const handleDiselectProductImage = id => {
        if(selectedImageListToPreview!==null && selectedImageListToPreview.filter(item=>item.id===id?true:false)){
            let newPreviewFileList = []
            let newFileList = []
            selectedImageListToPreview.map(item=>{
                if(item.id!==id) {
                    newPreviewFileList.push(item)
                }
            })
            selectedImageList.map(item=>{
                if(item.id!==id) {
                    newFileList.push(item)
                }
            })
            setSelectedImageList(prev=>newFileList)
            setSelectedImageListToPreview(prev=>newPreviewFileList)
        }
    }

    const PrimaryImagePreview = () => {
        if(selectedPrimaryImageToPreview!==null) {
            return <img src={selectedPrimaryImageToPreview} height="200" width="auto" />
        }else {
            return ""
        }
    }

    const PreviewImage = () => {
        if(selectedImageListToPreview!==null) {
            return selectedImageListToPreview.map((item,i)=>{
                return <div className='m-2 p-1 bg-white' key={i}  style={{height:"200px",width:"auto",display:"inline-block",position:"relative"}}>
                    <span className='bg-white px-2 text-dark fw-bold fs-4' style={{position:"absolute",top:"5px",right:"5px",cursor:"pointer",borderBottomLeftRadius:"50%"}} onClick={handleDiselectProductImage.bind(this,item.id)}><GrFormClose style={{fontSize:"25px"}} /></span>
                    <img src={item.src} style={{height:"100%",width:"auto"}} />
                </div>
            })
        }else {
            return ""
        }
    }
    

  return (
    <Layout>
        <Row>
            <Col md={6}>
                <div className='mb-3'>
                    <label className='fs-5 mb-2 fw-semibold'>Product Name</label>
                    <input type="text" onChange={handleGetProductName} className='form-control form-control-md w-100 rounded-0' placeholder='Enter product name' />
                </div>
                <Row>
                    <Col md={6}>
                        <label className='fs-5 mb-2 fw-semibold'>Product Category</label>
                        <select className='form-control' onChange={handleGetProductCategoryId}>
                            <option>select category</option>
                            {
                                categoryList!==null?<CategoryListComponent />:<option>no category found</option>
                            }
                        </select>
                    </Col>
                    <Col md={6}>
                        <label className='fs-5 mb-2 fw-semibold'>Product Brand</label>
                        <input type="text" onChange={handleGetBrand} className='form-control' />
                    </Col>
                </Row>
                <div className='mt-3'>
                    <div>
                        <label className='fs-5 mb-2 fw-semibold'>Product Size</label>
                        <div className='d-flex'>
                            <div className='border rounded-0 p-1 bg-white'>
                            <div className='d-flex flex-wrap gap-1 align-items-center'>
                                {
                                    productProps.size.map((size,i)=><div key={i} className='d-flex text-dark bg-light fs-5 shadow-sm border rounded-0 px-2'>
                                        <span>{size.toUpperCase()}</span>
                                        <div className='d-flex align-items-center gap-1 ms-2'>
                                            <span style={{color:"rgb(0,0,0,0.3)"}}>|</span>
                                            <GrFormClose onClick={handleRemoveSize.bind(this,size)} />
                                        </div>
                                    </div>)
                                }
                            <input type='text' className='form-control form-control-sm border-0 outline-0' placeholder='type to add new color' style={{minWidth:"300px",width:"auto",outlineWidth:"0",borderWidth:"0",float:"right"}} onChange={handleGetProductSize} />
                            </div>
                            </div>
                            {
                                newSize!==""?<button className='btn btn-success rounded-0' disabled={newSize!==""?false:true} onClick={handleAddNewSize}>add</button>:""
                            }
                        </div>
                    </div>
                </div>
                <div className='mt-3'>
                    <div>
                        <label className='fs-5 mb-2 fw-semibold'>Product Color</label>
                        <div className='d-flex'>
                            <div className='border rounded-0 p-1 bg-white'>
                            <div className='d-flex flex-wrap gap-1 align-items-center'>
                                {
                                    productProps.colors.map((color,i)=><div key={i} className='d-flex text-dark bg-light fs-5 shadow-sm border rounded-0 px-2'>
                                        <span>{color.toUpperCase()}</span>
                                        <div className='d-flex align-items-center gap-1 ms-2'>
                                            <span style={{color:"rgb(0,0,0,0.3)"}}>|</span>
                                            <GrFormClose onClick={handleRemoveColor.bind(this,color)} />
                                        </div>
                                    </div>)
                                }
                            <input type='text' className='form-control form-control-sm border-0 outline-0' placeholder='type to add new color' style={{minWidth:"300px",maxWidth:"500px",width:"auto",outlineWidth:"0",borderWidth:"0",float:"right"}} onChange={handleGetProductColor} />
                            </div>
                            </div>
                            {
                                newColor!==""?<button className='btn btn-success rounded-0' disabled={newColor!==""?false:true} onClick={handleAddNewColor}>add</button>:""
                            }
                        </div>
                    </div>
                </div>
                <div>
                    <label className='fs-5 mb-2 fw-semibold'>Product Description</label>
                    {/* <textarea rows={20} className='form-control mb-3' placeholder='write here...'></textarea> */}
                    <div className='bg-white'>
                        <ReactQuill value={productDescription} onChange={handleGetProductDescription} style={{height:"500px"}} />
                    </div>
                </div>
            </Col>
            <Col md={6}>
                <Row>
                    <Col>
                        <label className='fs-5 mb-2 fw-semibold'>Prize</label>
                        <input type="text" className='form-control rounded-0' onChange={handleGetProductPrice} placeholder='Product Prize' />
                    </Col>
                    <Col>
                        <label className='fs-5 mb-2 fw-semibold'>Discount(%)</label>
                        <input type="text" className='form-control rounded-0' onChange={handleGetProductDiscount} placeholder='Product Discount(%)' />
                    </Col>
                    <Col>
                        <label className='fs-5 mb-2 fw-semibold'>Quantity</label>
                        <input type="text" className='form-control rounded-0' onChange={handleGetProductQuantity} placeholder='Product Quantity' />
                    </Col>
                </Row>
                <div className='my-3'>
                    <label className='fs-5 mb-2 fw-semibold'>Product Tags</label>
                    <input type="text" onChange={handleGetProductTags} className='form-control rounded-0' placeholder='Product Tags' />
                </div>
                <div className='my-3'>
                    <label className='fs-5 mb-2 fw-semibold'>Upload Primary Image</label>
                    <input type='file' onChange={handleSelectPrimaryProductImage} className='form-control form-control-lg' />
                </div>
                <PrimaryImagePreview />
                <div className='my-3'>
                    <label className='fs-5 mb-2 fw-semibold'>Upload Product Image</label>
                    <input type='file' onChange={handleSelectProductImage} multiple className='form-control form-control-lg' />
                </div>
                <div className='my-3' style={{overflowX:"hidden"}}>
                    <div className='d-flex gapx-2' style={{overflowX:"scroll"}}>
                        <PreviewImage />
                    </div>
                </div>
                <button className='px-5 btn btn-success rounded-0 shadow-sm my-5 fw-semibold' onClick={handleAddProduct}>Publish</button>
            </Col>
        </Row>
    </Layout>
  )
}
