import React, { useEffect, useState } from 'react'
import { Col, Row, Spinner } from 'react-bootstrap'
import SummaryCard from '../components/SummaryCard'
import Layout from "./../components/common/layout"
import SaleChart from '../components/dashboard/SaleChart'
import NewOrder from '../components/dashboard/NewOrder'
export default function Home() {
    const [summary,setSummary] = useState(null)
    const [loading,setLoading] = useState(false)
  const summaries = [
    {title:"Total Registered Customer",quantity:224},
    {title:"Total Products",quantity:24},
    {title:"Total Revinue",quantity:224000},
    {title:"Total Category",quantity:5},
  ]
  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position)=>{
      console.log("position: ",position)
    })
  },[])
  if(loading){
    return <Layout>
        <div className='w-100 d-flex justify-content-center align-items-center h-100'>
            <Spinner animation="border" size="md" />
        </div>
    </Layout>
  }
  return (
    <Layout>
        <Row>
          {summaries.map((item,i)=><Col key={i} lg={3} className="p-3" style={{zIndex:"0"}}>
            <SummaryCard delay={(i+1)*0.01} duration={0.5} title={item.title} quantity={item.quantity} />
          </Col>)}
        </Row>
        <Row className='mt-5'>
            <Col md={6}>
                <SaleChart /> 
            </Col>
            <Col md={6}>
                <NewOrder /> 
            </Col>
        </Row>       
    </Layout>
  )
}
