import React, { useEffect, useState } from 'react'
import Layout from '../../components/common/layout'
import DataTable from 'react-data-table-component';
import axios from 'axios';
import apiUrl, { api_uri } from '../../apiUrl';
import { Button, Modal } from 'react-bootstrap';

export default function DeliveredOrderList() {
  const [orderList, setOrderList] = useState([])
  const [orderToView, setOrderToView] = useState(null)
  const [totalProdPrice, setTotalProdPrice] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [loading, setLoading] = useState(true)

  const getAllOrder = () => {
    axios.get(`${apiUrl}/order/get/all-delivered`).then(res=>{
      setOrderList(res.data.data);
    }).catch(err=>{
      console.log(err)
    })
  }

  const handleShowOrderModal = data => {
    console.log("data: ",data)
    if(showModal){
      setShowModal(false)
      setTotalProdPrice({})
    }else{
      setShowModal(true)
      setOrderToView(data)
      let totalProd = 0;
      let totalPrice = 0;
      data.productList.map((item,i)=>{
        totalProd+=item.quantity;
        totalPrice+=item.totalPrice
      })
      setTotalProdPrice({totalProd:totalProd,totalPrice:totalPrice})
    }
  }
  useEffect(()=>{
    getAllOrder()
  },[])

  const ShowTotal = (type,productList)=>{
    let totalPrice = 0
    let totalQty = 0
    productList.map(prod=>{
      totalQty+=prod.quantity
      totalPrice+=prod.totalPrice
    })
    if(type==="qty"){
      return totalQty
    }else {
      return totalPrice
    }
  }
  const productListColumn = [
    {name:"Order ID",selector:row=>row._id},
    {name:"Shipping Address",selector:row=>row.shippingAddress},
    {name:"Total Price",cell:row=><div>
      {ShowTotal("price",row.productList)}
    </div>},
    {name:"Total Product",cell:row=><div>
      {ShowTotal("qty",row.productList)}
    </div>},
    {name:"Status",cell:row=><div>
      {row.accepted===true?<>
        {row.delivered===true?<p className='text-success fw-bold'>Delivered</p>:<p className='text-warning fw-bold'>Not Delivered</p>}
      </>:<p className='text-warning fw-bold'>Not Accepted</p>}
    </div>},
    {name:"Order Date",cell:row=><div>{new Date(row.orderDate).toLocaleDateString()}</div>},
    {name:"Action",cell:row=><div>
      <button className='btn btn-sm me-1 btn-info' onClick={handleShowOrderModal.bind(this,row)}>View</button>    
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


  return (
    <Layout>
      <Modal show={showModal} onHide={handleShowOrderModal} centered animation={false} size="lg">
        <Modal.Header closeButton>Order Item #{orderToView!==null?orderToView._id:""}</Modal.Header>
        <Modal.Body>
          {
            orderToView!==null?<>
            <table className='table'>
            <tr className='border-bottom py-2'>
              <th className='w-[33.3%] py-2'>OrderId</th>
              <th className='w-[33.3%] py-2'>Shipping Address</th>
              <th className='w-[33.3%] py-2'>Order Date</th>
            </tr>
            <tr className='border-bottom'>
              <td className='w-[33.3%] py-2'>{orderToView._id}</td>
              <td className='w-[33.3%] py-2'>{orderToView.shippingAddress}</td>
              <td className='w-[33.3%] py-2'>{new Date(orderToView.orderDate).toDateString()}</td>
            </tr>
          </table>
          <table className='table'>
            <tr className='border-bottom py-2 bg-dark text-white'>
              <th className='w-[60%] py-2'>Product</th>
              <th className='w-[20%] py-2'>Quantity</th>
              <th className='w-[20%] py-2'>Total Price</th>
            </tr>
            {orderToView.productList.map((item,i)=><tr key={i} className='border-bottom'>
                <td className='w-[60%]'>
                  <div className='d-flex'>
                    <img src={`${api_uri}/images/${item.productImage}`} style={{height:"50px",width:"auto"}} />
                      <h3 className='fs-5 ms-2'>{item.productName.substring(0,30)}...</h3>
                  </div>
                </td>
                <td className='w-[20%] text-center'>{item.quantity}</td>            
                <td className='w-[20%] text-center'>{item.totalPrice}tk</td>                      
              </tr>
            )}
            <tr>
              <td className='w-[60%] py-2 fw-bold'>Total</td>
              <td className='w-[20%] py-2 fw-bold text-center'>{totalProdPrice.totalProd}</td>
              <td className='w-[20%] py-2 fw-bold text-center'>{totalProdPrice.totalPrice}TK</td>
            </tr>
          </table>
            </>:""
          }
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={handleShowOrderModal}>Close</Button>
        </Modal.Footer>
      </Modal>
      {
        orderList!==null?<DataTable
        columns={productListColumn}
        data={orderList}
        pagination
        selectableRows={false}
        customStyles={customStyles}
        selectableRowsVisibleOnly 
      />:""
      }
    </Layout>
  )
}
