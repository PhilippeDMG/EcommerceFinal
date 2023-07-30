import { CategoriaProp, Categories } from "../../Types"
import { Link } from "react-router-dom"
import styles from "./styles.module.css"

function Categoria({ name, image, id }: CategoriaProp) {
  return (
    <Link
      to={`/products?category=${name}`}
      state={{ id, type: "categoria" }}
      className={styles.link}
    >
      <h2>{name}</h2>
      <img src={image} />
    </Link>
  )
}

export default function Categories({ isLoading, isError, data }: Categories) {
  return (
    <>
      {isLoading && <h1>loading...</h1>}
      {isError && <h2>error</h2>}
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
