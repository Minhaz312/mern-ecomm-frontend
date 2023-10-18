import React from 'react'
export default function SummaryCard({delay=0.5,duration=1,title="",quantity=0}) {
  return (
    <div className='bg-white shadow-lg rounded border' style={{position:"relative",height:"200px",width:"100%",zIndex:"1"}}>
        <div style={{background:"linear-gradient(152.38deg, #3D5BA0 -37%, #865A9F 103.18%)",position:"absolute",bottom:"-20px",right:"-20px",height:"100%",width:'100%',borderRadius:"10px"}} className="text-white fw-bold d-flex justify-content-center align-items-center p-5">
            <div className='text-center'>
                <h4 style={{color:"rgb(255,255,255,0.7"}}>{title}</h4>
                <h1>{quantity}</h1>
            </div>
        </div>
    </div>
  )
}
