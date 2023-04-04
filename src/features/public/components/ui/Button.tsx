import { type FC } from 'react'
import type React from 'react'

interface Props {
  children: string | React.ReactNode
  handleClick: () => void
  className?: string
  selected?: boolean
}

export const Button: FC<Props> = ({ children, handleClick, className, selected = false }) => {
  return (
    <button
      onClick={handleClick}
      className={`block rounded border border-orange-500 py-1 px-2 font-semibold hover:border-transparent hover:bg-orange-500 hover:text-white ${
        selected ? ' bg-orange-500 text-white' : ' bg-transparent text-orange-700'
      } ${className}`}
    >
      {children}
    </button>
  )
}
