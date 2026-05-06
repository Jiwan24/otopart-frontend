import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    setCartItems((prev) => {
      // Cek apakah produk sudah ada di keranjang
      const isExist = prev.find((item) => item.id === product.id);
      if (isExist) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });

    const removeFromCart = (productId) => {
  setCartItems((prev) => {
    const existingItem = prev.find(item => item.id === productId);
    if (existingItem.quantity === 1) {
      return prev.filter(item => item.id !== productId);
    }
    return prev.map(item =>
      item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
    );
  });
};

const clearCart = () => setCartItems([]);
    
    // Opsional: Tambahkan notifikasi sukses
    alert(`${product.name} berhasil ditambah ke keranjang!`);
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);