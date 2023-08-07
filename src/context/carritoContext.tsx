import { createContext, useEffect, useState } from "react"
import React from "react"
import { Producto } from "../types"
import { CARRITO } from "../constants/keys"

type CarritoContextType = {
  carrito: Producto[]
  total: number
  addProduct: (product: Producto) => void
  removeProductCD: (product: Producto) => void
  addProductCD: (product: Producto) => void
  resetCarrito: () => void
}
const CarritoContext = createContext<CarritoContextType>(null!)
export function CarritoContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [carrito, setCarrito] = useState<Producto[]>([])
  const [total, setTotal] = useState<number>(0)

  useEffect(() => {
    const carritoStorage = localStorage.getItem(CARRITO)
    if (carritoStorage) {
      const carritoStorage2 = JSON.parse(carritoStorage)
      setCarrito(carritoStorage2)
      const sum = carritoStorage2.reduce(
        (acumulador: number, producto: Producto) => {
          return acumulador + producto.quantity * producto.price
        },
        0
      )
      setTotal(sum)
    }
  }, [])

  const addProduct = (product: Producto) => {
    const productoExistente = carrito.find((item) => item.id === product.id)

    if (productoExistente) {
      productoExistente.quantity += product.quantity
      const nuevoCarrito = carrito.map((item) =>
        productoExistente.id === item.id ? productoExistente : item
      )
      setCarrito(nuevoCarrito)
      localStorage.setItem(CARRITO, JSON.stringify(nuevoCarrito))
    } else {
      const newCarrito = [...carrito, product]
      setCarrito(newCarrito)
      localStorage.setItem(CARRITO, JSON.stringify(newCarrito))
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
    localStorage.setItem(CARRITO, JSON.stringify(nuevoCarrito))
  }
  const removeProductCD = (product: Producto) => {
    let nuevoCarrito = carrito.map((item) =>
      product.id === item.id ? { ...item, quantity: item.quantity - 1 } : item
    )
    nuevoCarrito = nuevoCarrito.filter((item) => item.quantity !== 0)
    setCarrito(nuevoCarrito)
    setTotal(total - product.price)
    if (nuevoCarrito.length === 0) {
      localStorage.removeItem(CARRITO)
    } else {
      localStorage.setItem(CARRITO, JSON.stringify(nuevoCarrito))
    }
  }
  const resetCarrito = () => {
    setCarrito([])
    setTotal(0)
    localStorage.removeItem(CARRITO)
  }
  let value = {
    carrito,
    total,
    addProduct,
    removeProductCD,
    addProductCD,
    resetCarrito,
  }

  return (
    <CarritoContext.Provider value={value}>{children}</CarritoContext.Provider>
  )
}
export function useCarrito() {
  return React.useContext(CarritoContext)
}
