import { createContext, useState } from "react"
import React from "react"
import { Producto } from "../Types"

type CarritoContextType = {
  carrito: Producto[]
  total: number
  addProduct: (product: Producto) => void
  removeProductCD: (product: Producto) => void
  addProductCD: (product: Producto) => void
}
const CarritoContext = createContext<CarritoContextType>(null!)
export function CarritoContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [carrito, setCarrito] = useState<Producto[]>([])
  const [total, setTotal] = useState<number>(0)

  const addProduct = (product: Producto) => {
    const productoExistente = carrito.find((item) => item.id === product.id)

    if (productoExistente) {
      productoExistente.quantity += 1
      const nuevoCarrito = carrito.map((item) =>
        productoExistente.id === item.id ? productoExistente : item
      )
      setCarrito(nuevoCarrito)
    } else {
      setCarrito([...carrito, product])
    }
    setTotal(total + product.price * product.quantity)
  }

  //CD = CartDetail
  const addProductCD = (product: Producto) => {
    const nuevoCarrito = carrito.map((item) =>
      product.id === item.id ? { ...item, quantity: item.quantity + 1 } : item
    )
    setCarrito(nuevoCarrito)
    setTotal(total + product.price)
  }
  const removeProductCD = (product: Producto) => {
    const nuevoCarrito = carrito.map((item) =>
      product.id === item.id ? { ...item, quantity: item.quantity - 1 } : item
    )
    nuevoCarrito.filter((item) => item.quantity === 0)
    setCarrito(nuevoCarrito)
    setTotal(total - product.price)
  }

  let value = { carrito, total, addProduct, removeProductCD, addProductCD }

  return (
    <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>
  )
}
export function useCarrito() {
  return React.useContext(CarritoContext)
}
