
import { Card, Flex, Text } from '@radix-ui/themes'
import { useQueries, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'

export default function User() {
  const fetchUser = async () => {
    const res = await axios.get("http://localhost:4000/users")
    return res.data
  }
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user"],
    queryFn: fetchUser
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
      <div>
        
        
          {
            data.map(user => <UserByDetails key={user.id} id={user.id}/>
        
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