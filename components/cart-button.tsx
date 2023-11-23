'use client'

import { useStore, useStoreDispatch } from '@/contexts/store'
import { Button } from '@/components/ui/button'
import { CartStatus } from '@/lib/constants'
import { ListPlus, Loader2 } from 'lucide-react'
import { MouseEvent, useState } from 'react'
import { updateCart } from '@/lib/store-service'
import { useToast } from '@/components/ui/use-toast'

type CartButtonProps = {
  productId: number
}

export default function CartButton({ productId }: CartButtonProps) {
  const { cart } = useStore()
  const dispatch = useStoreDispatch()
  const { toast } = useToast()
  const [cartUpdateStatus, setCartUpdateStatus] = useState(CartStatus.IDLE)

  async function handleAddToCart(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()

    try {
      setCartUpdateStatus(CartStatus.ADDING)
      await updateCart(cart)
      dispatch({ type: 'added_to_cart', value: productId })
      if (!(productId in cart)) {
        toast({
          title: 'Product added to the cart'
        })
      }
    } catch (exception) {
      toast({
        variant: 'destructive',
        title: 'Failed to add to the cart'
      })
    } finally {
      setCartUpdateStatus(CartStatus.IDLE)
    }
  }

  async function handleRemoveFromCart(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()

    try {
      setCartUpdateStatus(CartStatus.REMOVING)
      await updateCart(cart)
      dispatch({ type: 'removed_from_cart', value: productId })
      if (cart[productId] === 1) {
        toast({
          title: 'Product removed from the cart'
        })
      }
    } catch (exception) {
      toast({
        variant: 'destructive',
        title: 'Failed to remove from the cart'
      })
    } finally {
      setCartUpdateStatus(CartStatus.IDLE)
    }
  }

  if (productId in cart) {
    return (
      <div className='w-full flex justify-between items-center gap-2'>
        <Button
          className='text-xl w-16 p-0'
          variant='default'
          size='lg'
          onClick={handleRemoveFromCart}
          disabled={cartUpdateStatus !== CartStatus.IDLE}
        >
          {cartUpdateStatus === CartStatus.REMOVING ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            '-'
          )}
        </Button>
        <p className='bg-background rounded-3xl w-16 h-11 text-lg flex justify-center items-center font-medium'>
          {cart[productId]}
        </p>
        <Button
          className='text-xl w-16 p-0'
          variant='default'
          size='lg'
          disabled={cartUpdateStatus !== CartStatus.IDLE}
          onClick={handleAddToCart}
        >
          {cartUpdateStatus === CartStatus.ADDING ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            '+'
          )}
        </Button>
      </div>
    )
  } else {
    return (
      <Button
        className='w-full bg-background hover:bg-background/80 shadow-none'
        variant='secondary'
        size='lg'
        onClick={handleAddToCart}
        disabled={cartUpdateStatus !== CartStatus.IDLE}
      >
        {cartUpdateStatus === CartStatus.ADDING ? (
          <Loader2 className='mr-2 h-4 w-4 animate-spin text-cyan-500' />
        ) : (
          <ListPlus className='mr-2 h-4 w-4' />
        )}
        Add to cart
      </Button>
    )
  }
}
