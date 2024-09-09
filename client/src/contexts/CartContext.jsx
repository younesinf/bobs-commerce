import React, { createContext, useReducer, useContext } from 'react';
import { getCookie } from '../controllers/cartController';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItemIndex = state.findIndex(
        item => item.id === action.payload.id && item.size === action.payload.size && item.color === action.payload.color 
      );
      if (existingItemIndex > -1) {
        const updatedCart = [...state];
        updatedCart[existingItemIndex].quantity += action.payload.quantity;
        return updatedCart;
      }
      return [...state, action.payload];
    case 'REMOVE_FROM_CART':
      return state.filter(item => item.id !== action.payload.id || item.size !== action.payload.size || item.color !== action.payload.color);
    case 'UPDATE_QUANTITY':
      return state.map(item =>
        item.id === action.payload.id && item.size === action.payload.size && item.color === action.payload.color
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
    case 'CLEAR_CART':
      return [];
    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, getCookie());

  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
