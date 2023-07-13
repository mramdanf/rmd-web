import { Product } from "./product"

export interface Cart extends Product {
  qty: number
}

export type CartList = {
  [key: string]: Cart
}