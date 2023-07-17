import { type FC } from 'react'
import type React from 'react'

interface Props {
  children: React.ReactNode
  className?: string
}

export const Container: FC<Props> = ({ children, className }) => {
  return (
    <div className={className}>
      <div className='container mx-auto my-8 sm:my-12 md:my-20 xl:max-w-6xl'>{children}</div>
    </div>
  )
}
