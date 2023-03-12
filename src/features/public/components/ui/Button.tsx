import React, { FC } from "react"

interface Props {
  children: string | React.ReactElement
  handleClick: () => void
  className?: string
  selected?: boolean
}

export const Button:FC<Props> = ({ children, handleClick, className, selected }) => {
  return (
    <button 
      onClick={handleClick}  
      className={`block hover:bg-orange-500 font-semibold hover:text-white py-1 px-2 border border-orange-500 hover:border-transparent rounded ${selected ? ' bg-orange-500 text-white' : ' bg-transparent text-orange-700'} ${className}`}
    >
      { children }
    </button>
  )
}