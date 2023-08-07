import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import Contenedor from "../ContenedorForm"

export default function RegisterForm() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  let location = useLocation()
  let from = location.state?.from?.pathname || "/"
  let navigate = useNavigate()
  type newUser = {
    name: string
    email: string
    password: string
    avatar: string
  }
  const registerMutation = useMutation(
    (usuario: newUser) =>
      axios.post("https://api.escuelajs.co/api/v1/users/", usuario),
    {
      onSuccess: () => navigate(from, { replace: true }),
      onError: (e) => {
        console.log(e)
        alert("Error")
      },
    }
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const avatar = await axios
      .get("https://randomfox.ca/floof/")
      .then((res) => res.data.image)

    const nuevoUsuario: newUser = {
      name,
      email,
      password,
      avatar,
    }
    registerMutation.mutate(nuevoUsuario)
  }

  return (
    <Contenedor img="/eCommerce-shopping.webp" reverse={true}>
      <div className="title-inputs">
        <h1>Registro</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="name">Nombre</label>
            <input
              type="text"
              id="name"
              onChange={(e) => setName(e.target.value)}
              value={name}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              required
            />
          </div>
          <div className="input-container">
            <label htmlFor="password">Contraseña (4 caracteres o más)</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              required
            />
          </div>
          <button type="submit">Registrase</button>
        </form>
      </div>
    </Contenedor>
  )
}
