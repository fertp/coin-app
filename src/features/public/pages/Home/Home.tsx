import { FC, useState } from "react"
import { Table } from "./components"
import { Container, Button, Loader } from "../../components"
import { useGetAssetsQuery } from "@/services/api"

export const Home:FC = () => {

  const [ limit, setLimit ] = useState<number>(20)

  const { data: assets, error, isLoading, isFetching } = useGetAssetsQuery(limit) 
  
  const handleViewMore = () => {
    setLimit(prev => prev + 20)
  }

  if (isLoading) {
    return <Loader color='#ea580c' className='mt-12 mx-auto' />
  }

  return (
    <Container>
      <Table assets={assets?.data ?? []} />

      {
        isFetching ?
          <Loader color='#ea580c' className='mt-12 mx-auto' />
        :
        <Button 
          handleClick={handleViewMore}
          className='mt-12 mx-auto'
        >
          View More
        </Button>
      }
    </Container>
  )
}