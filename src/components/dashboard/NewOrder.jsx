import React from 'react'
import DataTable from 'react-data-table-component'
import { BsEyeFill, BsTrashFill } from 'react-icons/bs'

export default function NewOrder() {
  const columns = [
    {name:"OrderID",selector:row=>row.order_id},
    {name:"Quantity",selector:row=>row.quantity},
    {name:"Total Price",selector:row=>row.total_price},
    {name:"Order Date",selector:row=>row.date},
    {name:"Actions",width:"100px",cell:row=><div className='d-flex gapx-1'>
      <button className='btn btn-sm btn-primary rounded-0 me-1'><BsEyeFill /></button>
      <button className='btn btn-sm btn-danger rounded-0'><BsTrashFill /></button>
    </div>},
  ]
  const data = [
    {order_id:"1a3dadf",quantity:"3",total_price:"3453",date:"1/2/2023"},
    {order_id:"1a3dadf",quantity:"3",total_price:"3453",date:"1/2/2023"},
    {order_id:"1a3dadf",quantity:"3",total_price:"3453",date:"1/2/2023"},
    {order_id:"1a3dadf",quantity:"3",total_price:"3453",date:"1/2/2023"},
    {order_id:"1a3dadf",quantity:"3",total_price:"3453",date:"1/2/2023"},
    {order_id:"1a3dadf",quantity:"3",total_price:"3453",date:"1/2/2023"},
    {order_id:"1a3dadf",quantity:"3",total_price:"3453",date:"1/2/2023"},
    {order_id:"1a3dadf",quantity:"3",total_price:"3453",date:"1/2/2023"},
  ]
  return (
    <div className='p-3 rounded shadow-sm bg-white'>
      <DataTable 
        columns={columns}
        data={data}
        customStyles={{
          headCells: {
            style: {
                paddingLeft: '8px', // override the cell padding for head cells
                paddingRight: '8px',
                fontSize:"20px",
                backgroundColor:"#3D5BA0",
                color:"white"
            },
        },
        }}
        pagination
        paginationPerPage={8}

      />
    </div>
  )
}
