import Link from 'next/link'

export default function NavigationBar() {
  return (
    <div className="navbar sticky top-0 z-10 bg-base-100 shadow-md">
      <div className="container m-auto">
        <div className="flex-1">
          <Link href={'/'} className="btn-ghost btn text-xl">
            Flowmazon
          </Link>
        </div>
        <div className="flex-0">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href={'/'}>Home</Link>
            </li>
            <li>
              <Link href={'/add-product'}>+ New Product</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
