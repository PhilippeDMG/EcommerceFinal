import { Routes, Route } from "react-router-dom"
import ProductsCreate from "./components/ProductsCreate"
import ProductsEdit from "./components/ProductsEdit"
import Products from "./components/Products"
import ProductsId from "./components/ProductsId"
import CartDetail from "./components/cartdetail"
import Register from "./components/Register"
import Inicio from "./components/Inicio"
import Login from "./components/Login"
import Categories from "./components/Categories"
import Navbar from "./components/Navbar"
import { useQuery } from "@tanstack/react-query"

export default function App() {
  const { isLoading, isError, data } = useQuery({
    queryKey: ["categorias"],
    queryFn: () =>
      fetch("https://api.escuelajs.co/api/v1/categories").then((res) =>
        res.json()
      ),
  })

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/cart-detail" element={<CartDetail />} />
        <Route
          path="/categories"
          element={
            <Categories isLoading={isLoading} isError={isError} data={data} />
          }
        />
        <Route path="/product/create" element={<ProductsCreate />} />
        <Route path="/products/edit/:id" element={<ProductsEdit />} />
        <Route path="/products/:id" element={<ProductsId />} />
        <Route
          path="/products"
          element={
            <Products
              isLoadingCat={isLoading}
              isErrorCat={isError}
              dataCat={data}
            />
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="*"
          element={
            <Categories isLoading={isLoading} isError={isError} data={data} />
          }
        />
      </Routes>
    </>
  )
}
