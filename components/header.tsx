import { ThemeToggle } from '@/components/theme-toggle'
import { norican } from '@/components/fonts'
import { cn } from '@/lib/utils'
import Link from 'next/link'
import Cart from '@/components/cart'

export default function Header() {
  return (
    <header className='h-28 md:h-40 flex justify-between items-center'>
      <Link href='/'>
        <h1 className={cn('text-4xl', norican.className)}>Snapshop</h1>
      </Link>
      <ul className='flex gap-2'>
        <li>
          <ThemeToggle />
        </li>
        <li>
          <Cart />
        </li>
      </ul>
    </header>
  )
}
