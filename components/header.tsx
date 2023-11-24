import { ThemeToggle } from './theme-toggle'
import { norican } from './fonts'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import CartSheet from './cart-sheet'

export default function Header() {
  return (
    <div className='fixed inset bg-background z-20 right-0 left-0 top-0'>
      <header className='h-20 md:h-32 flex justify-between items-center max-w-screen-2xl w-[94%] mx-auto'>
        <Link href='/'>
          <h1 className={cn('text-4xl', norican.className)}>Snapshop</h1>
        </Link>
        <ul className='flex gap-2'>
          <li>
            <ThemeToggle />
          </li>
          <li>
            <CartSheet />
          </li>
        </ul>
      </header>
    </div>
  )
}
