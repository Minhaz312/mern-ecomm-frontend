import Image from 'next/image'
import React from 'react'

export default function TakaIcon({height=10,width=10,opacity=1}) {
  return (
    <Image src='/images/taka-icon.png' alt='TK' height={height} width={width} style={{opacity}} />
  )
}
