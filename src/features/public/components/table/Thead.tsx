import { FC } from "react";

interface Props {
  children: React.ReactElement | React.ReactElement[]
}

export const Thead:FC<Props> = ({ children }) => {
  return (
    <thead>
      <tr className="bg-gray-100 border-b-2 border-gray-200">
        { children }
      </tr>
    </thead>
  )
}