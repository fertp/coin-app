import React, { FC } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  children: React.ReactElement | React.ReactElement[]
  to: string
}

export const ActionButton:FC<Props> = ({ children, to, ...props }) => {
  return (
    <Link 
      to={to}
      className=" py-1 px-2 bg-transparent hover:bg-orange-500 text-orange-700 font-normal hover:text-white border border-orange-500 hover:border-transparent rounded"
      {...props}
    >
      { children }
    </Link>
  )
}