import { api_uri } from "@/app/apiUrl"
import Link from "next/link"
import CurrencyFormat from "../common/CurrencyFormat"
import TakaIcon from "../icon/TakaIcon"

export default function ProductItem({product}) {
    const PriceRenderer = () => {
        const discountedPrice = Number(product.price)-(Number(product.price)*(Number(product.discount)/100))
        if(product.discount>0){
            return <div className='flex items-center justify-between'>
                <div>
                    <p className='text-sm text-slate-700 font-semibold mt-2 flex items-center gap-x-1 md:text-lg'><TakaIcon /><CurrencyFormat price={discountedPrice} currency="tk" /></p>
                    <p className="text-[12px] flex font-semibold text-slate-500 md:text-sm"><del className="flex items-center gap-x-1"><TakaIcon opacity={0.5} /> <CurrencyFormat price={product.price} currency="tk" /></del><span className="mx-1">{product.discount}%</span></p>
                </div>
            </div>
        }else {
            return <div className='flex items-center justify-between'>
                <p className='text-sm text-slate-700 font-semibold mt-2 flex items-center gap-x-1 md:text-lg'><TakaIcon /> <CurrencyFormat price={product.price} currency="tk" /></p>
            </div>
        }
    }
  return (
    <div className='product-item bg-white rounded-lg hover:shadow-lg'>
        <Link href={`/product/${product._id}/${product.slug}`}>
            <div className="p-2 rounded-lg overflow-hidden">
                <img src={`${api_uri}/images/${product.primaryImage}`} className="md:h-[160px] h-[100px] w-full object-contain" />
            </div>
            <div className="p-3">
                <h3 className='text-slate-500 text-[13px] font-semibold line-clamp-2 md:text-base'>{product.name}</h3>
                <PriceRenderer />
            </div>
        </Link>
    </div>
  )
}
