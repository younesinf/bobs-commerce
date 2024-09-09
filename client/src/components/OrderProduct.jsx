

const OrderProduct = ({ product }) => {
    return (
        <div className='py-1 px-4 border-b-[1px] w-full flexBetween'>
            <div className='h-full flexCenter gap-4 lg:gap-8'>
                <img src={product.imgs[0]} alt="" className='h-28' />
                <div className='gap-2'>
                    <h3 className='text-lg font-medium w-full'>{product.pName}</h3>
                    <p>{product.newPrice}دج</p>
                </div>
            </div>
            <div className='flexBetween flex-col-reverse md:flex-row gap-2 lg:gap-6'>
                <div className='text-base'>
                    <p>الحجم : <span className="font-semibold">{product.size}</span></p>
                    <p>اللون : <span className="font-semibold">{product.color}</span></p>
                    <p>الكمية : <span className="font-semibold">{product.quantity}</span></p>

                </div>
            </div>
        </div>)
}

export default OrderProduct