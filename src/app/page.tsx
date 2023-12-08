import PaginationBar from '@/components/PaginationBar'
import ProductCard from '@/components/ProductCard'
import prisma from '@/lib/db/prisma'
import Image from 'next/image'
import Link from 'next/link'

interface HomeProps {
  searchParams: { page: string }
}

export default async function Home({
  searchParams: { page = '1' },
}: HomeProps) {
  const currentPage = parseInt(page)

  const pageSize = 6
  const heroItemCount = 1

  const totalItemCount = await prisma.product.count()

  const totalPages = Math.ceil((totalItemCount - heroItemCount) / pageSize)

  const products = await prisma.product.findMany({
    orderBy: {
      id: 'desc',
    },
    skip:
      (currentPage - 1) * pageSize + (currentPage === 1 ? 0 : heroItemCount),
    take: pageSize + (currentPage === 1 ? heroItemCount : 0),
  })

  return (
    <div className="min-h-screen">
      {currentPage === 1 && (
        <div className="hero rounded-xl bg-base-200">
          <div className="hero-content flex-col lg:flex-row">
            <Image
              src={products[0].imageUrl}
              alt={products[0].name}
              width={400}
              height={800}
              className="w-full max-w-sm rounded-lg shadow-2xl"
              priority
            />
            <div>
              <h1 className="justify-start text-5xl font-bold">
                {products[0].name}
              </h1>
              <p className="py-6">{products[0].description}</p>
              <Link
                href={`/products/${products[0].id}`}
                className="btn btn-primary"
              >
                Check it out
              </Link>
            </div>
          </div>
        </div>
      )}
      <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {(currentPage === 1 ? products.slice(1) : products).map(
          (product, i) => (
            <ProductCard key={product.id} product={product} />
          ),
        )}
      </div>
      {totalPages > 1 && (
        <div className="mt-4 flex justify-center">
          <PaginationBar currentPage={currentPage} totalPage={totalPages} />
        </div>
      )}
    </div>
  )
}
