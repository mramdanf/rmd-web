import { Product } from "@/types/product";

import classes from './product-list-item.module.css'
import { useRouter } from "next/router";

function ProductListItem(props: Product) {
  const { name, price, id } = props
  const router = useRouter()
  return (
    <div className={classes.product} onClick={() => router.push(`/products/${id}`)}>
      <img />
      <p>{name}</p>
      <p>{price}</p>
    </div>
  )
}

export default ProductListItem