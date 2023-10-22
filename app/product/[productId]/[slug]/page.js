import apiUrl, { api_uri } from '@/app/apiUrl';
import CurrencyFormat from '@/components/common/CurrencyFormat';
import TakaIcon from '@/components/icon/TakaIcon';
import ProductDetailsActions from '@/components/product/ProductDetailsActions';
import ProductItem from '@/components/product/ProductItem';
import ProductMoreImageSlider from '@/components/product/ProductMoreImageSlider';

export async function generateMetadata({ params }) {
  const product = await fetch(`${apiUrl}/product/get/${params.productId}`).then(res=>res.json())
  console.log('metadata product res: ',product)
  return {
    title: product.data.name,
    openGraph: {
      images: [`${api_uri}/images/${product.data.primaryImage}`],
    },
  }
}

export default async function Page({params}) {
  const {productId,slug} = params;
  const detailRes = await fetch(`${apiUrl}/product/get/${productId}`,{cache:"no-store"})
  const detailJson = await detailRes.json()
  const productDetails = detailJson.data;
  const relatedProducts = detailJson.relatedProduct
  const discountedPrice = Number(productDetails.price)-(Number(productDetails.price)*(Number(productDetails.discount)/100))
  return (
    <div>
    <div className='bg-[#fefefe] rounded-lg my-3'>
        <div className='grid grid-cols-12 gap-x-5'>
            <div className='col-span-12 sm:col-span-5 p-3'>
            <div className='rounded-lg w-full'>
              <img src={`${api_uri}/images/${productDetails.primaryImage}`} className='h-[200px] w-full object-contain md:h-[400px]' />
              {productDetails.images.length>0&&(
                <div className='relative'>
                    <ProductMoreImageSlider imageList={productDetails.images} />
                </div>
              )}
            </div>
            </div>
            <div className='col-span-12 sm:col-span-7 p-3'>
                <h1 className='text-xl font-semibold text-slate-800 mb-5 xl:text-2xl'>{productDetails.name}</h1>
                <div className='flex items-center my-4 gap-3'>
                    {productDetails.discount>0&&(<div>
                      <p className='px-2 rounded py-0.5 bg-green-500/10 border border-green-700/20 text-green-600 font-semibold text-[13px] md:text-base'>{productDetails.discount}% off</p>
                    </div>)}
                    <div className='flex items-center gap-x-3'>
                      <p className='text-slate-800 text-xl flex items-center gap-x-2 font-semibold md:text-2xl'><TakaIcon size={15} /> Price: <CurrencyFormat price={Number(discountedPrice)} currency='Tk' /></p>
                      {productDetails.discount>0&&(<div>
                      <p className='text-slate-500 line-through text-xl'><CurrencyFormat price={productDetails.price} currency='Tk' /></p>
                    </div>)}                      
                    </div>
                </div>
                {
                  productDetails.quantity<1&&(<p className='bg-red-300/30 inline-block px-2 py-0.5 text-base my-2 rounded border border-red-500/20 font-semibold text-red-600 md:text-sm'>Stock out</p>)
                }
                {
                  productDetails.quantity>0&&productDetails.quantity<10&&(<p className='bg-orange-300/40 inline-block px-2 py-0.5 text-base my-2 rounded border border-orange-500/20 font-semibold text-orange-500 md:text-sm'>{productDetails.quantity} available only</p>)
                }
                {/* product buy actions */}
                <ProductDetailsActions productDetails={productDetails} />
            </div>
        </div>
        <div className='w-full p-3'>
          
<div className="text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
    <ul className="flex flex-wrap -mb-px">
        <li className="mr-2">
            <a href="#" className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" aria-current="page">Description</a>
        </li>
    </ul>
</div>
<div>
  <div className='my-3' dangerouslySetInnerHTML={{__html:productDetails.description}}></div>
  {/* <div className='cursor-pointer py-1 text-center'>see more</div> */}
</div>

        </div>
      </div>
      <div>
        <h1 className="font-semibold text-slate-600 text-2xl mb-5 text-center">Related Product</h1>
        <div className='my-5 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3'>
          {
              relatedProducts.map((item,i)=><ProductItem key={i} product={item} />)
            }
        </div>
      </div>
    </div>
  )
}


// design link
// https://dribbble.com/shots/20295285-Imperra-Furniture-Store-Detail-Page