import { useQueries, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React from 'react'
import { useParams } from 'react-router-dom'

export default function OptimisticUpdateDetails() {
    const { id } = useParams()
    console.log(id)
   
    

    const { data } = useQuery({
        queryKey: ["page", id],
        queryFn: async () => {
            const res = await axios.get("http://localhost:4000/posts/" + id)
            return res.data
        },
        placeholderData : { id: 'none', title: "none", body: 'none' }
    })

    return (
        <div>
            <div>OptimisticUpdateDetails</div>
            <div className='bg-sky-600 rounded-md text-white p-[20px]'>
                <small>{data?.id}</small>
                <h2 className='text-[20px] text-red-400'>{data.title}</h2>
                <small>{data.body}</small>
            </div>
        </div>
    )
}
