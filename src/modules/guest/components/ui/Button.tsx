import { type FC } from 'react'
import type React from 'react'

interface Props {
  children: React.ReactNode
  ariaLabel?: string
  className?: string
  selected?: boolean
  disabled?: boolean
  onClick: () => void
}

export const Button: FC<Props> = ({ children, ariaLabel, className, selected = false, disabled = false, onClick }) => {
  return (
    <button
      aria-label={ariaLabel}
      className={`block rounded border border-orange-500 py-1 px-2 font-semibold hover:border-transparent hover:bg-orange-500 hover:text-white ${
        selected ? ' bg-orange-500 text-white' : ' bg-transparent text-orange-700'
      } ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}
