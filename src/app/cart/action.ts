'use server'

import { createCart, getCart } from '@/lib/db/cart'
import { revalidatePath } from 'next/cache'

export async function setProductQuantity(productId: string, quantity: number) {
  const cart = (await getCart()) ?? (await createCart())
  const itemInCart = cart.items.find((item) => item.productId === productId)

  if (quantity === 0) {
    // remove from cart if qty = 0
    if (itemInCart) {
      await prisma?.cartItem.delete({ where: { id: itemInCart.id } })
    }
  } else {
    // update to new qty
    if (itemInCart) {
      await prisma?.cartItem.update({
        where: { id: itemInCart.id },
        data: {
          quantity,
        },
      })
    } else {
      // if there are no qty, make a new item
      await prisma?.cartItem.create({
        data: {
          cartId: cart.id,
          productId,
          quantity,
        },
      })
    }
  }

  revalidatePath('/cart')
}
