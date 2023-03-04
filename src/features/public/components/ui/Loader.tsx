import { FC } from "react";
import { BounceLoader } from "react-spinners";

interface Props {
  color: string
  className?: string
}

export const Loader:FC<Props> = ({ color, className }) => {
  return (
    <div className={`flex justify-center ${className}`}>
      <BounceLoader color={color} />
    </div>
  )
}