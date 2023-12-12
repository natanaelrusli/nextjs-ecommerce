import PriceTag from '@/components/PriceTag'
import { prisma } from '@/lib/db/prisma'
import { Metadata } from 'next'
import Image from 'next/image'
import { notFound } from 'next/navigation'
import { cache } from 'react'
import AddToCartButton from './AddToCartButton'
import { addProductQuantity, getProvinceData } from './actions'
import { getCart, getItemById } from '@/lib/db/cart'
import { OngkirResponseData } from '@/types'

interface ProductPageProps {
  params: {
    id: string
  }
}

const getProduct = cache(async (id: string) => {
  const product = await prisma.product.findUnique({
    where: { id },
  })
  if (!product) notFound()
  return product
})

export async function generateMetadata({
  params: { id },
}: ProductPageProps): Promise<Metadata> {
  const product = await getProduct(id)

  return {
    title: product.name + ' - Flowmazon',
    description: product?.description,
    openGraph: {
      images: [{ url: product.imageUrl }],
    },
  }
}

export default async function ProductPage({
  params: { id },
}: ProductPageProps) {
  const product = await getProduct(id)
  const cart = await getCart()

  const productInCart = await getItemById(cart, id)
  const ongkirData: OngkirResponseData = await getProvinceData()

  return (
    <div className="my-6 flex min-h-full flex-col gap-4 lg:flex-row lg:items-center">
      <Image
        src={product.imageUrl}
        alt={product.name}
        width={500}
        height={500}
        className="rounded-lg"
        priority
      />
      <div>
        <h1 className="text-5xl font-bold">{product.name}</h1>
        <PriceTag price={product.price} className="mt-4" />
        <p className="py-6">{product.description}</p>
        {productInCart && (
          <span className="badge badge-outline mb-4 p-3">
            Product In Cart: {productInCart.quantity}
          </span>
        )}
        <div className="mb-4">
          <p className="mb-3 font-bold">Check Delivery Cost</p>
          <div className="flex gap-2">
            <select
              name="ongkirSelect"
              id="ongkirSelect"
              className="select-bordered select w-full max-w-xs"
            >
              {ongkirData.rajaongkir.results.map((data) => (
                <option key={data.province_id}>{data.province}</option>
              ))}
            </select>
            <select
              name="ongkirSelect"
              id="ongkirSelect"
              className="select-bordered select w-full max-w-xs"
            >
              {ongkirData.rajaongkir.results.map((data) => (
                <option key={data.province_id}>{data.province}</option>
              ))}
            </select>
          </div>
        </div>
        <AddToCartButton
          addProductQuantity={addProductQuantity}
          productId={product.id}
        />
      </div>
    </div>
  )
}
