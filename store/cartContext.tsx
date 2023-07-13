import { Cart, CartList } from "@/types/cart"
import { ReactElement, createContext, useCallback, useContext, useState } from "react"

const useCartController = () => {
  const [cartList, setCart] = useState<CartList>({})
  const addToCart = useCallback((cartItem: Cart) => {
    let newCartList;
    const productId = cartItem.product.id
    const productInCart = cartList[productId]
    if (productInCart) {
      newCartList = {
        ...cartList,
        [productId]: {
          ...productInCart,
          qty: productInCart.qty + cartItem.qty,
        }
      }
      setCart(newCartList)
      return;
    }

    setCart({
      ...cartList,
      [productId]: {
        ...cartItem
      }
    })
  }, [cartList])
  return {
    cartList,
    addToCart,
  }
}

const CartContext = createContext<ReturnType<typeof useCartController>>({
  cartList: {},
  addToCart: () => {},
})

export const CartProvider = ({ children }: { children: ReactElement }) => (
  <CartContext.Provider value={useCartController()}>
    {children}
  </CartContext.Provider>
)

export const useCart = () => useContext(CartContext)