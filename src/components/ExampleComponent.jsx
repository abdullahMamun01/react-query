import {  useQuery, useMutation} from '@tanstack/react-query';
import React, { useState } from 'react';
// import { useQuery, useMutation } from '@tanstack/query';

const fetchData = async () => {
  // Simulated API call delay (e.g., fetching data from a server)
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(['Item 1', 'Item 2', 'Item 3']);
    }, 1000);
  });
};

const ExampleComponent = () => {
  const [prefetched, setPrefetched] = useState(false);

  // Use useQuery to fetch the initial data
  const { data,isFetching, isLoading } = useQuery( {
    queryKey : ['items'] ,
    queryFn :  fetchData,
    refetchInterval: 0, // Disable automatic refetching
  });

  // Mutation to prefetch data in the background
  const prefetchData = useMutation( {
    mutationFn : fetchData,
    onSuccess: () => setPrefetched(true),
  });

  return (
    <div>
      <h1>React Query Prefetch Example</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <ul>
            {data.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          {!prefetched && (
            <button onClick={prefetchData.mutate}>Prefetch Data</button>
          )}
           {prefetchData.isFetching && (
            <p>Fetching...........</p>
          )}
          {prefetched && (
            <p>Data prefetched in the background</p>
          )}
        </div>
      )}
    </div>
  );
};

export default ExampleComponent;
