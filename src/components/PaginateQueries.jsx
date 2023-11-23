import { keepPreviousData, useQuery } from '@tanstack/react-query'
import axios from 'axios'
import React, { useMemo, useState } from 'react'

const initialData = {
    initial: [
      { id: 1, title: 'Loading initial data...', body: 'Please wait...' },
    ],
    fetching: [
      { id: 2, title: 'Fetching data...', body: 'Almost there...' },
    ],
    final: [
      { id: 3, title: 'Preparing data...', body: 'Just a moment...' },
    ],
  };


export default function PaginateQueries() {
    const [page, setPage] = useState(1)
    const fetchPaginate = async (pages) => {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=3&_page=${pages}`)
        return response.data
    }



    const { data, isFetching, isLoading, isPending, isError, isPlaceholderData, hasMore } = useQuery({
        queryKey: ["page", page],
        queryFn: () => fetchPaginate(page),

        initialData: [{id:'none' , title:"none" , body :'none'} ], //show initial data before fetching success
        
      

    })
    console.log(isPlaceholderData ," place holder")
    if (isLoading) {
        return <div>load.....</div>
    }
    const previousPage = () => {
        if (page > 0) {
            setPage(page - 1)
        }
    }
    const nextPage = () => {

        if (page < 9) {
            setPage(page + 1)
        }
    }
    console.log(data)
    return (
        <div className='min-h-screen flex justify-center items-center'>
            <div>
                <div>PaginateQueries</div>
                <div>page : {page}</div>
                <div className='grid grid-cols-2 gap-8 w-[900px]'>
                    {
                        isPending ? <div>Loading....</div>
                            : isError ? <div>something went wrong</div>
                                :
                                data.map(user => (
                                    <div key={user.id} className='bg-sky-600 rounded-md text-white p-[20px]'>
                                        <small>{user.id}</small>
                                        <h2 className='text-[20px] text-red-400'>{user.title}</h2>
                                        <small>{user.body}</small>
                                    </div>
                                ))

                    }


                </div>
                {
                    isFetching && <div>fetching.....</div>
                }
                <div className='my-10'>
                    <button disabled={page === 0} className='bg-purple-600 text-gray-100 px-10 py-[10px] mx-[5px] rounded-md min-w-[40px]' onClick={previousPage}>previous</button>
                    <button className='bg-purple-600 text-gray-100 px-10 py-[10px]  rounded-md min-w-[40px]' onClick={() => nextPage()}>next</button>
                </div>
            </div>
        </div>

    )
}
