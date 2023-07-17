import { type FC } from 'react'

interface Props {
  children: string | React.ReactNode
  href?: string
  className?: string
}

export const LinkButton: FC<Props> = ({ children, href, className }) => {
  return (
    <a
      href={href}
      target='_blank'
      rel='noopener noreferrer'
      className={`inline-block rounded border border-orange-500 bg-transparent py-1 px-2 font-semibold text-orange-700 hover:border-transparent hover:bg-orange-500 hover:text-white ${className}`}
    >
      {children}
    </a>
  )
}
