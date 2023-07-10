import { type Route } from '@/types'
import { type FC, useContext } from 'react'
import { Link } from 'react-router-dom'
import { ApplicationLogo } from '../ui/ApplicationLogo'
import { NavigationLink } from './NavigationLink'
import { ResponsiveButton } from './ResponsiveButton'
import { NavigationContext, NavigationProvider } from './context/NavigationContext'
import { ResponsiveNavigationLink } from './ResponsiveNavigationLink'
import { SearchBar } from '../../../SearchBar'

interface Props {
  links: Route[]
}

export const Navigation: FC<Props> = ({ links }) => {
  return (
    <NavigationProvider>
      <Child links={links} />
    </NavigationProvider>
  )
}

const Child: FC<Props> = ({ links }) => {
  const { isOpen } = useContext(NavigationContext)

  return (
    <header className='relative bg-gray-200 py-2 px-4 sm:px-8'>
      <div className='container mx-auto flex items-center justify-between gap-4 sm:gap-8 xl:max-w-6xl'>
        <Link
          to='/'
          className='flex items-center gap-4'
        >
          <ApplicationLogo />
        </Link>

        <div className='flex items-center gap-2 sm:gap-8'>
          <SearchBar />

          <div className='sm:hidden'>
            <ResponsiveButton />
          </div>

          <nav className='hidden gap-8 sm:flex'>
            {links.map(l => (
              <NavigationLink
                key={l.to}
                {...l}
              />
            ))}
          </nav>
        </div>

        {/* Sign In | Sign Up */}
        {/* User */}
      </div>

      {isOpen && (
        <nav className='absolute top-full right-0 w-4/5 max-w-xs bg-gray-200 shadow shadow-[rgba(0,0,0,0.25)] focus:bg-orange-500 focus:text-white sm:hidden'>
          {links.map(l => (
            <ResponsiveNavigationLink
              key={l.to}
              {...l}
            />
          ))}
        </nav>
      )}
    </header>
  )
}
