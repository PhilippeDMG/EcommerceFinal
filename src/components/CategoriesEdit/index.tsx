import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { CATEGORIES_QUERY_KEY } from "../../constants/keys"

export default function CategoriesEdit() {
  const [name, setName] = useState("")
  const [image, setImage] = useState<string>("")
  const [mje, setMje] = useState("")
  const { id } = useParams()
  const queryClient = useQueryClient()
  let navigate = useNavigate()
  type updatedCategory = {
    name: string
    image: string
  }
  const updatedCategoryMutation = useMutation(
    (updatedCategory: Partial<updatedCategory>) =>
      axios
        .put(
          `https://api.escuelajs.co/api/v1/categories/${id}`,
          updatedCategory
        )
        .then((resp) => resp.data),
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] })
        navigate("/categories")
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

    const updatedCategory: Partial<updatedCategory> = {}
    if (!!name) updatedCategory.name = name
    if (!!image) updatedCategory.image = image
    console.log(updatedCategory)

    updatedCategoryMutation.mutate(updatedCategory)
  }

  return (
    <div className="main">
      <h1>Actualizar categoría</h1>
      <form onSubmit={handleSubmit}>
        <div className="container">
          <label htmlFor="name">Nombre</label>
          <input
            type="text"
            id="name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </div>
        <div className="container">
          <label htmlFor="image">Imagen</label>
          <input
            placeholder="ingrese una url"
            type="url"
            id="image"
            onChange={(e) => setImage(e.target.value)}
          />
        </div>
        <button type="submit">Actualizar</button>
      </form>
      {mje && <p>{mje}</p>}
    </div>
  )
}
