// export const ThemeContext = createContext<ThemeContextType>(defaultThemeContext);

import { createContext, use } from 'react';

// export const useTheme = () => use(ThemeContext);
export interface CartItem {
  id: number;
  quantity: number;
  title: string;
  subtitle: string;
  image_medium: string;
  price: number;
}

interface DefoultCartContextValue {
  items: CartItem[];
  addItem: (item: Omit<CartItem, 'quantity'>, quantity?: number) => void;
  rmItem: (id: number) => void;
  addQuantityOfItem: (id: number) => void;
  minusQuantityOfItem: (id: number) => void;
  clearCart: () => void;
}

export const CartContext = createContext<DefoultCartContextValue>({
  items: [],
  addItem: () => {},
  rmItem: () => {},
  addQuantityOfItem: () => {},
  minusQuantityOfItem: () => {},
  clearCart: () => {},
});

export const useCart = () => use(CartContext);
