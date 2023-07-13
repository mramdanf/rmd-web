import { useCart } from '@/store/cartContext'
import { Cart } from '@/types/cart'
import { Product } from '@/types/product'
import { GetStaticPropsContext } from 'next'
import Link from 'next/link'
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
    <div className='flex'>
      <img src={product.thumbnail} alt={product.title} className='h-72 w-72 object-cover' />
      <div>
        <p className="text-xl pt-4 px-4 font-semibold">
          {product.title}
        </p>
        <p className="text-sm p-4 text-grey-600 font-light">
          {product.description}
        </p>
        <p className="text-palette-dark font-primary font-medium text-base absolute bottom-0 right-0 mb-4 pl-8 pr-4 pb-1 pt-2 bg-palette-lighter 
            rounded-tl-sm triangle">
          {product.price}
        </p>
        <div className='flex pl-4 mb-5'>
          <label className='mr-2'>Qty:</label>
          <input type="number" ref={qtyRef} className='form-input border border-grey-300 pl-1' defaultValue={1} />
        </div>
        <div className='flex flex-col pl-4'>
          <button 
            className='pt-3 pb-2 mb-2 rounded-sm text-lg bg-palette-primary text-white font-primary font-semibold' 
            onClick={handleAddToCart}>Add to cart</button>
          <Link
            className='pt-3 pb-2 rounded-sm text-lg font-primary font-semibold text-center text-palette-primary border border-palette-primary' 
            href="/">See all products</Link>
        </div>
      </div>
      
    </div>
  )
}

export default ProductDetailPage