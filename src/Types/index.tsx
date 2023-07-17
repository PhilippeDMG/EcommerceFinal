
  export type BaseProp = {
    name: string
    id: number
  }
  
  export type PersonajeProp = BaseProp & {
    image: string
    species: string
  }
  export type CategoriaProp = {
    id: number
    name:string
    image:string
  }

  export type ProductoProp = {
    description: string
    images: string[]
    title: string
    price: number
  }