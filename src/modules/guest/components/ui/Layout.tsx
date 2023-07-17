import { type FC } from 'react'
import { Navigation } from '../Navigation/Navigation'
import { Outlet } from 'react-router-dom'
import { routes } from '../../routes/routes'

export const Layout: FC = () => {
  const links = routes.filter(r => r.to !== null)

  return (
    <>
      <Navigation links={links} />

      <Outlet />
    </>
  )
}
