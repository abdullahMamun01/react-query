import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'

export default function ArticleDetails() {
  const {id} = useParams()
  const queryClient = useQueryClient()

  const {data , isLoading} = useQuery({
    queryKey : ['user' ,id] ,
    queryFn : async () =>{
     const res = await axios.get("https://jsonplaceholder.typicode.com/users/" + id)
      return res.data
    },
    initialData : () => {
      const cacheData =  queryClient.getQueryData(['users' , id]) ;
      console.log('article ' , cacheData)
      return cacheData ? cacheData : 'loading....'
    }
  })
  const cacheData =  queryClient.getQueryData(['users' , id]) ;
  console.log('article ' , cacheData)

useEffect(() =>{
  queryClient.prefetchQuery({
    queryKey : ["users" , id] ,
    queryFn :  async () =>{
      await axios.get("https://jsonplaceholder.typicode.com/users/" + id)
      return res.data
    },
    staleTime : Infinity
  })


} , [])


  return (
    <div>
      <div>ArticleDetails</div>
      <div>{isLoading && <div>Loading......</div>}</div>
      <div>
        id: {data?.id}
        name:{data?.name}
        username : {data?.username}
      </div>
    </div>
  )
}
