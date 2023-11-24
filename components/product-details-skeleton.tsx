import { Skeleton } from './ui/skeleton'

export default function ProductDetailsSkeleton() {
  return (
    <section className='mb-8'>
      <Skeleton className='w-28 h-5' />
      <section className='flex justify-center flex-col xl:flex-row gap-12 xl:gap-24 mt-8 md:mt-12'>
        <Skeleton className='h-96 flex relative w-[100%] items-center justify-center rounded-3xl xl:basis-1/2' />
        <div className='lg:flex items-start justify-center gap-24 xl:gap-16 xl:flex-col xl:basis-1/2'>
          <div className='flex flex-col items-start justify-start basis-1/2 self-stretch'>
            <Skeleton className='h-8 w-full' />
            <Skeleton className='h-4 w-16 mt-7' />
            <Skeleton className='w-24 h-8 mt-8' />
            <p className='flex items-center gap-2 mt-10'>
              <Skeleton className='h-4 w-4' />
              <Skeleton className='w-48 h-4' />
            </p>
          </div>
          <section className='mt-12 lg:mt-0 basis-1/2 self-stretch'>
            <Skeleton className='w-48 h-6' />
            <Skeleton className='mt-6 h-48' />
          </section>
        </div>
      </section>
    </section>
  )
}
