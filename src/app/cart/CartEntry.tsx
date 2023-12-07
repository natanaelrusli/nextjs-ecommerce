'use client'

import Image from 'next/image'
import { Product } from '@prisma/client'
import { formatPriceUSD } from '@/lib/format'
import { useTransition } from 'react'

interface CartEntryProps {
  product: Product
  quantity: number
  setProductQuantity: (productId: string, quantity: number) => Promise<void>
}

const trashIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="25"
    height="25"
    viewBox="0 0 30 30"
  >
    <path d="M 13 3 A 1.0001 1.0001 0 0 0 11.986328 4 L 6 4 A 1.0001 1.0001 0 1 0 6 6 L 24 6 A 1.0001 1.0001 0 1 0 24 4 L 18.013672 4 A 1.0001 1.0001 0 0 0 17 3 L 13 3 z M 6 8 L 6 24 C 6 25.105 6.895 26 8 26 L 22 26 C 23.105 26 24 25.105 24 24 L 24 8 L 6 8 z"></path>
  </svg>
)

export default function CartEntry({
  product,
  quantity,
  setProductQuantity,
}: CartEntryProps) {
  const [isPending, startTransition] = useTransition()

  const handleDeleteModal = () => {
    const modalElement = document.getElementById(
      'deleteModal',
    ) as HTMLDialogElement
    modalElement?.showModal()
  }

  const handleRemoveItem = async () => {
    startTransition(async () => {
      await setProductQuantity(product.id, 0)
    })
  }

  const quantityOptions: JSX.Element[] = []
  for (let i = 1; i <= 99; i++) {
    quantityOptions.push(
      <option value={i} key={i}>
        {i}
      </option>,
    )
  }

  return (
    <div
      key={product.id}
      className="flex w-full items-center gap-4 border-b-2 border-gray-300 py-4"
    >
      <dialog id="deleteModal" className="modal">
        <div className="modal-box">
          <h3 className="text-lg font-bold">Remove from Cart</h3>
          <p className="py-4">
            Are you sure want to remove this item from cart?
          </p>
          <div className="modal-action">
            <form method="dialog">
              <div className="flex items-center gap-3 align-middle">
                <button className="btn">No, go back</button>
                <button className="btn btn-error" onClick={handleRemoveItem}>
                  Yes, remove item
                </button>
              </div>
            </form>
          </div>
        </div>
      </dialog>
      <Image
        src={product.imageUrl}
        alt={product.name}
        className="h-[200px] rounded-lg object-cover"
        width={200}
        height={200}
      />
      <div className="flex flex-1 flex-col gap-2">
        <p className="text-lg font-medium">{product.name}</p>
        <p className="font-light">
          <span className="font-medium">Price: </span>
          {formatPriceUSD(product.price)}
        </p>
        <div className="my-1 flex items-center gap-2">
          Quantity:
          <select
            className="select select-bordered w-full max-w-[80px]"
            defaultValue={quantity}
            onChange={(e) => {
              const newQuantity = parseInt(e.currentTarget.value)

              startTransition(async () => {
                await setProductQuantity(product.id, newQuantity)
              })
            }}
            disabled={isPending}
          >
            {quantityOptions}
          </select>
          {isPending && <span className="loading loading-spinner loading-md" />}
        </div>
        <p className="font-light">
          <span className="font-medium">Total: </span>
          {formatPriceUSD(product.price * quantity)}
        </p>
      </div>
      <div
        className="flex cursor-pointer self-center fill-red-500 hover:fill-red-800"
        onClick={handleDeleteModal}
      >
        {trashIcon}
      </div>
    </div>
  )
}
