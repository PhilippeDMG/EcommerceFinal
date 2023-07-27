import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { useParams } from "react-router-dom"

export default function CategoriesEdit() {
  const [name, setName] = useState("")
  const [image, setImage] = useState<string>("")
  const [mje, setMje] = useState("")
  const { id } = useParams()

  type updatedCategory = {
    name: string
    image: string
  }
  const updatedCategoryMutation = useMutation(
    (updatedCategory: updatedCategory) =>
      axios
        .put(
          `https://api.escuelajs.co/api/v1/categories/${id}`,
          updatedCategory
        )
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

    const updatedCategory: updatedCategory = {
      name,
      image,
    }
    updatedCategoryMutation.mutate(updatedCategory)
  }

  return (
    <>
      <h1>Actualizar categoría</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div>
          <label htmlFor="image">Imagen</label>
          <input
            placeholder="ingrese una url"
            type="url"
            id="image"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </div>
        <button type="submit">Actualizar</button>
      </form>
      {mje && <p>{mje}</p>}
    </>
  )
}
