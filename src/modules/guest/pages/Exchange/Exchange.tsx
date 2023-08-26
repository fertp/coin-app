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

  const exchangeQuery = useGetExcahngeByIdQuery(id)
  const exchangeMarketsQuery = useGetExchangeMarketsQuery(id)

  if (exchangeQuery.isLoading || exchangeMarketsQuery.isLoading) {
    return (
      <Loader
        color='#ea580c'
        fullScreen
      />
    )
  }

  if (exchangeQuery.isError || exchangeMarketsQuery.isError) {
    return <Container>Ups, an error has ocurred!</Container>
  }

  const topMarket = exchangeMarketsQuery.data?.data[0]

  return (
    <Container>
      <ExchangeData
        exchange={exchangeQuery.data?.data}
        topMarket={topMarket}
      />

      <MarketsTable markets={exchangeMarketsQuery.data?.data} />
    </Container>
  )
}
