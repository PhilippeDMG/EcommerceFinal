import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { UserLoginDataResponse, loginType, tokensType } from "../../Types"
import { useAuth } from "../../userContext"
import { useLocation, useNavigate } from "react-router-dom"

export default function LoginForm() {
  const [mje, setMje] = useState("")
  let auth = useAuth()
  let navigate = useNavigate()
  let location = useLocation()
  let from = location.state?.from?.pathname || "/"
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
          navigate(from, { replace: true })
        })
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
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input type="password" id="password" name="password" />
        </div>
        <button type="submit">Login</button>
      </form>
      {mje && <p>{mje}</p>}
    </>
  )
}
