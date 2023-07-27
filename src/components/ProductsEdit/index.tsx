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

    const updatedProduct: Partial<updatedProduct> = {}
    if (title !== "") updatedProduct.title = title
    if (price !== 0) updatedProduct.price = price
    if (description !== "") updatedProduct.description = description
    if (images[0] !== "") updatedProduct.images = images
    updatedMutation.mutate(updatedProduct)
  }

  return (
    <>
      <h1>Editar productos</h1>
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
        <button type="submit">Actualizar</button>
      </form>
      {mje && <p>{mje}</p>}
    </>
  )
}
