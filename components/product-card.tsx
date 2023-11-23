import { Product } from '@/lib/types'
import { DollarSign, ListPlus, Loader2, Star } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useStore, useStoreDispatch } from '@/contexts/store'
import { useToast } from './ui/use-toast'
import { updateCart } from '@/lib/store-service'
import { MouseEvent, useState } from 'react'
import { CartStatus } from '@/lib/constants'
import { useRouter } from 'next/navigation'

type ProductCardProps = {
  product: Product
  imageHidden?: boolean
}

export default function ProductCard({
  product,
  imageHidden
}: ProductCardProps) {
  const { cart } = useStore()
  const dispatch = useStoreDispatch()
  const { toast } = useToast()
  const router = useRouter()
  const [cartUpdateStatus, setCartUpdateStatus] = useState(CartStatus.IDLE)

  async function handleAddToCart(e: MouseEvent<HTMLButtonElement>) {
    e.stopPropagation()

    try {
      setCartUpdateStatus(CartStatus.ADDING)
      await updateCart(cart)
      dispatch({ type: 'added_to_cart', value: product.id })
      toast({
        title: 'Product added to the cart'
      })
    } catch (exception) {
      console.log('exception', exception)
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
      dispatch({ type: 'removed_from_cart', value: product.id })
      toast({
        title: 'Product removed from the cart'
      })
    } catch (exception) {
      console.log('exception', exception)
      toast({
        variant: 'destructive',
        title: 'Failed to remove from the cart'
      })
    } finally {
      setCartUpdateStatus(CartStatus.IDLE)
    }
  }

  function displayCartButton() {
    if (product.id in cart) {
      return (
        <div className='flex justify-between items-center mt-6 gap-3'>
          <Button
            className='text-2xl w-20 p-0'
            variant='destructive'
            size='lg'
            onClick={handleRemoveFromCart}
            disabled={cartUpdateStatus !== CartStatus.IDLE}
          >
            {cartUpdateStatus === CartStatus.REMOVING && (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            )}
            -
          </Button>
          <p className='text-lg w-6 text-center font-medium'>
            {cart[product.id]}
          </p>
          <Button
            className='text-2xl w-20 p-0'
            variant='success'
            size='lg'
            disabled={cartUpdateStatus !== CartStatus.IDLE}
            onClick={handleAddToCart}
          >
            {cartUpdateStatus === CartStatus.ADDING && (
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
            )}
            +
          </Button>
        </div>
      )
    } else {
      return (
        <Button
          className='mt-6 w-full bg-background hover:bg-background/80'
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

  return (
    <section className='p-6 rounded-3xl w-72 bg-accent hover:shadow-sm'>
      {!imageHidden && (
        <div className='h-44 flex relative items-center justify-center bg-white rounded-3xl mb-6'>
          <Image
            className='object-contain max-w-full max-h-full p-6 cursor-pointer'
            src={product.image}
            alt={product.description}
            fill
            priority
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            onClick={() => router.push(`/products/${product.id}`)}
          />
        </div>
      )}
      <div
        className='flex flex-col cursor-pointer'
        onClick={() => router.push(`/products/${product.id}`)}
      >
        <p className='text-lg font-medium whitespace-nowrap overflow-hidden text-ellipsis'>
          {product.title}
        </p>
        <p className='text-sm font-medium text-slate-600 dark:text-slate-200 mt-1 capitalize'>
          {product.category}
        </p>
      </div>
      <div className='flex justify-between items-center mt-8'>
        <p className='flex items-center'>
          <DollarSign className='h-4 w-4' />
          <span className='font-semibold text-lg'>{product.price}</span>
        </p>
        <p className='flex items-center gap-2 text-sm'>
          <Star className='h-4 w-4 fill-yellow-200 text-yellow-500' />
          <span className='font-semibold'>{product.rating.rate}</span>
        </p>{' '}
      </div>
      {displayCartButton()}
    </section>
  )
}
