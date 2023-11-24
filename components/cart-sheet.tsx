'use client'

import { Button } from './ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from './ui/sheet'
import { cn } from '@/lib/utils'
import { ShoppingCart } from 'lucide-react'
import { eczar } from './fonts'
import { useStore } from '@/contexts/store'
import ProductCard from './product-card'
import Link from 'next/link'
import EmptyCart from './empty-cart'

export default function CartSheet() {
  const { cart, allProducts } = useStore()

  const cartLength = Object.keys(cart).length || 0
  const productsInCart = allProducts.filter(p => p.id in cart)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant='success' size='lg' className='flex gap-2 w-20 px-0'>
          <ShoppingCart className='h-[1.2rem] w-[1.2rem]' />
          {cartLength}
        </Button>
      </SheetTrigger>
      <SheetContent className='w-[350px] md:min-w-[715px] p-8 md:p-12 overflow-auto'>
        {cartLength > 0 ? (
          <>
            <SheetHeader className='my-12'>
              <SheetTitle
                className={cn(
                  'text-2xl md:text-3xl font-medium flex gap-4',
                  eczar.className
                )}
              >
                <ShoppingCart className='w-8 h-8 inline-flex fill-cyan-200 text-cyan-500' />
                Your Shopping Cart
              </SheetTitle>
              <SheetDescription className='text-sm font-medium text-slate-600 dark:text-slate-200 pt-4'>
                Your cart is where magic happens! Add your favorite items,
                review your choices, and proceed to checkout.
              </SheetDescription>
            </SheetHeader>
            <div className='flex flex-col md:flex-row flex-wrap gap-6 items-center justify-between'>
              {productsInCart.map(proudct => (
                <ProductCard
                  key={proudct.id}
                  product={proudct}
                  inCartSheet={true}
                />
              ))}
            </div>
            <SheetFooter className='pt-14'>
              <SheetClose asChild>
                <Link href='/cart'>
                  <Button
                    type='submit'
                    variant='default'
                    size='lg'
                    className='w-full'
                  >
                    <ShoppingCart className='mr-2 h-4 w-4' />
                    Proceed to Checkout
                  </Button>
                </Link>
              </SheetClose>
            </SheetFooter>
          </>
        ) : (
          <EmptyCart inCartSheet={true} />
        )}
      </SheetContent>
    </Sheet>
  )
}
