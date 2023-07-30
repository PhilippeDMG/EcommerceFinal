import styles from "./styles.module.css"

export default function Pagination({ setPage, page }: any) {
  const handleClickMinus = () => {
    setPage((nroAnterior: number) => nroAnterior - 1)
  }

  const handleClickPlus = () => {
    setPage((nroAnterior: number) => nroAnterior + 1)
  }
  return (
    <div className={styles.pagination}>
      <button
        disabled={page === 0}
        className={styles.boton}
        onClick={() => handleClickMinus()}
      >
        &lt;
      </button>
      <div className={styles.texto}>Página {page}</div>
      <button className={styles.boton} onClick={() => handleClickPlus()}>
        &gt;
      </button>
    </div>
  )
}
