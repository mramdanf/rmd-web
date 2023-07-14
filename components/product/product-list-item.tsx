import { Product } from '@/types/product';
import Image from 'next/image';
import Link from 'next/link';

import classes from './product-list-item.module.css';
import Price from './price';

function ProductListItem(props: Product) {
  const { title, price, id, thumbnail, description } = props;
  return (
    <Link
      href={`/products/${id}`}
      className="h-120 w-72 rounded shadow-lg mx-auto border border-palette-lighter">
      <div className="w-full">
        <Image src={thumbnail} alt={title} fill className={classes.image} />
      </div>
      <div className="h-48 relative">
        <p className="text-xl pt-4 px-4 font-semibold">{title}</p>
        <p className="text-sm p-4 text-grey-600 font-light">{description}</p>
        <Price val={price} currency="$" />
      </div>
    </Link>
  );
}

export default ProductListItem;
