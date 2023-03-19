import { useRef, useEffect } from 'react'


const useOnClickOutside = ( callbackFn: () => void ) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent) => {
      
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }
      callbackFn()
    }
    document.addEventListener('mousedown', handleClick)
    document.addEventListener('touchstart', handleClick)
    return () => {
      document.removeEventListener('mousedown', handleClick)
      document.removeEventListener('touchstart', handleClick)
    }
  })

  return ref
}

export default useOnClickOutside