import { Cart, CartList } from "@/types/cart"
import { ReactElement, createContext, useContext, useState } from "react"

const useCartController = () => {
  const [cart, addToCart] = useState<CartList>({})
  return {
    cart,
    addToCart,
  }
}

const CartContext = createContext<ReturnType<typeof useCartController>>({
  cart: {},
  addToCart: () => {},
})

export const CartProvider = ({ children }: { children: ReactElement }) => (
  <CartContext.Provider value={useCartController()}>
    {children}
  </CartContext.Provider>
)

export const useCart = () => useContext(CartContext)