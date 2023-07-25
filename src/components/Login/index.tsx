import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuth } from "../../requireauth"

export default function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [mje, setMje] = useState("")

  let navigate = useNavigate()
  let auth = useAuth()
  let location = useLocation()
  let from = location.state?.from?.pathname || "/"

  type loginType = {
    email: String
    password: String
  }
  type apiResponse = {
    access_token: string
    refresh_token: string
  }
  const loginMutation = useMutation(
    (usuario: loginType) =>
      axios
        .post<apiResponse, any>(
          "https://api.escuelajs.co/api/v1/auth/login",
          usuario
        )
        .then((resp) => resp.data),
    {
      onSuccess: (usuario: apiResponse) => {
        auth.signin(usuario, () => {
          navigate(from, { replace: true })
        })
      },
    }
  )

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const usuario: loginType = { email, password }
    loginMutation.mutate(usuario)
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />
        </div>
        <button type="submit">Login</button>
      </form>
      {mje && <p>{mje}</p>}
    </>
  )
}
