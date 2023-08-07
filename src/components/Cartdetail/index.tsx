import { useCarrito } from "../../context/carritoContext"
import { Prod } from "../Products/producto"
import styles from "./styles.module.css"
import { Link } from "react-router-dom"

export default function CartDetail() {
  const { carrito, total, addProductCD, removeProductCD, resetCarrito } =
    useCarrito()
  return (
    <div className={styles.container}>
      <h1>CartDetail</h1>
      <div className={styles.informacion}>
        <div className={styles.izquierda}>
          {carrito.length === 0 ? (
            <h2>Ups... no hay productos en el carrito</h2>
          ) : (
            <>
              <div className={styles.productos}>
                {carrito.map((producto) => (
                  <Prod
                    images={producto.images}
                    title={producto.title}
                    description={producto.description}
                    price={producto.price}
                    key={producto.id}
                  >
                    <>
                      <div className={styles.bottom}>
                        <button
                          onClick={() => removeProductCD(producto)}
                          disabled={producto.quantity === 0}
                        >
                          -
                        </button>
                        <h4>{producto.quantity}</h4>
                        <button onClick={() => addProductCD(producto)}>
                          +
                        </button>
                      </div>
                    </>
                  </Prod>
                ))}
              </div>
            </>
          )}
        </div>
        <div className={styles.derecha}>
          <h2>Subtotal: ${total.toLocaleString()}</h2>
          <Link to={"/success"}>
            <button className="green-button" onClick={() => resetCarrito()}>
              Comprar
            </button>
          </Link>
        </div>
      </div>
    </div>
  )
}
