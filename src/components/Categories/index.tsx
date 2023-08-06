import { CategoriaProp, Categories } from "../../types"
import { Link, useNavigate } from "react-router-dom"
import styles from "./styles.module.css"
import { useCategory } from "../../context/categoryContext"
import { useAuth } from "../../context/userContext"
import Modal from "../Portal"

function Categoria({ name, image, id, role }: CategoriaProp) {
  return (
    <div className={styles.categoria}>
      <Link
        to={`/products?category=${name}`}
        state={{ id, type: "categoria" }}
        className={styles.link}
      >
        <h2>{name}</h2>
        <img src={image} />
      </Link>
      <div className={styles.botones}>
        {role === "admin" && <Modal id={id} forProduct={false} />}
        {role === "admin" && (
          <Link to={`/category/edit/${id}`} className={styles.linko}>
            <button>Editar</button>
          </Link>
        )}
      </div>
    </div>
  )
}

export default function Categories() {
  const { isLoadingCat, isErrorCat, dataCat } = useCategory()
  const {
    userData: { user },
  } = useAuth()
  const role = user?.role
  const navigate = useNavigate()
  return (
    <div className={styles.categorias}>
      {isLoadingCat && <h1>Cargando...</h1>}
      {isErrorCat && <h1>Error</h1>}
      {dataCat && (
        <>
          <h1>Categorías</h1>
          {role === "admin" && (
            <button onClick={() => navigate("/category/create")}>
              Agregar categorías
            </button>
          )}
          <div className={styles.contenedor}>
            {dataCat.map(({ id, image, name }: Omit<CategoriaProp, "role">) => (
              <Categoria
                name={name}
                image={image}
                id={id}
                key={id}
                role={role}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}
