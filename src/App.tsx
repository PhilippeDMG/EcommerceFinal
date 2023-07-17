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
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/cart-detail" element={<CartDetail />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="/login" element={<Login />} />
        <Route path="/product/create" element={<ProductsCreate />} />
        <Route path="/products/edit/:id" element={<ProductsEdit />} />
        <Route path="/products/:id" element={<ProductsId />} />
        <Route path="/products" element={<Products />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<Categories />} />
      </Routes>
    </QueryClientProvider>
  )
}
