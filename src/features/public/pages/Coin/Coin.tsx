import { FC, useEffect, useState } from "react";
import { Button, Container, Loader } from "../../components";
import { useParams } from "react-router-dom";
import { Asset, AssetHistory, Market } from "@/interfaces/interfaces";
import { getAssetById, getAssetHistory, getMarkets } from "../../services/api";
import { Stats, Title, Chart, MarketsTable } from "./components";

interface AssetData {
  asset: Asset
  history: AssetHistory[]
  markets: Market[]
}

export const Coin:FC = () => {

  const { id } = useParams()
  const [ isLoading, setIsLoading ] = useState<boolean>(true)
  const [ assetData, setAssetData ] = useState<AssetData>()

  useEffect(() => {

    if ( id === undefined ) return

    const abortController = new AbortController()
    const { signal } = abortController

    const fetchAsset = async () => {
      try {
        const [ asset, history, markets ] =  await Promise.all([ 
          getAssetById({ id, signal }),
          getAssetHistory({ id, signal }),
          getMarkets({ id, signal })
        ])
        setAssetData({ asset, history, markets })
        setIsLoading(false)
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchAsset()

    return () => {
      abortController.abort()
    }

  }, [])

  if ( isLoading ) {
    return <Loader color='#ea580c' className='mt-12 mx-auto' />
  }

  return (
    <Container>
      <section className="px-4 sm:px-8 lg:px-0">
        <div className="flex flex-col md:flex-row flex-wrap gap-8 lg:gap-20 md:items-center">
          <Title asset={assetData?.asset} />

          <Stats 
            asset={assetData?.asset} 
            history={assetData?.history}  
          />
        </div>

        <Chart history={assetData?.history} />
      </section>

      <MarketsTable markets={assetData?.markets} />
    </Container>
  )
}