import { useEffect, useRef } from 'react'

interface Args {
  url: string
  onMessage: (message: MessageEvent) => void
}

export const useWebSocket = ({ url, onMessage }: Args): void => {
  const socketRef = useRef<WebSocket>()

  useEffect(() => {
    socketRef.current = new WebSocket(url)

    socketRef.current.onmessage = onMessage

    return () => {
      socketRef.current?.close()
    }
  }, [url])
}
