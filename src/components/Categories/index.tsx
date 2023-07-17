import { useGetData } from "../../hooks/useGetData"
import { CategoriaProp } from "../../Types"
import { Link } from "react-router-dom"
import styles from "./styles.module.css"

function Categoria({ name, image, id }: CategoriaProp) {
  return (
    <Link
      to={`/products?category=${name}`}
      state={{ id }}
      className={styles.link}
    >
      <h2>{name}</h2>
      <img src={image} />
    </Link>
  )
}

export default function Categories() {
  let url = "https://api.escuelajs.co/api/v1/categories"
  const { data, error, loading } = useGetData<CategoriaProp>(url)

  return (
    <>
      {loading && <h1>loading...</h1>}
      {error && <h2>error</h2>}
      {data && (
        <div className={styles.categorias}>
          <h1>Categorías</h1>
          <div className={styles.contenedor}>
            {data.map(({ id, image, name }: CategoriaProp) => (
              <Categoria name={name} image={image} id={id} />
            ))}
          </div>
        </div>
      )}
    </>
  )
}
