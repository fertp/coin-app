import { Dispatch, FC, ReactElement, SetStateAction, createContext, useState } from "react";

interface NavigationContext {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  toogleIsOpen: () => void
}

interface ProviderProps {
  children: ReactElement | ReactElement[]
}

export const NavigationContext = createContext({} as NavigationContext)

export const NavigationProvider:FC<ProviderProps> = ({ children }) => {

  const [ isOpen, setIsOpen ] = useState(false)

  const toogleIsOpen = () => setIsOpen(prev => !prev)

  return (
    <NavigationContext.Provider value={{
      isOpen,
      setIsOpen,
      toogleIsOpen
    }}>
      {children}
    </NavigationContext.Provider>
  )
}