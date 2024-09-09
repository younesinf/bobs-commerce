import { ArrowBack, Close } from "@mui/icons-material"
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import OrderProduct from "../../components/OrderProduct"
import { delOrder } from "../../controllers/adminControllers"
import { URL } from '../../data'


const OrderDetails = () => {
    document.title = "Order details"

    const { id } = useParams()
    const navigate = useNavigate()
    const [order, setOrder] = useState()

    const [loading, setLoading] = useState(true);

    const handleDelete = async () => {
        if (confirm("Are You sure of deleting the order")) {
            await delOrder(id)
            navigate('/admin/orders')
        }
    }

    useEffect(() => {
        setLoading(true)
        const getOrder = async () => {
            const res = await fetch(`${URL}/api/orders/${id}`)
            const data = await res.json()
            setOrder(data[0])
            setTimeout(() => {
                setLoading(false)
            }, 500);
        }
        getOrder()
    }, [id])

    if (loading) {
        return <div className='bg-[#E0F7E9] h-[calc(100vh-60px)] flexCenter'>
            <div className='flex gap-2'>
                <div className="h-6 w-6 rounded-full bg-gray-500 animate-bounce delay-75"></div>
                <div className="h-6 w-6 rounded-full bg-gray-500 animate-bounce delay-100"></div>
                <div className="h-6 w-6 rounded-full bg-gray-500 animate-bounce delay-150"></div>
            </div>
        </div>;
    }

    return (
        <div className='bg-[#E0F7E9]  min-h-[calc(100vh-60px)] p-2 py-8  lg:p-8'>
            <h2 className='flexBetween gap-4'>
                <button className="bg-[#00674F] flex items-center gap-2 p-1.5 px-3 rounded-md text-white"
                    onClick={() => { navigate('/admin/orders') }}>
                    <ArrowBack />
                    Back to Orders
                </button>
                <button onClick={() => { handleDelete() }}
                    className="bg-red-500 flex items-center gap-2 p-1.5 px-3 rounded-md text-white">
                    <Close />
                    Delete Order
                </button>
            </h2>
            <div className="flex flex-col items-start lg:flex-row w-full gap-5 mt-10">
                <div className="flex flex-col gap-4 w-full lg:w-3/5 bg-[#fff] p-6 rounded-md">
                    <h3 className='text-xl mb-4 font-medium'>Order Details</h3>
                    {order && order.cart.map((item, index) => (<OrderProduct key={index} product={item} />))}
                    <div className="text-lg">Total Price :
                        <span className="font-medium"> {order && order.totalPrice} دج</span> </div>
                </div>
                <div className="w-full lg:w-2/5  h-full bg-[#fff] p-6 rounded-md">
                    <h3 className='text-xl mb-4 font-medium'>Billing Info</h3>
                    <div className='flexCenter flex-col'>

                        <div className='flexBetween w-full border-b-[1px] py-2'>
                            Full Name : <span className='font-medium'>{order && order.billingInfo.fullName}</span>
                        </div>
                        <div className='flexBetween w-full border-b-[1px] py-2'>
                            Phone Number : <span className='font-medium'>{order && order.billingInfo.phone}</span>
                        </div>
                        <div className='flexBetween w-full border-b-[1px] py-2'>
                            State : <span className='font-medium'>{order && order.billingInfo.state}</span>
                        </div>
                        <div className='flexBetween w-full border-b-[1px] py-2'>
                            Commune : <span className='font-medium'>{order && order.billingInfo.mnplct}</span>
                        </div>
                        <div className='flexBetween w-full border-b-[1px] py-2'>
                            Street : <span className='font-medium'>{order && order.billingInfo.street}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderDetails