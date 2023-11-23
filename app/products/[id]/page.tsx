import CartButton from '@/components/cart-button'
import { eczar } from '@/components/fonts'
import ProductCard from '@/components/product-card'
import ProductCardSkeleton from '@/components/product-card-skeleton'
import { Button } from '@/components/ui/button'
import { getProductByCategory, getProductById } from '@/lib/store-service'
import { Product } from '@/lib/types'
import { cn } from '@/lib/utils'
import { ArrowLeft, Bus, DollarSign, ShoppingBasket, Star } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Suspense } from 'react'

export default async function Page({ params }: { params: { id: string } }) {
  const product: Product = await getProductById(Number(params.id))
  const categoryProducts: Product[] = await getProductByCategory(
    product.category
  )

  return (
    <section className='mb-8'>
      <Link href='/' className='flex gap-3 items-center font-medium'>
        <ArrowLeft className='w-5 h-5' />
        Home
      </Link>
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
            <p className='flex items-center mt-6 font-bold'>
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
            <p className='mt-6 text-sm text-slate-600 dark:text-slate-200 leading-6'>
              {product.description}
            </p>
          </section>
          <section className='fixed xl:static bottom-0 flex justify-center xl:justify-start items-end w-[94%] xl:w-full mx-auto gap-6 py-3 bg-background z-10'>
            <div className='basis-48'>
              <CartButton productId={product.id} />
            </div>
            <Button variant='default' size='lg' className='basis-48'>
              Buy now
            </Button>
          </section>
        </div>
      </section>
      <div className='flex flex-col lg:flex-row mt-16 lg:mt-32 gap-12 lg:gap-24'>
        <section className='basis-1/2'>
          <Bus className='h-8 w-8' />
          <h4 className='text-lg md:text-xl font-bold mt-2'>Free Shipping</h4>
          <p className='text-sm text-slate-600 dark:text-slate-200 mt-5 leading-6'>
            We&apos;re delighted to offer you complimentary shipping on every order.
            Enjoy the convenience of free delivery, making your shopping
            experience even better.
          </p>
        </section>
        <section className='bg-accent p-8 rounded-3xl basis-1/2'>
          <h4 className='text-lg md:text-xl font-bold mt-2'>Why Snapshop?</h4>
          <ul className='mt-5 list-disc leading-7 list-inside'>
            <li>Fast and Free Shipping</li>
            <li>24/7 Customer Support</li>
            <li>Seamless Shopping Experience</li>
            <li>Quality Assurance</li>
            <li>Easy Returns</li>
          </ul>
        </section>
      </div>
      <section className='flex mt-16 md:mt-32 flex-col'>
        <h2
          className={cn(
            'text-2xl md:text-3xl font-medium flex items-start justify-center md:justify-start gap-3',
            eczar.className
          )}
        >
          <ShoppingBasket className='w-7 h-7 text-cyan-500' />
          Explore Similar Products
        </h2>
        <p className='text-sm font-medium mt-4 mb-12 text-slate-600 dark:text-slate-200 text-center md:text-left'>
          Find the perfect match for your preferences and needs.
        </p>
        <Suspense
          fallback={
            <div className='flex flex-col md:flex-row flex-wrap gap-6 items-center justify-between'>
              {new Array(5).fill(null).map((item, index) => (
                <ProductCardSkeleton key={index} />
              ))}
            </div>
          }
        >
          <div className='flex flex-col md:flex-row flex-wrap gap-6 items-center justify-between'>
            {categoryProducts.map((proudct: Product) => (
              <ProductCard key={proudct.id} product={proudct} />
            ))}
          </div>
        </Suspense>
      </section>
    </section>
  )
}
