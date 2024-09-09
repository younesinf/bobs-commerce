import { useNavigate, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import { useCart } from '../contexts/CartContext';
import { getProduct } from "../controllers/adminControllers";
import { saveCart } from "../controllers/cartController"
import SuggestionsBar from "../components/SuggestionsBar";

const Product = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const { cart, dispatch } = useCart();

    const [product, setProduct] = useState()
    const [main, setMain] = useState('')
    const [size, setSize] = useState('');
    const [color, setColor] = useState('');
    const [qnt, setQnt] = useState(1)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)
        const handleProduct = async () => {
            const data = await getProduct(id)
            setProduct(data)
            setMain(data.imgs[0])
            setSize(data.sizes[0])
            setColor(data.colors[0])
            document.title = data.pName
            setTimeout(() => {
                setLoading(false)
            }, 500)
        }
        handleProduct()

    }, [id])


    const addToCart = () => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: { ...product, size, color, quantity: qnt, id: product._id }
        });
    };

    useEffect(() => {
        saveCart(cart)
    }, [addToCart])

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
        <section className="p-4 lg:px-20">
            <div className=' flex flex-col md:flex-row gap-4 lg:gap-0'>
                <div className="flex-1 lg:p-8 ">
                    <div className="flexCenter bg-[#E0F7E9] overflow-hidden aspect-square rounded-xl">
                    <img src={main} alt={main} className=" rounded-xl w-full" />
                    </div>
                    <div className="grid grid-cols-4 md:grid-cols-5 gap-2 mt-4">
                        {product && product.imgs.map((i) =>
                        (<img src={i} alt={i} key={i}
                            className="h-20 w-20 bg-[#E0F7E9] p-1 hover:bg-[#e9e1eb] cursor-pointer rounded-md" onClick={() => { setMain(i) }} />))}
                    </div>
                </div>
                <div className="flex-1 lg:p-8 text-center lg:text-left">
                    <h2 className="text-4xl text-center md:text-left lg:text-5xl  font-medium mb-2">{product && product.pName}</h2>
                    <div className="h-[0.5px] w-full bg-slate-400 rounded-full my-4"></div>
                    <p className="font-light text-center lg:text-right">
                        {product && product.sDesc}
                    </p>
                    <div className="flexCenter flex-col-reverse lg:flex-row mt-6 lg:justify-start lg:items-end gap-2 lg:gap-4">
                        <div className="text-4xl font-light ">{product && product.newPrice}دج</div>
                        <div className="text-2xl font-light line-through text-gray-600">{product.oldPrice && `دج${product.oldPrice}` }</div>
                    </div>
                    <div className="flexBetween text-lg">
                        <div className="flexCenter gap-2 my-6">
                            اللون:
                            <select className="py-1 px-4 rounded-md" onChange={(e) => {
                                setColor(e.target.value)
                            }}>
                                {product && product.colors.map((c) => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flexCenter gap-2 my-5">
                            الحجم :
                            <select className="py-1 px-4 rounded-md" onChange={(e) => {
                                setSize(e.target.value)
                            }}>
                                {product && product.sizes.map((s) => (
                                    <option key={s} value={s}>{s}</option>
                                ))}
                            </select>
                        </div>
                    </div>


                    <div className="flexCenter flex-col md:flex-row md:flexBetween  gap-4 mt-4">
                        <div className="flexBetween">
                            <div className="text-2xl font-bold flex gap-2">
                                <button onClick={() => { (qnt - 1 > 0) && setQnt((qnt) => qnt - 1) }}>-</button>
                                <span className="text-3xl font-light border-[1.5px] 
                        border-[#00674F] w-11 flexCenter rounded-md">{qnt}</span>
                                <button onClick={() => { setQnt((qnt) => qnt + 1) }}>+</button>
                            </div>
                        </div>
                        <div className="flex gap-2 flex-col-reverse md:flex-row w-full md:w-auto">
                            <div>
                                <button className="w-full text-center p-2 px-4 rounded-full border-[1px] 
                                 border-[#00674F] active:scale-95"
                                    onClick={addToCart}>
                                    اضافة الى السلة
                                </button>
                            </div>
                            <div>
                                <button onClick={() => {
                                    addToCart()
                                    navigate('/checkout')
                                }}
                                    className="w-full text-center md:w-auto p-2 px-4 rounded-full font-semibold text-white bg-[#00674F]">
                                    شراء الان
                                </button>
                                </div>
                        </div>
                    </div>
                </div>
            </div>
            <SuggestionsBar />
        </section>
    )
}

export default Product