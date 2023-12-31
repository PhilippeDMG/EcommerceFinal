import { useState } from "react"
import styles from "./styles.module.css"
import { useCategory } from "../../context/categoryContext"

export default function Filtro({
  setFilter,
  setPage,
}: {
  setFilter: React.Dispatch<React.SetStateAction<string>>
  setPage: React.Dispatch<React.SetStateAction<number>>
}) {
  const [active, setActive] = useState(false)
  const [precio, setPrecio] = useState("")
  const [titulo, setTitulo] = useState("")
  const [precioMax, setPrecioMax] = useState("")
  const [precioMin, setPrecioMin] = useState("")
  const [categoria, setCategoria] = useState("")

  const handleSubmit = (e: any) => {
    e.preventDefault()
    if (!!precioMax === !!precioMin) {
      setFilter(
        `${precio === "" ? "" : `price=${precio}&`}${
          titulo === "" ? "" : `title=${titulo}&`
        }${precioMin === "" ? "" : `price_min=${precioMin}&`}${
          precioMax === "" ? "" : `price_max=${precioMax}&`
        }${categoria === "" ? "" : `categoryId=${categoria}&`}`
      )
      setPage(0)
    } else {
      alert("Ingresar precio máximo y mínimo juntos")
    }
  }

  const { isLoadingCat, isErrorCat, dataCat } = useCategory()
  if (!active) {
    return (
      <button className={styles.filtro} onClick={() => setActive(true)}>
        Filtrar
      </button>
    )
  }

  return (
    <form
      className={`${styles.filtro} ${active ? styles["filtro-active"] : ""}`}
      onSubmit={handleSubmit}
    >
      <div className={styles.item}>
        <label htmlFor="titulo">Título</label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>
      <div className={styles.item}>
        <label htmlFor="precio">Precio</label>
        <input
          type="number"
          id="precio"
          name="precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          disabled={!!precioMax || !!precioMin}
        />
      </div>
      <div className={styles.item}>
        <label htmlFor="precio-max">Precio máximo</label>
        <input
          type="number"
          id="precio-max"
          name="precio-max"
          value={precioMax}
          onChange={(e) => setPrecioMax(e.target.value)}
          disabled={!!precio}
          min={0}
        />
      </div>
      <div className={styles.item}>
        <label htmlFor="precio-min">Precio mínimo</label>
        <input
          type="number"
          id="precio-min"
          name="precio-min"
          value={precioMin}
          onChange={(e) => setPrecioMin(e.target.value)}
          disabled={!!precio}
          min={0}
        />
      </div>
      <div className={styles.item}>
        <label htmlFor="categoria">Categoría</label>
        <select
          id="categoria"
          name="categoria"
          value={categoria}
          onChange={(e) => setCategoria(e.target.value)}
        >
          <option value="">Seleccione una categoría</option>
          {isLoadingCat && <option>Cargando...</option>}
          {isErrorCat && <option>Error...</option>}
          {dataCat &&
            dataCat.map(({ name, id }: { name: string; id: string }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
        </select>
      </div>
      <button type="submit">Aplicar filtros</button>
    </form>
  )
}
