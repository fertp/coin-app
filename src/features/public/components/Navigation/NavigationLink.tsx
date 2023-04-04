import { type Route } from '@/interfaces/interfaces'
import { type FC } from 'react'
import { NavLink } from 'react-router-dom'

interface Props extends Route {}

export const NavigationLink: FC<Props> = ({ name, to }) => {
  return (
    <NavLink
      key={name}
      to={to ?? '#'}
      className={({ isActive }) =>
        `flex min-h-[48px] min-w-[48px] items-center border-2 px-1 ${isActive ? 'border-b-orange-500' : 'border-b-gray-200'}`
      }
    >
      {name}
    </NavLink>
  )
}
