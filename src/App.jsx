import React from 'react'
import Home from './components/Home'
import Navbar from './components/Navbar.jsx'

import '@radix-ui/themes/styles.css';

import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Routes,
} from 'react-router-dom';

import User from './components/User.jsx';
import Error from './pages/Error.jsx';
import Videos from './components/Videos.jsx'
import { Theme } from '@radix-ui/themes';
import path from 'path';
import Main from './Laoyout/Main.jsx';
import PaginateQueries from './components/PaginateQueries.jsx';
import OptimasticUpdate from './components/OptimisticUpdate.jsx';
import OptimisticUpdate from './components/OptimisticUpdate.jsx';
import OptimisticUpdateDetails from './components/OptimisticUpdateDetails.jsx';
import ExampleComponent from './components/ExampleComponent.jsx';
import PrefetchQuery from './components/PrefetchQuery.jsx';
import PrefetchDetails from './components/PrefetchDetails.jsx';
export default function App() {

  const router = createBrowserRouter(
    [
      {
        path:"/",
        element: <Main />,
        children: [
          {
            
            path: "/",
            element: <Home />
          },
          {

            path: "/user",
            element: <User/>
          },
          {

            path: "/paginate",
            element: <PaginateQueries/>
          },
          {
            path: "optimisticUpdate",
            element: <OptimisticUpdate/>
          },
          {
            path: "optimisticUpdate/:id",
            element: <OptimisticUpdateDetails/>
          },
          {
            path: "example",
            element: <ExampleComponent/>
          },
          {
            path: "prefetch",
            element: <PrefetchQuery/>
          },
          {
            path: "article/:id",
            element: <PrefetchDetails/>
          },
          {
            path: "videos",
            element: <Videos/>
          }
          
        ]
      }
    ]

  );



  return (

      <RouterProvider router={router} />

  )
}
