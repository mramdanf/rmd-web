import Link from 'next/link';

function SeeAllProductBtn() {
  return (
    <Link
      className="pt-3 pb-2 rounded-sm text-lg font-primary font-semibold text-center text-palette-primary border border-palette-primary px-2"
      href="/">
      See all products
    </Link>
  );
}

export default SeeAllProductBtn;
