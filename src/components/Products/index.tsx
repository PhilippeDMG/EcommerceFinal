import { useEffect, useState } from "react"
import { CategoriaProp, ProductoProp } from "../../Types"
import Pagination from "../Pagination"
import styles from "./styles.module.css"
import { useQuery } from "@tanstack/react-query"
import Filtro from "../Filter"
import axios from "axios"

function Producto({
  description,
  title,
  price,
  images,
}: Omit<ProductoProp, "id">) {
  return (
    <div className={styles.producto}>
      <img src={images[0]} />
      <h3>{title}</h3>
      <p>{description}</p>
      <h3>${price}</h3>
    </div>
  )
}

type Categories = {
  isLoadingCat: boolean
  isErrorCat: boolean
  dataCat: CategoriaProp[]
}

export default function Productos({
  isLoadingCat,
  isErrorCat,
  dataCat,
}: Categories) {
  const [page, setPage] = useState(0)
  const [filter, setFilter] = useState("")

  useEffect(() => setPage(0), [filter])
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
            <Filtro
              setFilter={setFilter}
              isLoading={isLoadingCat}
              isError={isErrorCat}
              data={dataCat}
            />
          </div>
          <div className={styles.productos}>
            {data.map(
              ({ description, images, price, title, id }: ProductoProp) => (
                <Producto
                  description={description}
                  images={images}
                  title={title}
                  price={price}
                  key={id}
                />
              )
            )}
          </div>
          <Pagination setPage={setPage} page={page} />
        </main>
      )}
    </>
  )
}
