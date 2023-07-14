import { type FC } from 'react'
import { BounceLoader } from 'react-spinners'

interface Props {
  color: string
  className?: string
  fullScreen?: boolean
}

export const Loader: FC<Props> = ({ color, fullScreen = false, className }) => {
  const styles = fullScreen ? 'fixed w-full h-full top-0 flex justify-center items-center' : 'flex justify-center'

  return (
    <div className={`${styles} ${className}`}>
      <BounceLoader
        color={color}
        role='status'
        aria-label='Loading...'
      />
    </div>
  )
}
