import { Exchange, ExchangeMarket } from "@/interfaces/interfaces"
import { FC } from "react"
import { Title } from "./Title"
import { Stats } from "./Stats"


interface Props {
  exchange?: Exchange
  topMarket?: ExchangeMarket
}

export const ExchangeData:FC<Props> = ({ exchange, topMarket }) => {
  return (
    <section className="px-8 sm:px-0 grid sm:grid-cols-2 gap-8 sm:gap-12 sm:place-items-center">
      <Title exchange={exchange} />

      <Stats 
        exchange={exchange}
        topMarket={topMarket}
      />
    </section>
  )
}
