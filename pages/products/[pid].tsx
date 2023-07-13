import ProductListItem from '@/components/product/product-list-item'
import { useCart } from '@/store/cartContext'
import { Cart } from '@/types/cart'
import { Product } from '@/types/product'
import fs from 'fs/promises'
import { GetStaticPropsContext } from 'next'
import path from 'path'
import { useRef } from 'react'

async function getProductsFromBackEnd(): Promise<Product[]> {
  const filePath = path.join(process.cwd(), 'dummy-products.json')
  const jsonData = await fs.readFile(filePath)
  const data = JSON.parse(jsonData.toString())

  return data.products as Array<Product>
}

export async function getStaticProps(context: GetStaticPropsContext<{ pid: string }>) {
  const products = await getProductsFromBackEnd()
  const productId = context.params?.pid
  return {
    props: {
      product: products.find(product => product.id === productId) || {} as Product
    }
  }
}

export async function getStaticPaths() {
  const products = await getProductsFromBackEnd()
  return {
    paths: products.map(product => ({ params: { pid: product.id  } })),
    fallback: false,
  }
}

type ProductDetailPageProps = {
  product: Product
}

function ProductDetailPage(props: ProductDetailPageProps) {
  const { product } = props
  const qtyRef = useRef<HTMLInputElement>(null)
  const { cart, addToCart } = useCart()

  function handleAddToCart() {
    const qty = qtyRef?.current?.value || 0
    if (qty === 0) {
      return;
    }

    const cartItem: Cart = {
      ...product,
      qty: Number(qty),
    }

    addToCart({
      ...cart,
      [product.id]: {
        ...cartItem,
      }
    })
  }

  return (
    <>
      <p>{product.name}</p>
      <p>{product.price}</p>
      <input type="number" ref={qtyRef} />
      <button onClick={handleAddToCart}>Add to cart</button>
    </>
  )
}

export default ProductDetailPage