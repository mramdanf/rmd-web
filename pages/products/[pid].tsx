import { useCart } from '@/store/cartContext'
import { Cart } from '@/types/cart'
import { Product } from '@/types/product'
import { GetStaticPropsContext } from 'next'
import { useRouter } from 'next/router'
import { useRef } from 'react'

export async function getStaticProps(context: GetStaticPropsContext<{ pid: string }>) {
  const productId = context.params?.pid
  console.log({ productId  })
  const resp = await fetch(`https://dummyjson.com/products/${productId}`)
  const product = await resp.json()
  return {
    props: {
      product: product
    }
  }
}

export async function getStaticPaths() {
  const resp = await fetch('https://dummyjson.com/products')
  const data = await resp.json()
  const products = data.products as Product[]

  return {
    paths: products.map(product => ({ params: { pid: product.id.toString()  } })),
    fallback: false,
  }
}

type ProductDetailPageProps = {
  product: Product
}

function ProductDetailPage(props: ProductDetailPageProps) {
  const { product } = props
  const router = useRouter()
  const qtyRef = useRef<HTMLInputElement>(null)
  const { addToCart } = useCart()

  function handleAddToCart() {
    const qty = qtyRef?.current?.value || 0
    if (qty === 0) {
      return;
    }

    const cartItem: Cart = {
      product: {
        ...product
      },
      qty: Number(qty),
    }

    addToCart(cartItem)
  }

  return (
    <>
      <p>{product.title}</p>
      <p>{product.price}</p>
      <input type="number" ref={qtyRef} />
      <button onClick={handleAddToCart}>Add to cart</button>
      <button onClick={() => router.push(`/`)}>See all products</button>
    </>
  )
}

export default ProductDetailPage