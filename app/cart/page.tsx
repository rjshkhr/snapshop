'use client'

import EmptyCart from '@/components/empty-cart'
import { eczar } from '@/components/fonts'
import ProductCard from '@/components/product-card'
import { Button } from '@/components/ui/button'
import { useToast } from '@/components/ui/use-toast'
import { useStore, useStoreDispatch } from '@/contexts/store'
import { cn } from '@/lib/utils'
import { ArrowLeft, ShoppingCart } from 'lucide-react'
import Link from 'next/link'

export default function CartPage() {
  const { cart, allProducts } = useStore()
  const dispatch = useStoreDispatch()
  const { toast } = useToast()

  const cartLength = Object.keys(cart).length || 0
  const productsInCart = allProducts.filter(p => p.id in cart)

  const cartTotal = Number(
    productsInCart
      .reduce((total, prev) => prev.price * cart[prev.id] + total, 0)
      .toFixed(2)
  )

  const cartDiscount = Number(((8 / 100) * cartTotal).toFixed())
  const tax = 2
  const orderTotal = Number((cartTotal + tax - cartDiscount).toFixed())

  function handlePlaceOrder() {
    dispatch({ type: 'order_placed' })

    toast({
      title: 'Order successfully placed!'
    })
  }

  if (cartLength === 0) {
    return <EmptyCart />
  }

  return (
    <section>
      <Link href='/' className='flex gap-3 items-center font-medium'>
        <ArrowLeft className='w-5 h-5' />
        Home
      </Link>
      <div className='flex flex-col mt-8 lg:mt-12 lg:flex-row gap-16'>
        <div className='basis-2/3'>
          <h2
            className={cn(
              'text-2xl md:text-3xl font-medium flex gap-4',
              eczar.className
            )}
          >
            <ShoppingCart className='w-8 h-8 inline-flex fill-cyan-200 text-cyan-500' />
            Review Items in Your Cart
          </h2>
          <p className='text-sm font-medium text-slate-600 dark:text-slate-200 pt-4'>
            Take a moment to review the items in your cart before proceeding to
            checkout.
          </p>
          <div className='flex flex-col md:flex-row flex-wrap gap-6 items-center justify-center lg:justify-start mt-12'>
            {productsInCart.map(proudct => (
              <ProductCard key={proudct.id} product={proudct} />
            ))}
          </div>
        </div>
        <div className='basis-1/3'>
          <h3 className='text-xl font-semibold'>Price Details</h3>
          <div className='flex justify-between mt-8'>
            <p className='text-slate-700 dark:text-slate-300 font-medium'>
              Cart Total
            </p>
            <p className='text-slate-700 dark:text-slate-300'>$ {cartTotal}</p>
          </div>
          <div className='flex justify-between mt-2'>
            <p className='text-slate-700 dark:text-slate-300 font-medium'>
              Cart Discount
            </p>
            <p className='text-slate-700 dark:text-slate-300'>
              $ {cartDiscount}
            </p>
          </div>
          <div className='flex justify-between mt-2'>
            <p className='text-slate-700 dark:text-slate-300 font-medium'>
              Delivery
            </p>
            <p className='text-slate-700 dark:text-slate-300'>$ 0</p>
          </div>
          <div className='flex justify-between mt-2'>
            <p className='text-slate-700 dark:text-slate-300 font-medium'>
              Tax
            </p>
            <p className='text-slate-700 dark:text-slate-300'>$ {tax}</p>
          </div>
          <div className='h-[2px] w-full bg-gray-100 dark:bg-gray-800 mt-2' />
          <div className='flex justify-between mt-6'>
            <p className='text-slate-700 dark:text-slate-300 font-medium'>
              Order Total
            </p>
            <p className='text-slate-700 dark:text-slate-300 font-bold text-right'>
              $ {orderTotal}
            </p>
          </div>
          <Button
            variant='destructive'
            size='lg'
            className='mt-12 w-full'
            onClick={handlePlaceOrder}
          >
            Place order
          </Button>
        </div>
      </div>
    </section>
  )
}
