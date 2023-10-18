import {Link} from 'react-router-dom'
import React, { useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import Swal from 'sweetalert2'

export default function Registration() {

    // const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    const [newAccountName, setNewAccountName] = useState(null)
    const [newAccountMail, setNewAccountMail] = useState(null)
    const [newAccountPass, setNewAccountPass] = useState(null)


    const handleCreateNewAccProfile = () => {
        if(newAccountName===null || newAccountMail===null || newAccountPass===null) {
            Swal.fire({title:"Please fill all fields",icon:"warning"})
        }else{
            // axios.post(`${apiUrl}/users/add`,{name:newAccountName,mail:newAccountMail,password:newAccountPass}).then(res=>{
            //     setCheckingLogin(false)
            //     console.log("res: ",res)
            //     const token = res.data.token;
            //     if(res.status === 200 && res.data.success === true && token!==undefined) {
            //         Cookies.set("_karuser",token)
            //         router.push("/admin/dashboard")
            //     }else{
            //         Swal.fire({title:'Failed to login',text:"please try again!",icon:"error"})
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


  return (
    <div style={{background:"linear-gradient(110.94deg, #183881 2.27%, #2E84A0 46.73%, #B96793 96.66%)",height:"100vh",width:"100%"}} className="d-flex justify-content-center align-items-center">
        <Row className='w-100'>
            <Col md={4}></Col>
            <Col md={4} className="px-5">
                <div className='shadow-lg p-3 rounded w-100' style={{background:"linear-gradient(135deg,rgb(255,255,255,0.3),rgb(255,255,255,0.1))",backgropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)"}}>
                    <h1 className='text-center my-5 text-uppercase fs-3'>Administration Registration</h1>
                    <input type="text" placeholder='Enter Mail' className='form-control form-control-lg my-3 rounded-0' />
                    <input type="password" placeholder='Enter Password' className='form-control form-control-lg my-3 rounded-0' />
                    <button className='btn w-100 my-3 bg-dark text-white '>Create</button>
                    <div className='text-light text-center my-3 d-block text-decoration-none'>
                        Already have account?
                        <Link to="/login" className='ms-2 text-light text-decoration-none'>login</Link>
                    </div>
                </div>
            </Col>
            <Col md={4}></Col>
        </Row>
    </div>
  )
}
