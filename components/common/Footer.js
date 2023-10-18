import { FiYoutube } from "react-icons/fi"
import { BsInstagram } from "react-icons/bs"
import { RiFacebookFill } from "react-icons/ri"

export default function Footer() {
  return (
    <div className='bg-slate-900 py-5'>
            <div className='cs-container'>
                <div className='grid grid-cols-12 gap-3'>
                    <div className='col-span-12 md:col-span-3 text-white'>
                        <h1 className='font-bold text-xl md:text-4xl'>BGCExpress</h1>
                        <p className='text-sm text-slate-300 my-2'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
                        <div className='flex gap-2 my-2'>
                            <BsInstagram color='white' />
                            <RiFacebookFill color='white' />
                            <FiYoutube color='white' />
                        </div>
                    </div>
                    <div className='col-span-12 md:col-span-3 text-white'>
                        <h3 className='text-lg font-bold'>Quick Links</h3>
                        <ul className='text-sm pl-3 text-slate-300'>
                            <li className='my-2 hover:text-slate-100'>Home</li>
                            <li className='my-2 hover:text-slate-100'>Affiliation With Us</li>
                            <li className='my-2 hover:text-slate-100'>Our Company</li>
                            <li className='my-2 hover:text-slate-100'>Privacy & Policy</li>
                            <li className='my-2 hover:text-slate-100'>Terms & Conditions</li>
                        </ul>
                    </div>
                    <div className='col-span-12 md:col-span-3'>
                        <h3 className='text-lg font-bold text-white mb-3'>Get App On</h3>
                        <img src="/images/get-inplay.png" className="md:w-[200px] w-[100px] h-auto" />
                    </div>
                </div>
                <div className='border-t border-slate-600 text-slate-300 my-3 py-3 text-center'>
                    Copyright&copy; 2000-2023. All right reserved.
                </div>
            </div>
        </div>
  )
}
