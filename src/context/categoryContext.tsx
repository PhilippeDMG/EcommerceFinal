import { useQuery } from "@tanstack/react-query"
import { createContext } from "react"
import React from "react"
import { CATEGORIES_QUERY_KEY } from "../constants/keys"

type Category = {
  id: string
  name: string
  image: string
}

type CatContextType = {
  isLoadingCat: boolean
  isErrorCat: boolean
  dataCat: Category[]
}

const CatContext = createContext<CatContextType>(null!)
export function CatContextProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const { isLoading, isError, data } = useQuery({
    queryKey: [CATEGORIES_QUERY_KEY],
    queryFn: () =>
      fetch("https://api.escuelajs.co/api/v1/categories").then((res) =>
        res.json()
      ),
  })
  const convertedData =
    data &&
    data.map((item: Category) => ({
      ...item,
      id: item.id.toString(),
    }))
  let value: CatContextType = {
    isLoadingCat: isLoading,
    isErrorCat: isError,
    dataCat: convertedData,
  }

  return <CatContext.Provider value={value}>{children}</CatContext.Provider>
}
export function useCategory() {
  return React.useContext(CatContext)
}
