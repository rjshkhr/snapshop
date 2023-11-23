'use client'

import { Button } from '@/components/ui/button'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import { ShoppingCart } from 'lucide-react'
import { eczar } from './fonts'
import { useStore } from '@/contexts/store'
import ProductCard from './product-card'
import { Product } from '@/lib/types'

export default function Cart() {
  const { cart, allProducts } = useStore()

  const cartLength = Object.keys(cart).length || 0

  const productsInCart = allProducts.filter(p => p.id in cart)

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant='default'
          size='lg'
          className='bg-cyan-500 hover:bg-cyan-500/80 text-white flex gap-2 w-20 px-0'
        >
          <ShoppingCart className='h-[1.2rem] w-[1.2rem]' />
          {cartLength}
        </Button>
      </SheetTrigger>
      <SheetContent className='w-[350px] md:min-w-[720px] p-8 md:p-12 overflow-auto'>
        <SheetHeader className='my-8'>
          <SheetTitle
            className={cn(
              'text-2xl md:text-3xl font-medium flex gap-4',
              eczar.className
            )}
          >
            <ShoppingCart className='w-8 h-8 inline-flex fill-cyan-200 text-cyan-500' />
            Your Shopping Cart
          </SheetTitle>
          <SheetDescription className='text-sm font-medium text-slate-600 dark:text-slate-200 pt-2'>
            Your cart is where magic happens! Add your favorite items, review
            your choices, and proceed to checkout.
          </SheetDescription>
        </SheetHeader>
        <div className='flex flex-col md:flex-row flex-wrap gap-6 items-center justify-between'>
          {productsInCart.map((proudct: Product) => (
            <ProductCard key={proudct.id} product={proudct} />
          ))}
        </div>
        <SheetFooter className='pt-10'>
          <SheetClose asChild>
            {cartLength > 0 && (
              <Button type='submit' variant='default' size='lg'>
                Checkout
              </Button>
            )}
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
