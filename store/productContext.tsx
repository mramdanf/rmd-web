import { Product } from "@/types/product"
import { ReactElement, createContext, useContext, useMemo, useState } from "react"

export async function getServerSideProps() {
  const resp = await fetch('https://dummyjson.com/products')
  const data = await resp.json()

  return {
    props: {
      products: data.products
    }
  }
}

const useProductController = (productsData: Product[]) => {
  const [products, setProducts] = useState<Product[]>(productsData)
  const [filterText, setFilterText] = useState<string>("")

  const filteredProduct = useMemo(() => {
    if (!filterText) {
      return products
    }

    return products.filter(p => p.title.toLowerCase().includes(filterText))
  }, [products, filterText])

  return {
    products: filteredProduct,
    setProducts,
    setFilterText,
  }
}

const ProductContext = createContext<ReturnType<typeof useProductController>>({
  products: [],
  setProducts: () => {},
  setFilterText: () => {},
})

export const ProductProvider = ({ 
  products, 
  children }: 
  { products: Product[], children: ReactElement }) => (
  <ProductContext.Provider value={useProductController(products)}>
    {children}
  </ProductContext.Provider>
)

export const useProduct = () => useContext(ProductContext)