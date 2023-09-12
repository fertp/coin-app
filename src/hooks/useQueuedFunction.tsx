import { useRef } from 'react'

type QueuedFunction = (callback: () => void, milliseconds: number) => void

export const useQueuedFunction = (): QueuedFunction => {
  const isDelayed = useRef(false)
  const queue = useRef<Array<() => void>>([])

  return function (callback: () => void, milliseconds: number): void {
    if (!isDelayed.current) {
      isDelayed.current = true
      callback()

      function executeQueuedFunction(): void {
        setTimeout(() => {
          if (queue.current.length > 0) {
            queue.current[0]()
            queue.current.length = 0
            executeQueuedFunction()
            return
          }
          isDelayed.current = false
        }, milliseconds)
      }
      executeQueuedFunction()
    } else {
      queue.current.push(callback)
    }
  }
}
