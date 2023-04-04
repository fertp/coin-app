import { type FC, type ReactNode } from 'react'

interface Props {
  children: ReactNode
  className?: string
}

export const Table: FC<Props> = ({ children, className }) => {
  return <table className={`w-full ${className}`}>{children}</table>
}
