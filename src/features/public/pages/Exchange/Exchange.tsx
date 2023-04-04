import { type FC } from 'react'
import { Container, Loader } from '../../components'
import { useParams } from 'react-router-dom'
import { useGetExcahngeByIdQuery, useGetExchangeMarketsQuery } from '@/services/api'
import { ExchangeData, MarketsTable } from './components'

export const Exchange: FC = () => {
  const { id } = useParams()

  if (id === undefined)
    return (
      <Loader
        color='#ea580c'
        fullScreen
      />
    )

  const { data: exchange, isLoading: isExchangeLoading } = useGetExcahngeByIdQuery(id)
  const { data: markets, isLoading: isMarketsLoading } = useGetExchangeMarketsQuery(id)

  if (isExchangeLoading || isMarketsLoading) {
    return (
      <Loader
        color='#ea580c'
        fullScreen
      />
    )
  }

  const topMarket = markets?.data[0]

  return (
    <Container>
      <ExchangeData
        exchange={exchange?.data}
        topMarket={topMarket}
      />

      <MarketsTable markets={markets?.data} />
    </Container>
  )
}
