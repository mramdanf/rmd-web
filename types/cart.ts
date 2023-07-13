import { Product } from "./product"

export type Cart = {
  qty: number
  subtotal?: number
  product: Product
}

export type CartList = {
  [key: string]: Cart
}