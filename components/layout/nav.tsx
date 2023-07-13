import Cart from '../cart'
import classes from './nav.module.css'
function Nav() {
  return (
    <header className={classes.header}>
      <div>
        rmd shop
      </div>
      <div>
        <Cart />
      </div>
    </header>
  )
}

export default Nav