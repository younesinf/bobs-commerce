import React, { useState, useEffect } from 'react';
import { useCart } from '../contexts/CartContext';
import { Close } from '@mui/icons-material';
import { saveCart } from '../controllers/cartController';

const CartProduct = ({ product }) => {
    const [number, setNumber] = useState(product.quantity);

    const { cart, dispatch } = useCart();

    const removeFromCart = () => {
        dispatch({
            type: 'REMOVE_FROM_CART',
            payload: product
        });
        saveCart([])
    };

    const updateQuantity = (newQuantity) => {
        dispatch({
            type: 'UPDATE_QUANTITY',
            payload: { ...product, quantity: newQuantity }
        });
    };

    useEffect(() => {
        saveCart(cart)
    }, [removeFromCart, updateQuantity])

    return (
        <div className='p-2 py-3 border-b-[1px] w-full flexBetween'>
            <div className='h-full flexCenter gap-4 lg:gap-8'>
                <img src={product.imgs[0]} alt="" className='h-28' />
                <div className='gap-2'>
                    <h3 className='text-lg font-medium w-full'>{product.pName}</h3>
                    <p>{product.newPrice}دج</p>
                </div>
            </div>
            <div className='flexBetween flex-col-reverse md:flex-row gap-2 lg:gap-6'>
                <div className='text-sm'>
                    <p><span className="font-semibold">{product.size} : </span> الحجم </p>
                    <p> <span className="font-semibold">{product.color} :</span> اللون </p>
                </div>
                <div className='flex justify-center flex-row-reverse gap-2 text-2xl'>
                    <button className='font-medium '
                        onClick={() => {
                            const newQuantity = number + 1;
                            setNumber(newQuantity);
                            updateQuantity(newQuantity);
                        }}
                    >+</button>
                    {number}
                    <button className='font-medium'
                        onClick={() => {
                            const newQuantity = number - 1;
                            if (newQuantity <= 0) {
                                removeFromCart();
                            } else {
                                setNumber(newQuantity);
                                updateQuantity(newQuantity);
                            }
                        }}
                    >-</button>
                </div>
                <div>
                    <button className='text-2xl text-red-500 rounded-full p-1 ' onClick={removeFromCart}>
                        <Close />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartProduct;
