import Layout from '@/components/layout/layout'
import { CartProvider } from '@/store/cartContext'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <CartProvider>
        <Component {...pageProps} />
      </CartProvider>
    </Layout>
  )
}
