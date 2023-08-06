import { Link } from "react-router-dom"
import styles from "./styles.module.css"

export default function CompraExitosa() {
  return (
    <div className={styles["compra-exitosa"]}>
      <h1>🎉¡Compra realizada con éxito!🎉</h1>
      <Link to={"/"}>
        <button>Inicio</button>
      </Link>
    </div>
  )
}
