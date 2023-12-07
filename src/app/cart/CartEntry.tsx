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

export default function CartEntry({
  product,
  quantity,
  setProductQuantity,
}: CartEntryProps) {
  const [isPending, startTransition] = useTransition()

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
      <Image
        src={product.imageUrl}
        alt={product.name}
        className="h-[200px] rounded-lg object-cover"
        width={200}
        height={200}
      />
      <div className="flex flex-col gap-2">
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
            <option>0</option>
            {quantityOptions}
          </select>
          {isPending && <span className="loading loading-spinner loading-md" />}
        </div>
        <p className="font-light">
          <span className="font-medium">Total: </span>
          {formatPriceUSD(product.price * quantity)}
        </p>
      </div>
    </div>
  )
}
