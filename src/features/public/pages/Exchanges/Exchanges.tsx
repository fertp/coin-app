import { FC, useState } from "react";
import { Button, Container, Loader } from "../../components";
import { useGetExchangesQuery } from "@/services/api";
import { Table } from "./components";

export const Exchanges:FC = () => {

  const [ limit, setLimit ] = useState<number>(20)

  const { data, error, isLoading, isFetching } = useGetExchangesQuery(limit)

  const handleViewMore = () => {
    setLimit(prev => prev + 20)
  }
  
  if (isLoading) {
    return <Loader color='#ea580c' className='mt-12 mx-auto' />
  }

  return (
    <Container>
      <Table exchanges={data?.data ?? []} />

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