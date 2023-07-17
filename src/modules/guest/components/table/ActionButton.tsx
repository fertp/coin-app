import { type FC } from 'react'
import type React from 'react'
import { Link } from 'react-router-dom'

interface Props {
  children: React.ReactNode
  to: string
  className?: string
}

export const ActionButton: FC<Props> = ({ children, to, className, ...props }) => {
  return (
    <Link
      to={to}
      className={`rounded border border-orange-500 bg-transparent py-1 px-2 font-normal text-orange-700 hover:border-transparent hover:bg-orange-500 hover:text-white ${className}`}
      {...props}
    >
      {children}
    </Link>
  )
}
