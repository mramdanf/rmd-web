import { Product } from "@/types/product"

import classes from './product-list.module.css'
import ProductListItem from "./product-list-item"

type ProductListProps = {
  products: Array<Product>
}

function ProductList(props: ProductListProps) {
  const { products } = props
  return (
    <div className={classes.productList}>
      {products.map(product => (
        <ProductListItem key={product.id} {...product} />
      ))}
    </div>
  )
}

export default ProductList