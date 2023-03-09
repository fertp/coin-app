import { FC } from "react";
import { Container, Loader } from "../../components";
import { useParams } from "react-router-dom";
import { Stats, Title, Chart, MarketsTable } from "./components";
import { useGetAssetByIdQuery, useGetAssetHistoryQuery, useGetAssetMarketsQuery } from "@/services/api";

export const Coin:FC = () => {

  const { id } = useParams()

  if (id === undefined) return (
    <Loader color='#ea580c' className='mt-12 mx-auto' />
  )

  const { data: asset, error: assetError, isLoading: isAssetLoading } = useGetAssetByIdQuery(id)
  const { data: history, error: historyError, isLoading: isHistoryLoading } = useGetAssetHistoryQuery({ id, time: '1d' })
  const { data: markets, error: marketsError, isLoading: isMarketsLoading } = useGetAssetMarketsQuery({ id, limit: 10 })


  if ( isAssetLoading ) {
    return <Loader color='#ea580c' className='mt-12 mx-auto' />
  }

  return (
    <Container>
      <section className="px-4 sm:px-8 lg:px-0">
        <div className="flex flex-col md:flex-row flex-wrap gap-8 lg:gap-20 md:items-center">
          <Title asset={asset?.data} />

          <Stats 
            asset={asset?.data} 
            history={history?.data}  
          />
        </div>

        <Chart history={history?.data} />
      </section>

      <MarketsTable markets={markets?.data} />
    </Container>
  )
}