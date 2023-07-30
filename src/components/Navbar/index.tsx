import styles from "./styles.module.css"
import { Link } from "react-router-dom"
import AuthStatus from "../../userContext"

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <img src="/ecommerce.svg" alt="logo" />
      <div className={styles.links}>
        <Link className={styles["navbar-link"]} to="/products">
          Productos
        </Link>
        <Link className={styles["navbar-link"]} to="/categories">
          Categorías
        </Link>
        <AuthStatus>
          <Link className={styles["navbar-link"]} to="/login">
            Login
          </Link>
          <Link className={styles["navbar-link"]} to="/register">
            Register
          </Link>
        </AuthStatus>
      </div>
    </nav>
  )
}
