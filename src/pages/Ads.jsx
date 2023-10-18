import React, { useEffect, useState } from 'react'
import Layout from '../components/common/layout'
import { Button, Col, Modal, Row, Spinner } from 'react-bootstrap'
import DataTable from 'react-data-table-component'
import { FaRegEdit } from 'react-icons/fa'
import { BsTrash } from 'react-icons/bs'
import axios from 'axios'
import apiUrl, { api_uri } from '../apiUrl'
import { toast } from 'react-toastify'
import Swal from 'sweetalert2'

export default function Ads() {

    const [adsLoading, setAdsLoading] = useState(true)
    const [adsList, setAdsList] = useState(null)

    const [productLink, setProductLink] = useState("")
    const [newAdImage, setNewAdImage] = useState("")
    const [newAdImagePreview, setNewAdImagePreview] = useState("")

    const [showModal, setShowModal] = useState(false)
    const [selectedAdToView, setSelectedAdToView] = useState(null)
    const [updatedAdLink, setUpdatedAdLink] = useState("")
    const [updatedAdImage, setUpdatedAdImage] = useState("")
    const [updatedAdImagePreview, setUpdatedAdImagePreview] = useState("")
    
    const handleOpenModal = () => {
        if(showModal){
            setShowModal(false)
        }else {
            setShowModal(true)
        }
    }

    const handleGetNewLink = e =>{
        const link = e.target.value.trim()
        setProductLink(link)
    }
    const handleGetNewImage = e => {
        const file = e.target.files[0]
        setNewAdImage(file)
        setNewAdImagePreview(URL.createObjectURL(file))
    }

    const getAllAds = () => {
        axios.get(`${apiUrl}/ads/get/all`).then(res=>{
            console.log(res)
            if(res.status === 200 && res.data.success === true) {
                setAdsList(res.data.data)
                setAdsLoading(false)
            }else {
                setAdsList([])
                setAdsLoading(false)
            }
        }).catch(error=>{
            setAdsList(null)
            setAdsLoading(false)
        })
    }

    const handleAddNewAd = () => {
        if(productLink!=="" && newAdImage!=="") {
            const formData = new FormData()
            formData.append("productLink",productLink)
            formData.append("image",newAdImage)
            axios.post(`${apiUrl}/ads/add`,formData,{headers:{"Content-Type":"multipart/form-data"}}).then(res=>{
                if(res.status === 200 && res.data.success === true) {
                    toast.success("Added successfully")
                    getAllAds()
                }else {
                    toast.error("Failed to add")
                }
            }).catch(err=>{
                toast.error("Failed to add")
            })
        }else {
            Swal.fire({title:"Please select image and provide link!",icon:"warning"})
        }
    }

    const handleDeleteAd = id => {
        Swal.fire({title:"Are you sure to delete?",confirmButtonText:"Delete",confirmButtonColor:"var(--bs-danger)",cancelButtonText:"No",cancelButtonColor:"var(--bs-secondary)",showCancelButton:true,icon:"question"}).then(res=>{
            if(res.isConfirmed){
                axios.delete(`${apiUrl}/ads/delete/${id}`).then(res=>{
                    if(res.status === 200 && res.data.success === true) {
                        toast.success("Deleted successfully")
                        getAllAds()
                    }else {
                        toast.error("Failed to delete")
                    }
                }).catch(err=>{
                    toast.error("Failed to delete")
                })
            }
        })
    }

    const handleUpdateAdd = () => {

    }

    useEffect(()=>{
        getAllAds()
    },[])

    const columns = [
        {name:"Image",cell:row=><img src={`${api_uri}/images/${row.image}`} height="60px" />},
        {name:"Product Link",selector:row=>row.productLink},
        {name:"Created At",selector:row=>new Date(row.createdAt).toLocaleDateString()},
        {name:"Actions",cell:row=><div>
            <button className='btn btn-info btn-sm me-1' onClick={()=>{
                setShowModal(true)
                setSelectedAdToView(row)
            }}><FaRegEdit /></button>
            <button className='btn btn-danger btn-sm me-1' onClick={handleDeleteAd.bind(this,row._id)}><BsTrash /></button>
        </div>},
    ]
    const customStyle = {
        headCells:{
            style:{
                fontSize:"18px",
                backgroundColor:"var(--primary-color)",
                color:"#ffffff"
            }
        },
    }

    if(adsLoading) {
        return <Layout>
            <div className='d-flex justify-content-center align-items-center flex-column' style={{height:"100vh"}}>
                <Spinner animation="border" size="lg" />
                <h3 className='mt-3'>Loading...</h3>
            </div>
        </Layout>
    }

  return (
    <Layout>
        <Modal show={showModal} onHide={handleOpenModal}>
            <Modal.Header closeButton>Update ad</Modal.Header>
            <Modal.Body>
                {
                    selectedAdToView!==null?<div>
                        <input type='file' multiple={false} className='form-control mb-3' />
                        <img src={`${api_uri}/images/${selectedAdToView.image}`} style={{width:"auto",margin:"0 auto",height:"300px",marginBottom:"5px"}} />
                        <input type='text' defaultValue={selectedAdToView.productLink} className='form-control mt-3' />
                    </div>:""
                }                
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleOpenModal}>close</Button>
                <Button variant="danger" onClick={handleUpdateAdd}>Update</Button>
            </Modal.Footer>
        </Modal>
        <Row>
            <Col md={4}>
                <div className='my-3'>
                    <label>Image</label>
                    <input type="file" className='form-control' onChange={handleGetNewImage} />
                </div>
                {
                    newAdImagePreview!==""?<img src={newAdImagePreview} style={{height:"300px",width:"auto"}} />:""
                }
                <div className='my-3'>
                    <label>Product Link</label>
                    <input type="text" className='form-control' onChange={handleGetNewLink} />
                </div>
                <button className='btn btn-success rounded-0 shadow mt-3' onClick={handleAddNewAd}>Add</button>
            </Col>
            <Col md={8}>
                <DataTable 
                    columns={columns}
                    customStyles={customStyle}
                    data={adsList}
                    pagination
                />
            </Col>
        </Row>
    </Layout>
  )
}
