import { useLocation } from "react-router-dom"
import { ProductoProp } from "../../Types"
import styles from "./styles.module.css"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

function Producto({ description, title, price, images, id }: ProductoProp) {
  return (
    <div key={id} className={styles.producto}>
      <img src={images[0]} />
      <h3>{title}</h3>
      <p>{description}</p>
      <h3>${price}</h3>
    </div>
  )
}

export default function Productos() {
  let { state } = useLocation()
  const { isLoading, error, data } = useQuery({
    queryKey: [`productos`],
    queryFn: () =>
      axios
        .get(`https://api.escuelajs.co/api/v1/products`)
        .then((res) => res.data),
  })

  return (
    <>
      {error && <h1>Hubo un error...</h1>}
      {isLoading && <h1>Cargando...</h1>}
      {data && (
        <main className={styles.container}>
          <h1>La categoria es: {state.type}</h1>
          <div className={styles.productos}>
            {data.map(
              ({ description, images, price, title, id }: ProductoProp) => (
                <Producto
                  description={description}
                  images={images}
                  title={title}
                  price={price}
                  id={id}
                />
              )
            )}
          </div>
        </main>
      )}
    </>
  )
}
