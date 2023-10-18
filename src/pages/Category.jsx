import React, { useContext, useEffect, useState } from 'react'
import Layout from '../components/common/layout'
import { Accordion, Button, Col, Modal, Row, Spinner } from 'react-bootstrap'
import { FiEdit } from 'react-icons/fi'
import { BsFillTrashFill } from 'react-icons/bs'
import axios from 'axios'
import apiUrl from '../apiUrl'
import Swal from 'sweetalert2'
import { toast } from 'react-toastify'
import { CategoryContext } from '../contexts/CategoryPorvider'

export default function Category() {

  const {loading, categoryList, updateList} = useContext(CategoryContext)
  const catContext = useContext(CategoryContext)
  const [categoryName, setCategoryName] = useState(null)

  const [selectedCategoryId, setSelectedCategoryId] = useState(null)
  const [subCategoryName, setSubCategoryName] = useState(null)

  const [showCategoryUpdateModal, setShowCategoryUpdateModal] = useState(false)
  const [selectedCategoryToUpdate, setSelectedCategoryToUpdate] = useState(null)
  const [updatedCatName, setUpdatedCatName] = useState(null)

  const [showSubCategoryUpdateModal, setShowSubCategoryUpdateModal] = useState(false)
  const [selectedSubCategoryToUpdate, setSelectedSubCategoryToUpdate] = useState(null)
  const [updatedSubCatName, setUpdatedSubCatName] = useState(null)


  const handleAddCategory = () => {
    const name = categoryName.trim()
    console.log(name)
    if(name!==null && name!=="") {
      axios.post(`${apiUrl}/category/add`,{name:name}).then(res=>{
        console.log("added res: ",res)
        if(res.status === 200 && res.data.success === true) {
          toast.success("Category Added")
          updateList()
        }else {
          toast.error("Failed to add")
        }
      }).catch(err=>{
        console.log("err: ",err)
        toast.error("Failed to add")
      })
    }else {
      Swal.fire({title:"Enter category name",icon:"warning"})
    }
  }

  const handleAddSubCategory = () => {
    const name = subCategoryName.trim()
    const parentId = selectedCategoryId.trim()
    console.log(name)
    if(name!==null && name!=="") {
      axios.post(`${apiUrl}/category/sub/add`,{name:name,parentId:parentId}).then(res=>{
        console.log("added res: ",res)
        if(res.status === 200 && res.data.success === true) {
          toast.success("Category Added")
          updateList()
        }else {
          toast.error("Failed to add")
        }
      }).catch(err=>{
        console.log("err: ",err)
        toast.error("Failed to add")
      })
    }else {
      Swal.fire({title:"Enter category name",icon:"warning"})
    }
  }

  const handleDeleteCategory = id => {
    axios.delete(`${apiUrl}/category/delete/${id}`).then(res=>{
      if(res.status===200 && res.data.success === true) {
        toast.success("Deleted successfully")
        updateList()
      }else {
        toast.error("Failed to delete")
      }
    }).catch(err=>{
      Swal.fire({title:err.response.data.message,icon:"error"})
    })
  }
  const handleDeleteSubCategory = id => {
    axios.delete(`${apiUrl}/category/sub/delete/${id}`).then(res=>{
      if(res.status===200 && res.data.success === true) {
        toast.success("Deleted successfully")
        updateList()
      }else {
        toast.error("Failed to delete")
      }
    }).catch(err=>{
      Swal.fire({title:err.response.data.message,icon:"error"})
    })
  }
  const handleUpdateSubCategory = () => {
    if(selectedSubCategoryToUpdate===null || updatedSubCatName===null || updatedSubCatName==="" || updatedSubCatName===selectedSubCategoryToUpdate.name) {
      Swal.fire({title:"Please update the category!",icon:"warning"})
    }else {
      const id = selectedSubCategoryToUpdate._id
      console.log("id: ",id)
      axios.post(`${apiUrl}/category/sub/update`,{id:id,name:updatedSubCatName}).then(res=>{
        setUpdatedSubCatName(null)
        setSelectedSubCategoryToUpdate(null)
        setShowSubCategoryUpdateModal(false)
        if(res.status===200 && res.data.success === true) {
          toast.success("Updated successfully")
          updateList()

        }else {
          toast.error("Failed to update")
        }
      }).catch(err=>{
        setUpdatedSubCatName(null)
        setSelectedSubCategoryToUpdate(null)
        setShowSubCategoryUpdateModal(false)
        toast.error("Failed to update")
      })
    }
  }
  const handleUpdateCategory = () => {
    if(updatedCatName==="" || updatedCatName===null || updatedCatName===selectedCategoryToUpdate.name) {
      Swal.fire({title:"Please update the category!",icon:"warning"})
    }else {
      const id = selectedCategoryToUpdate._id;
      axios.post(`${apiUrl}/category/update/`,{id:id,name:updatedCatName}).then(res=>{
        setUpdatedCatName(null)
        setSelectedCategoryToUpdate(null)
        setShowCategoryUpdateModal(false)
        if(res.status===200 && res.data.success === true) {
          toast.success("Deleted successfully")
          updateList()
        }else {
          toast.error("Failed to delete")
        }
      }).catch(err=>{
        setUpdatedCatName(null)
        setSelectedCategoryToUpdate(null)
        setShowCategoryUpdateModal(false)
        toast.error("Failed to delete")
      })
    }
  }
  const handleShowCategoryModal = category => {
    if(showCategoryUpdateModal) {
      setShowCategoryUpdateModal(false)
      setSelectedCategoryToUpdate(null)
    }
    else {
      setShowCategoryUpdateModal(true)
      setSelectedCategoryToUpdate(category)
    }
  }
  const handleShowSubCategoryModal = category => {
    if(showSubCategoryUpdateModal) {
      setShowSubCategoryUpdateModal(false)
      setSelectedSubCategoryToUpdate(null)
    }
    else {
      setShowSubCategoryUpdateModal(true)
      setSelectedSubCategoryToUpdate(category)
    }
  }


  console.log("catContext: ",catContext)
  if(categoryList[0]===undefined && loading===true) {
    return <Layout>
      <div className='d-flex justify-content-center align-items-center h-100'>
        <Spinner animation="border" size="sm" />
      </div>
    </Layout>
  }

  console.log("cat loading ",loading)
  
  return (
    <Layout>
        <Modal centered show={showCategoryUpdateModal} onHide={handleShowCategoryModal}>
          <Modal.Header closeButton>Update Cateogory</Modal.Header>
          <Modal.Body>
            {
              selectedCategoryToUpdate!==null?<div>
                <input type="text" className='form-control' defaultValue={selectedCategoryToUpdate.name} onChange={e=>setUpdatedCatName(e.target.value.trim())} placeholder='Enter category name' />
              </div>:""
            }
          </Modal.Body>
          <Modal.Footer>
            <Button className='rounded-0' variant="secondary" onClick={handleShowCategoryModal}>close</Button>
            <Button className='rounded-0' variant='success' onClick={handleUpdateCategory}>Update</Button>
          </Modal.Footer>
        </Modal>
        <Modal centered show={showSubCategoryUpdateModal} onHide={handleShowSubCategoryModal}>
          <Modal.Header closeButton>Update Sub Cateogory</Modal.Header>
          <Modal.Body>
            {
              selectedSubCategoryToUpdate!==null?<div>
                <input type="text" className='form-control' defaultValue={selectedSubCategoryToUpdate.name} onChange={e=>setUpdatedSubCatName(e.target.value.trim())} placeholder='Enter category name' />
              </div>:""
            }
          </Modal.Body>
          <Modal.Footer>
            <Button className='rounded-0' variant="secondary" onClick={handleShowSubCategoryModal}>close</Button>
            <Button className='rounded-0' variant='success' onClick={handleUpdateSubCategory}>Update</Button>
          </Modal.Footer>
        </Modal>
        <Row>
          <Col md={5}>
            <div className='bg-white mb-3 shadow-sm p-3'>
              <h4>Add New Category</h4>
              <div className='input-group mt-3'>
                <input type="text" className='form-control form-control-lg' onChange={e=>setCategoryName(e.target.value.trim())} placeholder='Enter Category Name' />
                <button className='btn btn-success rounded-0' onClick={handleAddCategory}>Add</button>
              </div>
            </div>
            <div className='bg-white mb-3 shadow-sm p-3'>
              <h4>Add New Subcategory</h4>
              <select className='form-control form-control-lg my-3' onChange={(e)=>setSelectedCategoryId(e.target.value.trim())}>
                {
                  categoryList[0]!==undefined&&categoryList.length===0?<option>no category added yet</option>:<option>Select a main category</option>
                }
                {
                  categoryList[0]!==undefined?categoryList.map((item,i)=><option key={i} value={item._id}>{item.name}</option>):<option>no category found</option>
                }
              </select>
              <div className='input-group mt-3'>
                <input type="text" className='form-control form-control-lg' onChange={e=>setSubCategoryName(e.target.value.trim())} placeholder='Enter Category Name' />
                <button className='btn btn-success rounded-0' onClick={handleAddSubCategory}>Add</button>
              </div>
            </div>
          </Col>
          <Col md={7}>
            <div className='bg-white p-3 shadow-sm rounded'>
              <table className='table table-striped text-left'>
                <thead className='text-white fs-5' style={{backgroundColor:"var(--primary-color)"}}>
                  <tr>
                    <th className='py-2'>Category Name</th>
                    <th className='py-2'>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    categoryList[0]!==undefined?categoryList.map((item,i)=><tr key={i}>
                    <td>
                      {
                        item.subcategories.length>0?<Accordion>
                        <Accordion.Item>
                          <Accordion.Header>{item.name}</Accordion.Header>
                          <Accordion.Body>
                            {
                              item.subcategories.map((s_cat,i)=>
                                <div key={i} className='border-bottom mb-1 d-flex align-items-center justify-content-between'>
                                  <p className='text-dark p-0'>{s_cat.name}</p>
                                  <div className='d-flex'>
                                    <button className='btn btn-sm rounded-0 shadow-sm btn-primary' onClick={handleShowSubCategoryModal.bind(this,s_cat)}><FiEdit /></button>
                                    <button className='btn btn-sm rounded-0 shadow-sm btn-danger' onClick={handleDeleteSubCategory.bind(this,s_cat._id)}><BsFillTrashFill /></button>
                                  </div>
                                </div>
                              )
                            }
                        </Accordion.Body>
                        </Accordion.Item>
                      </Accordion>:<p className='text-dark m-0 p-0'>{item.name}</p>
                      }
                      
                    </td>
                    <td style={{width:"100px"}}>
                      <button className='btn btn-sm rounded-0 shadow-sm btn-primary' onClick={handleShowCategoryModal.bind(this,item)}><FiEdit /></button>
                      <button className='btn btn-sm rounded-0 shadow-sm btn-danger' onClick={handleDeleteCategory.bind(this,item._id)}><BsFillTrashFill /></button>
                    </td>
                  </tr>):null
                  }
                </tbody>
              </table>
            </div>
          </Col>
        </Row>
    </Layout>
  )
}
