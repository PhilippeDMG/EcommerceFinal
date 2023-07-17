import { useLocation } from "react-router-dom";
import { useGetData } from "../../hooks/useGetData";
import { ProductoProp } from "../../Types";
import styles from "./styles.module.css"


function useQuery() {
  return new URLSearchParams(useLocation().search);
}


function Producto({description,title,price,images}:ProductoProp){
  return(
    <div className={styles.producto}>
      <img src={images[0]}/>
      <h3>{title}</h3>
      <p>{description}</p>
      <h3>${price}</h3>
    </div>
  )
}

export default function Productos() {
  let query = useQuery();
  let category = query.get("category");
  let {state} = useLocation()
  let url =`https://api.escuelajs.co/api/v1/products/?categoryId=${state.id}`
  const {data, error, loading} = useGetData(url)
  
  return(
    <>
    {error && <h1>Hubo un error...</h1>}
    {loading && <h1>Cargando...</h1>}
    {data && <main className={styles.container}>
    
    
      <h1>La categoria es: {category}</h1>
      <div className={styles.productos}>
      {data.map(({description,images,price,title}:ProductoProp)=><Producto description={description} images={images} title={title} price={price}/>)}
      </div>
    </main>}
    </>
  )
}