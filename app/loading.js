import React from 'react'

export default function loading() {
  return (
    <div className="h-screen flex justify-center items-center">
      <div className='grid grid-cols-12 aspect-video'>
        <div className='col-span-4 animate-pulse h-full bg-slate-300'></div>
        <div className='col-span-8 animate-pulse h-full bg-slate-300'></div>
      </div>
    </div>
  )
}
