import { getCart } from '@/lib/db/cart'
import CartEntry from './CartEntry'
import { setProductQuantity } from './action'
import { formatPriceUSD } from '@/lib/format'

export const metadata = {
  title: 'Your Cart - Flowmazon',
}

export default async function CartPage() {
  const cart = await getCart()

  return (
    <div className="flex h-full  flex-1 flex-col p-4">
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
        {!cart || (cart.items.length === 0 && <p>Your cart is empty</p>)}
        <div className="flex flex-col items-end sm:items-center">
          <p className="mb-3 font-bold">
            Total: {formatPriceUSD(cart?.subtotal || 0)}
          </p>
          <button className="btn-primary btn sm:w-[200px]">Checkout</button>
        </div>
      </div>
    </div>
  )
}
