'use server'

import { createCart, getCart } from '@/lib/db/cart'
import { prisma } from '@/lib/db/prisma'
import { env } from '@/lib/env'
import { OngkirResponseData } from '@/types'
import { revalidatePath } from 'next/cache'

export async function addProductQuantity(productId: string) {
  // await new Promise((r) => setTimeout(r, 3000))
  const cart = (await getCart()) ?? (await createCart())

  const itemInCart = cart.items.find((item) => item.productId === productId)

  if (itemInCart) {
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: {
          update: {
            where: { id: itemInCart.id },
            data: { quantity: { increment: 1 } },
          },
        },
      },
    })
  } else {
    await prisma.cart.update({
      where: { id: cart.id },
      data: {
        items: {
          create: {
            productId,
            quantity: 1,
          },
        },
      },
    })
  }

  revalidatePath('/products/[id]')
}

export async function getProvinceData(): Promise<OngkirResponseData> {
  const response = await fetch('https://api.rajaongkir.com/starter/province', {
    cache: 'force-cache',
    headers: {
      key: env.RAJAONGKIR_API_KEY,
    },
  })
  const ongkirData: OngkirResponseData = await response.json()

  return ongkirData
}
