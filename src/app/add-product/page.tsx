import FormSubmitButton from '@/components/FormSubmitButton'
import { authOptions } from '@/lib/authOptions'
import { prisma } from '@/lib/db/prisma'
import { error } from 'console'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'

export const metadata = {
  title: 'Add Product - Flowmazon',
}

async function addProduct(formData: FormData) {
  'use server'

  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/add-product')
  }

  const name = formData.get('name')?.toString()
  const description = formData.get('description')?.toString()
  const imageUrl = formData.get('imageUrl')?.toString()
  const price = Number(formData.get('price') || 0)

  if (!name || !description || !imageUrl || !price) {
    throw error('Missing required fields')
  }

  await prisma.product.create({
    data: {
      name,
      description,
      imageUrl,
      price,
    },
  })

  redirect('/')
}

export default async function AddProductPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/api/auth/signin?callbackUrl=/add-product')
  }

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <h1 className="mb-3 text-2xl font-bold">Add Product</h1>
        <form action={addProduct}>
          <input
            required
            type="text"
            placeholder="Name"
            className="input-bordered input mb-2 w-full"
            name="name"
          />
          <textarea
            required
            name="description"
            placeholder="Description"
            className="textarea-bordered textarea mb-2 w-full"
            rows={5}
          />
          <input
            required
            type="url"
            placeholder="Image URL"
            className="input-bordered input mb-2 w-full"
            name="imageUrl"
          />
          <input
            required
            type="number"
            placeholder="Price"
            className="input-bordered input mb-2 w-full"
            name="price"
          />
          <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
        </form>
      </div>
    </div>
  )
}
