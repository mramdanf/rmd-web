import ProductList from '@/components/product/product-list'
import { Product } from '@/types/product'
import fs from 'fs/promises'
import path from 'path'

type HomePageProps = {
  products: Array<Product>
}

export default function Home(props: HomePageProps) {
  const { products } = props

  if (!products) {
    return <p>Loading ...</p>
  }
  return (
    <ProductList products={products} />
  )
}

export async function getStaticProps() {
  const resp = await fetch('https://dummyjson.com/products')
  const data = await resp.json()

  return {
    props: {
      products: data.products
    }
  }
}
