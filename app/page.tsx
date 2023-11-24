'use client'

import { useEffect } from 'react'
import { useStoreDispatch } from '@/contexts/store'
import { BASE_URL, fetcher } from '@/lib/store-service'
import { TrendingUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { eczar } from '@/components/fonts'
import ProductCard from '@/components/product-card'
import ProductCardSkeleton from '@/components/product-card-skeleton'
import { Product } from '@/lib/types'
import useSWR from 'swr'

export default function HomePage() {
  const dispatch = useStoreDispatch()
  const { data, error, isLoading } = useSWR<Product[], Error>(
    `${BASE_URL}/products`,
    fetcher
  )

  useEffect(() => {
    dispatch({ type: 'fetched_products', products: data || [] })
  }, [data, dispatch])

  if (error) {
    console.error(error)
  }

  function displayProducts() {
    if (isLoading) {
      return new Array(10)
        .fill(null)
        .map((item, index) => <ProductCardSkeleton key={index} />)
    } else {
      return data?.map((proudct: Product) => (
        <ProductCard key={proudct.id} product={proudct} />
      ))
    }
  }

  return (
    <>
      <h2
        className={cn(
          'text-2xl md:text-3xl font-medium flex gap-4',
          eczar.className
        )}
      >
        <TrendingUp className='w-8 h-8 text-cyan-500' />
        Exclusive Collections
      </h2>
      <p className='text-sm font-medium mt-4 mb-12 text-slate-600 dark:text-slate-200'>
        Enjoy unbeatable prices on your favorite items, but hurry — these
        special deals won&apos;t last forever!
      </p>
      <div className='flex flex-col md:flex-row flex-wrap gap-6 items-center justify-between'>
        {displayProducts()}
      </div>
    </>
  )
}
