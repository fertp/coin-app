import { Table, Loader, Td, Th, Thead } from '@/features/guest/components'
import { formatter } from '@/features/guest/utils/formatter'
import { useGetAssetMarketsQuery } from '@/services/api'
import { type FC } from 'react'
import { Link } from 'react-router-dom'

interface Props {
  id: string
}

export const MarketsTable: FC<Props> = ({ id }) => {
  const { data, error, isLoading } = useGetAssetMarketsQuery({ id, limit: 10 })

  if (error != null) {
    return <p className='mt-12'>Sorry, couldn&apos;t get markets data.</p>
  }

  if (isLoading) {
    return (
      <Loader
        color='#ea580c'
        className='mx-auto mt-24'
      />
    )
  }

  const markets = data?.data

  return (
    <Table className='mt-8 md:mt-12'>
      <colgroup>
        <col />
        <col className='min-w-fit' />
        <col />
        <col />
        <col />
        <col />
        <col />
      </colgroup>

      <Thead>
        <Th align='left'>Exchange</Th>

        <Th>Pair</Th>

        <Th className='hidden md:table-cell'>Price</Th>

        <Th>Volume (24Hr)</Th>

        <Th className='hidden md:table-cell'>Volume (%)</Th>

        <Th
          align='center'
          className='hidden md:table-cell'
        >
          Status
        </Th>
      </Thead>

      <tbody>
        {markets?.map((m, i) => {
          return (
            <tr
              key={`${m.exchangeId}${i}`}
              className='border-b border-gray-200 hover:bg-orange-100'
            >
              <Td align='left'>
                <Link
                  className='inline-block text-orange-600 hover:underline'
                  to={`/exchanges/${m.exchangeId.toLowerCase()}`}
                >
                  {m.exchangeId}
                </Link>
              </Td>

              <Td>{`${m.baseSymbol}/${m.quoteSymbol}`}</Td>

              <Td className='hidden md:table-cell'>{formatter.toUSDollar({ value: Number(m.priceUsd) })}</Td>

              <Td>
                {formatter.toUSDollar({
                  value: Number(m.volumeUsd24Hr),
                  fractions: 0
                })}
              </Td>

              <Td className='hidden md:table-cell'>{formatter.toPercentage({ value: Number(m.volumePercent) })}</Td>

              <Td
                align='center'
                className='hidden md:table-cell'
              >
                {'-'}
              </Td>
            </tr>
          )
        })}
      </tbody>
    </Table>
  )
}
