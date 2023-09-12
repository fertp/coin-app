import { useRef } from 'react'

type QueuedFunction = (cb: () => void, ms: number) => void

export const useQueuedFunction = (): QueuedFunction => {
  const isDelayed = useRef(false)
  const queue = useRef<Array<() => void>>([])

  return function (callback: () => void, milliseconds: number): void {
    if (!isDelayed.current) {
      isDelayed.current = true
      callback()

      function delayExecution(): void {
        setTimeout(() => {
          if (queue.current.length > 0) {
            const lastCallback = queue.current[queue.current.length - 1]
            lastCallback()
            queue.current.length = 0
            delayExecution()
            return
          }
          isDelayed.current = false
        }, milliseconds)
      }
      delayExecution()
    } else {
      queue.current.push(callback)
    }
  }
}
