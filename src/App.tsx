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
import CategoriesCreate from "./components/ProductsCreate"
import CategoriesEdit from "./components/CategoriesEdit"
import { RequireAuth } from "./userContext"

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/cart-detail" element={<CartDetail />} />
        <Route path="/products/:id" element={<ProductsId />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/categories" element={<Categories />} />
        <Route
          path="/category/create"
          element={
            <RequireAuth>
              <CategoriesCreate />
            </RequireAuth>
          }
        />
        <Route
          path="/category/edit/:id"
          element={
            <RequireAuth>
              <CategoriesEdit />
            </RequireAuth>
          }
        />
        <Route
          path="/product/create"
          element={
            <RequireAuth>
              <ProductsCreate />
            </RequireAuth>
          }
        />
        <Route path="/products" element={<Products />} />
        <Route
          path="/product/edit/:id"
          element={
            <RequireAuth>
              <ProductsEdit />
            </RequireAuth>
          }
        />
        <Route path="*" element={<Categories />} />
      </Routes>
    </>
  )
}
