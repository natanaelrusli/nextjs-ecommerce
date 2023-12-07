import { getCart } from '@/lib/db/cart'
import CartEntry from './CartEntry'
import { setProductQuantity } from './action'

export const metadata = {
  title: 'Your Cart - Flowmazon',
}

export default async function CartPage() {
  const cart = await getCart()

  return (
    <div className="p-4">
      <h1 className="mb-6 text-3xl font-bold">Shopping Cart</h1>
      <div className="flex flex-col gap-4">
        {cart?.items.map((item) => (
          <CartEntry
            key={item.id}
            product={item.product}
            quantity={item.quantity}
            setProductQuantity={setProductQuantity}
          />
        ))}
      </div>
    </div>
  )
}
