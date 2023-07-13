import { useCart } from "@/store/cartContext"

function CartList() {
  const { cartList } = useCart()
  return (
    <table>
      <thead>
        <tr>
          <td>Product</td>
          <td>Qtr</td>
          <td>Price</td>
          <td>Remove</td>
        </tr>
      </thead>
      <tbody>
        {Object.values(cartList).map(({ product, qty }) => (
          <tr key={product.id}>
            <td>{product.name}</td>
            <td>{qty}</td>
            <td>{product.price}</td>
            <td></td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default CartList