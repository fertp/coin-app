import { type FC, useState } from 'react'
import { AssetsTable } from './components'
import { Container, Button, Loader } from '../../components'
import { useGetAssetsQuery } from '@/services/api'

export const Home: FC = () => {
  const [limit, setLimit] = useState<number>(20)

  const { data: assets, isLoading, isFetching, error } = useGetAssetsQuery(limit)

  const handleViewMore = (): void => {
    setLimit(prev => prev + 20)
  }

  if (isLoading) {
    return (
      <Loader
        color='#ea580c'
        fullScreen
      />
    )
  }

  if (error !== undefined) {
    return <div>Ups, an error has ocurred!</div>
  }

  return (
    <Container>
      <AssetsTable assets={assets?.data ?? []} />

      {isFetching ? (
        <Loader
          color='#ea580c'
          className='mx-auto mt-12'
        />
      ) : (
        <Button
          handleClick={handleViewMore}
          className='mx-auto mt-12'
        >
          View More
        </Button>
      )}
    </Container>
  )
}
