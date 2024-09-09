import React from 'react'
import { Link } from 'react-router-dom'

const Order = ({ price, billingInfo, id }) => {
    return (
        <div className='flex w-full  border-b-[1px]'>
            <Link to={`/admin/orders/${id}`} className='w-full'>
                <div className='flex text-center text-sm py-3 bg-white hover:bg-[#f5f5f5]
             duration-75 rounded-t-md w-full'>
                    <p className='w-[10%] text-center'>{id}</p>
                    <p className='w-[25%] text-center lg:w-[20%]'>{billingInfo.fullName}</p>
                    <p className='w-[25%] text-center  lg:w-[15%]'>{billingInfo.phone}</p>
                    <p className='w-[20%] text-center lg:w-[15%]'>{billingInfo.state}</p>
                    <p className='w-[25%] text-center lg:w-[20%]'>{billingInfo.mnplct}</p>
                    <p className='hidden lg:text-center w-[10%] lg:inline'>{price}</p>
                </div>
            </Link>
        </div>)
}

export default Order