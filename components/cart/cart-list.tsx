import { useCart } from '@/store/cartContext';
import Link from 'next/link';
import XMarkIcon from '../icons/x-mart-icon';
import SeeAllProductBtn from '../product/see-all-product-btn';
import Image from 'next/image';

function CartList() {
  const { cartList, updateCart } = useCart();
  return (
    <div className="min-h-90 max-w-2xl w-full py-1 mx-auto my-4">
      <table className="mx-auto mb-4">
        <thead>
          <tr className="uppercase text-xs sm:text-sm text-palette-primary border-b bolder-pallete-light text-center">
            <td className="font-primary font-normal px-6 py-4">Product</td>
            <td className="font-primary font-normal px-6 py-4">Qty</td>
            <td className="font-primary font-normal px-6 py-4">Price</td>
            <td className="font-primary font-normal px-6 py-4">Remove</td>
          </tr>
        </thead>
        <tbody className="divide-y divide-palette-lighter">
          {Object.values(cartList).map(({ product, qty, subtotal }) => (
            <tr key={product.id} className="text-sm sm:text-base text-gray-600">
              <td className="font-primary font-medium px-4 py-4 flex items-center">
                <Image
                  src={product.thumbnail}
                  alt={product.title}
                  width={64}
                  height={64}
                  className="mr-2"
                />
                <Link className="pt-1" href={`/products/${product.id}`}>
                  {product.title}
                </Link>
              </td>
              <td className="font-primary font-medium px-4 py-4 sm:px-6 text-center">
                <input
                  type="number"
                  min="1"
                  step="1"
                  className="text-gray-900 form-input border border-gray-300 w-16 rounded-sm pl-1"
                  value={qty}
                  onChange={(val) => updateCart({ product, qty: Number(val.target.value) })}
                />
              </td>
              <td className="font-primary text-base font-light px-4 sm:px-6 py-4 hidden sm:table-cell text-center">
                {subtotal || 0}
              </td>
              <td className="font-primary font-medium px-4 sm:px-6 py-4 text-center">
                <button onClick={() => updateCart({ product, qty: 0 })}>
                  <XMarkIcon className="w-8 h-8 text-palette-primary border border-palette-primary p-1 hover:bg-palette-lighter" />
                </button>
              </td>
            </tr>
          ))}
          <tr className="text-center">
            <td></td>
            <td className="font-primary px-6 py-4 font-semibold uppercase text-base">Total</td>
            <td className="font-primary text-palette-primary text-lg font-medium">
              {Object.values(cartList).reduce((acc, val) => acc + (val.subtotal || 0), 0)}
            </td>
          </tr>
        </tbody>
      </table>
      <div className="text-center">
        <SeeAllProductBtn />
      </div>
    </div>
  );
}

export default CartList;
