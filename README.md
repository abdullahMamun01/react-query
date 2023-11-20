# TanStack Query (react-query)

 * useQuery 

    TanStack query has their own hook that name is " **useQuery()** ".useQuery take parameter as argument mutliple option like "queryKey,queryFn ,config ,enabled , refetchOnMount,onSuccess,cacheTime ,onError,


* Simply useQuery taking argument explaination
    **Name**	         **Description**	                                 **Type**	                  **Default**

    queryKey           A unique identifier for the query.                 Array, string, 
                                                                          or any other type.                  None

    queryFn	           A function that fetches the data                      Function                         None

    config	           An object that configures the query behavior.	      Object


    staleTime         The maximum amount of time that the data can be         Number or                         0
                      considered stale before refetching.                     Function


    cacheTime	      The maximum amount of time that the data                Number or Function.	     5*60 *1000 
                      should be cached.                                                                  (5 minutes)

    onError	          A callback function that is called                       Function.                   None
                      when the query fails to fetch data.














