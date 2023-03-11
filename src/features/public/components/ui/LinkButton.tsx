import { FC } from "react"

interface Props {
  children: string | React.ReactElement
  href?: string
  className?: string
}

export const LinkButton:FC<Props> = ({ children, href, className }) => {
  return (
    <a 
      href={href}
      className={`inline-block bg-transparent hover:bg-orange-500 text-orange-700 font-semibold hover:text-white py-1 px-2 border border-orange-500 hover:border-transparent rounded ${className}`}
    >
      { children }
    </a>
  )
}