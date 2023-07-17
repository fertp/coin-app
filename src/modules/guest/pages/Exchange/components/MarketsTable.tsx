import { Table, Td, Th, Thead } from '@/modules/guest/components'
import { formatter } from '@/modules/guest/utils/formatter'
import { type ExchangeMarket } from '@/types'
import { type FC } from 'react'

interface Props {
  markets?: ExchangeMarket[]
}

export const MarketsTable: FC<Props> = ({ markets }) => {
  return (
    <Table
      ariaLabel='Markets Table'
      className='mt-8 md:mt-12'
    >
      <colgroup>
        <col className='min-w-fit' />
        <col />
        <col />
        <col />
        <col />
        <col />
        <col />
      </colgroup>

      <Thead>
        <Th align='left'>Pair</Th>

        <Th>Rate</Th>

        <Th className='hidden md:table-cell'>Price</Th>

        <Th>Volume (24Hr)</Th>

        <Th className='hidden md:table-cell'>Volume (%)</Th>

        <Th className='hidden md:table-cell'>Trades (24Hr)</Th>

        <Th
          className='hidden md:table-cell'
          align='center'
        >
          Status
        </Th>
      </Thead>

      <tbody>
        {markets?.map(m => (
          <tr
            key={`${m.baseSymbol}${m.quoteSymbol}`}
            className='border-b border-gray-200 hover:bg-orange-100'
          >
            <Td align='left'>{`${m.baseSymbol}/${m.quoteSymbol}`}</Td>

            <Td>{`${Number(m.priceQuote)}`}</Td>

            <Td className='hidden md:table-cell'>{formatter.toUSDollar({ value: Number(m.priceUsd) })}</Td>

            <Td>{formatter.toCompactUSDollar({ value: Number(m.volumeUsd24Hr) })}</Td>

            <Td className='hidden md:table-cell'>
              {formatter.toPercentage({
                value: Number(m.percentExchangeVolume)
              })}
            </Td>

            <Td className='hidden md:table-cell'>{formatter.toNumber({ value: Number(m.tradesCount24Hr) })}</Td>

            <Td
              className='hidden md:table-cell'
              align='center'
            >
              -
            </Td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}
