import React from 'react'
import { LoginPage } from '../pages/LoginPage'
import { RegisterPage } from '../pages/RegisterPage'
import { Navigate } from 'react-router-dom'

export const AuthRoutesChildren = [
    {
        path: 'login',
        element: <LoginPage/>
    },
    {
        path: 'register',
        element: <RegisterPage/>
    },
    {
        path: '*',
        element: <Navigate to='login'/>
    }
];