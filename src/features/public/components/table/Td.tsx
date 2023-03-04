import React, { FC } from "react"

interface Props {
  children: React.ReactElement | React.ReactElement[] | string
  className?: string
  align?: 'left' | 'center' | 'right'
  colSpan?: number
}

const aligns = {
  left: 'text-left',
  right: 'text-right',
  center: 'text-center',
}

export const Td:FC<Props> = ({ children, className='', align='right' }) => {

  return (
    <td className={`py-2 sm:py-1 px-2 text-sm font-light ${aligns[align]} ${className}`} >
      { children }
    </td>
  )
}