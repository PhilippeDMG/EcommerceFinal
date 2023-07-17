import { useLocation } from "react-router-dom"
import { ProductoProp } from "../../Types"
import styles from "./styles.module.css"
import { useQuery } from "@tanstack/react-query"

function useSearch() {
  return new URLSearchParams(useLocation().search)
}

function Producto({ description, title, price, images }: ProductoProp) {
  return (
    <div className={styles.producto}>
      <img src={images[0]} />
      <h3>{title}</h3>
      <p>{description}</p>
      <h3>${price}</h3>
    </div>
  )
}

export default function Productos() {
  let query = useSearch()
  let category = query.get("category")
  let { state } = useLocation()
  const { isLoading, error, data } = useQuery({
    queryKey: [`producto-categoria${state.id}`],
    queryFn: () =>
      fetch(
        `https://api.escuelajs.co/api/v1/products/?categoryId=${state.id}`
      ).then((res) => res.json()),
  })

  return (
    <>
      {error && <h1>Hubo un error...</h1>}
      {isLoading && <h1>Cargando...</h1>}
      {data && (
        <main className={styles.container}>
          <h1>La categoria es: {category}</h1>
          <div className={styles.productos}>
            {data.map(({ description, images, price, title }: ProductoProp) => (
              <Producto
                description={description}
                images={images}
                title={title}
                price={price}
              />
            ))}
          </div>
        </main>
      )}
    </>
  )
}
