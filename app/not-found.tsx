import { eczar } from '@/components/fonts'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import { Home } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export default function NotFound() {
  return (
    <section className='flex items-center justify-center flex-col min-h-[calc(100vh-10rem)] md:min-h-[calc(100vh-12.5rem)]'>
      <Image
        src='/error-404.png'
        alt='not found'
        className='w-[186px]'
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
        Oops! Page Not Found
      </h2>
      <p className='text-sm font-medium text-slate-600 dark:text-slate-200 mt-4 text-center'>
        It seems like you&apos;ve ventured into uncharted territory. The page
        you&apos;re looking for might be lost in cyberspace.
      </p>
      <Link href='/'>
        <Button variant='default' size='lg' className='mt-16'>
          <Home className='mr-2 w-4 h-4' />
          Go home
        </Button>
      </Link>
    </section>
  )
}
