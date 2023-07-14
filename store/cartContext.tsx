import { Cart, CartList } from "@/types/cart"
import { ReactElement, createContext, useCallback, useContext, useEffect, useState } from "react"

const CART_KEY = 'CART'

const cartItemWithSubtotal = (cart: Cart): Cart => ({
  ...cart,
  subtotal: cart.qty * cart.product.price
})

const useCartController = () => {
  const [cartList, setCart] = useState<CartList>({})

  useEffect(() => {
    const cartFromStorage = window.localStorage.getItem(CART_KEY)
    
    if (!cartFromStorage) {
      return;
    }

    try {
      const cartData = JSON.parse(cartFromStorage)
      setCart(cartData)
    } catch (error) {
      console.error(error)
    }
  }, [])

  const saveCart = useCallback((cartList: CartList) => {
    setCart(cartList)
    window.localStorage.setItem(CART_KEY, JSON.stringify(cartList))
  }, [])
  
  const addToCart = useCallback((cartItem: Cart) => {
    let newCartList;
    const productId = cartItem.product.id
    const productInCart = cartList[productId]
    if (productInCart) {
      newCartList = {
        ...cartList,
        [productId]: {
          ...cartItemWithSubtotal({
            ...productInCart,
            qty: productInCart.qty + cartItem.qty,
          })
        }
      }
      saveCart(newCartList)
      return;
    }

    saveCart({
      ...cartList,
      [productId]: {
        ...cartItemWithSubtotal(cartItem)
      }
    })
  }, [cartList, saveCart])

  const updateCart = useCallback((cartItem: Cart) => {
    const { product } = cartItem
    const { [product.id]: _, ...newCartList } = cartList
    
    // delete
    if (cartItem.qty === 0) {
      saveCart(newCartList)
      return
    }

    // update
    saveCart({
      ...cartList,
      [product.id]: {
        ...cartItemWithSubtotal(cartItem)
      }
    })

  }, [cartList, saveCart])

  return {
    cartList,
    addToCart,
    updateCart,
  }
}

const CartContext = createContext<ReturnType<typeof useCartController>>({
  cartList: {},
  addToCart: () => {},
  updateCart: () => {},
})

export const CartProvider = ({ children }: { children: ReactElement }) => (
  <CartContext.Provider value={useCartController()}>
    {children}
  </CartContext.Provider>
)

export const useCart = () => useContext(CartContext)