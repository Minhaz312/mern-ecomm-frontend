import React, { useContext, useEffect } from 'react'
import Layout from '../../components/common/layout'
import { Col, Row, Spinner } from 'react-bootstrap'
import { useState } from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import apiUrl, { api_uri } from "../../apiUrl"
import { GrFormClose } from 'react-icons/gr';
import Swal from 'sweetalert2';
import { CategoryContext } from '../../contexts/CategoryPorvider';

export default function EditProduct() {
    const {id} = useParams()
    const productId = id;

    const [pLoading, setPLoading] = useState({loading:true,error:false})
    const [selectedProduct, setSelectedProduct] = useState(null)

    const {loading,categoryList,updateList} = useContext(CategoryContext)

    const [productDescription, setProductDescription] = useState("")
    const [selectedDropedFileListToPreview, setSelectedFileDropedListToPreview] = useState(null)



    const [updatedName,setUpdatedName] = useState("")
    const [updatedDescription,setUpdatedDescription] = useState("")
    const [updatedPrice,setUpdatedPrice] = useState("")
    const [updatedDiscount,setUpdatedDiscount] = useState("")
    const [updatedQuantity,setUpdatedQuantity] = useState("")
    const [updatedTags,setUpdatedTags] = useState("")
    const [updatedSize, setUpdatedSize] = useState([])
    const [updatedBrand, setUpdatedBrand] = useState("")
    const [newSize, setNewSize] = useState("")
    const [updatedCategory, setUpdatedCategory] = useState("")
    const [updatedColors, setUpdatedColors] = useState([])
    const [newColor, setNewColor] = useState("")
    const [updatedImages, setUpdatedImages] = useState([])
    const [updatedPrimaryImage, setUpdatedPrimaryImage] = useState("")



    const getSelectedProduct = () => {
        axios.get(`${apiUrl}/product/get/${productId}`).then(res=>{
            console.log(res.data)
            setPLoading({loading:false,error:false})
            if(res.status === 200 && res.data.success === true) {
                const product = res.data.data;
                setProductDescription(product.description)
                setSelectedProduct(product)
                setUpdatedName(product.name)
                setUpdatedDescription(product.description)
                setUpdatedPrice(product.price.toString())
                setUpdatedDiscount(product.discount.toString())
                setUpdatedQuantity(product.quantity.toString())
                setUpdatedTags(product.tags)
                setUpdatedSize(product.size)
                setUpdatedBrand(product.brand)
                setUpdatedColors(product.colors)
                setUpdatedImages(product.images)
                setUpdatedPrimaryImage(product.primaryImage)
            }else {
                setPLoading({loading:false,error:true})
            }
        }).catch(err=>{
            console.log(err)
            setPLoading({loading:false,error:true})
        })
    }


    const handleUpdateName = e => {
        setUpdatedName(e.target.value.trim())
    }
    const handleUpdateBrand = e => {
        setUpdatedBrand(e.target.value.trim())
    }
    const handleUpdateDescription = e => {
        setUpdatedDescription(e)
    }
    const handleUpdatePrice = e => {
        setUpdatedPrice(e.target.value.trim())
    }
    const handleUpdateDiscount = e => {
        setUpdatedDiscount(e.target.value.trim())
    }
    const handleUpdateQuantity = e => {
        setUpdatedQuantity(e.target.value.trim())
    }
    const handleUpdateTags = e => {
        setUpdatedTags(e.target.value.trim())
    }
    const handleUpdateCategory = e => {
        setUpdatedCategory(e.target.value)
    }
    const handleGetNewSize = e => {
        const name = e.target.value.trim()
        if(name!==""){
            setNewSize(name)
        }
    }
    const handleAddNewSize = () => {
        let exist = false;
        updatedSize.map(item=>{
            if(item.toLowerCase()===newSize.toLowerCase()){
                exist = true;
            }
        })
        if(newSize!=="" && exist===false){
            const prevSizes = updatedSize;
            const newSizeList = [...prevSizes,newSize]
            setUpdatedSize(newSizeList)
            setNewSize("")
        }
    }
    const handleRemoveSize = size => {
        let newSizeList = []
        const prevSizes = updatedSize;
        if(prevSizes.length>1){
            prevSizes.map(item=>{
                if(size!==item){
                    newSizeList.push(item)
                }
            })
            setUpdatedSize(newSizeList)
        }
    }
    const handleGetNewColor = e => {
        const name = e.target.value.trim()
        if(name!==""){
            setNewColor(name)
        }
    }
    const handleAddNewColor = () => {
        let exist = false;
        updatedColors.map(item=>{
            if(item.toLowerCase()===newColor.toLowerCase()){
                exist = true;
            }
        })
        if(newColor!=="" && exist===false){
            const prevColors = updatedColors;
            const newColorList = [...prevColors,newColor]
            setUpdatedColors(newColorList)
            setNewColor("")
        }
    }
    const handleRemoveColor = color => {
        let newColorList = []
        const prevColors = updatedColors;
        if(prevColors.length>1){
            prevColors.map(item=>{
                if(color!==item){
                    newColorList.push(item)
                }
            })
            setUpdatedColors(newColorList)
        }
    }
    const handleRemoveImage = image => {
        if(updatedImages.length>1){
            const prevImageList = updatedImages
            let newImageList = []
            prevImageList.map(item=>{
                if(image!==item){
                    newImageList.push(item)
                }
            })
            setUpdatedImages(newImageList)
        }
    }


    const handleUPdateProduct = () => {
        let updatedData = {}
        updatedData.productId = productId
        let proceed = true;
        let invalidInputMsg = ""
        if(updatedName.trim()!=="" && updatedName.trim()!==selectedProduct.name){
            updatedData.name = updatedName
        }
        if(updatedPrice.trim()!=="" && updatedPrice.trim()!==selectedProduct.price.toString()){
            updatedData.price = updatedPrice
        }
        if(updatedDiscount.trim()!=="" && updatedDiscount.trim()!==selectedProduct.discount.toString()){
            const discountPrice = (Number(updatedDiscount)/100)*Number(updatedPrice)
            if(Number(discountPrice)>Number(updatedPrice)){
                invalidInputMsg = invalidInputMsg+" invalid discount input"
                proceed=false
            }else {
                updatedData.discount = updatedDiscount
            }
        }
        if(updatedQuantity.trim()!=="" && updatedQuantity.trim()!==selectedProduct.quantity.toString()){
            updatedData.quantity = updatedQuantity
        }
        if(updatedDescription.trim()!=="" && updatedDescription.trim()!==selectedProduct.description){
            updatedData.description = updatedDescription
        }
        if(updatedTags.trim()!=="" && updatedTags.trim()!==selectedProduct.tags){
            updatedData.tags = updatedTags
        }
        if(updatedBrand.trim()!=="" && updatedBrand.trim()!==selectedProduct.Brand){
            updatedData.brand = updatedBrand
        }
        if(updatedCategory.trim()!=="" && updatedCategory.trim()!==selectedProduct.category.id){
            updatedData.category = updatedCategory
        }
        if(updatedSize.length>0){
            updatedData.size = updatedSize
        }
        if(updatedColors.length>0){
            updatedData.colors = updatedColors
        }
        const updatedDataLenght = Object.keys(updatedData).length
        if(updatedDataLenght>0 && proceed===true) {
            axios.post(`${apiUrl}/product/update/without-image`,{data:updatedData}).then(res=>{
                if(res.status === 200 && res.data.success === true) {
                    toast.success("Updated successfully")
                    getSelectedProduct()
                }else {
                    toast.error("Failed to update product")
                }
            }).catch(err=>{
                toast.error("Failed to update product")
            })
        }else {
            if(proceed===false) {
                Swal.fire({title:invalidInputMsg,icon:"warning"})
            }else {
                Swal.fire({title:"Update first",icon:"warning"})
            }
        }
    }




    useEffect(()=>{
        getSelectedProduct()
    },[])
    
    if(pLoading.loading) {
        return <Layout>
            <div className='d-flex justify-content-center align-items-center flex-column' style={{height:"100vh"}}>
                <Spinner animation="border" size="lg" />
                <h3 className='mt-3'>Loading...</h3>
            </div>
        </Layout>
    } else if(pLoading.loading===false && pLoading.error===true) {
        return <Layout>
            <div className='d-flex justify-content-center align-items-center flex-column' style={{height:"100vh"}}>
                <h3 className='mt-3'>No proudct found</h3>
                <span className='text-italic mt-2 text-muted'>don't edit url</span>
            </div>
        </Layout>
    }
    const PreviewImage = () => {
        if(updatedImages!==null) {
            return updatedImages.map((image,i)=>{
                return <div className='m-2 p-1 bg-white' key={i}  style={{height:"200px",width:"auto",display:"inline-block",position:"relative"}}>
                    <span className='bg-white px-2 text-dark fw-bold fs-4' style={{position:"absolute",top:"5px",right:"5px",cursor:"pointer",borderBottomLeftRadius:"50%"}}><GrFormClose style={{fontSize:"25px"}} onClick={handleRemoveImage.bind(this,image)} /></span>
                    <img src={`${api_uri}/images/${image}`} style={{height:"100%",width:"auto"}} />
                </div>
            })
        }else {
            return ""
        }
    }
    const CategoryListComponent = () => {
        return categoryList!==null?categoryList.map((cat,i)=>{
            if(cat.subcategories.length>0){
                return cat.subcategories.map((s_cat,i)=>{
                    return <option key={i} value={s_cat._id} selected={selectedProduct.category.name===s_cat.name?true:false}>{s_cat.name}</option>
                })
            }else {
                return <option key={i} value={cat._id} selected={selectedProduct.category.name===cat.name?true:false}>{cat.name}</option>
            }
        }):<option>no cateogry found</option>
    }
  return (
    <Layout>
        <Row>
            <Col md={6}>
                <div className='mb-3'>
                    <label className='fs-5 mb-2 fw-semibold'>Product Name</label>
                    <input type="text" className='form-control form-control-md w-100 rounded-0' defaultValue={updatedName} onChange={handleUpdateName} placeholder='Enter product name' />
                </div>
                <Row>
                    <Col md={6}>
                        <label className='fs-5 mb-2 fw-semibold'>Product Category</label>
                        <select className='form-control' onChange={handleUpdateCategory}>
                            <option>Select Category</option>
                            <CategoryListComponent />
                        </select>
                    </Col>
                    <Col md={6}>
                        <label className='fs-5 mb-2 fw-semibold'>Product Brand</label>
                        <input type="text" className='form-control form-control-md w-100 rounded-0' defaultValue={updatedBrand} onChange={handleUpdateBrand} placeholder='Enter product brand' />
                    </Col>
                </Row>
                <div className='mt-3'>
                    <div>
                        <label className='fs-5 mb-2 fw-semibold'>Product Colors</label>
                        <div className='d-flex'>
                            <div className='border rounded-0 p-1 bg-white'>
                            <div className='d-flex gap-1 align-items-center'>
                                {
                                    updatedColors.map((color,i)=><div key={i} className='d-flex text-dark bg-light fs-5 shadow-sm border rounded-0 px-2'>
                                        <span>{color.toUpperCase()}</span>
                                        <div className='d-flex align-items-center gap-1 ms-2'>
                                            <span style={{color:"rgb(0,0,0,0.3)"}}>|</span>
                                            <GrFormClose onClick={handleRemoveColor.bind(this,color)} />
                                        </div>
                                    </div>)
                                }
                            <input type='text' className='form-control form-control-sm border-0 outline-0' placeholder='type to add new color' style={{minWidth:"100px",width:"auto",outlineWidth:"0",borderWidth:"0",float:"right"}} onChange={handleGetNewColor} />
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
                    <ReactQuill value={updatedDescription} onChange={handleUpdateDescription} style={{height:"500px",background:"white"}} />
                </div>
            </Col>
            <Col md={6}>
                <Row>
                    <Col>
                        <label className='fs-5 mb-2 fw-semibold'>Prize</label>
                        <input type="text" className='form-control rounded-0' defaultValue={updatedPrice} onChange={handleUpdatePrice} placeholder='Product Prize' />
                    </Col>
                    <Col>
                        <label className='fs-5 mb-2 fw-semibold'>Discount(%)</label>
                        <input type="text" className='form-control rounded-0' defaultValue={updatedDiscount} onChange={handleUpdateDiscount} placeholder='Product Discount(%)' />
                    </Col>
                    <Col>
                        <label className='fs-5 mb-2 fw-semibold'>Quantity</label>
                        <input type="text" className='form-control rounded-0' defaultValue={updatedQuantity} onChange={handleUpdateQuantity} placeholder='Product Quantity' />
                    </Col>
                    <Col>
                        <label className='fs-5 mb-2 fw-semibold'>Sold</label>
                        <input type="text" className='form-control rounded-0 disabled' readOnly disabled value={selectedProduct.purchased} placeholder='Sold Quantity' />
                    </Col>
                </Row>
                <div className='mt-3'>
                    <div>
                        <label className='fs-5 mb-2 fw-semibold'>Product Size</label>
                        <div className='d-flex'>
                            <div className='border rounded-0 p-1 bg-white'>
                            <div className='d-flex gap-1 align-items-center'>
                                {
                                    updatedSize.map((size,i)=><div key={i} className='d-flex text-dark bg-light fs-5 shadow-sm border rounded-0 px-2'>
                                        <span>{size.toUpperCase()}</span>
                                        <div className='d-flex align-items-center gap-1 ms-2'>
                                            <span style={{color:"rgb(0,0,0,0.3)"}}>|</span>
                                            <GrFormClose onClick={handleRemoveSize.bind(this,size)} />
                                        </div>
                                    </div>)
                                }
                            <input type='text' className='form-control form-control-sm border-0 outline-0' placeholder='type to add new size' style={{minWidth:"100px",width:"auto",outlineWidth:"0",borderWidth:"0",float:"right"}} onChange={handleGetNewSize} />
                            </div>
                            </div>
                            {
                                newSize!==""?<button className='btn btn-success rounded-0' disabled={newSize!==""?false:true} onClick={handleAddNewSize}>add</button>:""
                            }
                            
                        </div>
                    </div>
                </div>
                <div className='my-3'>
                    <label className='fs-5 mb-2 fw-semibold'>Product Tags</label>
                    <input type="text" className='form-control rounded-0' defaultValue={updatedTags} onChange={handleUpdateTags} placeholder='Product Tags' />
                </div>
                <div className='my-3'>
                    <label className='fs-5 mb-2 fw-semibold'>Primary Image</label>
                    <input type="file" className='form-control rounded-0' />
                    <img src={`${api_uri}/images/${updatedPrimaryImage}`} height="150px" />
                </div>
                <div className='my-3'>
                    <label className='fs-5 mb-2 fw-semibold'>Product Image</label>
                    <input type="file" className='form-control rounded-0' />
                    <PreviewImage />
                </div>
                <div className='my-3'>
                    {
                        selectedDropedFileListToPreview!==null?selectedDropedFileListToPreview.map((item,i)=><img src={item} key={i} height={100} width="auto" />):null
                    }
                </div>
                <button className='px-5 btn btn-success rounded-0 shadow-sm my-5 fw-semibold' onClick={handleUPdateProduct}>Update</button>
            </Col>
        </Row>
    </Layout>
  )
}
