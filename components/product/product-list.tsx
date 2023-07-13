import { Product } from "@/types/product"
import ProductDetail from "./product-detail"

import classes from './product-list.module.css'

type ProductListProps = {
  products: Array<Product>
}

function ProductList(props: ProductListProps) {
  const { products } = props
  return (
    <div className={classes.productList}>
      {products.map(product => (
        <ProductDetail {...product} />
      ))}
    </div>
  )
}

export default ProductList