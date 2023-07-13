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

  const removeFromCart = useCallback((productId: number) => {
    const { [productId]: _, ...newCartList } = cartList
    setCart(newCartList)
  }, [cartList])

  return {
    cartList,
    addToCart,
    removeFromCart,
  }
}

const CartContext = createContext<ReturnType<typeof useCartController>>({
  cartList: {},
  addToCart: () => {},
  removeFromCart: () => {}
})

export const CartProvider = ({ children }: { children: ReactElement }) => (
  <CartContext.Provider value={useCartController()}>
    {children}
  </CartContext.Provider>
)

export const useCart = () => useContext(CartContext)