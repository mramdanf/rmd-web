import ProductList from '@/components/product/product-list'
import SearchProduct from '@/components/product/search-product'
import { Product } from '@/types/product'

export { getServerSideProps } from '../store/productContext'

type HomePageProps = {
  products: Array<Product>
}

export default function Home(props: HomePageProps) {
  const { products } = props

  if (!products) {
    return <p>Loading ...</p>
  }
  return (
    <>
      <SearchProduct />
      <ProductList />
    </>
  )
}
