import { useState } from "react"
import { ProductoProp } from "../../types"
import { useCarrito } from "../../context/carritoContext"
import styles from "./styles.module.css"
import { useAuth } from "../../context/userContext"
import Modal from "../Portal"
import { Link } from "react-router-dom"

interface ProdProd extends Omit<ProductoProp, "id"> {
  children: JSX.Element
}

export function Prod({
  images,
  title,
  description,
  price,
  children,
}: ProdProd) {
  return (
    <div className={styles.producto}>
      <div className={styles.top}>
        <img src={images[0]} />
        <h3>{title}</h3>
      </div>
      <p>{description}</p>
      <div className={styles.mybottom}>
        <h3>${price}</h3>
        {children}
      </div>
    </div>
  )
}

export default function Producto({
  description,
  title,
  price,
  images,
  id,
}: ProductoProp) {
  const carrito = useCarrito()
  const {
    userData: { user },
  } = useAuth()
  const role = user?.role
  const [quantity, setQuantity] = useState<number>(0)
  const handleClick = () => {
    if (!user) return alert("Tenés que iniciar sesión para acceder al carrito!")
    const producto = {
      id,
      title,
      price,
      quantity,
      images,
      description,
    }
    carrito.addProduct(producto)
    setQuantity(0)
  }
  return (
    <Prod images={images} title={title} description={description} price={price}>
      <>
        <div className={styles.cantidad}>
          <button
            onClick={() => setQuantity(quantity - 1)}
            disabled={quantity === 0}
          >
            -
          </button>
          <h4>{quantity}</h4>
          <button onClick={() => setQuantity(quantity + 1)}>+</button>
        </div>
        <button onClick={handleClick} disabled={!quantity}>
          Agregar al carrito
        </button>
        {role === "admin" && (
          <div className={styles.botones}>
            <Modal id={id} forProduct={true} />
            <Link to={`/product/edit/${id}`} className={styles.linko}>
              <button>Editar</button>
            </Link>
          </div>
        )}
      </>
    </Prod>
  )
}
