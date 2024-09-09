import { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';
import { newOrder } from '../controllers/adminControllers';


const Checkout = () => {
    document.title = "الدفع"
    
    const { cart, dispatch } = useCart();
    const [wilayas, setWilayas] = useState([]);
    const [communes, setCommunes] = useState([]);
    const [filteredCommunes, setFilteredCommunes] = useState([]);

    const [total, setTotal] = useState();
    const [fullName, setFullName] = useState();
    const [phone, setPhone] = useState();
    const [street, setStreet] = useState();
    const [mnplct, setMnplct] = useState();
    const [state, setState] = useState();

    const navigate = useNavigate()

    useEffect(() => {
        setTotal(cart.reduce((sum, product) =>
            (sum + (product.newPrice * product.quantity)), 0))
    }, [cart]);

    useEffect(() => {
        setTimeout(async () => {
            const res = await fetch('/communes.json')
            const data = await res.json()
            const wilayas = data
                .filter(commune => commune.code_postal.toString().endsWith('01'))
                .map(wilaya => ({
                    wilaya_id: wilaya.wilaya_id,
                    nom: wilaya.nom
                }));
            setWilayas(wilayas);
            setCommunes(data);
        }, 10);
    }, [])

    const handleWilayaChange = (event) => {
        const wilayaId = event.target.value;
        const filtered = communes.filter(commune => commune.wilaya_id === wilayaId);
        setFilteredCommunes(filtered);
    };

    const submitOrder = async (e) => {
        e.preventDefault()
        setState(prev => parseInt(prev))
        const res = await newOrder({ totalPrice: total + 500, cart, billingInfo: { fullName, phone, street, state, mnplct } })
        navigate('/success')
        dispatch({
            type: 'CLEAR_CART',
        });
    }

    return (
        <>
            {cart.length > 0 ? <section className='py-4 lg:py-8 px-2 lg:px-28 flexCenter flex-col'>
                <h2 className="my-6 mb-8 lg:mb-16 text-4xl font-medium font-['cairo']">الدفع</h2>
                <div className='flex flex-col-reverse lg:flex-row gap-4 w-full'>
                    <div className='w-full lg:w-3/5 border-[1px] p-3 lg:p-8 py-10 rounded-lg'>
                        <h3 className='text-xl mb-6 font-medium '>معلومات التوصيل</h3>
                        <div className='flex flex-col text-lg  w-full'>
                            <form onSubmit={submitOrder}
                                className='flex flex-col text-lg gap-4 w-full'>
                                <div className='flex flex-col w-full gap-1'>
                                    <label>الاسم الكامل</label>
                                    <input type="text" required placeholder='اسمك الكامل'
                                        value={fullName} onChange={(e) => { setFullName(e.target.value) }}
                                        className='input ' />
                                </div>
                                <div className='flex flex-col w-full gap-1'>
                                    <label>رقم الهاتف</label>
                                    <input type="text" required placeholder='0555555555'
                                        value={phone} onChange={(e) => { setPhone(e.target.value) }}
                                        className='input' />
                                </div>
                                <div className='flex flex-col w-full gap-1'>
                                    <label>العنوان</label>
                                    <input type="text" required placeholder='عنوانك'
                                        value={street} onChange={(e) => { setStreet(e.target.value) }}
                                        className='input' />
                                </div>
                                <div className='flex flex-col lg:flex-row gap-4'>
                                    <div className='flex flex-col w-full gap-1'>
                                        <label>الولاية</label>
                                        <select required className='p-2 bg-white shadow-sm border-[1.5px] rounded-md'
                                            value={state} onChange={(e) => {
                                                handleWilayaChange(e)
                                                setState(e.target.value)
                                            }}>
                                            <option value="">اسم ولايتك</option>
                                            {wilayas.map(wilaya => (
                                                <option key={wilaya.wilaya_id} value={wilaya.wilaya_id}>
                                                    {wilaya.nom}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <div className='flex flex-col w-full gap-1'>
                                        <label>البلدية</label>
                                        <select required
                                            value={mnplct} onChange={(e) => { setMnplct(e.target.value) }}
                                            className='p-2 bg-white shadow-sm border-[1.5px] rounded-md'>
                                            <option value="">اسم بلديتك</option>
                                            {filteredCommunes.map(commune => (
                                                <option key={commune.id} value={commune.nom}>
                                                    {commune.nom}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>

                                <div className='mt-6 flex justify-end items-end font-["cairo"] '>
                                    <button type='submit'
                                        className='bg-[#00674F] w-full text-center lg:w-auto text-white text-base p-2 px-4 rounded-lg'>
                                        تأكيد الطلب
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                    <div className='w-full lg:w-2/5 border-[1px] p-3 lg:p-8 py-10 rounded-lg bg-[#fefefe]'>
                        <h3 className='text-xl mb-6 font-medium'>تفاصيل الطلب</h3>
                        <div className='flexCenter flex-col'>
                            {cart && cart.map((product) => (
                                <div className='flexBetween h-24 w-full border-b-[1.5px] py-4'>
                                    <div className='h-full flexCenter gap-6'>
                                        <img className='h-full' src={product.imgs[0]} alt="product" />
                                        <div className='flex flex-col '>
                                            <p className='font-medium text-left'>{product && product.pName}</p>
                                            <p className='text-sm'> <span className="font-medium">  {product && product.quantity}</span> : الكمية</p>
                                            <div className='text-sm flex gap-2'>
                                                <p> <span className="font-medium">{product.size}</span> : الحجم</p>
                                                <p> <span className="font-medium">{product.color}</span> : اللون</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='font-medium'>
                                        <p>{product && product.quantity * product.newPrice}.00دج</p>
                                    </div>
                                </div>
                            ))}
                            <div className='flexCenter flex-col border-b-[1px] gap-2 py-6 w-full'>
                                <div className='flexBetween  w-full'>
                                    <span className='font-medium'>{total}.00دج</span> : المجموع الفرعي 
                                </div>
                                <div className='flexBetween  w-full'>
                                     <span className='font-medium'>{500}دج</span> : التوصيل
                                </div>
                            </div>
                            <div className='flexBetween w-full border-b-[1px] py-6'>
                                <span className='font-medium'>{total + 500}.00دج</span>: المجموع
                            </div>
                        </div>
                    </div>
                </div>
            </section> : <div className='py-16 flexCenter'>
                <button className='p-4 px-6 bg-[#00674F] text-lg text-white rounded' onClick={() => navigate('/')}>
                    العودة الى الرئيسية
                </button>
            </div>}
        </>
    )
}

export default Checkout