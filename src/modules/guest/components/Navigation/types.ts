import type { Dispatch, ReactNode, SetStateAction } from 'react'

export interface INavigationContext {
  isOpen: boolean
  setIsOpen: Dispatch<SetStateAction<boolean>>
  toogleIsOpen: () => void
}

export interface ProviderProps {
  children: ReactNode
}
