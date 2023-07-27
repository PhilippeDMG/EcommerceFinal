import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { useCategory } from "../../categoryContext"

export default function ProductsCreate() {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState("")
  const [categoryId, setCategoryId] = useState(0)
  const [images, setImages] = useState<string[]>([])
  const [mje, setMje] = useState("")
  type newProduct = {
    title: string
    price: number
    description: string
    categoryId: number
    images: string[]
  }
  const newProductMutation = useMutation(
    (newProduct: newProduct) =>
      axios
        .post("https://api.escuelajs.co/api/v1/products/", newProduct)
        .then((resp) => resp.data),
    {
      onSuccess: (data) => {
        console.log(data)
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

    const nuevoUsuario: newProduct = {
      title,
      price,
      description,
      categoryId,
      images,
    }
    newProductMutation.mutate(nuevoUsuario)
  }

  const { isLoadingCat, isErrorCat, dataCat } = useCategory()
  return (
    <>
      <h1>Crear productos</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div>
          <label htmlFor="price">Precio</label>
          <input
            type="price"
            id="price"
            onChange={(e) => setPrice(parseInt(e.target.value))}
          />
        </div>
        <div>
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            value={description}
          />
        </div>
        <div>
          <label htmlFor="images">Imagen</label>
          <input
            placeholder="ingrese una url"
            type="url"
            id="images"
            onChange={(e) => setImages([e.target.value])}
            value={images}
          />
        </div>
        <div>
          <label htmlFor="category">Categoría</label>
          <select
            id="category"
            name="category"
            value={categoryId}
            onChange={(e) => setCategoryId(parseInt(e.target.value))}
          >
            <option value="">Seleccione una categoría</option>
            {isLoadingCat && <option>Cargando...</option>}
            {isErrorCat && <option>Error...</option>}
            {dataCat &&
              dataCat.map(({ name, id }: { name: string; id: number }) => (
                <option key={id} value={id}>
                  {name}
                </option>
              ))}
          </select>
        </div>
        <button type="submit">Agregar</button>
      </form>
      {mje && <p>{mje}</p>}
    </>
  )
}
