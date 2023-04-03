import { FC, ReactElement } from "react"

interface Props {
  children: ReactElement | ReactElement[]
  className?: string
}

export const Table:FC<Props> = ({ children, className }) => {
  return (
    <table className={`w-full ${className}`}>
      { children }
    </table>
  )
}