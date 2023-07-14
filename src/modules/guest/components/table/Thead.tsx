import { type FC } from 'react'

interface Props {
  children: React.ReactNode
}

export const Thead: FC<Props> = ({ children }) => {
  return (
    <thead>
      <tr className='border-b-2 border-gray-200 bg-gray-100'>{children}</tr>
    </thead>
  )
}
