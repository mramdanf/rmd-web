import { Product } from "@/types/product";

function ProductDetail(props: Product) {
  const { name, price } = props
  return (
    <div>
      <img />
      <p>{name}</p>
      <p>{price}</p>
    </div>
  )
}

export default ProductDetail