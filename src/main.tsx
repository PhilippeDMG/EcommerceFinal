import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"
import { BrowserRouter } from "react-router-dom"
import { QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider } from "./context/userContext"
import { QueryClient } from "@tanstack/react-query"
import { CatContextProvider } from "./context/categoryContext"
import { CarritoContextProvider } from "./context/carritoContext"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <CatContextProvider>
            <CarritoContextProvider>
              <App />
            </CarritoContextProvider>
          </CatContextProvider>
        </QueryClientProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
)
