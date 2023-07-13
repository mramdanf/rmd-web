import { Product } from "@/types/product";

import classes from './product-detail.module.css'

function ProductDetail(props: Product) {
  const { name, price } = props
  return (
    <div className={classes.product}>
      <img />
      <p>{name}</p>
      <p>{price}</p>
    </div>
  )
}

export default ProductDetail