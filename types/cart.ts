import { Product } from "./product"

export type Cart = {
  qty: number
  product: Product
}

export type CartList = {
  [key: string]: Cart
}