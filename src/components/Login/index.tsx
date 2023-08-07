import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { UserLoginDataResponse, loginType, tokensType } from "../../types"
import { useAuth } from "../../context/userContext"
import { useNavigate } from "react-router-dom"
import Contenedor from "../ContenedorForm"

export default function LoginForm() {
  let auth = useAuth()
  let navigate = useNavigate()
  const loginMutation = useMutation(
    (usuario: loginType) =>
      axios
        .post<tokensType>("https://api.escuelajs.co/api/v1/auth/login", usuario)
        .then((resp) => resp.data),
    {
      onSuccess: async (tokens: tokensType) => {
        const user = await axios
          .get<UserLoginDataResponse>(
            "https://api.escuelajs.co/api/v1/auth/profile",
            {
              headers: {
                Authorization: `Bearer ${tokens.access_token}`,
              },
            }
          )
          .then((resp) => resp.data)
        auth.signin({ user, tokens }, () => {
          navigate("/", { replace: true })
        })
      },
      onError: (e: any) => {
        const err = e.response.data.message
        if (err === "Unauthorized") alert("Contraseña errónea")
        else alert("Error")
      },
    }
  )
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    let formData: FormData = new FormData(e.currentTarget)
    const email: string = formData.get("email")!.toString()
    const password: string = formData.get("password")!.toString()
    const usuario: loginType = { email, password }
    loginMutation.mutate(usuario)
  }

  return (
    <Contenedor img="/shopping.webp">
      <div className="title-inputs">
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" name="email" required />
          </div>
          <div className="input-container">
            <label htmlFor="password">Contraseña</label>
            <input type="password" id="password" name="password" required />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </Contenedor>
  )
}
