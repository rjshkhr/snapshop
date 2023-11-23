'use client'

import { Button } from '@/components/ui/button'
import { useEffect } from 'react'

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <section className='flex items-center justify-center flex-col min-h-[calc(100vh-10rem)] md:min-h-[calc(100vh-12.5rem)]'>
      <h2 className='mb-6 font-medium text-2xl'>Something went wrong!</h2>
      <Button variant='default' size='lg' onClick={() => reset()}>
        Try again
      </Button>
    </section>
  )
}
