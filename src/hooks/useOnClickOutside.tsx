import { useRef, useEffect, type RefObject } from 'react'

const useOnClickOutside = (callbackFn: () => void): RefObject<HTMLDivElement> => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClick = (event: MouseEvent | TouchEvent): void => {
      if (ref.current == null || ref.current.contains(event.target as Node)) {
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
