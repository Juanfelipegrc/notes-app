import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { NotesRoutes } from '../notes/routes/NotesRoutes';
import { NotesRoutesChildren } from '../notes/routes/NotesRoutesChildren';
import { AuthRoutes } from '../auth/routes/AuthRoutes';
import { AuthRoutesChildren } from '../auth/routes/AuthRoutesChildren';
import { useCheckAuth } from '../hooks/useCheckAuth';


export const AppRouter = () => {



    useCheckAuth();



    

    const router = createBrowserRouter([

        {
          path: "/",
          element: <NotesRoutes/>,
          children: NotesRoutesChildren
        },
        {
          path: "/auth/*",
          element: <AuthRoutes/>,
          children: AuthRoutesChildren
        }
      
    ]);

  return (
    <RouterProvider router={router} />
  )
}
