import { useAuth } from "../../context/userContext"
import styles from "./styles.module.css"

export default function Inicio() {
  const {
    userData: { user },
  } = useAuth()
  return (
    <div className={styles.inicio}>
      {user?.name ? (
        <h1>Hola {user.name}!</h1>
      ) : (
        <div className={styles.texto}>
          <h1>Hola!</h1>
          <h3>Para acceder al carrito, tenés que loguearte!</h3>
        </div>
      )}
    </div>
  )
}
