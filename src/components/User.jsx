
import { Card, Flex, Text } from '@radix-ui/themes'
import { useQueries, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function User() {
  const fetchUser = async () => {
    const res = await axios.get("https://jsonplaceholder.typicode.com/posts")
    return res.data
  }
  const { data, isLoading, isError, error } = useQuery({
    
    queryKey: ["user"],

    queryFn: fetchUser , // fetching data 

    select : (data) => data.map(item => ({id: item.id, title:item.title})) // set the necessary data 
    
  })

  if (isLoading) {
    return <div>Loading.....</div>
  }
  if (isError) {
    return <div>Error : {error.message}</div>
  }

  console.log("i am render from user component...")
  return (
    <div className='min-h-scree justify-center items-center'>
      <h1>I am user Routes</h1>
      <div className='grid grid-cols-4 gap-5 '>
        
        
          {
            data.map(user => (
              <ul className='my-[10px] bg-sky-600 text-white p-[14px]  rounded-lg'>
                <li>{user.id}</li>
                <li>{user.title}</li>

              </ul>
            )
        
            )
          }
   
      </div>

    </div>
  )
}



const UserByDetails = ({ id }) => {
  
  console.log(id)

  return (
    <li></li>
  )

}