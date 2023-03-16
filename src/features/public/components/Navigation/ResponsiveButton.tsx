import { useContext, useEffect } from "react"
import { NavigationContext } from "./context/NavigationContext"
import { SM_BREAKPOINT } from "@/data/constants"

export const ResponsiveButton = ({  }) => {

  const { toogleIsOpen, setIsOpen } = useContext(NavigationContext)

  const handleResize = () => {
    if ( window.innerWidth > SM_BREAKPOINT ) setIsOpen(false)
  }

  useEffect(() => {
    window.addEventListener('resize', handleResize)
    return () => window.addEventListener('resize', handleResize)
  }, [])

  return (
    <div 
      role="button"
      className="w-12 h-12 px-2 py-3 box-border flex flex-col justify-between"
      onClick={() => toogleIsOpen()}
    >
      <span className="block w-full h-px bg-gray-700"></span>
      <span className="block w-full h-px bg-gray-700"></span>
      <span className="block w-full h-px bg-gray-700"></span>
    </div>
  )
}
