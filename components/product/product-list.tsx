import { Product } from "@/types/product"

import ProductListItem from "./product-list-item"

type ProductListProps = {
  products: Array<Product>
}

function ProductList(props: ProductListProps) {
  const { products } = props
  return (
    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 pt-5">
      {products.map(product => (
        <ProductListItem key={product.id} {...product} />
      ))}
    </div>
  )
}

export default ProductList