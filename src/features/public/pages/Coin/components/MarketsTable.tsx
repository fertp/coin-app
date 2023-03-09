import { Td, Th } from "@/features/public/components";
import { formatter } from "../../../utils/formatter";
import { Market } from "@/interfaces/interfaces";
import { FC } from "react";

interface Props {
  markets?: Market[]
}

export const MarketsTable:FC<Props> = ({ markets }) => {

  return (
    <table className='w-full mt-8 md:mt-12'>
      <colgroup>
        <col />
        <col className='min-w-fit' />
        <col />
        <col />
        <col />
        <col />
        <col />
      </colgroup>

      <thead>
        <tr className="bg-gray-100 border-b-2 border-gray-200">
          <Th align="left">Exchange</Th>

          <Th>Pair</Th>

          <Th className='hidden md:table-cell'>Price</Th>

          <Th>Volume (24Hr)</Th>

          <Th className='hidden md:table-cell'>Volume (%)</Th>

          <Th align="center" className='hidden md:table-cell'>Status</Th>
        </tr>
      </thead>

      <tbody>
        {
          markets?.map((m, i) => {
            return (
              <tr 
                key={`${m.exchangeId}${i}`}
                className="border-b border-gray-200 hover:bg-orange-100"
              >
                <Td align="left">
                  { m.exchangeId }
                </Td>

                <Td>
                  { `${m.baseSymbol}/${m.quoteSymbol}` }
                </Td>
                
                <Td className='hidden md:table-cell'>
                  { formatter.toUSDollar({ value: Number(m.priceUsd) }) }
                </Td>
                
                <Td>
                  { formatter.toUSDollar({ value: Number(m.volumeUsd24Hr), fractions: 0 }) }
                </Td>
                
                <Td className='hidden md:table-cell'>
                { formatter.toPercentage({ value: Number(m.volumePercent) }) }
                </Td>
                
                <Td align="center" className='hidden md:table-cell'>
                  { '-' }
                </Td>
              </tr>
            )
          })
        }
      </tbody>
    </table>
  )
}