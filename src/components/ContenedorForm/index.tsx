import styles from "./styles.module.css"

type contenedorProps = {
  img: string
  children: JSX.Element
  reverse?: boolean
}

export default function Contenedor({
  img,
  children,
  reverse,
}: contenedorProps) {
  return (
    <div className={styles.login}>
      <div className={styles.background}>
        {reverse ? (
          <>
            <img src={img} />
            {children}
          </>
        ) : (
          <>
            {children}
            <img src={img} />
          </>
        )}
      </div>
    </div>
  )
}
