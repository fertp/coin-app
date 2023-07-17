import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSearchContext } from './useSearchContext'

interface Args {
  current: Array<{ index: number; to: string; name: string } | undefined>
}

export const useHandleKeys = (indexesListRef: Args): void => {
  const navigate = useNavigate()

  const { selected, dispatcher, inputRef } = useSearchContext()

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === 'Escape') {
        e.preventDefault()
        dispatcher.closeInput()
        inputRef.current?.blur()
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        dispatcher.decrementSelected()
      }
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        dispatcher.incrementSelected(indexesListRef.current.length)
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        const option = indexesListRef.current[selected]
        const to = option?.to ?? undefined
        if (to !== undefined) {
          navigate(to)
          dispatcher.setSelected(-1)
          inputRef.current?.blur()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selected])
}
