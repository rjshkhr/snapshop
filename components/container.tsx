type ContainerProps = {
  children: React.ReactNode
}

export default function Container({ children }: ContainerProps) {
  return (
    <div className='max-w-screen-2xl w-[94%] mx-auto min-h-screen'>
      {children}
    </div>
  )
}
