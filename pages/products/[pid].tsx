import SeeAllProductBtn from '@/components/product/see-all-product-btn';
import { useCart } from '@/store/cartContext';
import { Cart } from '@/types/cart';
import { Product } from '@/types/product';
import { GetStaticPropsContext } from 'next';
import Image from 'next/image';
import { useRef } from 'react';

export async function getServerSideProps(context: GetStaticPropsContext<{ pid: string }>) {
  const productId = context.params?.pid;
  const resp = await fetch(`https://dummyjson.com/products/${productId}`);
  const product = await resp.json();
  return {
    props: {
      product: product
    }
  };
}

type ProductDetailPageProps = {
  product: Product;
};

function ProductDetailPage(props: ProductDetailPageProps) {
  const { product } = props;
  const qtyRef = useRef<HTMLInputElement>(null);
  const { addToCart } = useCart();

  function handleAddToCart() {
    const qty = qtyRef?.current?.value || 0;
    if (qty === 0) {
      return;
    }

    const cartItem: Cart = {
      product: {
        ...product
      },
      qty: Number(qty)
    };

    addToCart(cartItem);
  }

  return (
    <div className="flex flex-col justify-center items-center pt-12">
      <div className="flex lg:space-x-8">
        <div className="w-full">
          <Image
            src={product.thumbnail}
            alt={product.title}
            width={550}
            height={100}
            className="max-h-96 object-cover"
          />
        </div>
        <div className="w-72">
          <p className="text-xl pt-4 px-4 font-semibold">{product.title}</p>
          <p className="text-sm p-4 text-grey-600 font-light">{product.description}</p>
          <p className="text-palette-dark font-primary font-medium text-base mb-4 pl-8 pr-4 pb-1 pt-2">
            {product.price}
          </p>
          <div className="flex pl-4 mb-5">
            <label className="mr-2">Qty:</label>
            <input
              type="number"
              ref={qtyRef}
              className="form-input border border-grey-300 pl-1"
              defaultValue={1}
            />
          </div>
          <div className="flex flex-col pl-4">
            <button
              className="pt-3 pb-2 mb-2 rounded-sm text-lg bg-palette-primary text-white font-primary font-semibold"
              onClick={handleAddToCart}>
              Add to cart
            </button>
            <SeeAllProductBtn />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;
