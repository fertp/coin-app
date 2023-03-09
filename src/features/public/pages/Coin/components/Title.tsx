import { formatter } from "../../../utils/formatter";
import { Asset } from "@/interfaces/interfaces";
import { FC } from "react";

interface Props {
  asset?: Asset
}

export const Title:FC<Props> = ({ asset }) => {

  const date = new Date()

  return (
    <div className="flex items-center">
      <img
        src={`https://static.coincap.io/assets/icons/${asset?.symbol.toLowerCase()}@2x.png`}
        alt={asset?.name}
        className="w-20 h-20"
      />
      <div className="ml-6 sm:ml-8">
        <h1 className="text-2xl sm:text-3xl">
          { asset?.name }
          &nbsp;
          <small className="text-gray-500">({ asset?.symbol })</small>
        </h1>
        <span className="mt-2 text-gray-500">
          { formatter.toCustomDate({ date }) }
        </span>
      </div>
    </div>
  )
}