import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

export default function CategoriesCreate() {
  const [name, setName] = useState("")
  const [image, setImage] = useState<string>("")
  const [mje, setMje] = useState("")
  let navigate = useNavigate()
  type newCategory = {
    name: string
    image: string
  }
  const newCategoryMutation = useMutation(
    (newCategory: newCategory) =>
      axios
        .post("https://api.escuelajs.co/api/v1/categories/", newCategory)
        .then((resp) => resp.data),
    {
      onSuccess: () => navigate("/categories"),
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

    const newCategory: newCategory = {
      name,
      image,
    }
    newCategoryMutation.mutate(newCategory)
  }

  return (
    <>
      <h1>Crear categoría</h1>
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
        <button type="submit">Agregar</button>
      </form>
      {mje && <p>{mje}</p>}
    </>
  )
}
