"use client"
import { api_uri } from '@/app/apiUrl'
import { useState } from 'react'
export default function ProductImageRenderer({primaryImage, imageList}) {
    const [image, setImage] = useState(primaryImage);
    const handleSelectImage = selectedImage => {
        setImage(selectedImage)
    }
    return (
        <div className='w-full h-full'>
            <img src={`${api_uri}/images/${image}`} className='h-[200px] w-full object-contain md:h-[400px]' />
            {imageList.length>0&&(
                <div className='flex gap-x-2 flex-nowrap overflow-auto'>
                    <img src={`${api_uri}/images/${image}`} className='h-[40px] w-[50px] object-cover' />
                </div>
            )}
        </div>
    )
}
