import { useCart } from "@/store/cartContext"
import Link from "next/link"
import { useMemo } from "react"

import CartIcon from "../icons/cart-icon"

function Cart() {
  const { cartList } = useCart()
  const sumCartQty = useMemo(() => {
    let sum = 0
    for (const key in cartList) {
      sum += cartList[key].qty
    }
    return sum
  }, [cartList])
  return (
    <Link href="/cart">
      <CartIcon />
      {sumCartQty > 0 && <span className="absolute top-2 right-1 bg-yellow-300 rounded-full text-xs py-1 px-2">{sumCartQty}</span>}
    </Link>
  )
}

export default Cart