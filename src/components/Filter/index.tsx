import { useState } from "react"
import styles from "./styles.module.css"
import { Categories } from "../../Types"

interface CatFiltro extends Categories {
  setFilter: any
}

export default function Filtro({
  isLoading,
  isError,
  data,
  setFilter,
}: CatFiltro) {
  const [active, setActive] = useState(false)
  const [precio, setPrecio] = useState("")
  const [titulo, setTitulo] = useState("")
  const [precioMax, setPrecioMax] = useState("")
  const [precioMin, setPrecioMin] = useState("")
  const [categoria, setCategoria] = useState("")

  const handleSubmit = (e: any) => {
    e.preventDefault()
    setFilter(
      `${precio === "" ? "" : `price=${precio}&`}${
        titulo === "" ? "" : `title=${titulo}&`
      }${precioMin === "" ? "" : `price_min=${precioMin}&`}${
        precioMax === "" ? "" : `price_max=${precioMax}&`
      }${categoria === "" ? "" : `categoryId=${categoria}&`}`
    )
  }

  if (!active) {
    return (
      <button className={styles.filtro} onClick={() => setActive(true)}>
        Filtrar
      </button>
    )
  }

  return (
    <form className={styles.filtro} onSubmit={handleSubmit}>
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
          disabled={precioMax !== "" || precioMin !== ""}
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
          disabled={precio !== ""}
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
          disabled={precio !== ""}
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
          {isLoading && <option>Cargando...</option>}
          {isError && <option>Error...</option>}
          {data &&
            data.map(({ name, id }: { name: string; id: number }) => (
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
