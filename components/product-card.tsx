import { Product } from '@/lib/types'
import { DollarSign, Star } from 'lucide-react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { useStore, useStoreDispatch } from '@/contexts/store'
import { useToast } from './ui/use-toast'

type ProductCardProps = {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const { cart } = useStore()
  const dispatch = useStoreDispatch()
  const { toast } = useToast()

  function handleAddToCart() {
    dispatch({ type: 'added_to_cart', value: product.id })
    toast({
      title: 'Product added to the cart'
    })
  }

  function handleRemoveFromCart() {
    dispatch({ type: 'removed_from_cart', value: product.id })
    toast({
      title: 'Product removed from the cart'
    })
  }

  function displayCartButton() {
    if (product.id in cart) {
      return (
        <div className='flex justify-between items-center mt-6 gap-3'>
          <Button
            className='text-2xl font-bold'
            variant='destructive'
            size='lg'
            onClick={handleRemoveFromCart}
          >
            -
          </Button>
          <p className='text-xl font-bold w-6 text-center'>
            {cart[product.id]}
          </p>
          <Button
            className='text-2xl bg-green-500 text-white font-bold hover:bg-green-500/90 hover:text-white'
            variant='ghost'
            size='lg'
            onClick={handleAddToCart}
          >
            +
          </Button>
        </div>
      )
    } else {
      return (
        <Button
          className='mt-6 w-full'
          variant='default'
          size='lg'
          onClick={handleAddToCart}
        >
          Add to cart
        </Button>
      )
    }
  }

  return (
    <section className='p-6 rounded-3xl w-72 h-[26.75rem]  cursor-pointer bg-accent hover:bg-background'>
      <div className='h-44 flex relative items-center justify-center bg-white rounded-3xl'>
        <Image
          className='object-contain max-w-full max-h-full p-6'
          src={product.image}
          alt={product.description}
          fill
          sizes=''
        />
      </div>
      <p className='text-lg font-medium mt-6 whitespace-nowrap overflow-hidden text-ellipsis'>
        {product.title}
      </p>
      <p className='text-sm text-slate-600 dark:text-slate-200 mt-1 capitalize'>
        {product.category}
      </p>
      <div className='flex justify-between items-center mt-8'>
        <p className='flex items-center'>
          <DollarSign className='h-4 w-4' />
          <span className='font-semibold text-lg'>{product.price}</span>
        </p>
        <p className='flex items-center gap-2 text-sm'>
          <Star className='h-4 w-4 fill-yellow-200 text-yellow-500' />
          <span className='font-semibold'>{product.rating.rate}</span>
        </p>
      </div>
      {displayCartButton()}
    </section>
  )
}
