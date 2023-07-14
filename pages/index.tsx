import ProductList from '@/components/product/product-list'
import SearchProduct from '@/components/product/search-product'
import SortProduct from '@/components/product/sort-product'
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
      <div className='flex justify-between max-w-6xl mx-auto mt-10 px-7'>
        <SearchProduct />
        <SortProduct />
      </div>
      <ProductList />
    </>
  )
}
