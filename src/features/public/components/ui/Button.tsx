import React, { FC } from "react"

interface Props {
  children: string | React.ReactElement
  handleClick: () => void
  className?: string
}

export const Button:FC<Props> = ({ children, handleClick, className }) => {
  return (
    <button 
      onClick={handleClick}  
      className={`block bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white py-1 px-2 border border-orange-500 hover:border-transparent rounded ${className}`}
    >
      { children }
    </button>
  )
}