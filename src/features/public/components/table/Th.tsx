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

export const Th:FC<Props> = ({ children, className='', align='right', ...props }) => {

  return (
    <th className={`py-4 sm:py-2 px-2 text-xs font-normal ${aligns[align]} ${className}`} {...props} >
      { children }
    </th>
  )
}