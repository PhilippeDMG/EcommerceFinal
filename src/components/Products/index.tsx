import { useState } from "react"
import { ProductoProp } from "../../types"
import Pagination from "../Pagination"
import styles from "./styles.module.css"
import { useQuery } from "@tanstack/react-query"
import Filtro from "../Filter"
import axios from "axios"
import Producto from "./producto"

export default function Productos() {
  const [page, setPage] = useState(0)
  const [filter, setFilter] = useState("")

  const fetchProducts = (page = 0) =>
    axios
      .get(
        `https://api.escuelajs.co/api/v1/products?${filter}offset=${
          page * 10
        }&limit=10`
      )
      .then((res) => res.data)
  let { isLoading, error, data } = useQuery({
    queryKey: ["productos", page, filter],
    queryFn: () => fetchProducts(page),
    keepPreviousData: true,
  })

  return (
    <>
      {error && <h1>Hubo un error...</h1>}
      {isLoading && <h1>Cargando...</h1>}
      {data && (
        <main className={styles.container}>
          <div className={styles.titulo}>
            <h1>Productos</h1>
            <Filtro setFilter={setFilter} setPage={setPage} />
          </div>
          <div className={styles.productos}>
            {data.length === 0 ? (
              <h1>No hay productos disponibles</h1>
            ) : (
              data.map(
                ({ description, images, price, title, id }: ProductoProp) => (
                  <Producto
                    description={description}
                    images={images}
                    title={title}
                    price={price}
                    key={id}
                    id={id}
                  />
                )
              )
            )}
          </div>
          <Pagination setPage={setPage} page={page} />
        </main>
      )}
    </>
  )
}
