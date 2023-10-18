import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'

export default function CustomModal({children,size="sm",show=false,title,onClose,buttonTitle,onFire}) {
  return (
    <Modal show={show} size={size} centered animation={false} onHide={onClose}>
        <Modal.Header closeButton>
            {title}
        </Modal.Header>
        <Modal.Body>
            {children}
        </Modal.Body>
        {
            buttonTitle==="false"?"":<Modal.Footer>
                <button onClick={onClose} className="btn btn-secondary btn-sm rounded-0 mx-1">Close</button>
                <button onClick={onFire} className="btn btn-success btn-sm rounded-0 mx-1">{buttonTitle}</button>
            </Modal.Footer>
        }
        
    </Modal>
  )
}
