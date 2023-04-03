import React, { FC } from "react"

interface Props {
  children: React.ReactElement | React.ReactElement[] | string
  className?: string
  align?: 'left' | 'center' | 'right'
  colSpan?: number,
  displayFrom?: 'sm' | 'md'
}

const aligns = {
  left: 'text-left',
  right: 'text-right',
  center: 'text-center',
}

const displayFromMap = {
  sm: 'hidden sm:table-cell',
  md: 'hidden md:table-cell',
}

export const Th:FC<Props> = ({ children, className='', align='right', displayFrom, ...props }) => {

  return (
    <th className={`py-4 sm:py-2 px-2 text-xs font-normal ${aligns[align]} ${!!displayFrom && displayFromMap[displayFrom]} ${className}`} {...props} >
      { children }
    </th>
  )
}