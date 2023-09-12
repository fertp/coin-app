import type { FC } from 'react'

interface Props {
  width?: number
  height?: number
  isFilled: boolean
  role: 'button' | 'img' | 'generic'
  onClick?: () => void
}

export const StarIcon: FC<Props> = ({ width = 32, height = 32, isFilled, role, onClick }) => {
  return (
    <svg
      role={role}
      xmlns='http://www.w3.org/2000/svg'
      width={width}
      height={height}
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke='#aaa'
      fill={`${isFilled ? '' : 'none'}`}
      strokeLinecap='round'
      strokeLinejoin='round'
      className={`${isFilled ? 'fill-orange-300' : 'none'}`}
      onClick={onClick}
    >
      <path
        stroke='none'
        d='M0 0h24v24H0z'
        fill='none'
      />
      <path d='M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z' />
    </svg>
  )
}
