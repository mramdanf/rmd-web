import { Product } from "@/types/product";
import Link from "next/link";

function ProductListItem(props: Product) {
  const { title, price, id, thumbnail, description } = props
  return (
    <Link 
      href={`/products/${id}`}
      className="h-120 w-72 rounded shadow-lg mx-auto border border-palette-lighter">
      <div className="border-b-2 border-pallete-lighter">
        <img src={thumbnail} alt={title} className="w-72 h-72 object-none"/>
      </div>
      <div className="h-48 relative">
        <p className="text-xl pt-4 px-4 font-semibold">
          {title}
        </p>
        <p className="text-sm p-4 text-grey-600 font-light">
          {description}
        </p>
        <p className="text-palette-dark font-primary font-medium text-base absolute bottom-0 right-0 mb-4 pl-8 pr-4 pb-1 pt-2 bg-palette-lighter 
            rounded-tl-sm triangle">
          {price}
        </p>
      </div>
    </Link>
  )
}

export default ProductListItem