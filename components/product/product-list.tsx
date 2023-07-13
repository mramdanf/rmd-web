import { Product } from "@/types/product"
import ProductDetail from "./product-detail"

type ProductListProps = {
  products: Array<Product>
}

function ProductList(props: ProductListProps) {
  const { products } = props
  return (
    products.map(product => (
      <ProductDetail {...product} />
    ))
  )
}

export default ProductList