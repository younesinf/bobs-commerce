import { useEffect, useState } from "react";
import CartProduct from "../components/CartProduct";
import { useCart } from '../contexts/CartContext';
import { useNavigate } from "react-router-dom";
import SuggestionsBar from '../components/SuggestionsBar'

const Cart = () => {
    document.title = "السلة";
    const { cart } = useCart();
    const [total, setTotal] = useState();
    const navigate = useNavigate()

    useEffect(() => {
        setTotal(cart.reduce((sum, product) =>
            (sum + (product.newPrice * product.quantity)), 0))
    }, [cart]);

    return (
        <section className="py-3 lg:py-8 px-2 lg:px-28 flexCenter flex-col w-full">
            <h2 className="my-6 text-4xl font-medium ">السلة</h2>
            {cart.length > 0 ?
                <div className="flex flex-col lg:flex-row w-full gap-5">
                    <div className="flex flex-col gap-4 w-full lg:w-3/5 border-t-[1px] ">
                        {cart.map((product) => (
                            <CartProduct key={product._id} product={product} />
                        ))
                        }
                    </div>
                    <div className="w-full lg:w-2/5  h-full bg-[#f5f5f5] p-3 lg:p-6">
                        <h3 className='text-xl mb-3 lg:mb-6 font-medium'>تفاصيل الطلب</h3>
                        <div className='flexCenter flex-col'>
                            <div className='flexCenter flex-col border-b-[1px] gap-2 py-6 w-full'>
                                <div className='flexBetween flex-row-reverse w-full'>
                                    : المجموع الفرعي <span className='font-medium'>{total}.00دج</span>
                                </div>
                                <div className='flexBetween flex-row-reverse w-full'>
                                   : التوصيل<span className='font-medium'>{500}دج</span>
                                </div>
                            </div>
                            <div className='flexBetween flex-row-reverse w-full border-b-[1px] py-6'>
                                : المجموع <span className='font-medium'>{total + 500}.00دج</span>
                            </div>
                        </div>
                        <button
                            onClick={() => navigate('/checkout')}
                            className='bg-[#00674F] text-center text-white text-base p-2 w-full mt-4 rounded-md'>
                            أطلب الان
                        </button>
                    </div>

                </div> : <span className="mx-auto mb-16 text-xl font-light">لا يوجد اي منتوج في السلة</span>
            }
        <SuggestionsBar/>
        </section >
    );
}

export default Cart;
