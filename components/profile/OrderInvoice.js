
import React from 'react'

export default function OrderInvoice({order}) {
  let totalQuantity = 0;
  let totalPrice = 0;
  let totalPriceAfterDiscount = 0;
  order.productList.map(product=>{
    totalQuantity += product.quantity;
    totalPrice += product.productPrice;
    totalPriceAfterDiscount += product.totalPrice;
  })
  return (
    <div className='mx-auto px-0 py-3 w-[95%] print:w-[1123px] print:h-[500px] md:w-[1123px] md:px-5 print:px-5'>
        <div className='flex justify-between items-center'>
            <img src="/images/logo.png" className='h-[30px] md:h-[45px] print:h-[45px]' />
            <div className='flex flex-col items-end'>
                <p className='text-[13px] font-semibold text-slate-600 md:text-base print:text-base'>+8801846378235</p>
                <p className='text-[13px] font-semibold text-slate-600 md:text-base print:text-md'>contact@lembda.com</p>
            </div>
        </div>
        <div className=''>
            <img src="/images/invoice-border.png" className='w-[95%] h-[6px] print:h-[10px] mx-auto mt-5 mb-4 md:h-[10px]' />
            <div className='grid grid-cols-2 gap-y-3 md:grid-cols-3 print:grid-cols-3'>
                <div>
                    <h3 className='text-slate-700 font-semibold text-base md:text-lg print:text-lg'>Customer Details</h3>
                    <div>
                        <p className='text-slate-600 text-sm md:text-base print:text-base'>{order.userName}</p>
                        <p className='text-slate-600 text-sm md:text-base print:text-base'>{order.userMobile}</p>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <div>
                        <h3 className='text-slate-700 font-semibold text-base print:text-lg md:text-lg'>Shipping Address</h3>
                        <p className='text-slate-600 text-sm print:text-base md:text-base'>{order.shippingAddress}</p>
                    </div>
                </div>
                <div className='flex md:justify-end'>
                    <div>
                        <h3 className='text-slate-700 font-semibold text-base print:text-lg md:text-lg'>Dates</h3>
                        <p className='text-slate-600 text-sm print:text-base md:text-base'><span className='font-semibold'>Order Date: </span>{new Date(order.orderDate).toLocaleDateString()}</p>
                        <p className='text-slate-600 text-sm print:text-base md:text-base'>
                            {order.accepted===true?<p>Delivery Date: {new Date(order.deliveryDate).toLocaleDateString()}</p>:"Wait For acceptance"}
                        </p>
                    </div>
                </div>
            </div>
            <p className='mt-3 text-sm md:text-base print:text-base'><span className='font-bold text-slate-700'>Order Id: </span>{order._id}</p>
            <div className='w-full overflow-x-hidden my-3 pt-3 pb-1'>
                <div className='w-full overflow-scroll md:overflow-hidden print:w-full md:w-full'>
                    <table className='print:w-full md:w-full'>
                        <thead>
                            <tr className='bg-blue-50'>
                                <th className='w-[50%] border-b p-3 text-left text-[13px] print:text-base md:text-base'>Product Name</th>
                                <th className='w-[15%] border-b p-3 text-left text-[13px] print:text-base md:text-base'>Quantity</th>
                                <th className='w-[10%] border-b p-3 text-left text-[13px] print:text-base md:text-base'>Price</th>
                                <th className='w-[10%] border-b p-3 text-left text-[13px] print:text-base md:text-base'>Discount</th>
                                <th className='w-[15%] border-b p-3 text-left text-[13px] print:text-base md:text-base'>Total Price</th>
                            </tr>
                        </thead>
                        <tbody>
                            {order.productList.map((product,i)=><tr key={i}>
                                <td className='py-2 px-3 border-b text-[12px] print:text-base md:text-base'>{product.productName.substring(0,200)}</td>
                                <td className='py-2 px-3 border-b'>{product.quantity}</td>
                                <td className='py-2 px-3 border-b'>{product.productPrice}</td>
                                <td className='py-2 px-3 border-b'>{product.productPriceDiscount}</td>
                                <td className='py-2 px-3 border-b'>{product.totalPrice}</td>
                            </tr>)}
                            <tr className='bg-blue-50 p-3'>
                                <td className='py-2 px-3 font-bold border-b text-sm print:text-base md:text-base'>Sub Total</td>
                                <td className='py-2 px-3 font-bold border-b text-sm print:text-base md:text-base'>{totalQuantity}</td>
                                <td className='py-2 px-3 font-bold border-b'>{totalPrice}</td>
                                <td className='py-2 px-3 font-bold border-b'></td>
                                <td className='py-2 px-3 font-bold border-b text-sm print:text-base md:text-base'>{totalPriceAfterDiscount}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
  )
}
