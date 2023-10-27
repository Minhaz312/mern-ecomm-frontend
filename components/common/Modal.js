"use client"
import {IoMdClose} from "react-icons/io"
export default function Modal({children,loading=false,show=false,footer=true,title="Modal Title",onAction=()=>{},onHide=()=>{},className="bg-white",btnTitle="add"}) {
  return (
    <div className={`bg-black/30 fixed backdrop-blur-[5px] left-0 top-0 bottom-0 right-0 z-[10000] h-full w-full sm:w-full flex justify-center items-center overflow-hidden ${show?"block":"hidden"}`}>
        <div className={`min-h-[200px] sm:min-w-[450px] min-w-[80%] max-w-[95%] animate-zoomIn p-3 flex flex-col justify-between text-slate-900 bg-slate-100 ${className}`}>
            <div className='flex justify-between items-center mb-2 sm:mb-5'>
                <h3 className='text-sm md:text-xl sm:text-lg'>{title}</h3>
                <button onClick={onHide} className="text-[20px] sm:text-[30px]"><IoMdClose /></button>
            </div>
            <div className="w-full h-full overflow-auto">
              {children}
            </div>
            <div className={`${footer?"flex":"hidden"} justify-end mt-5`}>
                <button className='px-3 py-2 bg-slate-900 text-white font-semibold rounded mr-2' onClick={onHide}>close</button>
                <button onClick={onAction} className='px-3 py-2 bg-green-900 text-white font-semibold rounded'>{btnTitle}{loading?"ing...":""}</button>
            </div>
        </div>
    </div>
  )
}