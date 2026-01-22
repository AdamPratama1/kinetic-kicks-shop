import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { CartItem, Product, ProductColor } from '@/types';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, color: ProductColor, size: number) => void;
  removeItem: (productId: string, colorName: string, size: number) => void;
  updateQuantity: (productId: string, colorName: string, size: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      
      addItem: (product, color, size) => {
        set((state) => {
          const existingItem = state.items.find(
            (item) =>
              item.product.id === product.id &&
              item.selectedColor.name === color.name &&
              item.selectedSize === size
          );

          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product.id === product.id &&
                item.selectedColor.name === color.name &&
                item.selectedSize === size
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          }

          return {
            items: [...state.items, { product, selectedColor: color, selectedSize: size, quantity: 1 }],
          };
        });
      },

      removeItem: (productId, colorName, size) => {
        set((state) => ({
          items: state.items.filter(
            (item) =>
              !(item.product.id === productId &&
                item.selectedColor.name === colorName &&
                item.selectedSize === size)
          ),
        }));
      },

      updateQuantity: (productId, colorName, size, quantity) => {
        if (quantity <= 0) {
          get().removeItem(productId, colorName, size);
          return;
        }
        
        set((state) => ({
          items: state.items.map((item) =>
            item.product.id === productId &&
            item.selectedColor.name === colorName &&
            item.selectedSize === size
              ? { ...item, quantity }
              : item
          ),
        }));
      },

      clearCart: () => set({ items: [] }),

      getTotalItems: () => {
        return get().items.reduce((total, item) => total + item.quantity, 0);
      },

      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + item.product.price * item.quantity,
          0
        );
      },
    }),
    {
      name: 'cart-storage',
    }
  )
);
