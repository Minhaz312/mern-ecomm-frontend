import React, { useRef, useState } from 'react'
import { AiOutlineLeft, AiOutlineRight } from 'react-icons/ai';
import { FaCartArrowDown } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Slider from 'react-slick'
import Layout from '../components/Layout'

export default function ProductDetails() {
  const moreImageSliderRef = useRef(null)
  const [backgroundPosition, setBackgroundPosition] = useState("")
  const settings = {
    dots: false,
    infinite: true,
    arrows:false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 3,
    autoplay: false,
    pausonHover:false,
    speed: 1000,
    autoplaySpeed: 1000,
  };
  const handleNextMoreImage = () => {
    moreImageSliderRef.current.slickNext()
  }
  const handlePrevMoreImage = () => {
    moreImageSliderRef.current.slickPrev()
  }
  const handleMouseMove = e => {
    const { left, top, width, height } = e.target.getBoundingClientRect()
    const x = (e.pageX - left) / width * 120
    const y = (e.pageY - top) / height * 120
    setBackgroundPosition(`${x}% ${y}%`)
  }
  const src = "/images/fridge.jfif"
  return (
    <Layout>
      <div className='bg-white my-3'>
        <div className='grid grid-cols-12'>
            <div className='col-span-5'>
              <figure onMouseMove={handleMouseMove} className="product-details-image" style={{backgroundPosition:backgroundPosition,backgroundImage: `url(${src})`,backgroundRepeat:"no-repeat"}}>
                <img src={src} style={{height:"500",width:"100%",objectFit:"cover"}} />
              </figure>
                <div className='relative'>
                  <Slider ref={moreImageSliderRef} {...settings} className="px-8">
                    {
                      [1,2,3,4,5,6,7,8,9].map((item,i)=><div key={i} className='p-1'>
                      <img src="/images/fridge.jfif" style={{height:"100",width:"100%",objectFit:"cover"}} />
                    </div>)
                    }
                  </Slider>
                    <button className='text-slate-900 text-center font-bold text-3xl px-3 py-0 absolute -right-4 top-2/4 -translate-y-1/2' onClick={handleNextMoreImage}><AiOutlineRight /></button>
                    <button className='text-slate-900 text-center font-bold text-3xl px-3 py-0 absolute -left-4 top-2/4 -translate-y-1/2' onClick={handlePrevMoreImage}><AiOutlineLeft /></button>
                </div>
            </div>
            <div className='col-span-5 p-3'>
                <h1 className='text-4xl font-bold text-slate-600 mb-10'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's</h1>
                <div className='flex items-center my-4 gap-3'>
                    <h3 className='text-4xl text-slate-500 font-semibold'>Category: </h3>
                    <p className='text-3xl text-slate-600 font-semibold'>Fashion</p>
                </div>
                <div className='flex items-center my-4 gap-3'>
                    <h3 className='text-4xl text-slate-500 font-semibold'>Price: </h3>
                    <div className='flex items-center gap-2'>
                        <p className='text-5xl text-slate-600 font-semibold'>23000tk</p>
                        <p className='text-slate-500 text-2xl'><del>1000tk</del></p>
                    </div>
                </div>
                <p className='bg-red-300 inline-block px-2 my-3 rounded-md font-bold text-red-900'>Stock out</p>
                <p className='bg-green-300 inline-block px-2 my-3 rounded-md font-bold text-green-900 ml-3'>Available</p>
                <div className='flex my-8 gap-5'>
                  <select className='bg-white shadow-lg text-xl border rounded px-4 py-1 outline-none focus:outline-none'>
                    <option>Select Size</option>
                    <option>sm</option>
                    <option>M</option>
                    <option>L</option>
                    <option>XL</option>
                    <option>2XL</option>
                    <option>3XL</option>
                  </select>
                  <div className='flex items-center'>
                    <button className='bg-slate-700 text-white font-bold text-3xl px-3 py-0'>+</button>
                    <p className='mx-4 text-lg font-semibold'>3</p>
                    <button className='bg-slate-700 text-white font-bold text-3xl px-3 py-0'>-</button>
                  </div>
                </div>
                <div>
                  <button className='bg-blue-700 text-white font-bold text-xl px-8 py-2'>Buy Now</button>
                  <button className='bg-orange-700 text-white font-bold text-xl px-8 py-2 ml-3'>Add to Cart</button>
                </div>
            </div>
            <div className='col-span-2 pr-2 mt-2'>
                <div className='border p-2'>
                  <img src="/images/fridge.jfif" style={{height:"200px",width:"100%",objectFit:"cover"}} />
                  <h3 className='text-slate-500 text-base'>lorem ipsum dollar sit ammet, lorem ipsum dollar sit ammet...</h3>
                  <div className='flex items-center gap-2 mt-3'>
                      <p className='text-xl text-slate-600 font-semibold'>230tk</p>
                      <p className='text-slate-500'><del>300tk</del></p>
                  </div>
                </div>
                <div className='border p-2'>
                  <img src="/images/fridge.jfif" style={{height:"200px",width:"100%",objectFit:"cover"}} />
                  <h3 className='text-slate-500 text-base'>lorem ipsum dollar sit ammet, lorem ipsum dollar sit ammet...</h3>
                  <div className='flex items-center gap-2 mt-3'>
                      <p className='text-xl text-slate-600 font-semibold'>230tk</p>
                      <p className='text-slate-500'><del>300tk</del></p>
                  </div>
                </div>
            </div>
        </div>
        <div className='w-full p-3'>
          
<div class="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
    <ul class="flex flex-wrap -mb-px">
        <li class="mr-2">
            <a href="#" class="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" aria-current="page">Description</a>
        </li>
        <li class="mr-2">
            <a href="#" class="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">Video</a>
        </li>
    </ul>
</div>
<div className='my-3'>
Brand HP
Model HP M22F
Shape Flat
Display Size (Inch) 21.5
Display Type FHD LED
Panel Type IPS
Display Resolution 1920x1080 (WxH) FHD
Aspect Ratio 16:9
Display Surface Anti-glare
Brightness (cd/m2) 300cd/m2
Contrast Ratio (TCR/DCR) 1000:1
Refresh Rate (Hz) 75Hz
Adaptive-Sync Technology Yes
AMD Radeon FreeSync Yes
Color Gamut / Color Space 99% sRGB
Response Time (ms) 5ms (Gray to Gray)
VGA Port 1
HDMI Port 1
Lock Slot Yes
Tilt Adjustment -5 - +25 degree
Power Consumption 19 W (maximum), 13 W (typical), 0.5 W (standby)
Operating Temperature 5 - 35 degree C
#monitor
HP M22F 21.5 Inch FHD IPS Monitor

Brand - HP, Model - HP M22F, Shape - Flat, Display Size (Inch) - 21.5 Inch, Display Type - FHD LED Display, Panel Type - IPS, Display Resolution - 1920 x 1080, Aspect Ratio - 16:9, Display Surface - Anti-glare, Maximum Brightness (cd/m2) - 300 nits, Contrast Ratio - 1000:1, Refresh Rate (Hz) - 75Hz, Adaptive-Sync Technology - Yes, AMD Radeon FreeSync - Yes, Color Gamut / Color Space - 99% sRGB, Response Time (ms) - 5ms (Gray To Gray), VGA Port - 1, HDMI Port - 1, Power Consumption - 19 W (maximum), 13 W (typical), 0.5 W (standby), Operating Temperature - 5 - 35 degree C, Certifications - Australian-New Zealand MEPS; BIS; BSMI; CB; CCC; CE; CECP; CEL; cTUVus; EAC; ENERGY STAR??; EUP Lot-5; EUP Lot-6; FCC; ICES; ISO 9241-307; KC/KCC; NOM; VCCI; Vietnam MEPS; WEEE; Low blue light; EUP Lot-26; California Energy Commission (CEC); South Africa Energy; eStandby; WW application; UAE; Ukraine certificates; NRCS of South Africa, Tilt Adjustment - -5 - +25 degree, Lock Slot - Yes, Weight - 2.2 kg, Dimensions - 486 x 287 x 32 mm (without stand), 486 x 178 x 32 mm (with stand), Specialty - An always-on blue light filter that keeps your eyes comfortable with zero impact on color accuracy. Cord and wire pass-through located on the display stand reduces cord-clutter. Customize your display with the software that lets you tailor your settings, partition screens, and even dim the screen., Others - Power: 100 - 240 VAC 50/60 Hz, Panel active area: 47.6 x 26.78 cm, Pixel pitch: 0.248 mm, Operating humidity range: 20 - 80% non-condensing, Warranty - 3 Year, Country of Origin - USA, Made in/ Assemble - China

Specifications of HP M22F 21.5 Inch FHD IPS Monitor
BrandHPSKU189594574_BD-1137299551Mounting TypeDesk MountDisplay FeaturesFull HD
What’s in the box	HP M22F 21.5 Inch FHD IPS Monitor
</div>

        </div>
      </div>
        <h3 className='text-3xl font-bold text-slate-500 my-5'>Related Products</h3>
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
    </Layout>
  )
}
