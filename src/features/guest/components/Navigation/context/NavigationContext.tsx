import { type FC, createContext, useState } from 'react'
import type { INavigationContext, ProviderProps } from '../interfaces'

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export const NavigationContext = createContext({} as INavigationContext)

export const NavigationProvider: FC<ProviderProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false)

  const toogleIsOpen = (): void => {
    setIsOpen(prev => !prev)
  }

  return (
    <NavigationContext.Provider
      value={{
        isOpen,
        setIsOpen,
        toogleIsOpen
      }}
    >
      {children}
    </NavigationContext.Provider>
  )
}
