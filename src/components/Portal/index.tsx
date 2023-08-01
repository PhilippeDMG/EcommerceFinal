import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { useState } from "react"
import { createPortal } from "react-dom"
import { CATEGORIES_QUERY_KEY } from "../../constants/keys"
import styles from "./styles.module.css"

function ModalContent({ onClose, id }: { onClose: VoidFunction; id: string }) {
  const queryClient = useQueryClient()
  const deleteMutation = useMutation(
    (id: string) =>
      axios
        .delete<boolean>(`https://api.escuelajs.co/api/v1/categories/${id}`)
        .then((resp) => resp.data),
    {
      onSuccess: (result) => {
        if (result) {
          queryClient.invalidateQueries({ queryKey: [CATEGORIES_QUERY_KEY] })
          console.log("exito")
        }
      },
      onError: (e) => console.log(e),
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

export default function Modal({ id }: { id: string }) {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className={`deleteButton ${styles.algo}`}
      >
        Eliminar
      </button>
      {showModal &&
        createPortal(
          <ModalContent onClose={() => setShowModal(false)} id={id} />,
          document.getElementById("portal")!
        )}
    </>
  )
}
