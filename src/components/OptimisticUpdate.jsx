import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import React, { useMemo, useState } from 'react'
import { Link } from 'react-router-dom';

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


export default function OptimisticUpdate() {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")

    const fetchPaginate = async () => {
        const response = await axios.get(`http://localhost:4000/posts`)
        return response.data
    }


    const fetchPost = async (post) => {
        return await axios.post(`http://localhost:4000/posts`, post)
    }

    const { data, isFetching, isLoading, isPending, isError, isPlaceholderData, hasMore } = useQuery({
        queryKey: ["post"],
        queryFn: fetchPaginate,
        placeholderData: [{ id: 'none', title: "none", body: 'none' }], //show initial data before fetching success
    })


    const queryClient = useQueryClient()

 

    const { mutate,isFetching :fetch, variables, isPending: pending } = useMutation({

        mutationFn: (postData) => fetchPost(postData),
        onMutate : async (newData) =>{
            await queryClient.cancelQueries({queryKey : ["post"]})
            const previousData = queryClient.getQueryData(["post"])
            queryClient.setQueryData(["post"] ,(old) => [...old] , newData)

            return {previousData}
        },
        onError: (err, newData, context) => {
            queryClient.setQueryData(['post'], context.previousData)
          },
        onSettled: async () => {
            await queryClient.invalidateQueries({ queryKey: ["post"] })
        }
    })

    if (isLoading) {
        return <div>load.....</div>
    }



    const handleSubmit = (e) => {
        e.preventDefault()
        mutate({ title, body })
    }
    

    return (
        <div className='min-h-screen flex justify-center items-center flex-col'>
            <div>
                <div>PaginateQueries</div>

                <div className='grid grid-cols-2 gap-8 w-[900px]'>

                    {
                        isPending ? <div>Loading....</div>
                            : isError ? <div>something went wrong</div>
                                :
                                data.map(user => (
                                    <Link  to={`/optimisticUpdate/${user.id}`}>
                                        <div key={user?.id} className='bg-sky-600 rounded-md text-white p-[20px]'>
                                            <small>{user?.id}</small>
                                            <h2 className='text-[20px] text-red-400'>{user.title}</h2>
                                            <small>{user.body}</small>
                                        </div>
                                    </Link>
                                ))

                    }
                    {/* {pending && <div>Pending.......</div>} */}
                    {isFetching && <div>Fetching.........................</div>}

                    {
                        pending && <div className='bg-sky-600 rounded-md text-white p-[20px]'>
                            <small>{variables?.id}</small>
                            <h2 className='text-[20px] text-red-400'>{variables.title}</h2>
                            <small>{variables.body}</small>
                        </div>
                    }

                </div>
               

            </div>


            <div className="input-group mt-[10px] border-green-600 h-[500px] flex justify-center items-center">
                <form action="" onSubmit={handleSubmit}>
                    <div>
                        <label for="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                        <input onChange={(e) => setTitle(e.target.value)} type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="John" required />
                    </div>
                    <div>
                        <label for="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                        <input onChange={(e) => setBody(e.target.value)} type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Doe" required />
                    </div>
                    <button type='submit' className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">submit</button>
                </form>

            </div>
        </div>

    )
}




