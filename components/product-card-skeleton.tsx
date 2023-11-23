import { Skeleton } from './ui/skeleton'

export default function ProductCardSkeleton() {
  return (
    <section className='p-6 rounded-3xl w-72 h-[26.75rem] bg-accent'>
      <Skeleton className='h-44 flex items-center justify-center bg-background p-6 rounded-3xl' />
      <Skeleton className='mt-6 w-56 h-7 rounded-3xl bg-background' />
      <Skeleton className='mt-3 w-36 h-4 bg-background' />
      <div className='flex justify-between items-center mt-8'>
        <Skeleton className='w-24 h-6 bg-background' />
        <Skeleton className='w-16 h-5 bg-background' />
      </div>
      <Skeleton className='mt-6 w-full h-10 bg-background' />
    </section>
  )
}
