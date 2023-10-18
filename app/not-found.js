import Link from 'next/link'
 
export default function NotFound() {
  return (
    <div>
        <div className='h-[300px] flex justify-center items-center flex-col'>
            <h3 className='text-xl font-bold text-slate-500'>Not Found</h3>
            <p className='text-base text-slate-500 mt-2'>Could not find requested resource</p>
            <Link href="/">Return Home</Link>
        </div>
    </div>
  )
}