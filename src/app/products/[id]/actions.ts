'use server'

import { createCart, getCart } from '@/lib/db/cart'
import prisma from '@/lib/db/prisma'
import { revalidatePath } from 'next/cache'

export async function addProductQuantity(productId: string) {
  // await new Promise((r) => setTimeout(r, 3000))
  const cart = (await getCart()) ?? (await createCart())

  const itemInCart = cart.items.find((item) => item.productId === productId)

  if (itemInCart) {
    await prisma.cartItem.update({
      where: {
        id: itemInCart.id,
      },
      data: {
        quantity: {
          increment: 1,
        },
      },
    })
  } else {
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity: 1,
      },
    })
  }

  revalidatePath('/products/[id]')
}
