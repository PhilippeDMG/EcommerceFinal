import styles from "./styles.module.css"
import { Link } from "react-router-dom"
import AuthStatus, { useAuth } from "../../context/userContext"
import { useCarrito } from "../../context/carritoContext"

export default function Navbar() {
  const { total } = useCarrito()
  const {
    userData: { user },
  } = useAuth()
  return (
    <nav className={styles.navbar}>
      <div className={styles.links}>
        <img src="/ecommerce.svg" alt="logo" />
        {!!total && user && (
          <div className={styles.links}>
            <p>${total.toLocaleString()}</p>
            <Link to={"/cart-detail"}>
              <button>Ver carrito</button>
            </Link>
          </div>
        )}
      </div>
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
            Registrarse
          </Link>
        </AuthStatus>
      </div>
    </nav>
  )
}
