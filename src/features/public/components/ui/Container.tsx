import React, { FC } from "react"

interface Props {
  children: React.ReactElement | React.ReactElement[]
  className?: string
}

export const Container:FC<Props> = ({ children, className }) => {
  return (
    <div className={className}>
      <div className="container mx-auto my-8 sm:my-12 md:my-20">
        { children }
      </div>
    </div>
  )
}