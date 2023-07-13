import { useCart } from "@/store/cartContext"
import { useRouter } from "next/router"
import { useMemo } from "react"

import classes from './cart.module.css'

function Cart() {
  const router = useRouter()
  const { cartList } = useCart()
  const sumCartQty = useMemo(() => {
    let sum = 0
    for (const key in cartList) {
      sum += cartList[key].qty
    }
    return sum
  }, [cartList])
  return (
    <>
      <p className={classes.cartCount} onClick={() => router.push('/cart')}>Cart: {sumCartQty}</p>
    </>
  )
}

export default Cart