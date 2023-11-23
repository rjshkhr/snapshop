'use client'

import { eczar } from '@/components/fonts'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

export default function NotFound() {
  const router = useRouter()

  return (
    <main className='flex items-center justify-center flex-col h-[calc(100vh-7rem)] md:h-[calc(100vh-10rem)] pb-28 md:pb-40'>
      <Image
        src='/error-404.png'
        alt='not found'
        className='w-[186px]'
        width={512}
        height={512}
      />
      <h2
        className={cn(
          'text-2xl md:text-3xl font-medium mt-12',
          eczar.className
        )}
      >
        Oops! Page Not Found
      </h2>
      <p className='text-sm font-medium text-slate-600 dark:text-slate-200 mt-2 text-center'>
        It seems like you've ventured into uncharted territory. The page you're
        looking for might be lost in cyberspace.
      </p>
      <Button
        variant='default'
        size='lg'
        className='mt-8'
        onClick={() => router.back()}
      >
        Go Back
      </Button>
    </main>
  )
}
