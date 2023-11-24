'use client'

import { BASE_URL, getProductsByCategory } from '@/lib/store-service'
import { Product } from '@/lib/types'
import useSWR from 'swr'
import ProductCard from './product-card'
import ProductCardSkeleton from './product-card-skeleton'

type CategoryProductsWrapperProps = {
  category: string
}

export default function CategoryProductsWrapper({
  category
}: CategoryProductsWrapperProps) {
  const { data, error, isLoading } = useSWR<Product[], Error>(
    `${BASE_URL}/products/category`,
    (url: string) => getProductsByCategory(url, category)
  )

  if (error) {
    console.error(error)
  }

  return (
    <div className='flex flex-col md:flex-row flex-wrap gap-6 items-center justify-between'>
      {isLoading
        ? new Array(5)
            .fill(null)
            .map((item, index) => <ProductCardSkeleton key={index} />)
        : data?.map(proudct => (
            <ProductCard key={proudct.id} product={proudct} />
          ))}
    </div>
  )
}
