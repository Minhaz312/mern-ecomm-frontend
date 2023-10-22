import { FiYoutube } from "react-icons/fi"
import { BsInstagram } from "react-icons/bs"
import { RiFacebookFill } from "react-icons/ri"
import Link from "next/link"

export default function Footer() {
  return (
    <div className='bg-slate-900 pt-5'>
            <div className='cs-container'>
                <div className='grid grid-cols-12 gap-3 py-5'>
                    <div className='col-span-12 sm:col-span-7 lg:col-span-4 text-white'>
                        <img src="/images/white-logo.png" className="w-1/2 lg:w-3/5 md:w-2/5" />
                        <p className='text-md font-[400] text-slate-300 my-4'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                        <div className='flex gap-2 my-2'>
                            <BsInstagram color='white' />
                            <RiFacebookFill color='white' />
                            <FiYoutube color='white' />
                        </div>
                    </div>
                    <div className='col-span-12 sm:col-span-5 lg:col-span-3 sm:pl-10 text-white'>
                        <h3 className='text-lg font-bold mb-5'>Quick Links</h3>
                        <ul className='text-sm pl-3 text-slate-300'>
                            <li className='my-2 hover:text-slate-100 font-[400]'><Link href="/">Home</Link></li>
                            <li className='my-2 hover:text-slate-100 font-[400]'><Link href="/affiliation">Affiliation With Us</Link></li>
                            <li className='my-2 hover:text-slate-100 font-[400]'><Link href="/about">Our Company</Link></li>
                            <li className='my-2 hover:text-slate-100 font-[400]'><Link href="/privacy-plicy">Privacy & Policy</Link></li>
                            <li className='my-2 hover:text-slate-100 font-[400]'><Link href="/terms-conditions">Terms & Conditions</Link></li>
                        </ul>
                    </div>
                    <div className='col-span-12 sm:col-span-6 lg:col-span-3  text-white'>
                        <h3 className='text-lg font-bold mb-5'>Our address</h3>
                        <div className="pl-3">
                            <p className="text-slate-300">Mohakhali, Dhaka. #Road-A/132</p>
                            <p className="text-slate-300">Tel: +90285</p>
                            <p className="text-slate-300">info@lembda.com</p>
                        </div>
                    </div>
                    <div className='col-span-12 sm:col-span-6 lg:col-span-2'>
                        <h3 className='text-lg font-bold text-white mb-5'>Get App On</h3>
                        <img src="/images/get-inplay.png" className="md:w-[200px] w-[100px] h-auto ml-3" />
                    </div>
                </div>
                <div className='border-t border-slate-600 text-slate-300 mt-3 py-3 text-center'>
                    Copyright&copy; 2000-2023. All right reserved.
                </div>
            </div>
        </div>
  )
}
