'use client'

import { useStore, useStoreDispatch } from '@/contexts/store'
import { Button } from './ui/button'
import { CartStatus } from '@/lib/constants'
import { ListPlus, Loader2, PackagePlus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { updateCart } from '@/lib/store-service'
import { useToast } from './ui/use-toast'

type CartUpdateButtonProps = {
  productId: number
}

export default function CartUpdateButton({ productId }: CartUpdateButtonProps) {
  const { cart } = useStore()
  const dispatch = useStoreDispatch()
  const { toast } = useToast()
  const [cartUpdateStatus, setCartUpdateStatus] = useState(CartStatus.IDLE)

  async function handleAddToCart() {
    try {
      setCartUpdateStatus(CartStatus.ADDING)
      await updateCart(cart)

      dispatch({
        type: 'added_to_cart',
        value: productId
      })

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

  async function handleRemoveFromCart() {
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
      <div className='w-full flex justify-between items-center gap-1'>
        <Button
          className='text-xl w-14 p-0'
          variant='default'
          size='lg'
          onClick={handleRemoveFromCart}
          disabled={cartUpdateStatus !== CartStatus.IDLE}
        >
          {cartUpdateStatus === CartStatus.REMOVING ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            <Trash2 className='h-4 w-4' />
          )}
        </Button>
        <p className='w-16 h-11 rounded-3xl bg-background flex justify-center items-center border border-input'>
          {cart[productId]}
        </p>
        <Button
          className='text-xl w-14 p-0'
          variant='default'
          size='lg'
          type='submit'
          disabled={cartUpdateStatus !== CartStatus.IDLE}
          onClick={handleAddToCart}
        >
          {cartUpdateStatus === CartStatus.ADDING ? (
            <Loader2 className='h-4 w-4 animate-spin' />
          ) : (
            <PackagePlus className='h-4 w-4' />
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
