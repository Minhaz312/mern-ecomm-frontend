"use client"
import React, { useEffect, useState } from 'react'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import apiUrl,{ api_uri } from './../../app/apiUrl';
import Link from 'next/link';
import './hero.module.css'
const settings = {
    dots: true,
    infinite: true,
    arrows:false,
    speed: 1000,
    className:"ads-list",
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    pausonHover:true,
    speed: 1000,
    autoplaySpeed: 4000,
  };
export default function AdList({adsList}) {
  return (
    <>
      <Slider {...settings}>
          {
              adsList.map((item,i)=><Link href={item.productLink} className='relative' key={i}>
                  <div className='rounded-xl overflow-hidden'>
                    <div style={{background:"rgb(0,0,0,0.0008)",height:"100%",width:"100%",top:"0",left:"0",bottom:"0",position:"absolute"}}></div>
                    <img className='lg:h-[350px] md:h-[300px] md:aspect-auto aspect-video h-auto w-full object-fit' src={`${api_uri}/images/${item.image}`} />
                  </div>
          </Link>)
          }
      </Slider>

    </>
  )
}
