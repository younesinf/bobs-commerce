import { useEffect, useState } from 'react';
import { useCart } from '../contexts/CartContext';
import { Link } from "react-router-dom"
import { getCookie, saveCart } from '../controllers/cartController';


const ProductCard = ({ props }) => {
    const [size, setSize] = useState(props.sizes[0]);
    const [color, setColor] = useState(props.colors[0]);
    const [quantity, setQuantity] = useState(1)
    const { cart, dispatch } = useCart();

    const addToCart = () => {
        dispatch({
            type: 'ADD_TO_CART',
            payload: { ...props, size, color, quantity, id: props._id }
        });
    };
    useEffect(() => {
        saveCart(cart)
    }, [addToCart])

    return (
        <div className="rounded-xl cursor-pointer">
            <Link to={`/item/${props._id}`}>
                <div className="bg-[#E0F7E9] rounded-t-xl hover:bg-[#c5eed5] overflow-hidden aspect-square ">
                    <img src={props.imgs[0]} alt="product" className='w-full rounded-xl' />
                </div>
                <div className="w-full flexBetween flex-col md:flex-row text-lg font-medium mt-2">
                    <h2>{props.pName}</h2>
                    <span className="font-semibold">{props.newPrice}دج</span>
                </div>
            </Link>
            <div className="mt-4 ">
                <button className="p-1 px-4 w-full text-center md:text-right md:w-auto rounded-full border-[1px] 
                 border-[#00674F] active:scale-95" onClick={() => {
                        addToCart(props._id);
                    }}>
                    اضف الى السلة
                </button>
            </div>
        </div>
    )
}

export default ProductCard