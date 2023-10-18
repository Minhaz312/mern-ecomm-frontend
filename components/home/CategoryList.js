"use client"
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";

export default function CategoryList({categoryList}) {
  return (
    <ul className='h-full relative'>
        {
            categoryList.map((item,i)=><li key={i} className='nav-parent hover:bg-slate-100/70 text-slate-400 hover:text-blue-400'>
                <div className="relative">

                {
                    item.subcategories.length>0?<div className='px-3 w-full py-2 font-semibold cursor-pointer'>
                        <p>{item.name}</p>
                        <div className="catetgory-arrow bg-white/80"><MdKeyboardArrowRight className="h-[23px] w-[23px]" />
                        </div>
                    </div>:<Link href={`/product/category/${item.name}`} className='px-3 w-full py-2 font-semibold cursor-pointer' style={{display:"block"}}>{item.name}</Link>
                }
                </div>
            <ul className="nav-child h-full bg-white absolute top-0 shadow-lg border border-slate-200 rounded-md p-3" style={{width:"200px",zIndex:1,height:"350px",left:"65%"}}>
                {item.subcategories.map((item,i)=><li key={i} className='px-1 py-1 mb-1 text-slate-400 hover:text-blue-400 hover:bg-slate-100 cursor-pointer'>
                    <Link href={`/product/category/${item.name}`}>{item.name}</Link>
                </li>)}
            </ul>
            </li>)
        }
    </ul>
  )
}
