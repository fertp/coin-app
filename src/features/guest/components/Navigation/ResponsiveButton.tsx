import { type FC, useContext, useEffect } from 'react'
import { NavigationContext } from './context/NavigationContext'
import { SM_BREAKPOINT } from '@/data/constants'

export const ResponsiveButton: FC = () => {
  const { toogleIsOpen, setIsOpen } = useContext(NavigationContext)

  const handleResize = (): void => {
    if (window.innerWidth > SM_BREAKPOINT) setIsOpen(false)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => {
      window.addEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div
      role='button'
      className='box-border flex h-12 w-12 flex-col justify-between px-2 py-4'
      onClick={() => {
        toogleIsOpen()
      }}
    >
      <span className='block h-px w-full bg-gray-700'></span>
      <span className='block h-px w-full bg-gray-700'></span>
      <span className='block h-px w-full bg-gray-700'></span>
    </div>
  )
}
