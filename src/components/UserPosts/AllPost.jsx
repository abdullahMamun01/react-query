import { useQuery } from '@tanstack/react-query'
import React from 'react'
import fetchAPi from '../../ustils/fetchApi'



export default function AllPost() {
    const {data} = useQuery({
        queryKey : ["posts"] ,
        queryFn : () => fetchAPi('https://jsonplaceholder.typicode.com/posts')
    })
    console.log(data)
  return (
    <div></div>
  )
}
