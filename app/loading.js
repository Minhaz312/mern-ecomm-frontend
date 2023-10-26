import LoadingSpinner from '@/components/common/LoadingSpinner'
import React from 'react'

export default function loading() {
  return (
    <div className="h-[50vh] flex justify-center items-center">
      <LoadingSpinner />
    </div>
  )
}
