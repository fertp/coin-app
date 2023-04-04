import { type FC } from 'react'
import icon from '@/assets/crypto-icon.png'

export const ApplicationLogo: FC = () => (
  <img
    src={icon}
    alt='Coin Exchange Logo'
    width={40}
    height={40}
    className='block'
  />
)
