import { Navigate, useLocation, useNavigate } from "react-router-dom"
import React from "react"

const ACCESS_TOKEN = "ACCESS_TOKEN"

type UserLoginDataResponse = {
  access_token: string
  refresh_token: string
}
interface AuthContextType {
  user: any
  signin: (user: UserLoginDataResponse, callback: VoidFunction) => void
  signout: (callback: VoidFunction) => void
}
let AuthContext = React.createContext<AuthContextType>(null!)
export function AuthProvider({ children }: { children: React.ReactNode }) {
  let [user, setUser] = React.useState<UserLoginDataResponse>({
    access_token: localStorage.getItem(ACCESS_TOKEN) || "",
    refresh_token: "",
  })

  let signin = (newUser: UserLoginDataResponse, callback: VoidFunction) => {
    setUser(newUser)
    localStorage.setItem(ACCESS_TOKEN, newUser.access_token)
    return callback()
  }

  let signout = (callback: VoidFunction) => {
    let object: UserLoginDataResponse = { access_token: "", refresh_token: "" }
    setUser(object)
    localStorage.removeItem(ACCESS_TOKEN)
    return callback()
  }

  let value: AuthContextType = { user, signin, signout }

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
  let navigate = useNavigate()

  if (!auth.user.access_token) {
    return children
  }
  return (
    <p>
      Welcome !
      <button
        onClick={() => {
          auth.signout(() => navigate("/"))
        }}
      >
        Sign out
      </button>
    </p>
  )
}

function RequireAuth({ children }: { children: JSX.Element }) {
  let auth = useAuth()
  let location = useLocation()

  if (!auth.user) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/login" state={{ from: location }} replace />
  }
  return children
}
