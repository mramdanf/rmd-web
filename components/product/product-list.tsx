import { useProduct } from "@/store/productContext"
import ProductListItem from "./product-list-item"

function ProductList() {
  const { products } = useProduct()
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 pt-5">
      {products.map(product => (
        <ProductListItem key={product.id} {...product} />
      ))}
    </div>
  )
}

export default ProductList