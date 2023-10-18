import React from 'react'
import Layout from '../components/Layout'
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import { FaCartArrowDown } from 'react-icons/fa';

export default function Home() {
    const settings = {
        dots: false,
        infinite: true,
        arrows:false,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        pausonHover:true,
        speed: 3000,
        autoplaySpeed: 3000,
      };
      const categories = [
        {name:"category 1"},
        {name:"category 1"},
        {name:"category 1"},
        {name:"category 1"},
        {name:"category 1"},
        {name:"category 1"},
        {name:"category 1"},
        {name:"category 1"},
      ]
  return (
    <Layout>
        <div className='grid grid-cols-12 h-full bg-white'>
            <div className='col-span-2'>
                <ul className='px-5'>
                    {
                        categories.map((item,i)=><li key={i} className='relative py-2 text-slate-400 font-semibold hover:text-slate-800'><div>
                            <Link to="/asdf" className='w-full'>{item.name}</Link>
                            <div className='bg-white absolute left-full top-0'>
                                <ul>
                                    {categories.map((item,i)=><li>{item.name}</li>)}
                                </ul>
                            </div>
                            </div></li>)
                    }
                </ul>
            </div>
            <div className='col-span-8 h-full'>
                <Slider {...settings}>
                    <div style={{height:"400px"}}>
                        <img className='w-full object-cover' style={{height:"400px"}} src="/images/banner1.jfif" />
                    </div>
                    <div style={{height:"400px"}}>
                        <img className='w-full object-cover' style={{height:"400px"}} src="/images/fridge.jfif" />
                    </div>
                    <div style={{height:"400px"}}>
                        <img className='w-full object-cover' style={{height:"400px"}} src="/images/banner2.jfif" />
                    </div>
                    <div style={{height:"400px"}}>
                        <img className='w-full object-cover' style={{height:"400px"}} src="/images/fridge.jfif" />
                    </div>
                </Slider>
            </div>
            <div className='col-span-2 h-full'>
                <div className='h-full w-full'>
                    <div className='bg-slate-200 rounded shadow m-1' style={{height:"200px"}}>
                        item 1
                    </div>
                    <div className='bg-slate-200 rounded shadow m-1' style={{height:"200px"}}>
                        item 1
                    </div>
                </div>
            </div>
        </div>
        <div className='my-3 bg-slate-200 p-3 shadow-sm rounded'>
            <h3 className='text-xl font-bold text-slate-500 my-3'>Suggested for you</h3>
            <div className='grid grid-cols-12 gap-2'>
                {
                    [1,2,3,4,5,6,7,8,9,10,11,12].map((item,i)=><div key={i} className='col-span-2 p-3 bg-white rounded hover:shadow-lg'>
                        <Link to="/product/123/this-is-hp-monitor">
                            <img src="/images/fridge.jfif" height="150px" />
                            <h3 className='text-slate-500 text-base'>lorem ipsum dollar sit ammet, lorem ipsum dollar sit ammet...</h3>
                        </Link>
                </div>)
                }
            </div>
            <div className='flex justify-center mt-5'>
                <button className='border-none outline-none px-2 py-1 text-sm font-semibold text-white bg-slate-800 rounded focus:outline-green-900'>see more</button>
            </div>
        </div>
        <h3 className='text-xl font-bold text-slate-500 my-5'>New Arrival</h3>
        <div className='my-5 grid grid-cols-12 gap-3'>
            {
                [1,2,3,4,5,6,7,8,9,10,11,12].map((item,i)=><div key={i} className='product-item col-span-2 p-3 bg-white rounded hover:shadow-lg'>
                    <Link to="/product/123/this-is-hp-monitor">
                        <img src="/images/fridge.jfif" style={{height:"200px",width:"100%",objectFit:"cover"}} />
                        <h3 className='text-slate-500 text-base'>lorem ipsum dollar sit ammet, lorem ipsum dollar sit ammet...</h3>
                        <div className='flex items-center justify-between'>
                            <div>
                                <p className='text-xl text-slate-600 font-semibold mt-3'>230tk</p>
                                <p><del>300tk</del></p>
                            </div>
                            <FaCartArrowDown size={25} className="hidden product-item-cart text-slate-500" />
                        </div>
                    </Link>
                </div>)
            }
        </div>
        <div className='flex justify-center my-5'>
            <button className='border-none outline-none px-2 py-1 text-sm font-semibold text-white bg-slate-700 rounded focus:outline-green-900'>see more</button>
        </div>
    </Layout>
  )
}
