import { type FC, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useSearchContext } from '../hooks/useSearchContext'

interface Props {
  children: ReactNode
  to: string
  index: number
}

export const ResultItem: FC<Props> = ({ children, to, index }) => {
  const { selected, dispatcher } = useSearchContext()

  return (
    <Link
      to={to}
      onMouseMove={() => {
        dispatcher.setSelected(index)
      }}
      tabIndex={-1}
      className={`hover:-bg-orange-100 block px-2 py-1 ${selected === index && 'bg-orange-100'}`}
    >
      {children}
    </Link>
  )
}
