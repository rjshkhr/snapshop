import CategoryProductsWrapper from '@/components/category-products-wrapper'
import { eczar } from '@/components/fonts'
import ProductDetails from '@/components/product-details'
import WhySnapshop from '@/components/why-snapshop'
import { getProductById } from '@/lib/store-service'
import { Product } from '@/lib/types'
import { cn } from '@/lib/utils'
import { ArrowLeft, Bus, ShoppingBasket } from 'lucide-react'
import { Metadata } from 'next'
import Link from 'next/link'

type Props = {
  params: {
    id: string
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product: Product = await getProductById(Number(params.id))

  return {
    title: product.title
  }
}

export default async function ProductPage({ params }: Props) {
  const product: Product = await getProductById(Number(params.id))

  return (
    <section className='mb-8'>
      <Link href='/' className='flex gap-3 items-center font-medium'>
        <ArrowLeft className='w-5 h-5' />
        Home
      </Link>
      <ProductDetails product={product} />
      <div className='flex flex-col lg:flex-row mt-16 lg:mt-32 gap-12 lg:gap-24'>
        <section className='basis-1/2'>
          <Bus className='h-8 w-8' />
          <h4 className='text-lg md:text-xl font-bold mt-2'>Free Shipping</h4>
          <p className='text-sm text-slate-600 dark:text-slate-200 mt-5 leading-6'>
            We&apos;re delighted to offer you complimentary shipping on every
            order. Enjoy the convenience of free delivery, making your shopping
            experience even better.
          </p>
        </section>
        <div className='basis-1/2'>
          <WhySnapshop />
        </div>
      </div>
      <section className='flex mt-16 md:mt-32 flex-col'>
        <h2
          className={cn(
            'text-2xl md:text-3xl font-medium flex items-start gap-3',
            eczar.className
          )}
        >
          <ShoppingBasket className='w-7 h-7 text-cyan-500' />
          Explore Similar Products
        </h2>
        <p className='text-sm font-medium mt-4 mb-12 text-slate-600 dark:text-slate-200'>
          Find the perfect match for your preferences and needs.
        </p>
        <CategoryProductsWrapper category={product.category} />
      </section>
    </section>
  )
}
