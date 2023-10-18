"use client"
import React from 'react'

export default function Error() {
  return (
    <div className='h-[300px] flex justify-center items-center flex-col'>
        <h3 className='text-xl font-bold text-slate-500'>Failed to Load</h3>
        <p className='text-base text-slate-500 mt-2'>Please check your internet connection</p>
    </div>
  )
}
