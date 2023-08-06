import { Navigate, useLocation, useNavigate } from "react-router-dom"
import React from "react"
import {
  AuthContextType,
  UserLoginDataResponse,
  dataType,
  tokensType,
} from "../types"
import { ACCESS_TOKEN, USER } from "../constants/keys"
import { useCarrito } from "./carritoContext"

let AuthContext = React.createContext<AuthContextType>(null!)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<UserLoginDataResponse | null>(
    JSON.parse(localStorage.getItem(USER)!)
  )
  let [tokens, setTokens] = React.useState<tokensType>({
    access_token: localStorage.getItem(ACCESS_TOKEN) || "",
    refresh_token: "",
  })

  let signin = (data: dataType, callback: VoidFunction) => {
    setUser(data.user)
    setTokens(data.tokens)
    localStorage.setItem(USER, JSON.stringify(data.user))
    localStorage.setItem(ACCESS_TOKEN, data.tokens.access_token)
    return callback()
  }

  let signout = (callback: VoidFunction) => {
    let object: tokensType = { access_token: "", refresh_token: "" }
    setUser(null)
    setTokens(object)
    localStorage.removeItem(ACCESS_TOKEN)
    localStorage.removeItem(USER)
    return callback()
  }

  let value: AuthContextType = { userData: { user, tokens }, signin, signout }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
export function useAuth() {
  return React.useContext(AuthContext)
}

interface AuthStatusProps {
  children: React.ReactNode
}

export default function AuthStatus({ children }: AuthStatusProps) {
  let auth = useAuth()
  let { resetCarrito } = useCarrito()
  console.log()

  let navigate = useNavigate()

  if (!auth.userData.user) {
    return children
  }
  return (
    <>
      <p>Hola {auth.userData.user.name}!</p>
      <button
        onClick={() => {
          auth.signout(() => {
            navigate("/")
            resetCarrito()
          })
        }}
      >
        Sign out
      </button>
    </>
  )
}

export function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth()
  let location = useLocation()

  if (auth.userData.user?.role !== "admin") {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" state={{ from: location }} replace />
  }
  return children
}
