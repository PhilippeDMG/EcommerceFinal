export type CategoriaProp = {
  id: number
  name: string
  image: string
}

export type ProductoProp = {
  id: string
  description: string
  images: string[]
  title: string
  price: number
}

export type Categories = {
  isLoading: boolean
  isError: boolean
  data: CategoriaProp[]
}
