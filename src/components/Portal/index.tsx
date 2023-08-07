import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { createPortal } from "react-dom"
import { CATEGORIES_QUERY_KEY, PRODUCTS_QUERY_KEY } from "../../constants/keys"

function ModalContent({
  onClose,
  id,
  forProduct,
}: {
  onClose: VoidFunction
  id: string
  forProduct: boolean
}) {
  const queryClient = useQueryClient()
  const partialUrl: string = forProduct ? "products" : "categories"
  const deleteMutation = useMutation(
    (id: string) =>
      axios
        .delete<boolean>(`https://api.escuelajs.co/api/v1/${partialUrl}/${id}`)
        .then((resp) => resp.data),
    {
      onSuccess: (result) => {
        if (result) {
          queryClient.invalidateQueries({
            queryKey: [forProduct ? PRODUCTS_QUERY_KEY : CATEGORIES_QUERY_KEY],
          })
          alert(
            `${
              forProduct ? "Producto eliminado" : "Categoría eliminada"
            } con éxito`
          )
        }
      },
      onError: () => alert("Error"),
    }
  )

  return (
    <div className="modal">
      <div>¿Eliminar permanentemente?</div>
      <button onClick={onClose}>Cancelar</button>
      <button
        onClick={() => {
          deleteMutation.mutate(id)
          onClose()
        }}
        className="deleteButton"
      >
        Confirmar
      </button>
    </div>
  )
}

export default function Modal({
  id,
  forProduct,
}: {
  id: string
  forProduct: boolean
}) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button onClick={() => setShowModal(true)} className="deleteButton">
        Eliminar
      </button>
      {showModal &&
        createPortal(
          <ModalContent
            onClose={() => setShowModal(false)}
            id={id}
            forProduct={forProduct}
          />,
          document.getElementById("portal")!
        )}
    </>
  )
}
