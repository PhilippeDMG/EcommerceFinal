export type CategoriaProp = {
  id: string
  name: string
  image: string
  role: string | undefined
}

export type ProductoProp = {
  id: string
  title: string
  price: number
  description: string
  images: string[]
}
export interface Producto extends ProductoProp {
  quantity: number
}
export type Categories = {
  isLoading: boolean
  isError: boolean
  data: CategoriaProp[]
}
export type UserLoginDataResponse = {
  id: number
  email: string
  password: string
  name: string
  role: string
  avatar: string
}
export type tokensType = {
  access_token: string
  refresh_token: string
}
export type dataType = {
  user: UserLoginDataResponse | null
  tokens: tokensType
}
export interface AuthContextType {
  userData: dataType
  signin: (data: dataType, callback: VoidFunction) => void
  signout: (callback: VoidFunction) => void
}
export type loginType = {
  email: String
  password: String
}
