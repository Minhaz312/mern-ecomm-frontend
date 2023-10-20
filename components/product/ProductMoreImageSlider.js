"use client"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import { api_uri } from "@/app/apiUrl";

export default function ProductMoreImageSlider({imageList}) {
    console.log('imageList: ',imageList)
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 3
    };
  return (
    <div>
        {imageList.length<=5&&(
            <div className="flex justify-around gap-x-1">
                {imageList.map((item,i)=><div key={i}>
                    <img src={`${api_uri}/images/${item}`} className="w-full h-[50px]" />
                    </div>
                )}
            </div>
        )}
        {imageList.length>5&&(
            <Slider {...settings}>
                {imageList.map((item,i)=><div key={i}>
                    <img src={`${api_uri}/images/${item}`} className="w-auto h-[60px]" />
                </div>)}
            </Slider>
        )}
        
    </div>
  )
}
