import React, { useContext, useEffect, useState } from 'react'
import { Accordion, Badge, Col, Dropdown, Row } from 'react-bootstrap'
import { FaBars, FaUserCircle } from 'react-icons/fa'
import { SlArrowDown } from "react-icons/sl"
import { ToastContainer } from 'react-toastify';
import { IoMdNotifications } from 'react-icons/io'
import {FiLogOut} from "react-icons/fi"
import Swal from 'sweetalert2'
import CustomModal from "./CustomModal"
import { Link, useLocation } from 'react-router-dom'
import { CategoryContext } from '../../contexts/CategoryPorvider';
export default function Layout({children}) {

    const {updateList} = useContext(CategoryContext)

    const router = useLocation()
    const [expand,setExpand] = useState(false)
    const [accordionOpen, setAccordionOpen] = useState(null)

    const [showNotificationDropdown, setShowNotificationDropdown] = useState(false)

    const [updatedName, setUpdatedName] = useState(null)
    const [updatedMail, setUpdatedMail] = useState(null)
    const [updatedPass, setUpdatedPass] = useState(null)
    const [oldPass, setOldPass] = useState(null)
    
    const [newAccountName, setNewAccountName] = useState(null)
    const [newAccountMail, setNewAccountMail] = useState(null)
    const [newAccountPass, setNewAccountPass] = useState(null)
    
    const [showNewAccModal, setShowNewAccModal] = useState(false)

    const [user, setUser] = useState(null)
    const [unapprovedUser, setUnapprovedUser] = useState(null)

    const [unapprovedSingleUser, setUnapprovedSingleUser] = useState(null)
    const [showUnapprovedUserModal, setShowUnapprovedUserModal] = useState(null)


    const [showProfileModal, setShowProfileModal] = useState(false)


    const handleGetProfile = () => {
        // axios.get(`${apiUrl}/users/get-me`).then(res=>{
        //     if(res.status === 200 && res.data.success === true) {
        //         setUser(res.data.data)
        //         setUpdatedMail(res.data.data.email)
        //         setUpdatedName(res.data.data.name)
        //     }
        // }).catch(err=>{
        //     console.log("err: ",err)
        // })
    }

    const handleGetUnapprovedUser = () => {
        // axios.get(`${apiUrl}/users/get-unapproved-account`).then(res=>{
        //     if(res.status === 200 && res.data.success === true) {
        //         setUnapprovedUser(res.data.data)
        //     }
        // }).catch(err=>{
        //     console.log("err: ",err)
        // })
    }

    const handleShowUnapprovedUserModal = user => {
        if(showProfileModal){
            setShowUnapprovedUserModal(false)
            setUnapprovedSingleUser(null)
        }else{
            setUnapprovedSingleUser(user)
            setShowUnapprovedUserModal(true)
        }
    }

    const handleApprovedUser = () => {
        // if(unapprovedSingleUser!==null) {
        //     axios.post(`${apiUrl}/users/approve-user`,{id:unapprovedSingleUser.id}).then(res=>{
        //         if(res.status === 200 && res.data.success === true) {
        //             Swal.fire({title:"Approved User Successfully!",icon:"success"})
        //             handleGetUnapprovedUser()
        //             setShowUnapprovedUserModal(false)
        //             setUnapprovedSingleUser(null)
        //         }else{
        //             Swal.fire({title:"Failed to approve user!",icon:"error"})
        //         }
        //     }).catch(err=>{
        //         Swal.fire({title:"Failed to approve user!",icon:"error"})
        //         console.log("err: ",err)
        //     })
        // }
    }

    const handleShowProfileModal = () => {
        if(showProfileModal){
            setShowProfileModal(false)
        }else{
            handleGetProfile()
            setShowProfileModal(true)
        }
    }
    

    const handleUpdateProfile = () => {
        if(updatedName===null) {
            setUpdatedName(user.name)
        }
        if(updatedMail===null) {
            setUpdatedMail(user.email)
        }
        if(oldPass===null) {
            Swal.fire({title:"Please provide old password!",icon:"warning"})
        }else if(user.id === undefined){
            Swal.fire({title:"Please try again!",icon:"warning"})
        }else{
            // axios.post(`${apiUrl}/user/update`,{id:user.id,name:updatedName,mail:updatedMail,oldPass:oldPass,newPass:updatedPass}).then(res=>{
            //     console.log("res: ",res)
            //     if(res.status === 200 && res.data.success === true) {
            //         Swal.fire({title:"Updated successfully!",icon:"success"})
            //         handleGetProfile()
            //     }else{
            //         Swal.fire({title:"Failed to update!",icon:"error"})
            //         handleGetProfile()
            //     }
            // }).catch(err=>{
            //     console.log("err: ",err)
            //     handleGetProfile()
            //     Swal.fire({title:"Failed to update!",text:"PLease check internet connection!",icon:"error"})
            // })
        }
    }

    const handleCreateNewAccProfile = () => {
        if(newAccountName===null || newAccountMail===null || newAccountPass===null) {
            Swal.fire({title:"Please fill all fields",icon:"warning"})
        }else{
            // axios.post(`${apiUrl}/user/add`,{name:newAccountName,mail:newAccountMail,password:newAccountPass}).then(res=>{
            //     console.log("res: ",res)
            //     if(res.status === 200 && res.data.success === true) {
            //         Swal.fire({title:"Created successfully!",icon:"success"})
            //         handleGetUnapprovedUser()
            //         handleShowCreateNewAccModal()
            //     }else{
            //         Swal.fire({title:"Failed to create!",icon:"error"})
            //     }
            // }).catch(err=>{
            //     console.log("err: ",err)
            //     if (err.response.status === 409) {
            //         Swal.fire({title:"Failed to create!",text:"An account exist on that!",icon:"error"})
            //     }else{
            //         Swal.fire({title:"Failed to create!",text:"PLease check internet connection!",icon:"error"})
            //     }
            // })
        }
    }

    const handleDeleteProfile = () => {

    }
    

    useEffect(()=>{
        updateList()
    },[])

    const handleExpand = () => {
        if(expand){
            setExpand(false)
        }else{
            setExpand(true)
        }
    }

    const handleLogoutUser = () => {
        router.push("/admin/profile/signin")
    }

    const handleShowNotificationDropdown = () => {
        if(showNotificationDropdown){
            setShowNotificationDropdown(false)
        }else{
            setShowNotificationDropdown(true)
        }
    }
    const handleShowCreateNewAccModal = () => {
        if(showNewAccModal){
            setShowNewAccModal(false)
        }else{
            setShowNewAccModal(true)
        }
    }
    

    // if(authorized===false){
    //     return <div className='h-100 w-100 d-flex justify-content-center align-items-center'>
    //         <h1 className='text-muted mt-5'>Checking authentication...</h1>
    //     </div>
    // }

    const navlinks = [
        {id:1,name:"Home",link:"/",sublinks:[]},
        {id:2,name:"Products",link:"/products",sublinks:[
            {name:"All Products",link:"/product/all"},
            {name:"Add Product",link:"/product/add"},
        ]},
        {id:3,name:"Ads",link:"/ads",sublinks:[]},
        {id:4,name:"Orders List",link:"/order-list",sublinks:[
            {name:"New Order List",link:"/order/new-order-list"},
            {name:"Delivered Order List",link:"/order/delivered-order-list"},
        ]},
        {id:5,name:"Category",link:"/category",sublinks:[]},
        {id:6,name:"Customer",link:"/customer-list",sublinks:[]},
    ]

    const NavLinkList = () => {
        return navlinks.map((link,i)=>{
            const isNavActive = link.link === router.pathname
            if(link.sublinks.length>0){
                return <li key={i} className={`sidebar-item${isNavActive===true?" active-dash-item":""}`}>
                    <Accordion bsPrefix='py-0'>
                        <Accordion.Item className='bg-transparent rounded-0 border-0' eventKey={i+1}>
                            <Accordion.Header bsPrefix='sidenav-drop-header'>
                                <div className='d-flex justify-content-between align-items-center'>
                                    <span>{link.name}</span>
                                    <SlArrowDown />
                                </div></Accordion.Header>
                            <Accordion.Body>
                                {
                                    link.sublinks.map((sublink,i)=><Link to={sublink.link} key={i} style={{fontSize:"16px",marginLeft:"20px"}}>{sublink.name}</Link>)
                                }
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </li>
            }
            return <li key={i} className='sidebar-item'><Link to={link.link} className={`${isNavActive===true?"active-dash-item":""}`}>{link.name}</Link>      
            </li>
        })
    }

  return (
    <>
    <ToastContainer 
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored" />
    <CustomModal show={showProfileModal} title="Profile" size='md' buttonTitle="Update" onClose={handleShowProfileModal} onFire={handleUpdateProfile}>
        {
            user===null?<div></div>:<div>
                <input type="text" placeholder='Enter Name' defaultValue={user.name} onChange={e=>setUpdatedName(e.target.value.trim())} className="form-control my-3" />
                <input type="text" placeholder='Enter Mail' defaultValue={user.email} onChange={e=>setUpdatedMail(e.target.value.trim())} className="form-control my-3" />
                <input type="text" placeholder='Enter New Password' onChange={e=>setUpdatedPass(e.target.value.trim())} className="form-control my-3" />
                <input type="text" placeholder='Enter Old Password' onChange={e=>setOldPass(e.target.value.trim())} className="form-control my-3" />
            </div>
        }
        
    </CustomModal>
    <CustomModal show={showNewAccModal} title="Create New Account" size='md' buttonTitle="Create" onClose={handleShowCreateNewAccModal} onFire={handleCreateNewAccProfile}>
        <div>
            <input type="text" placeholder='Enter Name' onChange={e=>setNewAccountName(e.target.value.trim())} className="form-control my-3" />
            <input type="text" placeholder='Enter Mail' onChange={e=>setNewAccountMail(e.target.value.trim())} className="form-control my-3" />
            <input type="text" placeholder='Enter Password' onChange={e=>setNewAccountPass(e.target.value.trim())} className="form-control my-3" />
        </div>        
    </CustomModal>

    <CustomModal show={showUnapprovedUserModal} title="Unapproved User Profile" size='md' buttonTitle="Approve" onClose={handleShowUnapprovedUserModal} onFire={handleApprovedUser}>
        {
            unapprovedSingleUser!==null?<div>
            <input type="text" placeholder='Enter Name' value={unapprovedSingleUser.name} readOnly disabled className="form-control my-3" />
            <input type="text" placeholder='Enter Mail'  value={unapprovedSingleUser.email} readOnly disabled className="form-control my-3" />
        </div> :<div></div>
        }
               
    </CustomModal>

        <div className='admin-layout' style={{backgroundColor:"#e5e5e5"}}>
            <Row className='w-100 p-0 m-0' style={{height:`100vh`}}>
                <Col md={expand?0:2} className={`${expand?"d-none":"d-block"} leftbar h-100 p-0 m-0`}>
                    <div style={{backgroundColor: "var(--primary-color)"}} className={`${expand?"d-none":"d-flex"} justify-content-center align-items-center text-light py-2 text-uppercase`}>
                        <h3>Admin Panel</h3>
                    </div>
                    <ul>
                        {
                            <NavLinkList />
                        }
                        
                    </ul>
                </Col>
                <Col md={expand?12:10} className="m-0 p-0 h-100" style={{overflowY:"scroll"}}>
                    <div className="bg-white shadow-sm d-flex p-2 justify-content-between align-items-center" style={{position:"sticky",top:"0",zIndex:"10"}}>
                        <button className='btn btn-transparent border shadow-sm' onClick={handleExpand}>
                            <FaBars style={{fontSize:"25px"}} />
                        </button>
                        <div className='d-flex align-items-center gap-1'>
                            {/* <div style={{height:"40px",width:"40px"}} className="rounded-circle border">
                                <FaUserCircle style={{height:"100%",width:"100%"}} />
                            </div> */}
                            {
                                    unapprovedUser!==null && unapprovedUser.length>0?<div style={{position:'relative'}}>
                                    <button className=' p-0 btn btn-transparent' style={{position:"relative"}} onClick={handleShowNotificationDropdown}>
                                        <IoMdNotifications style={{fontSize:"35px"}} />
                                        <p style={{backgroundColor:"#dc3545",fontSize:"14px",position:"absolute",color:"#ffffff",height:"20px",width:"20px",borderRadius:"50%",right:"-5px",top:"-5px"}}>{unapprovedUser.length>9?"9+":unapprovedUser.length}</p>
                                    </button>
                                    
                                    <Dropdown.Menu show={showNotificationDropdown} size="lg" style={{right:"0",top:"100%",position:"absolute",borderRadius:"0"}}>
                                        {
                                            unapprovedUser===null?<div>loading...</div>:unapprovedUser.map((item,i)=><Dropdown.Item key={i} href="#" onClick={handleShowUnapprovedUserModal.bind(this,item)}>Unapproved Account</Dropdown.Item>)
                                        }
                                    </Dropdown.Menu>
                                </div>:null
                            }
                            
                            <div className='px-2' style={{zIndex:"10000"}}>
                                <Dropdown>
                                <Dropdown.Toggle variant="light" className='border shadow-sm' id="dropdown-basic">
                                    Actions
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item href="#" onClick={handleShowProfileModal}>Profile</Dropdown.Item>
                                    <Dropdown.Item href="/user/logout" className='d-flex justify-content-between align-items-center' onClick={handleLogoutUser}>Logout<FiLogOut /></Dropdown.Item>
                                </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>
                    </div>
                    <div className='p-3'>
                        {children}
                    </div>
                </Col>
            </Row>
        </div>
    </>
  )
}
