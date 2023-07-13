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
  const filePath = path.join(process.cwd(), 'dummy-products.json')
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData.toString())

  return {
    props: {
      products: data.products
    }
  }
}
