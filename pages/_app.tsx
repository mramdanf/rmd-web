import Layout from '@/components/layout/layout';
import { CartProvider } from '@/store/cartContext';
import { ProductProvider } from '@/store/productContext';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CartProvider>
      <ProductProvider products={pageProps.products}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ProductProvider>
    </CartProvider>
  );
}
