'use client'

import { Product } from '@/lib/types'
import { cn } from '@/lib/utils'
import { DollarSign, ShoppingCart, Star } from 'lucide-react'
import Image from 'next/image'
import { eczar } from './fonts'
import { Button } from './ui/button'
import CartUpdateButton from './cart-update-button'
import { useStore, useStoreDispatch } from '@/contexts/store'
import { useRouter } from 'next/navigation'

type ProductDetailsProps = {
  product: Product
}

export default function ProductDetails({ product }: ProductDetailsProps) {
  const { cart } = useStore()
  const dispatch = useStoreDispatch()
  const router = useRouter()

  function handleBuyNow() {
    if (!(product.id in cart)) {
      dispatch({ type: 'added_to_cart', productId: product.id })
    }

    router.push('/cart')
  }

  return (
    <section className='flex justify-center flex-col xl:flex-row gap-12 xl:gap-24 mt-8 md:mt-12'>
      <div className='h-96 flex relative w-[100%] items-center justify-center bg-white rounded-3xl xl:basis-1/2'>
        <Image
          className='object-contain max-w-full max-h-full p-6'
          src={product.image}
          alt={product.title}
          fill
          priority
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
        />
      </div>
      <div className='lg:flex items-start justify-center gap-24 xl:gap-16 xl:flex-col xl:basis-1/2'>
        <div className='flex flex-col items-start justify-start basis-1/2'>
          <h2 className='text-xl md:text-2xl font-medium'>{product.title}</h2>
          <p className='text-sm font-semibold text-slate-600 dark:text-slate-200 mt-3 capitalize'>
            {product.category}
          </p>
          <p className='flex items-center font-bold mt-6'>
            <DollarSign className='h-5 w-5' />
            <span className='text-2xl md:text-3xl'>{product.price}</span>
          </p>
          <p className='flex items-center gap-2 text-sm mt-8'>
            <Star className='h-4 w-4 fill-yellow-200 text-yellow-500' />
            <span className='font-semibold text-slate-600 dark:text-slate-400'>
              ({product.rating.rate} rating) • {product.rating.count} reviews
            </span>
          </p>
        </div>
        <section className='mt-12 lg:mt-0 basis-1/2'>
          <h3
            className={cn('text-xl md:text-2xl font-medium', eczar.className)}
          >
            Description
          </h3>
          <div className='h-[2px] w-full bg-gray-100 dark:bg-gray-800 mt-2' />
          <p className='mt-6 text-slate-600 dark:text-slate-200 leading-7'>
            {product.description}
          </p>
        </section>
        <section className='fixed xl:static bottom-0 flex justify-center xl:justify-start items-end w-[94%] xl:w-full mx-auto gap-3 py-3 bg-background z-10'>
          <div className='basis-48'>
            <CartUpdateButton productId={product.id} />
          </div>
          <Button
            variant='default'
            size='lg'
            className='basis-48'
            onClick={handleBuyNow}
          >
            <ShoppingCart className='mr-2 w-4 h-4' />
            Buy now
          </Button>
        </section>
      </div>
    </section>
  )
}
