import { useCart } from "@/store/cartContext"
import { useMemo } from "react"

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
    <>
      <p>Cart: {sumCartQty}</p>
    </>
  )
}

export default Cart