import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { useParams } from "react-router-dom"

export default function ProductsEdit() {
  const [title, setTitle] = useState("")
  const [price, setPrice] = useState(0)
  const [description, setDescription] = useState("")
  const [images, setImages] = useState<string[]>([])
  const [mje, setMje] = useState("")
  const { id } = useParams()

  type updatedProduct = {
    title: string
    price: number
    description: string
    images: string[]
  }
  const updatedMutation = useMutation(
    (updatedProduct: Partial<updatedProduct>) =>
      axios
        .put(`https://api.escuelajs.co/api/v1/products/${id}`, updatedProduct)
        .then((resp) => resp.data),
    {
      onSuccess: () => alert("Producto editado con éxito"),
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

    const updatedProduct: Partial<updatedProduct> = {}
    if (title !== "") updatedProduct.title = title
    if (!!price) updatedProduct.price = price
    if (description !== "") updatedProduct.description = description
    if (images[0] !== "") updatedProduct.images = images
    updatedMutation.mutate(updatedProduct)
  }

  return (
    <div className="main">
      <h1>Editar producto</h1>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <label htmlFor="title">Título</label>
          <input
            type="text"
            id="title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div className="container">
          <label htmlFor="price">Precio</label>
          <input
            type="number"
            id="price"
            onChange={(e) => setPrice(parseInt(e.target.value))}
            min={1}
          />
        </div>
        <div className="container">
          <label htmlFor="description">Descripción</label>
          <textarea
            id="description"
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            value={description}
          />
        </div>
        <div className="container">
          <label htmlFor="images">Imagen</label>
          <input
            placeholder="ingrese una url"
            type="url"
            id="images"
            onChange={(e) => setImages([e.target.value])}
            required
            // me daba error de axios, con el siguiente mensaje:
            //responseText: "{\"statusCode\":400,\"message\":[\"images must contain at least 1 elements\"],\"error\":\"Bad Request\"}"
          />
        </div>
        <button type="submit">Actualizar</button>
      </form>
      {mje && <p>{mje}</p>}
    </div>
  )
}
