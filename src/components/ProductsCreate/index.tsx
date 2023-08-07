import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { ProductoProp } from "../../types"
import { useCategory } from "../../context/categoryContext"

export default function ProductCreate() {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [categoryId, setCategoryId] = useState(0)
  const [images, setImages] = useState<string[]>([])
  const [mje, setMje] = useState("")
  const { dataCat, isLoadingCat, isErrorCat } = useCategory()

  interface Product extends Omit<ProductoProp, "id"> {
    categoryId: number
  }
  const newProductMutation = useMutation(
    (newProduct: Product) =>
      axios
        .post("https://api.escuelajs.co/api/v1/products/", newProduct)
        .then((resp) => resp.data),
    {
      onSuccess: (data) => {
        alert("Producto creado con éxito")
      },
      onError: (e) => {
        console.log(e)
        setMje("Error")
        setTimeout(() => {
          setMje("")
        }, 5000)
      },
    }
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const newProduct: Product = {
      title,
      price: parseInt(price),
      description,
      categoryId,
      images,
    }

    newProductMutation.mutate(newProduct)
  }

  return (
    <div className="main">
      <h1>Crear producto</h1>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </div>
        <div className="container">
          <label htmlFor="price">Precio</label>
          <input
            type="number"
            id="price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            min={1}
            required
          />
        </div>
        <div className="container">
          <label htmlFor="description">Descripción</label>
          <input
            type="text"
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            value={description}
            required
          />
        </div>
        <div className="container">
          <label htmlFor="categoryId">Categoría</label>
          <select
            id="categoryId"
            name="categoryId"
            value={categoryId}
            onChange={(e) => setCategoryId(parseInt(e.target.value))}
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
        <div className="container">
          <label htmlFor="images">Imagen</label>
          <input
            placeholder="Ingrese una url"
            type="url"
            id="images"
            onChange={(e) => setImages([e.target.value])}
            value={images}
          />
        </div>

        <button type="submit">Agregar</button>
      </form>
      {mje && <p>{mje}</p>}
    </div>
  )
}
