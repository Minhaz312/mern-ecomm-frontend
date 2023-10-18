import {Link} from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import Swal from 'sweetalert2';

export default function Login() {

    const apiUrl = "process.env.NEXT_PUBLIC_API_BASE_URL";


    const [name,setName] = useState("")
    const [mail,setMail] = useState("")
    const [pass,setPass] = useState("")
    const [remember, setRemember] = useState("")
    const [authorized, setAuthorized] = useState(false)
    const [checkingLogin, setCheckingLogin] = useState(false)

    useEffect(()=>{
        // let token  = Cookies.get("_karuser");
        // if(token!==undefined) {
        //     router.push("/admin/dashboard")
        // }else{
        //     setAuthorized(true)
        // }
    },[])

    const handleSignin = () => {
        if(mail==="" || pass==="") {
            alert("Please provide credentials!")
        }else{
            setCheckingLogin(true)
            // axios.post(`${apiUrl}/users/login`,{mail:mail,password:pass}).then(res=>{
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
            //     setCheckingLogin(false)
            //     console.log("err: ",err)
            //     Swal.fire({title:'Failed to login',text:"please try again!",icon:"error"})
            // })
        }
    }

    // if(authorized===false){
    //     return <div className='h-100 w-100 d-flex justify-content-center align-items-center'>
    //         <h1 className='text-muted mt-5'>Checking authentication...</h1>
    //     </div>
    // }
  return (
    <div style={{background:"linear-gradient(110.94deg, #183881 2.27%, #2E84A0 46.73%, #B96793 96.66%)",height:"100vh",width:"100%"}} className="d-flex justify-content-center align-items-center">
        <Row className='w-100'>
            <Col md={4}></Col>
            <Col md={4} className="px-5">
                <div className='shadow-lg p-3 rounded w-100' style={{background:"linear-gradient(135deg,rgb(255,255,255,0.3),rgb(255,255,255,0.1))",backgropFilter:"blur(10px)",WebkitBackdropFilter:"blur(10px)"}}>
                    <h1 className='text-center my-5 text-uppercase fs-3 text-white'>Administration Login</h1>
                    <input type="text" required placeholder='Enter Mail' onChange={e=>setMail(e.target.value.trim())} className='form-control form-control-lg my-3 rounded-0' />
                    <input type="text" required placeholder='Enter Password' onChange={e=>setPass(e.target.value.trim())} className='form-control form-control-lg my-3 rounded-0' />
                    {/* <div class="form-check">
                        <input class="form-check-input" type="checkbox" onChange={e=>setRemember(e.target.checked)} value="" id="flexCheckChecked" />
                        <label class="form-check-label text-white" for="flexCheckChecked">
                            Remember Me
                        </label>
                    </div> */}
                    <button className='btn w-100 my-3 bg-dark text-white' onClick={handleSignin}>
                        {
                            checkingLogin?<Spinner size='sm' animation="border" />:<span>Login</span>
                        }
                    </button>
                    <div className='text-light text-center my-3 d-block text-decoration-none'>
                        <Link to="/registration" className='text-light text-decoration-none'>Create New Account</Link>
                    </div>
                </div>
            </Col>
            <Col md={4}></Col>
        </Row>
    </div>
  )
}
