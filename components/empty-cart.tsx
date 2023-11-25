import { eczar } from './fonts'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { ArrowBigLeft, Home } from 'lucide-react'
import Image from 'next/image'
import { SheetClose } from './ui/sheet'
import Link from 'next/link'

type EmptyCartProps = {
  inCartSheet?: boolean
}

export default function EmptyCart({ inCartSheet }: EmptyCartProps) {
  return (
    <section className='flex flex-col justify-center items-center min-h-full'>
      <Image
        className='w-[186px]'
        src='/empty-cart.png'
        alt='empty cart'
        width={512}
        height={512}
        loading='eager'
      />
      <h2
        className={cn(
          'text-2xl md:text-3xl font-medium mt-16',
          eczar.className
        )}
      >
        No Items Found!
      </h2>
      <p className='text-sm font-medium text-slate-600 dark:text-slate-200 mt-4 text-center'>
        Explore our amazing products and start filling it with items you love!
      </p>
      {inCartSheet ? (
        <SheetClose asChild>
          <Button variant='default' size='lg' type='submit' className='mt-16'>
            <ArrowBigLeft className='mr-1 w-5 h-5' />
            Go back
          </Button>
        </SheetClose>
      ) : (
        <Link href='/'>
          <Button variant='default' size='lg' type='submit' className='mt-16'>
            <Home className='mr-2 w-4 h-4' />
            Go home
          </Button>
        </Link>
      )}
    </section>
  )
}
