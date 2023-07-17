import { type FC, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  ariaLabel: string
  className?: string
}

export const Table: FC<Props> = ({ children, ariaLabel, className = '' }) => {
  return (
    <table
      aria-label={ariaLabel}
      className={`w-full ${className}`}
    >
      {children}
    </table>
  )
}
