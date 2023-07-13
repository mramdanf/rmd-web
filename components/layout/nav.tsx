import Link from 'next/link'
import Cart from '../cart/cart'
import classes from './nav.module.css'
function Nav() {
  return (
    <header className={classes.header}>
      <div>
        <Link href="/">rmd shop</Link>
      </div>
      <div>
        <Cart />
      </div>
    </header>
  )
}

export default Nav