import type { ReactNode, FC } from 'react'

interface Props {
  children: ReactNode
  className?: string
  align?: 'left' | 'center' | 'right'
  colSpan?: number
  displayFrom?: 'sm' | 'md'
}

const aligns = {
  left: 'text-left',
  right: 'text-right',
  center: 'text-center'
}

const displayFromMap = {
  sm: 'hidden sm:table-cell',
  md: 'hidden md:table-cell'
}

export const Td: FC<Props> = ({ children, className = '', align = 'right', displayFrom }) => {
  return (
    <td
      className={`py-2 px-2 text-sm font-light sm:py-1 ${displayFrom !== undefined && displayFromMap[displayFrom]} ${
        aligns[align]
      } ${className}`}
    >
      {children}
    </td>
  )
}
