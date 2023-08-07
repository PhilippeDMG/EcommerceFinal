import { useAuth } from "../../context/userContext"

export default function Inicio() {
  const {
    userData: { user },
  } = useAuth()
  return (
    <div className="main">
      {user?.name ? (
        <h1>Hola {user.name}!</h1>
      ) : (
        <div className="contenedor" style={{ textAlign: "center" }}>
          <h1>Hola!</h1>
          <h3>Para acceder al carrito, tenés que loguearte!</h3>
        </div>
      )}
    </div>
  )
}
