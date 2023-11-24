'use client'

import { Product } from '@/lib/types'
import { DollarSign, Star } from 'lucide-react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import CartUpdateButton from './cart-update-button'
import { SheetClose } from './ui/sheet'

type ProductCardProps = {
  product: Product
  inCartSheet?: boolean
}

export default function ProductCard({
  product,
  inCartSheet
}: ProductCardProps) {
  const router = useRouter()

  function displayProductTitle() {
    return (
      <div
        className='flex flex-col cursor-pointer'
        onClick={() => router.push(`/products/${product.id}`)}
      >
        <p className='text-lg font-medium whitespace-nowrap overflow-hidden text-ellipsis'>
          {product.title}
        </p>
        <p className='text-sm font-medium text-slate-600 dark:text-slate-200 mt-1 capitalize'>
          {product.category}
        </p>
      </div>
    )
  }

  return (
    <section className='p-6 rounded-3xl w-72 bg-accent hover:shadow-sm'>
      {inCartSheet ? (
        <SheetClose asChild>{displayProductTitle()}</SheetClose>
      ) : (
        <>
          <div className='h-44 flex relative items-center justify-center bg-white rounded-3xl mb-6'>
            <Image
              className='object-contain max-w-full max-h-full p-6 cursor-pointer'
              src={product.image}
              alt={product.title}
              fill
              priority
              sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              onClick={() => router.push(`/products/${product.id}`)}
            />
          </div>
          {displayProductTitle()}
        </>
      )}
      <div className='flex justify-between items-center mt-8 mb-6'>
        <p className='flex items-center'>
          <DollarSign className='h-4 w-4' />
          <span className='font-semibold text-lg'>{product.price}</span>
        </p>
        <p className='flex items-center gap-2 text-sm'>
          <Star className='h-4 w-4 fill-yellow-200 text-yellow-500' />
          <span className='font-semibold'>{product.rating.rate}</span>
        </p>
      </div>
      <CartUpdateButton productId={product.id} />
    </section>
  )
}
