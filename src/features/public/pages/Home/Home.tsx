import { FC, useEffect, useState } from "react"
import { Table } from "./components"
import { Asset } from "@/interfaces/interfaces"
import { getAssets } from "../../services/api"
import { Container, Button } from "../../components"

export const Home:FC = () => {

  const [ isLoading, setIsLoading ] = useState<boolean>(false)
  const [ assets, setAssets ] = useState<Asset[]>([])
  const [ page, setPage ] = useState<number>(0)

  

  useEffect(() => {

    const abortController = new AbortController()
    const { signal } = abortController

    const fetchAssets = async () => {
      try {
        const resp =  await getAssets({ page, signal })
        setAssets(prev => [...prev, ...resp])
      }
      catch (error) {
        console.log(error)
      }
    }
    fetchAssets()

    return () => {
      abortController.abort()
    }
  }, [page])

  
  const handleViewMore = () => {
    setPage(prev => prev + 1)
  }


  return (
    <Container>
      <Table assets={assets} />

      <Button 
        handleClick={handleViewMore}
        className='mt-12 mx-auto'
      >
        View More
      </Button>
    </Container>
  )
}