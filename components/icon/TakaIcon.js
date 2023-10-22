import Image from 'next/image'
import React from 'react'

export default function TakaIcon({opacity=1,size=15}) {
  return (
    <Image src='/images/taka-icon.png' alt='TK' height={size} width={size} style={{opacity}} />
  )
}
