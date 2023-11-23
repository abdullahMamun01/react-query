import { useQuery, useQueryClient } from '@tanstack/react-query'

import axios from 'axios'
import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function PrefetchQuery() {
  const { data } = useQuery({
    queryKey: ['users'],
    queryFn: async () => {
      const res = await axios.get("https://jsonplaceholder.typicode.com/users/")

      return res.data
    },
    staleTime: 60000,

    select: (data) => data.map(({ id, email, name }) => ({ id, email, name }))
  })
  console.log(data)
  const queryClient = useQueryClient()
  const navigate = useNavigate()




  const prefetchData = async (id) => {

    await queryClient.prefetchQuery({
      queryKey: ['users', id],
      queryFn: async () => {
        const res = await axios.get("https://jsonplaceholder.typicode.com/users/" + id)
        return res.data
      },
      staleTime: 60000

    })
    console.log('aaa ', queryClient.getQueryData(['users', id]))
  }



  return (
    <div>
      <div>PrefetchQuery</div>
      {
        data?.map(({ id, name, email }) => (
          <div>
            <div key={id} onMouseEnter={() => prefetchData(id)} >
              <Link to={`/article/${id}`}>
                <small>{id}</small>
                <h2>{name}</h2>
              </Link>
              {/* <h4>{email}</h4> */}

            </div>
          </div>
        ))
      }
      {/* <button onClick={() => }>hello</button> */}
    </div>
  )
}
