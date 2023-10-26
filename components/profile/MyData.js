import React, { useState } from 'react'
import Modal from '../common/Modal'
import { BiEditAlt } from 'react-icons/bi'

export default function MyData({user}) {
    const [showProfileModal, setShowProfileModal] = useState(false)
  const handleShowProfileModal = () => {
    if(showProfileModal) setShowProfileModal(false)
    else setShowProfileModal(true)
  }
  return (
    <div>
        <Modal show={showProfileModal} title='Your Profile' onHide={handleShowProfileModal}>
            my profile
        </Modal>
        <div className='flex justify-center w-full py-3'>
            <img src='/user.png' className="h-[120px] w-[120px] " />
        </div>
        <div className='flex justify-between items-center'>
        <h3 className='text-slate-600 text-3xl text-center mb-3'>{user.name}</h3>
        <button className='px-2 py-1' onClick={handleShowProfileModal}>
            <BiEditAlt />
        </button>
        </div>
        <h3 className='text-slate-500 text-md mb-3 sm:text-lg'>{user.mobile}</h3>
    </div>
  )
}
