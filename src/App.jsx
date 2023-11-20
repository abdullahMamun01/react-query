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
