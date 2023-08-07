import { Link } from "react-router-dom"

export default function CompraExitosa() {
  return (
    <div className="main">
      <h1>🎉¡Compra realizada con éxito!🎉</h1>
      <Link to={"/"}>
        <button>Inicio</button>
      </Link>
    </div>
  )
}
