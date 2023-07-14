import Link from 'next/link';
import Cart from '../cart/cart';
function Nav() {
  return (
    <header className="border-b">
      <div className="flex items-center justify-between mx-auto max-w-6xl px-6 pt-4 pb-2 md:pt-6 relative">
        <div>
          <Link href="/">Ramdan Shop</Link>
        </div>
        <div>
          <Cart />
        </div>
      </div>
    </header>
  );
}

export default Nav;
