import type React from 'react';
import { CartContext, type CartItem } from '../../context/cartContext';
import { useEffect, useRef, useState } from 'react';

interface Props {
  children: React.ReactNode;
}
const loacalStorageName = 'cart';
function CartContextProvider({ children }: Props) {
  const isFirstMount = useRef(true);
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const storageItem = localStorage.getItem(loacalStorageName);
    return !storageItem ? [] : JSON.parse(storageItem);
  });

  useEffect(() => {
    if (isFirstMount.current) {
      isFirstMount.current = false;
      return;
    }
    localStorage.setItem(loacalStorageName, JSON.stringify(cartItems));
  }, [cartItems]);
  const addItem = (item: Omit<CartItem, 'quantity'>, quantity: number = 1) => {
    const newItem = { ...item, quantity };
    setCartItems(prev => [...prev, newItem]);
  };
  const addQuantityOfItem = (id: number) => {
    setCartItems(prev => [
      ...prev.map(item => {
        const newItem = { ...item };

        if (id === item.id) {
          newItem.quantity = item.quantity + 1;
        }
        return newItem;
      }),
    ]);
  };
  const minusQuantityOfItem = (id: number) => {
    setCartItems(prev => [
      ...prev.map(item => {
        const newItem = { ...item };
        if (id === item.id) {
          newItem.quantity = item.quantity === 0 ? 0 : item.quantity - 1;
        }
        return newItem;
      }),
    ]);
  };

  const rmItem = (id: number) => {
    setCartItems(prev => prev.filter(item => id !== item.id));
  };

  const clearCart = () => {
    setCartItems([]);
  };
  return (
    <CartContext
      value={{
        items: cartItems,
        addItem,
        rmItem,
        addQuantityOfItem,
        minusQuantityOfItem,
        clearCart,
      }}
    >
      {children}
    </CartContext>
  );
}

export default CartContextProvider;
