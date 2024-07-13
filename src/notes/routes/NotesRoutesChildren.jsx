import React from 'react'
import { NotesPage } from '../pages/NotesPage'
import { Navigate } from 'react-router-dom'

export const NotesRoutesChildren = [

    {
        path: "/",
        element: <NotesPage/>,
    },
    {
        path: "*",
        element: <Navigate to='/'/>
    },
    
]
