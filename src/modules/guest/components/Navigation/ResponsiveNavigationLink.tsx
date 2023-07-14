import { type Route } from '@/types'
import { type FC, useContext } from 'react'
import { NavLink } from 'react-router-dom'
import { NavigationContext } from './context/NavigationContext'

interface Props extends Route {}

export const ResponsiveNavigationLink: FC<Props> = ({ name, to }) => {
  const { toogleIsOpen } = useContext(NavigationContext)

  return (
    <NavLink
      key={name}
      to={to ?? '#'}
      className={({ isActive }) =>
        `flex w-full border p-4 text-gray-600 [&:not(:last-child)]:border-b-gray-300 ${isActive && 'border-l-orange-500'}`
      }
      onClick={() => {
        toogleIsOpen()
      }}
    >
      {name}
    </NavLink>
  )
}
